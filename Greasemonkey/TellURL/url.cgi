#!/usr/local/bin/ruby
#
# $Date: 2005-03-18 10:33:51 +0900 (Fri, 18 Mar 2005) $
# $Rev: 618 $
#

require 'cgi'

cgi = CGI.new('html3')

url = cgi.params['url'][0]

logfile = "/home/masui/urllog"

t = Time.new.strftime("%Y%m%d%H%M%S")

File.open(logfile,"a"){ |f|
  f.puts "#{t} #{url}"
}

cgi.out {
#  cgi.html {
#    cgi.body {
#      'ahoaho'
#    }
#  }
  "[[#{url}]]"
}

