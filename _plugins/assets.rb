require 'json'

ASSETS_PATH = "./assets".freeze
STATIC_PATH = "#{ASSETS_PATH}/static".freeze
DATA_PATH = "#{ASSETS_PATH}/data".freeze

class AssetGenerator < Jekyll::Generator
  priority :lowest

  def initialize(config = {})
    @generated = false
    @config = config
  end

  def generate(site)
    write_json("#{DATA_PATH}/artworks.json", get_artworks)
    write_json("#{DATA_PATH}/tracks.json", read_tracks)
    @generated = true
  end

  private

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

  def read_tracks
    paths = Dir.glob("#{STATIC_PATH}/music/**/*.{mp3,wav,ogg,flac}")
    paths.sort!

    # Group by genre (directory name)
    music_by_genre = {}
    
    paths.each_with_index do |path, index|
      # Get genre from parent directory name
      genre = File.basename(File.dirname(path))
      music_by_genre[genre] ||= []
      
      # Just use the filename without extension
      filename = File.basename(path, ".*")
      
      # Use a sequential ID starting from 0
      id = index.to_s
      
      # Add the track with ID to the genre's array
      music_by_genre[genre] << {
        id: id,
        title: filename
      }
    end

    music_by_genre
  end

  def write_json(path, data)
    return if @generated
    # Write data as pretty-formatted JSON
    File.write(path, JSON.pretty_generate(data))
    puts "Wrote #{path}"
  rescue StandardError => e
    puts "Error writing JSON to #{path}: #{e.message}"
  end
end 