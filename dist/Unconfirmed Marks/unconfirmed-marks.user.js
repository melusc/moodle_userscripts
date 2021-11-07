(()=>{"use strict";var e={495:e=>{e.exports="@keyframes ucmr-spin{0%{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg)}}#module-marks{line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:transparent;word-break:break-word}#module-marks *{box-sizing:border-box}#module-marks .login-form{display:flex;flex-direction:column;justify-content:center;width:max-content}#module-marks .login-form button,#module-marks .login-form input{flex:0 0 100%;margin:3px 0;padding:.2em .5em}#module-marks .ucmr-error,#module-marks .ucmr-title{font-size:large;font-weight:450}#module-marks .ucmr-title{margin-bottom:10px}#module-marks .ucmr-error{color:#ea4335}#module-marks .ucmr-circle-notch{width:1em;height:1em;animation:ucmr-spin 2s infinite linear}#module-marks .ucmr-row{display:grid;grid-template-columns:30% 45% 15% 10%}"}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var l=t[r]={exports:{}};return e[r](l,l.exports,n),l.exports}(()=>{var e,t,r,o,l,s,i={},u=[],_=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function a(e,t){for(var n in t)e[n]=t[n];return e}function c(e){var t=e.parentNode;t&&t.removeChild(e)}function d(t,n,r){var o,l,s,i={};for(s in n)"key"==s?o=n[s]:"ref"==s?l=n[s]:i[s]=n[s];if(arguments.length>2&&(i.children=arguments.length>3?e.call(arguments,2):r),"function"==typeof t&&null!=t.defaultProps)for(s in t.defaultProps)void 0===i[s]&&(i[s]=t.defaultProps[s]);return p(t,i,o,l,null)}function p(e,n,o,l,s){var i={type:e,props:n,key:o,ref:l,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==s?++r:s};return null==s&&null!=t.vnode&&t.vnode(i),i}function m(e){return e.children}function f(e,t){this.props=e,this.context=t}function h(e,t){if(null==t)return e.__?h(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?h(e):null}function g(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return g(e)}}function v(e){(!e.__d&&(e.__d=!0)&&o.push(e)&&!y.__r++||s!==t.debounceRendering)&&((s=t.debounceRendering)||l)(y)}function y(){for(var e;y.__r=o.length;)e=o.sort((function(e,t){return e.__v.__b-t.__v.__b})),o=[],e.some((function(e){var t,n,r,o,l,s;e.__d&&(l=(o=(t=e).__v).__e,(s=t.__P)&&(n=[],(r=a({},o)).__v=o.__v+1,P(s,o,r,t.__n,void 0!==s.ownerSVGElement,null!=o.__h?[l]:null,n,null==l?h(o):l,o.__h),R(n,o),o.__e!=l&&g(o)))}))}function k(e,t,n,r,o,l,s,_,a,c){var d,f,g,v,y,k,x,M=r&&r.__k||u,S=M.length;for(n.__k=[],d=0;d<t.length;d++)if(null!=(v=n.__k[d]=null==(v=t[d])||"boolean"==typeof v?null:"string"==typeof v||"number"==typeof v||"bigint"==typeof v?p(null,v,null,null,v):Array.isArray(v)?p(m,{children:v},null,null,null):v.__b>0?p(v.type,v.props,v.key,null,v.__v):v)){if(v.__=n,v.__b=n.__b+1,null===(g=M[d])||g&&v.key==g.key&&v.type===g.type)M[d]=void 0;else for(f=0;f<S;f++){if((g=M[f])&&v.key==g.key&&v.type===g.type){M[f]=void 0;break}g=null}P(e,v,g=g||i,o,l,s,_,a,c),y=v.__e,(f=v.ref)&&g.ref!=f&&(x||(x=[]),g.ref&&x.push(g.ref,null,v),x.push(f,v.__c||y,v)),null!=y?(null==k&&(k=y),"function"==typeof v.type&&v.__k===g.__k?v.__d=a=b(v,a,e):a=w(e,v,g,M,y,a),"function"==typeof n.type&&(n.__d=a)):a&&g.__e==a&&a.parentNode!=e&&(a=h(g))}for(n.__e=k,d=S;d--;)null!=M[d]&&("function"==typeof n.type&&null!=M[d].__e&&M[d].__e==n.__d&&(n.__d=h(r,d+1)),D(M[d],M[d]));if(x)for(d=0;d<x.length;d++)E(x[d],x[++d],x[++d])}function b(e,t,n){for(var r,o=e.__k,l=0;o&&l<o.length;l++)(r=o[l])&&(r.__=e,t="function"==typeof r.type?b(r,t,n):w(n,r,r,o,r.__e,t));return t}function w(e,t,n,r,o,l){var s,i,u;if(void 0!==t.__d)s=t.__d,t.__d=void 0;else if(null==n||o!=l||null==o.parentNode)e:if(null==l||l.parentNode!==e)e.appendChild(o),s=null;else{for(i=l,u=0;(i=i.nextSibling)&&u<r.length;u+=2)if(i==o)break e;e.insertBefore(o,l),s=l}return void 0!==s?s:o.nextSibling}function x(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]=null==n?"":"number"!=typeof n||_.test(t)?n:n+"px"}function M(e,t,n,r,o){var l;e:if("style"===t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof r&&(e.style.cssText=r=""),r)for(t in r)n&&t in n||x(e.style,t,"");if(n)for(t in n)r&&n[t]===r[t]||x(e.style,t,n[t])}else if("o"===t[0]&&"n"===t[1])l=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+l]=n,n?r||e.addEventListener(t,l?C:S,l):e.removeEventListener(t,l?C:S,l);else if("dangerouslySetInnerHTML"!==t){if(o)t=t.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if("href"!==t&&"list"!==t&&"form"!==t&&"tabIndex"!==t&&"download"!==t&&t in e)try{e[t]=null==n?"":n;break e}catch(e){}"function"==typeof n||(null!=n&&(!1!==n||"a"===t[0]&&"r"===t[1])?e.setAttribute(t,n):e.removeAttribute(t))}}function S(e){this.l[e.type+!1](t.event?t.event(e):e)}function C(e){this.l[e.type+!0](t.event?t.event(e):e)}function P(e,n,r,o,l,s,i,u,_){var c,d,p,h,g,v,y,b,w,x,M,S=n.type;if(void 0!==n.constructor)return null;null!=r.__h&&(_=r.__h,u=n.__e=r.__e,n.__h=null,s=[u]),(c=t.__b)&&c(n);try{e:if("function"==typeof S){if(b=n.props,w=(c=S.contextType)&&o[c.__c],x=c?w?w.props.value:c.__:o,r.__c?y=(d=n.__c=r.__c).__=d.__E:("prototype"in S&&S.prototype.render?n.__c=d=new S(b,x):(n.__c=d=new f(b,x),d.constructor=S,d.render=G),w&&w.sub(d),d.props=b,d.state||(d.state={}),d.context=x,d.__n=o,p=d.__d=!0,d.__h=[]),null==d.__s&&(d.__s=d.state),null!=S.getDerivedStateFromProps&&(d.__s==d.state&&(d.__s=a({},d.__s)),a(d.__s,S.getDerivedStateFromProps(b,d.__s))),h=d.props,g=d.state,p)null==S.getDerivedStateFromProps&&null!=d.componentWillMount&&d.componentWillMount(),null!=d.componentDidMount&&d.__h.push(d.componentDidMount);else{if(null==S.getDerivedStateFromProps&&b!==h&&null!=d.componentWillReceiveProps&&d.componentWillReceiveProps(b,x),!d.__e&&null!=d.shouldComponentUpdate&&!1===d.shouldComponentUpdate(b,d.__s,x)||n.__v===r.__v){d.props=b,d.state=d.__s,n.__v!==r.__v&&(d.__d=!1),d.__v=n,n.__e=r.__e,n.__k=r.__k,n.__k.forEach((function(e){e&&(e.__=n)})),d.__h.length&&i.push(d);break e}null!=d.componentWillUpdate&&d.componentWillUpdate(b,d.__s,x),null!=d.componentDidUpdate&&d.__h.push((function(){d.componentDidUpdate(h,g,v)}))}d.context=x,d.props=b,d.state=d.__s,(c=t.__r)&&c(n),d.__d=!1,d.__v=n,d.__P=e,c=d.render(d.props,d.state,d.context),d.state=d.__s,null!=d.getChildContext&&(o=a(a({},o),d.getChildContext())),p||null==d.getSnapshotBeforeUpdate||(v=d.getSnapshotBeforeUpdate(h,g)),M=null!=c&&c.type===m&&null==c.key?c.props.children:c,k(e,Array.isArray(M)?M:[M],n,r,o,l,s,i,u,_),d.base=n.__e,n.__h=null,d.__h.length&&i.push(d),y&&(d.__E=d.__=null),d.__e=!1}else null==s&&n.__v===r.__v?(n.__k=r.__k,n.__e=r.__e):n.__e=T(r.__e,n,r,o,l,s,i,_);(c=t.diffed)&&c(n)}catch(e){n.__v=null,(_||null!=s)&&(n.__e=u,n.__h=!!_,s[s.indexOf(u)]=null),t.__e(e,n,r)}}function R(e,n){t.__c&&t.__c(n,e),e.some((function(n){try{e=n.__h,n.__h=[],e.some((function(e){e.call(n)}))}catch(e){t.__e(e,n.__v)}}))}function T(t,n,r,o,l,s,u,_){var a,d,p,m=r.props,f=n.props,g=n.type,v=0;if("svg"===g&&(l=!0),null!=s)for(;v<s.length;v++)if((a=s[v])&&(a===t||(g?a.localName==g:3==a.nodeType))){t=a,s[v]=null;break}if(null==t){if(null===g)return document.createTextNode(f);t=l?document.createElementNS("http://www.w3.org/2000/svg",g):document.createElement(g,f.is&&f),s=null,_=!1}if(null===g)m===f||_&&t.data===f||(t.data=f);else{if(s=s&&e.call(t.childNodes),d=(m=r.props||i).dangerouslySetInnerHTML,p=f.dangerouslySetInnerHTML,!_){if(null!=s)for(m={},v=0;v<t.attributes.length;v++)m[t.attributes[v].name]=t.attributes[v].value;(p||d)&&(p&&(d&&p.__html==d.__html||p.__html===t.innerHTML)||(t.innerHTML=p&&p.__html||""))}if(function(e,t,n,r,o){var l;for(l in n)"children"===l||"key"===l||l in t||M(e,l,null,n[l],r);for(l in t)o&&"function"!=typeof t[l]||"children"===l||"key"===l||"value"===l||"checked"===l||n[l]===t[l]||M(e,l,t[l],n[l],r)}(t,f,m,l,_),p)n.__k=[];else if(v=n.props.children,k(t,Array.isArray(v)?v:[v],n,r,o,l&&"foreignObject"!==g,s,u,s?s[0]:r.__k&&h(r,0),_),null!=s)for(v=s.length;v--;)null!=s[v]&&c(s[v]);_||("value"in f&&void 0!==(v=f.value)&&(v!==t.value||"progress"===g&&!v)&&M(t,"value",v,m.value,!1),"checked"in f&&void 0!==(v=f.checked)&&v!==t.checked&&M(t,"checked",v,m.checked,!1))}return t}function E(e,n,r){try{"function"==typeof e?e(n):e.current=n}catch(e){t.__e(e,r)}}function D(e,n,r){var o,l;if(t.unmount&&t.unmount(e),(o=e.ref)&&(o.current&&o.current!==e.__e||E(o,null,n)),null!=(o=e.__c)){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(e){t.__e(e,n)}o.base=o.__P=null}if(o=e.__k)for(l=0;l<o.length;l++)o[l]&&D(o[l],n,"function"!=typeof e.type);r||null==e.__e||c(e.__e),e.__e=e.__d=void 0}function G(e,t,n){return this.constructor(e,n)}e=u.slice,t={__e:function(e,t){for(var n,r,o;t=t.__;)if((n=t.__c)&&!n.__)try{if((r=n.constructor)&&null!=r.getDerivedStateFromError&&(n.setState(r.getDerivedStateFromError(e)),o=n.__d),null!=n.componentDidCatch&&(n.componentDidCatch(e),o=n.__d),o)return n.__E=n}catch(t){e=t}throw e}},r=0,f.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=a({},this.state),"function"==typeof e&&(e=e(a({},n),this.props)),e&&a(n,e),null!=e&&this.__v&&(t&&this.__h.push(t),v(this))},f.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),v(this))},f.prototype.render=m,o=[],l="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,y.__r=0;var L=n(495);let O=0;
// ==UserScript==
// @name      Unconfirmed Marks Preact
// @version   2021.11.07b
// @author    lusc
// @include   *://moodle.ksasz.ch/
// @include   *://moodle.ksasz.ch/?*
// @updateURL https://git.io/JqltZ
// @grant     GM_xmlhttpRequest
// @grant     GM_setValue
// @grant     GM_getValue
// @grant     GM_addStyle
// @grant     GM_deleteValue
// @grant     GM_addValueChangeListener
// @grant     GM_registerMenuCommand
// @run-at    document-start
// @connect   www.schul-netz.com
// ==/UserScript==
"https:"!==location.protocol&&(location.protocol="https:");const V=()=>d("svg",{"aria-hidden":"true",class:"ucmr-circle-notch ucmr-spin",viewBox:"0 0 512 512"},d("path",{fill:"currentColor",d:"M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z"}));class N extends f{state={marks:[],state:0,errorMsg:void 0,bottomHR:Boolean(GM_getValue("bottomHR"))};inputs={username:{current:null},password:{current:null},page:{current:null}};render=()=>{const{marks:e,state:t,errorMsg:n,bottomHR:r}=this.state;return d("div",{class:"mod-indent-outer"},d("div",{class:"contentwithoutlink"},d("div",{class:"ucmr-title"},"Unconfirmed Marks"),0===t&&d(V,null),2===t&&d("div",null,e.map((({key:e,course:t,name:n,date:r,mark:o})=>d("div",{key:e,class:"ucmr-row"},d("div",{class:"ucmr-course"},t),d("div",{class:"ucmr-name"},n),d("div",{class:"ucmr-date"},r),d("div",{class:"ucmr-mark"},o))))),3===t&&d("div",null,"Sie haben alle Noten bestätigt."),4===t&&d("form",{class:"login-form",onSubmit:this.handleLogin},d("input",{ref:this.inputs.username,required:!0,class:"form-control",placeholder:"Username",type:"text",value:GM_getValue("username")}),d("input",{ref:this.inputs.password,required:!0,class:"form-control",placeholder:"Password",type:"password",value:GM_getValue("password")}),d("input",{ref:this.inputs.page,required:!0,class:"form-control",placeholder:"Page (ausserschwyz, einsiedeln...)",type:"text",value:GM_getValue("page")}),d("button",{class:"btn btn-primary",type:"submit"},"Save")),1===t&&d("div",{class:"ucmr-error"},n??"Something went wrong"),r&&d("hr",null)))};handleLogin=e=>{e.preventDefault();const t=this.inputs.username.current?.value,n=this.inputs.password.current?.value,r=this.inputs.page.current?.value;t&&n&&r&&(GM_setValue("username",t),GM_setValue("password",n),GM_setValue("page",r),this.setState({state:0}),this.getMarks({username:t,password:n,page:r}))};loginFromStorage=()=>{const e=GM_getValue("username"),t=GM_getValue("password"),n=GM_getValue("page");e&&t&&n?this.getMarks({username:e,password:t,page:n}):this.setState({state:4})};componentDidMount=()=>{this.loginFromStorage(),GM_addValueChangeListener("bottomHR",((e,t,n)=>{this.setState({bottomHR:Boolean(n)})})),GM_registerMenuCommand("Toggle divider",(()=>{GM_setValue("bottomHR",!GM_getValue("bottomHR"))}))};logout=(e=[])=>{for(const t of e)GM_deleteValue(t);this.setState({state:4})};getMarks=async({username:e,password:t,page:n})=>{const r=await(async({username:e,password:t,page:n})=>{let r;try{r=await new Promise(((e,t)=>{GM_xmlhttpRequest({method:"GET",url:`https://www.schul-netz.com/${n}/loginto.php`,onload:e,timeout:1e4,onerror:t,onabort:t,ontimeout:t})}))}catch(e){return console.error(e),{error:!0,shouldLogOut:!1,errorMsg:`An error occurred fetching "/${n}/loginto.php"`}}if(404===r.status)return{error:!0,shouldLogOut:!0,credentialsToRemove:["page"]};if(200!==r.status)return{error:!0,shouldLogOut:!1,errorMsg:`An error occurred fetching "/${n}/loginto.php": "${r.statusText}"`};const o=(new DOMParser).parseFromString(r.responseText,"text/html").querySelector('input[name="loginhash"]');if(!o)return{error:!0,shouldLogOut:!1,errorMsg:"Could not get loginhash."};const l=new URLSearchParams({loginhash:o.value,login:e,passwort:t});let s;try{s=await new Promise(((e,t)=>{GM_xmlhttpRequest({method:"POST",url:`https://www.schul-netz.com/${n}/index.php?pageid=`,data:l.toString(),headers:{"Content-Type":"application/x-www-form-urlencoded"},timeout:1e4,onload:e,onerror:t,onabort:t,ontimeout:t})}))}catch(e){return console.error(e),{error:!0,shouldLogOut:!1,errorMsg:"An error occurred trying to log in."}}if(/loginto\.php/i.test(s.finalUrl))return{error:!0,shouldLogOut:!0,credentialsToRemove:["password"]};const i=(new DOMParser).parseFromString(s.responseText,"text/html"),u=i.evaluate('.//h3[contains(@class, "tabletitle")][text() = "Ihre letzten Noten"]/../following-sibling::table',i.body,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(null===u)return{error:!0,shouldLogOut:!1,errorMsg:"Could not find table with marks."};const{rows:_}=u,a=[];let c=!1;for(const e of _){const[t,n,r,o]=[...e.children].map((e=>e.textContent?.trim()));if(/sie haben alle noten bestätigt./i.test(t??"")){c=!0;break}t&&n&&r&&o&&a.push({course:t,name:n,date:r,mark:o,key:""+ ++O})}const d=i.evaluate('//a[contains(@class, "mdl-menu__item")][contains(text(), "Abmelden")]',i.body,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue?.getAttribute("href");return d&&GM_xmlhttpRequest({method:"GET",url:`https://www.schul-netz.com/${n}/${d}`}),{error:!1,marks:c||0===a.length?null:a}})({username:e,password:t,page:n});if(r.error)return r.shouldLogOut?void this.logout(r.credentialsToRemove):void this.setState({state:1,errorMsg:r.errorMsg});null!==r.marks?this.setState({marks:r.marks,state:2}):this.setState({state:3})}}const U=()=>{const n=document.querySelector("#region-main ul.section");if(!n)return;const r=document.createElement("li");r.id="module-marks",r.className="activity label modtype_label";const o=document.querySelector("#module-timetable-v5");o?o.after(r):n.prepend(r),function(n,r,o){var l,s,u;t.__&&t.__(n,r),s=(l=!1)?null:r.__k,u=[],P(r,n=r.__k=d(m,null,[n]),s||i,i,void 0!==r.ownerSVGElement,s?null:r.firstChild?e.call(r.childNodes):null,u,s?s.__e:r.firstChild,l),R(u,n)}(d(N,null),r),GM_addStyle(L)};"complete"===document.readyState?U():addEventListener("DOMContentLoaded",U,{once:!0})})()})();