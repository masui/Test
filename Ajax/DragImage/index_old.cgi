#!/usr/bin/env ruby
#
# $Date: 2005-03-16 18:47:58 +0900 (Wed, 16 Mar 2005) $
# $Rev: 597 $
#


js = <<EOF
<script type="text/javascript">
function getMouseX(e){
  if(window.opera)                            //o6!)
      return e.clientX
  else if(document.all && document.getElementById && (document.compatMode=='CSS1Compat')) // e6
      return document.documentElement.scrollLeft+event.clientX
  else if(document.all){                       //e4,e5
      return document.body.scrollLeft+event.clientX
  }else if(document.layers||document.getElementById)
      return e.pageX                          //n4,n6,m1!)
}

function getMouseY(e){
  if(window.opera)                            //o6!)
      return e.clientY
  else if(document.all && document.getElementById && (document.compatMode=='CSS1Compat')) // e6
      return document.documentElement.scrollTop+event.clientY
  else if(document.all)                       //e4,e5,e6!)
      return document.body.scrollTop+event.clientY
  else if(document.layers||document.getElementById)
      return e.pageY                          //n4,n6,m1!)
}

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

var imageno = 0;
var origx = 0, origy = 0;
var mouseorigx = -1, mouseorigy;

var offx, offy;

function deletepx(s){
  i = s.lastIndexOf("px")
  if(i >= 0){a
    return parseInt(s.substr(0,i))   // 数字に変換するAPIがあったはず!
  }
  else {
    return parseInt(s)
  }
}

//document.onmousedown = mousedown;
//function mousedown(e){
//  alert(e.target)
//}

function mousedown(n){
  imageno = n;
  img = document.getElementById("image" + imageno);
  origx = img.offsetLeft;
  origy = img.offsetTop;
  return false;
}

function mouseup(n){
  img = document.getElementById("image" + n)

  xmlhttp.open("GET", "test.cgi?imageno=" + imageno + "&x=" + img.offsetLeft + "&y=" + img.offsetTop,true);
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4) {
      xx = xmlhttp.responseText
    }
  }
  xmlhttp.send(null)

  imageno = 0;
  mouseorigx = -1

  return false;
}

document.onmousemove = mousemove;

function mousemove(e){
  if(imageno == 0){
    mouseorigx = -1;
  }
  else {
    y = getMouseY(e)
    x = getMouseX(e)

//    img.style.left = x - offx;
//    img.style.top = y - offy;

    if(mouseorigx == -1){
      mouseorigx = x;
      mouseorigy = y;
    }
    else {
      id = "image" + imageno;
      img = document.getElementById(id);

      img.style.position = 'absolute'
      img.style.left = origx + (x - mouseorigx);
      img.style.top = origy + (y - mouseorigy);
    }
  }

  return false;
}
</script>
EOF

positions = []
File.open("db"){ |f|
  positions = Marshal.load(f)
}
(1..4).each { |i|
  if positions[i].nil? then
    positions[i] = [0,0]
  end
}

#body = <<EOF
#<img id="image1" src="image1.jpg" onMouseDown="mousedown(1)" onMouseUp="mouseup(1)"
#	style="position:absolute;left:#{positions[1][0]};top:#{positions[1][1]};"
#<img id="image2" src="image2.jpg" onMouseDown="mousedown(2)" onMouseUp="mouseup(2)"
#	style="position:absolute;left:#{positions[2][0]};top:#{positions[2][1]};"
#<img id="image3" src="image3.jpg" onMouseDown="mousedown(3)" onMouseUp="mouseup(3)"
#	style="position:absolute;left:#{positions[3][0]};top:#{positions[3][1]};"
#EOF

body = <<EOF
<h2>Ajaxによる画像ドラッグ</h2>

<ul>
<li> <a href="image1.jpg">asahi</a>
<li> MouseUpイベントでサーバに画像位置を通知している。
</ul>
EOF

body += <<EOF
<img id="image0" src="image1.jpg">
EOF

body += (1..4).collect { |i|
  "<img id=\"image#{i}\" src=\"image#{i}.jpg\" onMouseDown=\"mousedown(#{i})\" onMouseUp=\"mouseup(#{i})\"
	style=\"position:absolute;left:#{positions[i][0]};top:#{positions[i][1]};\">"
}.join("")

require 'cgi'

cgi = CGI.new('html3')
cgi.out {
  cgi.html {
    cgi.head {
      cgi.meta('HTTP-EQUIV' => 'Content-Type', 'CONTENT' => 'text/html; charset=EUC-JP') +
      "<script language=\"JavaScript\" src=\"debug.js\"></script>" +
      js
    } +
    cgi.body {
      body
    }
  }
}
