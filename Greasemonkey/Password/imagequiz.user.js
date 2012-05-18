// imagequiz..user.js
// $Date: 2006-01-25 14:44:53 +0900 (Wed, 25 Jan 2006) $
// Copyright (c) 2005, Toshiyuki Masui
// Released under the GPL license
// http://pitecan.com
//
// ==UserScript==
// @name ImageQuiz
// @namespace http://pitecan.com/MyPassword
// @replace <input type="password"> with user password
// @include http://mixi.jp/*
// ==/UserScript==

function getpassword(te){
  // �ޥ�ǧ���ѤΥ�����ɥ��򳫤��ƥޥ�ǧ�ڤ�¹Ԥ��롣
  // authcgi�ǥޥ�ǧ�ڤ�Ԥʤä���̤� getcgi �Ǽ������롣
  // getcgi ��ǧ�ڤ���λ����ޤ��Ԥġ�timeout�ǥ����ॢ���ȡ�

  authcgi = "http://pitecan.com/MyPassword/programs/imagequiz.cgi";
  getcgi = "http://pitecan.com/MyPassword/programs/getpassword.cgi";
  timeout = 40000;

  d = new Date;
  id = d.getTime();
  w = window.open(authcgi+"?url="+encodeURIComponent(location.href)+
      "&id="+id,"","width=400,height=400");
  
  setTimeout(function(){ w.close(); },timeout);
  setTimeout(function(){ te.value = ''; },2000); // �ǽ�˥ѥ���ɤ򥯥��

  GM_xmlhttpRequest({
    method:"GET",
    url:getcgi+"?id="+id,
    onload:function(details){
      te.value = details.responseText;
    }
  });
}

inputs = document.getElementsByTagName("input");
for (var i = 0; i < inputs.length; i++) {
  te = inputs[i];
  if(te.type == "password"){
    te.style.backgroundColor = "#ffff80"; // �ޥ�ǧ�ڤο�
    te.value = '';
    getpassword(te);
  }
}
