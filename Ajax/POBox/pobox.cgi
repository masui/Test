#!/usr/bin/env ruby
# -*- ruby -*- 
#
# $Date: 2005-03-18 10:33:51 +0900 (Fri, 18 Mar 2005) $
# $Rev: 618 $
#


require 'cgi'
require 'socket'
require 'iconvfix'

cgi = CGI.new('html3')
so = TCPSocket.open("localhost", 1178)

q = cgi.params['q'][0]

so.puts("1#{q}")
result = so.gets
so.close

cgi.out {
  result.euctou8
}
