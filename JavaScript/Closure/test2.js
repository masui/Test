function countfunc(){
    var count = 0;
    return function inc(){
	return count++;
    }
}

f = countfunc();
print(f());
print(f());
print(f());
