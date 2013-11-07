#! /usr/local/bin/ruby -w
require 'RMagick'
include Magick

IMG_PARTS = '/Users/Pete/dev/Sprites/DesignBuilder'
OUPUT_DIR = '/Users/Pete/dev/Sprites/MagickOut'

body = "whole-body"

# combo = { 
# 	:neckline => [
# 		"nek", 
# 		["001", "002", "003", "004"], 
# 		["010", "011", "008", "012", "014", "120"]],
# 	:sleeves => [
# 		"slv", 
# 		["001", "002", "006", "009"], 
# 		["010", "011", "008", "012", "014", "120"]], 
# 	:skirt => [
# 		"skt", 
# 		["011", "012", "014", "022", "024"], 
# 		["010", "011", "008", "012", "014", "120"]], 
# 	:belt => [
# 		"blt", 
# 		["000", "002", "003", "004"], 
# 		["120"]],
# 	:extra => [
# 		"ext", 
# 		["000", 003], 
# 		["010", "011", "008", "012", "014", "120"]]
# }

# combo = { 
# 	:neckline => [
# 		"nek", 
# 		["001", "002", "003", "004"], 
# 		["011", "012", "014"]],
# 	:sleeves => [
# 		"slv", 
# 		["001", "002", "006", "009"], 
# 		["011", "012", "014"]],
# 	:skirt => [
# 		"skt", 
# 		["012", "022"], 
# 		["011", "012", "014"]],
# 	:belt => [
# 		"blt", 
# 		["000", "004"], 
# 		["120"]]
# }


combo = { 
	:neckline => [
		"nek", 
		["001", "002", "003", "004"], 
		["00"],
		["003", "008", "010", "011", "013", "014", "120"]],
	:necktrim => [
		"trm", 
		["000","120"]],
	:sleeves => [
		"slv", 
		["000","002","006","009"], 
		["00"],
		["003", "008", "010", "011", "013", "014", "120"]],
	:skirt => [
		"skt", 
		["001", "002"],
		["01","02","04"], 
		["003", "008", "010", "011", "013", "014", "120"]],
	:belt2 => [
		"blt", 
		["002"], 
		["00"],
		["000","160","161", "165", "168","169", "170"]],
	:belt4 => [
		"blt", 
		["004"], 
		["00"],
		["000","103","108", "110", "111","112", "113", "114"]],
	:peplum => [
		"ext", 
		["002"], 
		["00"],
		["000", "003", "008", "010", "011", "013", "014"]],
	:rosetta => [
		"ext", 
		["003"], 
		["00"],
		["000", "003", "008", "010", "011", "013", "014"]]
}

# combo = { 
# 	:neckline => [
# 		"nek", 
# 		["001", "002", "003", "004"],
# 		["00"],
# 		["003"]],
# 	:necktrim => [
# 		"trm", 
# 		["000","120"]],
# 	:sleeves => [
# 		"slv", 
# 		["000"], 
# 		["00"],
# 		["003"]],
# 	:skirt => [
# 		"skt", 
# 		["001"],
# 		["01"], 
# 		["003"]],
# 	:belt2 => [
# 		"blt", 
# 		["002"], 
# 		["00"],
# 		["000"]],
# 	:belt4 => [
# 		"blt", 
# 		["004"], 
# 		["00"],
# 		["000"]],
# 	:peplum => [
# 		"ext", 
# 		["002"], 
# 		["00"],
# 		["000"]],
# 	:rosetta => [
# 		"ext", 
# 		["003"], 
# 		["00"],
# 		["000"]]
# }
start_time = Time.now

puts "#{start_time} - 0"

def create_options(params) 
	options = Array.new

	params[1].each { |style|
		params[2].each { |size|
			params[3].each { |fabric|
				options << "#{params[0]}-#{style}-#{size}-#{fabric}"
			}
		}
	}

	return options

end

def create_trim_options(params) 
	options = Array.new

	params[1].each { |fabric|
		options << "#{fabric}"
	}
	return options

end


skirts =  create_options(combo[:skirt])
sleeves = create_options(combo[:sleeves])
necklines = create_options(combo[:neckline])
necktrims = create_trim_options(combo[:necktrim])
belts = create_options(combo[:belt2]).concat create_options(combo[:belt4])
peplums = create_options(combo[:peplum])
rosettas = create_options(combo[:rosetta])

count = 0

skirts.each { |skirt| 
	sleeves.each { |sleeve|
		necklines.each { |neck| 
			belts.each { |belt|
				peplums.each { |peplum|
					rosettas.each { |rosetta|
						necktrims.each { |necktrim|
							count += 1
							# formatted_count = count.to_s.reverse.gsub(/...(?=.)/,'\&,').reverse
							# puts " #{formatted_count} #{skirt} #{sleeves} #{neck} #{extra} #{b}"
							image = ImageList.new("#{IMG_PARTS}/#{body}.png",
								"#{IMG_PARTS}/#{skirt}.png", "#{IMG_PARTS}/#{sleeve}.png", "#{IMG_PARTS}/#{neck}.png", 
								"#{IMG_PARTS}/trm-#{neck[0..-4]}#{necktrim}.png",
								"#{IMG_PARTS}/#{belt}.png", "#{IMG_PARTS}/#{peplum}.png", "#{IMG_PARTS}/#{rosetta}.png")
							# image.flatten_images.display
							# image.flatten_images.write("#{OUPUT_DIR}/#{skirt}-#{sleeve}-#{neck}-trm-#{neck[0..-4]}#{necktrim}-#{belt}-#{peplum}-#{rosetta}.png")
							# puts "#{OUPUT_DIR}/#{skirt}-#{sleeve}-#{neck}-#{belt}-#{peplum}-#{rosetta}.png"
						}
					}
				}
			}
		}
	}
}
end_time = Time.now

formatted_count = count.to_s.reverse.gsub(/...(?=.)/,'\&,').reverse
puts "#{end_time} - #{formatted_count} images"
puts "Elapsed time: #{end_time - start_time} seconds"

# image = ImageList.new("whole-body.png",
# 	"skt-011-002.png", "slv-008-080.png", 
# 	"nek-003-005.png", "ext-001-086.png", "blt-002-003.png")
# image.flatten_images.display




exit
