#! /usr/local/bin/ruby -w
require 'RMagick'
include Magick

# :body => "whole-body"

# combo = { 
# 	:neckline => [
# 		"nek", 
# 		["001", "002", "003", "004"], 
# 		["010", "011", "015", "008", "012", "014", "120"]],
# 	:sleeves => [
# 		"slv", 
# 		["001", "002", "006", "009"], 
# 		["010", "011", "015", "008", "012", "014", "120"]], 
# 	:skirt => [
# 		"skt", 
# 		["011", "012", "014", "021", "022", "024"], 
# 		["010", "011", "015", "008", "012", "014", "120"]], 
# 	:belt => [
# 		"blt", 
# 		["000", "002", "003", "004"], 
# 		["120"]],
# 	:extra => [
# 		"ext", 
# 		["000", 003], 
# 		["010", "011", "015", "008", "012", "014", "120"]]
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
		["001"], 
		["011"]],
	:sleeves => [
		"slv", 
		["001"], 
		["011"]],
	:skirt => [
		"skt", 
		["012"], 
		["011"]],
	:belt => [
		"blt", 
		["000"], 
		["120"]]
}

def create_options(params) 
	options = Array.new

	params[1].each { |style|
		params[2].each { |fabric|
			options << "#{params[0]}-#{style}-#{fabric}"
		}
	}

	return options

end

skirt =  create_options(combo[:skirt])
sleeves = create_options(combo[:sleeves])
neckline = create_options(combo[:neckline])
# extras = create_options(combo[:extra])
belt = create_options(combo[:belt])

count = 0

skirt.each { |skirt| 
	sleeves.each { |sleeves|
		neckline.each { |neck| 
			# extras.each { |extra| 
				belt.each { |b|
					count += 1
					# formatted_count = count.to_s.reverse.gsub(/...(?=.)/,'\&,').reverse
					# puts " #{formatted_count} #{skirt} #{sleeves} #{neck} #{extra} #{b}"
					image = ImageList.new("whole body.png",
						"#{skirt}", "#{sleeves}", "#{neck}", "#{b}")
					image.flatten_images.display
				}
			# }
		}
	}
}

formatted_count = count.to_s.reverse.gsub(/...(?=.)/,'\&,').reverse
puts " #{formatted_count}"


# image = ImageList.new("whole-body.png",
# 	"skt-011-002.png", "slv-008-080.png", 
# 	"nek-003-005.png", "ext-001-086.png", "blt-002-003.png")
# image.flatten_images.display




exit
