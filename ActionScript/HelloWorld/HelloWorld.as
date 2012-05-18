package{
  import flash.display.*;
  import flash.text.*;

  public class HelloWorld extends Sprite{
    public function HelloWorld(){
      var tf:TextField = new TextField();
      tf.text = "ハロー、ワールド!";
      tf.width = 300;

var defaultFormat:TextFormat;
defaultFormat = new TextFormat(); 
defaultFormat.size = 20;
defaultFormat.font = "_ゴシック";
tf.setTextFormat(defaultFormat);

      addChild(tf);
    }
  }
}
