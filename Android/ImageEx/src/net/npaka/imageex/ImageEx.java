package net.npaka.imageex;
import android.app.Activity;
import android.os.Bundle;
import android.view.Window;

//イメージの描画
public class ImageEx extends Activity {
    //初期化
    @Override
    public void onCreate(Bundle icicle) {
        super.onCreate(icicle);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(new ImageView(this));
    }
}

