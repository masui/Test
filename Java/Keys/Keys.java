import java.util.ArrayList;

enum KeyType {
    SMALL,
	BIG,
}

class Key {
    public final int x,y;
    String pat;

    public Key(int _x,int _y,String _pat){
	x = _x;
	y = _y;
	pat = _pat;
    }
}

public class Keys {
    public Key keys[][] = {
	{
	    new Key(10,20,"abc"),
	    new Key(10,20,"abc"),
	    new Key(10,20,"abc"),
	}
    };

    public static void main (String[] args) {
	System.out.println(100);
    }
}
