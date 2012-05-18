import java.util.*;
import java.util.regex.*;

public class Test {
    public static void main (String[] args) {
	String patstr = "a.*b";
	String text = "fewfafsfbdcde";
	Pattern pat = Pattern.compile(patstr);

	Matcher matcher = pat.matcher(text);
	while (matcher.find()) {
	    System.out.println("Matched: " + matcher.group());
	}
    }
}
