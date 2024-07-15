require 'json'

NOTES_PATH = "./_NOTES"
CODE_PATH = "./_CODE"

class SiteGenerator < Jekyll::Generator
    def generate(site)

      fix_frontmatter()

      site.documents.each do |doc|
        doc.data['backlinks'] ||= []
      end 

      site.data["dirs"] = Hash.new { |hash, key| hash[key] = [] }
      
      bfs(site, NOTES_PATH)
      bfs(site, CODE_PATH)
      
      remove_circular_tags(site)
      visit_links(site)
      remove_self_links(site)

      # sort all values in site.data["dirs"]
      site.data["dirs"].each do |k, v|
        site.data["dirs"][k] = v.sort
      end

      # add ideas to site.data
      site.data["ideas"] = JSON.parse(File.read("./assets/data/ideas.json")).sort

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

    def remove_circular_tags(site)
      site.documents.each do |doc|   
        # remove circular tags
        file = doc.id.sub(/^\//, '')
        doc.data['tags'] = doc.data['tags'].reject { |e| e == file }.uniq.sort
      end

    end 

    def remove_self_links(site)
      site.documents.each do |doc|   
        doc.data['backlinks'] = doc.data['backlinks'].reject { |e| e.id == doc.id }.uniq.sort_by { |e| e.data["title"] }
      end
    end

    def visit_links(site)

      tags_to_files = site.data["tags_to_files"]

      file_to_tag_map = tags_to_files.map { |k, v| [v, k] }.to_h
      
      file_to_title_map = site.documents.map { |doc| [doc.id.sub(/^\//, ''), doc.data["title"]] }.to_h
      site.data["file_to_title_map"] = file_to_title_map

      site.documents.each do |doc|
        # incoming links
        src = doc.id.sub(/^\//, '')
        linking_to_doc = site.documents.filter do |e|
          # select which includes [src] or /src 
          e.content.include?("[[#{src}]]") || e.content.include?("(/#{src})") 
        end        
        # append linked docs to backlinks
        linking_to_doc.each do |linking_doc|
          # skip dirs 
          if site.data["dirs"][doc.id].include?(linking_doc.id)
            next
          end
          doc.data['backlinks'] << linking_doc
        end
        
        # tags to backlinks
        # if this doc has essais tag, add it to the backlinks of essais.md 
        # or if its under projects folder, walker will add projects to its tags, 
        doc.data["tags"].each do |tag|
          # any doc with this tag in id 
          tagfileid = "/" + tag 
          # if tag in tags_to_files, use that instead
          if tags_to_files.has_key?(tag)
            tagfileid = "/" + tags_to_files[tag]
          end

          tagfiles = site.documents.filter do |e| e.id == tagfileid  end
          # append tagged docs to backlinks
          tagfiles.each do |tagfile|
            tagfile.data['backlinks'] ||= []
            # if doc in site.data["dirs"][tagfileid], do not add to backlinks
            if site.data["dirs"][tagfileid].include?(doc.id)
              next
            end
            tagfile.data['backlinks'] << doc
          end
        end

        # replace [[file]] with [title](/file/)
        links = doc.content.scan(/\[\[[a-z0-9-]*\]\]/)
        links.each do |link|
          trg = link.gsub(/\[\[/, '').gsub(/\]\]/, '')
          if tags_to_files.has_key?(trg)
            trg = tags_to_files[trg]
          end
          title = file_to_title_map[trg]
          markdown_link = "[#{title}](/#{trg}/)"
          doc.content = doc.content.gsub(/#{Regexp.escape(link)}/, markdown_link)
        end 
      end

    end

    def tree_to_html(site, tree)
      return "" if tree.empty?
      html = "<ul>"
      tree.each do |id, children|
        docs = site.documents.select { |e| e.id == id }
        next if docs.empty?
        doc = docs.first
        title = doc.data["title"]

        if children.empty?
          html += "<li><a href='#{id}/'>#{title}</a></li>" 
        else
          html += "<details>"
          html += "<summary>#{title}</summary>"
          html += "<li>"
          html += tree_to_html(site, children)
          html += "</li></details>"
        end
      end
      html += "</ul>"
      
      html
    end
    

    def bfs(site, path)
      
      tree = {}
      queue = [[path, tree]]
      root = nil 

      while !queue.empty?
        parent_path, branch = queue.shift
        parent_basename = File.basename(parent_path)
        parent_id = "/" + parent_basename
        if root.nil?
          root = parent_id
        end

        branch[parent_id] ||= {}

        entries = Dir.entries(parent_path)
        # sort entries
        entries.sort_by! { |e| e.downcase }

        entries.each do |child|

          next if child == '.' || child == '..'  || child.start_with?('.') || child.start_with?('_') 

          child_path = File.join(parent_path, child)

          if File.directory?(child_path)
            # both child and parent_basename are dirs, no need to strip .md 
            child_id = "/" + File.basename(child)

            site.data["dirs"][parent_id] << child_id
            queue.push([child_path, branch[parent_id]])
            
          elsif path != parent_basename
            tag_to_parent(site, child, parent_basename)
            child_id = "/" + File.basename(child).sub(/\..*/, '')
          end
          branch[parent_id][child_id] ||= {}

        end
    
      end
      
      tree = tree[root]
      
      if path == NOTES_PATH
        site.data["tree"] = tree
        html = tree_to_html(site, tree)
        site.data["tree_html"] = html
      end 

    end

    def tag_to_parent(site, child, parent)
      if parent == "_CODE"
        parent = "code"
      end
      # take immediate parent dir 
      id = "/" + File.basename(child).sub(/\..*/, '')
      docs = site.documents.filter do |e| e.id == id end
  
      if docs.length > 0 
        doc = docs[0]
        doc.data['tags'] ||= []
        doc.data['tags'] << parent
      end

    end

  end