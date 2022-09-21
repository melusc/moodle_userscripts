/*! For license information please see no-force-download.user.js.LICENSE.txt */
(()=>{"use strict";var e;
// ==UserScript==
// @name       No Force Download
// @match      https://moodle.ksasz.ch/*
// @grant      none
// @version    1.0.0
// @author     lusc
// @license    MIT
// @updateURL  https://github.com/melusc/moodle_userscripts/raw/userscript-out/no-force-download/no-force-download.user.js
// @run-at     document-start
// ==/UserScript==
e=()=>{const e=document.querySelectorAll('a[href*="?"][href*="forcedownload"]');for(const t of e)if(t.search){const e=new URLSearchParams(t.search);e.delete("forcedownload"),t.search=`?${e.toString()}`}},"interactive"!==document.readyState&&"complete"!==document.readyState?document.addEventListener("DOMContentLoaded",e,{once:!0}):e()})();