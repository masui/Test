public class Kana {
    static String h2k(String s){
	StringBuffer sb = new StringBuffer(s);
	for (int i = 0; i < sb.length(); i++) {
	    char c = sb.charAt(i);
	    if (c >= 'ぁ' && c <= 'ん') {
		sb.setCharAt(i, (char)(c - 'ぁ' + 'ァ'));
	    }
	}
	return sb.toString();    
    }

    public static void main (String[] args) {
	System.out.println(h2k("ますい"));
    }
}
