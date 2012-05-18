package com.pitecan.sqlitedict;

import android.app.Activity;
import android.os.Bundle;

import android.util.Log;

public class SQLiteDict extends Activity
{
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

	Dict dict = new Dict(this);
	dict.add("大阪","oosaka");
	try { Thread.sleep(1000); } catch(Exception e){ }
	dict.add("大坂","oosaka");
	try { Thread.sleep(1000); } catch(Exception e){ }
	dict.add("おーさか","oosaka");
	try { Thread.sleep(1000); } catch(Exception e){ }
	dict.add("東京","toukyou");
	try { Thread.sleep(1000); } catch(Exception e){ }
	dict.add("日本","nippon");

	dict.limit(7);

	String[][] s;
	s = dict.match("oos",false);
	for(int i=0;i<s.length;i++){
	    Log.v("SQLite","word="+s[i][0]);
	}
    }
}
