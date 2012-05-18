// http://www.atmarkit.co.jp/fdotnet/ajaxjs/ajaxjs04/ajaxjs04_01.html

var ShelfView = function(name){
    var list = [name];
    this.right_click = function(){
	print("right click on ShelfView - scroll to next shelf");
	print(list);
    }
};

var BookView = function(isbn){
    this.right_click = function(){
	print("right click on BookView - show next book");
	print(this.list);
    }
    this.list = [isbn];
};

a1 = new ShelfView('myshelf1');
a2 = new ShelfView('myshelf2');

var c = a1.right_click;
c();
var d = a2.right_click;
d();
print(a2.list);

b = new BookView('12345');
b.right_click();
print(b.list);


var Animal = function(name, sex) {
  this.name = name;
  this.sex = sex;
  this.toString = function() {
    print(this.name + " " + this.sex);
  };
}
var anim = new Animal("漢字", "あいう");
anim.toString(); // 「トクジロウ オス」


