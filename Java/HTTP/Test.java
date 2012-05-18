import java.io.*;
import java.net.*;

import java.util.*;
import java.util.regex.*;

public class Test {
    public static void main (String[] args) {

	String url_str = "http://google.co.jp/complete/search?output=toolbar&hl=ja&q=ますい";
	try {
	    URL url = new URL(url_str);
	    /*
	    if( url.getPort() == -1 ) 
		System.err.println( url.getDefaultPort() );
	    else System.err.println( url.getPort() );
	    */
	    //url.getPort();

	    // HTTP 接続オブジェクトの取得

	    HttpURLConnection http = (HttpURLConnection)url.openConnection();
	    http.setRequestMethod("GET");
	    // 接続
	    //System.err.print("Connecting ... ");
	    http.connect();
	    //System.err.println("Success");

	    // コンテンツの取得と表示
	    //System.err.print("コンテンツ取得(出力)中 ... ");

	    BufferedInputStream bis = new BufferedInputStream( http.getInputStream() );

	    String res = "";
	    byte[] fbytes = new byte[1024];  
	    while ((bis.read(fbytes)) >= 0) {
		res += new String(fbytes);  
	    }
	    bis.close();  

	    //System.err.println("End");

	    // 応答コード＆メッセージ
	    //		System.err.println("code " + http.getResponseCode()
	    //				   + " " + http.getResponseMessage() );

	    Pattern pat = Pattern.compile("suggestion data=\"([^\"]*)\"/>");
	    Matcher matcher = pat.matcher(res);
	    while (matcher.find()) {
		System.out.println("Matched: " + matcher.group(1));
	    }
	}
	catch( IOException e ){
	    // System.err.println("fail");
	    // System.err.println( e );
	}
    }
}

