//
// 「Hello, World!」IME
//

package com.pitecan.helloime;

import android.view.View;
import android.inputmethodservice.InputMethodService;

public class HelloIME extends InputMethodService
{
    HelloIMEView helloIMEView;

    @Override public View onCreateInputView() {
        helloIMEView = (HelloIMEView) getLayoutInflater().inflate(R.layout.input, null);
	helloIMEView.setIME(this);
        return helloIMEView;
    }

    public void input(String s){
	getCurrentInputConnection().commitText(s,1); // 入力貼り付け
    }
}
