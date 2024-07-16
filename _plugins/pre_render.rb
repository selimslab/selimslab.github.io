require 'json'

NOTES_PATH = "./_NOTES"
CODE_PATH = "./_CODE"

class SiteGenerator < Jekyll::Generator
    def generate(site)

      init(site)

      generate_tree(site)

      site.documents.each do |doc|
        process_doc(doc, site)
      end

      # add ideas to site.data
      site.data["ideas"] = JSON.parse(File.read("./assets/data/ideas.json")).sort

    end

    def init(site)
      fix_frontmatter()

      site.documents.each do |doc|
        doc.data['backlinks'] ||= []
      end

      site.data["file_to_tag"] = site.data["tag_to_file"].invert

      site.data["file_to_title"] = site.documents.map do |doc|
        [doc.id.sub(/^\//, ''), doc.data["title"]]
      end.to_h

    end

    def generate_tree(site)
      tree= bfs(site, NOTES_PATH)
      site.data["tree"] = tree

      site.data["tree_htmls"] = {}
      tree_to_html(site, tree, "root")

      site.data["tree_htmls_without_self"] = {}
      # for each element in site.data["tree_htmls"], remove link to self
      site.data["tree_htmls"].each do |k, v|
        site.data["tree_htmls_without_self"][k] = v.gsub(/<a href='#{k}\/'>.*?<\/a>/, "")
      end

      bfs(site, CODE_PATH)
    end

    def fix_frontmatter()
      Dir.glob("_NOTES/**/*.md") do |file|
        # Read the content of each file
        content = File.read(file)

        # Trim leading whitespace
        content.lstrip!

        # Check if the file has front matter
        if !content.start_with?("---")
          # If not, add front matter at the beginning
          new_content = "---\n---\n#{content}"

          # Write the updated content back to the file
          File.open(file, "w") { |f| f.write(new_content) }

          puts "Added front matter to: #{file}"
        end
      end
    end


    def process_doc(doc, site)
      remove_tags_to_parent(doc, site)

      wikilinks_to_backlinks(doc, site)
      tags_to_backlinks(doc, site)

      # remove links to self
      doc.data['backlinks'] = doc.data['backlinks'].reject { |e| e.id == doc.id }.uniq.sort_by { |e| e.data["title"] }

      replace_links_in_content(doc, site)
    end

    def remove_tags_to_parent(doc, site)
        # remove_circular_tags
        basename = doc.id.sub(/^\//, '')
        doc.data['tags'] = doc.data['tags'].reject { |e| e == basename }

        # remove tags to parent
        parent_basename = doc.data['parent_basename']
        parent_shorttag = site.data["file_to_tag"][parent_basename]
        doc.data['tags'] = doc.data['tags'].reject { |e| e == parent_shorttag  }
        doc.data['tags'] = doc.data['tags'].reject { |e| e == parent_basename  }

        # dedup tags
        doc.data['tags'] = doc.data['tags'].uniq.sort

    end

    def wikilinks_to_backlinks(doc, site)
      source_basename = doc.id.sub(/^\//, '')
      linking_to_doc = site.documents.select do |e|
        e.content.include?("[[#{source_basename}]]") || e.content.include?("(/#{source_basename})")
      end

      linking_to_doc.each do |linking_doc|
        next if doc.data["children"]&.include?(linking_doc.id)
        doc.data['backlinks'] << linking_doc
      end
    end

    def tags_to_backlinks(doc, site)
      tag_to_file = site.data["tag_to_file"]
      basename = doc.id.sub(/^\//, '')

      doc.data["tags"].each do |tag|
        tagfileid = tag_to_file.has_key?(tag) ? "/" + tag_to_file[tag] : "/" + tag

        tagdocs = site.documents.select { |e| e.id == tagfileid }
        next if tagdocs.empty?
        tagged_doc = tagdocs.first

        tagged_doc.data['backlinks'] ||= []
        tagged_doc.data['backlinks'] << doc
      end
    end

    def replace_links_in_content(doc, site)
      tag_to_file = site.data["tag_to_file"]
      file_to_title = site.data["file_to_title"]

      links = doc.content.scan(/\[\[[a-z0-9-]*\]\]/)
      links.each do |link|
        target = link.gsub(/\[\[/, '').gsub(/\]\]/, '')
        target = tag_to_file[target] if tag_to_file.has_key?(target)
        title = file_to_title[target]
        markdown_link = "[#{title}](/#{target}/)"
        doc.content = doc.content.gsub(/#{Regexp.escape(link)}/, markdown_link)
      end
    end

    def bfs(site, path)
      tree = {}
      queue = [[path, tree]]
      root = nil

      while !queue.empty?
        parent_path, branch = queue.shift
        parent_basename = File.basename(parent_path)
        parent_id = "/" + parent_basename

        root ||= parent_id

        branch[parent_id] ||= {}

        Dir.entries(parent_path).sort.each do |child|
          next if ['.', '..', '.', '_'].include?(child) || child.start_with?('.')

          child_basename = File.basename(child)
          child_path = File.join(parent_path, child)

          if File.directory?(child_path)
            child_id = "/" + child_basename
            next if child_id == parent_id
            queue.push([child_path, branch[parent_id]])
          elsif path != parent_basename
            child_id = "/" + child_basename.sub(/\..*/, '')

            link_to_parent(site, child_basename, child_id, parent_basename, parent_id)
          end
          branch[parent_id][child_id] ||= {}
        end
      end

      return tree[root]

    end

    def tree_to_html(site, tree, root_id)

      html = ""

      unless tree.empty?
        html += "<ul>"
        tree.each do |file_id, children|
          docs = site.documents.select { |e| e.id == file_id }
          next if docs.empty?

          doc = docs.first
          title = doc.data["title"]

          # sort children by length and then by title
          children = children.sort_by { |k, v| [-v.length, site.data["file_to_title"][k]] }.to_h

          if children.empty?
            html += "<li><a href='#{file_id}/'>#{title}</a></li>"
          else
            html += "<details><summary>#{title}</summary>"
            html += "<li>" + tree_to_html(site, children, file_id) + "</li></details>"
          end
        end
        html += "</ul>"
        site.data["tree_htmls"][root_id] = html
      end

      return html
    end

    def link_to_parent(site, child_basename, child_id, parent_basename, parent_id)
      parent_basename = "code" if parent_basename == "_CODE"

      child_doc = site.documents.find { |e| e.id == child_id }
      parent_doc = site.documents.find { |e| e.id == parent_id }

      return unless child_doc && parent_doc && child_doc != parent_doc

      link = "<a class='toplink' href='#{parent_id}/'>#{parent_doc.data['title']}</a>"
      child_doc.data['parentlink'] = link
      child_doc.data['parent_basename'] = parent_basename

      parent_doc.data['children'] ||= []
      parent_doc.data['children'] << child_basename
    end

    def reverse_tree(tree)
      return tree if tree.nil? || tree.empty?

      reversed_tree = {}
      tree.each do |key, value|
        reversed_tree[key] = reverse_tree(value)
      end

      reversed_tree
    end




  end
