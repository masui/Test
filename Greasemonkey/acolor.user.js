// Hello World! example user script
// version 0.1 BETA!
// 2005.04.22
// Copyright (c) 2005, Mark Pilgrim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// @name AColor
// @namespace http://pitecan.com/Test/Greasemonkey
// @description desc desc
// @include http://pitecan.com/*
// ==/UserScript==
var allElements, thisElement;
allElements = document.getElementsByTagName("a");
for (var i = 0; i < allElements.length; i++) {
  thisElement = allElements[i];

  thisElement.onclick = function(){ 
    count = GM_getValue(url, 0);
    GM_setValue(url, count+1);
  }
  
  url = thisElement.href;
  count = GM_getValue(url, 0);
  if(count > 3){
    thisElement.style.backgroundColor= "#ffff00"
  }
}
