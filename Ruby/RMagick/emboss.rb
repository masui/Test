require 'rubygems'
# require 'rmagick'
require 'RMagick'
include Magick

images = Image.read("sf2.jpg")

img2 = images[0].blur_image(0,4)
img2.write("junk1.png")
exit

img2 = images[0].spread(1)

img3 = img2.median_filter(2)
img3.write('junk.png')

img4 = img3.emboss(0, 1)
img4.write("sample751a.png")
