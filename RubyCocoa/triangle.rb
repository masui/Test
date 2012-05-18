#
# written by Chris Thomas for the article of DDJ May 2002.
#

require 'osx/cocoa'

require "thread"

#q = Queue.new
#
#th = Thread.start {
#  while line = q.pop
#    print line
#  end
#}
#
#while gets
#  q.push $_
#end
#q.push nil
#th.join

class HelloView < OSX::NSView

  #
  # When the Cocoa view system wants to draw a view,
  # it calls the method -(void)drawRect:(NSRect)rect.
  # The rectangle argument is relative to the origin
  # of the view's frame, and it may only be a small
  # portion of the view. For this reason, very
  # simple views with only one or two graphical
  # elements tend to ignore this parameter.
  #

  def setText(s)
    @text = s
  end

  def drawRect(rect)

    puts 'drawRect()'
    
    # Set the window background to transparent
    OSX::NSColor.clearColor.set
    OSX::NSRectFill(bounds)

    # Draw the text in a shade of red and in a large system font
    attributes = OSX::NSMutableDictionary.alloc.init

    attributes.setObject_forKey(	OSX::NSColor.redColor,
				OSX::NSForegroundColorAttributeName )

    attributes.setObject_forKey(	OSX::NSFont.boldSystemFontOfSize(20.0),
				OSX::NSFontAttributeName )

    #string = OSX::NSString.alloc.initWithString( "漢字" ) # これじゃ駄目
    #string = OSX::NSString.stringWithUTF8String( "漢字文字列です" ) # こちらは動くね
    string = OSX::NSString.stringWithUTF8String(@text)

    string.drawAtPoint_withAttributes([0,0], attributes)

    path = OSX::NSBezierPath.bezierPath
    path.moveToPoint [30, 60]
    path.lineToPoint [150, 250]
    path.lineToPoint [270, 60]
    path.closePath
    OSX::NSColor.yellowColor.set
    path.setLineWidth 10
    path.setLineJoinStyle OSX::NSMiterLineJoinStyle
#    OSX::NSRoundLineJoinStyle
#    OSX::NSBevelLineJoinStyle
#    OSX::NSMiterLineJoinStyle
    path.stroke
    
    #
    # Turn the window's shadow off and on --
    # This is a kludge to get the shadow to recalculate
    # for the new shape of the opaque window content.
    #
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

  # Create the window
#  window = OSX::NSWindow.alloc.
#    objc_send(:initWithContentRect, [0, 0, 450, 200],
#              :styleMask, OSX::NSBorderlessWindowMask,
#              :backing, OSX::NSBackingStoreBuffered,
#              :defer, 0)

  frame = [200.0, 300.0, 450.0, 400.0]
#  window = OSX::NSWindow.alloc.initWithContentRect_styleMask_backing_defer(frame, 15, 2, 0)
#  window.setTitle 'HelloWorld'
#  window.setLevel(3)			# floating window

  window = OSX::NSWindow.alloc.
    objc_send(:initWithContentRect, frame,
              :styleMask, (OSX::NSTitledWindowMask | 
                           OSX::NSClosableWindowMask | 
                           OSX::NSResizableWindowMask),
              :backing, OSX::NSBackingStoreBuffered,
              :defer, 0)

#  window = OSX::NSWindow.alloc.initWithContentRect(OSX::NSRect.new(300, 300, 400,200),
#                               :styleMask, (OSX::NSTitledWindowMask | 
#                                            OSX::NSClosableWindowMask | 
#                                            OSX::NSResizableWindowMask),
#                               :backing, OSX::NSBackingStoreBuffered,
#                               :defer, true)

  # Allow the window to be partially transparent
#  window.setOpaque(0)

  # Setup the window's root view
  view = HelloView.alloc.initWithFrame([0, 0, 450, 200])
  window.setContentView(view)

  # Place the window near the top of the screen.
  # (Screen coordinates in Cocoa are always PostScript
  # coordinates, which start from the bottom of the screen
  # and increase as they go up, so we have to do some math
  # to place the window at 100 pixels from the top of the
  # screen.
  #
  screenFrame = OSX::NSScreen.mainScreen.frame
  windowOriginPoint = [40, screenFrame.origin.y + screenFrame.size.height - 100]
  window.setFrameOrigin( windowOriginPoint )

  # Show the window
  window.makeKeyAndOrderFront(nil)
  window.orderFrontRegardless()		## but this one does

  # And start the application event loop
  $stderr.print "\rtype `Ctrl-C' for quit !\n"
  trap('SIGINT') { $stderr.puts "bye." ; exit 0 }

  th = Thread.start {
    application.run
  }

  ARGF.each { |line|
    line.chomp!
    puts line
    view.setText(line)
    view.setNeedsDisplay true
  }
  th.join

#  application.run
end
