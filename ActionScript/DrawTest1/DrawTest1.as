package{
  import flash.display.Sprite;

  public class DrawTest1 extends Sprite {
    public function DrawTest1() {
	trace('abc');
      // 円を描く
      var s1:Sprite = new Sprite();          
      s1.graphics.lineStyle(1, 0xff0000);    
      s1.graphics.drawCircle(0, 0, 50);      
      s1.x = 100;                            
      s1.y = 100;                            
      addChild(s1);                          

      // 四角を描く
      var s2:Sprite = new Sprite();
      s2.graphics.lineStyle(1, 0x0000ff);
      s2.graphics.beginFill(0xffffff);
      s2.graphics.drawRect(0, 0, 50, 50);
      s2.graphics.endFill();
      s2.x = 150;
      s2.y = 50;
      addChild(s2);
    }
  }
}

