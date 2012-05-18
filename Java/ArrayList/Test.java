import java.util.ArrayList;

public class Test {
    public static void main (String[] args) {
	ArrayList<String> array = new ArrayList<String>(2);
	array.add("ab");
	array.add("cde");
	array.add("aiueo");

	String s = array.remove(1);
	array.add(0,s);

	for(int i=0;i<array.size();i++){
	    System.out.println(array.get(i));
	}


	System.out.println(array.size());
	array.remove(0);
	System.out.println(array.size());
	array.remove(0);
	System.out.println(array.size());
	array.remove(0);
	System.out.println(array.size());
	array.remove(0);
	System.out.println(array.size());

    }
}
