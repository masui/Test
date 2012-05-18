import java.util.regex.Pattern;

class DictSearch {
    private static Dict dict = new Dict();

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

    public static void search(String pat){
	System.out.println(dict.dict.length);
	System.out.println(patInd("abc"));
    }
}
