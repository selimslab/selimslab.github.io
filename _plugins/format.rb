require 'json'

ROOT_PATH = "./_CONTENT".freeze

class FrontmatterGenerator < Jekyll::Generator
  priority :highest

  def initialize(config = {})
    @fixed_frontmatter = false
    @config = config
  end

  def generate(site)
    fix_frontmatter unless @fixed_frontmatter
    @fixed_frontmatter = true
  end

  private

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
end 