// Clear.user.js
// 2005.11.03
// Copyright (c) 2005, Toshiyuki Masui
// Released under the GPL license
// http://pitecan.com
//
// ....................................................................
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// ....................................................................
//
// ==UserScript==
// @name Clear
// @namespace http://pitecan.com/ColorLink
// @description description here...
// @include http://pitecan.com/*
// ==/UserScript==

// GM_setValueの値は文字列/論理値/整数じゃなきゃ駄目なんだって...
// "2005,10,3,2345" みたいな文字列をセットすることにしよう。

function setAttr(key,date,val){
  year = date.getYear();
  if(year < 2000) year += 1900;
  month = date.getMonth() + 1;
  day = date.getDate();
  s = year + "," + month + "," + day + "," + val;
alert(s);
  GM_setValue(key, s);
}

var allElements, thisElement;
allElements = document.getElementsByTagName("a");
for (var i = 0; i < allElements.length; i++) {
  thisElement = allElements[i];
  url = thisElement.href
  newdate = new Date;
  setAttr(url,newdate,0);
}
