var Obj = function(name){
    this.name = name;
    this.val = 100;
    this.dup = function(){
        o = new Obj;
	o.name = this.name;
	o.val = this.val;
	return o;
    };
};

o = new Obj;
print(o.val);

p = o.dup();
print(p.val);
p.val = 200;
print(p.val);




