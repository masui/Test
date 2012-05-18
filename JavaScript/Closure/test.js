function makefunc(str){
    return function(){
	print(str);
    };
}

func1 = makefunc('abc');

func1();