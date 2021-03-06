package com.pitecan.graphicsex;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.Rect;
import android.graphics.RectF;
import android.view.View;

//グラフィックスの描画
public class GraphicsView extends View {
    //コンストラクタ
    public GraphicsView(Context context) {
        super(context);
        setBackgroundColor(Color.WHITE);
    }

    //描画
    @Override 
    protected void onDraw(Canvas canvas) {
        //描画オブジェクトの生成
        Paint paint=new Paint();
        paint.setAntiAlias(true);

        //ラインの描画
        paint.setStrokeWidth(1);
        paint.setStyle(Paint.Style.STROKE);
        paint.setColor(Color.argb(255,255,0,0));
        canvas.drawLine(25,5,25,5+40,paint);
        
        //パスの描画
        paint.setStyle(Paint.Style.STROKE);
        paint.setColor(Color.argb(255,255,0,0));
        Path path=new Path();
        path.moveTo(55+ 0,5+ 0);
        path.lineTo(55+30,5+ 5);
        path.lineTo(55+10,5+20);
        path.lineTo(55+40,5+25);
        path.lineTo(55+ 0,5+40);
        canvas.drawPath(path,paint);

        //四角形の描画
        paint.setStyle(Paint.Style.STROKE);
        paint.setColor(Color.argb(255,0,0,255));
        canvas.drawRect(new Rect(5+0,50+0,5+40,50+40),paint);        
        
        //四角形の塗り潰し
        paint.setStyle(Paint.Style.FILL);
        paint.setColor(Color.argb(255,0,0,255));
        canvas.drawRect(new Rect(55+0,50+0,55+40,50+40),paint);

        //角丸矩形の描画
        paint.setStyle(Paint.Style.STROKE);
        paint.setColor(Color.argb(255,0,255,0));
        canvas.drawRoundRect(new RectF(5+0,100+0,5+40,100+40),10,10,paint);         
        
        //角丸矩形の塗り潰し
        paint.setStyle(Paint.Style.FILL);
        paint.setColor(Color.argb(255,0,255,0));
        canvas.drawRoundRect(new RectF(55+0,100+0,55+40,100+40),10,10,paint); 
        
        //円の描画
        paint.setStyle(Paint.Style.STROKE);
        paint.setColor(Color.argb(255,255,255,0));
        canvas.drawCircle(25,170,20,paint);

        //円の塗り潰し
        paint.setStyle(Paint.Style.FILL);
        paint.setColor(Color.argb(255,255,255,0));
        canvas.drawCircle(75,170,20,paint);    
    }
}
