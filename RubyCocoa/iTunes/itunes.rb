# -*- ruby -*-

require 'osx/cocoa'
require 'rubygems'
require 'rbosa'

include OSX

class ITunes < NSObject
  
  def initialize
    @name = []
    @album = []
    @artist = []
    @matched = []

    File.open("/tmp/log","w"){ |f|
      OSA::app('iTunes').sources[0].library_playlists[0].tracks.each { |s|
        f.puts "#{s.name} / #{s.album} / #{s.artist}"
        @name << s.name
        @album << s.album
        @artist << s.artist
      }
    }
  end

  def patconv(pat)
    p = [
#         'qazp', 'wsxol', 'edcik', 'rfvtgbyhnuj'
#         'aiueoy', 'bcdgjkq', 'vxzfhl', 'mnrpstw'
         'abcdefg', 'hijklm', 'nopqrs', 'tuvwxyz'

#         'ae',
#         'iouy',
#         'bcdgjkqvxz',
#         'fhlmnrpstw'
        ]
    newpat = ''
    pat.split(//).each { |c|
      n = ''
      p.each { |s|
        if s.index(c) then
          n = ("[" + s + "]")
          next
        end
      }
      if c == ' ' then
        n = '.*'
      elsif n == '' then
        n = c
      end
      newpat += n
    }
    puts newpat
    newpat
  end

  def match(pat)
    @matched = []
    newpat = patconv(pat)
    @name.each { |name|
      if name =~ /#{newpat}/i then
        @matched << name
        # break if @matched.length > 20
      end
    }
  end

  def matched
    @matched
  end

  def test
    @name[0]
  end
end
