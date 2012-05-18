# -*- ruby -*-

require 'osx/cocoa'
include OSX

#
# ボタンを押している時間を計測したいので
#
class FourButton < NSButton
  ib_outlets :mainview

#  attr_reader :tdown
#  attr_reader :tup

  def mouseDown(event)
    @mainview.buttonDown(event)
    super_mouseDown(event)
  end

  # 何故か呼ばれない
  #  def mouseUp(event)
  #puts "mouseUp - fourbutton"
  #    @tup = Time.now
  #    super_mouseUp(event)
  #    self
  #  end
end
