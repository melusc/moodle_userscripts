(()=>{"use strict";var e={859:e=>{e.exports="div.folders-inline-icon{cursor:pointer;user-select:none}div.folders-inline-icon-div{display:inline}li.activity.folder>ul>li>ul li{margin-left:24px}"},176:e=>{e.exports=".shared-login-popup .vertical-horizontal-center{width:100%;height:100%;position:fixed;z-index:100000000;top:0;left:0;display:flex;align-items:center;justify-content:center;pointer-events:none}.shared-login-popup .card{pointer-events:auto}"}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var l=t[o]={exports:{}};return e[o](l,l.exports,n),l.exports}(()=>{var e,t,o,r,l,i,s={},a=[],c=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function _(e,t){for(var n in t)e[n]=t[n];return e}function u(e){var t=e.parentNode;t&&t.removeChild(e)}function p(t,n,o){var r,l,i,s={};for(i in n)"key"==i?r=n[i]:"ref"==i?l=n[i]:s[i]=n[i];if(arguments.length>2&&(s.children=arguments.length>3?e.call(arguments,2):o),"function"==typeof t&&null!=t.defaultProps)for(i in t.defaultProps)void 0===s[i]&&(s[i]=t.defaultProps[i]);return d(t,s,r,l,null)}function d(e,n,r,l,i){var s={type:e,props:n,key:r,ref:l,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==i?++o:i};return null!=t.vnode&&t.vnode(s),s}function f(e){return e.children}function h(e,t){this.props=e,this.context=t}function m(e,t){if(null==t)return e.__?m(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?m(e):null}function v(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return v(e)}}function y(e){(!e.__d&&(e.__d=!0)&&r.push(e)&&!g.__r++||i!==t.debounceRendering)&&((i=t.debounceRendering)||l)(g)}function g(){for(var e;g.__r=r.length;)e=r.sort((function(e,t){return e.__v.__b-t.__v.__b})),r=[],e.some((function(e){var t,n,o,r,l,i;e.__d&&(l=(r=(t=e).__v).__e,(i=t.__P)&&(n=[],(o=_({},r)).__v=r.__v+1,L(i,r,o,t.__n,void 0!==i.ownerSVGElement,null!=r.__h?[l]:null,n,null==l?m(r):l,r.__h),M(n,r),r.__e!=l&&v(r)))}))}function b(e,t,n,o,r,l,i,c,_,u){var p,h,v,y,g,b,x,C=o&&o.__k||a,S=C.length;for(n.__k=[],p=0;p<t.length;p++)if(null!=(y=n.__k[p]=null==(y=t[p])||"boolean"==typeof y?null:"string"==typeof y||"number"==typeof y||"bigint"==typeof y?d(null,y,null,null,y):Array.isArray(y)?d(f,{children:y},null,null,null):y.__b>0?d(y.type,y.props,y.key,null,y.__v):y)){if(y.__=n,y.__b=n.__b+1,null===(v=C[p])||v&&y.key==v.key&&y.type===v.type)C[p]=void 0;else for(h=0;h<S;h++){if((v=C[h])&&y.key==v.key&&y.type===v.type){C[h]=void 0;break}v=null}L(e,y,v=v||s,r,l,i,c,_,u),g=y.__e,(h=y.ref)&&v.ref!=h&&(x||(x=[]),v.ref&&x.push(v.ref,null,y),x.push(h,y.__c||g,y)),null!=g?(null==b&&(b=g),"function"==typeof y.type&&null!=y.__k&&y.__k===v.__k?y.__d=_=w(y,_,e):_=k(e,y,v,C,g,_),u||"option"!==n.type?"function"==typeof n.type&&(n.__d=_):e.value=""):_&&v.__e==_&&_.parentNode!=e&&(_=m(v))}for(n.__e=b,p=S;p--;)null!=C[p]&&("function"==typeof n.type&&null!=C[p].__e&&C[p].__e==n.__d&&(n.__d=m(o,p+1)),E(C[p],C[p]));if(x)for(p=0;p<x.length;p++)D(x[p],x[++p],x[++p])}function w(e,t,n){var o,r;for(o=0;o<e.__k.length;o++)(r=e.__k[o])&&(r.__=e,t="function"==typeof r.type?w(r,t,n):k(n,r,r,e.__k,r.__e,t));return t}function k(e,t,n,o,r,l){var i,s,a;if(void 0!==t.__d)i=t.__d,t.__d=void 0;else if(null==n||r!=l||null==r.parentNode)e:if(null==l||l.parentNode!==e)e.appendChild(r),i=null;else{for(s=l,a=0;(s=s.nextSibling)&&a<o.length;a+=2)if(s==r)break e;e.insertBefore(r,l),i=l}return void 0!==i?i:r.nextSibling}function x(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]=null==n?"":"number"!=typeof n||c.test(t)?n:n+"px"}function C(e,t,n,o,r){var l;e:if("style"===t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof o&&(e.style.cssText=o=""),o)for(t in o)n&&t in n||x(e.style,t,"");if(n)for(t in n)o&&n[t]===o[t]||x(e.style,t,n[t])}else if("o"===t[0]&&"n"===t[1])l=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+l]=n,n?o||e.addEventListener(t,l?P:S,l):e.removeEventListener(t,l?P:S,l);else if("dangerouslySetInnerHTML"!==t){if(r)t=t.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if("href"!==t&&"list"!==t&&"form"!==t&&"tabIndex"!==t&&"download"!==t&&t in e)try{e[t]=null==n?"":n;break e}catch(e){}"function"==typeof n||(null!=n&&(!1!==n||"a"===t[0]&&"r"===t[1])?e.setAttribute(t,n):e.removeAttribute(t))}}function S(e){this.l[e.type+!1](t.event?t.event(e):e)}function P(e){this.l[e.type+!0](t.event?t.event(e):e)}function L(e,n,o,r,l,i,s,a,c){var u,p,d,m,v,y,g,w,k,x,C,S=n.type;if(void 0!==n.constructor)return null;null!=o.__h&&(c=o.__h,a=n.__e=o.__e,n.__h=null,i=[a]),(u=t.__b)&&u(n);try{e:if("function"==typeof S){if(w=n.props,k=(u=S.contextType)&&r[u.__c],x=u?k?k.props.value:u.__:r,o.__c?g=(p=n.__c=o.__c).__=p.__E:("prototype"in S&&S.prototype.render?n.__c=p=new S(w,x):(n.__c=p=new h(w,x),p.constructor=S,p.render=U),k&&k.sub(p),p.props=w,p.state||(p.state={}),p.context=x,p.__n=r,d=p.__d=!0,p.__h=[]),null==p.__s&&(p.__s=p.state),null!=S.getDerivedStateFromProps&&(p.__s==p.state&&(p.__s=_({},p.__s)),_(p.__s,S.getDerivedStateFromProps(w,p.__s))),m=p.props,v=p.state,d)null==S.getDerivedStateFromProps&&null!=p.componentWillMount&&p.componentWillMount(),null!=p.componentDidMount&&p.__h.push(p.componentDidMount);else{if(null==S.getDerivedStateFromProps&&w!==m&&null!=p.componentWillReceiveProps&&p.componentWillReceiveProps(w,x),!p.__e&&null!=p.shouldComponentUpdate&&!1===p.shouldComponentUpdate(w,p.__s,x)||n.__v===o.__v){p.props=w,p.state=p.__s,n.__v!==o.__v&&(p.__d=!1),p.__v=n,n.__e=o.__e,n.__k=o.__k,n.__k.forEach((function(e){e&&(e.__=n)})),p.__h.length&&s.push(p);break e}null!=p.componentWillUpdate&&p.componentWillUpdate(w,p.__s,x),null!=p.componentDidUpdate&&p.__h.push((function(){p.componentDidUpdate(m,v,y)}))}p.context=x,p.props=w,p.state=p.__s,(u=t.__r)&&u(n),p.__d=!1,p.__v=n,p.__P=e,u=p.render(p.props,p.state,p.context),p.state=p.__s,null!=p.getChildContext&&(r=_(_({},r),p.getChildContext())),d||null==p.getSnapshotBeforeUpdate||(y=p.getSnapshotBeforeUpdate(m,v)),C=null!=u&&u.type===f&&null==u.key?u.props.children:u,b(e,Array.isArray(C)?C:[C],n,o,r,l,i,s,a,c),p.base=n.__e,n.__h=null,p.__h.length&&s.push(p),g&&(p.__E=p.__=null),p.__e=!1}else null==i&&n.__v===o.__v?(n.__k=o.__k,n.__e=o.__e):n.__e=O(o.__e,n,o,r,l,i,s,c);(u=t.diffed)&&u(n)}catch(e){n.__v=null,(c||null!=i)&&(n.__e=a,n.__h=!!c,i[i.indexOf(a)]=null),t.__e(e,n,o)}}function M(e,n){t.__c&&t.__c(n,e),e.some((function(n){try{e=n.__h,n.__h=[],e.some((function(e){e.call(n)}))}catch(e){t.__e(e,n.__v)}}))}function O(t,n,o,r,l,i,a,c){var _,p,d,f=o.props,h=n.props,v=n.type,y=0;if("svg"===v&&(l=!0),null!=i)for(;y<i.length;y++)if((_=i[y])&&(_===t||(v?_.localName==v:3==_.nodeType))){t=_,i[y]=null;break}if(null==t){if(null===v)return document.createTextNode(h);t=l?document.createElementNS("http://www.w3.org/2000/svg",v):document.createElement(v,h.is&&h),i=null,c=!1}if(null===v)f===h||c&&t.data===h||(t.data=h);else{if(i=i&&e.call(t.childNodes),p=(f=o.props||s).dangerouslySetInnerHTML,d=h.dangerouslySetInnerHTML,!c){if(null!=i)for(f={},y=0;y<t.attributes.length;y++)f[t.attributes[y].name]=t.attributes[y].value;(d||p)&&(d&&(p&&d.__html==p.__html||d.__html===t.innerHTML)||(t.innerHTML=d&&d.__html||""))}if(function(e,t,n,o,r){var l;for(l in n)"children"===l||"key"===l||l in t||C(e,l,null,n[l],o);for(l in t)r&&"function"!=typeof t[l]||"children"===l||"key"===l||"value"===l||"checked"===l||n[l]===t[l]||C(e,l,t[l],n[l],o)}(t,h,f,l,c),d)n.__k=[];else if(y=n.props.children,b(t,Array.isArray(y)?y:[y],n,o,r,l&&"foreignObject"!==v,i,a,i?i[0]:o.__k&&m(o,0),c),null!=i)for(y=i.length;y--;)null!=i[y]&&u(i[y]);c||("value"in h&&void 0!==(y=h.value)&&(y!==t.value||"progress"===v&&!y)&&C(t,"value",y,f.value,!1),"checked"in h&&void 0!==(y=h.checked)&&y!==t.checked&&C(t,"checked",y,f.checked,!1))}return t}function D(e,n,o){try{"function"==typeof e?e(n):e.current=n}catch(e){t.__e(e,o)}}function E(e,n,o){var r,l;if(t.unmount&&t.unmount(e),(r=e.ref)&&(r.current&&r.current!==e.__e||D(r,null,n)),null!=(r=e.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(e){t.__e(e,n)}r.base=r.__P=null}if(r=e.__k)for(l=0;l<r.length;l++)r[l]&&E(r[l],n,"function"!=typeof e.type);o||null==e.__e||u(e.__e),e.__e=e.__d=void 0}function U(e,t,n){return this.constructor(e,n)}function V(n,o,r){var l,i,a;t.__&&t.__(n,o),i=(l="function"==typeof r)?null:r&&r.__k||o.__k,a=[],L(o,n=(!l&&r||o).__k=p(f,null,[n]),i||s,s,void 0!==o.ownerSVGElement,!l&&r?[r]:i?null:o.firstChild?e.call(o.childNodes):null,a,!l&&r?r:i?i.__e:o.firstChild,l),M(a,n)}e=a.slice,t={__e:function(e,t){for(var n,o,r;t=t.__;)if((n=t.__c)&&!n.__)try{if((o=n.constructor)&&null!=o.getDerivedStateFromError&&(n.setState(o.getDerivedStateFromError(e)),r=n.__d),null!=n.componentDidCatch&&(n.componentDidCatch(e),r=n.__d),r)return n.__E=n}catch(t){e=t}throw e}},o=0,h.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=_({},this.state),"function"==typeof e&&(e=e(_({},n),this.props)),e&&_(n,e),null!=e&&this.__v&&(t&&this.__h.push(t),y(this))},h.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),y(this))},h.prototype.render=f,r=[],l="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,g.__r=0;var T=n(176);let N,j;class G extends h{constructor(){super(...arguments),Object.defineProperty(this,"state",{enumerable:!0,configurable:!0,writable:!0,value:j}),Object.defineProperty(this,"inputs",{enumerable:!0,configurable:!0,writable:!0,value:{username:{current:null},password:{current:null}}}),Object.defineProperty(this,"render",{enumerable:!0,configurable:!0,writable:!0,value:()=>{const{loggedOut:e}=this.state;return e&&p("div",{class:"vertical-horizontal-center"},p("div",{class:"card"},p("div",{class:"card-body"},p("h5",{class:"card-title"},"Login"),p("input",{ref:this.inputs.username,required:!0,placeholder:"Username",class:"input-group-text"}),p("input",{ref:this.inputs.password,required:!0,placeholder:"Password",class:"input-group-text",type:"password"})),p("button",{class:"btn btn-primary",type:"button",onClick:this.handleClick},"Login")))}}),Object.defineProperty(this,"handleClick",{enumerable:!0,configurable:!0,writable:!0,value:()=>{const e=this.inputs.username.current?.value.trim(),t=this.inputs.password.current?.value;e&&t&&this.state?.loggedOutCallback&&this.state.loggedOutCallback({username:e,password:t})}}),Object.defineProperty(this,"componentDidMount",{enumerable:!0,configurable:!0,writable:!0,value:()=>{N=this.setState.bind(this)}})}}const A=e=>{if("function"==typeof N)N(e);else{j=e;const t=document.createElement("div");t.className="shared-login-popup",document.body.append(t),GM_addStyle(T),V(p(G,null),t)}},R=(e=!1)=>{for(const e of["token","lastValidatedToken"])GM_deleteValue(e);if(e)for(const e of["username","password"])GM_deleteValue(e)},W=()=>{GM_setValue("lastValidatedToken",Date.now())};let z;const H=async(e=!1,t=A)=>{if(!e&&z)return z;const n=GM_getValue("token"),o=GM_getValue("lastValidatedToken");return!z&&n&&o&&Date.now()-o<18e6&&(z=Promise.resolve(n)),!e&&z||(z=(async(e=A)=>new Promise((t=>{const n=GM_getValue("username"),o=GM_getValue("password");n&&o?t({username:n,password:o}):e({loggedOut:!0,loggedOutCallback:({username:n,password:o})=>{n&&o&&(GM_setValue("username",n),GM_setValue("password",o),e({loggedOut:!1,loggedOutCallback:void 0}),t({username:n,password:o}))}})})))(t).then((async({username:e,password:n})=>{const o=new URLSearchParams({username:e,password:n,service:"moodle_mobile_app"});return fetch("/login/token.php",{method:"POST",body:o.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}}).then((async e=>e.json())).then((e=>"errorcode"in e?(R(!0),H(!0,t)):(GM_setValue("token",e.token),W(),e.token)))}))),z};var q=n(859);
// ==UserScript==
// @name      Moodle open folders inline preact
// @version   2021.07.06a
// @author    lusc
// @include   https://moodle.ksasz.ch/course/view.php?id=*
// @updateURL https://git.io/Jqlt0
// @grant     GM_setValue
// @grant     GM_getValue
// @grant     GM_deleteValue
// @grant     GM_addStyle
// @run-at    document-start
// ==/UserScript==
GM_addStyle(q);const F=async(e=!1)=>H(e).then((async e=>{const t=new URLSearchParams(location.search).get("id");if(!t)return!1;const n=new URLSearchParams({courseid:t,"options[0][name]":"includestealthmodules","options[0][value]":"1",moodlewsrestformat:"json",wsfunction:"core_course_get_contents",wstoken:e});return fetch("/webservice/rest/server.php",{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:n.toString()}).then((async e=>e.json())).then((e=>!Array.isArray(e)&&"exception"in e?(R(),F(!0)):(W(),e)))})),I=(()=>{const e={"application/pdf":"pdf-256","application/zip":"archive-256","application/vnd.openxmlformats-officedocument.wordprocessingml.document":"document-256","application/msword":"document-256","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"spreadsheet-256","application/vnd.ms-excel":"spreadsheet-256","application/vnd.openxmlformats-officedocument.presentationml.presentation":"powerpoint-256","application/vnd.ms-powerpoint":"powerpoint-256","text/plain":"sourcecode-256","audio/mp3":"mp3-256","audio/mp4":"mp3-256","video/quicktime":"quicktime-256","video/mp4":"mpeg-256"};return(t,n)=>{const o=e[t];return o?`/theme/image.php/classic/core/1601902087/f/${o}`:n}})(),B=e=>{const t=e.trim().split("/"),n=[];for(const e of t)e&&n.push(e);return n},$=({contents:e,base:t,directoryDepth:n=0})=>{const o={"/":[]};for(const t of e)if("isexternalfile"in t){const e=t.filepath[n]??"/";(o[e]??(o[e]=[])).push(t)}const r=o["/"];r&&(r.sort(((e,t)=>{const n=e.filename.toLowerCase(),o=t.filename.toLowerCase();return n<o?-1:n>o?1:0})),delete o["/"]);const l=Object.entries(o).sort(((e,t)=>{const n=e[0].toLowerCase(),o=t[0].toLowerCase();return n<o?-1:n>o?1:0}));return p(f,null,"string"==typeof t&&p("div",{class:"fp-filename-icon folders-inline-icon"},p("div",{class:"folders-inline-icon-div"},p("i",{class:"icon fa fa-caret-right fa-fw navicon folders-inline-caret"}),p("img",{class:"iconlarge activityicon",alt:t,role:"presentation",title:t,"aria-hidden":"true",src:"/theme/image.php/classic/core/1601902087/f/folder-128"})),p("span",{class:"fp-filename"},t)),p("ul",{style:{listStyle:"none"},hidden:Boolean(t)},l.map((([e,t])=>p("li",{key:e},p($,{contents:t,base:e,directoryDepth:n+1})))),r?.map((({fileurl:e,mimetype:t,filename:n})=>{const o=new URL(e,"https://moodle.ksasz.ch");o.pathname=o.pathname.replace(/^\/webservice/,"");const r=new URL(o.href);return t.startsWith("image")||r.searchParams.set("preview","1"),p("li",{key:n},p("span",{class:"fp-filename-icon"},p("a",{href:o.href},p("span",{class:"fp-icon"},p("img",{alt:n,title:n,src:I(t,r.href)})),p("span",{class:"fp-filename"},n))))}))))},J=(()=>{let e;return t=>{if(!(t.target instanceof Element))return;const n=t.target.closest("a"),o=n?.querySelector("svg.svg-refresh")?.parentNode,r=n?.closest("li.activity.folder"),l=t.target.closest("div.fp-filename-icon");if(l){const e=l.nextElementSibling;e.hidden=!e.hidden;const n=l.querySelector(".folders-inline-caret");return n&&(n.classList.toggle("fa-caret-right"),n.classList.toggle("fa-caret-down")),t.preventDefault(),void t.stopPropagation()}if(t.target.closest("span")===o)return t.preventDefault(),t.stopPropagation(),r?.lastElementChild?.remove(),e=void 0,void n?.click();if("/mod/folder/view.php"===n?.pathname&&r){if(t.ctrlKey)return;if(t.preventDefault(),t.stopPropagation(),r.childElementCount>1)return r.lastElementChild?.remove(),void o?.remove();if(!o){const e=document.createElement("span");V(p("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"currentColor","aria-hidden":"true",class:"icon navicon svg-refresh",style:{marginLeft:5},viewBox:"0 0 512 512"},p("path",{d:"M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"})),e),n.append(e)}e||(e=F()),e.then((e=>{if(!1===e)return void console.error("pageContentJSON was false.");const t=n.closest("li.section.main")?.getAttribute("aria-labelledby")?.match(/(?<=-)\d+(?=-)/)?.[0];if(!t)return void console.error("sectionId was undefined.");const o=e.find((({id:e})=>e===Number(t)));if(!o)return void console.error("Could not find sectionObject.");const{modules:l}=o,i=/\d+$/.exec(r.id)?.[0];if(!i)return void console.error("Could not get folderId.");const s=l.find((({id:e})=>e===Number(i)));if(!s)return void console.error("Could not find folderObject.");if(!("contents"in s))return void console.info("folderObject was a description.");const{contents:a}=s,c=[];for(const e of a)"isexternalfile"in e&&c.push({...e,filepath:B(e.filepath)});const _=document.createDocumentFragment();V(p($,{contents:c}),_),r.append(_)}))}}})(),K=()=>{document.querySelector("div.course-content > ul.topics")?.addEventListener("click",J)};"complete"===document.readyState?K():addEventListener("DOMContentLoaded",K,{once:!0})})()})();