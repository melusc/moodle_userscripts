(()=>{var e={713:e=>{e.exports=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}},290:e=>{"use strict";e.exports="@-webkit-keyframes ucmr-spin{0%{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg)}}@-moz-keyframes ucmr-spin{0%{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg)}}@-o-keyframes ucmr-spin{0%{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg)}}@keyframes ucmr-spin{0%{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg)}}#module-marks{line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;cursor:default;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent;word-break:break-word}#module-marks *{box-sizing:border-box}#module-marks .login{display:flex;flex-direction:column;justify-content:center;width:max-content}#module-marks .login button,#module-marks .login input{flex:0 0 100%;margin:3px 0;padding:.2em .5em}#module-marks .ucmr-error,#module-marks .ucmr-title{font-size:large;font-weight:450}#module-marks .ucmr-title{margin-bottom:10px}#module-marks .ucmr-error{color:#ff4136}#module-marks .ucmr-circle-notch{width:1em;height:1em;animation:ucmr-spin 2s infinite linear}#module-marks .ucmr-row{display:flex;flex-direction:row}#module-marks .ucmr-course{flex-basis:30%}#module-marks .ucmr-name{flex-basis:45%}#module-marks .ucmr-date{flex-basis:15%}#module-marks .ucmr-mark{flex-basis:10%}"}},t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={exports:{}};return e[n](o,o.exports,r),o.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e,t,n,o,l=r(713),s=r.n(l),i={},a=[],_=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function u(e,t){for(var r in t)e[r]=t[r];return e}function c(e){var t=e.parentNode;t&&t.removeChild(e)}function d(e,t,r){var n,o,l,s=arguments,i={};for(l in t)"key"==l?n=t[l]:"ref"==l?o=t[l]:i[l]=t[l];if(arguments.length>3)for(r=[r],l=3;l<arguments.length;l++)r.push(s[l]);if(null!=r&&(i.children=r),"function"==typeof e&&null!=e.defaultProps)for(l in e.defaultProps)void 0===i[l]&&(i[l]=e.defaultProps[l]);return m(e,i,n,o,null)}function m(t,r,n,o,l){var s={type:t,props:r,key:n,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==l?++e.__v:l};return null!=e.vnode&&e.vnode(s),s}function p(e){return e.children}function f(e,t){this.props=e,this.context=t}function h(e,t){if(null==t)return e.__?h(e.__,e.__.__k.indexOf(e)+1):null;for(var r;t<e.__k.length;t++)if(null!=(r=e.__k[t])&&null!=r.__e)return r.__e;return"function"==typeof e.type?h(e):null}function g(e){var t,r;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(r=e.__k[t])&&null!=r.__e){e.__e=e.__c.base=r.__e;break}return g(e)}}function v(r){(!r.__d&&(r.__d=!0)&&t.push(r)&&!y.__r++||o!==e.debounceRendering)&&((o=e.debounceRendering)||n)(y)}function y(){for(var e;y.__r=t.length;)e=t.sort((function(e,t){return e.__v.__b-t.__v.__b})),t=[],e.some((function(e){var t,r,n,o,l,s;e.__d&&(l=(o=(t=e).__v).__e,(s=t.__P)&&(r=[],(n=u({},o)).__v=o.__v+1,P(s,o,n,t.__n,void 0!==s.ownerSVGElement,null!=o.__h?[l]:null,r,null==l?h(o):l,o.__h),z(r,o),o.__e!=l&&g(o)))}))}function k(e,t,r,n,o,l,s,_,u,c){var d,f,g,v,y,k,x,S=n&&n.__k||a,M=S.length;for(r.__k=[],d=0;d<t.length;d++)if(null!=(v=r.__k[d]=null==(v=t[d])||"boolean"==typeof v?null:"string"==typeof v||"number"==typeof v?m(null,v,null,null,v):Array.isArray(v)?m(p,{children:v},null,null,null):v.__b>0?m(v.type,v.props,v.key,null,v.__v):v)){if(v.__=r,v.__b=r.__b+1,null===(g=S[d])||g&&v.key==g.key&&v.type===g.type)S[d]=void 0;else for(f=0;f<M;f++){if((g=S[f])&&v.key==g.key&&v.type===g.type){S[f]=void 0;break}g=null}P(e,v,g=g||i,o,l,s,_,u,c),y=v.__e,(f=v.ref)&&g.ref!=f&&(x||(x=[]),g.ref&&x.push(g.ref,null,v),x.push(f,v.__c||y,v)),null!=y?(null==k&&(k=y),"function"==typeof v.type&&null!=v.__k&&v.__k===g.__k?v.__d=u=b(v,u,e):u=w(e,v,g,S,y,u),c||"option"!==r.type?"function"==typeof r.type&&(r.__d=u):e.value=""):u&&g.__e==u&&u.parentNode!=e&&(u=h(g))}for(r.__e=k,d=M;d--;)null!=S[d]&&("function"==typeof r.type&&null!=S[d].__e&&S[d].__e==r.__d&&(r.__d=h(n,d+1)),O(S[d],S[d]));if(x)for(d=0;d<x.length;d++)L(x[d],x[++d],x[++d])}function b(e,t,r){var n,o;for(n=0;n<e.__k.length;n++)(o=e.__k[n])&&(o.__=e,t="function"==typeof o.type?b(o,t,r):w(r,o,o,e.__k,o.__e,t));return t}function w(e,t,r,n,o,l){var s,i,a;if(void 0!==t.__d)s=t.__d,t.__d=void 0;else if(null==r||o!=l||null==o.parentNode)e:if(null==l||l.parentNode!==e)e.appendChild(o),s=null;else{for(i=l,a=0;(i=i.nextSibling)&&a<n.length;a+=2)if(i==o)break e;e.insertBefore(o,l),s=l}return void 0!==s?s:o.nextSibling}function x(e,t,r){"-"===t[0]?e.setProperty(t,r):e[t]=null==r?"":"number"!=typeof r||_.test(t)?r:r+"px"}function S(e,t,r,n,o){var l;e:if("style"===t)if("string"==typeof r)e.style.cssText=r;else{if("string"==typeof n&&(e.style.cssText=n=""),n)for(t in n)r&&t in r||x(e.style,t,"");if(r)for(t in r)n&&r[t]===n[t]||x(e.style,t,r[t])}else if("o"===t[0]&&"n"===t[1])l=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+l]=r,r?n||e.addEventListener(t,l?C:M,l):e.removeEventListener(t,l?C:M,l);else if("dangerouslySetInnerHTML"!==t){if(o)t=t.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if("href"!==t&&"list"!==t&&"form"!==t&&"download"!==t&&t in e)try{e[t]=null==r?"":r;break e}catch(e){}"function"==typeof r||(null!=r&&(!1!==r||"a"===t[0]&&"r"===t[1])?e.setAttribute(t,r):e.removeAttribute(t))}}function M(t){this.l[t.type+!1](e.event?e.event(t):t)}function C(t){this.l[t.type+!0](e.event?e.event(t):t)}function P(t,r,n,o,l,s,i,a,_){var c,d,m,h,g,v,y,b,w,x,S,M=r.type;if(void 0!==r.constructor)return null;null!=n.__h&&(_=n.__h,a=r.__e=n.__e,r.__h=null,s=[a]),(c=e.__b)&&c(r);try{e:if("function"==typeof M){if(b=r.props,w=(c=M.contextType)&&o[c.__c],x=c?w?w.props.value:c.__:o,n.__c?y=(d=r.__c=n.__c).__=d.__E:("prototype"in M&&M.prototype.render?r.__c=d=new M(b,x):(r.__c=d=new f(b,x),d.constructor=M,d.render=T),w&&w.sub(d),d.props=b,d.state||(d.state={}),d.context=x,d.__n=o,m=d.__d=!0,d.__h=[]),null==d.__s&&(d.__s=d.state),null!=M.getDerivedStateFromProps&&(d.__s==d.state&&(d.__s=u({},d.__s)),u(d.__s,M.getDerivedStateFromProps(b,d.__s))),h=d.props,g=d.state,m)null==M.getDerivedStateFromProps&&null!=d.componentWillMount&&d.componentWillMount(),null!=d.componentDidMount&&d.__h.push(d.componentDidMount);else{if(null==M.getDerivedStateFromProps&&b!==h&&null!=d.componentWillReceiveProps&&d.componentWillReceiveProps(b,x),!d.__e&&null!=d.shouldComponentUpdate&&!1===d.shouldComponentUpdate(b,d.__s,x)||r.__v===n.__v){d.props=b,d.state=d.__s,r.__v!==n.__v&&(d.__d=!1),d.__v=r,r.__e=n.__e,r.__k=n.__k,d.__h.length&&i.push(d);break e}null!=d.componentWillUpdate&&d.componentWillUpdate(b,d.__s,x),null!=d.componentDidUpdate&&d.__h.push((function(){d.componentDidUpdate(h,g,v)}))}d.context=x,d.props=b,d.state=d.__s,(c=e.__r)&&c(r),d.__d=!1,d.__v=r,d.__P=t,c=d.render(d.props,d.state,d.context),d.state=d.__s,null!=d.getChildContext&&(o=u(u({},o),d.getChildContext())),m||null==d.getSnapshotBeforeUpdate||(v=d.getSnapshotBeforeUpdate(h,g)),S=null!=c&&c.type===p&&null==c.key?c.props.children:c,k(t,Array.isArray(S)?S:[S],r,n,o,l,s,i,a,_),d.base=r.__e,r.__h=null,d.__h.length&&i.push(d),y&&(d.__E=d.__=null),d.__e=!1}else null==s&&r.__v===n.__v?(r.__k=n.__k,r.__e=n.__e):r.__e=G(n.__e,r,n,o,l,s,i,_);(c=e.diffed)&&c(r)}catch(t){r.__v=null,(_||null!=s)&&(r.__e=a,r.__h=!!_,s[s.indexOf(a)]=null),e.__e(t,r,n)}}function z(t,r){e.__c&&e.__c(r,t),t.some((function(r){try{t=r.__h,r.__h=[],t.some((function(e){e.call(r)}))}catch(t){e.__e(t,r.__v)}}))}function G(e,t,r,n,o,l,s,_){var u,d,m,p,f=r.props,h=t.props,g=t.type,v=0;if("svg"===g&&(o=!0),null!=l)for(;v<l.length;v++)if((u=l[v])&&(u===e||(g?u.localName==g:3==u.nodeType))){e=u,l[v]=null;break}if(null==e){if(null===g)return document.createTextNode(h);e=o?document.createElementNS("http://www.w3.org/2000/svg",g):document.createElement(g,h.is&&h),l=null,_=!1}if(null===g)f===h||_&&e.data===h||(e.data=h);else{if(l=l&&a.slice.call(e.childNodes),d=(f=r.props||i).dangerouslySetInnerHTML,m=h.dangerouslySetInnerHTML,!_){if(null!=l)for(f={},p=0;p<e.attributes.length;p++)f[e.attributes[p].name]=e.attributes[p].value;(m||d)&&(m&&(d&&m.__html==d.__html||m.__html===e.innerHTML)||(e.innerHTML=m&&m.__html||""))}if(function(e,t,r,n,o){var l;for(l in r)"children"===l||"key"===l||l in t||S(e,l,null,r[l],n);for(l in t)o&&"function"!=typeof t[l]||"children"===l||"key"===l||"value"===l||"checked"===l||r[l]===t[l]||S(e,l,t[l],r[l],n)}(e,h,f,o,_),m)t.__k=[];else if(v=t.props.children,k(e,Array.isArray(v)?v:[v],t,r,n,o&&"foreignObject"!==g,l,s,e.firstChild,_),null!=l)for(v=l.length;v--;)null!=l[v]&&c(l[v]);_||("value"in h&&void 0!==(v=h.value)&&(v!==e.value||"progress"===g&&!v)&&S(e,"value",v,f.value,!1),"checked"in h&&void 0!==(v=h.checked)&&v!==e.checked&&S(e,"checked",v,f.checked,!1))}return e}function L(t,r,n){try{"function"==typeof t?t(r):t.current=r}catch(t){e.__e(t,n)}}function O(t,r,n){var o,l,s;if(e.unmount&&e.unmount(t),(o=t.ref)&&(o.current&&o.current!==t.__e||L(o,null,r)),n||"function"==typeof t.type||(n=null!=(l=t.__e)),t.__e=t.__d=void 0,null!=(o=t.__c)){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(t){e.__e(t,r)}o.base=o.__P=null}if(o=t.__k)for(s=0;s<o.length;s++)o[s]&&O(o[s],r,n);null!=l&&c(l)}function T(e,t,r){return this.constructor(e,r)}e={__e:function(e,t){for(var r,n,o;t=t.__;)if((r=t.__c)&&!r.__)try{if((n=r.constructor)&&null!=n.getDerivedStateFromError&&(r.setState(n.getDerivedStateFromError(e)),o=r.__d),null!=r.componentDidCatch&&(r.componentDidCatch(e),o=r.__d),o)return r.__E=r}catch(t){e=t}throw e},__v:0},f.prototype.setState=function(e,t){var r;r=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=u({},this.state),"function"==typeof e&&(e=e(u({},r),this.props)),e&&u(r,e),null!=e&&this.__v&&(t&&this.__h.push(t),v(this))},f.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),v(this))},f.prototype.render=p,t=[],n="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,y.__r=0;var U=r(290);
// ==UserScript==
// @name      Unconfirmed Marks Preact
// @version   2021.02.17a
// @author    lusc
// @include   *://moodle.ksasz.ch/
// @include   *://moodle.ksasz.ch/?*
// @updateURL https://github.com/melusc/moodle_userscripts/raw/main/dist/Unconfirmed%20Marks/unconfirmed-marks.user.js
// @grant     GM_xmlhttpRequest
// @grant     GM.setValue
// @grant     GM.getValue
// @grant     GM_addStyle
// @grant     GM.deleteValue
// @run-at    document-start
// @connect   www.schul-netz.com
// ==/UserScript==
const A=()=>{const t=document.querySelector("#region-main ul.section"),r=document.createElement("li");r.id="module-marks",r.className="activity label modtype_label";const n=document.querySelector("#module-timetable-v5");n?n.after(r):t.prepend(r),function(t,r,n){var o,l,s;e.__&&e.__(t,r),l=(o=!1)?null:r.__k,s=[],P(r,t=r.__k=d(p,null,[t]),l||i,i,void 0!==r.ownerSVGElement,l?null:r.firstChild?a.slice.call(r.childNodes):null,s,l?l.__e:r.firstChild,o),z(s,t)}(d(E,null),r),GM_addStyle(U)},D=()=>d("svg",{"aria-hidden":"true",class:"ucmr-circle-notch ucmr-spin",viewBox:"0 0 512 512"},d("path",{fill:"currentColor",d:"M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z"}));class E extends f{constructor(...e){super(...e),s()(this,"state",{marks:[],loading:!0,error:!1,errorMsg:"",loggedOut:!1}),s()(this,"inputs",{login:{current:null},password:{current:null},page:{current:null}}),s()(this,"render",((e,{marks:t,loading:r,error:n,errorMsg:o,loggedOut:l})=>d("div",{class:"mod-indent-outer"},d("div",{class:"contentwithoutlink"},d("div",{class:"ucmr-title"},"Unconfirmed Marks"),r&&!n&&d(D,null),!l&&!n&&Array.isArray(t)&&d("div",null,Array.isArray(t)&&t.map((({key:e,course:t,name:r,date:n,mark:o})=>d("div",{key:e,class:"ucmr-row"},d("div",{class:"ucmr-course"},t),d("div",{class:"ucmr-name"},r),d("div",{class:"ucmr-date"},n),d("div",{class:"ucmr-mark"},o))))),l&&d("div",{class:"login"},d("input",{class:"form-control",required:!0,ref:this.inputs.login,placeholder:"Username",type:"text"}),d("input",{class:"form-control",required:!0,ref:this.inputs.password,placeholder:"Password",type:"password"}),d("input",{class:"form-control",required:!0,ref:this.inputs.page,placeholder:"Page (ausserschwyz, einsiedeln...)",type:"text"}),d("button",{class:"btn btn-primary",onclick:this.handleLogin},"Save")),!l&&!1===t&&d("div",null,"Sie haben alle Noten bestätigt."),n&&d("div",{class:"ucmr-error"},o??"Something went wrong"))))),s()(this,"handleLogin",(()=>{const e=this.inputs.login.current.value,t=this.inputs.password.current.value,r=this.inputs.page.current.value;e&&t&&r&&Promise.all([GM.setValue("login",e),GM.setValue("password",t),GM.setValue("page",r)]).then((()=>{this.setState({loggedOut:!1,loading:!0}),this.getMarks()}))}))}componentDidMount(){this.checkCredentials()}checkCredentials(){Promise.all([GM.getValue("login"),GM.getValue("password"),GM.getValue("page")]).then((([e,t,r])=>{e&&t&&r?this.getMarks():this.setState({loggedOut:!0,loading:!1})}))}getMarks(){Promise.all([GM.getValue("login"),GM.getValue("password"),GM.getValue("page")]).then((([e,t,r])=>{new Promise(((e,t)=>{GM_xmlhttpRequest({method:"GET",url:`https://www.schul-netz.com/${r}/loginto.php`,onload:e,timeout:1e4,onerror:t,onabort:t,ontimeout:t})})).then((n=>{const o=(new DOMParser).parseFromString(n.responseText,"text/html"),l=new URLSearchParams({loginhash:o.querySelector('input[name="loginhash"]').value,login:e,passwort:t}),s=n.responseHeaders.match(/phpsessid=\w{26}(?=;)/giu).pop();return new Promise(((e,t)=>{GM_xmlhttpRequest({method:"POST",url:`https://www.schul-netz.com/${r}/index.php?pageid=`,cookie:s,data:l.toString(),headers:{"Content-Type":"application/x-www-form-urlencoded"},timeout:1e4,onload:e,nocache:!0,revalidate:!0,onerror:t,onabort:t,ontimeout:t})}))})).catch((e=>{console.error(e),this.setState({loggedOut:!0,loading:!1});for(const e of["login","password","page"])GM.deleteValue(e)})).then((e=>{if("object"!=typeof e||e.cancelled)return;if(new URL(e.finalUrl).pathname.endsWith("loginto.php")){for(const e of["login","password","page"])GM.deleteValue(e);return void this.setState({loggedOut:!0,loading:!1})}const t=(new DOMParser).parseFromString(e.responseText,"text/html"),n=[...t.querySelectorAll("h3.tabletitle")].find((e=>"ihre letzten noten"===e.textContent.toLowerCase().trim())).nextElementSibling,{rows:o}=n,l=[];let s=!1;for(const e of o){const[t,r,n,o]=[...e.children].map((e=>e.textContent.trim()));if(/sie haben alle noten bestätigt./i.test(t)){this.setState({marks:!1}),s=!0;break}l.push({course:t,name:r,date:n,mark:o,key:V()})}s||this.setState({marks:l}),this.setState({loading:!1});const i=[...t.querySelectorAll("a.mdl-menu__item")].find((e=>"abmelden"===e.textContent.toLowerCase().trim()));i&&GM_xmlhttpRequest({method:"GET",url:`https://www.schul-netz.com/${r}/${i.getAttribute("href")}`,anonymous:!0})})).catch((e=>{console.error(e),this.setState({error:!0})}))}))}}const V=()=>([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16)));"complete"===document.readyState?A():addEventListener("DOMContentLoaded",A,{once:!0})})()})();