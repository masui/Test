import java.util.ArrayList;

class Key {
    int x,y;

    public Key(int _x,int _y){
	x = _x;
	y = _y;
    }
}

public class Test {
    public static void main (String[] args) {
	Key[] keys = {
	    new Key(10,20),
	    new Key(10,20),
	};
	System.out.println(keys.length);
	/*
	ArrayList<String> array = new ArrayList<String>();
	array.add("ab");
	array.add("cde");
	array.add("aiueo");
	System.out.println(array.size());
	array.remove(0);
	System.out.println(array.size());
	array.remove(0);
	System.out.println(array.size());
	array.remove(0);
	System.out.println(array.size());
	array.remove(0);
	System.out.println(array.size());

	Key key = new Key(10,20);
	Key key1 = {10, 20};
	*/
    }
}
