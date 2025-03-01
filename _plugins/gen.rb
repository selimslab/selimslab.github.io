require 'json'
require 'pp'

ROOT_PATH = "./_CONTENT".freeze
ASSETS_PATH = "./assets".freeze
STATIC_PATH = "#{ASSETS_PATH}/static".freeze
DATA_PATH = "#{ASSETS_PATH}/data".freeze
DEBUG = false

class SiteGenerator < Jekyll::Generator
  def initialize(config = {})
    @fixed_frontmatter = false
    @generated = false
    @config = config
  end

  def generate(site)
    return if @generated

    fix_frontmatter unless @fixed_frontmatter

    initialize_site_data(site)
    tree = generate_tree(site)
    site.data["tree"] = tree
    tree_level_order_data = tree_level_order(tree)
    site.data["tree_level_order"] = tree_level_order_data
    
    tree_to_html(site, tree)
    log_debug_data(tree, site) if DEBUG

    process_documents(site)

    graph = generate_graph(site)
    site.data["link_count"] = calculate_link_count(site, graph)

    update_ideas(site)
    update_artworks(site)
    update_tags(site)

    @generated = true
  end

  private

  def initialize_site_data(site)
    site.data["tree"] = {}
    site.data["tree_htmls"] = {}
    site.data["tree_level_order"] = {}
    initialize_backlinks(site)
    initialize_file_to_tag(site)
    initialize_file_to_title(site)
  end

  def log_debug_data(tree, site)
    write_json("#{DATA_PATH}/tree.json", tree)
    write_json("#{DATA_PATH}/tree_level_order.json", site.data["tree_level_order"])
    write_json("#{DATA_PATH}/tree_htmls.json", site.data["tree_htmls"])

  end

  def update_ideas(site)
    ideas = JSON.parse(File.read("#{DATA_PATH}/ideas.json"))
    ideas.shuffle!(random: Random.new(ideas.length)) if DEBUG
    write_json("#{DATA_PATH}/ideas.json", ideas)
    site.data["ideas"] = ideas
  end

  def update_artworks(site)
    artworks = get_artworks
    write_json("#{DATA_PATH}/artworks.json", artworks)
  end

  def update_tags(site)
    tags_data = {}
    site.documents.each do |doc|
      next unless doc.respond_to?(:id) && doc.respond_to?(:data) && doc.data["tags"]
      tags_data[doc.id] = doc.data["tags"]
    end
    write_json("#{DATA_PATH}/tags.json", tags_data)
  end

  def fix_frontmatter
    Dir.glob("#{ROOT_PATH}/**/*.md").each do |file|
      content = File.read(file).lstrip
      add_frontmatter(file, content) unless content.start_with?("---")
      fix_links(file, content)
    end
  end

  def add_frontmatter(file, content)
    content = "---\n---\n#{content}"
    File.write(file, content)
    puts "Added front matter to: #{file}"
  end

  def fix_links(file, content)
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

  def get_artworks
    artworks = []
    paths = Dir.glob("#{STATIC_PATH}/art/**/*.{jpg,jpeg,png,gif}")
    # shuffle paths
    paths = paths.shuffle(random: Random.new(paths.length))

    paths.map do |path|
      name = File.basename(path, ".*")
      # remove leading dot
      # split name by - or _, capitalize each word, join with space
      name = name.split(/[-_]/).map(&:capitalize).join(" ")
      artworks << { "name": name, "path": path.sub(/^\./, "") }
    end

    artworks
  end

  def tree_level_order(tree)
    current_level = {"/":tree}
    level_order = {}

    while !current_level.empty?
      next_level = {}

      current_level.each do |parent, node|
        current_keys = []
        node.each do |key, children|
          current_keys << key
          if children != {}
            next_level[key] = children
          end
        end
        level_order[parent] = current_keys
      end

      current_level = next_level
    end

    level_order

  end


  def tree_to_html(site, tree)

    level_order = site.data["tree_level_order"]
    level_order.each do |parent_id, children|
      children = children.sort_by { |child_id| site.data["file_to_title"][child_id] || child_id }
      html = "<ul>"
      children.each do |child_id|
        if child_id == parent_id 
          next
        end
        title = site.data["file_to_title"][child_id]
        html += "<li><a href='#{child_id}/'>#{title}</a></li>"
      end
      html += "</ul>"

      site.data["tree_htmls"][parent_id] = html
    end

  end


  def initialize_backlinks(site)
    site.documents.each do |doc|
      next unless doc.respond_to?(:data)
      doc.data['backlinks'] ||= []
    end
  end

  def initialize_file_to_tag(site)
    site.data["file_to_tag"] = site.data["tag_to_file"].invert
  end

  def initialize_file_to_title(site)
    site.data["file_to_title"] = {}
    site.documents.each do |doc|
      next unless doc.respond_to?(:id) && doc.respond_to?(:data) && doc.data["title"]
      site.data["file_to_title"][doc.id] = doc.data["title"]
    end
  end

  def process_documents(site)
    site.documents.each do |doc|
      next unless doc.respond_to?(:data) && doc.respond_to?(:content)
      
      doc.data['tags'] = (doc.data['tags'] || []).uniq.sort
      wikilinks_to_backlinks(doc, site)
      tags_to_backlinks(doc, site)
      
      if doc.data['backlinks']
        doc.data['backlinks'].reject! { |e| e.respond_to?(:id) && e.id == doc.id }
        doc.data['backlinks'].sort_by! { |e| e.respond_to?(:data) && e.data["title"] ? e.data["title"] : "" }
      end
      
      replace_links_in_content(doc, site)
    end

    site.documents.each do |doc|
      next unless doc.respond_to?(:data) && doc.data['backlinks']
      doc.data['backlinks'].uniq!
    end
  end

  def calculate_link_count(site, graph)
    link_count = site.documents.sum do |doc| 
      doc.respond_to?(:content) ? doc.content.scan(/<a/).length : 0
    end
    link_count + graph[:links].length
  end


  def remove_leading_slash(str)
    str.sub(/^\//, '')
  end

  def generate_graph(site)
    nodes, links, nodemap, group = [], [], {}, 0
    file_tree = { "/root": site.data["tree"] }

    process_file_tree(file_tree, nodes, links, nodemap, group)
    process_backlink_tree(site, nodes, links, nodemap)

    clean_up_links(links)
    enrich_nodes(nodes, links, site)

    graph_data = { "nodes": nodes, "links": links }
    write_graph_data(graph_data)

    graph_data
  end

  def process_file_tree(file_tree, nodes, links, nodemap, group)
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
  end

  def process_backlink_tree(site, nodes, links, nodemap)
    backlink_tree = {}
    site.documents.each do |doc|
      next unless doc.respond_to?(:id) && doc.respond_to?(:data) && doc.data['backlinks']&.any?
      backlink_tree[doc.id] = doc.data['backlinks'].map do |backlink|
        backlink.respond_to?(:id) ? backlink.id : nil
      end.compact
    end

    backlink_tree.each do |parent, children|
      nodemap[parent] ||= { id: parent, group: 0 }
      nodes << nodemap[parent] unless nodes.include?(nodemap[parent])
      children.each { |child| links << { source: parent, target: child } }
    end
  end

  def clean_up_links(links)
    links.uniq!
    links.reject! { |e| e[:source] == e[:target] }
    links.uniq! { |e| [e[:source], e[:target]] }
  end

  def enrich_nodes(nodes, links, site)
    nodes.each do |node|
      node[:name] = site.data["file_to_title"][node[:id]] || remove_leading_slash(node[:id].to_s).capitalize
      node[:links] = links.select { |e| e[:source] == node[:id] || e[:target] == node[:id] }
                           .map { |e| e[:source] == node[:id] ? e[:target] : e[:source] }
      nodes.delete(node) if node[:links].empty?
    end
  end

  def write_graph_data(graph_data)
    write_json("#{DATA_PATH}/graph.json", graph_data)
  end

  def wikilinks_to_backlinks(doc, site)
    return unless doc.respond_to?(:id)
    source_basename = remove_leading_slash(doc.id)
    linking_to_doc = site.documents.select do |e|
      e.respond_to?(:content) && (e.content.include?("[[#{source_basename}]]") || e.content.include?("(/#{source_basename})"))
    end

    linking_to_doc.each do |linking_doc|
      next if doc.data['children']&.include?(linking_doc.respond_to?(:id) ? linking_doc.id : nil)
      doc.data['backlinks'] << linking_doc
    end
  end

  def tags_to_backlinks(doc, site)
    return unless doc.respond_to?(:data) && doc.data["tags"]
    tag_to_file = site.data["tag_to_file"]

    doc.data["tags"].each do |tag|
      tagfileid = tag_to_file.has_key?(tag) ? "/#{tag_to_file[tag]}" : "/#{tag}"
      tagged_doc = site.documents.find { |e| e.respond_to?(:id) && e.id == tagfileid }
      next unless tagged_doc
      next if tagged_doc.data['children']&.include?(doc.respond_to?(:id) ? doc.id : nil)

      tagged_doc.data['backlinks'] ||= []
      tagged_doc.data['backlinks'] << doc
    end
  end

  def replace_links_in_content(doc, site)
    return unless doc.respond_to?(:content) && doc.respond_to?(:data)
    tag_to_file = site.data["tag_to_file"]
    file_to_title = site.data["file_to_title"]

    doc.content.scan(/\[\[[a-z0-9-]*\]\]/).each do |link|
      target = link[2..-3]
      target = tag_to_file["/#{target}"] if tag_to_file.key?("/#{target}")
      title = file_to_title["/#{target}"]
      markdown_link = "[#{title}](/#{target}/)"
      doc.content.gsub!(link, markdown_link)
    end
  end

  def generate_tree(site)
    tree = bfs(site, ROOT_PATH)
    tree.transform_values! { |v| v.sort_by { |k, v| [-v.length, site.data["file_to_title"][k]] }.to_h }
    tree
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

      entries = Dir.entries(parent_path).sort

      entries.each do |child|
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


  def link_to_parent(site, child_id, parent_id)
    child_doc = site.documents.find { |e| e.respond_to?(:id) && e.id == child_id }
    return unless child_doc

    parent_doc = site.documents.find { |e| e.respond_to?(:id) && e.id == parent_id }
    return unless parent_doc
    return if child_doc == parent_doc

    parent_basename = remove_leading_slash(parent_id)
    child_doc.data['parent_basename'] = parent_basename
    child_doc.data['tags'] << parent_basename

    parent_doc.data['children'] ||= []
    parent_doc.data['children'] << child_id
  end

  private

  def write_json(path, data)
    File.open(path, "w") { |f| f.write(JSON.pretty_generate(data)) }
  rescue StandardError => e
    puts "Error writing JSON to #{path}: #{e.message}"
  end
end
