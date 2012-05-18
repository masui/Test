// ColorLink.user.js
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
// select "ColorLink", and click Uninstall.
//
// ....................................................................
//
// ==UserScript==
// @name ColorLink
// @namespace http://pitecan.com/ColorLink
// @description Change the background color of links based on clicking history
// @include http://pitecan.com/*
// @include http://mixi.jp/*
// ==/UserScript==

// GM_setValueの値は文字列/論理値/整数じゃなきゃ駄目らしいので
// "2005,10,3,2345" みたいな文字列をセットする。

function setAttr(key,date,val){
  year = date.getYear();
  if(year < 2000) year += 1900;
  month = date.getMonth() + 1;
  day = date.getDate();
  hour = date.getHours();
  min = date.getMinutes();
  sec = date.getSeconds();
  s = year + "," + month + "," + day + "," + hour + "," + min + "," + sec + "," + val;
  GM_setValue(key, s);
}

function getAttr(key){
  s = GM_getValue(key,"2000,1,1,0,0,0,0");
  a = s.split(',');
  year = parseInt(a[0]);
  month = parseInt(a[1]) - 1;
  day = parseInt(a[2]);
  hour = 0;
  min = 0;
  sec = 0;
  if(a.length == 4){
    val = parseInt(a[3]);
  }
  else {
    hour = parseInt(a[3]);
    min = parseInt(a[4]);
    sec = parseInt(a[5]);
    val = parseInt(a[6]);
  }
  date = new Date(year,month,day,hour,min,sec);
  return [date,val];
}

function getCurrentPopularity(key){
  a = getAttr(key);
  date = a[0];
  popularity = a[1];
  currentdate = new Date;
  days = (currentdate - date) / (24 * 60 * 60 * 1000);
  val = popularity * Math.pow(0.8, days); // 1日ごとにpopularityが0.8倍になる
  return val;
}

function bgcolor(val){
  // valは0～9999
  r = "ff";
  g = "ff";
  b = Math.floor(0xe0 - (val / 10000.0) * 0xe0).toString(16);
  b = ("0" + b).substr(-2,2);
  return "#" + r + g + b;
}

var allElements, thisElement;
allElements = document.getElementsByTagName("a");
for (var i = 0; i < allElements.length; i++) {
  thisElement = allElements[i];
  if(thisElement.onclick == undefined){
    thisElement.onclick = function(event){ 
      url = event.target;
      popularity = getCurrentPopularity(url);
      newpopularity = popularity + (10000 - popularity) / 2;
      newdate = new Date;
      setAttr(url,newdate,newpopularity);
    }
  }
  
  url = thisElement.href;
  popularity = getCurrentPopularity(url);
  thisElement.style.backgroundColor= bgcolor(popularity);
}

/* for clear
var allElements, thisElement;
allElements = document.getElementsByTagName("a");
for (var i = 0; i < allElements.length; i++) {
  thisElement = allElements[i];
  url = thisElement.href
  newdate = new Date;
  setAttr(url,newdate,0);
}
*/

