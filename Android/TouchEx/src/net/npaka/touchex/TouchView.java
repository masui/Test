package net.npaka.touchex;
import android.content.*;
import android.graphics.*;
import android.view.*;

//タッチイベントの処理
public class TouchView extends View {
    private int touchX=0;        //タッチX座標
    private int touchY=0;        //タッチY座標
    private int touchAction=-999;//タッチアクション
    private int ballX=0;         //ボールX座標
    private int ballY=0;         //ボールY座標
    private int ballAction=-999; //ボールアクション
    
    //コンストラクタ
    public TouchView(Context context) {
        super(context);
        setBackgroundColor(Color.WHITE);

        //フォーカス指定
        setFocusable(true);     
    }
    
    //描画
    @Override 
    protected void onDraw(Canvas canvas) {
        String str;
        
        //描画オブジェクトの生成
        Paint paint=new Paint();       
        paint.setAntiAlias(true);
        paint.setTextSize(16);
        
        //タッチXY座標の描画
        canvas.drawText("TouchXY>"+touchX+","+touchY,0,20*1,paint);
        
        //タッチアクションの描画
        str="NONE";
        if (touchAction==MotionEvent.ACTION_DOWN)   str="ACTION_DOWN";
        if (touchAction==MotionEvent.ACTION_MOVE)   str="ACTION_MOVE";
        if (touchAction==MotionEvent.ACTION_UP)     str="ACTION_UP";
        if (touchAction==MotionEvent.ACTION_CANCEL) str="ACTION_CANCEL";
        canvas.drawText("TouchAction>"+str,0,20*2,paint);

        //ボールXY座標の描画
        canvas.drawText("TrackballXY>"+ballX+","+ballY,0,20*3,paint);
        
        //ボールアクションの描画
        str="NONE";
        if (ballAction==MotionEvent.ACTION_DOWN)   str="ACTION_DOWN";
        if (ballAction==MotionEvent.ACTION_MOVE)   str="ACTION_MOVE";
        if (ballAction==MotionEvent.ACTION_UP)     str="ACTION_UP";
        if (ballAction==MotionEvent.ACTION_CANCEL) str="ACTION_CANCEL";
        canvas.drawText("TrackballAction>"+str,0,20*4,paint);        
    }

    //タッチイベントの処理
    @Override
    public boolean onTouchEvent(MotionEvent event) {
        touchX=(int)event.getX();
        touchY=(int)event.getY();
        touchAction=event.getAction();
        return true;
    }     
    
    //トラックボールイベントの処理
    @Override    
    public boolean onTrackballEvent(MotionEvent event) {
        ballX=(int)(event.getX()*100);
        ballY=(int)(event.getY()*100);
        ballAction=event.getAction();
        return true;
    }
}