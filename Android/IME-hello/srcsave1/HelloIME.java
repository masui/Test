//
// 最小IMEテスト by masui
//

package com.pitecan.helloime;

import android.inputmethodservice.InputMethodService;
//import android.view.inputmethod.EditorInfo;
import android.view.inputmethod.InputConnection;
import android.view.inputmethod.InputMethodManager;

import android.os.Bundle;
import android.view.View;
import android.util.Log;

public class HelloIME extends InputMethodService 
{
    HelloIMEView helloIMEView;

    // IMEの初期化
    @Override
    public void onCreate()
    {
        super.onCreate();
    }

    // UIコンポーネントの初期化
    @Override public void onInitializeInterface() {
    }

    /*
    // アプリ情報を知る
    @Override public void onStartInput(EditorInfo attribute, boolean restarting) {
        super.onStartInput(attribute, restarting);
    }
    */

    // IME用Viewの生成
    @Override public View onCreateInputView() {
        helloIMEView = (HelloIMEView) getLayoutInflater().inflate(R.layout.input, null);
	helloIMEView.setIME(this);
        return helloIMEView;
    }

    /*
    @Override public void onStartInputView(EditorInfo info, boolean restarting) {
    }
    */

    @Override public void onFinishInput() {
	super.onFinishInput();
    }

    public void input(String s){
	getCurrentInputConnection().commitText(s,1); // 入力貼り付け
    }
}
