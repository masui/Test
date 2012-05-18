s = "abc [[def]] ghi";
s = "abc [[http://aaaa.com/ abc]] ghi";
s = "abc  [[def]][[ghi]] jkl";


// Gyazzのタグ表現をHTML表現に変換
function tag(s,id,root){
    matched = [];
    while(m = s.match(/^(.*)\[\[\[(([^\]]|\][^\]]|[^\]]\])*)\]\]\](.*)$/)){ // [[[....]]]
	pre =   m[1];
	inner = m[2];
	post =  m[4];
	if(t = inner.match(/^(http[^ ]+) (.*)\.(jpg|jpeg|jpe|png|gif)$/i)){ // [[[http:... ....jpg]]]
	    matched.push('<a href="' + t[1] + '"><img src="' + t[2] + '.' + t[3] + '" border="none" height=80></a>');
	}
	else if(t = inner.match(/^(http.+)\.(jpg|jpeg|jpe|png|gif)$/i)){ // [[[http...jpg]]]
	    matched.push('<a href="' + t[1] + '.' + t[2] + '"><img src="' + t[1] + '.' + t[2] + '" border="none" height=80></a>');
	}
	else { // [[[abc]]]
	    matched.push('<b>' + inner + '</b>');
	}
	s = pre + '<<<' + (matched.length-1) + '>>>' + post;
    }
    while(m = s.match(/^(.*)\[\[(([^\]]|\][^\]]|[^\]]\])*)\]\](.*)$/)){ // [[....]]
	pre =   m[1];
	inner = m[2];
	post =  m[4];
	if(t = inner.match(/^(http[^ ]+) (.*)\.(jpg|jpeg|jpe|png|gif)$/i)){ // [[http://example.com/ http://example.com/abc.jpg]]
	    matched.push('<a href="' + t[1] + '"><img src="' + t[2] + '.' + t[3] + '" border="none"></a>');
	}
	else if(t = inner.match(/^(http.+)\.(jpg|jpeg|jpe|png|gif)$/i)){ // [[http://example.com/abc.jpg]
	    matched.push('<a href="' + t[1] + '.' + t[2] + '"><img src="' + t[1] + '.' + t[2] + '" border="none"></a>');
	}
	else if(t = inner.match(/^(http[^ ]+) (.*)$/)){ // [[http://example.com/ example]]
	    matched.push('<a href="' + t[1] + '">' + t[2] + '</a>');
	}
        else if(t = inner.match(/^(http[s]?:[^: ]+)$/)){ // [[http://example.com/]]
	    matched.push('<a href="' + t[1] + '" class="link">' + t[1] + '</a>');
	}
	else if(t = inner.match(/^@([a-zA-Z0-9_]+)$/)){ // @名前 を twitterへのリンクにする
	    matched.push('<a href="http://twitter.com/' + t[1] + '" class="link">@' + t[1] + '</a>');
	}
	else {
	    matched.push('<a href="' + root + '/' + inner + '">' + inner + '</a>');
	}
	s = pre + '<<<' + (matched.length-1) + '>>>' + post;
    }
    elements = s.split(/ /);
    for(i=0;i<elements.length;i++){
	while(a = elements[i].match(/^(.*)<<<(\d+)>>>(.*)$/)){
	    elements[i] = a[1] + matched[a[2]] + a[3];
	}
    }
    for(i=0;i<elements.length;i++){
	elements[i] = "<span id='"+id+'_'+i+"'>" + elements[i] + "</span>";
    }
    return elements.join(' ');
}

if(typeof notest == "undefined"){
    function assert(exp){
	if(!exp){
	    print("Assert error!");
	}
    }

    // print(tag(s,'id0','http://pitecan.com'));
    s = 'abc [[[http://pitecan.com http://gyazo.com/abc.png]]] def';
    print(tag(s,'id0','http://pitecan.com'));
    s = 'abc [[[http://gyazo.com/abc.png]]] def';
    print(tag(s,'id0','http://pitecan.com'));
    s = 'abc [[[def]]] ghi';
    print(tag(s,'id0','http://pitecan.com'));
    s = 'abc [[http://pitecan.com http://gyazo.com/abc.png]] def';
    print(tag(s,'id0','http://pitecan.com'));
    s = 'abc [[http://gyazo.com/abc.png]] def';
    print(tag(s,'id0','http://pitecan.com'));
    s = 'abc [[http://pitecan.com pitecan]] def';
    print(tag(s,'id0','http://pitecan.com'));
    s = 'abc [[http://pitecan.com]] def';
    print(tag(s,'id0','http://pitecan.com'));
    s = 'abc [[@masui]] def';
    print(tag(s,'id0','http://pitecan.com'));
}
