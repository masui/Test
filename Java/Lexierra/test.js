var regexp = [];           // パタンの部分文字列にマッチするRegExp
var cslength = [];         // regexp[n]に完全マッチするパタンの長さ

function patInit(pat,level){
    var len = 0;
    var p = '';
    var top = '';
    var ret;
    cslength[level] = 0;
    if(pat.length > 0){
	if(pat.match(/^(\[[^\]]+\])(.*)$/)){
	    top = RegExp.$1;
	    ret = patInit(RegExp.$2,level+1);
	    len = ret[0];
	    p = ret[1];
	}
	else {
	    pat.match(/^(.)(.*)$/);
	    top = RegExp.$1;
	    ret = patInit(RegExp.$2,level+1);
	    len = ret[0];
	    p = ret[1];
	}
	cslength[level] = len;
    }
    var s = (p.length > 0 ? '('+p+')?' : '');
    regexp[level] = new RegExp('^('+top+s+')');
    return [len+1, top+s];
}

patInit("[ab][cd]e",0);

for(var i=0;i<regexp.length;i++){
    print(regexp[i]);
    print(cslength[i]);
}
