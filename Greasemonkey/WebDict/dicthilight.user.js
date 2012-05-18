// dicthilight.user.js
// 2005.11.26
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
// @name DictHilight
// @namespace http://pitecan.com/WebDict
// @description Highlight dictionary entries
// @include http://*
// @exclude http://pitecan.com/WebDict/*
// ==/UserScript==

(function (){
  var keyword = location.keyword;
  if(keyword != undefined){
    hilighted = "<span style='background:blue;color:yellow;padding:4px;margin:2px;'>"+keyword+"</span>";
    body = document.body.innerHTML;
    body = body.split(keyword).join(hilighted);
    document.body.innerHTML = body;
  }
})();

