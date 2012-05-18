#!/usr/bin/env ruby

require 'cgi'

cgi = CGI.new('html3')

x = cgi.params['x'][0].to_i
y = cgi.params['y'][0].to_i
imageno = cgi.params['imageno'][0].to_i

positions = []
begin
  File.open("db"){ |f|
    positions = Marshal.load(f)
  }
rescue
end

system "echo #{imageno},#{x},#{y} >> log"

positions[imageno] = [x,y]
File.open("db","w"){ |f|
  Marshal.dump(positions,f)
}

cgi.out {
  ""
}

