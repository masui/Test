enum KeyType { SMALL, BIG, }

class Key {
    KeyType keyType;
    int x,y;
    public Key(int _x,int _y,KeyType _keyType){
	x = _x;
	y = _y;
	keyType = _keyType;
    }
}

public class Const {
    public static void main (String[] args) {
	Key key = new Key(10,20,KeyType.SMALL);
	System.out.println(key.x);
    }
}
