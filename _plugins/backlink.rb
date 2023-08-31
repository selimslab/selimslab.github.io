class BackLinksGenerator < Jekyll::Generator
    def generate(site)
          
      if (!defined?@render_count)
        @render_count = 1
      end
    
      if @render_count > 1
        return
      end

      @render_count += 1

      site.data["ideas"] = JSON.parse(File.read("./assets/data/ideas.json")).sort

      add_backlinks_to_notes(site)

    end 
    

    def add_backlinks_to_notes(site)
      site.documents.each do |current_note|

        notes_linking_to_current_note = site.documents.filter do |e|
            # puts e.path
            id = "[" + current_note.id.gsub(/\//, '') + "]"
            e.content.include?(id)
        end

        current_note.data['backlinks'] = notes_linking_to_current_note

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


        backlinks = current_note.content.scan(/\[\[[a-z0-9-]*\]\]/)
        link_count += backlinks.length
        backlinks.each do |backlink| 
          # parse wikilink 
          match = backlink.gsub(/\[\[/, '').gsub(/\]\]/, '')
          link = "/" + match

          graph["links"].push({"source": id, "target": link})
          graph["links"].push({"source": link, "target": id})

          # replace wikilinks
          title = match.gsub(/-/, ' ').capitalize
          link = "[#{title}](#{link})"
          current_note.content = current_note.content.gsub(/#{Regexp.escape(backlink)}/, link)
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