#!/usr/bin/env ruby

require 'cgi'
cgi = CGI.new('html3')

key = "TEST-COOKIE-KEY"
cookies = []

begin
  cookies = cgi.cookies[key]
rescue
end

cgi.out {
  cookies[0].to_s
}

