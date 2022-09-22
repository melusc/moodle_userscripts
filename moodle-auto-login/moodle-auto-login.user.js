/*! For license information please see moodle-auto-login.user.js.LICENSE.txt */
(()=>{"use strict";
// ==UserScript==
// @name       Moodle Auto Login
// @version    1.0.0
// @author     lusc
// @match      *://moodle.ksasz.ch/*
// @grant      GM_setValue
// @grant      GM_getValue
// @run-at     document-start
// @license    MIT
// @updateURL  https://github.com/melusc/moodle_userscripts/raw/userscript-out/moodle-auto-login/moodle-auto-login.user.js
// ==/UserScript==
"https:"!==location.protocol&&(location.protocol="https:");const e=()=>{GM_setValue("last",Date.now())},t=(t,o,n)=>{t.addEventListener("submit",(()=>{GM_setValue("username",o.value),GM_setValue("password",n.value),e()}))};var o;location.pathname.startsWith("/login/index.php")&&(o=()=>{const o=document.querySelector("#username"),n=document.querySelector("#password"),a=document.querySelector("#login"),s=GM_getValue("password"),r=GM_getValue("username");if(!o||!n||!a)return;if(!s||!r)return void t(a,o,n);o.value=r;const i=Date.now()-GM_getValue("last"),l=document.querySelector("#loginerrormessage")?.textContent;if(!Number.isFinite(i)||i>1e4||l&&/session has timed out/i.test(l))return n.value=s,e(),void a.submit();l&&/invalid login/i.test(l)||console.log("[%cMoodle Auto Login%c] Last attempt was too recently, waiting %ds to prevent infinite loop.","color: #0074d9","",(1e4-i)/1e3),t(a,o,n)},"interactive"!==document.readyState&&"complete"!==document.readyState?document.addEventListener("DOMContentLoaded",o,{once:!0}):o())})();