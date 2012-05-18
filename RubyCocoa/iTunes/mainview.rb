# -*- ruby -*-

require 'osx/cocoa'
include OSX

class MainView < NSView

  ib_outlets :itunes

  def initialize
    puts "MainView initialize"
  end

  def mouseDown(event)
    puts event
    puts @itunes.test
  end

  def drawRect(rect)
    x = 10
    y = 300
    @itunes.matched.each { |name|
      s = NSString.stringWithUTF8String(name.to_s)
      next if s.nil?
      s.drawAtPoint_withAttributes([x,y], nil)
      y -= 15
      break if y < 0
    }
  end
end
