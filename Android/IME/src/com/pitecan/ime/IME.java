//
// 最小IMEテスト by masui
//
// キーボードも何も使わず、とりあえずIMEとして動くものを作る
//
// AndroidManifest.xmlは特別な設定が必要
//
//    <application android:label="@string/app_name" android:icon="@drawable/icon">
//        <service android:name="IME"
//                android:permission="android.permission.BIND_INPUT_METHOD">
//            <intent-filter>
//                <action android:name="android.view.InputMethod" />
//            </intent-filter>
//	    <meta-data android:name="android.view.im" android:resource="@xml/method" />
//        </service>
//    </application>
//
// res/xml/method.xml というのも用意する
//

package com.pitecan.ime;

import android.inputmethodservice.InputMethodService;
import android.view.inputmethod.CompletionInfo;
import android.view.inputmethod.EditorInfo;
import android.view.inputmethod.InputConnection;
import android.view.inputmethod.InputMethodManager;

import android.os.Bundle;
import android.view.View;
import android.util.Log;

public class IME extends InputMethodService 
{
    IMEView imeView;

    /**
     * Main initialization of the input method component.  Be sure to call
     * to super class.
     */
    @Override
    public void onCreate()
    {
        super.onCreate();
    }

    /**
     * This is the point where you can do all of your UI initialization.  It
     * is called after creation and any configuration change.
     */
    @Override public void onInitializeInterface() {
    }
    
    /**
     * This is the main point where we do our initialization of the input method
     * to begin operating on an application.  At this point we have been
     * bound to the client, and are now receiving all of the detailed information
     * about the target of our edits.
     */
    @Override public void onStartInput(EditorInfo attribute, boolean restarting) {
        super.onStartInput(attribute, restarting);
	Log.v("IME","onStartInput");
    }

    /**
     * Called by the framework when your view for creating input needs to
     * be generated.  This will be called the first time your input method
     * is displayed, and every time it needs to be re-created such as due to
     * a configuration change.
     */
    @Override public View onCreateInputView() {
        imeView = (IMEView) getLayoutInflater().inflate(R.layout.input, null);
	imeView.setIME(this);
        return imeView;
    }

    @Override public void onStartInputView(EditorInfo info, boolean restarting) {
	Log.v("IME","onStartInputView");
    }

    @Override public void onFinishInput() {
	super.onFinishInput();
    }

    public void input(String s){
	getCurrentInputConnection().commitText(s,s.length()); // これが入力貼り付メソッド
	Log.v("IME","CommitText("+s+")");
    }
}
