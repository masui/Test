package com.pitecan.sqlite;

import android.app.Activity;
import android.os.Bundle;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.database.sqlite.SQLiteStatement;

import android.content.Context;
import android.view.View;
import android.widget.TextView;

import android.util.Log;

public class SQLite extends Activity
{
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
 
        MyDBHelper helper = new MyDBHelper(this);
        SQLiteDatabase db = helper.getWritableDatabase();

	Cursor c;
	
        c = db.query("history", new String[] { "word", "pat", "patind", "date" },
		     null, null, null, null, "date asc");

	Log.v("SQLite","num = " + c.getCount());

	c.moveToPosition(1);
	Log.v("SQLite","getString(0) = " + c.getString(0));
	db.delete("history", "word = '"+c.getString(0)+"' AND pat = '"+c.getString(1)+"'", null);
         
        c = db.query("history", new String[] { "word", "pat", "date" },
		     null, null, null, null, "date asc");

	Log.v("SQLite","num = " + c.getCount());

        boolean isEof = c.moveToFirst();
        TextView textView1 = (TextView)findViewById(R.id.textView1);
        String text="";
        while (isEof) {
            text += String.format("word:%s pat:%s date:%s\r\n", c.getString(0), c.getString(1), c.getString(2));
            isEof = c.moveToNext();
            //layout.addView(tv);
        }
        textView1.setText(text);
        c.close();

        c = db.query("history", new String[] { "word", "pat", "date" },
		     "patind = " + patInd("oosaka"), null, null, null, "date asc");
	Log.v("SQLite","OosakaCount = " + c.getCount());

        db.close();
    }
 
    @Override
	protected void onDestroy() {
        super.onDestroy();
    }

    private static int patInd(String str){
	if(Pattern.matches("\\[?[aiueoAIUEO].*",str)) return 0;
	if(Pattern.matches("\\[?[kg].*",str))         return 1;
	if(Pattern.matches("\\[?[sz].*",str))         return 2;
	if(Pattern.matches("\\[?[tdT].*",str))        return 3;
	if(Pattern.matches("\\[?[n].*",str))          return 4;
	if(Pattern.matches("\\[?[hbp].*",str))        return 5;
	if(Pattern.matches("\\[?[m].*",str))          return 6;
	if(Pattern.matches("\\[?[yY].*",str))         return 7;
	if(Pattern.matches("\\[?[r].*",str))          return 8;
	return 9;
    }
         
    public class MyDBHelper extends SQLiteOpenHelper {
        public MyDBHelper(Context context) {
            super(context, null, null, 1);
        }
 
        @Override
	    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
            // TODO Auto-generated method stub
        }
 
        @Override
	    public void onCreate(SQLiteDatabase db) {
            // table create
            db.execSQL(
                "create table history("+
                "   word text not null,"+
                "   pat text not null,"+
                "   patind text not null,"+
                "   date text not null"+
                ");"
		       );
 
            // table row insert
	    int patind;
	    patind = patInd("nippon");
            db.execSQL("insert into history(word,pat,patind,date) values ('日本', 'nippon', "+patind+", datetime('now', 'localtime'));");
	    try { Thread.sleep(1000); } catch(Exception e){ }
	    patind = patInd("toukyou");
            db.execSQL("insert into history(word,pat,patind,date) values ('東京', 'toukyou', "+patind+", datetime('now', 'localtime'));");
	    try { Thread.sleep(1000); } catch(Exception e){ }
	    patind = patInd("oosaka");
            db.execSQL("insert into history(word,pat,patind,date) values ('大阪', 'oosaka', "+patind+", datetime('now', 'localtime'));");
	    try { Thread.sleep(1000); } catch(Exception e){ }
	    patind = patInd("oosaka");
            db.execSQL("insert into history(word,pat,patind,date) values ('大坂', 'oosaka2', "+patind+", datetime('now', 'localtime'));");
        }
    }
}
