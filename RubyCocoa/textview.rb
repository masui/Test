#
# written by Chris Thomas for the article of DDJ May 2002.
#

require 'osx/cocoa'
include OSX

class TextView < NSTextView

  #
  # When the Cocoa view system wants to draw a view,
  # it calls the method -(void)drawRect:(NSRect)rect.
  # The rectangle argument is relative to the origin
  # of the view's frame, and it may only be a small
  # portion of the view. For this reason, very
  # simple views with only one or two graphical
  # elements tend to ignore this parameter.
  #

  def initialize
#    self.insertText("kkkkkkkkkkkkk")
  end 

  def setText(s)
    @text = s
  end

  def drawRect(rect)
    string = NSString.stringWithUTF8String('abcde')

    string.drawAtPoint_withAttributes([0,0], nil)

    viewWindow = window
    window.setHasShadow(0)
    window.setHasShadow(1)
  end

  def mouseDown(event)
    puts event
  end
end

#
# If this file is the main file, then perform the followjng commands.
# (This construct is often useful for adding simple unit tests to
# library code.)
#
if __FILE__ == $0
  #
  # First, to establish a connection to the window server,
  # we must initialize the application
  #
  $stderr.print "just wait ..." ; $stderr.flush
  application = OSX::NSApplication.sharedApplication


  frame = [200.0, 300.0, 450.0, 400.0]

  window = NSWindow.alloc.
    objc_send(:initWithContentRect, frame,
              :styleMask, (NSTitledWindowMask | 
                           NSClosableWindowMask | 
                           NSResizableWindowMask),
              :backing, NSBackingStoreBuffered,
              :defer, 0)

  view = TextView.alloc.initWithFrame([10, 10, 130, 130])
  NSColor.yellowColor.set
  view.insertText('abababasdfasdfa')
   # window.setContentView(view)

  window.contentView.addSubview(view)

  #slider.setTarget(view)
  #slider.setAction('test:')

  screenFrame = NSScreen.mainScreen.frame
  windowOriginPoint = [40, screenFrame.origin.y + screenFrame.size.height - 100]
  window.setFrameOrigin( windowOriginPoint )

  # Show the window
  window.makeKeyAndOrderFront(nil)
  window.orderFrontRegardless()		## but this one does

  # And start the application event loop
  $stderr.print "\rtype `Ctrl-C' for quit !\n"
  trap('SIGINT') { $stderr.puts "bye." ; exit 0 }

  application.run

end
