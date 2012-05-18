#!/usr/bin/env ruby
# -*- ruby -*- 
#
# $Date: 2005-03-18 10:33:51 +0900 (Fri, 18 Mar 2005) $
# $Rev: 618 $
#

require 'cgi'

cgi = CGI.new("html3")
file = cgi['file'].to_s

text = ''
File.open(file){ |f|
  text = f.readlines.join
}

cgi.out {
  cgi.html {
    cgi.head {
      cgi.title { file }
    } +
    cgi.body {
      cgi.pre {
        text
      }
    }
  }
}
