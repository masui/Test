//
// tellurl2.user.js
// 2010.2.27
// Copyright (c) 2010, Toshiyuki Masui
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
// select "TellURL", and click Uninstall.
//
// ....................................................................
//
// ==UserScript==
// @name TellURL
// @namespace http://pitecan.com/TellURL
// @description Send the URL and TITLE of the Web page for logging
// @exclude http://pornotube.com/*
// @exclude http://*.etology.com/*
// @exclude http://*.adultfriendfinder.com/*
// @exclude http://*.enoratraffic.com/*
// @exclude http://*.deqwas.net/*
// @exclude http://203.86.249.80/*
// @exclude http://wms.assoc-amazon.jp/*
// @exclude http://ad.rbbtoday.com/*
// @exclude http://ad.adlantis.jp/*
// @exclude http://as.bp.impact-ad.jp/*
// @exclude http://feemo.rssad.jp/*
// @exclude http://*.ads.mixi.jp/*
// @exclude http://*.impact-ad.jp/*
// @exclude http://www.yomiuri.co.jp/i1/*
// @exclude http://view.atdmt.com/*
// @exclude http://rcm-jp.amazon.co.jp/*
// @exclude http://ad.pitta.ne.jp/*
// @exclude http://dg.specificclick.net/*
// @exclude http://affiliate.dtiserv.com/*
// @exclude http://ld.send.microad.jp/*
// @exclude http://*.ias.rakuten.co.jp/*
// @exclude http://*.send.microad.jp/*
// @exclude http://bizad.nikkeibp.co.jp/*
// @exclude http://notice.kakaku.com/*
// ==/UserScript==

GM_xmlhttpRequest({
  method: 'GET',
  url: 'http://pitecan.com/~masui/url.cgi?url=' + encodeURIComponent(location.href) + '&title=' + encodeURIComponent(document.title)
});

