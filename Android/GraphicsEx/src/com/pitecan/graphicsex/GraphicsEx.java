package com.pitecan.graphicsex;
import android.app.Activity;
import android.os.Bundle;
import android.view.Window;

//グラフィックスの描画
public class GraphicsEx extends Activity {
    //アプリの初期化
    @Override
    public void onCreate(Bundle icicle) {
        super.onCreate(icicle);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(new GraphicsView(this));
    }
}
