package net.npaka.touchex;
import android.app.*;
import android.os.*;
import android.view.*;

//タッチイベントの処理
public class TouchEx extends Activity {
    private TouchView   touchView;  //タッチビュー
    private TickHandler tickHandler;//定期処理ハンドラ
    
    //アプリの初期化
    @Override
    public void onCreate(Bundle icicle) {
        super.onCreate(icicle);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        touchView=new TouchView(this);
        setContentView(touchView);
    }

    //アプリの再開
    @Override
    public void onResume() {
        super.onResume();
        tickHandler=new TickHandler();
        tickHandler.sleep(0);
    }    
    
    //アプリの一時停止
    @Override
    public void onPause() {
        super.onPause();
        tickHandler=null;
    }    
    
    //定期処理
    public void onTick() {
        touchView.invalidate();
        if (tickHandler!=null) tickHandler.sleep(100);
    }    
    
    //定期処理ハンドラ
    public class TickHandler extends Handler {
        //ハンドルメッセージ
        @Override 
        public void handleMessage(Message msg) {
            onTick();
        }
        
        //スリープ
        public void sleep(long delayMills) {
            removeMessages(0);
            sendMessageDelayed(obtainMessage(0),delayMills);
        }
    }
}