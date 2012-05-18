require 'osx/cocoa'
include OSX

class HelloView < OSX::NSView
  def drawRect(rect)
    string = NSString.stringWithUTF8String("abc")
    string.drawAtPoint_withAttributes([30,50], nil)

    image = NSImage.alloc.initByReferencingFile('/tmp/abc.png')
    image.compositeToPoint_operation(NSZeroPoint,NSCompositeSourceOver)

    image = NSImage.alloc.initByReferencingFile('/tmp/junk.png')
    image.compositeToPoint_operation(NSZeroPoint,NSCompositeSourceOver)
  end

end

if __FILE__ == $0
  application = NSApplication.sharedApplication

  window = NSWindow.alloc.objc_send(
                                   :initWithContentRect, [200, 200, 150, 100],
                                   :styleMask, 15, :backing, 2, :defer, 0)

  view = HelloView.alloc.initWithFrame([0, 0, 150, 20])
  window.setContentView(view)


  window.setLevel(3)
  window.display
  window.orderFrontRegardless()

  trap('SIGINT') { $stderr.puts "bye." ; exit 0 }

  application.run
end
  
