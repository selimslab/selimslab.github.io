class BackLinksGenerator < Jekyll::Generator
    def generate(site)
      
      graph = {}
      graph["nodes"] = {}
      graph["links"] = []
      titles = {}

      seen = {}

      tagnames = site.data["tags"]

      site.documents.each do |current_note|
        
        notes_linking_to_current_note = site.documents.filter do |e|
            id = "[" + current_note.id.gsub(/\//, '') + "]"
            e.content.include?(id)
        end

        current_note.data['backlinks'] = notes_linking_to_current_note
        
        id = current_note.id
        
        title = current_note.data["title"]
        node = {"id": id, "name": title, "val": 1, "type": "note", "neighbors": [], "links":[]}
        graph["nodes"][id] = node
        
        current_note.data["tags"].each do |tag|
          if not seen.key?(tag)
            name = tag
            if tagnames.key?(tag) 
              name = tagnames[tag] 
            end

            node = {"id": tag, "name": "#" + name, "val": 1, "type": "tag", "neighbors": [], "links":[]}
            graph["nodes"][tag] = node
            seen[tag] = true
          end 
          graph["links"].push({"source": id, "target": tag})
        end 


        backlinks = current_note.content.scan(/\[\[.*\]\]/)
        
        backlinks.each do |backlink| 
          # parse wikilink 
          match = backlink.gsub(/\[\[/, '').gsub(/\]\]/, '')
          link = "/" + match

          graph["links"].push({"source": id, "target": link})

          # replace wikilinks
          title = id.gsub(/-/, ' ')
          link = "[#{title}](#{link})"
          current_note.content = current_note.content.gsub(/#{Regexp.escape(backlink)}/, link)
        end 

      end

      graph["links"].each {
        |link|
          source = link[:source]
          target = link[:target]
          # add neighbors
          graph["nodes"][source][:val] += 1
          graph["nodes"][target][:val] += 1

          # graph["nodes"][source][:neighbors].push(target)
          # graph["nodes"][target][:neighbors].push(source)

          # graph["nodes"][target][:links].push(link)
          # graph["nodes"][source][:links].push(link)

    }


      graph["nodes"] = graph["nodes"].values
      File.open("./assets/data/graph.json","w") do |f|
        f.write(graph.to_json)
      end
    

    end
  
  end