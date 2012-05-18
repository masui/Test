

function arraycmp(a1,a2){
    if(! a1.length || ! a2.length) return false;
    if(a1.length != a2.length) return false;
    for(var i=0;i<a1.length;i++){
	if(a1[i] != a2[i]) return false;
    }
    return true;
}

print(arraycmp([1,2],[2,3]));
print(arraycmp([1,2],[2,3,4]));
print(arraycmp([2,3,4],[2,3,4]));
print(arraycmp(false,34));
print(arraycmp(kk,34));

