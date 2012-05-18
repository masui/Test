package com.pitecan.asset;

import android.app.Activity;
import android.os.Bundle;

import android.content.res.AssetManager;
import android.util.Log;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.FileReader;
import java.io.BufferedReader;
import java.io.IOException;

import android.text.TextUtils;

public class Asset extends Activity
{
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

	try {
	    AssetManager as = getResources().getAssets();
	    InputStream is = as.open("dict.txt");
	    InputStreamReader in = new InputStreamReader(is);
	    //FileReader fr = new FileReader(in);
	    BufferedReader br = new BufferedReader(in);
	    Log.v("Asset","as="+as);
	    Log.v("Asset","is="+is);
	    
	    String line;
	    String[] a;
            while ((line = br.readLine()) != null) {
		a = TextUtils.split(line,"\t");
		Log.v("Asset",a[1]);
		Log.v("Asset","value = " + Integer.valueOf(a[3]));
            }

            br.close();
	    in.close();
	    is.close();
	    as.close();
	} catch (IOException e) {  
	    //e.printStackTrace();  
	} 
    }
}
