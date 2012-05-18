# -*- ruby -*-

require 'osx/cocoa'
include OSX

#
# ボタンを押している時間を計測したいので
#
class FourButton < NSButton
  ib_outlets :mainview

  def mouseDown(event)
    @mainview.buttonDown(event)
    super_mouseDown(event)
  end
end
