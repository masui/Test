#!/usr/bin/env ruby

require 'cgi'

cgi = CGI.new('html3')

x = cgi.params['x'][0].to_i
y = cgi.params['y'][0].to_i
image = cgi.params['image'][0]

positions = {}
begin
  File.open("db"){ |f|
    positions = Marshal.load(f)
  }
  positions[image] = [x,y]
rescue
  positions['image1'] = [0,0]
  positions['image2'] = [0,0]
  positions['image3'] = [0,0]
  positions['image4'] = [0,0]
end

system "echo #{image},#{x},#{y} >> log"

File.open("db","w"){ |f|
  Marshal.dump(positions,f)
}

cgi.out {
  ""
}

