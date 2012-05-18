#!/usr/bin/env ruby
# -*- ruby -*- 
#
# $Date: 2005-03-18 10:32:29 +0900 (Fri, 18 Mar 2005) $
# $Rev: 617 $
#

require 'cgi'

cgi = CGI.new('html3')

first = cgi.params['first'][0].to_i
last = cgi.params['last'][0].to_i
gap = cgi.params['gap'][0].to_i
time= cgi.params['time'][0]
q = cgi.params['q'][0]

wordlist = "words-#{q}"

system "echo getdata.cgi: id=#{id} file=#{wordlist} first=#{first} last=#{last} gap=#{gap} time='#{time}' q='#{q}' >> log"

word = []
begin
  File.open(wordlist){ |f|
    word = f.readlines
  }
rescue
end

s = ''
if word.length > 0 && first >= 0 && last < word.length then
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
end

system "echo #{s} >> log"

cgi.out {
  s
}
