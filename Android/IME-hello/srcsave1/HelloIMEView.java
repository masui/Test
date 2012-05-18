package com.pitecan.helloime;

import android.view.View;
import android.view.MotionEvent;
import android.graphics.Canvas;
import android.content.Context;
import android.util.AttributeSet;

public class HelloIMEView extends View {
    public HelloIMEView(Context context, AttributeSet attrs) {
	super(context,attrs);
    }
    
    @Override public void onDraw(Canvas canvas) {
	canvas.drawColor(0xffe0e0e0);
    }
    
    @Override protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
	setMeasuredDimension(widthMeasureSpec,80);
    }
    
    public boolean onTouchEvent(MotionEvent ev) {
	if((ev.getAction() & MotionEvent.ACTION_MASK) == MotionEvent.ACTION_DOWN){
	    ime.input("Hello, World! ");
	}
	return true;
    }

    HelloIME ime;
    public void setIME(HelloIME _ime){
	ime = _ime;
    }
}
