#!/usr/bin/env ruby

require 'fileutils'

SOURCE ='/Users/Pete/dev/Sprites/DesignBuilder/'
DESTINATION = '/Users/Pete/dev/Sprites/dressSprites/input/'

# Dir.chdir(SOURCE)
puts "SOURCE: #{SOURCE}"
# get a list of all .txt files in current directory
Dir.chdir(SOURCE)
Dir["*.png"].each do |filename|
  # strategy:
  # - chop off the extension
  # - switch to all lowercase
  # - get rid of everything but spaces, dashes, letters, underscores
  # - then swap any run of spaces, dashes, and underscores for a single space
  # - then strip whitespace off front and back
  name = File.basename(filename, '.png').downcase.strip.chars.last(3).join
  target_folder = DESTINATION + name
  puts "target_folder: #{target_folder}"

  # make sure we dont overwrite a file
  if File.exists?(target_folder) && !File.directory?(target_folder)
    raise "Destination folder is a file"
  # if directory doesnt exist then create it
  elsif !File.exists?(target_folder)
    Dir.mkdir(target_folder)
    puts "mkdir: #{target_folder}"
  end
  # now copy the file
  FileUtils.cp filename, target_folder, :verbose => true
end