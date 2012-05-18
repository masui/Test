#!/usr/bin/env ruby

require 'cgi'
cgi = CGI.new('html3')

key = "TEST-COOKIE-KEY"
value = '123456'
expires = Time.now + 60*60*24*30
expires = Time.now + 20
cookies = [ CGI::Cookie::new({"name" => key, "value" => value, 'expires' => expires}) ]

#cgi.out("cookie" => cookies) {
cgi.out("cookie" => cookies){ 
 'abcdefg'
}

