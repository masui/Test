// http://www.atmarkit.co.jp/fdotnet/ajaxjs/ajaxjs04/ajaxjs04_01.html

var View = function(){
    this.func = function(){
	print("aaaa");
    }
};

View.prototype.kkk = function(){
    print("kkkk");
}

v = new View;
v.kkk();

