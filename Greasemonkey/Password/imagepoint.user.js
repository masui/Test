// imagepoint.user.js
//
// $Date: 2006-01-25 14:44:53 +0900 (Wed, 25 Jan 2006) $
// Copyright (c) 2005, Toshiyuki Masui
// Released under the GPL license
// http://pitecan.com
//
// ==UserScript==
// @name Imagepoint
// @namespace http://pitecan.com/MyPassword
// @replace <input type="password"> with user password
// @include http://*
// ==/UserScript==

function digit2(i){
  var s = "00" + String(i);
  var len = s.length;
  return s.substring(len-2,len);
}

function dateid(){
  d = new Date();
  year = d.getYear();
  if(year < 2000) year += 1900;
  month = d.getMonth()+1;
  return digit2(month) + digit2(d.getDate()) + digit2(d.getHours()) + digit2(d.getMinutes()) + digit2(d.getSeconds())
}

function getpassword(te){
  // �ޥ�ǧ���ѤΥ�����ɥ��򳫤��ƥޥ�ǧ�ڤ�¹Ԥ��롣
  // imagequiz.cgi �ǥޥ�ǧ�ڤ�Ԥʤä���̤� getpassword.cgi �Ǽ������롣
  // getpassword.cgi ��ǧ�ڤ���λ����ޤ��Ԥġ�20�äǥ����ॢ���ȡ�
  //
  // �ޥ�ǧ�ڤ����鼫ʬ�������Ѥ��ʤ�(�桼����Ͽ���פ�ʤ�?)���Ȥˤ��뤬
  // �����Ȥ��Ȥ˰ۤʤ�ѥ���ɤ����Ѥ���ɬ�פ����롣
  //
  id = dateid();
  w = window.open("http://pitecan.com/MyPassword/programs/imagepoint.cgi?url="+encodeURIComponent(location.href)+"&id="+id,"","width=512,height=384");
  
  setTimeout(function(){ w.close(); },10000);    // 10�ä��ä��饭��󥻥�
  setTimeout(function(){ te.value = ''; },2000); // �ǽ�˥ѥ���ɤ򥯥��

  GM_xmlhttpRequest({
    method:"GET",
    url:"http://pitecan.com/MyPassword/programs/getpassword.cgi?timeout=10&id="+id,
    onload:function(details){
      te.value = details.responseText;
      window.close(w);
    }
  });
}

inputs = document.getElementsByTagName("input");
for (var i = 0; i < inputs.length; i++) {
  te = inputs[i];
  if(te.type == "password"){
    te.style.backgroundColor = "#ffff80"; // �ޥ�ǧ�ڤο�
    getpassword(te);
  }
}
