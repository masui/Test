//
// draglay.js にXMLHttpRequest()を加え、sendposition() を mup() に加えたもの
//
// $Date: 2005-03-16 18:47:20 +0900 (Wed, 16 Mar 2005) $
// $Rev: 596 $
//

function getXmlHttpObject() {
    var xmlhttp;
    /*@cc_on
    @if (@_jscript_version >= 5)
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                xmlhttp = false;
            }
        }
    @else
        xmlhttp = false;
    @end @*/
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        try {
            xmlhttp = new XMLHttpRequest();
            xmlhttp.overrideMimeType("text/xml"); 
        } catch (e) {
            xmlhttp = false;
        }
    }
    return xmlhttp;
}

var xmlhttp = getXmlHttpObject();

function sendposition() {
  xmlhttp.open("GET", "setpos.cgi?image=" + clickElement + "&x=" + getLEFT(clickElement) + "&y=" + getTOP(clickElement),true);
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4) {
      xx = xmlhttp.responseText
    }
  }
  xmlhttp.send(null)
}

///////////////////////////////////////////////////////////////////////////////

  /*********************************************************************
   * クロスブラウザドラッグドロップのためのスクリプト
   * dragLay 2002.4.14
   * update  2002.4.20
   * 
   * -------------------------------------------------------------------
   * 言語 : JavaScript
   * 対象Browser : 
   *     Win  n4 n6 moz e4 e5 e6 o6,
   *     Mac  n4 n6 moz e4.5 e5,
   *     Linux n4 n6 moz    
   * -------------------------------------------------------------------
   * drag ホルダを適当な場所にコピーしたうえで
   * <script language="JavaScript" src="./drag/draglay.js"></script>
   * で呼び出してご利用ください。
   * 
   *   書式:  
   *    dragLay['レイヤー名'] = new dragLay('レイヤー名',left,top,'html') 
   * 
   *   引数説明:
   * 
   *   ・レイヤー名    ドラッグドロップするレイヤーの名前
   *   ・left          レイヤーの初期left位置
   *   ・top           レイヤーの初期top位置
   *   ・html          レイヤーの中へ表示するhtml
   * 
   *   使用例:
   * 
   *   dragLay['b0'] = new dragLay('b0',10,10,'<img src="./tr2.gif" border="0">') 
   * 
   * -------------------------------------------------------------------
   * Toshirou Takahshi tato@fureai.or.jp
   * Support http://game.gr.jp/js/
   * 改造は自由ですがバグやブラウザのバ－ジョンアップへの対応等の
   * 情報には充分注意してご利用ください。
   * 
   */

  /*--/////////////ここから下はさわらなくても動きます/////////////--*/

  function dragLay(layName,x,y,html){
    this.id      = layName   // ドラッグできるようにするレイヤー名
    this.x       = x         // 初期left位置
    this.y       = y         // 初期top位置
    if(document.layers)      //n4用
      this.div='<layer name="'+layName+'" left="'+x+'" top="'+y+'">\n'
              +'<a     href="javascript:void(0)" \n'
              +'       onmousedown="clickElement=\''+layName
                                    +'\';mdown(event);return false">\n'
              + html + '</a></layer>\n'
    else                     //n4以外用
      this.div='<div  id="'+layName+'" class="dragLays"\n'
              +'      onmousedown="clickElement=\''+layName
                                    +'\';mdown(event);return false"\n'
              +'      style="position:absolute;left:'+x+'px;top:'+y+'px">\n'
              + html + '</div>\n'
    document.write(this.div)
    return 
  }
  dragLay.prototype.moveLAYOJ = moveLAYOJ //メソッドを追加する
  //--レイヤー移動
  function moveLAYOJ(oj,x,y){
    if(document.getElementById){  //e5,e6,n6,m1,o6用
      oj.left = x
      oj.top  = y
    } else if(document.all){      //e4用
      oj.pixelLeft = x
      oj.pixelTop  = y
    } else if(document.layers)    //n4用
      oj.moveTo(x,y)
  }

  //--layNameで指定したオブジェクトを返す(必ずonload後に実行すること)
  function getLayOj(layName){  
    if(document.getElementById) 
      return document.getElementById(layName)           //e5,e6,n6,m1,o6用
    else if(document.all)   return document.all(layName)    //e4用
    else if(document.layers)return document.layers[layName] //n4用
  }

  //--奥行きZ座標set 
  function zindexLAYOJ(oj,zindex){
    if(document.getElementById) oj.zIndex=zindex  //n6,m1,e5,e6,o6用
    else if(document.all)       oj.zIndex=zindex  //e4用
    else if(document.layers)    oj.zIndex=zindex  //n4用
  }

  //--イベントキャプチャー開始
  document.onmousemove = mmove
  document.onmouseup = mup
  if(navigator.userAgent.indexOf('Gecko')!=-1)   //m1,n6用
    document.onmousedown = mdown
  if(document.layers){                           //n4用
    document.captureEvents(Event.MOUSEMOVE)
    document.captureEvents(Event.MOUSEUP)
  }

  //--マウスX座標get 
  function getMouseX(e){
    if(window.opera)                            //o6用
        return e.clientX
    else if(document.all)                       //e4,e5,e6用
        return document.body.scrollLeft+event.clientX
    else if(document.layers||document.getElementById)
        return e.pageX                          //n4,n6,m1用
  }

  //--マウスY座標get 
  function getMouseY(e){
    if(window.opera)                            //o6用
        return e.clientY
    else if(document.all)                       //e4,e5,e6用
        return document.body.scrollTop+event.clientY
    else if(document.layers||document.getElementById)
        return e.pageY                          //n4,n6,m1用
  }

  //--レイヤ－左辺X座標get 
  function getLEFT(layName){
    if(document.all)                            //e4,e5,e6,o6用
      return document.all(layName).style.pixelLeft
    else if(document.getElementById)            //n6,m1用
      return (document.getElementById(layName).style.left!="")
              ?parseInt(document.getElementById(layName).style.left):""
    else if(document.layers)                    //n4用
      return document.layers[layName].left 
  }

  //--レイヤ－上辺Y座標get 
  function getTOP(layName){
    if(document.all)                          //e4,e5,e6,o6用
      return document.all(layName).style.pixelTop
    else if(document.getElementById)          //n6,m1用
      return (document.getElementById(layName).style.top!="")
              ?parseInt(document.getElementById(layName).style.top):""
    else if(document.layers)                  //n4用
      return document.layers[layName].top 
  }

  //--マウスカーソルを動かした時レイヤーもmoveLAYOJで動かす
  function mmove(e) {
    if(!window.clickElement) return
    if (getLayOj(clickElement)) {
       movetoX = getMouseX(e) - offsetX
       movetoY = getMouseY(e) - offsetY

       var oj=(!!document.layers)?getLayOj(clickElement)
                                 :getLayOj(clickElement).style
      dragLay[clickElement].moveLAYOJ(oj,movetoX,movetoY)
      return false
    }
  }

  //--マウスボタンを押し下げた時
  //  レイヤー内のカーソルoffset位置取得
  function mdown(e) {
    if(navigator.userAgent.indexOf('Gecko')!=-1)   //n6,m1用
      if(e.currentTarget.className != 'dragLays') return
      else clickElement = e.currentTarget.id
    var selLay = getLayOj(clickElement)
    if (selLay){
        offsetX = getMouseX(e) - getLEFT(selLay.id)
        offsetY = getMouseY(e) - getTOP(selLay.id)
    }
    return false
  }

  //--マウスボタンを上げた時ドラッグ解除
  var zcount = 0
  function mup(e) {
    if(!window.clickElement) return
    if (getLayOj(clickElement)) {
      zindexLAYOJ((!!document.layers)?getLayOj(clickElement)
                     :getLayOj(clickElement).style,zcount++)
      sendposition(); ///////////////////////////////////////////////// masui

      clickElement=null
    }
  }
  /*--/////////////ここまで///////////////////////////////////////--*/

