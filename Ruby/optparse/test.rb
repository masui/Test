require 'optparse'

opt = OptionParser.new

opt.on('-a val') {|v| p v }
opt.on('-b') {|v| p v }

opt.parse!(ARGV)
p ARGV

