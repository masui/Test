# -*- ruby -*-

require 'osx/cocoa'
include OSX

class HelloView < NSView
  def drawRect(rect)
    string = NSString.stringWithUTF8String("こんにちは")
    string.drawAtPoint_withAttributes([30,50], nil)
  end

  def test(target)
    puts target.floatValue
  end

  def mouseDown(event)
    puts event
    mouseDownPoint = convertPoint_fromView(event.locationInWindow, nil)
    puts mouseDownPoint.x
  end

end

class MySlider < NSSlider
  def test(target)
    puts "test"
  end
end

#class MyApplication < OSX::NSApplication
#  def test(target)
#    puts "test"
#  end
#end

if __FILE__ == $0
  application = NSApplication.sharedApplication
#  application = MyApplication.sharedApplication

  window = NSWindow.alloc.objc_send(
                                   :initWithContentRect, [200, 200, 150, 100],
                                   :styleMask, 15, :backing, 2, :defer, 0)

  view = HelloView.alloc.initWithFrame([0, 0, 150, 20])
  window.setContentView(view)


  slider = MySlider.alloc.initWithFrame [10.0, 10.0, 20.0, 80.0]
  slider.setMaxValue 100
  window.contentView.addSubview(slider)

  slider.setTarget(view)
  slider.setAction('test:')

  window.setLevel(3)
  window.display
  window.orderFrontRegardless()

  trap('SIGINT') { $stderr.puts "bye." ; exit 0 }

  application.run
end
  
