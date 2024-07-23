require 'json'
require 'pp'

NOTES_PATH = "./_NOTES"

class SiteGenerator < Jekyll::Generator
  @fixed_frontmatter = false

  def generate(site)
    unless @fixed_frontmatter
      fix_frontmatter
      @fixed_frontmatter = true
      generate(site)
    end

    site.documents.each { |doc| doc.data['backlinks'] ||= [] }

    site.data["file_to_tag"] = site.data["tag_to_file"].invert

    site.data["file_to_title"] = site.documents.map { |doc| [remove_leading_slash(doc.id), doc.data["title"]] }.to_h

    generate_tree(site)

    write_json("./assets/data/tree.json", site.data["tree"])

    site.documents.each do |doc|
      doc.data['tags'] = doc.data['tags'].uniq.sort
      wikilinks_to_backlinks(doc, site)
      tags_to_backlinks(doc, site)
      doc.data['backlinks'].reject! { |e| e.id == doc.id }
      doc.data['backlinks'].sort_by! { |e| e.data["title"] }
      replace_links_in_content(doc, site)
    end

    site.documents.each { |doc| doc.data['backlinks'].uniq! }

    graph = generate_graph(site)

    site.data["link_count"] = site.documents.sum { |doc| doc.content.scan(/<a/).length } + graph[:links].length

    site.data["ideas"] = JSON.parse(File.read("./assets/data/ideas.json")).sort

    # write tags of each doc to a json file
    write_json("./assets/data/tags.json", site.documents.map { |doc| [doc.id, doc.data["tags"]] }.to_h)

  end

  def remove_leading_slash(str)
    str.sub(/^\//, '')
  end

  def generate_graph(site)
    nodes, links, nodemap, group = [], [], {}, 0
    file_tree = { "/root": site.data["tree"] }
    queue = [[file_tree, nil, group]]

    until queue.empty?
      current_data, parent, group_number = queue.shift
      current_data.each do |key, value|
        nodemap[key] ||= { id: key, group: group_number }
        nodes << nodemap[key] unless nodes.include?(nodemap[key])
        links << { source: parent, target: key } if parent
        queue << [value, key, group_number + 1]
      end
    end

    backlink_tree = site.documents.each_with_object({}) do |doc, hash|
      hash[doc.id] = doc.data['backlinks'].map(&:id) if doc.data['backlinks'].any?
    end

    backlink_tree.each do |parent, children|
      nodemap[parent] ||= { id: parent, group: 0 }
      nodes << nodemap[parent] unless nodes.include?(nodemap[parent])
      children.each { |child| links << { source: parent, target: child } }
    end

    links.uniq!
    links.reject! { |e| e[:source] == e[:target] }
    links.uniq! { |e| [e[:source], e[:target]] }

    nodes.each do |node|
      file = remove_leading_slash(node[:id].to_s)
      node[:name] = site.data["file_to_title"][file] || file.capitalize
      node[:links] = links.select { |e| e[:source] == node[:id] || e[:target] == node[:id] }
                           .map { |e| e[:source] == node[:id] ? e[:target] : e[:source] }
      nodes.delete(node) if node[:links].empty?
    end

    graph_data = { "nodes": nodes, "links": links }

    write_json("./assets/data/graph.json", graph_data)

    graph_data
  end



  def fix_frontmatter
    Dir.glob("#{NOTES_PATH}/**/*.md").each do |file|
      content = File.read(file).lstrip

      unless content.start_with?("---")
        content = "---\n---\n#{content}"
        File.write(file, content)
        puts "Added front matter to: #{file}"
      end

      fixed = content.scan(/\[.*?\]\(.*?\)/).count do |link|
        next false unless link.include?("|")
        new_link = link.gsub("|", "-")
        content.gsub!(link, new_link)
        true
      end

      if fixed.positive?
        File.write(file, content)
        puts "Fixed #{fixed} links in: #{file}"
      end
    end
  end

  def wikilinks_to_backlinks(doc, site)
    source_basename = remove_leading_slash(doc.id)
    linking_to_doc = site.documents.select do |e|
      e.content.include?("[[#{source_basename}]]") || e.content.include?("(/#{source_basename})")
    end

    linking_to_doc.each do |linking_doc|
      # parent already lists its children, no need to list them again under its backlinks
      next if doc.data['children']&.include?(linking_doc.id)
      doc.data['backlinks'] << linking_doc
    end
  end

  def tags_to_backlinks(doc, site)
    tag_to_file = site.data["tag_to_file"]

    doc.data["tags"].each do |tag|
      tagfileid = tag_to_file.has_key?(tag) ? "/#{tag_to_file[tag]}" : "/#{tag}"
      tagged_doc = site.documents.find { |e| e.id == tagfileid }
      next unless tagged_doc
      # parent already lists its children, no need to list them again under its backlinks
      next if tagged_doc.data['children']&.include?(doc.id)

      tagged_doc.data['backlinks'] ||= []
      tagged_doc.data['backlinks'] << doc
    end
  end

  def replace_links_in_content(doc, site)
    tag_to_file = site.data["tag_to_file"]
    file_to_title = site.data["file_to_title"]

    doc.content.scan(/\[\[[a-z0-9-]*\]\]/).each do |link|
      target = link[2..-3]
      target = tag_to_file[target] if tag_to_file.key?(target)
      title = file_to_title[target]
      markdown_link = "[#{title}](/#{target}/)"
      doc.content.gsub!(link, markdown_link)
    end
  end

  def generate_tree(site)
    tree = bfs(site, NOTES_PATH)
    # sort each level of tree by number of children, then by title
    tree.transform_values! { |v| v.sort_by { |k, v| [-v.length, site.data["file_to_title"][k]] }.to_h }
    site.data["tree"] = tree

    site.data["tree_htmls"] = {}
    tree_to_html(site, tree, "root")

    site.data["tree_htmls_without_self"] = {}
    # for each element in site.data["tree_htmls"], remove link to self
    site.data["tree_htmls"].each do |k, v|
      site.data["tree_htmls_without_self"][k] = v.gsub(/<a href='#{k}\/'>.*?<\/a>/, "")
    end

  end

  def bfs(site, path)
    tree = {}
    queue = [[path, tree]]
    root = nil

    until queue.empty?
      parent_path, branch = queue.shift
      parent_basename = File.basename(parent_path)
      parent_id = "/#{parent_basename}"
      root ||= parent_id

      branch[parent_id] ||= {}

      entries = Dir.entries(parent_path)
      # # if entries do not include parent_basename.md, add a new jekyll doc with empty front matter
      # if !entries.include?("#{parent_basename}.md")
      #   File.open("#{parent_path}/#{parent_basename}.md", "w") do |f|
      #     f.write("---\n---\n")
      #   end
      # end

      entries.sort.each do |child|
        next if child.start_with?('.', '_')

        child_basename = File.basename(child)
        child_id = "/#{child_basename.sub(/\..*/, '')}"
        child_path = File.join(parent_path, child)

        if File.directory?(child_path)
          queue.push([child_path, branch[parent_id]])
        elsif path != parent_basename
          branch[parent_id][child_id] ||= {}
        end
        link_to_parent(site, child_id, parent_id)
      end
    end
    tree[root]
  end

  def tree_to_html(site, tree, root_id)
    return "" if tree.empty?

    html = "<ul>"
    tree.each do |file_id, children|
      doc = site.documents.find { |e| e.id == file_id }
      title = doc.nil? ? file_id.sub(/^\//, '').capitalize : doc.data["title"]

      sorted_children = children.sort_by { |k, v| [-v.length, site.data["file_to_title"][k]] }.to_h
      html += if sorted_children.empty?
                "<li><a href='#{file_id}/'>#{title}</a></li>"
              else
                "<details><summary>#{title}</summary><li>#{tree_to_html(site, sorted_children, file_id)}</li></details>"
              end
    end
    html += "</ul>"
    site.data["tree_htmls"][root_id] = html

    html
  end

  def link_to_parent(site, child_id, parent_id)
    child_doc = site.documents.find { |e| e.id == child_id }
    return unless child_doc

    parent_doc = site.documents.find { |e| e.id == parent_id }
    return unless parent_doc
    return if child_doc == parent_doc

    parent_basename = remove_leading_slash(parent_id)
    child_doc.data['parent_basename'] = parent_basename
    child_doc.data['tags'] << parent_basename

    parent_doc.data['children'] ||= []
    parent_doc.data['children'] << child_id
  end

  def reverse_tree(tree)
    return tree if tree.nil? || tree.empty?

    tree.transform_values { |value| reverse_tree(value) }
  end

  private

  def write_json(path, data)
    File.open(path, "w") { |f| f.write(JSON.pretty_generate(data)) }
  end

end
