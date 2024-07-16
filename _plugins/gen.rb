require 'json'

NOTES_PATH = "./_NOTES"
CODE_PATH = "./_CODE"

class SiteGenerator < Jekyll::Generator
    def generate(site)

      fix_frontmatter()

      site.documents.each do |doc|
        doc.data['backlinks'] ||= []
      end 

      site.data["file_to_title"] = site.documents.map do |doc| 
        [doc.id.sub(/^\//, ''), doc.data["title"]]
      end.to_h

      site.data["dirs"] = Hash.new { |hash, key| hash[key] = [] }

      bfs(site, NOTES_PATH)
      bfs(site, CODE_PATH)

      site.data["dirs"].each do |k, v|
        site.data["dirs"][k] = v.sort
      end

      visit_links(site)

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

\
    def visit_links(site)
      site.documents.each do |doc|
        process_incoming_links(doc, site)
        process_tags_to_backlinks(doc, site)
        replace_links_in_content(doc, site)

        # remove links to self 
        doc.data['backlinks'] = doc.data['backlinks'].reject { |e| e.id == doc.id }.uniq.sort_by { |e| e.data["title"] }
        
        # dedup tags 
        doc.data['tags'] = doc.data['tags'].uniq

        # remove_circular_tags
        id = doc.id.sub(/^\//, '')
        doc.data['tags'] = doc.data['tags'].reject { |e| e == id }.uniq.sort

      end

    end
    
    def process_incoming_links(doc, site)
      src = doc.id.sub(/^\//, '')
      linking_to_doc = site.documents.select do |e|
        e.content.include?("[[#{src}]]") || e.content.include?("(/#{src})")
      end
    
      linking_to_doc.each do |linking_doc|
        next if site.data["dirs"][doc.id].include?(linking_doc.id)
    
        doc.data['backlinks'] << linking_doc
      end
    end
    
    def process_tags_to_backlinks(doc, site)
      tag_to_file = site.data["tag_to_file"]
    
      doc.data["tags"].each do |tag|
        tagfileid = tag_to_file.has_key?(tag) ? "/" + tag_to_file[tag] : "/" + tag
    
        tagfiles = site.documents.select { |e| e.id == tagfileid }
        tagfiles.each do |tagfile|
          next if site.data["dirs"][tagfileid].include?(doc.id)
    
          tagfile.data['backlinks'] ||= []
          tagfile.data['backlinks'] << doc
        end
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
        if root.nil?
          root = parent_id
        end

        branch[parent_id] ||= {}

        entries = Dir.entries(parent_path)
        # sort entries
        entries.sort_by! { |e| e.downcase }

        entries.each do |child|

          next if child == '.' || child == '..'  || child.start_with?('.') || child.start_with?('_') 

          child_basename = File.basename(child)
          child_path = File.join(parent_path, child)

          if File.directory?(child_path)
            # both child and parent_basename are dirs, no need to strip .md 
            child_id = "/" + child_basename

            site.data["dirs"][parent_id] << child_id
            queue.push([child_path, branch[parent_id]])
            
          elsif path != parent_basename
            child_id = "/" + child_basename.sub(/\..*/, '')
            tag_to_parent(site, child_basename, child_id, parent_basename, parent_id)
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

    def tag_to_parent(site, child_basename, child_id, parent_basename, parent_id)
      if parent_basename == "_CODE"
        parent_basename = "code"
      end
      child_doc = site.documents.find { |e| e.id == child_id }
      parent_doc = site.documents.find { |e| e.id == parent_id }

      if child_doc
        child_doc.data['tags'] ||= []
        child_doc.data['tags'] << parent_basename
      end

      if parent_doc
        parent_doc.data['children'] ||= []
        parent_doc.data['children'] << child_basename
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
        # sort children by their children count descending, keep alphabetical order
        children = children.sort_by { |k, v| [-v.length, k] }.to_h
        
        if children.empty?
          html += "<li><a href='#{id}/' target='_blank'>#{title}</a></li>" 
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

  end