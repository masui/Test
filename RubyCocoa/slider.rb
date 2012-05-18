require 'osx/cocoa'
include OSX

class HelloView < OSX::NSView
  def drawRect(rect)
    string = NSString.stringWithUTF8String("こんにちは")
    string.drawAtPoint_withAttributes([30,50], nil)
  end

  def test(target)
    puts target.floatValue
  end
end

class MySlider < OSX::NSSlider
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

  window = NSWindow.alloc.__send__(
                                   :initWithContentRect, [200, 200, 150, 100],
                                   :styleMask, 15, :backing, 2, :defer, 0)

  view = HelloView.alloc.initWithFrame([0, 0, 150, 20])
  window.setContentView(view)

#swin = NSWindow.alloc.
#  __send__ :initWithContentRect, [750,500,50,150],
#                     :styleMask, 15,
#                       :backing, 2,
#                         :defer, 0
#swin.setLevel(3)
#swin.display
#swin.orderFrontRegardless

  slider = MySlider.alloc.initWithFrame [10.0, 10.0, 20.0, 80.0]
  slider.setMaxValue 100
  window.contentView.addSubview(slider)

#  bye = NSButton.alloc.initWithFrame [100.0, 10.0, 80.0, 80.0]
#  win.contentView.addSubview(bye)

#  slider.setBezelStyle( 4 )
  slider.setTarget(view)
  slider.setAction('test:')
#  slilder.setEnabled( true )
#  slider.setTitle( 'Goodbye!' )


#  window.makeKeyAndOrderFront(nil)

  window.setLevel(3)
  window.display
  window.orderFrontRegardless()

  trap('SIGINT') { $stderr.puts "bye." ; exit 0 }

  application.run
end
  
