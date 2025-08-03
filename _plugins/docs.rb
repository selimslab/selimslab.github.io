class DocumentProcessor < Jekyll::Generator
  priority :low

  def generate(site)
    process_documents(site)
  end

  private

  def process_documents(site)
    # First pass: process each document's tags and links
    site.documents
      .select { |doc| doc.respond_to?(:data) && doc.respond_to?(:content) }
      .each do |doc|
        # Normalize tags
        doc.data['tags'] = (doc.data['tags'] || []).uniq.sort
        
        # Process backlinks
        wikilinks_to_backlinks(doc, site)
        tags_to_backlinks(doc, site)
        
        # Clean up backlinks if they exist
        if doc.data['backlinks']
          # Remove self-references
          doc.data['backlinks'].reject! { |e| e.respond_to?(:id) && e.id == doc.id }
          
          # Sort by title
          doc.data['backlinks'].sort_by! do |e| 
            e.respond_to?(:data) && e.data["title"] ? e.data["title"] : ""
          end
        end
        
        # Replace wiki-style links with markdown links
        replace_links_in_content(doc, site)
      end

    # Second pass: ensure backlinks are unique
    site.documents
      .select { |doc| doc.respond_to?(:data) && doc.data['backlinks'] }
      .each { |doc| doc.data['backlinks'].uniq! }
  end

  def wikilinks_to_backlinks(doc, site)
    return unless doc.respond_to?(:id)
    
    # Get the basename without leading slash
    source_basename = doc.id.delete_prefix('/')
    
    # Find documents that link to this document via wiki links or markdown links
    linking_docs = site.documents.select do |other_doc|
      other_doc.respond_to?(:content) && 
        (other_doc.content.include?("[[#{source_basename}]]") || 
         other_doc.content.include?("(/#{source_basename})"))
    end

    # Add each linking document to this document's backlinks
    linking_docs.each do |linking_doc|
      # Skip if this document already has the linking document as a child
      linking_id = linking_doc.respond_to?(:id) ? linking_doc.id : nil
      next if doc.data['children']&.include?(linking_id)
      
      # Add to backlinks
      doc.data['backlinks'] << linking_doc
    end
  end

  def tags_to_backlinks(doc, site)
    return unless doc.respond_to?(:data) && doc.data["tags"]
    
    doc_id = doc.respond_to?(:id) ? doc.id : nil

    # Process each tag in the document
    doc.data["tags"].each do |tag|
      # Get the file ID for this tag
      tag_file_id = "/#{tag}"
      
      # Find the document corresponding to this tag
      tagged_doc = site.documents.find { |d| d.respond_to?(:id) && d.id == tag_file_id }
      next unless tagged_doc
      
      # Skip if this document is already a child of the tag document
      next if tagged_doc.data['children']&.include?(doc_id)

      # Add this document as a backlink to the tag document
      tagged_doc.data['backlinks'] ||= []
      tagged_doc.data['backlinks'] << doc
    end
  end

  def replace_links_in_content(doc, site)
    return unless doc.respond_to?(:content) && doc.respond_to?(:data)
    
    file_to_title = site.data["file_to_title"]
    
    # Find all wiki-style links [[link]] and replace them with markdown links
    doc.content.scan(/\[\[[a-z0-9-]*\]\]/).each do |link|
      # Extract the target from the wiki link (remove the brackets)
      target = link[2...-2]  # Changed from [2...-1] to [2...-2] to remove both closing brackets
      
      # Get the title for the target
      title = file_to_title["/#{target}"]
      
      # Create a markdown link and replace the wiki link
      markdown_link = "[#{title}](/#{target}/)"
      doc.content.gsub!(link, markdown_link)
    end
  end
end 