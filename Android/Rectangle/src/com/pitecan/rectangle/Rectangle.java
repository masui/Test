// [[http://gyazo.com/eb908e4ab8dff1c269577ef52d30f008.png]] Android端末に矩形を描く
package com.pitecan.rectangle;
import android.app.Activity;
import android.os.Bundle;
import android.content.Context;
import android.graphics.*;
import android.view.*;
//
public class Rectangle extends Activity
{
 @Override public void onCreate(Bundle savedInstanceState)
 {
  super.onCreate(savedInstanceState);
  requestWindowFeature(Window.FEATURE_NO_TITLE);
  setContentView(new GraphicsView(this));
 }
}
class GraphicsView extends View {
 public GraphicsView(Context context) {
  super(context);
  setBackgroundColor(Color.WHITE);
 }
 @Override protected void onDraw(Canvas canvas) {
  Paint paint=new Paint();
  paint.setStyle(Paint.Style.FILL);
  // [[http://gyazo.com/a165dc90299b68fbe4289d0456afbc1c.png]] のような矩形を描く
  paint.setColor(0xff123456);
  canvas.drawRect(new Rect(0,0,300,200),paint);
 }
}
