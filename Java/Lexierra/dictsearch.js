var candWords = [];      // 候補単語リスト
var candPatterns = [];   // その読み
var ncands;
var dict = [];             // 変換辞書本体
var hashLink = [];         // 先頭文字が一致する辞書エントリのリスト
var connectionLink = [];   // 接続番号が一致する辞書エントリのリスト
var regexp = [];           // パタンの部分文字列にマッチするRegExp
var cslength = [];         // regexp[n]に完全マッチするパタンの長さ
var linkInd;
var exactMode = false;
var wordStack = [];
var patStack = [];

function patind(str){
    if(str.match(/^\[?[aiueoAIUEO]/)) return 0;
    if(str.match(/^\[?[kg]/)) return 1;
    if(str.match(/^\[?[sz]/)) return 2;
    if(str.match(/^\[?[tdT]/)) return 3;
    if(str.match(/^\[?[hbp]/)) return 4;
    if(str.match(/^\[?[n]/)) return 5;
    if(str.match(/^\[?[m]/)) return 6;
    if(str.match(/^\[?[yY]/)) return 8;
    if(str.match(/^\[?[r]/)) return 9;
    return 10;
}

function dictInit(){
    for(var i=0;i<_dict.length;i++){
	var e = {};
	e.pat = _dict[i][0];
	e.word = _dict[i][1];
	e.outConnection = _dict[i][2];
	e.inConnection = _dict[i][3];
	dict.push(e);
    }
    
    // 先頭読みが同じ単語のリスト
    var cur = [];
    for(var i=0;i<dict.length;i++){
	//var ind = dict[i].pat.charCodeAt(0);
        var ind = patind(dict[i].pat);
	if(hashLink[ind] == undefined){
	    cur[ind] = i;
	    hashLink[ind] = i;
	}
	else {
	    dict[cur[ind]].hashLink = i;
	    cur[ind] = i;
	}
    }
    // コネクションつながりのリスト
    cur = [];
    for(var i=0;i<dict.length;i++){
	var ind = dict[i].inConnection;
	if(connectionLink[ind] == undefined){
	    cur[ind] = i;
	    connectionLink[ind] = i;
	}
	else {
	    dict[cur[ind]].connectionLink = i;
	    cur[ind] = i;
	}
    }
}
    
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


function connectionSearch(pat){
    patInit(pat,0);
//    linkInd = pat.charCodeAt(0);
    linkInd = patind(pat);
    candWords = [];
    candPatterns = [];
    ncands = 0;
    
    var maxCands = 20;
    generateCand(maxCands); // 接続辞書を使って20個まで候補を生成
}

function generateCand(maxcands){
    generateCand0(0, 0, "", "", 0, maxcands);
}

// パタンのlen文字目からのマッチを調べる
function generateCand0(connection, len, word, pat, level, maxcands){
    wordStack[level] = word;
    patStack[level] = pat;
    var patlen, matchlen;
    
    if(connection == 0){
	patlen = cslength[0];
	var d = hashLink[linkInd];
	for(;d != undefined && ncands < maxcands;d = dict[d].hashLink){
	    if(dict[d].pat.match(regexp[level])){
		//matchlen = RegExp.lastMatch.length;
		matchlen = RegExp.$1.length;
		if(matchlen == patlen && (!exactMode || exactMode && dict[d].pat.length == matchlen)){ // 最後までマッチ
		    ncands = addCandidate(dict[d].word, dict[d].pat, dict[d].outConnection, ncands, level, matchlen);
		}
		else if(matchlen == dict[d].pat.length && dict[d].outConnection != 0){ // とりあえずその単語まではマッチ
		    generateCand0(dict[d].outConnection, len+matchlen, dict[d].word, dict[d].pat, level+1, maxcands);
		}
	    }
	}
    }
    else {
	patlen = cslength[len];
	var d = connectionLink[connection];
	for(;d != undefined && ncands < maxcands;d = dict[d].connectionLink){
	    if(dict[d].pat.match(regexp[len])){
		//matchlen = RegExp.lastMatch.length;
		matchlen = RegExp.$1.length;
		//if(matchlen == patlen){ // 最後までマッチ
		if(matchlen == patlen && (!exactMode || exactMode && dict[d].pat.length == matchlen)){ // 最後までマッチ
		    ncands = addCandidate(dict[d].word, dict[d].pat, dict[d].outConnection, ncands, level, matchlen);
		}
		else if(matchlen == dict[d].pat.length && dict[d].outConnection != 0){ // とりあえずその単語まではマッチ
		    generateCand0(dict[d].outConnection, len+matchlen, dict[d].word, dict[d].pat, level+1, maxcands);
		}
	    }
	}
    }
}

function addCandidate(word, pat, connection, n, level, matchlen){ // 候補追加
  var i;

  if(word[0] == '*') return n;

  var p = patStack.slice(0,level+1).join('')+pat;
  var w = wordStack.slice(0,level+1).join('')+word;
//  if(w[0] == '*') return n;
  w = w.replace(/\*/g,''); // 全ての'*'を消すのはまずいはず。後で修正必要。
  w = w.replace(/\-/g,'');

  //
  // "ode"入力で「おディズニーランド」が候補にならないように、接続辞書で生成された候補の長さが入力文字列を大幅に上回るものははじくようにする!
  //
  var totalinputlen = patStack.slice(0,level+1).join('').length + matchlen;
  if(level > 0 && totalinputlen <= p.length / 2){
    return n;
  }

  for(i=0;i<candWords.length;i++){
    if(candWords[i] == w) break;
  }
  if(i >= candWords.length){
    candPatterns.push(p);
    candWords.push(w);
    n++;
  }
  return n;
}

function calcNextWords(word){
    candWords = [];
    var registered = [];
    var connectionCalculated = [];
    for(var i=0;i<dict.length;i++){
	if(dict[i].word == word){
	    var outConnection = dict[i].outConnection;
	    if(!connectionCalculated[outConnection]){
		connectionCalculated[outConnection] = true;
		var ind = connectionLink[outConnection];
		while(ind){
		    connectedWord = dict[ind].word;
		    if(!registered[connectedWord]){
			if(connectedWord[0] != '*' && connectedWord[0] != '-'){
			    registered[connectedWord] = true;
			    candWords.push(connectedWord);
			}
		    }
		    ind = dict[ind].connectionLink;
		}
	    }
	}
    }
    if(candWords.length == 0){
	candWords = [
	    "が", "は", "の", "に", "を", "で", "と", " も", "な",
	    "する", "して", "した", "から", "まで"
	];
   }
}

   
dictInit();

//connectionSearch("masu");
//   alert(candWords.length);
