# -*- ruby -*-

require 'osx/cocoa'
include OSX

class PatField < NSTextField

  ib_outlets :mainview, :itunes

  def initialize
    puts "PatField initialize"
  end

  def textDidChange(notification)
    pat = self.stringValue.to_s
    @itunes.match(pat)
    
    @mainview.setNeedsDisplay(true)
  end
end
