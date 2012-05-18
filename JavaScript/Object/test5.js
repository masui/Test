var Obj = function(name){
    this.name = name;
    this.val = 100;
};

// http://oranlooney.com/functional-javascript/
function _Clone() { }
function clone(obj) {
    _Clone.prototype = obj;
    return new _Clone();
}

o = new Obj;
print(o.val);

p = clone(o);
print(p.val);

p.val = 200;
print(p.val);
print(o.val);





