class BackLinksGenerator < Jekyll::Generator
    def generate(site)
  
      # Identify backlinks and add them to each doc
      site.documents.each do |current_note|

        notes_linking_to_current_note = site.documents.filter do |e|
            id = "[" + current_note.id.gsub(/\//, '') + "]"
            e.content.include?(id)
        end

        current_note.data['backlinks'] = notes_linking_to_current_note

      end
  
    end
  
  end