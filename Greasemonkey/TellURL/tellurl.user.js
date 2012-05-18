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
// @name TellUrl
// @namespace http://pitecan.com/TellUrl
// @description Change the background color of links based on clicking history
// @include http://pitecan.com/*
// ==/UserScript==

var allElements, thisElement;
allElements = document.getElementsByTagName("a");
for (var i = 0; i < allElements.length; i++) {
  thisElement = allElements[i];
  clickfunc_orig = thisElement.onclick;
  thisElement.onclick = function(event){ 
    if(clickfunc_orig != undefined){
//      alert(clickfunc_orig);
      clickfunc_orig(event);
    }
    url = event.target;
    GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://pitecan.com/~masui/url.cgi?url=' + url
    });
  }

}


//GM_xmlhttpRequest({
//  method: 'GET',
//  url: 'http://pitecan.com/~masui/url.cgi?url=abcdefg',
////  headers: {
////    'User.agent': 'Mozilla/4.0 (compatible) Greasemonkey',
////    'Accept': 'application/atom+xml,application/xml,text/xml',
////  },
//  onload: function(responseDetails) {
//    alert('Request for url.cgi returned ' + responseDetails.status +
//     ' ' + responseDetails.statusText + '\n\n' +
//     'Feed data:\n' + responseDetails.responseText);
//    }
//  });
