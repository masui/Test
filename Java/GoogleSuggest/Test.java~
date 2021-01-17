import java.io.*;
import java.net.*;

import java.util.*;
import java.util.regex.*;

public class Test {

    static void suggest(String q){
	// String url_str = "http://google.co.jp/complete/search?output=toolbar&hl=ja&q=" + q;
	String url_str = "http://pitecan.com/googlesuggest.cgi?q=" + q;
	try {
	    URL url = new URL(url_str);
	    HttpURLConnection http = (HttpURLConnection)url.openConnection();
	    http.setRequestMethod("GET");
	    http.connect();
	    BufferedInputStream bis = new BufferedInputStream(http.getInputStream());
	    String text = "";
	    byte[] fbytes = new byte[1024];  
	    while ((bis.read(fbytes)) >= 0) {
		text += new String(fbytes);  
	    }
	    bis.close();  
	    Pattern pat = Pattern.compile("suggestion data=\"([^\"]*)\"/>"); // Google Suggestのフォーマット
	    Matcher matcher = pat.matcher(text);
	    while(matcher.find()){
		System.out.println(matcher.group(1));
	    }
	}
	//catch( IOException e ){
	catch( Exception e ){
	    Log.v("Slime",e.toString);
	}
    }

    public static void main (String[] args) {
	suggest("masui");
    }
}

