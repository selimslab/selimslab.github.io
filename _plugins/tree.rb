require 'json'

ROOT_PATH = "./_CONTENT".freeze
DEBUG_PATH = "./debug".freeze

class TreeGenerator < Jekyll::Generator
  priority :normal

  def initialize(config = {})
    @config = config
    @debug = false
  end

  def generate(site)
    tree = generate_tree(site)
    log_debug_data(tree, site) if @debug
  end

  private

  def generate_tree(site)
    tree = bfs(site, ROOT_PATH)
    site.data["tree"] = tree
    
    tree_level_order_data = tree_level_order(tree)
    site.data["tree_level_order"] = tree_level_order_data
    
    tree_to_html(site, tree)
    
    tree
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
    parent_basename = parent_id.delete_prefix('/')
    
    # Update child document with parent information
    child_doc.data['parent_basename'] = parent_basename
    child_doc.data['tags'] << parent_basename 

    # Update parent document with child information
    parent_doc.data['children'] ||= []
    parent_doc.data['children'] << child_id
  end

  def log_debug_data(tree, site)
    write_json("#{DEBUG_PATH}/tree.json", tree)
    write_json("#{DEBUG_PATH}/tree_level_order.json", site.data["tree_level_order"])
    write_json("#{DEBUG_PATH}/tree_htmls.json", site.data["tree_htmls"])
    tags_data = site.documents
      .select { |doc| doc.respond_to?(:id) && doc.respond_to?(:data) && doc.data["tags"] }
      .to_h { |doc| [doc.id, doc.data["tags"]] }
    
    write_json("#{DEBUG_PATH}/tags.json", tags_data)
  end

  def write_json(path, data)
    # Write data as pretty-formatted JSON
    File.write(path, JSON.pretty_generate(data))
    puts "Wrote #{path}"
  rescue StandardError => e
    puts "Error writing JSON to #{path}: #{e.message}"
  end
end 