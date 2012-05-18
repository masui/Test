require 'osx/cocoa'
include OSX

class HelloView < OSX::NSView
  def drawRect(rect)
    string = NSString.stringWithUTF8String("こんにちは")
    string.drawAtPoint_withAttributes([30,50], nil)
  end
end

if __FILE__ == $0
  application = NSApplication.sharedApplication

  screenRect = NSScreen.mainScreen.frame

  window = NSWindow.alloc.
    objc_send(:initWithContentRect, screenRect,
              :styleMask, NSBorderlessWindowMask,
              :backing, NSBackingStoreBuffered,
              :defer, false,
              :screen, NSScreen.mainScreen)

#    objc_send(:initWithContentRect, [200, 200, 150, 100],
#              :styleMask, 15, :backing, 2, :defer, 0)

  view = HelloView.alloc.initWithFrame([0, 0, 150, 100])
  window.setContentView(view)

  window.setLevel  NSMainMenuWindowLevel + 1 # CGShieldingWindowLevel()
  window.setBackgroundColor NSColor.yellowColor
  window.makeKeyAndOrderFront nil

#  window.orderFrontRegardless()

  trap('SIGINT') { $stderr.puts "bye." ; exit 0 }

  application.run
end
  
