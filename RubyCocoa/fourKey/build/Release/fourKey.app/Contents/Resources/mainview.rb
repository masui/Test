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

  def initialize
    puts "MainView initialize"

    @selecting = false    # 文字選択中
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
      x = ox + i * 36 + 24
      y = oy + 24
      s = @patchars[i].dup
      s.gsub!(/[\[\]]/,'')
      image = NSImage.alloc.initByReferencingFile(s+'.png')
      image.compositeToPoint_operation(NSPoint.new(x,y),NSCompositeSourceOver)
    }

 
    if @selecting then
      img = (@button == 'up' ? 'abcdefg-list.png' :
             @button == 'left' ? 'hijklm-list.png' :
             @button == 'right' ? 'nopqrs-list.png' : 'tuvwxyz-list.png')
      x = ox + patlen2 * 36
      y = oy
      if @button == 'up' then
        x += 27
        y -= 180
        y += @patind * 36
      end
      if @button == 'down' then
        x += 27
        y += 30
        y -= @patind * 36
      end
      if @button == 'left' then
        y += 27
        x += 36
        x -= @patind * 27
      end
      if @button == 'right' then
        y += 27
        x -= 98
        x += @patind * 27
      end
      image = NSImage.alloc.initByReferencingFile(img)
      image.compositeToPoint_operation(NSPoint.new(x,y),NSCompositeSourceOver)
    end
    image = NSImage.alloc.initByReferencingFile('frame3.png')
    image.compositeToPoint_operation(NSPoint.new(ox + patlen2 * 36,oy),NSCompositeSourceOver)
  end

  def buttonDown(event)
    @tdown = Time.now
    if @tdown - @tup > 0.5 || @fixed then
      @selecting = false
      @patind = 0
      @fixed = false
    else
      @selecting = true
    end
    setNeedsDisplay(true)
  end

  def buttonUp(pat)
    if @button != @oldbutton then
      @oldbutton = @button
      @selecting = false
      @patind = 0
    end

    @tup = Time.now
    if @tup - @tdown > 0.5 then # 長押し
      @patchar = "[#{pat}]"
      @patchars << @patchar
      @fixed = true
    else
      if @selecting then
        @patind += 1
        if @patind >= pat.length then
          @patind = 0
        end
        @patchars.pop
      else
        @patind = 0
      end
      @patchars << pat[@patind,1]
      @selecting = true
      @timer.invalidate if @timer
      @timer = NSTimer.scheduledTimerWithTimeInterval_target_selector_userInfo_repeats(
         1.0, self, 'fix:', nil, false)
    end
    puts @patchars.join('/')

    setNeedsDisplay(true)
  end

  def upButtonUp(sender)
    @button = 'up'
    buttonUp('abcdefg')
  end

  def leftButtonUp(sender)
    @button = 'left'
    buttonUp('hijklm')
  end

  def rightButtonUp(sender)
    @button = 'right'
    buttonUp('nopqrs')
  end

  def downButtonUp(sender)
    @button = 'down'
    buttonUp('tuvwxyz')
  end

  def delete
    @patchars.pop
    @selecting = false
    @patind = 0
    puts @patchars.join('/')
    setNeedsDisplay(true)
  end

  def fix
    @selecting = false
    @patind = 0
    setNeedsDisplay(true)
  end
end
