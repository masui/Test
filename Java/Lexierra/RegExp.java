import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class RegExp {
    static Pattern[] regexp = new Pattern[50];       // パタンの部分文字列にマッチするRegExp
    static int[] cslength = new int[50];             // regexp[n]に完全マッチするパタンの長さ

    static String patInit(String pat, int level){
	String p = "";
	String top = "";
	Pattern re;
	Matcher m;

	cslength[level] = 0;
	if(pat.length() > 0){
	    re = Pattern.compile("^(\\[[^\\]]+\\])(.*)$");
	    m = re.matcher(pat);
	    if(m.find()){
		top = m.group(1);
		p = patInit(m.group(2),level+1);
	    }
	    else {
		System.out.println("pat="+pat);
		re = Pattern.compile("^(.)(.*)$");
		m = re.matcher(pat);
		m.find();
		top = m.group(1);
		p = patInit(m.group(2),level+1);
	    }
	    cslength[level] = cslength[level+1]+1;
	}

	top += (p.length() > 0 ? "("+p+")?" : "");
	regexp[level] = Pattern.compile("^("+top+")");
	return top;
    }
    /*
    static void patInitxx(String pat, int level){
	int len = 0;
	String p = "";
	String top = "";

	cslength[level] = 0;
	if(pat.length() > 0){
	    Pattern pp;
	    Matcher m;
	    pp = Pattern.compile("^(\\[[^\\]]+\\])(.*)$");
	    m = pp.matcher(pat);
	    if(m.find()){
		top = m.group(1);
		patInit(m.group(2),level+1);
		len = retlen[level+1];
		p = retp[level+1];
	    }
	    else {
		System.out.println("pat="+pat);
		pp = Pattern.compile("^(.)(.*)$");
		m = pp.matcher(pat);
		m.find();
		top = m.group(1);
		patInit(m.group(2),level+1);
		len = retlen[level+1];
		p = retp[level+1];
	    }
	    cslength[level] = len;
	}
	String s = (p.length() > 0 ? "("+p+")?" : "");

	regexp[level] = Pattern.compile("^("+top+s+")");
	retlen[level] = len+1;
	retp[level] = top + s;
    }
    */

    public static void main (String[] args) {
	String pat = "[abc][def]";
	patInit(pat,0);
	pat = "abc[def]";
	patInit(pat,0);
	for(int i=0;i<cslength[0];i++){
	    System.out.println("i="+i+" "+regexp[i]);
	}
	/*
	//Pattern p = Pattern.compile("^(\\[[^\\]]+\\])(.*)$");
	Pattern p = Pattern.compile("^(.)(.*)$");
	Matcher m = p.matcher("[abc][def]");
	System.out.println(p);
	if (m.find()){
	    System.out.println(m.group(1));
	    System.out.println(m.group(2));
	}else{
	    System.out.println("マッチしません");
	}
	*/
	/*
	if(Pattern.matches("a[bc]c", "abc")){
	    System.out.println("マッチしました");
	}else{
	    System.out.println("マッチしません");
	}
	*/

	/*
	System.out.println(patInd("abc"));
	System.out.println(patInd("gaki"));
	System.out.println(patInd("[zaz"));
	System.out.println(patInd("[da"));
	System.out.println(patInd("nani"));
	System.out.println(patInd("papa"));
	System.out.println(patInd("masu"));
	System.out.println(patInd("ya"));
	System.out.println(patInd("ra"));
	System.out.println(patInd("wawa"));
	*/
    }

    private static int patInd(String str){
	if(Pattern.matches("\\[?[aiueoAIUEO].*",str)) return 0;
	if(Pattern.matches("\\[?[kg].*",str)) return 1;
	if(Pattern.matches("\\[?[sz].*",str)) return 2;
	if(Pattern.matches("\\[?[tdT].*",str)) return 3;
	if(Pattern.matches("\\[?[hbp].*",str)) return 4;
	if(Pattern.matches("\\[?[n].*",str)) return 5;
	if(Pattern.matches("\\[?[m].*",str)) return 6;
	if(Pattern.matches("\\[?[yY].*",str)) return 8;
	if(Pattern.matches("\\[?[r].*",str)) return 9;
	return 10;
    }
}
