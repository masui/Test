// Copyright 2005 Google
function zj(ke,Mg,Si)
{
    this.type=ke;
    this.version=Mg;
    this.os=Si;
}
var z=new zj(0,0,null);
var Pb=navigator.userAgent.toLowerCase();
if(Pb.indexOf("opera")!=-1){
    z.type=4;
}
else if(Pb.indexOf("msie")!=-1&&document.all){
    z.type=1;
    if(Pb.indexOf("msie 5")){
	z.version=5;
    }
}
else if(Pb.indexOf("safari")!=-1){
    z.type=3;
    if(Pb.indexOf("safari/125")!=-1){
	z.version=1;
    }
}
else if(Pb.indexOf("mozilla")!=-1){
    z.type=2;
}
if(Pb.indexOf("x11;")!=-1){
    z.os=1;
}
var W=Number.MAX_VALUE;
var Kf=0;
Object.prototype.setTimeout=function(ye,hj){
    var ze="tempVar"+Kf;
    Kf++;
    eval(ze+" = this;");
    var vi=ye.replace(/\\/g,"\\\\").replace(/\"/g,'\\"');
    return window.setTimeout(ze+'._setTimeoutDispatcher("'+vi+'");'+ze+" = null;",hj)
}
Object.prototype._setTimeoutDispatcher=function(ye){
    eval(ye);
}
Object.prototype.eventHandler=function(Rg){
    var g=this;
    g=g;
    return;
    function(b){
	if(!b){
	    b=window.event;
	}
	if(b&&!b.target){
	    b.target=b.srcElement;
	}
	g[Rg](b);
    }
}
function Ob(Ra){
    return Ra.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
}

function ib(Ra){
    return Ob(Ra).replace(/\"/g,"&quot;").replace(/\'/g,"&apos;");
}
function Na(Ra){
    return Ra.replace(/</g,"&lt;").replace(/>/g,"&gt;");
}
function Rd(Ra){
    return Ra.replace(/\\/g,"\\\\").replace(/\'/g,'\\"');
}
Array.prototype.clear=function(){
    while(this.length>0) this.pop();
}
document.getElementsByClassName=function(w){
    var Dc=document.all;
    if(!Dc) Dc=document.getElementsByTagName("*");
    var Ge=new Array();
    for(var a=0;a<Dc.length;a++){
	if(Dc[a].className==w){
	    Ge[Ge.length]=Dc[a];
	}
    }
    return Ge;
}
function N(d,wf){
    try{
	d.style.cursor=wf;
    }
    catch(b){
	if(wf=="pointer"){
	    N(d,"hand");
	}
    }
}

function l(){
}

l.count=0;
l.createElement=function(M,Ac){
    if(typeof arguments.callee.hasFilters=="undefined"){
	var zi=document.createElement("div");arguments.callee.hasFilters=typeof zi.style.filter!="undefined";
    }
    var f;
    if(arguments.callee.hasFilters){
	f=document.createElement("div");
	f.style.filter='progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+M+(Ac?'",sizingMethod=crop)':'")');
    }
    else{
	f=document.createElement("img");f.src=M;
    }
    return f;
}
l.create=function(M,i,n,S,top,Va,Ac,Ia){
    return bc.create(M,i,n,S,top,Va,Ac,Ia,l.createElement);
}

function bc(){
}

bc.create=function(M,i,n,S,top,Va,Ac,Ia,dg){
    var f;
    if(!dg){
	f=document.createElement("IMG");
	if(M)f.src=M;
    }
    else{
	f=dg(M,Ac);
    }
    if(i&&n){
	f.style.width=ja(i);
	f.style.height=ja(n);
	f.width=i;
	f.height=n;
	
    }
    if(top||(S||(top==0||S==0))){
	f.style.position="absolute";
	f.style.left=ja(S);
	f.style.top=ja(top);
	
    }
    if(Va||Va==0){
	f.style.zIndex=Va;
	
    }
    if(z.type==1){
	f.unselectable="on";
	f.onselectstart=Fc;
	
    }
    else{
	f.style.MozUserSelect="none";
	
    }
    f.style.border="0";
    f.oncontextmenu=Fc;
    if(Ia){
	ad(f,Ia);
	
    }
    return f;
    
}
function I(ra,w,Rb){
    if(z.type==3&&w=="dblclick"){
	ra["on"+w]=Rb;
	return;

    }
    if(ra.addEventListener){
	ra.addEventListener(w,Rb,false);

    }
    else if(ra.attachEvent){
	ra.attachEvent("on"+w,Rb);

    }
    else{
	ra["on"+w]=Rb;

    }
}

function df(ra,w,Rb){
    if(ra.removeEventListener){
	ra.removeEventListener(w,Rb,false);
    }
    else if(ra.detachEvent){
	ra.detachEvent("on"+w,Rb);
    }
    else{
	ra["on"+w]=null;
    }
}

function P(b){
    if(z.type==1){
	window.event.cancelBubble=true;
    }
    else{
	b.cancelBubble=true;
	b.preventDefault;
    }
}

var Sa=window.document.createElement("a");
Sa.href="javascript:void(0)";
}

if(!Array.prototype.push){
Array.prototype.push=function(Gf){
this[this.length]=Gf;

}

;

}
function Gf(K){
return document.getElementById(K);

}

function ja(x){
return x+"px";

}

function ad(d,Ia){
if(d.className){
d.className+=" "+Ia;

}
else{
d.className=Ia;

}
;

}

function ld(h){
var C={
"x":0,"y":0;

}
;
while(h){
C.x+=h.offsetLeft;
C.y+=h.offsetTop;
h=h.offsetParent;

}
return C;

}
function sh(h,ah){
    var C= {
    "x":0,"y":0;
}
;
while(h&&h!=ah){
    C.x+=h.offsetLeft;
C.y+=h.offsetTop;
h=h.offsetParent;

}
return C;

}

function Sc(ma){
this.size=0;
if(ma){
for(var a=ma.length-1;
a>=0;
a--)this.add(ma[a]);

}
;

}

Sc.prototype.add=function(Hb){
    if(!this.contains(Hb)){
	this[":"+Hb]=1;
this.size++;

    }
}

;
Sc.prototype.remove=function(Hb){
if(this.contains(Hb)){
delete this[":"+Hb];
this.size--;

}
;

}

;
Sc.prototype.contains=function(Hb){
return this[":"+Hb]==1;

}

;
function Fc(){
    return false;
}

var m="http://www.google.com/mapfiles/";
var wd=new Array("q","ll","spn","z","t","sll","sspn","vp","f","output","file","deb");
function ua(){
    this.args = new Object();
	this.reset();
}

ua.prototype.setValue=function(w,H){
    this.args[w]=H;
}

;
ua.prototype.setAllMapValues=function(r){
this.setValue("ll",this.getLatLngArg(r.getCenterLatLng()));
this.setValue("spn",this.getSpanArg(r.getSpanLatLng()));
this.setValue("z",r.zoomLevel);
this.setValue("t",r.spec.getURLArg());

}

;
ua.prototype.getLatLngArg=function(k){
return Fd(k.y)+","+Fd(k.x);

}

;
ua.prototype.getSpanArg=function(Aa){
return Fd(Aa.height)+","+Fd(Aa.width);

}

;
ua.prototype.reset=function(){
for(var a=0;
a<wd.length;
a++){
this.args[wd[a]]=null;

}
;

}

;
ua.prototype.getURL=function(Ce){
var pd=new Array();
for(var a=0;
a<wd.length;
a++){
var w=wd[a];
if(this.args[w]){
pd.push(w+"="+encodeURIComponent(this.args[w]));

}
;

}
if(window._sf&&window._sf.length>0){
pd.push(window._sf);

}
var Ib="/maps";
if(pd.length>0)Ib+="?"+pd.join("&");
if(Ce)return"http://maps.google.com"+Ib;
return Ib;

}

;
ua.getFileURL=function(K){
var A=new ua();
A.setValue("file",K);
return A.getURL();

}

;
function Fd(Cb){
if(Cb.toFixed){
return Cb.toFixed(6).toString();

}
else{
return Cb.toString();

}
;

}

;
var yb=new Object();
function Ma(K,ya){
this.id=K;
this.ticketClass=ya;

}

Ma.create=function(ya){
if(!ya)ya="_dtc";
if(!yb[ya])yb[ya]=1;
else yb[ya]++;
return new Ma(yb[ya],ya);

}

;
Ma.invalidateAll=function(){
for(var a in yb){
try{
yb[a]++;

}
catch(b){
;

}
;

}
;

}

;
Ma.invalidate=function(Ia){
yb[Ia]++;

}

;
Ma.prototype.isValid=function(){
return yb[this.ticketClass]==this.id;

}

;
function we(){
;

}

we.create=function(){
    if(typeof ActiveXObject!="undefined"){
	return new ActiveXObject("Microsoft.XMLHTTP");

    }
    else if(typeof XMLHttpRequest!="undefined"){
	return new XMLHttpRequest();

    }
    else{
	return null;

    }
}

;
function la(se){
this.stylesheet=se;

}

la.cache_=new Object();
la.isSupported=function(Ab){
return typeof Ab.transformNode!="undefined"||typeof XSLTProcessor!="undefined"&&(XSLTProcessor.prototype&&XSLTProcessor.prototype.importStylesheet);

}

;
la.create=function(se){
return new la(se);

}

;
la.getCached=function(Ib){
return la.cache_[Ib];

}

;
la.cache=function(Ib,Jg){
la.cache_[Ib]=Jg;

}

;
la.prototype.transformToHTML=function(Ab,Za){
if(typeof Ab.transformNode!="undefined"){
Za.innerHTML=Ab.transformNode(this.stylesheet);

}
else if(typeof XSLTProcessor!="undefined"){
var xf=new XSLTProcessor();
xf.importStylesheet(this.stylesheet);
var qj=xf.transformToFragment(Ab,window.document);
Za.innerHTML="";
Za.appendChild(qj);

}
else{
;

}
;

}

;
la.asynchronousTransform=function(Ab,Za,Kc,nb,ya){
var Cc=la.getCached(Kc);
if(Cc){
try{
Cc.transformToHTML(Ab,Za);
if(nb){
nb();

}
;

}
catch(b){
;

}
return;

}
var Ue=Ma.create(ya);
var sc=we.create();
Sd('<a href="'+ib(Kc)+'">'+Ob(Kc)+"</a>",0);
sc.open("GET",Kc,true);
sc.onreadystatechange=function(){
if(sc.readyState==4){
if(Ue.isValid()){
try{
var Id=sc.responseXML;
var Cc=la.create(Id);
Cc.transformToHTML(Ab,Za);
la.cache(Kc,Cc);
if(nb){
nb();

}
;

}
catch(b){
;

}
;

}
;

}
;

}

;
sc.send(null);

}

;
function Od(ue,Za,Dh,nb,ya,Ff){
if(la.isSupported(ue.xml)){
la.asynchronousTransform(ue.xml,Za,Dh,nb,ya);

}
else if(Ff){
Ff.call(ue,Za);
if(nb){
nb();

}
;

}
else{
;

}
;

}

function gi(d){
while(d.hasChildNodes()){
d.removeChild(d.lastChild);

}
;

}

function mf(str){
try{
if(typeof ActiveXObject!="undefined"&&typeof GetObject!="undefined"){
var Id=new ActiveXObject("Microsoft.XMLDOM");
Id.loadXML(str);
return Id;

}
else if(typeof DOMParser!="undefined"){
return(new DOMParser()).parseFromString(str,"text/xml");

}
else{
return tg(str);

}
;

}
catch(b){
;

}
try{
return tg(str);

}
catch(b){
;
return document.createElement("div");

}
;

}

function sf(Ra){
var id=Ra.split(/&/);
if(id.length==1){
return Ra;

}
var C="";
for(var a=0;
a<id.length;
++a){
var Md=id[a].split(/;
/);
if(Md.length!=2){
C+=id[a];
continue;

}
var rb;
switch(Md[0]){
case "lt":rb="<";
break;
case "gt":rb=">";
break;
case "amp":rb="&";
break;
case "quot":rb='"';
break;
case "apos":rb="'";
break;
case "nbsp":rb=String.fromCharCode(160);
break;
default:var Aa=window.document.createElement("span");
Aa.innerHTML="&"+Md[0]+";
";
rb=Aa.innerHTML;

}
C+=rb+Md[1];

}
return C;

}

function tg(T){
var Zi=/\/$/;
var Ah=/^(\S*)/;
var Lh=/(\S+)\s?=\s?('([^\']*)'|"([^\"]*)")/g;
var He=y.createDocument();
var le=He;
var Oc=[];
var Nb=le;
Oc.push(Nb);
var x=T.split(/</);
for(var a=1;
a<x.length;
++a){
var sg=x[a].split(/>/);
var jc=sg[0];
var Qb=sf(sg[1]);
if(jc.charAt(0)=="/"){
Oc.pop();
Nb=Oc[Oc.length-1];

}
else if(jc.charAt(0)=="?"){
;

}
else if(jc.charAt(0)=="!"){
;

}
else{
var Hg=jc.match(Zi);
var Yi=Ah.exec(jc)[1];
var h=He.createElement(Yi);
var rd;
while(rd=Lh.exec(jc)){
var ji=sf(rd[3]||rd[4]);
h.setAttribute(rd[1],ji);

}
if(Hg){
Nb.appendChild(h);

}
else{
Nb.appendChild(h);
Nb=h;
Oc.push(h);

}
;

}
if(Qb&&Nb!=le){
Nb.appendChild(He.createTextNode(Qb));

}
;

}
return le;

}

function Uf(h){
var C="";
if(h.nodeName=="#text"){
C+=Ob(h.nodeValue);

}
else{
C+="<"+h.nodeName;
if(h.hasAttributes()){
for(var a=0;
a<h.attributes.length;
++a){
C+=" "+h.attributes[a].nodeName+'="'+ib(h.attributes[a].nodeValue)+'"';

}
;

}
if(h.childNodes.length==0){
C+="/>";

}
else{
C+=">";
for(var a=0;
a<h.childNodes.length;
++a){
C+=Uf(h.childNodes[a]);

}
C+="</"+h.nodeName+">";

}
;

}
return C;

}

function Sg(h){
var C="";
if(h.nodeName=="#text"){
C+=Ob(h.nodeValue);

}
else{
for(var a=0;
a<h.childNodes.length;
++a){
C+=Uf(h.childNodes[a]);

}
;

}
return C;
}


function ka(h){
if(!h){
return"";

}
if(typeof h.text!="undefined"){
return h.text;

}
if(h.nodeType==3||h.nodeType==4){
return h.nodeValue;

}
var H="";
if(h.nodeType==1){
for(var fd=h.firstChild;
fd!=null;
fd=fd.nextSibling){
H+=ka(fd);

}
;

}
return H;

}

function y(ke,w,H){
this.nodeType=ke;
this.nodeName=w;
this.nodeValue=H;
this.attributes=[];
this.childNodes=[];
this.firstChild=null;
this.lastChild=null;
this.nextSibling=null;
this.previousSibling=null;
this.parentNode=null;

}

y.ELEMENT_NODE=1;
y.ATTRIBUTE_NODE=2;
y.TEXT_NODE=3;
y.CDATA_SECTION_NODE=4;
y.ENTITY_REFERENCE_NODE=5;
y.ENTITY_NODE=6;
y.PROCESSING_INSTRUCTION_NODE=7;
y.COMMENT_NODE=8;
y.DOCUMENT_NODE=9;
y.DOCUMENT_TYPE_NODE=10;
y.DOCUMENT_FRAGMENT_NODE=11;
y.NOTATION_NODE=12;
y.prototype.appendChild=function(h){
if(this.childNodes.length==0){
this.firstChild=h;

}
h.previousSibling=this.lastChild;
h.nextSibling=null;
if(this.lastChild){
this.lastChild.nextSibling=h;

}
h.parentNode=this;
this.lastChild=h;
this.childNodes.push(h);

}

;
y.prototype.hasAttributes=function(){
return this.attributes.length>0;

}

;
y.prototype.setAttribute=function(w,H){
for(var a=0;
a<this.attributes.length;
++a){
if(this.attributes[a].nodeName==w){
this.attributes[a].nodeValue=H;
return;

}
;

}
this.attributes.push(new y(y.ATTRIBUTE_NODE,w,H));

}

;
y.prototype.getAttribute=function(w){
for(var a=0;
a<this.attributes.length;
++a){
if(this.attributes[a].nodeName==w){
return this.attributes[a].nodeValue;

}
;

}
return null;

}

;
y.prototype.createElement=(y.createElement=function(w){
return new y(y.ELEMENT_NODE,w,null);

}

);
y.prototype.createTextNode=(y.createTextNode=function(H){
return new y(y.TEXT_NODE,"#text",H);

}

);
y.prototype.createDocument=(y.createDocument=function(){
return new y(y.DOCUMENT_NODE,"#document",null);

}

);
y.prototype.getElementsByTagName=function(w,Xc){
if(!Xc){
Xc=[];

}
if(this.nodeName==w){
Xc.push(this);

}
for(var a=0;
a<this.childNodes.length;
++a){
this.childNodes[a].getElementsByTagName(w,Xc);

}
return Xc;

}

;
function Sd(oj,va){
;

}

Object.prototype.trace=function(oj,va,Ej){
;

}

;
function Q(){
;

}

Q.start=function(){
;

}

;
Q.end=function(){
;

}

;
Q.addTime=function(Xe){
;

}

;
function q(x,o){
this.x=x;
this.y=o;

}

q.prototype.toString=function(){
return"("+this.x+", "+this.y+")";

}

;
q.prototype.equals=function(Z){
if(!Z)return false;
return this.x==Z.x&&this.y==Z.y;

}

;
q.prototype.distanceFrom=function(Z){
var Ga=this.x-Z.x;
var Ka=this.y-Z.y;
return Math.sqrt(Ga*Ga+Ka*Ka);

}

;
q.prototype.approxEquals=function(Z){
if(!Z)return false;
return bd(this.x,Z.x)&&bd(this.y,Z.y);

}

;
function ca(i,n){
this.width=i;
this.height=n;

}

ca.prototype.toString=function(){
return"("+this.width+", "+this.height+")"}

;
ca.prototype.equals=function(Z){
if(!Z)return false;
return this.width==Z.width&&this.height==Z.height}

;
ca.prototype.approxEquals=function(Z){
if(!Z)return false;
return bd(this.width,Z.width)&&bd(this.height,Z.height)}

;
function bd(nh,Ii){
return Math.round(nh*1000000)==Math.round(Ii*1000000)}

function ba(kj,Th,Hd,md){
this.minX=kj;
this.minY=Th;
this.maxX=Hd;
this.maxY=md}

ba.prototype.toString=function(){
return"Bounds("+this.minX+","+this.minY+","+this.maxX+","+this.maxY+")"}

;
ba.prototype.containsSegment=function(Qd,ud){
if(this.minX>Qd.x&&this.minX>ud.x)return false;
if(this.maxX<Qd.x&&this.maxX<ud.x)return false;
if(this.minY>Qd.y&&this.minY>ud.y)return false;
if(this.maxY<Qd.y&&this.maxY<ud.y)return false;
return true}

;
ba.prototype.containsBounds=function(Ud){
return this.minX<Ud.minX&&(this.maxX>Ud.maxX&&(this.minY<Ud.minY&&this.maxY>Ud.maxY))}

;
function wc(Tg){
this.ticks=Tg;
this.tick=0}

wc.prototype.reset=function(){
this.tick=0}

;
wc.prototype.next=function(){
this.tick++;
var pb=Math.PI*(this.tick/this.ticks-0.5);
return(Math.sin(pb)+1)/2}

;
wc.prototype.more=function(){
return this.tick<this.ticks}

;
function Xh(H,ma){
if(!ma)ma=new Array();
while(H>=32){
ma.push(String.fromCharCode((32|H&31)+63));
H>>=5}
ma.push(String.fromCharCode(H+63));
return ma}

function lc(H,ma){
return Xh(H<0?~(H<<1):H<<1,ma)}

function kc(qi,be,Ie,fe){
this.numLevels=Ie;
this.zoomFactor=fe;
this.decodePolyline(qi);
this.decodeLevels(be);
this.minTolerance=1.0E-5}

kc.prototype.decodePolyline=function(vc){
Q.start("Polyline","decodePolyline");
var Wi=vc.length;
var Sb=0;
var ma=new Array();
var mb=0;
var zb=0;
while(Sb<Wi){
var Xb;
var Pc=0;
var Ua=0;
do{
Xb=vc.charCodeAt(Sb++)-63;
Ua|=(Xb&31)<<Pc;
Pc+=5}
while(Xb>=32);
var dj=Ua&1?~(Ua>>1):Ua>>1;
mb+=dj;
ma.push(mb);
Pc=0;
Ua=0;
do{
Xb=vc.charCodeAt(Sb++)-63;
Ua|=(Xb&31)<<Pc;
Pc+=5}
while(Xb>=32);
var pi=Ua&1?~(Ua>>1):Ua>>1;
zb+=pi;
ma.push(zb)}
this.points=ma;
this.numPoints=this.points.length>>1;
Q.end("Polyline","decodePolyline")}

;
kc.prototype.decodeLevels=function(vc){
Q.start("Polyline","decodeLevels");
var Cd=new Array(this.numLevels);
for(var Qe=0;
Qe<this.numLevels;
++Qe)Cd[Qe]=new Array();
var a=0;
for(var da=0;
da<this.numPoints;
++da){
var Yb=vc.charCodeAt(a++)-63;
while(Yb>=0){
var mc=Cd[Yb--];
while(mc.length<da){
mc.push(da)}
}
}
for(var Yb=0;
Yb<this.numLevels;
++Yb){
var mc=Cd[Yb];
for(var da=mc.length;
da<this.numPoints;
++da){
mc.push(this.numPoints)}
}
this.nextPointIndexAtLevel=Cd;
Q.end("Polyline","decodeLevels")}

;
kc.prototype.getPoint=function(Sb,k){
if(k==null)k=new q();
Sb<<=1;
k.y=this.points[Sb]*1.0E-5;
k.x=this.points[Sb+1]*1.0E-5;
return k}

;
kc.prototype.getVectors=function(F,R,v){
Q.start("Polyline","getVectors");
if(v==null)v=new Array();
this.getVectorsHelper(F,0,this.numPoints-1,this.numLevels-1,R,v);
Q.end("Polyline","getVectors");
return v}

;
kc.prototype.getVectorsHelper=function(F,nj,Wb,va,vg,v){
var Wc=7.62939453125E-6;
for(var a=va;
a>0;
--a){
Wc*=this.zoomFactor}
var uc=new ba();
uc.minX=Math.floor((F.minX-Wc)*100000);
uc.minY=Math.floor((F.minY-Wc)*100000);
uc.maxX=Math.ceil((F.maxX+Wc)*100000);
uc.maxY=Math.ceil((F.maxY+Wc)*100000);
var Bc=nj;
var Mc;
var wa=new q();
wa.y=this.points[Bc<<1];
wa.x=this.points[(Bc<<1)+1];
var za=new q();
while((Mc=this.nextPointIndexAtLevel[va][Bc])<=Wb){
za.y=this.points[Mc<<1];
za.x=this.points[(Mc<<1)+1];
if(uc.containsSegment(wa,za)){
if(va>vg){
this.getVectorsHelper(F,Bc,Mc,va-1,vg,v)}
else{
v.push(wa.y*1.0E-5);
v.push(wa.x*1.0E-5);
v.push(za.y*1.0E-5);
v.push(za.x*1.0E-5)}
}
var xe=wa;
wa=za;
za=xe;
Bc=Mc}
}

;
var Bj=m+"markerTransparent.png";
function c(Y,ia,i,n,bh,cf,Hh,Dj){
if(!Y)return;
this.container=Y;
this.disablePopups=bh;
this.disableDragging=cf;
if(!ia)ia=ed;
this.mapTypes=Hh;
if(!this.mapTypes)this.mapTypes=new Array(ia);
this.zoomLevel=0;
this.topLeftTile=null;
this.currentPanOffset=new ca(0,0);
this.centerBitmap=new q(0,0);
this.tilePaddingOffset=new ca(0,0);
this.tableSize=new ca(0,0);
this.overlays=new Array();
this.locations=new Array();
this.panDistance=new ca(0,0);
this.panKeys=new Sc();
this.setSpecification(ia);
this.container.style.overflow="hidden";
if(this.container.style.position!="absolute")this.container.style.position="relative";
this.container.style.backgroundColor=this.spec.backgroundColor;
if(!i||!n){
i=this.container.offsetWidth;
n=this.container.offsetHeight}
this.viewSize=new ca(i,n);
I(window,"blur",this.eventHandler("onWindowBlur"));
this.div=this.createMapDiv();
this.container.appendChild(this.div);
if(!this.disablePopups){
this.infoWindow=new t("14em",this.eventHandler("onInfoCloseClick"),this.div,50,20)}
this.directionsDiv=document.createElement("div");
this.directionsDiv.directionsBounds=new ba(-W,-W,W,W);
this.div.appendChild(this.directionsDiv);
this.dragObject=new gb(this.div,0,0);
this.dragObject.ondrag=this.eventHandler("onDrag");
this.dragObject.ondragstart=this.eventHandler("onDragStart");
this.dragObject.ondragend=this.eventHandler("onDragEnd");
I(this.div,"dblclick",this.eventHandler("onDoubleClick"));
this.dragObject.onclick=this.eventHandler("onClick");
if(cf){
this.dragObject.disable()}
this.initializeMap();
if(!Dj)this.showCopyright();
this.onzoom=null;
this.onpan=null;
this.onmousedown=null;
this.onspecificationchange=null;
this.oninfowindowclose=null;
this.onresize=null;
this.stateListeners=null;
this.useRawVml=false}

c.prototype.createMapDiv=function(){
var j=document.createElement("div");
j.style.position="absolute";
j.style.top="0px";
j.style.left="0px";
j.style.zIndex=0;
j.style.backgroundColor=this.spec.backgroundColor;
return j}

;
c.prototype.loadTileImages=function(){
while(this.tileImages.length>this.tableSize.width){
var If=this.tileImages.pop();
for(var a=0;
a<If.length;
a++){
this.div.removeChild(If[a])}
}
for(var a=this.tileImages.length;
a<this.tableSize.width;
a++){
this.tileImages.push(new Array())}
for(var a=0;
a<this.tileImages.length;
a++){
while(this.tileImages[a].length>this.tableSize.height){
var f=this.tileImages[a].pop();
this.div.removeChild(f)}
for(var O=this.tileImages[a].length;
O<this.tableSize.height;
O++){
var f=bc.create(null,this.spec.tileSize,this.spec.tileSize,null,null,0,null,null);
f.style.position="absolute";
this.tileImages[a].push(f);
this.div.appendChild(f);
this.configureImage(f,a,O)}
}
}

;
c.prototype.deleteTiles=function(){
if(this.tileImages){
for(var a=0;
a<this.tileImages.length;
a++){
if(this.tileImages[a]){
for(var O=0;
O<this.tileImages[a].length;
O++){
this.div.removeChild(this.tileImages[a][O])}
}
}
}
this.tileImages=null}

;
c.prototype.initializeMap=function(){
this.deleteTiles();
this.tileImages=new Array();
this.calculateTileMeasurements();
this.loadTileImages()}

;
c.prototype.getSpanLatLng=function(e){
if(!e)e=new ca(0,0);
var Ha=this.spec.getLatLng(this.centerBitmap.x-this.viewSize.width/2,this.centerBitmap.y-this.viewSize.height/2,this.zoomLevel);
var Da=this.spec.getLatLng(this.centerBitmap.x+this.viewSize.width/2,this.centerBitmap.y+this.viewSize.height/2,this.zoomLevel);
e.width=Math.abs(Da.x-Ha.x);
e.height=Math.abs(Da.y-Ha.y);
return e}

;
c.prototype.getCenterLatLng=function(e){
if(!e)e=new q(0,0);
if(this.centerLatLng){
e.x=this.centerLatLng.x;
e.y=this.centerLatLng.y;
return e}
if(this.lastLatLng){
var ea=this.spec.getBitmapCoordinate(this.lastLatLng.y,this.lastLatLng.x,this.zoomLevel);
if(ea.equals(this.centerBitmap)){
e.x=this.lastLatLng.x;
e.y=this.lastLatLng.y;
return e}
}
var k=this.spec.getLatLng(this.centerBitmap.x,this.centerBitmap.y,this.zoomLevel);
e.x=k.x;
e.y=k.y;
return e}

;
c.prototype.getBoundsBitmap=function(e){
if(!e)e=new ba(0,0,0,0);
e.minX=this.centerBitmap.x-this.viewSize.width/2;
e.minY=this.centerBitmap.y-this.viewSize.height/2;
e.maxX=this.centerBitmap.x+this.viewSize.width/2;
e.maxY=this.centerBitmap.y+this.viewSize.height/2;
return e}

;
c.prototype.getBoundsLatLng=function(e){
e=this.getBoundsBitmap(e);
var Ha=this.spec.getLatLng(e.minX,e.minY,this.zoomLevel);
var Da=this.spec.getLatLng(e.maxX,e.maxY,this.zoomLevel);
e.minX=Ha.x;
e.minY=Da.y;
e.maxX=Da.x;
e.maxY=Ha.y;
return e}

;
c.prototype.calculateTileMeasurements=function(){
var Ei=Math.ceil(this.viewSize.width/this.spec.tileSize)+2;
var Vh=Math.ceil(this.viewSize.height/this.spec.tileSize)+2;
this.tableSize.width=Ei;
this.tableSize.height=Vh;
var Vb=Math.floor((this.tableSize.width*this.spec.tileSize-this.viewSize.width)/2);
var Gb=Math.floor((this.tableSize.height*this.spec.tileSize-this.viewSize.height)/2);
this.tilePaddingOffset.width=Vb;
this.tilePaddingOffset.height=Gb}

;
c.prototype.configureImage=function(f,x,o){
var xh=(this.currentPanOffset.width+x)*this.spec.tileSize;
var sj=(this.currentPanOffset.height+o)*this.spec.tileSize;
var S=-this.tilePaddingOffset.width+xh;
var top=-this.tilePaddingOffset.height+sj;
if(f.tileLeft!=S||f.tileTop!=top){
f.style.left=S+"px";
f.style.top=top+"px";
f.tileLeft=S;
f.tileTop=top}
if(!this.topLeftTile){
f.src=this.spec.emptyTileURL}
else{
var M=this.spec.getTileURL(this.topLeftTile.x+x,this.topLeftTile.y+o,this.zoomLevel);
if(f.src!=M){
f.src=this.spec.emptyTileURL;
f.src=M}
}
}

;
c.prototype.onDrag=function(){
if(!this.topLeftTile)return;
this.onMove();
this.rotateTiles()}

;
var Og=new ca(0,0);
c.prototype.onMove=function(){
this.centerLatLng=null;
var La=this.getCurrentOffset(Og);
var x=this.topLeftTile.x*this.spec.tileSize+Math.floor(this.viewSize.width/2)+this.tilePaddingOffset.width-La.width;
var o=this.topLeftTile.y*this.spec.tileSize+Math.floor(this.viewSize.height/2)+this.tilePaddingOffset.height-La.height;
this.centerBitmap.x=x;
this.centerBitmap.y=o;
this.drawDirections(this.directions,this.directionsDiv);
if(this.onpan)this.onpan(x,o)}

;
var xj=new ca(0,0);
c.prototype.rotateTiles=function(){
var La=this.getCurrentOffset(xj);
if(Math.abs(this.dragObject.left)>10000000||Math.abs(this.dragObject.top)>10000000){
this.cancelPan();
this.centerAtBitmap(this.centerBitmap);
return}
while(La.width<-this.tilePaddingOffset.width/2){
this.rotateRight();
this.getCurrentOffset(La)}
while(La.width>this.tilePaddingOffset.width/2){
this.rotateLeft();
this.getCurrentOffset(La)}
while(La.height<-this.tilePaddingOffset.height/2){
this.rotateDown();
this.getCurrentOffset(La)}
while(La.height>this.tilePaddingOffset.height/2){
this.rotateUp();
this.getCurrentOffset(La)}
}

;
c.prototype.rotateLeft=function(){
this.currentPanOffset.width--;
this.topLeftTile.x--;
var kb=this.tileImages.pop();
if(kb){
this.tileImages.unshift(kb);
for(var a=0;
a<kb.length;
a++){
this.configureImage(kb[a],0,a)}
}
}

;
c.prototype.rotateRight=function(){
this.currentPanOffset.width++;
this.topLeftTile.x++;
var kb=this.tileImages.shift();
this.tileImages.push(kb);
var x=this.tileImages.length-1;
for(var a=0;
a<kb.length;
a++){
this.configureImage(kb[a],x,a)}
}

;
c.prototype.rotateUp=function(){
this.currentPanOffset.height--;
this.topLeftTile.y--;
for(var a=0;
a<this.tileImages.length;
a++){
var f=this.tileImages[a].pop();
this.tileImages[a].unshift(f);
this.configureImage(f,a,0)}
}

;
c.prototype.rotateDown=function(){
this.currentPanOffset.height++;
this.topLeftTile.y++;
var o=this.tileImages[0].length-1;
for(var a=0;
a<this.tileImages.length;
a++){
var f=this.tileImages[a].shift();
this.tileImages[a].push(f);
this.configureImage(f,a,o)}
}

;
c.prototype.onDragStart=function(b){
if(this.onmousedown)this.onmousedown(b)}

;
c.prototype.onDragEnd=function(b){
this.onStateChanged()}

;
c.prototype.onDoubleClick=function(b){
if(this.disableDragging){
return}
var k=this.getRelativeClickPoint(b,this.container);
var Zc=Math.floor(this.viewSize.width/2)-k.x;
var zc=Math.floor(this.viewSize.height/2)-k.y;
this.pan(Zc,zc)}

;
c.prototype.onClick=function(b){
this.closeInfoWindow()}

;
c.prototype.getRelativeClickPoint=function(b,qf,e){
if(!e){
e=new q()}
if(typeof b.offsetX!="undefined"){
var ra=b.target||b.srcElement;
var qg=sh(ra,qf);
e.x=b.offsetX+qg.x;
e.y=b.offsetY+qg.y}
else if(typeof b.pageX!="undefined"){
var Kd=ld(qf);
e.x=b.pageX-Kd.x;
e.y=b.pageY-Kd.y}
else{
}
return e}

;
c.prototype.reconfigureAllImages=function(){
if(this.tileImages.length==0){
return}
var Dd=new Array();
for(var a=0;
a<this.tileImages.length;
a++){
for(var O=0;
O<this.tileImages[a].length;
O++){
f=this.tileImages[a][O];
f.coordX=a;
f.coordY=O;
var wg=Math.min(a,this.tileImages.length-a-1);
var Df=Math.min(O,this.tileImages[a].length-O-1);
if(wg==0||Df==0){
f.priority=0}
else{
f.priority=wg+Df}
Dd.push(f)}
}
Dd.sort(function(Bh,ij){
return ij.priority-Bh.priority}

);
for(var a=0;
a<Dd.length;
a++){
var f=Dd[a];
if(z.type==1)this.div.removeChild(f);
this.configureImage(f,f.coordX,f.coordY);
if(z.type==1)this.div.appendChild(f)}
}

;
c.prototype.pan=function(Ga,Ka){
if(!this.topLeftTile){
return}
var sb=Math.sqrt(Ga*Ga+Ka*Ka);
var Gi=Math.max(10,Math.floor(sb/20));
this.panSiner=new wc(Gi);
this.panSiner.reset();
this.panDistance.width=Ga;
this.panDistance.height=Ka;
this.panStart=new q(this.dragObject.left,this.dragObject.top);
this.doPan()}

;
c.prototype.doPan=function(){
var pb=this.panSiner.next();
this.dragObject.moveTo(this.panStart.x+this.panDistance.width*pb,this.panStart.y+this.panDistance.height*pb);
this.onMove();
if(this.panSiner.more()){
this.panTimeout=this.setTimeout("this.doPan()",10);
this.rotateTiles()}
else{
this.panTimeout=null;
this.onStateChanged()}
}

;
c.prototype.cancelPan=function(){
if(this.panTimeout){
clearTimeout(this.panTimeout)}
}

;
c.prototype.recenterOrPanToLatLng=function(k){
if(!this.topLeftTile){
return}
this.centerLatLng=new q(k.x,k.y);
this.lastLatLng=this.centerLatLng;
var k=this.spec.getBitmapCoordinate(this.centerLatLng.y,this.centerLatLng.x,this.zoomLevel);
this.recenterOrPanToBitmap(k)}

;
c.prototype.recenterOrPanToBitmap=function(k){
if(!this.topLeftTile)return;
var Zc=this.centerBitmap.x-k.x;
var zc=this.centerBitmap.y-k.y;
if(Zc==0&&zc==0)return;
if(Math.abs(Zc)<this.viewSize.width&&Math.abs(zc)<this.viewSize.height){
this.pan(Zc,zc);
return}
this.centerAtBitmap(k);
this.onStateChanged()}

;
c.prototype.centerAndZoom=function(kd,R){
var pf=false;
if(R!=this.zoomLevel){
var ve=this.zoomLevel;
this.zoomLevel=R;
pf=true}
this.centerAtLatLng(kd);
if(pf&&this.onzoom)this.onzoom(ve,this.zoomLevel);
this.onStateChanged()}

;
c.prototype.centerAtLatLng=function(k){
this.centerLatLng=new q(k.x,k.y);
this.lastLatLng=this.centerLatLng;
var k=this.spec.getBitmapCoordinate(this.centerLatLng.y,this.centerLatLng.x,this.zoomLevel);
this.centerAtBitmap(k)}

;
c.prototype.centerAtBitmap=function(k){
this.centerBitmap.x=k.x;
this.centerBitmap.y=k.y;
var S=k.x-Math.floor(this.viewSize.width/2)-this.tilePaddingOffset.width;
var top=k.y-Math.floor(this.viewSize.height/2)-this.tilePaddingOffset.height;
var oc=Math.floor(S/this.spec.tileSize);
var Gc=Math.floor(top/this.spec.tileSize);
var Vb=oc*this.spec.tileSize-S;
var Gb=Gc*this.spec.tileSize-top;
if(Vb<-this.tilePaddingOffset.width/2){
oc++;
Vb+=this.spec.tileSize}
else if(Vb>this.tilePaddingOffset.width/2){
oc--;
Vb-=this.spec.tileSize}
if(Gb<-this.tilePaddingOffset.height/2){
Gc++;
Gb+=this.spec.tileSize}
else if(Gb>this.tilePaddingOffset.height/2){
Gc--;
Gb-=this.spec.tileSize}
if(!this.topLeftTile){
this.topLeftTile=new q(oc,Gc);
new Qc(this)}
else{
this.topLeftTile.x=oc;
this.topLeftTile.y=Gc}
this.currentPanOffset.width=0;
this.currentPanOffset.height=0;
this.reconfigureAllImages();
this.repositionOverlays();
this.dragObject.moveTo(Vb,Gb);
this.onStateChanged()}

;
c.prototype.addStateListener=function(hi){
if(!this.stateListeners)this.stateListeners=new Array();
this.stateListeners.push(hi)}

;
c.prototype.onStateChanged=function(){
if(!this.topLeftTile)return;
if(this.stateListeners){
for(var a=0;
a<this.stateListeners.length;
a++){
this.stateListeners[a].onMapStateChanged(this)}
}
}

;
c.prototype.onResize=function(b){
if(this.viewSize.width!=this.container.offsetWidth||this.viewSize.height!=this.container.offsetHeight){
this.viewSize.width=this.container.offsetWidth;
this.viewSize.height=this.container.offsetHeight;
this.calculateTileMeasurements();
this.loadTileImages();
this.centerAtBitmap(this.centerBitmap);
if(this.onresize){
this.onresize()}
}
}

;
c.prototype.getCurrentOffset=function(e){
if(!e)e=new ca(0,0);
e.width=this.dragObject.left+this.currentPanOffset.width*this.spec.tileSize;
e.height=this.dragObject.top+this.currentPanOffset.height*this.spec.tileSize;
return e}

;
c.prototype.switchSpecification=function(Qa){
if(this.spec==Qa)return;
var ae=this.spec;
var G=this.getCenterLatLng();
this.setSpecification(Qa);
this.div.style.backgroundColor=this.spec.backgroundColor;
if(ae.tileSize!=Qa.tileSize){
this.topLeftTile=null;
this.initializeMap()}
this.centerAtLatLng(G);
if(this.onspecificationchange)this.onspecificationchange(ae,Qa)}

;
c.prototype.setSpecification=function(Qa){
this.spec=Qa;
if(!Qa.emptyTilePreload){
var ac=document.createElement("IMG");
ac.style.position="absolute";
ac.style.visibility="hidden";
ac.style.top=ja(-200);
ac.style.left=ja(-200);
document.body.appendChild(ac);
Qa.emptyTilePreload=ac}
this.spec.emptyTilePreload.src=this.spec.emptyTileURL}

;
c.prototype.zoomTo=function(va){
if(!this.topLeftTile)return;
if(va>=this.spec.numZoomLevels){
va=this.spec.numZoomLevels-1}
else if(va<0){
va=0}
var ve=this.zoomLevel;
if(va!=ve){
var G=this.getCenterLatLng();
this.centerAndZoom(G,va)}
}

;
c.prototype.toggleTileBorders=function(){
if(this.tileImages){
for(var a=0;
a<this.tileImages.length;
a++){
if(this.tileImages[a]){
for(var O=0;
O<this.tileImages[a].length;
O++){
var f=this.tileImages[a][O];
if(f.hasBorder){
f.style.border="0";
f.hasBorder=false}
else{
f.style.border="1px solid black";
f.hasBorder=true}
}
}
}
}
}

;
c.prototype.addOverlay=function(sa){
this.overlays.push(sa);
this.locations.clear();
for(var a=0;
a<this.overlays.length;
a++){
var sa=this.overlays[a];
if(sa.locations){
for(var O=0;
O<sa.locations.length;
O++){
var p=sa.locations[O];
if(p.icon.iconClass.name!="noicon"){
this.locations.push(p)}
}
}
}
this.locations.sort(c.orderLocations);
for(var a=0;
a<this.locations.length;
a++){
var p=this.locations[a];
if(!p.marker){
p.marker=this.createLocalMarker(p);
this.setMarkerPosition(p.marker,p.icon.iconClass,p.point)}
p.marker.icon.style.zIndex=10+a;
p.marker.transparentIcon.style.zIndex=30+a}
if(this.locations.length==1){
this.clearInfoWindowArgs(p.xml);
this.showInfoWindow(this.locations[0])}
}

;
function xb(fa,gc,qb,r,qc){
this.icon=fa;
this.transparentIcon=gc;
this.shadow=qb;
this.layer=[fa,gc,qb];
this.map=r;
this.mouseTarget=qc}

xb.prototype.addLayer=function(f){
this.layer.push(f)}

;
xb.prototype.setPosition=function(x,o){
for(var a=0;
a<this.layer.length;
++a){
this.layer[a].style.left=ja(x);
this.layer[a].style.top=ja(o)}
}

;
xb.prototype.appendTo=function(j){
for(var a=0;
a<this.layer.length;
++a){
j.appendChild(this.layer[a])}
}

;
xb.prototype.removeFrom=function(j){
for(var a=0;
a<this.layer.length;
++a){
j.removeChild(this.layer[a])}
}

;
xb.prototype.hide=function(){
for(var a=0;
a<this.layer.length;
++a){
this.layer[a].style.display="none"}
}

;
xb.prototype.show=function(){
for(var a=0;
a<this.layer.length;
++a){
this.layer[a].style.display=""}
}

;
xb.prototype.isVisible=function(){
return this.layer[0].style.display!="none"}

;
c.prototype.createLocalMarker=function(p){
var V=this.createLocationMarker(p.icon.image,p.icon.iconClass);
if(z.type==3){
var g=this;
V.mouseTarget.location=p;
V.mouseTarget.onmousedown=function(b){
return g.onIconMouseDown(this.location,b)}

}
else{
var g=this;
V.mouseTarget.onmousedown=function(b){
return g.onIconMouseDown(p,b)}

}
return V}

;
var of=0;
c.prototype.createLocationMarker=function(Hf,s){
var fa=l.create(Hf,s.width,s.height,0,0,10,false,"noprint");
var gc=l.create(Bj,s.width,s.height,0,0,30,false,"noprint");
var qb=l.create(s.shadowURL,s.shadowWidth,s.height,0,0,3,false,"noprint");
var Vg=z.type==2?"ff":"ie";
var Fg=bc.create(Hf.replace(/\.png$/,Vg+".gif"),s.width,s.height,0,0,10,false,"noscreen");
var hh=s.shadowURL.replace(/[^\/]*$/,"dithshadow.gif");
var Kh=bc.create(hh,s.shadowWidth,s.height,0,0,3,false,"noscreen");
var r=null;
var qc=gc;
if(z.type==2){
var Wf="map"+of;
of++;
r=document.createElement("map");
r.setAttribute("name",Wf);
var D=document.createElement("area");
D.setAttribute("shape","poly");
D.setAttribute("alt","");
D.setAttribute("coords",s.imageMap);
D.setAttribute("href","javascript:void(0)");
qc=D;
r.appendChild(D);
this.div.appendChild(r);
gc.setAttribute("usemap","#"+Wf)}
else{
N(qc,"pointer")}
var gd=new xb(fa,gc,qb,r,qc);
gd.addLayer(Fg);
if(z.type!=2){
gd.addLayer(Kh)}
gd.appendTo(this.div);
return gd}

;
c.prototype.clearOverlays=function(){
this.lastPageCenter=this.getCenterLatLng();
this.lastPageZoom=this.zoomLevel;
for(var a=0;
a<this.locations.length;
a++){
var p=this.locations[a];
p.marker.removeFrom(this.div);
if(p.marker.map)this.div.removeChild(p.marker.map);
p.marker=null}
this.closeInfoWindow();
this.overlays.clear();
this.locations.clear();
this.directions=null;
this.drawDirections(null,this.directionsDiv)}

;
c.prototype.getDivCoordinate=function(x,o,e){
if(!e)e=new q(0,0);
var ej=x-this.topLeftTile.x*this.spec.tileSize-this.tilePaddingOffset.width+this.currentPanOffset.width*this.spec.tileSize;
var wh=o-this.topLeftTile.y*this.spec.tileSize-this.tilePaddingOffset.height+this.currentPanOffset.height*this.spec.tileSize;
e.x=ej;
e.y=wh;
return e}

;
c.orderLocations=function(Mf,ef){
if(Mf.point.y>ef.point.y)return-1;
if(Mf.point.y<ef.point.y)return 1;
return 0}

;
c.prototype.repositionOverlays=function(){
for(var a=0;
a<this.locations.length;
a++){
var ob=this.locations[a];
this.setMarkerPosition(ob.marker,ob.icon.iconClass,ob.point)}
this.drawDirections(this.directions,this.directionsDiv,true);
if(!this.disablePopups){
this.repositionInfoWindow();
if(z.type!=1&&this.infoWindow.hasMask())this.addMarkersToInfoWindowMask()}
}

;
c.prototype.setMarkerPosition=function(V,s,xg){
var nc=this.spec.getBitmapCoordinate(xg.y,xg.x,this.zoomLevel);
var Yc=this.getDivCoordinate(nc.x,nc.y);
var x=Yc.x-s.pointCoord.x;
var o=Yc.y-s.pointCoord.y;
V.setPosition(x,o)}

;
c.prototype.loadVPageStr=function(td){
try{
var T=mf(td);
var J=tc.loadFromXML(T,null,null);
this.loadVPage(J,null,null)}
catch(b){
}
}

;
c.prototype.loadVPage=function(J,ng,Rh){
this.clearOverlays();
var G=ng?ng:J.center;
var X=Rh;
if(X==null&&J.viewSpan){
X=this.spec.getLowestZoomLevel(J.viewSpan,this.viewSize.width,this.viewSize.height)}
this.lastPageZoom=X;
this.lastPageCenter=G;
if(G){
if(!this.topLeftTile||X!=null&&X!=this.zoomLevel){
if(X==null)X=4;
this.centerAndZoom(G,X)}
else{
this.recenterOrPanToLatLng(G)}
}
for(var a=0;
a<J.overlays.length;
a++){
this.addOverlay(J.overlays[a])}
this.directions=J.directions;
this.drawDirections(this.directions,this.directionsDiv);
this.onStateChanged()}

;
c.prototype.registerKeyHandlers=function(M){
I(M,"keydown",this.eventHandler("onKeyPress"));
I(M,"keyup",this.eventHandler("onKeyUp"))}

;
c.prototype.onKeyPress=function(b){
if(this.ignoreKeyEvent(b)){
return true}
switch(b.keyCode){
case 38:case 40:case 37:case 39:this.panKeys.add(b.keyCode);
this.startContinuousPan();
return false;
case 34:this.pan(0,-Math.floor(this.viewSize.height*0.75));
return false;
case 33:this.pan(0,Math.floor(this.viewSize.height*0.75));
return false;
case 36:this.pan(Math.floor(this.viewSize.width*0.75),0);
return false;
case 35:this.pan(-Math.floor(this.viewSize.width*0.75),0);
return false;
case 187:case 107:this.zoomTo(this.zoomLevel-1);
return false;
case 189:case 109:this.zoomTo(this.zoomLevel+1);
return false}
switch(b.which){
case 61:case 43:this.zoomTo(this.zoomLevel-1);
return false;
case 45:case 95:this.zoomTo(this.zoomLevel+1);
return false}
return true}

;
c.prototype.onKeyUp=function(b){
switch(b.keyCode){
case 38:case 40:case 37:case 39:this.panKeys.remove(b.keyCode);
return false}
}

;
c.prototype.ignoreKeyEvent=function(b){
if(b.ctrlKey||(b.altKey||b.metaKey)){
return true}
if(b.target&&(b.target.nodeName=="INPUT"&&b.target.getAttribute("type").toLowerCase()=="text"||b.target.nodeName=="TEXTAREA")){
return true}
return false}

;
c.prototype.startContinuousPan=function(){
if(!this.topLeftTile){
return}
this.cancelPan();
if(!this.continuousPanTimeout){
this.panSiner=new wc(100);
this.continuousPanTimeout=this.setTimeout("this.doContinuousPan()",5)}
}

;
c.prototype.doContinuousPan=function(){
if(this.panKeys.size>0){
var qe=(this.panKeys.contains(37)?1:0)+(this.panKeys.contains(39)?-1:0);
var Te=(this.panKeys.contains(38)?1:0)+(this.panKeys.contains(40)?-1:0);
var pb=1;
if(this.panSiner.more()){
pb=this.panSiner.next()}
var Cb=qe>0?Math.floor:Math.ceil;
var Ga=Cb(7*pb*qe+5*qe);
Cb=Te>0?Math.floor:Math.ceil;
var Ka=Cb(7*pb*Te+5*Te);
this.dragObject.moveTo(this.dragObject.left+Ga,this.dragObject.top+Ka);
this.onMove();
this.rotateTiles();
this.continuousPanTimeout=this.setTimeout("this.doContinuousPan()",10)}
else{
this.continuousPanTimeout=null;
this.onStateChanged()}
}

;
c.prototype.onWindowBlur=function(b){
if(this.panKeys.size>0){
this.panKeys=new Sc()}
}

;
c.prototype.onIconMouseDown=function(p,b){
P(b);
if(this.onmousedown)this.onmousedown();
this.clearInfoWindowArgs(p.xml);
this.showInfoWindow(p)}

;
c.prototype.clearInfoWindowArgs=function(T){
T.setAttribute("arg0","");
T.setAttribute("arg1","");
T.setAttribute("arg2","")}

;
c.prototype.infoWindowNavigate=function(Qh,Af,yg,Jf){
if(!this.openLocation||this.disablePopups)return;
if(Af)this.openLocation.xml.setAttribute("arg0",Af);
if(yg)this.openLocation.xml.setAttribute("arg1",yg);
if(Jf)this.openLocation.xml.setAttribute("arg2",Jf);
this.onInfoWindowLoad=Qh;
this.showInfoWindow(this.openLocation)}

;
c.prototype.showInfoWindow=function(p){
if(this.disablePopups)return;
if(!p.infoStyle)return;
this.openLocation=p;
var ea=this.spec.getBitmapCoordinate(p.point.y,p.point.x,this.zoomLevel);
var Ja=this.getDivCoordinate(ea.x,ea.y);
this.infoWindow.point=p.point;
this.infoWindow.iconClass=p.icon.iconClass;
var g=this;
var Xg=function(){
g.showSizedInfoWindow(Ja.x,Ja.y,p.icon.iconClass)}

;
Od(p,this.infoWindow.offscreenArea,p.infoStyle,Xg,null,p.toHTML)}

;
c.prototype.addMarkersToInfoWindowMask=function(){
if(this.disablePopups||(!this.infoWindow.isVisible()||!this.infoWindow.point))return;
this.infoWindow.clearMaskMap();
var Ta=new q(this.infoWindow.getOffsetLeft(),this.infoWindow.getOffsetTop());
var Eb=new q(Ta.x+this.infoWindow.getTotalWidth(),Ta.y+this.infoWindow.getTotalHeight());
for(var a=0;
a<this.locations.length;
a++){
var V=this.locations[a].marker;
if(V.icon.offsetTop>Eb.y)break;
this.addMarkerToInfoWindowMask(Ta,Eb,V)}
if(this.directionsMarkersAreVisible()){
this.addMarkerToInfoWindowMask(Ta,Eb,this.directionsStart);
this.addMarkerToInfoWindowMask(Ta,Eb,this.directionsEnd)}
}

;
c.prototype.addMarkerToInfoWindowMask=function(Ta,Eb,V){
var fa=V.icon;
if(fa.offsetLeft+fa.width>=Ta.x&&(fa.offsetLeft<=Eb.x&&(fa.offsetTop+fa.height>=Ta.y&&fa.offsetTop<=Eb.y))){
var Me=L.get("local").translateImageMapArray(fa.offsetLeft-Ta.x,fa.offsetTop-Ta.y);
this.infoWindow.addAreaToMaskMap(Me,V.mouseTarget.onmousedown)}
}

;
c.prototype.showSizedInfoWindow=function(x,o,s,Ed){
Ma.invalidate("infoWindowOffscreen");
var Ue=Ma.create("infoWindowOffscreen");
this.infoWindow.prepareOffscreen();
var r=this;
var Oi=function(){
if(Ue.isValid()){
r.infoWindow.flipOffscreenArea();
r.infoWindow.sizeToContent(Ed);
r.infoWindow.positionAt(x,o,s);
if(z.type!=1&&r.infoWindow.hasMask()){
r.addMarkersToInfoWindowMask()}
r.infoWindow.show();
r.panToInfoWindow();
if(r.onInfoWindowLoad){
r.onInfoWindowLoad();
r.onInfoWindowLoad=null}
}
}

;
window.setTimeout(Oi,0)}

;
c.prototype.showMapBlowup=function(k,s){
if(this.disablePopups)return;
var ea=this.spec.getBitmapCoordinate(k.y,k.x,this.zoomLevel);
var Ja=this.getDivCoordinate(ea.x,ea.y);
this.infoWindow.point=k;
this.infoWindow.iconClass=s?s:L.get("noicon");
var Y=document.createElement("div");
Y.style.border="1px solid silver";
Y.style.width="200px";
Y.style.height="200px";
var Nd=new c(Y,this.spec,200,200,true,true,this.mapTypes,true);
Nd.directions=this.directions;
Nd.centerAndZoom(k,1);
this.infoWindow.clearOffscreenArea();
this.infoWindow.offscreenArea.appendChild(Y);
if(this.mapTypes.length>1){
var Db=document.createElement("div");
Db.style.marginTop="5px";
Db.style.fontSize="small";
Nd.createSpecToggleLinks(Db);
this.infoWindow.offscreenArea.appendChild(Db)}
this.showSizedInfoWindow(Ja.x,Ja.y,this.infoWindow.iconClass,203);
return Nd}

;
c.prototype.createSpecToggleLinks=function(Db){
var af=new Array();
for(var a=0;
a<this.mapTypes.length;
a++){
var ia=this.mapTypes[a];
var Sa=this.createSpecChangeLink(ia);
af.push(Sa);
Db.appendChild(Sa);
if(a<this.mapTypes.length-1){
Db.appendChild(document.createTextNode(" - "))}
}
var g=this;
this.onspecificationchange=function(ae,Qa){
for(var a=0;
a<g.mapTypes.length;
a++){
var ia=g.mapTypes[a];
var Sa=af[a];
if(Qa==ia){
Sa.className="selected"}
else{
Sa.className=null}
}
if(z.type==1){
g.setTimeout("this.reconfigureAllImages()",0)}
}

;
this.onspecificationchange(null,this.spec)}

;
c.prototype.createSpecChangeLink=function(ia){
var g=this;
var Uh=function(){
g.switchSpecification(ia)}

;
return di(ia.getLinkText(),Uh)}

;
c.prototype.onInfoCloseClick=function(b){
this.closeInfoWindow()}

;
c.prototype.closeInfoWindow=function(){
if(!this.disablePopups){
this.infoWindow.hide();
if(this.oninfowindowclose)this.oninfowindowclose()}
}

;
c.prototype.panToInfoWindow=function(){
if(this.disablePopups){
return}
var ea=this.spec.getBitmapCoordinate(this.infoWindow.point.y,this.infoWindow.point.x,this.zoomLevel);
var Ja=this.getDivCoordinate(ea.x,ea.y);
var xa=new q(this.centerBitmap.x,this.centerBitmap.y);
var S=this.infoWindow.left+(ea.x-Ja.x);
var top=this.infoWindow.top+(ea.y-Ja.y);
var Eg=Math.floor(this.viewSize.width/2);
var Xd=Math.floor(this.viewSize.height/2);
xa.y=Math.min(xa.y,top+Xd-25);
xa.y=Math.max(xa.y,ea.y-Xd+25);
var Ec=25;
var rg=ea.y-this.infoWindow.getTotalHeightAboveGround()-(xa.y-Xd);
if(rg<55)Ec=Ec+50;
else if(rg<295)Ec=Ec+35;
xa.x=Math.min(xa.x,S+Eg-Ec);
xa.x=Math.max(xa.x,S+this.infoWindow.getTotalWidth()-Eg+25);
this.centerLatLng=null;
this.recenterOrPanToBitmap(xa)}

;
c.prototype.repositionInfoWindow=function(){
if(this.disablePopups||(!this.infoWindow.isVisible()||!this.infoWindow.point))return;
var k=this.infoWindow.point;
var ea=this.spec.getBitmapCoordinate(k.y,k.x,this.zoomLevel);
var Ja=this.getDivCoordinate(ea.x,ea.y);
this.infoWindow.positionAt(Ja.x,Ja.y,this.infoWindow.iconClass)}

;
var Ji=new q(0,0);
var Oe=new q(0,0);
c.prototype.getVMLPathString=function(B){
Q.start("Map","getVMLPathString");
var u=new Array();
u.push("m");
u.push(B.polyline.points[0]);
u.push(B.polyline.points[1]);
u.push("l");
u=u.concat(B.polyline.points);
for(var a=0;
a<B.segments.length;
a++){
var da=B.segments[a].pointIndex<<1;
var Ld=da+4;
var yf=u[Ld];
var ug=u[Ld+1];
u[Ld]=yf+" "+ug+" e m";
u[Ld+1]=yf+" "+ug+" l"}
u.push("e");
var str=u.join(" ");
Q.end("Map","getVMLPathString");
return str}

;
c.prototype.createRawVML=function(Re,j,d){
Q.start("Map","createRawVML");
var Fa;
if(!d){
d=document.createElement("v:shape");
Fa=document.createElement("v:stroke");
d.appendChild(Fa);
d.path=Re}
else{
j.removeChild(d);
Fa=d.firstChild}
var Tb=this.centerBitmap;
var Uc=this.getDivCoordinate(Tb.x,Tb.y,Oe);
d.unselectable="on";
d.strokecolor="blue";
d.strokeweight=5;
d.fill=false;
d.filled=false;
var i=100;
var n=100;
d.style.position="absolute";
d.style.width=i+"px";
d.style.height=n+"px";
d.style.left=Uc.x+"px";
d.style.top=Uc.y-n+"px";
d.style.rotation="-90";
var kd=this.getCenterLatLng();
var pe=kd.y*100000+" "+kd.x*100000;
d.coordorigin=pe;
var zf=this.spec.getPixelsPerDegree(this.zoomLevel);
d.coordsize=100000*n/zf.y+" "+100000*i/zf.x;
Fa.joinstyle="round";
Fa.endcap="round";
Fa.opacity=0.45;
Q.end("Map","createRawVML");
j.appendChild(d);
return d}

;
c.prototype.getBitmapVectors=function(Bb,v,F){
if(!v)v=new Array();
if(!F)F=new ba();
F.minX=W;
F.minY=W;
F.maxX=-W;
F.maxY=-W;
for(var a=0;
a<Bb.length;
){
var mb=Bb[a++];
var zb=Bb[a++];
var qa=this.spec.getBitmapCoordinate(mb,zb,this.zoomLevel,Ji);
qa.x=Math.round(qa.x);
qa.y=Math.round(qa.y);
v.push(qa.x);
v.push(qa.y);
if(qa.x<F.minX)F.minX=qa.x;
if(qa.y<F.minY)F.minY=qa.y;
if(qa.x>F.maxX)F.maxX=qa.x;
if(qa.y>F.maxY)F.maxY=qa.y}
return v}

;
c.prototype.getVectorPath=function(v,F){
var u=new Array();
var Ic;
var Hc;
for(var a=0;
a<v.length;
){
var Fb=v[a++];
var Jb=v[a++];
var fc=v[a++];
var Zb=v[a++];
if(Jb!=Ic||Fb!=Hc){
u.push("m");
u.push(Fb);
u.push(Jb);
u.push("l")}
u.push(fc);
u.push(Zb);
Ic=Zb;
Hc=fc}
u.push("e");
return u.join(" ")}

;
c.prototype.getEncodedImageSource=function(v,F){
var u=new Array();
var Hc;
var Ic;
for(var a=0;
a<v.length;
){
var Fb=v[a++];
var Jb=v[a++];
var fc=v[a++];
var Zb=v[a++];
if(Fb==fc&&Jb==Zb){
continue}
if(Fb!=Hc||Jb!=Ic){
if(u.length>0){
lc(9999,u)}
lc(Fb-F.minX,u);
lc(Jb-F.minY,u)}
lc(fc-Fb,u);
lc(Zb-Jb,u);
Ic=Zb;
Hc=fc}
lc(9999,u);
return u.join("")}

;
c.prototype.createVectorSegments=function(Ub,cc,cb,pa){
Q.start("Map","createVectorSegments");
var Bb=Ub.getVectors(cc,cb);
var v=new Array();
var oa=new ba();
this.getBitmapVectors(Bb,v,oa);
if(!pa){
pa=new ba()}
var Oa=new ba(Math.max(pa.minX,oa.minX),Math.max(pa.minY,oa.minY),Math.min(pa.maxX,oa.maxX),Math.min(pa.maxY,oa.maxY));
var d;
if(v.length>0){
var Tb=this.centerBitmap;
var Uc=this.getDivCoordinate(Tb.x,Tb.y,Oe);
d=document.createElement("v:shape");
d.unselectable="on";
d.strokecolor="blue";
d.strokeweight=5;
d.fill=false;
d.filled=false;
var i=1;
var n=1;
d.style.position="absolute";
d.style.width=i+"px";
d.style.height=n+"px";
d.style.left=Uc.x+"px";
d.style.top=Uc.y+"px";
var pe=Tb.x+" "+Tb.y;
d.coordorigin=pe;
d.coordsize=i+" "+n;
d.path=this.getVectorPath(v,Oa);
var Fa=document.createElement("v:stroke");
Fa.joinstyle="round";
Fa.endcap="round";
Fa.opacity=0.45;
d.appendChild(Fa)}
else{
d=document.createElement("div")}
d.sourceBounds=pa;
Q.end("Map","createVectorSegments");
return d}

;
c.prototype.createImageSegments=function(Ub,cc,cb,pa){
Q.start("Map","createImageSegments");
var u;
var Oa;
do{
var Bb=Ub.getVectors(cc,cb);
var v=new Array();
var oa=new ba();
this.getBitmapVectors(Bb,v,oa);
oa.minX-=10;
oa.minY-=10;
oa.maxX+=10;
oa.maxY+=10;
if(!pa){
pa=new ba()}
Oa=new ba(Math.max(pa.minX,oa.minX),Math.max(pa.minY,oa.minY),Math.min(pa.maxX,oa.maxX),Math.min(pa.maxY,oa.maxY));
u=this.getEncodedImageSource(v,Oa);
++cb}
while(u.length>900);
var d;
if(u.length>0){
var Sf=this.getDivCoordinate(Oa.minX,Oa.minY,Oe);
var i=Math.ceil(Oa.maxX-Oa.minX);
var n=Math.ceil(Oa.maxY-Oa.minY);
var M="http://www.google.com/maplinedraw?width="+i+"&height="+n+"&path="+u;
Sd('<a href="'+ib(M)+'">'+Ob(M)+"</a>",0);
if(z.type!=1){
i=null;
n=null}
var Ia=z.type==2?"noprint":null;
d=l.create(M,i,n,Sf.x,Sf.y,0,false,Ia)}
else{
d=document.createElement("div")}
d.sourceBounds=pa;
Q.end("Map","createImageSegments");
return d}

;
c.prototype.drawDirections=function(B,U,Bi){
if(!B&&!U.directions)return;
var Ug=this.getBoundsBitmap();
var na=U.directionsBounds;
if(!Bi){
if(B==U.directions){
if(na.containsBounds(Ug)){
return}
}
}
if(U.directions!=B){
while(U.hasChildNodes()){
U.removeChild(U.lastChild)}
U.directions=B;
if(this.useRawVml&&(B&&(z.type==1&&(!this.forceImageSegments&&B.polyline.points.length<16000)))){
var Re=this.getVMLPathString(B);
U.path=Re}
else{
U.path=null}
}
if(B){
Q.start("Map","drawDirections");
var d=null;
var uf=900;
var i=Math.min(this.viewSize.width,uf);
var n=Math.min(this.viewSize.height,uf);
if(z.type==1&&!this.forceImageSegments){
i=5000;
n=5000}
na.minX=this.centerBitmap.x-i;
na.minY=this.centerBitmap.y-n;
na.maxX=this.centerBitmap.x+i;
na.maxY=this.centerBitmap.y+n;
var Ha=this.spec.getLatLng(na.minX,na.minY,this.zoomLevel);
var Da=this.spec.getLatLng(na.maxX,na.maxY,this.zoomLevel);
var cc=new ba(Ha.x,Da.y,Da.x,Ha.y);
if(U.path){
d=null;
if(U.hasChildNodes()){
d=U.firstChild}
d=this.createRawVML(U.path,U,d)}
else{
while(U.hasChildNodes()){
U.removeChild(U.lastChild)}
var cb=0;
var Aa=new ca(B.polyline.minTolerance,B.polyline.minTolerance);
while(cb<B.polyline.numLevels){
Aa.width*=B.polyline.zoomFactor;
Aa.height*=B.polyline.zoomFactor;
if(this.zoomLevel<this.spec.getLowestZoomLevel(Aa,2,2)){
break}
++cb}
if(z.type==1&&!this.forceImageSegments){
d=this.createVectorSegments(B.polyline,cc,cb,na)}
else{
d=this.createImageSegments(B.polyline,cc,cb,na)}
U.appendChild(d)}
d.style.zIndex=2;
this.drawDirectionsMarkers();
this.setDirectionIndicatorPos();
Q.end("Map","drawDirections")}
else{
na.minX=-W;
na.minY=-W;
na.maxX=W;
na.maxY=W;
this.hideDirectionsMarkers()}
}

;
var ti=m+"dd-start.png";
var Nh=m+"dd-end.png";
c.prototype.drawDirectionsMarkers=function(){
if(!this.directionsStart||!this.directionsEnd){
this.directionsStart=this.createLocationMarker(ti,L.get("local"));
this.directionsEnd=this.createLocationMarker(Nh,L.get("local"));
var g=this;
this.directionsStart.mouseTarget.onmousedown=function(b){
P(b);
g.showDirectionsStart()}

;
this.directionsEnd.mouseTarget.onmousedown=function(b){
P(b);
g.showDirectionsEnd()}

}
this.setMarkerPosition(this.directionsStart,L.get("local"),this.directions.polyline.getPoint(0));
var Wb=(this.directions.polyline.points.length>>1)-1;
this.setMarkerPosition(this.directionsEnd,L.get("local"),this.directions.polyline.getPoint(Wb));
this.directionsStart.show();
this.directionsEnd.show();
var de=0;
var te=0;
if(this.directions.polyline.getPoint(0).y<this.directions.polyline.getPoint(Wb).y){
de=1}
else{
te=1}
this.directionsStart.icon.style.zIndex=10+de;
this.directionsStart.transparentIcon.style.zIndex=30+de;
this.directionsEnd.icon.style.zIndex=10+te;
this.directionsEnd.transparentIcon.style.zIndex=30+te}

;
c.prototype.showDirectionsStart=function(){
if(!this.directions)return;
this.showMapBlowup(this.directions.polyline.getPoint(0),L.get("local"))}

;
c.prototype.showDirectionsEnd=function(){
if(!this.directions)return;
var Wb=(this.directions.polyline.points.length>>1)-1;
this.showMapBlowup(this.directions.polyline.getPoint(Wb),L.get("local"))}

;
c.prototype.showDirectionsStep=function(ic){
if(!this.directions)return;
var k=this.directions.polyline.getPoint(ic.pointIndex);
var Lb=this.showMapBlowup(k);
if(ic.pointIndex!=0){
var Pa=Lb.getDirIndicatorAngle(ic.pointIndex);
var Aj=Lb.getDirIndicatorPath(Pa);
var V=l.create(Aj,24,24,0,0,2,false);
Lb.directionMarker=V;
Lb.directionMarkerAngle=Pa;
Lb.directionMarkerPoint=k;
Lb.setDirectionIndicatorPos();
Lb.div.appendChild(V)}
}

;
c.prototype.setDirectionIndicatorPos=function(){
var V=this.directionMarker;
if(!V)return;
var Pa=this.directionMarkerAngle;
var k=this.directionMarkerPoint;
var pc=12*Math.cos(Pa);
var Jc=12*Math.sin(Pa);
pc=Math.floor(-12-pc);
Jc=Math.floor(-12-Jc);
var nc=this.spec.getBitmapCoordinate(k.y,k.x,this.zoomLevel);
var Yc=this.getDivCoordinate(nc.x,nc.y);
V.style.left=ja(Yc.x+pc);
V.style.top=ja(Yc.y+Jc)}

;
c.prototype.getDirIndicatorAngle=function(da){
var Pa=0;
if(da>1){
var wa=this.directions.polyline.getPoint(da-2);
var za=this.directions.polyline.getPoint(da);
wa=this.spec.getBitmapCoordinate(wa.y,wa.x,this.zoomLevel);
za=this.spec.getBitmapCoordinate(za.y,za.x,this.zoomLevel);
Pa=Math.atan2(za.y-wa.y,za.x-wa.x)}
return Pa}

;
var tj=m+"dir_";
c.prototype.getDirIndicatorPath=function(Pa){
var xc=Math.round(Pa*60/Math.PI)*3+90;
while(xc>=120)xc-=120;
while(xc<0)xc+=120;
var M=tj+xc+".png";
return M}

;
c.prototype.hideDirectionsMarkers=function(){
if(this.directionsStart&&this.directionsEnd){
this.directionsStart.hide();
this.directionsEnd.hide()}
}

;
c.prototype.directionsMarkersAreVisible=function(){
return this.directionsStart&&(this.directionsEnd&&(this.directionsStart.isVisible()&&this.directionsEnd.isVisible()))}

;
c.prototype.createMapControl=function(){
var E=document.createElement("div");
this.createPanningControls(E);
this.createZoomControls(E);
this.createZoomSlider(E);
return E}

;
c.prototype.createSmallMapControl=function(){
var E=document.createElement("div");
this.createSmallPanningControls(E);
this.createSmallZoomControls(E);
return E}

;
var Ki=m+"zoom-plus.png";
var Di=m+"zoom-minus.png";
var Hi=m+"sliderbar.png";
var ii=m+"slider.png";
c.prototype.createZoomControls=function(E){
var g=this;
var eb=l.create(Ki,17,17,20,70,1,false);
N(eb,"pointer");
I(eb,"click",function(b){
g.zoomTo(g.zoomLevel-1);
P(b)}

);
eb.title=_mZoomIn;
E.appendChild(eb);
var fb=l.create(Di,17,17,20,260,1,false);
N(fb,"pointer");
I(fb,"click",function(b){
g.zoomTo(g.zoomLevel+1);
P(b)}

);
fb.title=_mZoomOut;
E.appendChild(fb)}

;
var Mh=m+"center.png";
var Ti=m+"east.png";
var Ci=m+"west.png";
var Gg=m+"north.png";
var Qi=m+"south.png";
var mj=m+"panshadow.png";
c.prototype.createPanningControls=function(E){
var g=this;
var qb=l.create(mj,59,64,0,0,0,false);
E.appendChild(qb);
var Xa=l.create(Gg,17,17,20,0,1,false);
N(Xa,"pointer");
I(Xa,"click",function(b){
g.pan(0,Math.floor(g.viewSize.height*0.5));
P(b)}

);
Xa.title=_mPanNorth;
E.appendChild(Xa);
var Ya=l.create(Ti,17,17,40,20,1,false);
N(Ya,"pointer");
I(Ya,"click",function(b){
g.pan(-Math.floor(g.viewSize.width*0.5),0);
P(b)}

);
Ya.title=_mPanEast;
E.appendChild(Ya);
var jb=l.create(Qi,17,17,20,40,1,false);
N(jb,"pointer");
I(jb,"click",function(b){
g.pan(0,-Math.floor(g.viewSize.height*0.5));
P(b)}

);
jb.title=_mPanSouth;
E.appendChild(jb);
var db=l.create(Ci,17,17,0,20,1,false);
N(db,"pointer");
I(db,"click",function(b){
g.pan(Math.floor(g.viewSize.width*0.5),0);
P(b)}

);
db.title=_mPanWest;
E.appendChild(db);
var G=l.create(Mh,17,17,20,20,1,false);
N(G,"pointer");
I(G,"click",function(b){
if(g.lastPageCenter){
if(g.lastPageZoom!=g.zoomLevel){
g.centerAndZoom(g.lastPageCenter,g.lastPageZoom)}
else{
g.recenterOrPanToLatLng(g.lastPageCenter)}
}
else if(g.lastLatLng){
g.recenterOrPanToLatLng(this.map.lastLatLng)}
P(b)}

);
G.title=_mLastResult;
E.appendChild(G)}

;
var Ch=m+"slidershadow.png";
c.prototype.createZoomSlider=function(E){
var qb=l.create(Ch,19,215,20,64,0,false);
E.appendChild(qb);
var ab=document.createElement("div");
ab.style.position="absolute";
ab.style.left="21px";
ab.style.top="90px";
ab.style.width="15px";
ab.style.height="167px";
var Vd=l.create(Hi,15,167,0,0,1,false);
ab.appendChild(Vd);
var Rc=-1*Math.floor(3.5)+1;
var Fe=l.create(ii,22,14,Rc,this.getRelativeZoomSliderPos(),2,false);
Fe.title=_mZoomDrag;
ab.appendChild(Fe);
E.appendChild(ab);
var F=new ba(Rc,1,Rc+22,166);
var ie=new gb(Fe,Rc,this.getRelativeZoomSliderPos(),F);
this.onzoom=function(){
ie.moveTo(Rc,g.getRelativeZoomSliderPos())}

;
var g=this;
ie.ondragend=function(){
var gj=ie.top+Math.floor(5.5);
g.zoomTo(g.getZoomFromRelativeCoord(gj))}

;
N(Vd,"pointer");
Vd.title=_mZoomSet;
I(Vd,"click",function(b){
var o;
if(window.event){
o=window.event.offsetY}
else{
var Kd=ld(ab);
o=b.pageY-Kd.y-2}
P(b);
g.zoomTo(g.getZoomFromRelativeCoord(o))}

)}

;
c.prototype.getRelativeZoomSliderPos=function(){
return 1+this.zoomLevel*11}

;
c.prototype.getZoomFromRelativeCoord=function(o){
var X=Math.floor((o-1)/11);
return Math.max(0,Math.min(this.spec.numZoomLevels-1,X))}

;
c.prototype.showCopyright=function(){
var Ee=this.createCopyright(_mGoogleCopy);
Ee.style.left="3px";
Ee.style.bottom="3px";
this.container.appendChild(Ee);
var ce=this.createCopyright(_mDataCopy);
ce.style.right="3px";
ce.style.bottom="3px";
this.container.appendChild(ce)}

;
c.prototype.createCopyright=function(aa){
var j=document.createElement("div");
j.style.position="absolute";
N(j,"default");
j.unselectable="on";
j.onselectstart=Fc;
j.innerHTML=aa;
j.style.fontSize="11px";
j.style.fontFamily="Arial, sans serif";
j.style.MozUserSelect="none";
return j}

;
var Gh=m+"east-mini.png";
var ni=m+"west-mini.png";
var Oh=m+"north-mini.png";
var si=m+"south-mini.png";
var ei=m+"zoom-plus-mini.png";
var Qg=m+"zoom-minus-mini.png";
c.prototype.createSmallPanningControls=function(E){
var g=this;
var Xa=l.create(Oh,18,18,9,0,1,false);
N(Xa,"pointer");
I(Xa,"click",function(b){
g.pan(0,Math.floor(g.viewSize.height*0.5));
P(b)}

);
Xa.title=_mPanNorth;
E.appendChild(Xa);
var Ya=l.create(Gh,18,18,18,18,1,false);
N(Ya,"pointer");
I(Ya,"click",function(b){
g.pan(-Math.floor(g.viewSize.width*0.5),0);
P(b)}

);
Ya.title=_mPanEast;
E.appendChild(Ya);
var jb=l.create(si,18,18,9,36,1,false);
N(jb,"pointer");
I(jb,"click",function(b){
g.pan(0,-Math.floor(g.viewSize.height*0.5));
P(b)}

);
jb.title=_mPanSouth;
E.appendChild(jb);
var db=l.create(ni,18,18,0,18,1,false);
N(db,"pointer");
I(db,"click",function(b){
g.pan(Math.floor(g.viewSize.width*0.5),0);
P(b)}

);
db.title=_mPanWest;
E.appendChild(db)}

;
c.prototype.createSmallZoomControls=function(E){
var g=this;
var eb=l.create(ei,18,18,9,57,1,false);
N(eb,"pointer");
I(eb,"click",function(b){
g.zoomTo(g.zoomLevel-1);
P(b)}

);
eb.title=_mZoomIn;
E.appendChild(eb);
var fb=l.create(Qg,18,18,9,75,1,false);
N(fb,"pointer");
I(fb,"click",function(b){
g.zoomTo(g.zoomLevel+1);
P(b)}

);
fb.title=_mZoomOut;
E.appendChild(fb)}

;
function Qc(r){
this.anchorLevel=null;
this.anchor=new q(0,0);
this.spec=null;
this.span=new ca(W,W);
this.points=null;
this.map=r;
this.map.addStateListener(this);
this.map.onresize=this.eventHandler("onMapResize")}

Qc.prototype.onMapStateChanged=function(){
if(this.anchorLevel!=this.map.zoomLevel||this.spec!=this.map.spec){
this.reset();
this.addPoint(0,0,true);
return}
var G=this.map.getCenterLatLng();
var zd=Math.round((G.x-this.anchor.x)/this.span.width);
var Td=Math.round((G.y-this.anchor.y)/this.span.height);
this.addPoint(zd,Td,true)}

;
Qc.prototype.onMapResize=function(){
this.reset();
this.addPoint(0,0,false)}

;
Qc.prototype.reset=function(){
this.map.getCenterLatLng(this.anchor);
this.map.getSpanLatLng(this.span);
this.spec=this.map.spec;
this.anchorLevel=this.map.zoomLevel;
this.points=new Object()}

;
Qc.prototype.addPoint=function(zd,Td,bi){
var str=zd+","+Td;
if(this.points[str])return;
this.points[str]=1;
if(bi){
var A=new ua();
A.setAllMapValues(this.map);
var yi=new q(this.anchor.x+zd*this.span.width,this.anchor.y+Td*this.span.height);
A.setValue("vp",A.getLatLngArg(yi));
var ha=A.getURL(true);
Sd('<a href="'+ib(ha)+'">'+Ob(ha)+"</a>",0);
if(!this.sender){
this.sender=document.createElement("img");
this.sender.style.position="absolute";
this.sender.style.visibility="hidden";
this.sender.style.top=ja(-10);
this.sender.style.left=ja(-10);
this.sender.style.width=ja(1);
this.sender.style.height=ja(1);
document.body.appendChild(this.sender)}
this.sender.src=ha}
}

;
function gb(M,S,top,Y){
this.src=M;
this.container=Y;
this.ondragstart=null;
this.ondrag=null;
this.ondragend=null;
this.onmove=null;
this.onclick=null;
this.disabled=false;
this.dragPoint=new q(0,0);
this.clickStartPos=new q(0,0);
this.src.style.position="absolute";
this.moveTo(S,top);
this.mouseDownHandler=this.eventHandler("onMouseDown");
this.mouseMoveHandler=this.eventHandler("onMouseMove");
this.mouseUpHandler=this.eventHandler("onMouseUp");
if(z.type==2){
I(window,"mouseout",this.eventHandler("onWindowMouseOut"))}
this.eventSrc=this.src.setCapture?this.src:window;
I(this.src,"mousedown",this.mouseDownHandler)}

gb.prototype.moveTo=function(S,top){
if(this.left!=S||this.top!=top){
this.left=S;
this.top=top;
this.src.style.left=this.left+"px";
this.src.style.top=this.top+"px";
if(this.onmove){
this.onmove()}
}
}

;
gb.prototype.onMouseDown=function(b){
if(b.cancelDrag){
return}
var fj=b.button==0||b.button==1;
if(this.disabled||!fj){
P(b);
return false}
this.dragPoint.x=b.screenX;
this.dragPoint.y=b.screenY;
I(this.eventSrc,"mousemove",this.mouseMoveHandler);
I(this.eventSrc,"mouseup",this.mouseUpHandler);
if(this.src.setCapture){
this.src.setCapture()}
this.clickStartTime=(new Date()).getTime();
this.clickStartPos.x=b.screenX;
this.clickStartPos.y=b.screenY;
if(this.ondragstart){
this.ondragstart(b)}
this.originalCursor=this.src.style.cursor;
N(this.src,"move");
P(b)}

;
gb.prototype.onMouseMove=function(b){
if(z.os==1){
if(b==null){
return}
if(this.dragDisabled){
this.savedMove=new Object();
this.savedMove.screenX=b.screenX;
this.savedMove.screenY=b.screenY;
return}
this.setTimeout("this.dragDisabled = false;
 this.onMouseMove(this.savedMove)",30);
this.dragDisabled=true;
this.savedMove=null}
var Ze=1;
if(z.type==3&&z.version==1){
Ze=-1}
var x=this.left+(b.screenX-this.dragPoint.x);
var o=this.top+(b.screenY-this.dragPoint.y)*Ze;
var Ga=0;
var Ka=0;
if(this.container){
var hd=x;
if(x<this.container.minX){
hd=this.container.minX}
else{
var Hd=this.container.maxX-this.src.offsetWidth;
if(x>Hd){
hd=Hd}
}
Ga=hd-x;
x=hd;
var vd=o;
if(o<this.container.minY){
vd=this.container.minY}
else{
var md=this.container.maxY-this.src.offsetHeight;
if(o>md)vd=md}
Ka=vd-o;
o=vd}
this.moveTo(x,o);
this.dragPoint.x=b.screenX+Ga;
this.dragPoint.y=b.screenY+Ka;
if(this.ondrag){
this.ondrag(b)}
}

;
gb.prototype.onMouseUp=function(b){
df(this.eventSrc,"mousemove",this.mouseMoveHandler);
df(this.eventSrc,"mouseup",this.mouseUpHandler);
N(this.src,this.originalCursor);
if(document.releaseCapture){
document.releaseCapture()}
if(this.ondragend){
this.ondragend(b)}
if(this.onclick){
var mi=(new Date()).getTime();
if(mi-this.clickStartTime<=500&&(Math.abs(this.clickStartPos.x-b.screenX)<=2&&Math.abs(this.clickStartPos.y-b.screenY)<=2)){
this.onclick(b)}
}
}

;
gb.prototype.onWindowMouseOut=function(b){
if(!b.relatedTarget){
this.onMouseUp(b)}
}

;
gb.prototype.disable=function(){
this.disabled=true}

;
gb.prototype.enable=function(){
this.disabled=false}

;
var Ke="centerlat";
var Le="centerlng";
function tc(wb,hb,dd,yd,G,fi,Zg,Ui,gh,D,xd,B,Kb,T){
this.query=wb;
this.title=hb;
this.error=dd;
this.spelling=yd;
this.center=G;
this.viewSpan=fi;
this.searchCenter=Zg;
this.searchSpan=Ui;
this.ads=gh;
this.area=D;
this.overlays=xd;
this.directions=B;
this.debug=Kb;
this.xml=T}

function yc(Pd,Wh,T){
this.locations=Pd;
this.panelStyle=Wh;
this.xml=T}

function od(K,k,fa,Jh,T){
this.id=K;
this.point=k;
this.icon=fa;
this.infoStyle=Jh;
this.xml=T}

function Se(f,s){
this.image=f;
this.iconClass=s}

function rc(Ub,sd,T){
this.polyline=Ub;
this.segments=sd;
this.xml=T}

function me(K,Ve,da){
this.id=K;
this.description=Ve;
this.pointIndex=da}

function L(w,i,n,th,lj,kh,wi,Ih,rh){
this.name=w;
this.width=i;
this.height=n;
this.pointCoord=th;
this.infoTipCoord=lj;
this.shadowTipCoord=kh;
this.shadowURL=wi;
this.shadowWidth=Ih;
this.imageMapArray=rh;
if(this.imageMapArray){
this.imageMap=this.imageMapArray.join(",")}
else{
this.imageMap=null}
}

L.prototype.translateImageMapArray=function(x,o){
var lb="";
for(var a=0;
a<this.imageMapArray.length;
a+=2){
lb+=this.imageMapArray[a]+x+","+(this.imageMapArray[a+1]+o)+(a<this.imageMapArray.length-2?",":"")}
return lb}

;
L.classes={
}
;
L.classNames=[];
L.getPadding=function(){
var C={
"width":0,"height":0}
;
for(var a=0;
a<this.classNames.length;
++a){
var Ba=this.classes[this.classNames[a]];
C.width=Math.max(C.width,Ba.width);
C.height=Math.max(C.height,Ba.height)}
return C}

;
L.load=function(s){
L.classes[s.name]=s;
L.classNames.push(s.name)}

;
L.get=function(w){
return L.classes[w]}

;
var Zh=[9,0,6,1,4,2,2,4,0,8,0,12,1,14,2,16,5,19,7,23,8,26,9,30,9,34,11,34,11,30,12,26,13,24,14,21,16,18,18,16,20,12,20,8,18,4,16,2,15,1,13,0];
L.load(new L("local",20,34,new q(9,34),new q(9,2),new q(17,23),m+"shadow50.png",37,Zh));
L.load(new L("noicon",0,0,new q(0,0),new q(0,0),new q(0,0),null,0,null));
tc.loadFromXML=function(d){
Q.start("Page","loadFromXML");
var wb=null;
var jg=d.getElementsByTagName("query");
if(jg.length>0){
wb=ka(jg[0])}
var hb=null;
var Ef=d.getElementsByTagName("title");
if(Ef.length>0){
hb=ka(Ef[0])}
var dd=null;
var lg=d.getElementsByTagName("error");
if(lg.length>0){
dd=lg[0]}
var yd=null;
var Ye=d.getElementsByTagName("spelling");
if(Ye.length>0){
yd=Ye[0]}
var G=null;
var oe=d.getElementsByTagName("center");
if(oe.length>0){
G=new q(parseFloat(oe[0].getAttribute("lng")),parseFloat(oe[0].getAttribute("lat")))}
var Aa=null;
var ee=d.getElementsByTagName("span");
if(ee.length>0){
Aa=new ca(parseFloat(ee[0].getAttribute("lng")),parseFloat(ee[0].getAttribute("lat")))}
var zg=null;
var De=d.getElementsByTagName("searchcenter");
if(De.length>0){
zg=new q(parseFloat(De[0].getAttribute("lng")),parseFloat(De[0].getAttribute("lat")))}
var Tf=null;
var je=d.getElementsByTagName("searchspan");
if(je.length>0){
Tf=new ca(parseFloat(je[0].getAttribute("lng")),parseFloat(je[0].getAttribute("lat")))}
var xd=new Array();
var Rf=d.getElementsByTagName("overlay");
for(var a=0;
a<Rf.length;
a++){
xd.push(yc.loadFromXML(Rf[a]))}
var B=null;
var pg=d.getElementsByTagName("directions");
if(pg.length>0){
B=rc.loadFromXML(pg[0])}
var Kb=null;
var Zf=d.getElementsByTagName("debug");
if(Zf.length>0){
Kb=ka(Zf[0])}
Q.end("Page","loadFromXML");
return new tc(wb,hb,dd,yd,G,Aa,zg,Tf,null,null,xd,B,Kb,d)}

;
yc.loadFromXML=function(d){
var Pd=new Array();
var lf=d.getElementsByTagName("location");
for(var a=0;
a<lf.length;
a++){
Pd.push(od.loadFromXML(lf[a]))}
return new yc(Pd,d.getAttribute("panelStyle"),d)}

;
yc.prototype.getLocationById=function(K){
for(var a=0;
a<this.locations.length;
a++){
if(this.locations[a].id==K)return this.locations[a]}
return null}

;
od.loadFromXML=function(d){
var kg=d.getElementsByTagName("point")[0];
var k=new q(parseFloat(kg.getAttribute("lng")),parseFloat(kg.getAttribute("lat")));
var vj=d.getElementsByTagName("icon")[0];
var fa=Se.loadFromXML(vj);
return new od(d.getAttribute("id"),k,fa,d.getAttribute("infoStyle"),d)}

;
Se.loadFromXML=function(d){
var s=L.get(d.getAttribute("class"));
if(s){
return new Se(d.getAttribute("image"),s)}
else{
return null}
}

;
rc.loadFromXML=function(d){
var Gd=d.getElementsByTagName("polyline")[0];
var Sh=ka(Gd.getElementsByTagName("points")[0]);
var be=ka(Gd.getElementsByTagName("levels")[0]);
var Ie=parseInt(Gd.getAttribute("numLevels"));
var fe=parseInt(Gd.getAttribute("zoomFactor"));
var Ub=new kc(Sh,be,Ie,fe);
var sd=new Array();
var Cj=d.getElementsByTagName("segments")[0];
var Bf=Cj.getElementsByTagName("segment");
for(var a=0;
a<Bf.length;
++a){
sd.push(me.loadFromXML(Bf[a]))}
return new rc(Ub,sd,d)}

;
rc.prototype.getSegmentById=function(K){
for(var a=0;
a<this.segments.length;
a++){
if(this.segments[a].id==K)return this.segments[a]}
return null}

;
me.loadFromXML=function(d){
var K=d.getAttribute("id");
var da=parseInt(d.getAttribute("pointIndex"));
var Ve=ka(d);
return new me(K,Ve,da)}

;
var dh=m+"iws_nw.png";
var uj=m+"iws_n.png";
var Li=m+"iws_ne.png";
var mh=m+"iws_e.png";
var eh=m+"iws_c.png";
var xi=m+"iws_w.png";
var oh=m+"iws_sw.png";
var Qf=m+"iws_s.png";
var ih=m+"iws_se.png";
var ch=m+"iws_tap.png";
var Xi=m+"iw_nw.png";
var Ai=m+"iw_n.png";
var Mi=m+"iw_ne.png";
var ph=m+"iw_e.png";
var vh=m+"iw_c.png";
var Fi=m+"iw_w.png";
var bj=m+"iw_sw.png";
var Nf=m+"iw_s.png";
var Lg=m+"iw_se.png";
var li=m+"iw_tap.png";
function t(Ri,aj,og,Wg,Ng){
this.oncloseclick=aj;
this.createWindow(Wg);
this.createShadow(Ng);
if(z.type!=1){
this.createMask()}
else{
this.maskPng=null}
this.createContentArea(Ri);
this.createCloseButton();
og.appendChild(this.windowDiv);
og.appendChild(this.shadowDiv);
this.setSize(208,69);
this.hide()}

t.prototype.setContentSize=function(i,n){
this.setSize(i-(this.window.w.width-15)*2,n-(this.window.n.height-15)*2)}

;
t.prototype.setSize=function(i,n){
if(i<0)i=0;
if(n<0)n=0;
this.width=i;
this.height=n;
this.setWindowSize(i,n);
this.setShadowSize(i,n);
if(this.hasMask())this.setMaskSize();
this.closeButton.style.left=this.getTotalWidth()-this.closeButton.width-10-1+"px";
this.closeButton.style.top="10px"}

;
t.prototype.getWindowHeight=function(){
return this.window.c.height+2*this.window.n.height}

;
t.prototype.getTotalHeight=function(){
return this.height+this.window.pointer.height+this.window.n.height}

;
t.prototype.getTotalHeightAboveGround=function(){
return this.getTotalHeight()+(this.iconClass.pointCoord.y-this.iconClass.infoTipCoord.y)}

;
t.prototype.getTotalShadowHeight=function(){
return Math.floor(this.height/4)+this.shadow.pointer.height+this.shadow.nw.height}

;
t.prototype.getTotalWidth=function(){
return this.width+this.window.w.width+this.window.e.width}

;
t.prototype.getOffsetLeft=function(){
return this.windowDiv.offsetLeft}

;
t.prototype.getOffsetTop=function(){
return this.windowDiv.offsetTop}

;
t.prototype.setWindowSize=function(i,n){
this.window.n.style.width=i+"px";
this.window.e.style.height=n+"px";
this.window.c.style.width=i+"px";
this.window.c.style.height=n+"px";
this.window.w.style.height=n+"px";
var Wa=this.calculatePointerOffset(i);
this.window.s1.style.width=Wa+"px";
this.window.pointer.style.left=Wa+this.window.sw.width+"px";
this.window.s2.style.left=Wa+this.window.pointer.width+this.window.sw.width+"px";
this.window.s2.style.width=i-Wa-this.window.pointer.width+"px";
var ec=i+this.window.w.width+"px";
this.window.ne.style.left=ec;
this.window.e.style.left=ec;
this.window.se.style.left=ec;
var Ea=n+this.window.n.height+"px";
this.window.sw.style.top=Ea;
this.window.s1.style.top=Ea;
this.window.pointer.style.top=Ea;
this.window.s2.style.top=Ea;
this.window.se.style.top=Ea}

;
t.prototype.setShadowSize=function(i,n){
i-=15;
var Mb=Math.floor(n/4);
var ec=i+this.shadow.nw.width;
var Wa=this.calculatePointerOffset(i)-41;
var Ea=Mb+this.shadow.n.height+"px";
var Wd=Mb+this.shadow.nw.height;
this.shadow.s1Div.style.width=Math.max(Wa,0)+"px";
this.shadow.pointer.style.left=Wa+this.shadow.sw.width+"px";
this.shadow.s2Div.style.left=Wa+this.shadow.pointer.width+this.shadow.sw.width+"px";
this.shadow.s2Div.style.width=i-Wa-this.shadow.pointer.width+"px";
this.shadow.sw.style.top=Ea;
this.shadow.s1Div.style.top=Ea;
this.shadow.pointer.style.top=Ea;
this.shadow.s2Div.style.top=Ea;
this.shadow.se.style.top=Ea;
this.shadow.se.style.left=ec+"px";
var Lf=this.shadow.nw.height;
var Yf=Math.floor(n/2);
this.shadow.wDiv.style.height=Mb+"px";
this.shadow.wDiv.style.left=Lf+"px";
this.shadow.wDiv.style.width=Yf+"px";
this.shadow.w.style.left=Mb-this.shadow.w.width+80+"px";
var Xf=this.shadow.nw.height+i+70;
this.shadow.eDiv.style.height=Mb+"px";
this.shadow.eDiv.style.left=Xf+"px";
this.shadow.eDiv.style.width=n+"px";
this.shadow.e.style.left=Mb-this.shadow.w.width+80+"px";
var kf=Lf+Yf;
this.shadow.cDiv.style.width=Xf-kf+"px";
this.shadow.cDiv.style.height=Mb+"px";
this.shadow.cDiv.style.left=kf+"px";
this.shadow.nw.style.left=Wd+"px";
this.shadow.nDiv.style.width=i-30+"px";
this.shadow.nDiv.style.left=Wd+this.shadow.nw.width+"px";
this.shadow.ne.style.left=ec+Wd-30+"px"}

;
t.prototype.setMaskSize=function(){
this.maskPng.style.width=this.getTotalWidth()+"px";
this.maskPng.style.height=this.getTotalHeight()+"px";
var mg=this.getTotalWidth();
var nd=this.getWindowHeight();
var ai=this.getTotalHeight();
var Ne=this.window.pointer.offsetLeft;
var fh=Ne+this.window.pointer.width;
var Ig=Ne+53;
var uh=Ne+4;
var Ba=",";
var r=this.getMaskMap();
var D=r.firstChild;
D.setAttribute("coords","0,0,0,"+nd+Ba+Ig+Ba+nd+Ba+uh+Ba+ai+Ba+fh+Ba+nd+Ba+mg+Ba+nd+Ba+mg+",0")}

;
t.prototype.hide=function(){
if(this.windowDiv)this.windowDiv.style.display="none";
this.shadowDiv.style.display="none"}

;
t.prototype.show=function(){
this.windowDiv.style.display="";
this.shadowDiv.style.display="";
this.windowDiv.style.visibility="visible";
this.shadowDiv.style.visibility="visible";
this.contentArea.style.visibility="visible"}

;
t.prototype.isVisible=function(){
return this.windowDiv.style.display!="none"}

;
t.prototype.sizeToContent=function(Ed){
var i=Ed?Ed:this.contentArea.offsetWidth;
var n=this.contentArea.offsetHeight;
this.setContentSize(Math.max(i,183),n)}

;
t.prototype.positionAt=function(x,o,s){
var pc=this.calculatePointerOffset(this.width)+this.window.w.width+5;
var Jc=this.height+this.window.n.height+this.window.s1.height;
this.left=x-pc;
this.top=o-Jc;
this.left+=s.infoTipCoord.x-s.pointCoord.x;
this.top+=s.infoTipCoord.y-s.pointCoord.y;
this.windowDiv.style.left=this.left+"px";
this.windowDiv.style.top=this.top+"px";
var cg=0;
var ig=this.getTotalHeight()-this.getTotalShadowHeight();
cg+=s.shadowTipCoord.x-s.infoTipCoord.x;
ig+=s.shadowTipCoord.y-s.infoTipCoord.y;
this.shadowDiv.style.left=this.left+cg+"px";
this.shadowDiv.style.top=this.top+ig+"px"}

;
t.prototype.calculatePointerOffset=function(i){
return Math.floor(i/4)}

;
t.prototype.createCroppingDiv=function(f){
var j=window.document.createElement("div");
j.style.overflow="hidden";
j.style.position="absolute";
j.style.width=f.width+"px";
j.style.height=f.height+"px";
j.style.left=f.style.left;
j.style.top=f.style.top;
j.style.zIndex=f.style.zIndex;
f.style.left="0px";
f.style.top="0px";
j.appendChild(f);
return j}

;
t.prototype.createWindow=function(Va){
this.window=new Object();
this.window.nw=l.create(Xi,25,25,0,0,0,false);
this.window.n=l.create(Ai,640,25,this.window.nw.width,0,0,true);
this.window.ne=l.create(Mi,25,25,0,0,0,false);
this.window.w=l.create(Fi,25,640,0,this.window.nw.height,0,true);
this.window.c=l.create(vh,640,640,this.window.w.width,this.window.n.height,0,true);
this.window.e=l.create(ph,25,640,0,this.window.ne.height,0,true);
this.window.sw=l.create(bj,25,96,0,0,0,false);
this.window.s1=l.create(Nf,640,96,this.window.sw.width,0,0,true);
this.window.pointer=l.create(li,98,96,0,0,0,false);
this.window.s2=l.create(Nf,640,96,0,0,0,true);
this.window.se=l.create(Lg,25,96,0,0,0,false);
this.window.nw.onmousedown=this.onMouseDown;
this.window.n.onmousedown=this.onMouseDown;
this.window.ne.onmousedown=this.onMouseDown;
this.window.w.onmousedown=this.onMouseDown;
this.window.c.onmousedown=this.onMouseDown;
this.window.e.onmousedown=this.onMouseDown;
this.window.sw.onmousedown=this.onMouseDown;
this.window.s1.onmousedown=this.onMouseDown;
this.window.pointer.onmousedown=this.onMouseDown;
this.window.s2.onmousedown=this.onMouseDown;
this.window.se.onmousedown=this.onMouseDown;
this.windowDiv=window.document.createElement("div");
this.windowDiv.style.position="absolute";
this.windowDiv.style.left="0px";
this.windowDiv.style.top="0px";
this.windowDiv.style.zIndex=Va;
ad(this.windowDiv,"noprint");
this.windowDiv.appendChild(this.window.nw);
this.windowDiv.appendChild(this.window.n);
this.windowDiv.appendChild(this.window.ne);
this.windowDiv.appendChild(this.window.w);
this.windowDiv.appendChild(this.window.c);
this.windowDiv.appendChild(this.window.e);
this.windowDiv.appendChild(this.window.sw);
this.windowDiv.appendChild(this.window.s1);
this.windowDiv.appendChild(this.window.pointer);
this.windowDiv.appendChild(this.window.s2);
this.windowDiv.appendChild(this.window.se)}

;
t.prototype.createShadow=function(Va){
this.shadow=new Object();
this.shadow.nw=l.create(dh,70,30,0,0,0,false);
this.shadow.n=l.create(uj,640,30,this.shadow.nw.width,0,0,false);
this.shadow.ne=l.create(Li,70,30,0,0,0,false);
this.shadow.w=l.create(xi,360,280,0,this.shadow.nw.height,0,false);
this.shadow.c=l.create(eh,640,640,this.shadow.w.width,this.shadow.n.height,0,false);
this.shadow.e=l.create(mh,360,280,0,this.shadow.ne.height,0,false);
this.shadow.sw=l.create(oh,70,60,0,0,0,false);
this.shadow.s1=l.create(Qf,320,60,this.shadow.sw.width,0,0,false);
this.shadow.pointer=l.create(ch,140,60,0,0,0,false);
this.shadow.s2=l.create(Qf,320,60,0,0,0,false);
this.shadow.se=l.create(ih,70,60,0,0,0,false);
this.shadow.nDiv=this.createCroppingDiv(this.shadow.n);
this.shadow.wDiv=this.createCroppingDiv(this.shadow.w);
this.shadow.eDiv=this.createCroppingDiv(this.shadow.e);
this.shadow.s1Div=this.createCroppingDiv(this.shadow.s1);
this.shadow.s2Div=this.createCroppingDiv(this.shadow.s2);
this.shadow.cDiv=this.createCroppingDiv(this.shadow.c);
this.shadowDiv=window.document.createElement("div");
this.shadowDiv.style.position="absolute";
this.shadowDiv.style.left="0px";
this.shadowDiv.style.top="0px";
this.shadowDiv.style.zIndex=0;
this.shadowDiv.style.zIndex=Va;
ad(this.shadowDiv,"noprint");
this.shadowDiv.appendChild(this.shadow.nw);
this.shadowDiv.appendChild(this.shadow.nDiv);
this.shadowDiv.appendChild(this.shadow.ne);
this.shadowDiv.appendChild(this.shadow.wDiv);
this.shadowDiv.appendChild(this.shadow.cDiv);
this.shadowDiv.appendChild(this.shadow.eDiv);
this.shadowDiv.appendChild(this.shadow.sw);
this.shadowDiv.appendChild(this.shadow.s1Div);
this.shadowDiv.appendChild(this.shadow.pointer);
this.shadowDiv.appendChild(this.shadow.s2Div);
this.shadowDiv.appendChild(this.shadow.se)}

;
t.prototype.hasMask=function(){
return this.maskPng!=null}

;
t.prototype.getMaskMap=function(){
return document.getElementById(this.maskMapId)}

;
var Vi=m+"transparent.gif";
var Cf=0;
t.prototype.createMask=function(){
var r=document.createElement("map");
this.maskMapId="iwMap"+Cf;
r.setAttribute("id",this.maskMapId);
r.setAttribute("name",this.maskMapId);
Cf++;
this.windowDiv.appendChild(r);
var D=document.createElement("area");
D.setAttribute("shape","poly");
D.setAttribute("coords","");
D.setAttribute("href","");
D.onclick=Fc;
D.onmousedown=this.onmousedown;
r.appendChild(D);
for(var a=0;
a<10;
a++){
var D=document.createElement("area");
D.setAttribute("shape","poly");
D.setAttribute("coords","");
D.setAttribute("href","javascript:void(0)");
D.onclick=Fc;
r.appendChild(D)}
this.maskPng=l.create(Vi,0,0,0,0,0,false);
this.windowDiv.appendChild(this.maskPng);
this.maskPng.setAttribute("usemap","#"+this.maskMapId);
this.nextMaskArea=1}

;
t.prototype.addAreaToMaskMap=function(Me,Yg){
if(this.hasMask()){
var r=this.getMaskMap();
if(this.nextMaskArea<r.childNodes.length){
var D=r.childNodes[this.nextMaskArea];
D.setAttribute("coords",Me);
D.onmousedown=Yg;
this.nextMaskArea++}
}
}

;
t.prototype.clearMaskMap=function(){
if(this.hasMask()){
var r=this.getMaskMap();
for(var a=1;
a<r.childNodes.length;
a++){
var D=r.childNodes[a];
D.setAttribute("coords","");
D.onmousedown=null}
this.nextMaskArea=1}
}

;
t.prototype.getMaskLeft=function(){
return this.windowDiv.offsetLeft}

;
t.prototype.getMaskTop=function(){
return this.windowDiv.offsetTop}

;
t.prototype.createContentArea=function(i){
var j=window.document.createElement("div");
j.style.width=i;
j.style.position="absolute";
j.style.left="15px";
j.style.top="15px";
j.style.zIndex=3;
N(j,"auto");
j.onmousedown=this.onMouseDown;
this.windowDiv.appendChild(j);
this.contentArea=j;
this.contentArea.onmousedown=this.onMouseDown;
j=window.document.createElement("div");
j.style.width=i;
j.style.position="absolute";
j.style.left="15px";
j.style.top="15px";
j.style.zIndex=3;
N(j,"auto");
j.style.visibility="hidden";
this.windowDiv.appendChild(j);
this.offscreenArea=j;
this.offscreenArea.onmousedown=this.onMouseDown}

;
t.prototype.prepareOffscreen=function(){
if(this.windowDiv.style.display=="none"){
this.windowDiv.style.display="";
this.shadowDiv.style.display="";
this.windowDiv.style.visibility="hidden";
this.shadowDiv.style.visibility="hidden";
this.contentArea.style.visibility="hidden";
this.offscreenArea.style.visibility="hidden"}
}

;
t.prototype.clearOffscreenArea=function(){
gi(this.offscreenArea)}

;
t.prototype.flipOffscreenArea=function(){
var xe=this.offscreenArea;
this.offscreenArea=this.contentArea;
this.contentArea=xe;
this.contentArea.style.visibility="visible";
this.offscreenArea.style.visibility="hidden";
this.clearOffscreenArea()}

;
t.prototype.onMouseDown=function(b){
if(b){
b.cancelDrag=true}
else{
P(b)}
}

;
var jj=m+"close.gif";
t.prototype.createCloseButton=function(){
this.closeButton=bc.create(jj,14,13,null,null,4,null,null);
this.closeButton.style.position="absolute";
N(this.closeButton,"pointer");
this.closeButton.onmousedown=this.eventHandler("onCloseMouseDown");
this.windowDiv.appendChild(this.closeButton)}

;
t.prototype.onCloseMouseDown=function(b){
P(b);
if(this.oncloseclick)this.oncloseclick(b)}

;
var qd=new q(-98.35,39.5);
var Ca=new Array();
var ta;
for(ta=0;
ta<[131072,65536,32768,16384,8192,4096,2048,1024,512,256,128,64,32,16,8].length;
ta++){
Ca.push(new q([131072,65536,32768,16384,8192,4096,2048,1024,512,256,128,64,32,16,8][ta]*0.77162458338772,[131072,65536,32768,16384,8192,4096,2048,1024,512,256,128,64,32,16,8][ta]))}
var Ph=m+"transparent.gif";
var ci=m+"transparent.gif";
function bb(gf){
this.tileSize=128;
this.backgroundColor="#f2efe9";
this.emptyTileURL=Ph;
this.numZoomLevels=Ca.length;
if(gf){
this.baseURL=gf}
else{
this.baseURL="http://mt.google.com/mt?";
if(window._tv&&window._tv.length>0){
this.baseURL+="v="+encodeURIComponent(window._tv)+"&"}
}
}

var ed=new bb();
bb.prototype.getBitmapCoordinate=function(mb,zb,R,e){
if(!e)e=new q(0,0);
var x=zb-qd.x;
var o=qd.y-mb;
e.x=Math.floor(x*Ca[R].x);
e.y=Math.floor(o*Ca[R].y);
return e}

;
bb.prototype.getLatLng=function(x,o,R,e){
if(!e)e=new q(0,0);
x/=Ca[R].x;
o/=Ca[R].y;
e.x=x+qd.x;
e.y=qd.y-o;
return e}

;
bb.prototype.getTileCoordinate=function(mb,zb,R,e){
var Tc=this.getBitmapCoordinate(mb,zb,R,e);
Tc.x=Math.floor(Tc.x/this.tileSize);
Tc.y=Math.floor(Tc.y/this.tileSize);
return Tc}

;
bb.prototype.getTileURL=function(x,o,R){
if(x<hc[R].minX||(x>hc[R].maxX||(o<hc[R].minY||o>hc[R].maxY))){
return ci}
return this.baseURL+"x="+x+"&y="+o+"&zoom="+R}

;
bb.prototype.getLowestZoomLevel=function(hg,ff,tf){
var hf=L.getPadding();
ff+=4-2*hf.width;
tf+=4-2*hf.height;
for(var a=0;
a<Ca.length;
a++){
if(Ca[a].x*hg.width<=ff&&Ca[a].y*hg.height<=tf){
return a}
}
return Ca.length-1}

;
bb.prototype.getPixelsPerDegree=function(R){
return Ca[R]}

;
bb.prototype.getLinkText=function(){
return _mNormalMap}

;
bb.prototype.getURLArg=function(){
return null}

;
var hc=new Array();
for(ta=0;
ta<9;
ta++){
hc.push(new ba(-W,-W,W,W))}
for(ta=9;
ta<Ca.length;
ta++){
var Ha=ed.getTileCoordinate(85,-179.5,ta);
var Da=ed.getTileCoordinate(12,-50,ta);
hc.push(new ba(Ha.x,Ha.y,Da.x,Da.y))}
;
function ui(bg){
if(window.clipboardData){
bg.onpaste=rj;
bg.ondrop=yh}
return true}

function rj(b){
var Nc=document.selection;
if(Nc){
var dc=Nc.createRange();
if(dc){
var Qb=window.clipboardData.getData("Text");
if(Qb){
dc.text=vf(Qb,null);
return false}
}
}
return true}

var cd=null;
function yh(b){
if(!b)b=window.event;
if(b.dataTransfer){
cd=vf(b.dataTransfer.getData("Text"),null);
setTimeout("_finishDrop()",1)}
return true}

function _finishDrop(){
if(!cd)return;
var Nc=document.selection;
if(Nc){
var dc=Nc.createRange();
if(dc){
dc.text=cd;
dc.select()}
}
cd=null}

function vf(str,he){
if(!he)he=", ";
var lb=str.replace(/^[ \r\n\t\v]+/g,"");
lb=lb.replace(/[ \r\n\t\v]+$/g,"");
lb=lb.replace(/[ \t\v]*\r?\n[\r\n]*[ \t\v]*/g,he);
return lb}

var tb=new Array(ed);
for(var Bd=0;
Bd<tb.length;
Bd++){
var Ag=tb[Bd].getURLArg();
if(Ag)tb[Ag]=tb[Bd]}

function ga(ri,Yh,Kg,Eh,zh,Pg){
    this.map=null;

    this.mapContainer=ri;

    this.panel=Yh;

    this.metaPanel=Kg;

    this.permalink=Eh;

    this.feedbackLink=zh;

    this.specToggleArea=Pg;

    I(window,"resize",this.eventHandler("resizeMapView"));

    I(window,"beforeprint",this.eventHandler("beforePrint"));

    I(window,"afterprint",this.eventHandler("afterPrint"));

    if(z.type==4){
	document.body.style.overflow="hidden";

	this.panel.style.overflow="auto";

    }
    this.resizeMapView();

}

ga.prototype.beforePrint=function(){
    var Bg=this.mapContainer.offsetWidth/window.screen.logicalXDPI;

    var ne=7;

    var gg=this.mapContainer.offsetHeight/window.screen.logicalYDPI;

    var Vc=8;

    if(this.vpage){
	Vc=7;

	if(this.vpage.directions){
	    Vc=3.5;

	}
	else if(this.vpage.overlays.length>0&&this.vpage.overlays[0].locations.length>1){
	    Vc=4.5;

	}
    }
    var X=ne/Bg;

    if(gg*X>Vc){
	X=Vc/gg;

    }
var Pf=Bg*X;
if(Pf<ne){
var cj=Math.floor(Pf/ne*100);
this.mapContainer.style.width=cj+"%"}
else{
this.mapContainer.style.width="100%"}
this.mapContainer.style.zoom=X;
this.panel.style.zoom=0.8;
if(document.body.style.overflow=="hidden"){
this.panel.style.height="auto"}
}

;

ga.prototype.afterPrint=function(){
this.mapContainer.style.zoom=1;
this.mapContainer.style.width="auto";
this.panel.style.zoom=1;
this.resizeMapView()}

;
ga.prototype.loadMap=function(We){
var ia=null;
if(We)ia=tb[We];
if(!ia)ia=tb[0];
this.map=new c(this.mapContainer,ia,null,null,false,false,tb);
this.map.registerKeyHandlers(window.document);
this.createMapControl();
this.map.addStateListener(this);
if(tb.length>1){
this.map.createSpecToggleLinks(this.specToggleArea)}
}

;
ga.prototype.createMapControl=function(){
var Lc=this.map.createMapControl();
Lc.style.position="absolute";
Lc.style.left="8px";
Lc.style.top="8px";
ad(Lc,"noprint");
this.mapContainer.appendChild(Lc)}

;
ga.prototype.onMapStateChanged=function(){
try{
if(this.vpageDoc){
var G=this.map.getCenterLatLng();
this.vpageDoc.getElementById(Ke).value=G.y;
this.vpageDoc.getElementById(Le).value=G.x;
this.vpageDoc.getElementById("zoom").value=this.map.zoomLevel}
var ha=this.getPageURL();
this.permalink.href=ha;
this.feedbackLink.href="http://www.google.com/support/maps/bin/request.py?url="+encodeURIComponent(ha)+"&ua="+encodeURIComponent(navigator.userAgent)}
catch(b){
}
}

;
ga.prototype.resizeMapView=function(){
var Ni=this.getWindowSize();
var Vf=ld(this.mapContainer);
var fg=Ni.height-Vf.y-10;
var Pi=ld(this.panel);
var oi=fg-(Pi.y-Vf.y);
this.mapContainer.style.height=ja(fg);
if(document.body.style.overflow=="hidden"){
this.panel.style.height=ja(oi);
this.panel.scrollTop=0}
if(this.map){
this.map.onResize()}
}

;
ga.prototype.getWindowSize=function(e){
if(!e)e=new ca(0,0);
if(window.self&&self.innerWidth){
e.width=self.innerWidth;
e.height=self.innerHeight;
return e}
if(document.documentElement&&document.documentElement.clientHeight){
e.width=document.documentElement.clientWidth;
e.height=document.documentElement.clientHeight;
return e}
e.width=document.body.clientWidth;
e.height=document.body.clientHeight;
return e}

;
ga.prototype.loadXML=function(td,Fh){
Ma.invalidateAll();
this.clearSearchState();
try{
this.vpageDoc=Fh;
var T=mf(td);
this.loadVPage(T)}
catch(b){
}
if(z.type==1){
window.document.currentvpage=td}
}

;
ga.prototype.loadVPage=function(T){
var J=tc.loadFromXML(T,null,null);
this.vpage=J;
if(J.title){
window.document.title=_mSiteName+" - "+J.title}
else{
window.document.title=_mSiteName}
if(J.error||J.spelling){
var ha=ua.getFileURL("mp");
Od(J,this.metaPanel,ha,null,"metaPanel",J.metaToHTML);
this.metaPanel.style.display=""}
if(J.overlays&&J.overlays.length>0){
var sa=J.overlays[0];
if(sa.panelStyle&&sa.locations){
this.showOverlayPanel(sa)}
}
else if(J.directions){
this.showDirectionsPanel(J.directions)}
if(J.debug){
var Kb=document.createElement("pre");
Kb.appendChild(document.createTextNode(J.debug));
this.metaPanel.appendChild(Kb);
this.metaPanel.style.display=""}
var G=null;
var X=null;
if(this.vpageDoc){
var Yd=this.vpageDoc.getElementById(Ke);
var Zd=this.vpageDoc.getElementById(Le);
if(Yd&&(Zd&&(Yd.value.length>0&&Zd.value.length>0))){
G=new q(parseFloat(Zd.value),parseFloat(Yd.value))}
var re=this.vpageDoc.getElementById("zoom");
if(re&&re.value.length>0){
X=parseInt(re.value)}
}
this.map.loadVPage(J,G,X);
this.lastSearchSpan=this.map.getSpanLatLng()}

;
ga.prototype.showOverlayPanel=function(sa){
var g=this;
window.showLocationInfo=function(K){
var p=sa.getLocationById(K);
if(p){
g.map.clearInfoWindowArgs(p.xml);
g.map.showInfoWindow(p)}
}

;
Od(sa,this.panel,sa.panelStyle,null,"panel",sa.toHTML)}

;
ga.prototype.showDirectionsPanel=function(B){
this.highlightedTd=null;
var g=this;
window.showDirectionsSegment=function(K){
var ic=B.getSegmentById(K);
var jd=document.getElementById(K);
if(ic){
g.map.showDirectionsStep(ic);
if(jd){
if(this.highlightedTd)this.highlightedTd.style.backgroundColor="white";
this.highlightedTd=jd;
jd.style.backgroundColor="#eeeeee";
g.map.oninfowindowclose=function(){
g.highlightedTd=null;
jd.style.backgroundColor="white";
g.map.oninfowindowclose=null}

}
}
}

;
window.showDirectionsStart=function(){
g.map.showDirectionsStart();
if(this.highlightedTd)this.highlightedTd.style.backgroundColor="white";
this.highlightedTd=null}

;
window.showDirectionsEnd=function(){
g.map.showDirectionsEnd();
if(this.highlightedTd)this.highlightedTd.style.backgroundColor="white";
this.highlightedTd=null}

;
var ha=ua.getFileURL("dp");
Od(B,this.panel,ha,null,"panel",B.toHTML)}

;
ga.prototype.search=function(wb,pj,qh){
Ma.invalidateAll();
this.clearSearchState();
if(!wb||wb.length==0)return;
this.panel.innerHTML=_mSearching;
var A=new ua();
A.setValue("sll",A.getLatLngArg(this.map.getCenterLatLng()));
A.setValue("sspn",A.getSpanArg(this.map.getSpanLatLng()));
A.setValue("z",this.map.zoomLevel);
A.setValue("t",this.map.spec.getURLArg());
A.setValue("q",wb);
A.setValue("f",qh);
A.setValue("output","js");
var ha=A.getURL();
Sd('<a href="'+ib(ha)+'">'+Ob(ha)+"</a>",0);
pj.src=ha}

;
ga.prototype.clearSearchState=function(){
this.map.clearOverlays();
this.metaPanel.innerHTML="";
this.metaPanel.style.display="none";
this.panel.innerHTML="";
this.vpage=null;
this.vpageDoc=null}

;
ga.prototype.getPageURL=function(Ce){
var A=new ua();
if(this.vpage&&this.vpageDoc){
A.setValue("q",this.vpage.query);
var yj=parseFloat(this.vpageDoc.getElementById(Ke).value);
var lh=parseFloat(this.vpageDoc.getElementById(Le).value);
var Of=new q(lh,yj);
var bf=this.map.getSpanLatLng();
var eg=this.vpage.center;
if(this.vpage.searchCenter){
A.setValue("sll",A.getLatLngArg(this.vpage.searchCenter));
eg=this.vpage.searchCenter}
var xa=false;
if(!Of.approxEquals(eg)){
xa=true;
A.setValue("ll",A.getLatLngArg(Of))}
var Je=this.lastSearchSpan;
if(this.vpage.searchSpan){
A.setValue("sspn",A.getSpanArg(this.vpage.searchSpan));
Je=this.vpage.searchSpan}
if(xa||Je&&!bf.approxEquals(Je)){
A.setValue("spn",A.getSpanArg(bf))}
}
else{
A.setAllMapValues(this.map)}
A.setValue("t",this.map.spec.getURLArg());
return A.getURL(Ce)}

;
ga.prototype.email=function(){
var ha="mailto:?subject="+encodeURIComponent(_mEmailSubject)+"&body="+encodeURIComponent(this.getPageURL(true));
window.location.href=ha}

;
ga.prototype.print=function(){
window.print()}

;
yc.prototype.toHTML=function(Y){
var aa="";
if(this.locations.length>0){
var aa="<table>";
for(var a=0;
a<this.locations.length;
a++){
var ob=this.locations[a];
var ub=ob.xml.getElementsByTagName("info")[0];
var hb=Sg(ub.getElementsByTagName("title")[0]);
var sb=ka(ub.getElementsByTagName("distance")[0]);
var Pe=ka(ub.getElementsByTagName("phone")[0]);
if(hb){
aa+='<tr><td style="vertical-align: top;
 padding-right: 4px;
"><a href="javascript:showLocationInfo(\''+ob.id+"')\">"+'<img style="width:24px;
 height:38px" alt="" '+'src="'+m+"icon"+ob.id+'.png"/></a></td>'+'<td style="padding-bottom: 0.5em;
 padding-top: 1px"><div>'+"<a href=\"javascript:showLocationInfo('"+ob.id+"')\" "+'style="color: #0000cc">'+hb+"</a></div>"+'<div style="font-size: smaller">'+Na(Pe)+" - "+'<span style="color: #7777cc">'+Na(sb)+"</span></div>"+"</td></tr>"}
}
aa+="</table>"}
Y.innerHTML=aa}

;
od.prototype.toHTML=function(Y){
var ub=this.xml.getElementsByTagName("info")[0];
var hb=ka(ub.getElementsByTagName("title")[0]);
var sb=ka(ub.getElementsByTagName("distance")[0]);
var Pe=ka(ub.getElementsByTagName("phone")[0]);
var vb=ub.getElementsByTagName("line");
var ge="";
var Ae="";
if(vb.length>0)ge=ka(vb[0]);
if(vb.length>1)Ae=ka(vb[1]);
var nf=Rd(ib(ge)+", "+ib(Ae));
var aa="<div><b>"+Na(hb)+"</b></div>"+'<div style="font-size: small">'+Na(Pe)+"</div>"+'<div style="font-size: small"><div>'+Na(ge)+"</div><div>"+Na(Ae)+"</div></div>"+'<div style="font-size: small;
 margin-top: 0.4em">Directions:'+" <a href=\"javascript:directionsSearch(null, '"+nf+"', false)\">To here</a> - "+"<a href=\"javascript:directionsSearch('"+nf+"', null, false)\">From here</a></div>";
Y.innerHTML=aa}

;
tc.prototype.metaToHTML=function(Y){
var aa="";
if(this.spelling){
var jh=Ad(this.spelling,false);
var str=ka(this.spelling);
aa+='<div style="color: #cc0000;
 margin-bottom: 1em">Did you mean: <a href="javascript:search(\''+Rd(str)+"')\">"+jh+"</a></div>"}
if(this.error){
var str=Ad(this.error,false);
aa+="<p>"+str+"</p>"}
Y.innerHTML=aa}

;
rc.prototype.toHTML=function(Y){
var Cg=rf(this.xml.getElementsByTagName("source")[0]);
var ag=rf(this.xml.getElementsByTagName("destination")[0]);
var Be=this.xml.getElementsByTagName("segments")[0];
var sb=Be.getAttribute("distance");
var Xe=Be.getAttribute("time");
var aa='<table class="dirsummary"><tr><td class="name" onclick="showDirectionsStart()" style="cursor: pointer"><a href="javascript:void(0)" onclick="javascript:return true">Start from</a>:</td><td class="value" onclick="showDirectionsStart()" style="cursor: pointer">'+Na(Cg)+"</td></tr>"+'<tr><td class="name" onclick="showDirectionsEnd()" '+'style="cursor: pointer"><a href="javascript:void(0)" '+'onclick="javascript:return true">Arrive at</a>:</td>'+'<td class="value" onclick="showDirectionsEnd()" '+'style="cursor: pointer">'+Na(ag)+"</td></tr>"+'<tr><td class="name">Distance:</td><td class="value">'+Na(sb)+" (about "+Na(Xe)+")</td></tr></table>"+'<div class="reverse"><a '+"href=\"javascript:javascript:directionsSearch('"+Rd(ib(ag))+"', '"+Rd(ib(Cg))+"', true)\">"+'Reverse directions</a></div><table class="directions">';
var Dg=Be.getElementsByTagName("segment");
for(var a=0;
a<Dg.length;
a++){
var Jd=Dg[a];
var K=Jd.getAttribute("id");
var sb=Jd.getAttribute("distance");
var ki=parseInt(Jd.getAttribute("meters"));
var str=Ad(Jd,false);
aa+='<tr id="'+K+'"><td class="num" '+"onclick=\"showDirectionsSegment('"+K+"', this)\">"+'<a href="javascript:void(0)" onclick="return true">'+(a+1)+'.</td><td class="desc" onclick="showDirectionsSegment(\''+K+"', true)\">"+str+" - go <b>"+sb+"</b></td></tr>";
if(ki>16903){
aa+='<tr><td colspan="2" class="gap"><div class="gap">&#8943;
</div></td></tr>'}
}
aa+="</table>";
Y.innerHTML=aa}

;
function rf(h){
var vb=h.getElementsByTagName("line");
var str="";
for(var a=0;
a<vb.length;
a++){
str+=ka(vb[a]);
if(a<vb.length-1){
str+=", "}
}
return str}

function Ad(h,jf){
var H="";
if(h.nodeType==3||h.nodeType==4){
return h.nodeValue}
if(h.nodeType==1){
if(jf&&h.tagName){
H+="<"+h.tagName+">"}
for(var a=0;
a<h.childNodes.length;
++a){
H+=Ad(h.childNodes[a],true)}
if(jf&&h.tagName){
             H+="</"+h.tagName+">"}
}
return H}

var _Point=q;
var _Map=c;
var _IconClass=L;
var _XMLHttp=we;


var _MapsApplication=ga;

var _makePasteBox=ui;

