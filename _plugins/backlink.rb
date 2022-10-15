class BackLinksGenerator < Jekyll::Generator
    def generate(site)
  
      # Identify backlinks and add them to each doc
      site.documents.each do |current_note|

        notes_linking_to_current_note = site.documents.filter do |e|
            id = "[" + current_note.id.gsub(/\//, '') + "]"
            e.content.include?(id)
        end

        current_note.data['backlinks'] = notes_linking_to_current_note

        backlinks = current_note.content.scan(/\[\[.*\]\]/)
        backlinks.each do |backlink| 
          id = backlink.gsub(/\[\[/, '').gsub(/\]\]/, '')
          link = "/" + id
          title = id.gsub(/-/, ' ')
          link = "[#{title}](#{link})"
          current_note.content = current_note.content.gsub(/#{Regexp.escape(backlink)}/, link)
        end 
      end
  
    end
  
  end