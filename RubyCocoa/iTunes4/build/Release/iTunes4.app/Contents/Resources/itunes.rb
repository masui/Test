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

  def match(pat)
    @matched = []
    (0...@name.length).each { |i|
      if @name[i] =~ /#{pat}/i || @album[i] =~ /#{pat}/i || @artist[i] =~ /#{pat}/i then
        @matched << "#{@name[i]} (#{@artist[i]})"
      end
    }
#    @name.each { |name|
#      if name =~ /#{pat}/i then
#        @matched << name
#        # break if @matched.length > 20
#      end
#    }
  end

  def matched
    @matched
  end
end
