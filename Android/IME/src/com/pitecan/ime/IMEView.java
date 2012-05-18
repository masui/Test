package com.pitecan.ime;

import android.view.View;
import android.content.Context;
import android.util.AttributeSet;

import android.graphics.Canvas;
import android.graphics.Color;
import android.util.Log;
import android.view.MotionEvent;

public class IMEView extends View {
    public IMEView(Context context, AttributeSet attrs) {
	super(context,attrs);
    }

    @Override public void onDraw(Canvas canvas) {
	canvas.drawColor(Color.BLUE);
    }

    // よくわからないがこれを設定するとViewの大きさを決められるようだ...
    @Override protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        setMeasuredDimension(320,200);
    }

    //
    // 指を動かすたびに文字が順番に入力される....
    //
    static String[] inputWords = {"入", "力", "文", "字", "列"};
    static int inputIndex = 0;

    public boolean onTouchEvent(MotionEvent ev) {
	ime.input(inputWords[(inputIndex++) % 5]);
	return true;
    }

    IME ime;
    public void setIME(IME i){
	ime = i;
    }
}

