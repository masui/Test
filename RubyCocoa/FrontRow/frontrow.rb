# -*- ruby -*-
#
# FrontRowもどきを作る
# 

require 'osx/cocoa'
require 'rubygems'
require 'rbosa'
include OSX

#
# AppleRemote.frameworkは標準じゃないのでこういうのが必要らしい
#
NSBundle.bundleWithPath("/Library/Frameworks/AppleRemote.framework").load
ns_import :AppleRemote

#
# AppleRemoteはDelegateを定義することによって利用する。
#
class AppleRemoteDelegate < NSObject
  attr_accessor :view

  addRubyMethod_withType('sendRemoteButtonEvent:pressedDown:remoteControl:', 'v@:ii@')

  def initialize
    puts "AppleRemote initialize"
  end

  def sendRemoteButtonEvent_pressedDown_remoteControl(buttonIdentifier, pressDown, remoteControl)
    puts "button #{buttonIdentifier}, pressed #{pressDown}"
    if pressDown == 1 then
      @view.buttonDown(nil)
    else
      if buttonIdentifier == 2 then
        @view.upKeyUp(nil)
      elsif buttonIdentifier == 64 then
        @view.leftKeyUp(nil)
      elsif buttonIdentifier == 4096 then # 長押しするとこのコードが出る
        @view.leftKeyUp(true)
      elsif buttonIdentifier == 32 then
        @view.rightKeyUp(nil)
      elsif buttonIdentifier == 2048 then
        @view.rightKeyUp(true)
      elsif buttonIdentifier == 4 then
        @view.downKeyUp(nil)
      elsif buttonIdentifier == 16 then
        @view.fix
      elsif buttonIdentifier == 8 then
        @view.delete
      end
    end
  end
end

class ITunes < NSObject
  def initialize
    @name = []
    @album = []
    @artist = []
    @matched = []

    # iTunesの曲を取得する
    OSA::app('iTunes').sources[0].library_playlists[0].tracks.each { |s|
      @name << s.name
      @album << s.album
      @artist << s.artist
    }
  end

  def match(pat)
    @matched = []
    (0...@name.length).each { |i|
      if @name[i] =~ /#{pat}/i || @album[i] =~ /#{pat}/i || @artist[i] =~ /#{pat}/i then
        @matched << "#{@name[i]} (#{@artist[i]})"
      end
    }
  end

  def matched
    @matched
  end
end

class FrontRowView < NSView
  attr_accessor :itunes
  
  def initialize
    puts "FrontRowView initialize"

    @selecting = false    # 矢印キーで文字選択中
    @tup = Time.now
    @tdown = Time.now
    @patchars = []
    @patchar = 'a'
    @patind = 0
    @button = nil
    @fixed = false
  end

  def drawRect(rect)
    # puts "--------------drawRect selecting = #{@selecting} patind=#{@patind}"
    patlen = @patchars.length
    patlen2 = patlen
    if @selecting then
      patlen2 = patlen - 1
    end
    patlen2 = 0 if patlen2 < 0
    ox = 60
    oy = 340

    (0...patlen2).each { |i|
      x = ox + i * 36 + 20
      y = oy + 20
      s = @patchars[i].dup
      s.gsub!(/[\[\]]/,'')
      image = NSImage.alloc.initByReferencingFile("images/#{s}.png")
      image.compositeToPoint_operation(NSPoint.new(x,y),NSCompositeSourceOver)
    }
 
    if @selecting then
      img = "images/#{@patchar}.png"
      puts "imagefile = #{img}"
      image = NSImage.alloc.initByReferencingFile(img)
      image.compositeToPoint_operation(NSPoint.new(ox+patlen2*36+20,oy+20),NSCompositeSourceOver)
    end
    image = NSImage.alloc.initByReferencingFile('images/frame3.png')
    image.compositeToPoint_operation(NSPoint.new(ox + patlen2 * 36,oy),NSCompositeSourceOver)


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

  def buttonDown(event)
    @tdown = Time.now
  end

  def show
    puts "Show!"
    setNeedsDisplay(true)
  end

  def dirtype(dir)
    case dir
    when 'up' then 'updown'
    when 'down' then 'updown'
    when 'left' then 'leftright'
    when 'right' then 'leftright'
    else ''
    end
  end

  def keyDown(key)
    puts key
    exit
  end

  def buttonUp(button,pat,long)
    @tup = Time.now

    if dirtype(button) != dirtype(@oldbutton) then
      self.fix
      @patstr = pat
      @oldbutton = button
    end

    if !@selecting && (@tup - @tdown > 0.3 || long) then # 長押し
      @patchar = "[#{pat}]"
      @patchars << @patchar
      self.fix
    else
      if @selecting then
        if @oldbutton == button then
          @patind += 1
          if @patind >= pat.length then
            @patind = 0
          end
        else
          @patind -= 1
          if @patind < 0 then
            @patind = pat.length - 1
          end
        end
        @patchars.pop
      else
        @patind = 0
      end
      @patchars << @patstr[@patind,1]
      @selecting = true
      if @timer then
        puts 'timer reset'
        @timer.invalidate
      end
      @timer = NSTimer.scheduledTimerWithTimeInterval_target_selector_userInfo_repeats(
         2, self, 'fixfix:', nil, false)
    end

    @patchar = @patstr[@patind,1]

    pat = @patchars.join('')
    @itunes.match(pat)

    setNeedsDisplay(true)
  end

  def upKeyUp(long) # AppleRemoteのキーアップ
    buttonUp('up','abcdefg',long)
  end

  def leftKeyUp(long)
    buttonUp('left','hijklm',long)
  end

  def rightKeyUp(long)
    buttonUp('right','nopqrs',long)
  end

  def downKeyUp(long)
    buttonUp('down','tuvwxyz',long)
  end

  def delete
    @patchars.pop
    @selecting = false
    @oldbutton = nil
    @patind = 0

    # puts @patchars.join('/')
    pat = @patchars.join('')
    @itunes.match(pat)
    setNeedsDisplay(true)
  end

  def fixfix
    puts 'Timer fire!'
    self.fix
  end

  def fix
    puts "---fix"
    @selecting = false
    @patind = 0
    @timer.invalidate if @timer
    @timer = nil
    @oldbutton = nil
    setNeedsDisplay(true)
  end
end


if __FILE__ == $0
  application = NSApplication.sharedApplication

  #
  # AppleRemote初期化
  #
  appleRemoteDelegate = AppleRemoteDelegate.alloc.init
  appleRemote = AppleRemote.alloc.initWithDelegate(appleRemoteDelegate)
  appleRemote.startListening self

  #
  # フルスクリーン画面作成
  #
  screenRect = NSScreen.mainScreen.frame
  window = NSWindow.alloc.
    objc_send(:initWithContentRect, screenRect,
              :styleMask, NSBorderlessWindowMask,
              :backing, NSBackingStoreBuffered,
              :defer, false,
              :screen, NSScreen.mainScreen)

  window.setLevel  NSMainMenuWindowLevel + 1 # CGShieldingWindowLevel()
  window.setBackgroundColor NSColor.yellowColor
  window.makeKeyAndOrderFront nil

  frontrowview = FrontRowView.alloc.initWithFrame(screenRect)
  window.setContentView(frontrowview)

  appleRemoteDelegate.view = frontrowview
  frontrowview.itunes = ITunes.alloc.init

  trap('SIGINT') { $stderr.puts "bye." ; exit 0 }

  application.run
end
