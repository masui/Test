// tellurl.user.js
// 2005.11.05
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
// @name JumpWord
// @namespace http://pitecan.com/WebDict
// @description Highlight dictionary entries
// @include http://pitecan.com/*
// ==/UserScript==


var all, t;

//window.setvalue = GM_setValue;

t = document.getElementById('word');
t.onclick = function(){
  alert("jumpfunc called");
  GM_setValue('WebDict','2005');
  alert("jumpfunc called");
  xxxxxxx();
//  location.href = 'http://asahi.com/';
}

//for (var i = 0; i < all.length; i++) {
//    t = all[i];
//    alert(t);
//    //this.onclick = window.jumpfunc;
//}
