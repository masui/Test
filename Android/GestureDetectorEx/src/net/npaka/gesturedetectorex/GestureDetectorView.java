package net.npaka.gesturedetectorex;
import java.util.ArrayList;
import android.content.*;
import android.graphics.*;
import android.view.*;

//長押し・フリック・ダブルタップなどのイベント処理
public class GestureDetectorView extends View implements
    GestureDetector.OnGestureListener,
    GestureDetector.OnDoubleTapListener {
    private ArrayList info=new ArrayList();
    private GestureDetector gestureDetector;
    
    //コンストラクタ
    public GestureDetectorView(Context context) {
        super(context);
        setBackgroundColor(Color.WHITE);

        //情報の生成
        info=new ArrayList();
        info.add("GestureDetectorEx");
        
        //ジェスチャーディテクターの生成
        gestureDetector=new GestureDetector(context,this);

        //フォーカス指定
        setFocusable(true);
    }
    
    //描画
    @Override 
    protected void onDraw(Canvas canvas) {
        //描画オブジェクトの生成
        Paint paint=new Paint();       
        paint.setAntiAlias(true);
        paint.setTextSize(24);

        //情報の描画
        for (int i=0;i<info.size();i++) {
	    //String s = (String)(info.get(i));
	    //canvas.drawText(s,0,24+26*i,paint);
	    canvas.drawText((String)(info.get(i)),0,24+26*i,paint);
	    //canvas.drawText("xxxxx",0,24+26*i,paint);
        }
    }
    
    //情報の追加
    private void addInfo(String str) {
        info.add(0,str);
        while (info.size()>30) info.remove(info.size()-1);
    }

    //タッチ時に呼ばれる
    @Override
    public boolean onTouchEvent(MotionEvent event) {
        //ジェスチャーディテクターの処理
        gestureDetector.onTouchEvent(event);
        return true;
    }

    //ダウン時に呼ばれる
    public boolean onDown(MotionEvent e) {
        addInfo("Down");
        return false;
    }
    
    //長押し時に呼ばれる
    public void onLongPress(MotionEvent e) {
        addInfo("LongPress");
    }

    //フリック時に呼ばれる(速度単位はPixel/秒)
    public boolean onFling(MotionEvent e0,MotionEvent e1,
        float velocityX,float velocityY) {
        addInfo("Fling("+velocityX+","+velocityY+")");
        return false;
    }
    
    //スクロール時に呼ばれる
    public boolean onScroll(MotionEvent e0,MotionEvent e1,
        float distanceX,float distanceY) {
        addInfo("Scroll("+distanceX+","+distanceY+")");
        return false;
    }

    //プレス時(down後moveなし)に呼ばれる
    public void onShowPress(MotionEvent e) {
        addInfo("ShowPress");
    }

    //シングルタップアップ時に呼ばれる
    public boolean onSingleTapUp(MotionEvent e) {
        addInfo("SigngleTapUp");
        return false;
    }

    //ダブルタップ時に呼ばれる
    public boolean onDoubleTap(MotionEvent e) {
        addInfo("DoubleTap");
        return false;
    }

    //ダブルタップイベント時(down,move,up含む)に呼ばれる
    public boolean onDoubleTapEvent(MotionEvent e) {
        addInfo("DoubleTapEvent");
        return false;
    }

    //シングルタップ時に呼ばれる
    public boolean onSingleTapConfirmed(MotionEvent e) {
        addInfo("SingleTap");
        return false;
    }
}