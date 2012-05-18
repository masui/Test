package com.pitecan.sqlitedict;

import java.util.regex.Pattern;
import java.util.regex.Matcher;
import java.util.ArrayList;

import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.database.sqlite.SQLiteStatement;

import android.content.Context;

import android.util.Log;

class DBHelper extends SQLiteOpenHelper {
    public DBHelper(Context context) {
	super(context, null, null, 1);
    }
    
    @Override
	public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
    }
    
    @Override
	public void onCreate(SQLiteDatabase db) {
    }
}

public class Dict
{
    SQLiteDatabase db;

    public Dict(Context context){
	DBHelper helper = new DBHelper(context);
        db = helper.getWritableDatabase();
	db.execSQL(
		   "create table history("+
		   "   word text not null,"+
		   "   pat text not null,"+
		   "   patind text not null,"+
		   "   date text not null"+
		   ");"
		   );
    }
	
    public void add(String word, String pat){
	int patind = patInd(pat);
	db.execSQL("insert into history(word,pat,patind,date) values ('"+word+"', '"+pat+"', "+patind+", datetime('now', 'localtime'));");
    }

    public void limit(int max){ // max個までにDBを制限する
	Cursor cursor;
	String word, pat;
        cursor = db.query("history", new String[] { "word", "pat", "patind", "date" },
			  null, null, null, null, "date desc");
	int count = cursor.getCount();
	for(;max < count;max++){
	    cursor.moveToPosition(max);
	    word = cursor.getString(0);
	    pat = cursor.getString(1);
	    Log.v("SQLite","getString(0) = " + word);
	    db.delete("history", "word = '"+word+"' AND pat = '"+pat+"'", null);
	}
	cursor.close();
    }

    public String[][] match(String pat, boolean exactMode){
	ArrayList<String> words = new ArrayList<String>();
	ArrayList<String> wordpats = new ArrayList<String>();
	Pattern pattern = (exactMode ? Pattern.compile("^"+pat) : Pattern.compile("^"+pat+".*"));
	Log.v("SQLite","pattern="+pattern);

	Cursor cursor = db.query("history", new String[] { "word", "pat" },
				 "patind = " + patInd(pat), null, null, null, "date asc");
        boolean isEof = cursor.moveToFirst();
        while (isEof) {
	    String word = cursor.getString(0);
	    String wordpat = cursor.getString(1);
	    // Log.v("SQLite",String.format("word:%s wordpat:%s\r\n", word, wordpat));
	    if(pattern.matcher(wordpat).matches()){
		Log.v("SQLite - match",String.format("word:%s pat:%s\r\n", word, wordpat));
		words.add(word);
		wordpats.add(wordpat);
	    }
            isEof = cursor.moveToNext();
        }
        cursor.close();
	Log.v("SQLite","length = "+words.size());
	String[][] res = new String[words.size()][2];
	for(int i=0;i<words.size();i++){
	    res[i][0] = words.get(i);
	    res[i][1] = wordpats.get(i);
	}
	return res;
    }

    private int patInd(String str){
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
}
