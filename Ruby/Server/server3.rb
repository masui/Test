# -*- coding: utf-8 -*-
#
#	ニセHTTPサーバ
#

require "socket"
require 'timeout'

gs = TCPserver.open(8080)
addr = gs.addr
addr.shift
# printf("server is on %s\n", addr.join(":"))

while true
  Thread.start(gs.accept) do |s| # save to dynamic variable
    # print(s, " is accepted\n")
    while str = s.gets
      puts str
      break if str =~ /^\s*$/
    end
    # print(s, " is gone\n")

    retstr = "timeout"
    begin
      timeout(3) do
        retstr = STDIN.gets
      end
    rescue Timeout::Error
    end

    # STDIN.gets # 何か入力するとレスポンスを返す

    timestamp = Time.new.to_s
    s.print "HTTP/1.1 200 OK\r\n"
    s.print "#{timestamp}\r\n"
    s.print "Server: Pseudo-http-server\r\n"
    s.print "Last-Modified: #{timestamp}\r\n"
    s.print "Accept-Ranges: bytes\r\n"
    s.print "Connection: close\r\n"
    s.print "Content-type: text/plain\r\n\r\n"
    s.print "#{retstr}\r\n"
    s.print "\r\n"
    s.close
  end
end
