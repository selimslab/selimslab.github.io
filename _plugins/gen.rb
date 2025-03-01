require 'json'
require 'pp'

ROOT_PATH = "./_CONTENT".freeze
ASSETS_PATH = "./assets".freeze
STATIC_PATH = "#{ASSETS_PATH}/static".freeze
DATA_PATH = "#{ASSETS_PATH}/data".freeze
DEBUG = false

class SiteGenerator < Jekyll::Generator
  def initialize(config = {})
    @fixed_frontmatter = false
    @generated = false
    @config = config
  end

  def generate(site)
    return if @generated

    fix_frontmatter unless @fixed_frontmatter

    initialize_site_data(site)
    tree = generate_tree(site)
    site.data["tree"] = tree
    tree_level_order_data = tree_level_order(tree)
    site.data["tree_level_order"] = tree_level_order_data
    
    tree_to_html(site, tree)
    log_debug_data(tree, site) if DEBUG

    process_documents(site)

    graph = generate_graph(site)
    site.data["link_count"] = calculate_link_count(site, graph)

    update_ideas(site)
    update_artworks(site)
    update_tags(site)

    @generated = true
  end

  private

  def initialize_site_data(site)
    site.data["tree"] = {}
    site.data["tree_htmls"] = {}
    site.data["tree_level_order"] = {}
    initialize_backlinks(site)
    initialize_file_to_tag(site)
    initialize_file_to_title(site)
  end

  def log_debug_data(tree, site)
    write_json("#{DATA_PATH}/tree.json", tree)
    write_json("#{DATA_PATH}/tree_level_order.json", site.data["tree_level_order"])
    write_json("#{DATA_PATH}/tree_htmls.json", site.data["tree_htmls"])

  end

  def update_ideas(site)
    # Load ideas from JSON file
    ideas = JSON.parse(File.read("#{DATA_PATH}/ideas.json"))
    
    # Shuffle ideas in debug mode for testing
    ideas.shuffle!(random: Random.new(ideas.length)) if DEBUG
    
    # Write updated ideas back to JSON file
    write_json("#{DATA_PATH}/ideas.json", ideas)
    
    # Make ideas available in site data
    site.data["ideas"] = ideas
  end

  def update_artworks(site)
    # Get artwork data from image files
    artworks = get_artworks
    
    # Write artwork data to JSON file
    write_json("#{DATA_PATH}/artworks.json", artworks)
    
    # Make artworks available in site data
    site.data["artworks"] = artworks
  end

  def update_tags(site)
    tags_data = site.documents
      .select { |doc| doc.respond_to?(:id) && doc.respond_to?(:data) && doc.data["tags"] }
      .to_h { |doc| [doc.id, doc.data["tags"]] }
    
    write_json("#{DATA_PATH}/tags.json", tags_data)
  end

  def fix_frontmatter
    # Process all markdown files in the content directory
    Dir.glob("#{ROOT_PATH}/**/*.md").each do |file|
      # Read and trim leading whitespace
      content = File.read(file).lstrip
      
      # Add front matter if it doesn't exist
      add_frontmatter(file, content) unless content.start_with?("---")
      
      # Fix any problematic links
      fix_links(file, content)
    end
  end

  def add_frontmatter(file, content)
    # Add empty front matter delimiters at the beginning of the content
    content_with_frontmatter = "---\n---\n#{content}"
    
    # Write the updated content back to the file
    File.write(file, content_with_frontmatter)
    puts "Added front matter to: #{file}"
  end

  def fix_links(file, content)
    # Find all markdown links and replace pipes with hyphens
    links_to_fix = content.scan(/\[.*?\]\(.*?\)/).select { |link| link.include?("|") }
    
    # Replace each link that contains a pipe
    links_to_fix.each do |link|
      new_link = link.gsub("|", "-")
      content.gsub!(link, new_link)
    end

    # Write the file if any links were fixed
    if links_to_fix.any?
      File.write(file, content)
      puts "Fixed #{links_to_fix.size} links in: #{file}"
    end
  end

  def get_artworks
    # Find all image files in the art directory
    paths = Dir.glob("#{STATIC_PATH}/art/**/*.{jpg,jpeg,png,gif}")
    
    # Shuffle paths for randomization
    paths.shuffle(random: Random.new(paths.length)).map do |path|
      # Format the name: remove extension, split by - or _, capitalize each word
      name = File.basename(path, ".*").split(/[-_]/).map(&:capitalize).join(" ")
      
      # Return artwork hash with name and path (removing leading dot)
      { name: name, path: path.delete_prefix('.') }
    end
  end

  def tree_level_order(tree)
    current_level = { "/": tree }
    level_order = {}

    until current_level.empty?
      next_level = {}

      current_level.each do |parent, node|
        # Collect all keys at this level
        current_keys = node.keys
        
        # Add non-empty children to the next level for processing
        node.each do |key, children|
          next_level[key] = children unless children.empty?
        end
        
        # Store the keys for this parent
        level_order[parent] = current_keys
      end

      current_level = next_level
    end

    level_order
  end


  def tree_to_html(site, tree)
    file_to_title = site.data["file_to_title"]
    level_order = site.data["tree_level_order"]
    
    level_order.each do |parent_id, children|
      # Sort children by title
      sorted_children = children
        .reject { |child_id| child_id == parent_id }
        .sort_by { |child_id| file_to_title[child_id] || child_id }
      
      # Generate HTML list
      html = "<ul>"
      sorted_children.each do |child_id|
        title = file_to_title[child_id]
        html += "<li><a href='#{child_id}/'>#{title}</a></li>"
      end
      html += "</ul>"

      site.data["tree_htmls"][parent_id] = html
    end
  end


  def initialize_backlinks(site)
    site.documents
      .select { |doc| doc.respond_to?(:data) }
      .each { |doc| doc.data['backlinks'] ||= [] }
  end

  def initialize_file_to_tag(site)
    site.data["file_to_tag"] = site.data["tag_to_file"].invert
  end

  def initialize_file_to_title(site)
    site.data["file_to_title"] = site.documents
      .select { |doc| doc.respond_to?(:id) && doc.respond_to?(:data) && doc.data["title"] }
      .to_h { |doc| [doc.id, doc.data["title"]] }
  end

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

  def calculate_link_count(site, graph)
    document_links = site.documents.sum do |doc| 
      doc.respond_to?(:content) ? doc.content.scan(/<a/).length : 0
    end
    document_links + graph[:links].length
  end


  def remove_leading_slash(str)
    str.delete_prefix('/')
  end

  def generate_graph(site)
    nodes, links, nodemap, group = [], [], {}, 0
    file_tree = { "/root": site.data["tree"] }

    process_file_tree(file_tree, nodes, links, nodemap, group)
    process_backlink_tree(site, nodes, links, nodemap)

    clean_up_links(links)
    enrich_nodes(nodes, links, site)

    graph_data = { "nodes": nodes, "links": links }
    write_graph_data(graph_data)

    graph_data
  end

  def process_file_tree(file_tree, nodes, links, nodemap, group)
    queue = [[file_tree, nil, group]]

    until queue.empty?
      current_data, parent, group_number = queue.shift
      current_data.each do |key, value|
        nodemap[key] ||= { id: key, group: group_number }
        nodes << nodemap[key] unless nodes.include?(nodemap[key])
        links << { source: parent, target: key } if parent
        queue << [value, key, group_number + 1]
      end
    end
  end

  def process_backlink_tree(site, nodes, links, nodemap)
    # Build a tree of backlinks
    backlink_tree = site.documents
      .select { |doc| doc.respond_to?(:id) && doc.respond_to?(:data) && doc.data['backlinks']&.any? }
      .to_h do |doc|
        # Map each document to its ID and the IDs of its backlinks
        backlink_ids = doc.data['backlinks']
          .map { |backlink| backlink.respond_to?(:id) ? backlink.id : nil }
          .compact
          
        [doc.id, backlink_ids]
      end

    # Process the backlink tree to update nodes and links
    backlink_tree.each do |parent, children|
      # Ensure the parent node exists in the nodemap
      nodemap[parent] ||= { id: parent, group: 0 }
      
      # Add the parent node to the nodes list if not already present
      nodes << nodemap[parent] unless nodes.include?(nodemap[parent])
      
      # Add links from parent to each child
      children.each { |child| links << { source: parent, target: child } }
    end
  end

  def clean_up_links(links)
    # Remove duplicates
    links.uniq!
    # Remove self-referential links
    links.reject! { |link| link[:source] == link[:target] }
    # Remove links with the same source and target
    links.uniq! { |link| [link[:source], link[:target]] }
  end

  def enrich_nodes(nodes, links, site)
    # Process each node to add name and links
    nodes.each do |node|
      # Set node name from title or fallback to capitalized ID
      node[:name] = site.data["file_to_title"][node[:id]] || 
                    remove_leading_slash(node[:id].to_s).capitalize
      
      # Find all links connected to this node
      connected_links = links.select { |link| link[:source] == node[:id] || link[:target] == node[:id] }
      
      # Map links to the IDs of connected nodes
      node[:links] = connected_links.map do |link| 
        link[:source] == node[:id] ? link[:target] : link[:source]
      end
    end
    
    # Remove nodes that don't have any links
    nodes.reject! { |node| node[:links].empty? }
  end

  def write_graph_data(graph_data)
    write_json("#{DATA_PATH}/graph.json", graph_data)
  end

  def wikilinks_to_backlinks(doc, site)
    return unless doc.respond_to?(:id)
    
    # Get the basename without leading slash
    source_basename = remove_leading_slash(doc.id)
    
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
    
    tag_to_file = site.data["tag_to_file"]
    doc_id = doc.respond_to?(:id) ? doc.id : nil

    # Process each tag in the document
    doc.data["tags"].each do |tag|
      # Get the file ID for this tag
      tag_file_id = tag_to_file.key?(tag) ? "/#{tag_to_file[tag]}" : "/#{tag}"
      
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
    
    tag_to_file = site.data["tag_to_file"]
    file_to_title = site.data["file_to_title"]
    
    # Find all wiki-style links [[link]] and replace them with markdown links
    doc.content.scan(/\[\[[a-z0-9-]*\]\]/).each do |link|
      # Extract the target from the wiki link (remove the brackets)
      target = link[2...-1]
      
      # If the target is in tag_to_file, use that mapping
      target = tag_to_file["/#{target}"] if tag_to_file.key?("/#{target}")
      
      # Get the title for the target
      title = file_to_title["/#{target}"]
      
      # Create a markdown link and replace the wiki link
      markdown_link = "[#{title}](/#{target}/)"
      doc.content.gsub!(link, markdown_link)
    end
  end

  def generate_tree(site)
    # Generate the basic tree structure using breadth-first search
    tree = bfs(site, ROOT_PATH)
    
    # Sort each node's children by:
    # 1. Descending order of their children count (more children first)
    # 2. Alphabetically by title
    tree.transform_values! do |children|
      children.sort_by { |key, value| [-value.length, site.data["file_to_title"][key]] }.to_h
    end
    
    tree
  end


  def bfs(site, path)
    tree = {}
    queue = [[path, tree]]
    root = nil

    until queue.empty?
      parent_path, branch = queue.shift
      
      # Get parent information
      parent_basename = File.basename(parent_path)
      parent_id = "/#{parent_basename}"
      root ||= parent_id

      # Initialize branch for this parent
      branch[parent_id] ||= {}

      # Get sorted directory entries
      entries = Dir.entries(parent_path).sort.reject { |entry| entry.start_with?('.', '_') }

      # Process each entry
      entries.each do |child|
        # Get child information
        child_basename = File.basename(child)
        child_id = "/#{child_basename.sub(/\..*/, '')}"
        child_path = File.join(parent_path, child)

        # Handle directories and files
        if File.directory?(child_path)
          # Add directory to queue for processing
          queue.push([child_path, branch[parent_id]])
        elsif path != parent_basename
          # Initialize empty branch for file
          branch[parent_id][child_id] ||= {}
        end
        
        # Link child to parent in the site structure
        link_to_parent(site, child_id, parent_id)
      end
    end
    
    # Return the tree starting from the root
    tree[root]
  end


  def link_to_parent(site, child_id, parent_id)
    # Find the child document
    child_doc = site.documents.find { |doc| doc.respond_to?(:id) && doc.id == child_id }
    return unless child_doc

    # Find the parent document
    parent_doc = site.documents.find { |doc| doc.respond_to?(:id) && doc.id == parent_id }
    return unless parent_doc
    
    # Skip if child and parent are the same
    return if child_doc == parent_doc

    # Get parent basename without leading slash
    parent_basename = remove_leading_slash(parent_id)
    
    # Update child document with parent information
    child_doc.data['parent_basename'] = parent_basename
    child_doc.data['tags'] << parent_basename

    # Update parent document with child information
    parent_doc.data['children'] ||= []
    parent_doc.data['children'] << child_id
  end

  private

  def write_json(path, data)
    # Write data as pretty-formatted JSON
    File.write(path, JSON.pretty_generate(data))
  rescue StandardError => e
    puts "Error writing JSON to #{path}: #{e.message}"
  end
end
