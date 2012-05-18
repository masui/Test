#!/usr/bin/env ruby

require 'cgi'

cgi = CGI.new('html3')

first = cgi.params['first'][0].to_i
last = cgi.params['last'][0].to_i
gap = cgi.params['gap'][0].to_i

# system "echo #{first} #{last} #{gap} >> log"

word = []
File.open("eiwa.mds"){ |f|
  word = f.readlines
}

i = first
a = []
a << first
a << gap
while i <= last do
  a << word[i]
  i += gap
end

s = a.join("\t")
s.gsub!(/[\r\n]*/,'')

# system "echo #{s} >> log"

cgi.out {
  s
}


