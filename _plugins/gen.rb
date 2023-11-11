require 'json'


class SiteGenerator < Jekyll::Generator
    def generate(site)

      site.documents.each do |doc|
        doc.data['backlinks'] ||= []
      end 

      site.data["ideas"] = JSON.parse(File.read("./assets/data/ideas.json")).sort

      link_to_parent = create_link_to_parent(site)
      level_order_directory_traversal("./_NOTES", link_to_parent)

      site.documents.each do |doc|   
        # remove circular tags
        file = doc.id.sub(/^\//, '')
        doc.data['tags'] = doc.data['tags'].reject { |e| e == file }.uniq.sort
      end

      visit_links(site)

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
          e.content.include?(src) 
        end        # append linked docs to backlinks
        linking_to_doc.each do |linking_doc|
          doc.data['backlinks'] << linking_doc
        end
        
        # tags to backlinks
        # if this doc has essais tag, add it to the backlinks of essais.md 
        # or if its under projects folder, walker will add projects to its tags, 
        tags = doc.data["tags"]
        tags.each do |tag|
          # any doc with this tag in id 
          tagfileid = "/" + tag 
          tagfiles = site.documents.filter do |e| e.id == tagfileid end
          # append tagged docs to backlinks
          tagfiles.each do |tagfile|
            tagfile.data['backlinks'] ||= []
            tagfile.data['backlinks'] << doc
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