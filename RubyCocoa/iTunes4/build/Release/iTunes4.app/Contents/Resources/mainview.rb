# -*- ruby -*-

require 'osx/cocoa'
include OSX

class MainView < NSView

  ib_action :upButtonUp
  ib_action :downButtonUp
  ib_action :rightButtonUp
  ib_action :leftButtonUp
  ib_action :delete
  ib_action :fix

  ib_outlets :itunes

  def awakeFromNib
    d = AppleRemoteDelegate.alloc.init
    puts d
    @appleRemote = OSX::AppleRemote.alloc.initWithDelegate(d)
    puts @appleRemote
    @appleRemote.startListening self
  end

  def initialize
    puts "MainView initialize"

    @selecting = false    # 矢印キーで文字選択中
    @tup = Time.now
    @tdown = Time.now
    @patchars = []
    @patchar = 'a'
    @patind = 0
    @button = nil
    @fixed = false
  end

  def mouseDown(event)
    puts 'mouseDown'
    self
  end

  def mouseUp(event)
    puts 'mouseUp'
    self
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
      image = NSImage.alloc.initByReferencingFile(s+'.png')
      image.compositeToPoint_operation(NSPoint.new(x,y),NSCompositeSourceOver)
    }

 
    if @selecting then
      img = @patchar + ".png"
      puts "imagefile = #{img}"
      image = NSImage.alloc.initByReferencingFile(img)
      image.compositeToPoint_operation(NSPoint.new(ox+patlen2*36+20,oy+20),NSCompositeSourceOver)
    end
    image = NSImage.alloc.initByReferencingFile('frame3.png')
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

    @appleRemote.startListening self
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

    # puts @patchars.join('/')
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

  def upButtonUp(sender)
    buttonUp('up','abcdefg',nil)
  end

  def leftButtonUp(sender)
    buttonUp('left','hijklm',nil)
  end

  def rightButtonUp(sender)
    buttonUp('right','nopqrs',nil)
  end

  def downButtonUp(sender,long)
    buttonUp('down','tuvwxyz',nil)
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
