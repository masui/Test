package com.pitecan.bluetooth;

//import android.app.Activity;
//import android.os.Bundle;

import java.util.Set;
import android.app.Activity;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.os.Bundle;
import android.widget.TextView;

import android.util.Log;

//public class BlueTooth extends Activity
//{
//    /** Called when the activity is first created. */
//    @Override
//    public void onCreate(Bundle savedInstanceState)
//    {
//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.main);
//    }
//}

public class BlueTooth extends Activity {
    /** Called when the activity is first created. */
    @Override
	public void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
	setContentView(R.layout.main);

	Log.v("BlueTooh","BBBBB");
	
	TextView btText = (TextView)findViewById(R.id.bt_text);
	BluetoothAdapter btAdapter = BluetoothAdapter.getDefaultAdapter();
	// ペアリング済みのデバイス一覧を取得
	Set<BluetoothDevice> btDevices = btAdapter.getBondedDevices();
	String devList = "";
	for (BluetoothDevice device : btDevices) {
	    devList += "Device : " + device.getName() + "(" + getBondState(device.getBondState()) + ")\n";
	}
	btText.setText(devList);
    }
    
    String getBondState(int state) {
	String strState;
	
	switch (state) {
	case BluetoothDevice.BOND_BONDED:
	    strState = "接続履歴あり";
	    break;
	case BluetoothDevice.BOND_BONDING:
	    strState = "接続中";
	    break;
	case BluetoothDevice.BOND_NONE:
	    strState = "接続履歴なし";
	    break;
	default :
	    strState = "エラー";
	}
	return strState;
    }
}
