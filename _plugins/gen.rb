require 'json'


class SiteGenerator < Jekyll::Generator
    def generate(site)
      fix_frontmatter()
      init_backlinks(site)
      link_to_parent = create_link_to_parent(site)
      level_order_directory_traversal("./_NOTES", link_to_parent)
      remove_circular_tags(site)
      visit_links(site)
      remove_self_links(site)
      # add ideas to site.data
      site.data["ideas"] = JSON.parse(File.read("./assets/data/ideas.json")).sort
    end 

    def fix_frontmatter()
      # Iterate through all files in the _posts directory
      Dir.glob("_NOTES/**/*.md") do |file|
        # Read the content of each file
        content = File.read(file)

        # Trim leading whitespace
        content.lstrip!

        # Check if the file has front matter
        if !content.start_with?("---")
          puts content
          # If not, add front matter at the beginning
          new_content = "---\n---\n#{content}"

          # Write the updated content back to the file
          File.open(file, "w") { |f| f.write(new_content) }

          puts "Added front matter to: #{file}"
        end
      end
    end 

    def init_backlinks(site)
      site.documents.each do |doc|
        doc.data['backlinks'] ||= []
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
          doc.data['backlinks'] << linking_doc
        end
        
        # if this doc has essais tag, its a child of essais
        tags = doc.data["tags"]
        tags.each do |tag|
          tagfileid = "/" + tag 
          tagfiles = site.documents.filter do |e| e.id == tagfileid end
          tagfiles.each do |tagfile|
            tagfile.data['children'] ||= []
            tagfile.data['children'] << doc
          end
        end

        # handle short tags 
        if file_to_tag_map.has_key?(src)
          tag = file_to_tag_map[src]
          # which documents are tagged with this tag?
          tagged_to_doc = site.documents.filter do |e| e.data["tags"].include?(tag) end
          # append tagged docs to backlinks
          tagged_to_doc.each do |tagged_doc|
            doc.data['backlinks'] << tagged_doc
          end
        end
        
        # replace [[file]] with [title](/file)
        links = doc.content.scan(/\[\[[a-z0-9-]*\]\]/)
        links.each do |link|
          trg = link.gsub(/\[\[/, '').gsub(/\]\]/, '')
          if tags_to_files.has_key?(trg)
            trg = tags_to_files[trg]
          end
          title = file_to_title_map[trg]
          markdown_link = "[#{title}](/#{trg})"
          doc.content = doc.content.gsub(/#{Regexp.escape(link)}/, markdown_link)
        end 
      end

    end

    def level_order_directory_traversal(root_dir, func)
      queue = [root_dir] # Initialize the queue with the root directory
    
      while !queue.empty?
        level_size = queue.size
    
        # Process all directories at the current level
        level_directories = []
    
        level_size.times do
          current_dir = queue.shift # Dequeue the next directory
          level_directories << current_dir
    
          # List all files and directories in the current directory
          entries = Dir.entries(current_dir).reject { |e| e == "." || e == ".." || current_dir == '.obsidian'}
    
          entries.each do |entry|
            entry_path = File.join(current_dir, entry)
            func.call(entry_path)
            if File.directory?(entry_path)
              queue << entry_path # Enqueue subdirectories
            end
          end
        end
    
      end
    end

    def create_link_to_parent(site)
      return lambda do |entry_path|
        # take immediate parent dir 
        name = File.basename(entry_path)
        parent = File.basename(File.dirname(entry_path))        
        if parent == "_NOTES" 
          return 
        end
        # remove extension
        id = "/" + name.sub(/\..*/, '')
        docs = site.documents.filter do |e| e.id == id end
    
        if docs.length > 0 
          doc = docs[0]
          doc.data['tags'] ||= []
          doc.data['tags'] << parent
        end
      end
    end

  end