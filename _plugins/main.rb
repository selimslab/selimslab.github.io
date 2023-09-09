require 'json'

class SiteGenerator < Jekyll::Generator
    def generate(site)
        
      titles = {}
      site.documents.each do |doc|
        titles[doc.id] = doc.data["title"]
        add_backlinks_to_notes(doc, site)
        replace_wikilinks(doc, titles)
      end 

      site.data["ideas"] = JSON.parse(File.read("./assets/data/ideas.json")).sort
      add_tree(titles)
    end 

    def add_tree(titles)
      tree = generate_json_tree("./_NOTES", titles)
      tree['items'].sort_by! { |entry| entry['name'] }
      treelist = []
      treelist << tree
      File.open('_data/tree.json', 'w') do |file|
        file.puts JSON.pretty_generate(treelist)
      end
    end

    def generate_json_tree(directory, titles)
      tree = {
        'name' => directory.gsub(/\/$/, '').split('/').last,
        'type' => 'dir',
        'title' => '',
        'items' => []
      }
    
      Dir.foreach(directory) do |entry|
        next if entry == '.' || entry == '..'
    
        entry_path = File.join(directory, entry)
        entry_object = {
          'name' => entry.gsub(/\.md$/, ''),
          'type' => File.directory?(entry_path) ? 'dir' : 'file'
        }

        if entry_object['type'] == 'file'
          id = "/" + entry_object['name']
          entry_object['title'] = titles[id]
        else
          entry_object['title'] = entry_object['name'].gsub(/-/, ' ').capitalize
        end 

        if File.directory?(entry_path)
          entry_object['items'] = generate_json_tree(entry_path, titles)['items']
        end
    
        tree['items'] << entry_object
      end
    
      # Sort the entries within the directory alphabetically
      tree['items'].sort_by! { |entry| entry['name'] }
    
      tree
    end
    
    def add_backlinks_to_notes(doc, site)
        id = "[" + doc.id.gsub(/\//, '') + "]"
        linking_to_doc = site.documents.filter do |e| e.content.include?(id) end
        doc.data['backlinks'] = linking_to_doc
    end

    def replace_wikilinks(doc, titles)
      wikilinks = doc.content.scan(/\[\[[a-z0-9-]*\]\]/)
      wikilinks.each do |wikilink| 
        id = "/" + wikilink.gsub(/\[\[/, '').gsub(/\]\]/, '')
        title = titles[id]
        link = "[#{title}](#{id})"
        doc.content = doc.content.gsub(/#{Regexp.escape(wikilink)}/, link)
      end 
    end

    def build_graph(site)
      graph = {}
      graph["nodes"] = {}
      graph["links"] = []
      titles = {}

      seen = {}

      tagtofilename = site.data["tagtofilename"]

      link_count = 0 

      site.documents.each do |current_note|        
        id = current_note.id
        
        title = current_note.data["title"]
        node = {"id": id, "name": title, "val": 1, "type": "note", "neighbors": [], "links":[], "group": 0}
        graph["nodes"][id] = node
        
        current_note.data["tags"].each do |tag|
          if not seen.key?(tag)
            name = tag
            if tagtofilename.key?(tag) 
              name = tagtofilename[tag] 
            end

            node = {"id": tag, "name": "#" + name, "val": 1, "type": "tag", "neighbors": [], "links":[], "group": tag}
            graph["nodes"][tag] = node
            seen[tag] = true
          end 

          graph["links"].push({"source": id, "target": tag})
          graph["links"].push({"source": tag, "target": id})

        end 


        wikilinks = current_note.content.scan(/\[\[[a-z0-9-]*\]\]/)
        link_count += wikilinks.length
        wikilinks.each do |wikilink| 
          # parse wikilink 
          title = wikilink.gsub(/\[\[/, '').gsub(/\]\]/, '')
          link = "/" + title

          graph["links"].push({"source": id, "target": link})
          graph["links"].push({"source": link, "target": id})

          # replace wikilinks
          title = match.gsub(/-/, ' ').capitalize
          link = "[#{title}](#{link})"
          current_note.content = current_note.content.gsub(/#{Regexp.escape(wikilink)}/, link)
        end 
        
      end

      graph["links"] = graph["links"].uniq 
      
      graph["links"].each {
        |link|
          begin 
          # puts link
          source = link[:source]
          target = link[:target]

          # add neighbors
          graph["nodes"][source][:val] += 0.5
          graph["nodes"][target][:val] += 0.5

          graph["nodes"][source][:neighbors].push(target)
          graph["nodes"][target][:neighbors].push(source)

          graph["nodes"][target][:links].push(link)
          graph["nodes"][source][:links].push(link)
          rescue => exception
            puts exception
            puts target 
            puts source 
          end
    }

      graph["nodes"].each do |k,v|
        graph["nodes"][k][:links] = graph["nodes"][k][:links].uniq
        graph["nodes"][k][:neighbors] = graph["nodes"][k][:neighbors].uniq
      end 


      File.open("./assets/data/graph.json","w") do |f|
        f.write(graph.to_json)
      end
      
      site.data["link_count"] = link_count

    end
  
  end