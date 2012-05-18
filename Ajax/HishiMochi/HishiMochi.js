<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>HishiMochi</title>
<style type="text/css">
div.zoomable {
position: absolute;
top: 0px;
left: 0px;
width: 100px;
height: 100px;
overflow: hidden;
background: #eeeeff;
border: solid 1px;
border-top-color: #000000;
border-left-color: #000000;
border-right-color: #000000;
border-bottom-color: #000000;
visibility: visible;
}
img.zoomable {
position: absolute;
top: 0px;
left: 0px;
width: 100px;
height: 100px;
overflow: scroll;
}
</style>
<script type="text/javascript">
<!--
var topObj;
var zoomObjs;
function zoomModel_addChild(child) {
  if (this.zmodels == null) {
    this.zmodels = new Array();
    this.cols = 0;
    this.rows = 0;
    this.elem.style.overflow = "hidden";
  }
  this.zmodels[this.zmodels.length] = child;
  if (this.cols < child.col + 1 ) { this.cols = child.col + 1; }
  if (this.rows < child.row + 1) { this.rows = child.row + 1; }
}
function zoomModel_determineInterimSizes() {
  if (this.zmodels == null) { return; }
  if (this.toparry == null) { this.toparry = new Array(); }
  if (this.leftarry == null) { this.leftarry = new Array(); }
  if (this.widtharry == null) { this.widtharry = new Array(); }
  if (this.heightarry == null) { this.heightarry = new Array(); }
  for (var i = 0; i < this.cols; ++i) { this.widtharry[i] = 50; }
  for (var i = 0; i < this.rows; ++i) { this.heightarry[i] = 50; }
  this.grpFocus = 0;
  for (var i = 0; i < this.zmodels.length; ++i) {
    this.zmodels[i].determineInterimSizes();
    var c = this.zmodels[i].col;
    var r = this.zmodels[i].row;
    if (0 < this.zmodels[i].focus || 0 < this.zmodels[i].grpFocus) {
      this.grpFocus = 1;
      var w = this.zmodels[i].origw;
      if (w < this.zmodels[i].grpwidth) { w = this.zmodels[i].grpwidth; }
      if (this.widtharry[c] < w) {
        this.widtharry[c] = w;
      }
      var h = this.zmodels[i].origh;
      if (h < this.zmodels[i].grpheight) { h = this.zmodels[i].grpheight; }
      if (this.heightarry[r] < h) {
        this.heightarry[r] = h;
      }
    }
  }
  this.grpwidth = 0;
  this.grpheight = 0;
  this.unfcols = 0;
  this.unfrows = 0;
  for (var i = 0; i < this.cols; ++i) {
    if (this.widtharry[i] == 10) { ++this.unfcols; } 
    this.grpwidth += this.widtharry[i];
  }
  for (var i = 0; i < this.rows; ++i) {
    if (this.heightarry[i] == 10) { ++this.unfrows; } 
    this.grpheight += this.heightarry[i];
  }
}
function zoomModel_layout() {
  if (this.zmodels == null) { return; }
  if (this.grpwidth < this.allocw && 0 < this.unfcols) {
    var bonus = (this.allocw - this.grpwidth) / this.unfcols;
    for (var i = 0; i < this.cols; ++i) {
      if (this.widtharry[i] == 10) { this.widtharry[i] += bonus; } 
    }
  } else {
    var scale = this.allocw / this.grpwidth;
    for (var i = 0; i < this.cols; ++i) {
      this.widtharry[i] *= scale; 
    }
  }
  var l = 0;
  for (var i = 0; i < this.cols; ++i) {
    this.leftarry[i] = l;
    l += this.widtharry[i];
  }
  if (this.grpheight < this.alloch && 0 < this.unfrows) {
    var bonus = (this.alloch - this.grpheight) / this.unfrows;
    for (var i = 0; i < this.rows; ++i) {
      if (this.heightarry[i] == 10) { this.heightarry[i] += bonus; }
    }
  } else {
    var scale = this.alloch / this.grpheight;
    for (var i = 0; i < this.rows; ++i) {
      this.heightarry[i] *= scale;
    }
  }
  var t = 0;
  for (var i = 0; i < this.rows; ++i) {
    this.toparry[i] = t;
    t += this.heightarry[i];
  }
  for (var i = 0; i < this.zmodels.length; ++i) {
    var c = this.zmodels[i].col;
    var r = this.zmodels[i].row;
    var x = this.leftarry[c];
    var y = this.toparry[r];
    var w = this.widtharry[c];
    var h = this.heightarry[r];
    var ow = this.zmodels[i].origw;
    if (ow < this.zmodels[i].grpwidth) { ow = this.zmodels[i].grpwidth; }
    var oh = this.zmodels[i].origh;
    if (oh < this.zmodels[i].grpheight) { oh = this.zmodels[i].grpheight; }
    var xscale = w / ow;
    var yscale = h / oh;
    var scale = xscale;
    if (yscale < xscale) {
      scale = yscale;
    }
    if (1 < scale) { scale = 1; }
    if (this.zmodels[i].focus == 0 && this.zmodels[i].grpFocus == 0) {
      this.zmodels[i].tgtw = Math.floor(ow * scale);
      this.zmodels[i].tgth = Math.floor(oh * scale);
    } else {
      this.zmodels[i].tgtw = Math.floor(ow * xscale);
      this.zmodels[i].tgth = Math.floor(oh * yscale);
    }
    this.zmodels[i].tgtx = Math.floor(x + (w - this.zmodels[i].tgtw) / 2);
    this.zmodels[i].tgty = Math.floor(y + (h - this.zmodels[i].tgth) / 2);
    this.zmodels[i].allocw = this.zmodels[i].tgtw;
    this.zmodels[i].alloch = this.zmodels[i].tgth;
    this.zmodels[i].layout();
  }
}
function zoomModel_focus() {
  this.focus = 1;
  this.elem.style.background = "#ffffcc";
}
function zoomModel_defocus() {
  this.focus = 0;
  this.elem.style.background = "#eeeeff";
}
function zoomModel(elem, col, row, origw, origh) {
  this.elem = elem;
  this.col = col;
  this.row = row;
  this.origw = origw;
  this.origh = origh; 
  this.allocw = 0;
  this.alloch = 0;
  this.focus = 0;
  this.x = 0;
  this.y = 0;
  this.w = 0;
  this.h = 0;
  this.tgtx = 0;
  this.tgty = 0;
  this.tgtw = 0;
  this.tgth = 0;
  this.contents = "";

  this.zmodels = null;
  this.cols = 0;
  this.rows = 0;
  this.unfcols = 0;
  this.unfrows = 0;
  this.grpFocus = 0;
  this.grpwidth = 0;
  this.grpheight = 0;
  this.toparry = null;
  this.leftarry = null;
  this.widtharry = null;
  this.heightarry = null;
  this.addChild = zoomModel_addChild;
  this.determineInterimSizes = zoomModel_determineInterimSizes;
  this.layout = zoomModel_layout;
  this.setfocus = zoomModel_focus;
  this.setdefocus = zoomModel_defocus;
}
var animeObj = null;
function anime() {
  this.totalSteps=5;
  this.leftSteps=0;
  this.interval=null;
}
function kickAnime() {
  if (animeObj == null) { animeObj = new anime(); }
  var maxdist = 0;
  for (var i = 0; i < zoomObjs.length; ++i) {
    var model = zoomObjs[i];
    var dx = model.tgtx - model.x;
    if (maxdist < dx) { maxdist = dx; } 
    var dy = model.tgty - model.y;
    if (maxdist < dy) { maxdist = dy; } 
    dx = model.tgtw - model.w;
    if (maxdist < dx) { maxdist = dx; } 
    dy = model.tgth - model.h;
    if (maxdist < dy) { maxdist = dy; }
  } 
  maxdist /= 50; 
  animeObj.totalSteps = Math.floor(maxdist);
  animeObj.leftSteps = animeObj.totalSteps;

  if (2 < animeObj.leftSteps) {
    for (var i = 0; i < zoomObjs.length; ++i) {
      var model = zoomObjs[i];
      if (model.zmodels == null) {
        model.elem.innerHTML = "";
      }
    }   
  }
  if (animeObj.interval == null) {
    animeObj.interval = setInterval("doAnime()", 100);
  }
}
function doAnime() {
  if (animeObj.leftSteps < 0) {
      clearInterval(animeObj.interval);
      animeObj.interval = null;
      for (var i = 0; i < zoomObjs.length; ++i) {
        var model = zoomObjs[i];
	if (model.zmodels == null && model.elem.innerHTML == "") {
	  model.elem.innerHTML = model.contents;
	}
      }   
  }
  for (var i = 0; i < zoomObjs.length; ++i) {
    var model = zoomObjs[i];
    if (0 < animeObj.leftSteps) {
      model.x += Math.floor((model.tgtx - model.x) / animeObj.leftSteps);
      model.y += Math.floor((model.tgty - model.y) / animeObj.leftSteps);
      model.w += Math.floor((model.tgtw - model.w) / animeObj.leftSteps);
      model.h += Math.floor((model.tgth - model.h) / animeObj.leftSteps);
    } else {
      model.x = model.tgtx;
      model.y = model.tgty;
      model.w = model.tgtw;
      model.h = model.tgth;
    }
    var view = model.elem.style;
    view.left = (model.x + 1) + "px";
    view.top = (model.y + 1) + "px";
    view.width = (model.w - 2) + "px";
    view.height = (model.h - 2) + "px";    
  }
  animeObj.leftSteps -= 1;
}
function buildTree(obj, parent) {
  var group = obj.childNodes;
  for (var i = 0; i < group.length; ++i) {
    if (group[i].nodeType == 1) {
      if (group[i].getAttribute("class") == "zoomable") {
        var c = parseInt(group[i].style.left, 10);
        var r = parseInt(group[i].style.top, 10);
        var w = parseInt(group[i].style.width, 10);
        var h = parseInt(group[i].style.height, 10);
        var newmodel = new zoomModel(group[i], c, r, w, h);
	newmodel.contents = group[i].innerHTML; 
        if (parent == null) {
          if (topObj != null) {
	    alert("There exists two or more top zoomable objects!");
	  } else {
	    topObj = newmodel;
	    topObj.allocw = w;
	    topObj.alloch = h;
	  }
        } else {
	  zoomObjs[zoomObjs.length] = newmodel;
          parent.addChild(newmodel);
        }
        buildTree(group[i], newmodel);
      }	
    }
  }
}
function layout(obj) {
  obj.determineInterimSizes();
  obj.layout();
  kickAnime();
} 
function init() {
  zoomObjs = new Array();
  buildTree(document.body, null);    
  topObj.elem.style.width = topObj.allocw + "px";
  topObj.elem.style.height = topObj.alloch + "px";
  layout(topObj);
}
function findModel(obj) {
  for (var i = 0; i < zoomObjs.length; ++i) {
    if (zoomObjs[i].elem == obj) { return zoomObjs[i]; }
  }
  return null;
}
function focus(obj) {
  var model = findModel(obj);
  if (model) {
    model.setfocus();
  }
  layout(topObj);
}
function defocus(obj) {
  var model = findModel(obj);
  if (model) {
    model.setdefocus()
  }
  layout(topObj);
}
function togglefocus(obj) {
  var model = findModel(obj);
  if (model) {
    if (model.focus == 0) { model.setfocus(); } 
    else { model.setdefocus(); }
  }
  layout(topObj);
}
function searchKeywd(keyword) {
  var regex = new RegExp(keyword, "i");
  for (var i = 0; i < zoomObjs.length; ++i) {
    if (zoomObjs[i].zmodels == null) {
      if (zoomObjs[i].contents.match(regex) && keyword != "") {
        zoomObjs[i].setfocus();
      } else {
        zoomObjs[i].setdefocus();
      }
    }      
  }
  layout(topObj);
}
//-->
</script>
</head>
<body onload="init()" style="background-color: rgb(255, 255, 255);">
<form onsubmi="return false;">
検索:
<input type="text" name="keyword" onkeyup="searchKeywd(this.value)" >
</form>

<!--
<div class="zoomable" style="left: 0; top: 50px; width: 800; height: 800; background:#eeeeee">
  <div class="zoomable" style="left: 0; top: 0; width: 600; height: 400; background:#cccccc" onclick="togglefocus(this)">
    <div class="zoomable" style="left: 0; top: 0; width: 500; height: 300" onclick="togglefocus(this)">JavaScript?!</div>
    <div class="zoomable" style="left: 1; top: 0; width: 500; height: 300" onclick="togglefocus(this)">hoge?!</div>
    <div class="zoomable" style="left: 1; top: 1; width: 500; height: 300" onclick="togglefocus(this)">hage?!</div>
  </div>
  <div class="zoomable" style="left: 1; top: 0; width: 500; height: 300" onclick="togglefocus(this)">hihi?!</div>
  <div class="zoomable" style="left: 2; top: 0; width: 500; height: 300" onclick="togglefocus(this)">huhu?!</div>
  <div class="zoomable" style="left: 0; top: 1; width: 500; height: 300" onclick="togglefocus(this)">hehe?!</div>
  <div class="zoomable" style="left: 0; top: 2; width: 500; height: 300" onclick="togglefocus(this)">ほげ</div>
</div>
-->
<div class="zoomable" style="left: 0; top: 50px; width: 900px; height: 700px; background:#eeeeee">

<div class="zoomable" style="left: 2; top: 0; width: 600; height: 600" onclick="togglefocus(this)">
<div class="zoomable" style="left: 0; top: 0; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050201#p01"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=Software">Software</a>] セーブしたらすぐLaTeXなスクリプト</h3><p>普段emacsとxdviの窓を並べてLaTeXで書類を書いているのだが、もう歳なのでlatex-modeで、latex実行コマンドを打つのすら面倒くさくなってきた。もうセーブしたらすぐにlatex実行して、xdviに反映してくれないかなあ。</p>
<p>という訳で、編集しているtexファイルの変更を監視して、変更されたら即latexを実行し、xdviにファイルをリロードするようシグナルを送るというスクリプトをPerlで書いてみたら、50行ぐらいでできた。これでもう、latexやxdviの実行コマンドを憶えておく必要はなくなった。快適、快適。ただ、複数ファイルに分割された文書や、bibtexには対応してないし、latexでエラーが出たときの対処とか全然してないのでもう一工夫必要だなあ。</p>
<p>欲しいという奇特な方はこれ(<a href="http://www.tkl.iis.u-tokyo.ac.jp/~toyoda/tex/xdvi-poll.pl">xdvi-poll.pl</a>)をどうぞ。Debian Linuxでしかテストしてませんのであしからず。しかしこんなのもう誰かやってそうだよなあ。</p>
<p>使い方：</p>
<p>xdvi-poll.pl 編集中のtexファイル</p>
<p>をコマンドラインで実行するだけです。xdviが立ち上がりファイルの監視が始まります。デフォルトではplatexとxdvi-jpを使うことにしてありますが、もし違うコマンドを使いたいときは、</p>
<p>xdvi-poll.pl 編集中のtexファイル latex xdvi</p>
<p>のようにします。ファイルを監視してるだけなのでエディタを選ばないのもミソですね。</p></div>
</div>
	
<div class="zoomable" style="left: 3; top: 0; width: 600; height: 600" onclick="togglefocus(this)">
<div class="zoomable" style="left: 0; top: 0; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050202#p01"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=SL">SL</a>] おろしや国からも</h3><p>ロシアからのリンクはこの<a href="http://linuxshop.ru/forum/viewtopic.php?t=8459">Linuxフォーラムぽいところ</a>でした。読めないですけど。</p>
<p>あとLinuxQuestions.orgとかいうところでは<a href="http://wiki.linuxquestions.org/wiki/Silly_applications">Silly applications</a>として紹介されてます。正しい。</p></div>
</div>

<div class="zoomable" style="left: 4; top: 0; width: 600; height: 600" onclick="togglefocus(this)">
<div class="zoomable" style="left: 0; top: 0; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050203#p01"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B2%D6%CA%B4%BE%C9">花粉症</a>] 目が痒くなってきた</h3><p>起きたら妙に目が痒かった。そろそろかな、というわけでマスク始めました。ユニ・チャームの超立体マスクというのを使ってますが、これをつけた自分はどう見ても変なおじさんだ。しかし背に腹は変えられぬしなあ。</p></div>
<div class="zoomable" style="left: 0; top: 1; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050203#p02"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=Software">Software</a>] ウィルスバスターに感染？</h3><p>トレンドマイクロのウィルスバスター2004の警告ポップアップが文字化けするようになりました。何を警告されてるんだかさっぱり分からんのですが、なんか感染しましたか？でも良く見ると「サ・ケルタフキッスコー」とか「セ・・タフニョ」とかなかなかいい響きだ。<img class="photo" src="http://www.tkl.iis.u-tokyo.ac.jp/~toyoda/.cgi-bin/diary/images/20050203_0.png" alt="文字化けアラート" title="文字化けアラート" width="261" height="275"></p></div>
</div>

<div class="zoomable" style="left: 5; top: 0; width: 600; height: 600 " onclick="togglefocus(this)">
<div class="zoomable" style="left: 0; top: 0; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050204#p01"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%D2%EC%A4%AD">呟き</a>] ぼくは誰？</h3><p>写真はとある電柱の貼り紙である。</p>
<p>「ぼくの足元におしっこをかけないで下さい」</p>
<p>まではよくある擬人法だが、次の一言で一気に謎の世界へ突入。</p>
<p>「電柱さんがかわいそうです」</p>
<p>え？それを言うキミは誰？「ぼく」は電柱さんではなかったのか？いったい真相はどこに？</p>
<p>謎が謎を呼んでも別に続きはしないのだが。</p>
<p><img class="photo" src="http://www.tkl.iis.u-tokyo.ac.jp/~toyoda/.cgi-bin/diary/images/20050204_0.jpg" alt=""></p></div>
<div class="zoomable" style="left: 0; top: 1; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050204#p02"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B2%D6%CA%B4%BE%C9">花粉症</a>] マスク2日目</h3><p>風邪の後遺症で鼻水がちょろちょろ出ているものの、鼻の奥が腫れた感じはないのでまだ症状は出ていないようだ。</p></div>
<div class="zoomable" style="left: 0; top: 2; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050204#p03"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%CC%A1%B2%E8">漫画</a>] デスノート5</h3><p>まつだくんの日記のおかげで帰り際に買えました。電車で読了。</p>
<p>あれ？へえ、ふーん。そうなりましたか。まあいいけどね、面白いから。でも緊張感はなくなっちゃったなあ。これが効果的な転となって驚愕のエンディングに結びつくのか、それともこのままずぶずぶいっちゃうのか、別な意味で目が離せなくなってきた。</p></div>
</div>
	
<div class="zoomable" style="left: 6; top: 0; width: 600; height: 600 " onclick="togglefocus(this)">

<div class="zoomable" style="left: 0; top: 0; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050205#p01"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%A5%C6%A5%EC%A5%D3">テレビ</a>] 虎の門のアシスタントが…</h3><p>久しぶりに見たらいつの間にかMEGUMIに代わってた。しかしなんだか投げやりな感じ。坂下チリコもちょっとアレだったけど、まだあっちのほうが一生懸命なぶんマシだったかなあ。ダブルブッキングのNHK教育紹介は相変わらず面白い。バカリズムもこなれてきたなあ。</p></div>
<div class="zoomable" style="left: 0; top: 1; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050205#p02"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B2%D6%CA%B4%BE%C9">花粉症</a>] 嵐の前の静けさか</h3><p>夜にちょっと目が痒くなった以外は問題なし。しかしいつ花粉の嵐が始まるのか戦々恐々とする毎日である。</p></div>
</div>
	
<div class="zoomable" style="left: 0; top: 1; width: 600; height: 600 " onclick="togglefocus(this)">
<div class="zoomable" style="left: 0; top: 0; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050206#p01"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B2%D6%CA%B4%BE%C9">花粉症</a>] 目一時痒ク鼻異常ナシ</h3><p>自宅近くの林が杉と、今頃気付く間抜けさは、めでたくもありめでたくもなし。</p>
<p>というわけで、今日も起きたときに目が痒かった以外は順調。死刑執行を待つ囚人のような気持ちになる。</p></div>
<div class="zoomable" style="left: 0; top: 1; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050206#p02"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%A5%C6%A5%EC%A5%D3">テレビ</a>] NHKスペシャル「巨大マネーが東京をねらう」</h3><p>米不動産投資会社セキュアード・キャピタルの活動をメインにREITの現状を紹介。不良債権となった格安不動産を買い、リフォームして優良テナントをいれ価値を上げたところで転売して利益を得るのが基本。証券化して投資家からの投資を呼び、銀行からの借り入れも組み込んでリターンを増やす。4〜5％の利回りがでるが銀行の貸出金利変動などのリスクもある。紹介されていた会社の金主は、カリフォルニア州公務員退職年金基金のカルパースで、ここから20％(!)の利回りを要求されている。最近は、JREITも立ち上がり不動産価格が高騰。以前より旨みはなくなってきている。今後は地方の不動産も視野に入れるらしい。カルパースは日本で期待している利回りが出なくなればすぐ引き上げると言っている。日本を撤退した後は中国か。</p>
<p>日本の不良債権を回して稼いだお金が回りまわってアメリカの公務員の退職年金になるというのがなんともはや。世界中から儲け話を嗅ぎつけて動いているわけで、アメリカの公務員にとっては頼りになる(?)話だよなあ。日本の年金基金も見習って欲しいもんです。いや見習わなくていいから、せめて無駄遣いは止めてくれないかなあ。JREITも個人投資家にまで利益が回るのかねえ？</p></div>
</div>

<div class="zoomable" style="left: 1; top: 1; width: 600; height: 600 " onclick="togglefocus(this)">
<div class="zoomable" style="left: 0; top: 0; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050207#p01"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B2%D6%CA%B4%BE%C9">花粉症</a>] マスクなしでもまだ大丈夫</h3><p>今日は花粉がほとんど飛んでいないとの情報を「<a href="http://kafun.nies.go.jp/">はなこさん</a>」から得てノーマスクで通勤。無事でした。</p></div>
<div class="zoomable" style="left: 0; top: 1; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050207#p02"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%CF%C0%CA%B8">論文</a>] Zoltan Gyongyi, Hector Garcia-Molina, Jan Pedersen. Combating Web Spam with TrustRank. VLDB 2004</h3><p>リンクスパムという手法でGoogleを騙しページランクを上げようとするサイトが多い。手法としては以下のようなものがある。</p>
<p>・密に相互リンクを張りまくる。</p>
<p>・1つのIPアドレスのホストへエイリアスをいくつも作り製品名などをエイリアス名に埋め込む(URL内の文字列にスコアを与える検索エンジンもある)。でそのURLを指すページを山ほど作る。</p>
<p>・掲示板やblogのコメントに、ランクを上げたいサイトへのリンクを張りまくる。</p>
<p>・一見有用なコンテンツを持つページをつくり(UNIXドキュメントのコピーなど)、そこから隠しリンクを対象サイトに張りまくる。それを見て誰かがリンクを張ってくれればランクが上がる(ハニーポットと言うんだそうだ)</p>
<p>この論文では、スパム対策のプロが見て、問題ないと判定されたサイトからスコアを伝播することで、スパマーのサイトへ高いスコアが行かないように工夫したランキング手法を提案している。ページランクの改良版のような趣。ポイントは人間が見ないといけないサイト数をいかに減らすか。スコアを伝播する際にカバーする範囲をできるだけ多くするため、アウトリンク数の多いページを重点的に見ることにしている。そういうページを抽出するために、リンクの向きを逆にしたPageRankを使う。</p>
<p>良いサイトからスパマーサイトへのリンクがあると、スパマーサイトが高いスコアを持ってしまうのが問題だと前半で述べているが、実験した範囲では上位にスパマーサイトはあまり来てないからまあよいんじゃないかと言っている。本当かなあ？</p></div>

</div>
	
<div class="zoomable" style="left: 2; top: 1; width: 600; height: 600 " onclick="togglefocus(this)">
<div class="zoomable" style="left: 0; top: 0; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050208#p01"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B2%D6%CA%B4%BE%C9">花粉症</a>] 凶兆の雨</h3><p>今日は雨なのでまだ発症はしていない。花粉症者にとって花粉を地面に叩き付けてくれる雨はまさに天の恵であるのだが、次に晴れたとき花粉が一斉に噴出する条件を整える地獄の使いでもある。明日、明後日がXデーであろう。</p></div>
</div>
	
<div class="zoomable" style="left: 3; top: 1; width: 600; height: 600 " onclick="togglefocus(this)">
<div class="zoomable" style="left: 0; top: 0; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050209#p01"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B2%D6%CA%B4%BE%C9">花粉症</a>] 執行猶予</h3><p>気温が上がらなかったため花粉は舞わなかったようだ。慈恵大情報によるとあと1週間ほど東京の気温は上がらないのでその後ではないかとのこと。ありがたい。</p></div>
<div class="zoomable" style="left: 0; top: 1; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050209#p02"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%D2%EC%A4%AD">呟き</a>] ゼミで言われたことをそのままやってはいけません</h3><p>先生や助手の人は、色々な人の面倒を見ているからあなたのやってることを必ずしも深く理解しているとは限らない。したがってゼミではその場の思いつきでコメントをしがち。でも、先生は長年の経験から培われた反射神経でそれらしく聞こえることを言うから要注意。だからゼミで言われたことより正しく面白いことをやって逆に先生を驚かすくらいの心がけで次に挑もう。先生は学生に驚かされることを望んでいる。でも、トンデモになりそうなあなたの研究を軌道修正しようとしてくれているのかもしれないので、よく考え聞き入れるべきは聞き入れること。</p>
<p>追記１：先生や学生として特定の人物を想定している訳ではなく、本当に呟きですのであしからず。</p>
<p>追記２：きっと会社では成り立たない話なのだろうなあ。</p>
<p>追記３：先生が学生のやることをがっちり決めているようなケースでも成り立たないですね。</p></div>
</div>

<div class="zoomable" style="left: 4; top: 1; width: 600; height: 600 " onclick="togglefocus(this)">
<div class="zoomable" style="left: 0; top: 0; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050210#p01"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B2%D6%CA%B4%BE%C9">花粉症</a>] 千葉南部が…</h3><p>話が違う。なんか今日はポカポカしているではないか。<a href="http://www.kafun-info.jp/">ヘップチンの花粉情報</a>を見たら、千葉南部がすごいことになっている。ああ、とうとう始まってしまったか。東京まで来るのも時間の問題だな。今日はノーマスクで平気だったけど明日からは駄目かもしれん。<img class="photo" src="http://www.tkl.iis.u-tokyo.ac.jp/~toyoda/.cgi-bin/diary/images/20050210_1.gif" alt="画像の説明" title="画像の説明" width="300" height="300"></p>
<p>そういえば、ヘップチンは今年はimode版をやらないのかな。AIR-EDGE PHONEならOperaでそのまま見えるから問題はないのだが。</p></div>
</div>
	
<div class="zoomable" style="left: 5; top: 1; width: 600; height: 600 " onclick="togglefocus(this)">
<div class="zoomable" style="left: 0; top: 0; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050211#p01"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%D2%EC%A4%AD">呟き</a>] フーゴ・ハルの絵を実体化したような…</h3><p>昇降機広間に忽然と現れた異形のオブジェ。<a href="http://blog.goo.ne.jp/sane3/e/bbadd025874b7aa36efbcd7f652f6e72">同僚のＹ口君の日記</a>には別方向から撮ったより鮮明な画像がある。作品名も作家名もなく謎は深まるばかり。フーゴ・ハルの絵を髣髴とさせる。うかつに触ると14へ逝かされそうだ。<img class="photo" src="http://www.tkl.iis.u-tokyo.ac.jp/~toyoda/.cgi-bin/diary/images/20050211_0.jpg" alt=""></p></div>
<div class="zoomable" style="left: 0; top: 1; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050211#p02"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%D2%EC%A4%AD">呟き</a>] YnoY</h3><p>もう何年も食べに行ってないなあ。でも、なんで一企業のキャンペーンをNHKまで一緒になって宣伝してあげているのでしょう。併せてゼーリックのコメントまで流れてますよ。露骨。</p></div>
<div class="zoomable" style="left: 0; top: 2; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050211#p03"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B2%D6%CA%B4%BE%C9">花粉症</a>] 花粉前線北上せず</h3><p>房総で猛威を振るっている花粉は、いまだ北上するに到らず。</p></div>
</div>
	
<div class="zoomable" style="left: 6; top: 1; width: 600; height: 600 " onclick="togglefocus(this)">

<div class="zoomable" style="left: 0; top: 0; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050212#p01"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%D2%EC%A4%AD">呟き</a>] 昨日のアレはアスキーアートだったのだけど…</h3><p>昨日の「YnoY」というエントリは、某店のイニシャルの変形抜き出しであると同時に、ウインクしている牛の顔上半分をアスキーアートにしたものでもあったのだが、気付いた人はいるだろうか？自分ではウマイと思っていたのだけど、ふつー気が付かないよね。でもじっと見てるとだんだんそう見えてきますから。ほら両端のYが角に見えてきませんか？見えてこないですか。そうですか。すみません。</p></div>
<div class="zoomable" style="left: 0; top: 1; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050212#p02"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B6%C8%B3%A6">業界</a>] Ask JeevesがBloglinesを買収</h3><p>登録しただけでほとんど使ってなかったのだが、いつの間にかAsk Jeevesに買収されていたらしい。<a href="http://www.bloglines.com/about/pr_02082005">Ask Jeeves Acquires Bloglines</a>。</p>
<p>で、つらつらと、Bloglines関係情報を眺めていると、なんとモバイル版があって京セラAIR-EDGE PHONEで読むと良いらしい。なんで今まで気が付かなかったのだ。これすごい便利じゃないですか。</p></div>
</div>
	
<div class="zoomable" style="left: 0; top: 2; width: 600; height: 600 " onclick="togglefocus(this)">

<div class="zoomable" style="left: 0; top: 0; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050213#p01"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B2%D6%CA%B4%BE%C9">花粉症</a>] 寒さがありがたい</h3><p>寒かったのでまだ花粉なしの生活ができている。おかげで窓全開にして掃除ができた。</p></div>
<div class="zoomable" style="left: 0; top: 1; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050213#p02"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B3%AB%C8%AF">開発</a>] <a href="http://www.tkl.iis.u-tokyo.ac.jp/~toyoda/.cgi-bin/hiki/Graphviz/">Graphviz Hiki</a> プラグインその後</h3><p>以前、Graphvizをプラグインで組み込んだ<a href="http://www.tkl.iis.u-tokyo.ac.jp/~toyoda/.cgi-bin/hiki/Graphviz/">Graphviz Hiki</a>というのを作った。何人かお客さんが来ているようで、テストページが微妙に編集されていた。需要があるならソースを公開したいところだが、あまりにも実装がアドホックで汚く、環境依存でもあるのがイタイところだ。1ページにいくつもグラフを描けるようにするなど、拡張したいところもまだあるのだが、どうしたものかなあ。</p></div>
<div class="zoomable" style="left: 0; top: 2; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050213#p03"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B3%AB%C8%AF">開発</a>] <a href="http://www.tkl.iis.u-tokyo.ac.jp/~toyoda/.cgi-bin/hiki/Graphviz/">Graphviz Hiki</a> プラグイン公開</h3><p>と思っていましたが、しばらく遊んでいる暇もないので、ソースを公開することにしました。上記Hikiにダウンロードページを作ってあります。よろしかったらお使い下さい。環境に合わせて書き換えないといけないところがあるのでちょいとややこしいですが。</p></div>
<div class="zoomable" style="left: 0; top: 3; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050213#p04"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B3%AB%C8%AF">開発</a>] Graphviz Hiki スクリーンショット</h3><p>masuiさんのご要望にお答えして。</p>
<p>・<a href="./images/20050213_0.png">Graphvizスクリーンショット「WISSセッションの変遷」</a></p>
<p>敷居…高いですね。その上何段もありますし。こちらの用意したのを使う場合には、IEにAdobeのSVGビューアをインストールする必要があり、DOTの文法も知らないといけません。自分で運用する場合には、Graphvizのインストールも必要になってきますのでなおさらですね。こっちがGraphvizサーバみたいになればもうちょっと楽になるかもしれませんが。</p></div>
</div>

<div class="zoomable" style="left: 1; top: 2; width: 600; height: 600 " onclick="togglefocus(this)">
<div class="zoomable" style="left: 0; top: 0; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050214#p01"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%BE%AE%CA%AA">小物</a>] <a href="http://pcweb.mycom.co.jp/news/2005/02/14/006.html">バッファロー、NASとキャプチャBOXでPCレスTV予約録画「Link de 録!」</a></h3><p>おっ、これはPSP用の番組録画にちょうど良いかな。NASとこういうproducer的機能を持った箱の組み合わせってのは他にも色々可能性がありそう。</p></div>
<div class="zoomable" style="left: 0; top: 1; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050214#p02"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B3%AB%C8%AF">開発</a>] WYSIWYGでグラフ描きたいですか？</h3><p>Graphviz Hikiですが、こんなにやる気のないソフトウェアにとみざわさんetoさんから貴重なコメントを頂いてしまいました。ありがとうございます。あれは、当面必要なものを最短手順で実装したらああなったという代物で、時代に逆行しているのは重々承知しております。</p>
<p>さてそこで本題。別に開き直るわけではないのですが、WYSIWYG的エディタでグラフを描くのが人間にとって優しいというのは本当に正しいのでしょうか？私の経験で言いますと、今のところ、十数ノード程度の論文にのっけるようなグラフなら真、数十数百ノードのグラフでは偽です。先だって、300ノード程度のグラフを本からの引き写しで手作りする必要に迫られた私は、色々と手段を模索した結果、GraphvizのDOT形式直書きを選択しました。DOTに慣れるのに少し手間取りましたが、慣れてしまえば後はスイスイ。ノードのつながりだけ書いてコンパイルすればよいだけなので、あんがいあっさり目的を達成することができました。ちょっと我慢して修行すれば素晴らしい効率を達成できるツールの典型といって良いでしょう。萩谷先生言うところの「我慢ユーザインタフェース(GUI)」という奴です。そのへんのお絵かきソフトでは、まずやる気が起きません。やったとしても、死ぬほどの手間と時間がかかったことでしょう。</p>
<p>という訳で私が欲しいのは、ノードの結合情報はテキストでどんどん入力できて、自動でレイアウトをしてくれて、最後にGUIでレイアウトを微調整できるようなグラフエディタです。以前UISTでそれに近いエディタを見たのですが結局公開はされなかった模様です。その後も、理想のエディタは見つけられていません。</p>
<p>数十以上のノードからなるグラフを描く機会など普通ないではないか、との反論もあるでしょうが、大規模なソフトウェア設計図、小説や漫画の登場人物相関図、神話における家系図、ゲームブックのパラグラフ分岐図、「ドラゴン桜」に登場したメモリツリーなどなど、既存のツールでは描きにくい図はたくさんあります。こういった図をサクサク描けるようになって初めてコンピューターは人間の思考をサポートする機械となれるのではないでしょうか。現状ははっきり言ってまだまだですね。</p></div>
<div class="zoomable" style="left: 0; top: 2; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050214#p03"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B2%D6%CA%B4%BE%C9">花粉症</a>] このまま寒さが続いてくれればよいのに</h3><p>今日も花粉は飛んでおらず快適な1日。寒いのがこんなに嬉しいなんて。</p></div>
</div>

<div class="zoomable" style="left: 2; top: 2; width: 600; height: 600 " onclick="togglefocus(this)">
<div class="zoomable" style="left: 0; top: 0; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050215#p01"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B2%D6%CA%B4%BE%C9">花粉症</a>] 忌まわしい粉末がとうとう</h3><p>目に見えず触れられず匂いもしない、しかし鼻腔や喉や脳に甚大な損害を与えるあの忌まわしい粉末が微量ながら漂い始めたようだ。鼻水は出てこないが微妙な違和感を感じる。ついに来たか。</p></div>
</div>

<div class="zoomable" style="left: 3; top: 2; width: 600; height: 600 " onclick="togglefocus(this)">
<div class="zoomable" style="left: 0; top: 0; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050216#p01"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B6%C8%B3%A6">業界</a>] K君</h3><p>そうかーK君もG型トラクター会社の人になるのか。ちょっとびっくり。</p></div>
<div class="zoomable" style="left: 0; top: 1; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050216#p02"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%BE%AE%CA%AA">小物</a>] <a href="http://bb.watch.impress.co.jp/cda/news/8518.html">東芝、ネットワーク連動機能の充実を図ったHDD単体レコーダ「RD-H1」</a></h3><p>こ、これは。ミニマルで安くていいかも。</p></div>
<div class="zoomable" style="left: 0; top: 2; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050216#p03"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B2%D6%CA%B4%BE%C9">花粉症</a>] と思ったら</h3><p>雨である。弄ばれている。</p></div>
</div>

<div class="zoomable" style="left: 4; top: 2; width: 600; height: 600 " onclick="togglefocus(this)">
<div class="zoomable" style="left: 0; top: 0; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050217#p01"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=Software">Software</a>] Adobe SVG ViewerのMozilla用プラグイン</h3><p>知らなかった。迂闊過ぎ。SVG ViewerってMozilla用のプラグインも含まれていたのですね。C:\Program Files\Common Files\Adobe\SVG Viewer 3.0\Plugins\NPSVG3.dllをプラグインディレクトリにコピーしたら動きました。これでMozillaでもGraphviz Hikiを使えるようになりました。</p></div>
<div class="zoomable" style="left: 0; top: 1; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050217#p02"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B3%AB%C8%AF">開発</a>] tDiary用Graphvizプラグイン</h3><p>あ、できちゃった。たったの13行。これで日記にもグラフが描ける。本文中に以下のように書けばその場所にグラフが埋め込まれます。</p>
<p>＜%=gv('digraph hoge {a->b}', 200,150)%></p>
<p>下に埋め込んでありますが見るにはAdobeのSVG Viewerが必要です。でもこれ、SVGファイルの保存先とかをちゃんとしないと公開はできないなあ。</p>
<p>Hikiと違って複数行にまたがるプラグイン呼び出しができるので、Dotも見やすく書こうと思えば書けます。でも敷居高過ぎには変わりなし。</p></div>
<div class="zoomable" style="left: 0; top: 2; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050217#p04"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B2%D6%CA%B4%BE%C9">花粉症</a>] 暖かかったが</h3><p>それほど花粉は散らなかった模様。でも微妙に鼻がムズムズ。</p></div>
</div>

<div class="zoomable" style="left: 5; top: 2; width: 600; height: 600 " onclick="togglefocus(this)">
<div class="zoomable" style="left: 0; top: 0; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050218#p01"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B6%C8%B3%A6">業界</a>] 例えばライブドアのニュースネタをグラフにしてみる</h3><p>ライブドア、リーマン・ブラザーズ、ニッポン放送、フジテレビあたりの相関図を描くとこんな感じ。(要Adobe SVG Viewer)</p></div>
</div>

<div class="zoomable" style="left: 6; top: 2; width: 600; height: 600 " onclick="togglefocus(this)">
<div class="zoomable" style="left: 0; top: 0; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050219#p01"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B2%D6%CA%B4%BE%C9">花粉症</a>] 全国的に雨で花粉レス</h3><p>おかげで快適。でも次の晴れが怖い。って前も書いたなあ。じわじわと引き伸ばされているのが精神的に良くないと思う。</p></div>
</div>	

<div class="zoomable" style="left: 0; top: 3; width: 600; height: 600 " onclick="togglefocus(this)">
<div class="zoomable" style="left: 0; top: 0; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050220#p01"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%BE%AE%CA%AA">小物</a>] ハンドシュレッダー</h3><p>ヨドバシでたまたま見つけて購入。アスカという会社のクロスカットハンドシュレッダーCHS193というモノです。恥ずかしながら今日までハンドシュレッダーの存在すら知りませんでした。はがき大の紙をちゃんと縦横にカットしてくれてたったの千円。手回しも味があって、なんでもシュレッドしたくなります。今までATMの明細などは手でちぎって捨ててましたが、これでだいぶん楽になりますな。 <img class="photo" src="http://www.tkl.iis.u-tokyo.ac.jp/~toyoda/.cgi-bin/diary/images/20050220_0.jpg" alt=""></p></div>
<div class="zoomable" style="left: 0; top: 1; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050220#p02"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B2%D6%CA%B4%BE%C9">花粉症</a>] 雨続きの幸せな日々</h3><p>快適快適。</p></div>
</div>
	
<div class="zoomable" style="left: 1; top: 3; width: 600; height: 600 " onclick="togglefocus(this)">

<div class="zoomable" style="left: 0; top: 0; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050221#p01"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B7%C8%C2%D3">携帯</a>] ポケット路線図 for 京ぽん</h3><p><a href="http://www.memn0ck.com/log.cgi?050221">memn0ck</a>さんのとこで知った、ぷらっと新宿さんの<a href="http://vagabond.air-nifty.com/plat/2005/02/_for_.html">『ポケット路線図 for 京ぽん』をテスト中</a>。すごく細かいのにきっちり読めてすんばらしい。こういうのずっと欲しかったんですよ。見てるだけで楽しくなります。東京地下鉄も見えるようになったらすごく便利そう。</p></div>
<div class="zoomable" style="left: 0; top: 1; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050221#p02"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B2%D6%CA%B4%BE%C9">花粉症</a>] まだ寒いなあ</h3><p>おかげで快適だけど。</p></div>
<div class="zoomable" style="left: 0; top: 2; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050221#p03"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B3%AB%C8%AF">開発</a>] MeCabのPerlバインディング</h3><p>JumanやChaSenより速いらしいので、形態素解析をMeCabに切り替えることにした。とりあえず、Perlバインディングを使ってみたのだが、parseToNode()よりparseToString()のほうが大分速いようだ。Nodeの生成と破壊がオーバヘッドになってるのかな。parseToString()はコマンドラインのmecabより速かったりもする。ちょっと不思議な感じ。</p></div>
</div>

<div class="zoomable" style="left: 2; top: 3; width: 600; height: 600 " onclick="togglefocus(this)">

<div class="zoomable" style="left: 0; top: 0; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050222#p01"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B3%AB%C8%AF">開発</a>] MeCabの挙動</h3><p>未知語関係の挙動がjumanと異なっている。うーむ。</p>
<p>(1)Let'sは、「Let」,「'」,「s」と3つの未知語に分けられる。カンマ分けの数字(100,000など)も同じ。Jumanは「Let'ｓ」で一つの未知語にしてくれていた。これはJumanの方が良かったなあ。</p>
<p>(2)「、」は単独だと「名詞,数」だが、前後があるときにはそれが数字だろうがなんだろうが「記号,句点」になる。うーむ。</p>
<p>しかし細かいことを考え出すときりがないので、適当なところであきらめることにする。(1)はしようがないのであきらめ。(2)については、事前に全角のアルファベット、数字、記号をASCIIに変換しているので、ついでに「、」や「。」を「,」「.」に変換することにした。</p></div>
<div class="zoomable" style="left: 0; top: 1; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050222#p02"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=Software">Software</a>] Mixiの外部日記仕様変更</h3><p>なんかここ数日mixiから来る人が減ったなあと思っていたら、<a href="http://db-www.naist.jp/~amagasa/d/2005-02-21.html#2005-02-21-3">こういうこと(あまがささん日記)</a>だったのか。しかも直接外部の日記に飛ばないようにもなったんですな。最近、いかがわしいblogに誘導するようなユーザが出るようになったからその対策なんでしょうなあ。うーん。</p></div>
<div class="zoomable" style="left: 0; top: 2; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050222#p03"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B2%D6%CA%B4%BE%C9">花粉症</a>] 明日から…</h3><p>ヘップチンによると、どうやら明日あたり西東京と房総の方から挟み撃ちの形で地獄が始まるらしい。もはやここまでか。</p></div>
<div class="zoomable" style="left: 0; top: 3; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050222#p04"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%D2%EC%A4%AD">呟き</a>] <a href="http://www.asahi.com/international/update/0222/005.html">イランで地震、Ｍ６．４　２８０人死亡、被害拡大か - asahi.com : 国際</a></h3><p>結構大きかったらしい。早速イギリスが支援を申し出ている。<a href="http://news.scotsman.com/latest.cfm?id=4165341">Scotsman.com News - Latest News - Britain Offers Quake Aid</a></p>
<p>やはり被害は拡大しているらしく見る見るうちに死者の数が増えていく。最新のニュースでは少なくとも420人になっている。<a href="http://today.reuters.co.uk/news/newsArticle.aspx?type=topNews&storyID=2005-02-22T194701Z_01_HOL214739_RTRUKOC_0_QUAKE-IRAN.xml">Top News Article | Reuters.co.uk</a></p>
<p>イラン政府は国際救助の必要はないといっているらしい。さてさて。</p></div>
</div>
	
<div class="zoomable" style="left: 3; top: 3; width: 600; height: 600 " onclick="togglefocus(this)">
<div class="zoomable" style="left: 0; top: 0; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050223#p01"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B2%D6%CA%B4%BE%C9">花粉症</a>] 往路は無事</h3><p>マスク着用で往路は無事。</p></div>
<div class="zoomable" style="left: 0; top: 1; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050223#p02"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%A5%B2%A1%BC%A5%E0">ゲーム</a>] 5ｘ5の囲碁では白は地を作れない</h3><p>スラッシュドット ジャパンに、<a href="http://slashdot.jp/articles/05/02/23/1114203.shtml?topic=31">5x5の碁、解かれる</a>なんていう記事が出てました。黒が初手を天元に打てば、白は地を作れないということをコンピュータを使って証明したようです。こんなのとっくに証明されているものと思ってました。</p>
<p>ちなみに1x1はどちらも打てず引き分け、2x2はいろいろあって引き分け、3x3は黒が天元に打って勝ちですが、4x4はどうなってるんだろう？</p></div>
<div class="zoomable" style="left: 0; top: 2; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050223#p03"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B2%D6%CA%B4%BE%C9">花粉症</a>] 復路も無事</h3><p>ヘップチンによるとうっすらと花粉が関東を覆っているようなので、復路もマスク着用。無事でした。明日はまた一転寒くなり花粉も散らないようです。ジャブはかわしたという感じ。</p></div>
</div>
	
<div class="zoomable" style="left: 4; top: 3; width: 600; height: 600 " onclick="togglefocus(this)">
<div class="zoomable" style="left: 0; top: 0; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050224#p01"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B2%D6%CA%B4%BE%C9">花粉症</a>] 黄色信号一歩手前</h3><p>起き抜けに少量の鼻水。昨日ちょっと吸っちゃったかなあ。</p></div>
<div class="zoomable" style="left: 0; top: 1; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050224#p02"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%A5%B2%A1%BC%A5%E0">ゲーム</a>] そういえばあのゲームに似てるなあ</h3><p>ライブドアとニッポン放送関係のニュースを見ているとアクワイアを思い出す。筆頭株主を目指してのキリキリした株式取得合戦の感じがよく出ているゲームだったなあ。</p></div>
</div>

<div class="zoomable" style="left: 5; top: 3; width: 600; height: 600 " onclick="togglefocus(this)">
<div class="zoomable" style="left: 0; top: 0; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050225#p01"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B0%FB%A4%DF">飲み</a>] くめさん来所</h3><p>ソフトウェア工学の話とか。久しぶりに聞いたなあ。その後最近できて気になっていた近所の沖縄料理店で泡盛古酒を飲みつつ、色々つまむ。なかなか。夜遅くまでやってるので晩飯に良いかも。</p></div>
<div class="zoomable" style="left: 0; top: 1; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050225#p02"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B2%D6%CA%B4%BE%C9">花粉症</a>] 予報どおり</h3><p>寒くて花粉はそれほど散らなかった模様。快適。</p></div>
<div class="zoomable" style="left: 0; top: 2; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050225#p03"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%D2%EC%A4%AD">呟き</a>] 道の真ん中に</h3><p>駅から歩いて帰る途中、道をふさぐようにしてソファーが倒して置かれていた。まあ車はとおらない道なので危険ではないのだが、こういうのどう始末するんだろう。写真を撮りたかったが暗くてPHSのカメラは役に立たず。なかなかシュールな光景だったんだがなあ。</p></div>
</div>
	
<div class="zoomable" style="left: 6; top: 3; width: 600; height: 600 " onclick="togglefocus(this)">
<div class="zoomable" style="left: 0; top: 0; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050226#p01"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B2%D6%CA%B4%BE%C9">花粉症</a>] 軽〜くきたかな？</h3><p>起きた時に目が痒く鼻腔が乾燥した感じ。その後鼻水も少々。それ以降は問題なし。まだかなり軽いけど症状出てきたかな。</p></div>
<div class="zoomable" style="left: 0; top: 1; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050226#p02"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%D2%EC%A4%AD">呟き</a>] めでたい</h3><p>某君からめでたいお知らせ。メールで返事をせずにここに書くのもなんなのですが、おめでとうございます。</p></div>
</div>
	
<div class="zoomable" style="left: 0; top: 4; width: 600; height: 600 " onclick="togglefocus(this)">
<div class="zoomable" style="left: 0; top: 0; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050227#p01"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B2%D6%CA%B4%BE%C9">花粉症</a>] 平穏</h3><p>静岡や房総ではがんがん飛びまくっているようだが、東京近辺はそれほどでもなく平穏である。特に症状らしきものは感じられず。しかし天気予報で、寒さで飛ばなかった花粉が貯まり、温かくなると一気に飛び出すなどと言っており、暗い気持ちになる。</p></div>
</div>
	
<div class="zoomable" style="left: 1; top: 4; width: 600; height: 600 " onclick="togglefocus(this)">
<div class="zoomable" style="left: 0; top: 0; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050228#p01"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B2%D6%CA%B4%BE%C9">花粉症</a>] 本日も平穏なり</h3><p>まだ気温が上がらないため花粉はほとんど飛んでいないようだ。ノーマスクで無事であった。もうホントに花粉の爆発が恐ろしいですよ。</p></div>
<div class="zoomable" style="left: 0; top: 1; width: 550; height: 300" onclick="togglefocus(this)">
<h3><a href="./?date=20050228#p02"><span class="sanchor">_</span></a> [<a href="./?year=2005;month=1Q;category=%B8%A6%B5%E6">研究</a>] Internet ArchiveのRecallみたいな</h3><p>情報処理1月号の記事でInternet ArchiveのRecallをちょこっと紹介した。RecallはInternet Archiveに蓄えられている膨大なウェブページの履歴を全文検索できるサービスで、指定したキーワードの出現数の推移などが分かる面白い検索エンジンだった。「だった」というのは、実はくだんの記事が世に出たときには既にサービスを停止していたのである。ウェブの話はすぐに風化するから困ったものだ。すぐに復活するだろうと思っていたのだが、現在もサービスを停止中で復活の見込みはない。Recallを作っていた人がGoogleに移ってしまったのが大きな原因なのだが、その後を引き継ぐ人は結局現れなかったのかなあ。</p>
<p>前置きが長くなったが、そういうわけで現在、喜連川研のアーカイブでそれっぽいモドキエンジンを作成中である。直接研究にはならないので片手間だが、既に少し動き始めていて色々検索してみるとなかなか面白い。のではあるが、こういうのって普通の人のニーズはあるのかなあ。</p></div>


</div>

</body>
</html>
