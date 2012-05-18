#!/usr/bin/env ruby
# -*- ruby -*- 
#
# $Date: 2005-03-18 10:33:51 +0900 (Fri, 18 Mar 2005) $
# $Rev: 618 $
#

require 'cgi'

cgi = CGI.new('html3')

q = cgi.params['q'][0]
date = cgi.params['date'][0]

system "echo search.cgi: q=#{q} date=#{date} >> log"

wordlist = "words-#{q}"

if !File.exist?(wordlist) then
  system "echo q length is #{q.length} >> log"
  if q == '' then
    system "/bin/cp eiwa.mds #{wordlist}"
    system "echo empty >> log"
  else
    q.gsub!(/ /,'.*')
    system "/usr/local/bin/agrep -i -y -B \"#{q}\" eiwa.mds > #{wordlist} 2> /dev/null"
    system "echo /usr/local/bin/agrep -i -y -B \"#{q}\" eiwa.mds #{wordlist} >> log"
    system "echo agrep q=..#{q}.. >> log"
  end
end

word = []
File.open(wordlist){ |f|
  word = f.readlines
}

cgi.out {
  word.length.to_i.to_s + "\n"
}


