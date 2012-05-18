class Position {
    int x,y;
    public Position(int _x,int _y){
	x = _x;
	y = _y;
    }
}

class Size {
    public int w,h;
    public Size(int _w,int _h){
	w = _w;
	h = _h;
    }
}

class Rect {
    static Position pos;
    Size size;
    public Rect(int _x,int _y, int _w, int _h){
	pos = new Position(_x,_y);
	size = new Size(_w,_h);
    }
}

public class Rectangle {
    public static void main (String[] args) {
	Rect rect = new Rect(10,20,30,40);
	System.out.println(Rect.pos.x);
    }
}
