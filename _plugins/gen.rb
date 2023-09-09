require 'json'


class SiteGenerator < Jekyll::Generator
    # file means a file base name, without extension, eg. my-file  
    def generate(site)
      site.data["ideas"] = JSON.parse(File.read("./assets/data/ideas.json")).sort

      visit_links(site)

    end 


    def visit_links(site)

      tags_to_files = site.data["tags_to_files"]

      file_to_tag_map = tags_to_files.map { |k, v| [v, k] }.to_h
      
      file_to_title_map = site.documents.map { |doc| [doc.id.sub(/^\//, ''), doc.data["title"]] }.to_h
      site.data["file_to_title_map"] = file_to_title_map

      site.documents.each do |doc|
        
        # add backlinks to doc
        doc.data['backlinks'] ||= []
        src = doc.id.sub(/^\//, '')
        src_link = "[" + src + "]"
        linking_to_doc = site.documents.filter do |e| e.content.include?(src_link) end
        # append linked docs to backlinks
        linking_to_doc.each do |linking_doc|
          doc.data['backlinks'] << linking_doc
        end
        
        # if this doc has essais tag, add it to the backlinks of essais.md 
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

      site.documents.each do |doc|   
        doc.data['backlinks'] = doc.data['backlinks'].reject { |e| e.id == doc.id }
        doc.data['backlinks'] = doc.data['backlinks'].uniq.sort
        # remove circular tags
        file = doc.id.sub(/^\//, '')
        doc.data['tags'] = doc.data['tags'].reject { |e| e == file }

      end


    end


  end