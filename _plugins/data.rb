class DataInitializer < Jekyll::Generator
  priority :high

  def generate(site)
    initialize_site_data(site)
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
      .to_h { |doc| [doc.id, doc.data["title"].downcase] }
  end
end 