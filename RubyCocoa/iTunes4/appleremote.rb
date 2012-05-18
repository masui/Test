# -*- ruby -*-

require 'osx/cocoa'
include OSX

OSX::NSBundle.bundleWithPath("/Library/Frameworks/AppleRemote.framework").load
OSX::ns_import :AppleRemote

class AppleRemoteDelegate < OSX::NSObject
  ib_outlets :mainview

  addRubyMethod_withType('sendRemoteButtonEvent:pressedDown:remoteControl:', 'v@:ii@')

  def awakeFromNib
    puts "awakeFromNib - mainview = #{@mainview}"
    @@mainview = @mainview
  end

  def sendRemoteButtonEvent_pressedDown_remoteControl(buttonIdentifier, pressDown, remoteControl)
    puts "button #{buttonIdentifier}, pressed #{pressDown} .. mainview=#{@@mainview}"
    if pressDown == 1 then
      @@mainview.buttonDown(nil)
    else
      if buttonIdentifier == 2 then
        @@mainview.upKeyUp(nil)
      elsif buttonIdentifier == 64 then
        @@mainview.leftKeyUp(nil)
      elsif buttonIdentifier == 4096 then
        @@mainview.leftKeyUp(true)
      elsif buttonIdentifier == 32 then
        @@mainview.rightKeyUp(nil)
      elsif buttonIdentifier == 2048 then
        @@mainview.rightKeyUp(true)
      elsif buttonIdentifier == 4 then
        @@mainview.downKeyUp(nil)
      elsif buttonIdentifier == 16 then
        @@mainview.fix
      elsif buttonIdentifier == 8 then
        @@mainview.delete
      end
    end
  end
end
