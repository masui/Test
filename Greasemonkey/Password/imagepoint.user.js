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
  // マイ認証用のウィンドウを開いてマイ認証を実行する。
  // imagequiz.cgi でマイ認証を行なった結果を getpassword.cgi で取得する。
  // getpassword.cgi は認証が終了するまで待つ。20秒でタイムアウト。
  //
  // マイ認証だから自分しか利用しない(ユーザ登録は要らない?)ことにするが
  // サイトごとに異なるパスワードを利用する必要がある。
  //
  id = dateid();
  w = window.open("http://pitecan.com/MyPassword/programs/imagepoint.cgi?url="+encodeURIComponent(location.href)+"&id="+id,"","width=512,height=384");
  
  setTimeout(function(){ w.close(); },10000);    // 10秒たったらキャンセル
  setTimeout(function(){ te.value = ''; },2000); // 最初にパスワードをクリヤ

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
    te.style.backgroundColor = "#ffff80"; // マイ認証の色
    getpassword(te);
  }
}
