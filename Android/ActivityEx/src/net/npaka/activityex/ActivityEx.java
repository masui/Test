package net.npaka.activityex;
import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.widget.Button;
import android.widget.LinearLayout;

//アクティビティの呼び出し
public class ActivityEx extends Activity 
    implements View.OnClickListener {
        
    //初期化
    @Override
    public void onCreate(Bundle icicle) {
        super.onCreate(icicle);
        requestWindowFeature(Window.FEATURE_NO_TITLE);

        //レイアウトの生成
        LinearLayout layout=new LinearLayout(this);
        layout.setBackgroundColor(Color.rgb(255,255,255));
        layout.setOrientation(LinearLayout.VERTICAL);
        setContentView(layout);            

        //ボタンの生成
        layout.addView(makeButton(0,"Webページの表示:npaka.net"));    
        layout.addView(makeButton(1,"地図の表示:Tokyo"));    
        layout.addView(makeButton(2,"通話の開始 tel:117"));    
        layout.addView(makeButton(3,"ダイアラーの表示"));    
        layout.addView(makeButton(4,"設定画面の表示"));    
    }
    
    //ボタンの生成
    private Button makeButton(int id,String text) {
        Button button=new Button(this);
        button.setId(id);
        button.setText(text);
        button.setOnClickListener(this); 
        setLLParams(button);
        return button;        
    }
    
    //ボタンクリックイベントの処理
    public void onClick(View v) {
        int id=v.getId();
        //Webページの表示
        if (id==0) {
            Intent intent=new Intent(
                "android.intent.action.VIEW",
                Uri.parse("http://npaka.net"));
            startActivity(intent);
        } 
        //地図の表示
        else if (id==1) {
            Intent intent=new Intent(
                "android.intent.action.VIEW",
                Uri.parse("geo:0,0?q=Tokyo"));
            startActivity(intent);
        }
        //通話の開始
        else if (id==2) {
            Intent intent=new Intent(
                "android.intent.action.CALL",
                Uri.parse("tel:117"));
            startActivity(intent);
        } 
        //ダイアラーの表示
        else if (id==3) {
            Intent intent=new Intent(
                "android.intent.action.DIAL",
                Uri.parse("tel:117"));
            startActivity(intent);
        }
        //設定画面の表示
        else if (id==4) {
            Intent intent=new Intent(
                "android.settings.SETTINGS");
            startActivity(intent);
        }
    }

    //ライナーレイアウトのパラメータ指定
    private static void setLLParams(View view) {
        view.setLayoutParams(new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.WRAP_CONTENT,
            LinearLayout.LayoutParams.WRAP_CONTENT));
    }  
}
