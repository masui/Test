# server.rb

require "socket"

gs = TCPserver.open(80)
addr = gs.addr
addr.shift
printf("server is on %s\n", addr.join(":"))

while true
  Thread.start(gs.accept) do |s|       # save to dynamic variable
    print(s, " is accepted\n")
    while str = s.gets
      puts str
    end
    print(s, " is gone\n")
s.print "HTTP/1.1 200 OK\r\n"
s.print "Date: Wed, 29 Apr 2009 20:33:59 GMT\r\n"
s.print "Server: Apache/2.2.9 (Fedora)\r\n"
s.print "Last-Modified: Tue, 31 Mar 2009 10:56:27 GMT\r\n"
s.print "Accept-Ranges: bytes\r\n"
s.print "Connection: close\r\n"
s.print "Content-type: text/plain\r\n\r\n"
s.print "foo\r\n"
s.print "\r\n"
    s.close
  end
end
