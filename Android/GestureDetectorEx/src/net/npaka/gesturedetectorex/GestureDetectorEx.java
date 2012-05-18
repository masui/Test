package net.npaka.gesturedetectorex;
import android.app.*;
import android.os.*;
import android.view.*;

//長押し・フリック・ダブルタップなどのイベント処理
public class GestureDetectorEx extends Activity {
    private GestureDetectorView gestureDetectorView;
    private TickHandler tickHandler;
    
    //アプリの初期化
    @Override
    public void onCreate(Bundle icicle) {
        super.onCreate(icicle);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        gestureDetectorView=new GestureDetectorView(this);
        setContentView(gestureDetectorView);
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
        gestureDetectorView.invalidate();
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
