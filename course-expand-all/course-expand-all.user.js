/*! For license information please see course-expand-all.user.js.LICENSE.txt */
(()=>{"use strict";var e;
// ==UserScript==
// @name        Moodle Course Expand All
// @match       *://moodle.*/course/view.php
// @match       *://moodle*.*/course/view.php
// @grant       none
// @version     0.0.1
// @author     lusc
// @license    MIT
// @run-at     document-start
// @updateURL  https://github.com/melusc/moodle_userscripts/raw/userscript-out/course-expand-all/course-expand-all.user.js
// ==/UserScript==
e=()=>{const e=document.querySelector('script[src$="/course/format/multitopic/format.js"]'),t=document.querySelector("div.collapsible-actions");if(!t||!e)return;const o=()=>{M.course.format.fmtCollapseAllOnClick({target:t,preventDefault(){}}),M.course.format.fmtCollapseOnHashChange=()=>{}};try{o()}catch{}e.addEventListener("load",o)},"interactive"!==document.readyState&&"complete"!==document.readyState?document.addEventListener("DOMContentLoaded",e,{once:!0}):e()})();