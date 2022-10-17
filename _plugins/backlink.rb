class BackLinksGenerator < Jekyll::Generator
    def generate(site)
      
      links = {}
      titles = {}
      # Identify backlinks and add them to each doc
      site.documents.each do |current_note|
        notes_linking_to_current_note = site.documents.filter do |e|
            id = "[" + current_note.id.gsub(/\//, '') + "]"
            e.content.include?(id)
        end

        current_note.data['backlinks'] = notes_linking_to_current_note

        links[current_note.id] = []
        titles[current_note.id] = current_note.data["title"]
        backlinks = current_note.content.scan(/\[\[.*\]\]/)
        
        backlinks.each do |backlink| 
          id = backlink.gsub(/\[\[/, '').gsub(/\]\]/, '')
          link = "/" + id
          links[current_note.id].push(link)
          title = id.gsub(/-/, ' ')
          link = "[#{title}](#{link})"
          current_note.content = current_note.content.gsub(/#{Regexp.escape(backlink)}/, link)
        end 

        links[current_note.id] = links[current_note.id].sort

      end

      links = Hash[links.sort]
      titles = Hash[titles.sort]

      File.open("./assets/data/links.json","w") do |f|
        f.write(links.to_json)
      end
      
      File.open("./assets/data/titles.json","w") do |f|
        f.write(titles.to_json)
      end
  
    end
  
  end