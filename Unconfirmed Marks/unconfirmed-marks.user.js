(()=>{"use strict";var e,t,n,r,o,l={},s=[],i=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function a(e,t){for(var n in t)e[n]=t[n];return e}function _(e){var t=e.parentNode;t&&t.removeChild(e)}function u(t,n,r){var o,l,s,i={};for(s in n)"key"==s?o=n[s]:"ref"==s?l=n[s]:i[s]=n[s];if(arguments.length>2&&(i.children=arguments.length>3?e.call(arguments,2):r),"function"==typeof t&&null!=t.defaultProps)for(s in t.defaultProps)void 0===i[s]&&(i[s]=t.defaultProps[s]);return c(t,i,o,l,null)}function c(e,r,o,l,s){var i={type:e,props:r,key:o,ref:l,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==s?++n:s};return null==s&&null!=t.vnode&&t.vnode(i),i}function d(e){return e.children}function p(e,t){this.props=e,this.context=t}function m(e,t){if(null==t)return e.__?m(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?m(e):null}function f(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return f(e)}}function h(e){(!e.__d&&(e.__d=!0)&&r.push(e)&&!g.__r++||o!==t.debounceRendering)&&((o=t.debounceRendering)||setTimeout)(g)}function g(){for(var e;g.__r=r.length;)e=r.sort((function(e,t){return e.__v.__b-t.__v.__b})),r=[],e.some((function(e){var t,n,r,o,l,s;e.__d&&(l=(o=(t=e).__v).__e,(s=t.__P)&&(n=[],(r=a({},o)).__v=o.__v+1,x(s,o,r,t.__n,void 0!==s.ownerSVGElement,null!=o.__h?[l]:null,n,null==l?m(o):l,o.__h),T(n,o),o.__e!=l&&f(o)))}))}function v(e,t,n,r,o,i,a,_,u,p){var f,h,g,v,b,w,S,M=r&&r.__k||s,T=M.length;for(n.__k=[],f=0;f<t.length;f++)if(null!=(v=n.__k[f]=null==(v=t[f])||"boolean"==typeof v?null:"string"==typeof v||"number"==typeof v||"bigint"==typeof v?c(null,v,null,null,v):Array.isArray(v)?c(d,{children:v},null,null,null):v.__b>0?c(v.type,v.props,v.key,v.ref?v.ref:null,v.__v):v)){if(v.__=n,v.__b=n.__b+1,null===(g=M[f])||g&&v.key==g.key&&v.type===g.type)M[f]=void 0;else for(h=0;h<T;h++){if((g=M[h])&&v.key==g.key&&v.type===g.type){M[h]=void 0;break}g=null}x(e,v,g=g||l,o,i,a,_,u,p),b=v.__e,(h=v.ref)&&g.ref!=h&&(S||(S=[]),g.ref&&S.push(g.ref,null,v),S.push(h,v.__c||b,v)),null!=b?(null==w&&(w=b),"function"==typeof v.type&&v.__k===g.__k?v.__d=u=y(v,u,e):u=k(e,v,g,M,b,u),"function"==typeof n.type&&(n.__d=u)):u&&g.__e==u&&u.parentNode!=e&&(u=m(g))}for(n.__e=w,f=T;f--;)null!=M[f]&&P(M[f],M[f]);if(S)for(f=0;f<S.length;f++)E(S[f],S[++f],S[++f])}function y(e,t,n){for(var r,o=e.__k,l=0;o&&l<o.length;l++)(r=o[l])&&(r.__=e,t="function"==typeof r.type?y(r,t,n):k(n,r,r,o,r.__e,t));return t}function k(e,t,n,r,o,l){var s,i,a;if(void 0!==t.__d)s=t.__d,t.__d=void 0;else if(null==n||o!=l||null==o.parentNode)e:if(null==l||l.parentNode!==e)e.appendChild(o),s=null;else{for(i=l,a=0;(i=i.nextSibling)&&a<r.length;a+=2)if(i==o)break e;e.insertBefore(o,l),s=l}return void 0!==s?s:o.nextSibling}function b(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]=null==n?"":"number"!=typeof n||i.test(t)?n:n+"px"}function w(e,t,n,r,o){var l;e:if("style"===t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof r&&(e.style.cssText=r=""),r)for(t in r)n&&t in n||b(e.style,t,"");if(n)for(t in n)r&&n[t]===r[t]||b(e.style,t,n[t])}else if("o"===t[0]&&"n"===t[1])l=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+l]=n,n?r||e.addEventListener(t,l?M:S,l):e.removeEventListener(t,l?M:S,l);else if("dangerouslySetInnerHTML"!==t){if(o)t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("href"!==t&&"list"!==t&&"form"!==t&&"tabIndex"!==t&&"download"!==t&&t in e)try{e[t]=null==n?"":n;break e}catch(e){}"function"==typeof n||(null==n||!1===n&&-1==t.indexOf("-")?e.removeAttribute(t):e.setAttribute(t,n))}}function S(e){this.l[e.type+!1](t.event?t.event(e):e)}function M(e){this.l[e.type+!0](t.event?t.event(e):e)}function x(e,n,r,o,l,s,i,_,u){var c,m,f,h,g,y,k,b,w,S,M,x,T,E,P,C=n.type;if(void 0!==n.constructor)return null;null!=r.__h&&(u=r.__h,_=n.__e=r.__e,n.__h=null,s=[_]),(c=t.__b)&&c(n);try{e:if("function"==typeof C){if(b=n.props,w=(c=C.contextType)&&o[c.__c],S=c?w?w.props.value:c.__:o,r.__c?k=(m=n.__c=r.__c).__=m.__E:("prototype"in C&&C.prototype.render?n.__c=m=new C(b,S):(n.__c=m=new p(b,S),m.constructor=C,m.render=D),w&&w.sub(m),m.props=b,m.state||(m.state={}),m.context=S,m.__n=o,f=m.__d=!0,m.__h=[],m._sb=[]),null==m.__s&&(m.__s=m.state),null!=C.getDerivedStateFromProps&&(m.__s==m.state&&(m.__s=a({},m.__s)),a(m.__s,C.getDerivedStateFromProps(b,m.__s))),h=m.props,g=m.state,f)null==C.getDerivedStateFromProps&&null!=m.componentWillMount&&m.componentWillMount(),null!=m.componentDidMount&&m.__h.push(m.componentDidMount);else{if(null==C.getDerivedStateFromProps&&b!==h&&null!=m.componentWillReceiveProps&&m.componentWillReceiveProps(b,S),!m.__e&&null!=m.shouldComponentUpdate&&!1===m.shouldComponentUpdate(b,m.__s,S)||n.__v===r.__v){for(m.props=b,m.state=m.__s,n.__v!==r.__v&&(m.__d=!1),m.__v=n,n.__e=r.__e,n.__k=r.__k,n.__k.forEach((function(e){e&&(e.__=n)})),M=0;M<m._sb.length;M++)m.__h.push(m._sb[M]);m._sb=[],m.__h.length&&i.push(m);break e}null!=m.componentWillUpdate&&m.componentWillUpdate(b,m.__s,S),null!=m.componentDidUpdate&&m.__h.push((function(){m.componentDidUpdate(h,g,y)}))}if(m.context=S,m.props=b,m.__v=n,m.__P=e,x=t.__r,T=0,"prototype"in C&&C.prototype.render){for(m.state=m.__s,m.__d=!1,x&&x(n),c=m.render(m.props,m.state,m.context),E=0;E<m._sb.length;E++)m.__h.push(m._sb[E]);m._sb=[]}else do{m.__d=!1,x&&x(n),c=m.render(m.props,m.state,m.context),m.state=m.__s}while(m.__d&&++T<25);m.state=m.__s,null!=m.getChildContext&&(o=a(a({},o),m.getChildContext())),f||null==m.getSnapshotBeforeUpdate||(y=m.getSnapshotBeforeUpdate(h,g)),P=null!=c&&c.type===d&&null==c.key?c.props.children:c,v(e,Array.isArray(P)?P:[P],n,r,o,l,s,i,_,u),m.base=n.__e,n.__h=null,m.__h.length&&i.push(m),k&&(m.__E=m.__=null),m.__e=!1}else null==s&&n.__v===r.__v?(n.__k=r.__k,n.__e=r.__e):n.__e=R(r.__e,n,r,o,l,s,i,u);(c=t.diffed)&&c(n)}catch(e){n.__v=null,(u||null!=s)&&(n.__e=_,n.__h=!!u,s[s.indexOf(_)]=null),t.__e(e,n,r)}}function T(e,n){t.__c&&t.__c(n,e),e.some((function(n){try{e=n.__h,n.__h=[],e.some((function(e){e.call(n)}))}catch(e){t.__e(e,n.__v)}}))}function R(t,n,r,o,s,i,a,u){var c,d,p,f=r.props,h=n.props,g=n.type,y=0;if("svg"===g&&(s=!0),null!=i)for(;y<i.length;y++)if((c=i[y])&&"setAttribute"in c==!!g&&(g?c.localName===g:3===c.nodeType)){t=c,i[y]=null;break}if(null==t){if(null===g)return document.createTextNode(h);t=s?document.createElementNS("http://www.w3.org/2000/svg",g):document.createElement(g,h.is&&h),i=null,u=!1}if(null===g)f===h||u&&t.data===h||(t.data=h);else{if(i=i&&e.call(t.childNodes),d=(f=r.props||l).dangerouslySetInnerHTML,p=h.dangerouslySetInnerHTML,!u){if(null!=i)for(f={},y=0;y<t.attributes.length;y++)f[t.attributes[y].name]=t.attributes[y].value;(p||d)&&(p&&(d&&p.__html==d.__html||p.__html===t.innerHTML)||(t.innerHTML=p&&p.__html||""))}if(function(e,t,n,r,o){var l;for(l in n)"children"===l||"key"===l||l in t||w(e,l,null,n[l],r);for(l in t)o&&"function"!=typeof t[l]||"children"===l||"key"===l||"value"===l||"checked"===l||n[l]===t[l]||w(e,l,t[l],n[l],r)}(t,h,f,s,u),p)n.__k=[];else if(y=n.props.children,v(t,Array.isArray(y)?y:[y],n,r,o,s&&"foreignObject"!==g,i,a,i?i[0]:r.__k&&m(r,0),u),null!=i)for(y=i.length;y--;)null!=i[y]&&_(i[y]);u||("value"in h&&void 0!==(y=h.value)&&(y!==t.value||"progress"===g&&!y||"option"===g&&y!==f.value)&&w(t,"value",y,f.value,!1),"checked"in h&&void 0!==(y=h.checked)&&y!==t.checked&&w(t,"checked",y,f.checked,!1))}return t}function E(e,n,r){try{"function"==typeof e?e(n):e.current=n}catch(e){t.__e(e,r)}}function P(e,n,r){var o,l;if(t.unmount&&t.unmount(e),(o=e.ref)&&(o.current&&o.current!==e.__e||E(o,null,n)),null!=(o=e.__c)){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(e){t.__e(e,n)}o.base=o.__P=null,e.__c=void 0}if(o=e.__k)for(l=0;l<o.length;l++)o[l]&&P(o[l],n,r||"function"!=typeof e.type);r||null==e.__e||_(e.__e),e.__=e.__e=e.__d=void 0}function D(e,t,n){return this.constructor(e,n)}function C(n,r,o){var s,i,a;t.__&&t.__(n,r),i=(s="function"==typeof o)?null:o&&o.__k||r.__k,a=[],x(r,n=(!s&&o||r).__k=u(d,null,[n]),i||l,l,void 0!==r.ownerSVGElement,!s&&o?[o]:i?null:r.firstChild?e.call(r.childNodes):null,a,!s&&o?o:i?i.__e:r.firstChild,s),T(a,n)}e=s.slice,t={__e:function(e,t,n,r){for(var o,l,s;t=t.__;)if((o=t.__c)&&!o.__)try{if((l=o.constructor)&&null!=l.getDerivedStateFromError&&(o.setState(l.getDerivedStateFromError(e)),s=o.__d),null!=o.componentDidCatch&&(o.componentDidCatch(e,r||{}),s=o.__d),s)return o.__E=o}catch(t){e=t}throw e}},n=0,p.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=a({},this.state),"function"==typeof e&&(e=e(a({},n),this.props)),e&&a(n,e),null!=e&&this.__v&&(t&&this._sb.push(t),h(this))},p.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),h(this))},p.prototype.render=d,r=[],g.__r=0;let G=0;
// ==UserScript==
// @name      Unconfirmed Marks Preact
// @version   2.0.0
// @author    lusc
// @match     *://moodle.*/
// @match     *://moodle*.*/
// @updateURL https://git.io/JXzhC
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
"https:"!==location.protocol&&(location.protocol="https:");class V extends p{state={marks:[],state:0,errorMsg:void 0,bottomHR:Boolean(GM_getValue("bottomHR"))};inputs={username:{current:null},password:{current:null},page:{current:null}};timeout={set:e=>{this.timeout.clear(),this.timeout.timeoutId=window.setTimeout(this.loginFromStorage,e)},clear:()=>{const{timeoutId:e}=this.timeout;void 0!==e&&(window.clearTimeout(e),delete this.timeout.timeoutId)}};render(){const{marks:e,state:t,errorMsg:n,bottomHR:r}=this.state;return u("div",{class:"mod-indent-outer w-100"},u("div",{class:"contentwithoutlink"},u("div",{class:"ucmr-title"},"Unconfirmed Marks",(2===t||3===t||1===t)&&u("i",{role:"button",class:"icon fa fa-refresh fa-fw ml-1",onClick:this.refresh})),0===t&&u("i",{class:"icon fa fa-circle-o-notch fa-fw fa-spin"}),2===t&&u("div",null,e.map((({key:e,course:t,name:n,date:r,mark:o})=>u("div",{key:e,class:"ucmr-row"},u("div",{class:"ucmr-course"},t),u("div",{class:"ucmr-name"},n),u("div",{class:"ucmr-date"},r),u("div",{class:"ucmr-mark"},o))))),3===t&&u("div",null,"Sie haben alle Noten bestätigt."),5===t&&u("div",null,"Offline"),4===t&&u("form",{class:"login-form",onSubmit:this.handleLogin},u("input",{ref:this.inputs.username,required:!0,class:"form-control",placeholder:"Username",type:"text",value:GM_getValue("username")}),u("input",{ref:this.inputs.password,required:!0,class:"form-control",placeholder:"Password",type:"password",value:GM_getValue("password")}),u("input",{ref:this.inputs.page,required:!0,class:"form-control",placeholder:"Page (ausserschwyz, einsiedeln...)",type:"text",value:GM_getValue("page")}),u("button",{class:"btn btn-primary",type:"submit"},"Save")),1===t&&u("div",{class:"ucmr-error"},n??"Something went wrong"),r&&u("hr",null)))}refresh=e=>{e.preventDefault(),this.loginFromStorage()};handleLogin=e=>{e.preventDefault();const t=this.inputs.username.current?.value,n=this.inputs.password.current?.value,r=this.inputs.page.current?.value;t&&n&&r&&(GM_setValue("username",t),GM_setValue("password",n),GM_setValue("page",r),this.setState({state:0}),this.getMarks({username:t,password:n,page:r}))};reset=()=>{this.setState({state:0,errorMsg:void 0,marks:[]})};loginFromStorage=()=>{this.timeout.clear();const e=GM_getValue("username"),t=GM_getValue("password"),n=GM_getValue("page");this.reset(),e&&t&&n?this.getMarks({username:e,password:t,page:n}):this.setState({state:4})};componentDidMount(){this.loginFromStorage(),GM_addValueChangeListener("bottomHR",((e,t,n)=>{this.setState({bottomHR:Boolean(n)})})),GM_registerMenuCommand("Toggle divider",(()=>{GM_setValue("bottomHR",!GM_getValue("bottomHR"))}))}logout=(e=[])=>{for(const t of e)GM_deleteValue(t);this.setState({state:4})};getMarks=async({username:e,password:t,page:n})=>{this.timeout.clear();const r=await(async({username:e,password:t,page:n})=>{let r;try{r=await new Promise(((e,t)=>{GM_xmlhttpRequest({method:"GET",url:`https://www.schul-netz.com/${n}/loginto.php`,onload:e,timeout:1e4,onerror:t,onabort:t,ontimeout:t})}))}catch(e){return console.error(e),navigator.onLine?{type:"error",errorMsg:`An error occurred fetching "/${n}/loginto.php"`}:{type:"offline"}}if(404===r.status)return{type:"loggedout",credentialsToRemove:["page"]};if(200!==r.status)return{type:"error",errorMsg:`An error occurred fetching "/${n}/loginto.php": "${r.statusText}"`};const o=(new DOMParser).parseFromString(r.responseText,"text/html").querySelector('input[name="loginhash"]');if(!o)return{type:"error",errorMsg:"Could not get loginhash."};const l=new URLSearchParams({loginhash:o.value,login:e,passwort:t});let s;try{s=await new Promise(((e,t)=>{GM_xmlhttpRequest({method:"POST",url:`https://www.schul-netz.com/${n}/index.php?pageid=`,data:l.toString(),headers:{"Content-Type":"application/x-www-form-urlencoded"},timeout:1e4,onload:e,onerror:t,onabort:t,ontimeout:t})}))}catch(e){return console.error(e),{type:"error",errorMsg:"An error occurred trying to log in."}}if(/loginto\.php/i.test(s.finalUrl))return{type:"loggedout",credentialsToRemove:["password"]};const i=(new DOMParser).parseFromString(s.responseText,"text/html"),a=i.evaluate('.//h3[contains(@class, "tabletitle")][text() = "Ihre letzten Noten"]/../following-sibling::table',i.body,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!a)return{type:"error",errorMsg:"Could not find table with marks."};const{rows:_}=a,u=[];let c=!1;for(const e of _){const[t,n,r,o]=[...e.children].map((e=>e.textContent?.trim()));if(/sie haben alle noten bestätigt./i.test(t??"")){c=!0;break}t&&n&&r&&o&&u.push({course:t,name:n,date:r,mark:o,key:""+ ++G})}const d=i.evaluate('//a[contains(@class, "mdl-menu__item")][contains(text(), "Abmelden")]',i.body,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue?.getAttribute("href");return d&&GM_xmlhttpRequest({method:"GET",url:`https://www.schul-netz.com/${n}/${d}`}),{type:"success",marks:c||0===u.length?void 0:u}})({username:e,password:t,page:n});switch(r.type){case"error":this.timeout.set(18e5),this.setState({state:1,errorMsg:r.errorMsg});break;case"loggedout":this.logout(r.credentialsToRemove);break;case"success":if(this.timeout.set(18e5),void 0===r.marks)return void this.setState({state:3});this.setState({marks:r.marks,state:2});break;case"offline":this.setState({state:5}),addEventListener("online",(()=>{this.loginFromStorage()}),{once:!0})}}}const L=()=>{const e=document.querySelector("#region-main ul.section");if(!e)return;const t=document.createElement("li");t.id="module-marks",t.className="activity label modtype_label";const n=document.querySelector("#module-timetable-v5");n?n.after(t):e.prepend(t),C(u(V,null),t),GM_addStyle("@keyframes ucmr-spin{0%{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg)}}#module-marks{line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:transparent;word-break:break-word}#module-marks *{box-sizing:border-box}#module-marks .login-form{display:flex;flex-direction:column;justify-content:center;width:max-content}#module-marks .login-form button,#module-marks .login-form input{flex:0 0 100%;margin:3px 0;padding:.2em .5em}#module-marks .ucmr-error,#module-marks .ucmr-title{font-size:large;font-weight:450}#module-marks .ucmr-title{margin-bottom:10px}#module-marks .ucmr-error{color:#ea4335}#module-marks .ucmr-circle-notch{width:1em;height:1em;animation:ucmr-spin 2s infinite linear}#module-marks .ucmr-row{display:grid;grid-template-columns:30% 45% 15% 10%}")};var N;"/"===location.pathname&&(N=L,"interactive"!==document.readyState&&"complete"!==document.readyState?document.addEventListener("DOMContentLoaded",N,{once:!0}):N())})();