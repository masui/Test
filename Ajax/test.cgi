#!/usr/bin/env ruby

require 'cgi'

cgi = CGI.new('html3')

x = cgi.params['x'][0].to_i

#system "echo #{x} >> log"

cgi.out {
  (x * 2).to_s
}

