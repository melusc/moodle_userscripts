(()=>{"use strict";var e,t,n,r,o,l,s,i={},_=[],a=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function u(e,t){for(var n in t)e[n]=t[n];return e}function c(e){var t=e.parentNode;t&&t.removeChild(e)}function d(e,r,o,l,s){var i={type:e,props:r,key:o,ref:l,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==s?++n:s};return null==s&&null!=t.vnode&&t.vnode(i),i}function p(e){return e.children}function f(e,t,n){"-"===t[0]?e.setProperty(t,null==n?"":n):e[t]=null==n?"":"number"!=typeof n||a.test(t)?n:n+"px"}function h(e,t,n,r,o){var l;e:if("style"===t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof r&&(e.style.cssText=r=""),r)for(t in r)n&&t in n||f(e.style,t,"");if(n)for(t in n)r&&n[t]===r[t]||f(e.style,t,n[t])}else if("o"===t[0]&&"n"===t[1])l=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+l]=n,n?r||e.addEventListener(t,l?g:m,l):e.removeEventListener(t,l?g:m,l);else if("dangerouslySetInnerHTML"!==t){if(o)t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("width"!==t&&"height"!==t&&"href"!==t&&"list"!==t&&"form"!==t&&"tabIndex"!==t&&"download"!==t&&t in e)try{e[t]=null==n?"":n;break e}catch(e){}"function"==typeof n||(null==n||!1===n&&-1==t.indexOf("-")?e.removeAttribute(t):e.setAttribute(t,n))}}function m(e){r=!0;try{return this.l[e.type+!1](t.event?t.event(e):e)}finally{r=!1}}function g(e){r=!0;try{return this.l[e.type+!0](t.event?t.event(e):e)}finally{r=!1}}function v(e,t){this.props=e,this.context=t}function y(e,t){if(null==t)return e.__?y(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?y(e):null}function k(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return k(e)}}function b(e){r?setTimeout(e):s(e)}function w(e){(!e.__d&&(e.__d=!0)&&o.push(e)&&!S.__r++||l!==t.debounceRendering)&&((l=t.debounceRendering)||b)(S)}function S(){var e,t,n,r,l,s,i,_;for(o.sort((function(e,t){return e.__v.__b-t.__v.__b}));e=o.shift();)e.__d&&(t=o.length,r=void 0,l=void 0,i=(s=(n=e).__v).__e,(_=n.__P)&&(r=[],(l=u({},s)).__v=s.__v+1,R(_,s,l,n.__n,void 0!==_.ownerSVGElement,null!=s.__h?[i]:null,r,null==i?y(s):i,s.__h),E(r,s),s.__e!=i&&k(s)),o.length>t&&o.sort((function(e,t){return e.__v.__b-t.__v.__b})));S.__r=0}function x(e,t,n,r,o,l,s,a,u,c){var f,h,m,g,v,k,b,w=r&&r.__k||_,S=w.length;for(n.__k=[],f=0;f<t.length;f++)if(null!=(g=n.__k[f]=null==(g=t[f])||"boolean"==typeof g?null:"string"==typeof g||"number"==typeof g||"bigint"==typeof g?d(null,g,null,null,g):Array.isArray(g)?d(p,{children:g},null,null,null):g.__b>0?d(g.type,g.props,g.key,g.ref?g.ref:null,g.__v):g)){if(g.__=n,g.__b=n.__b+1,null===(m=w[f])||m&&g.key==m.key&&g.type===m.type)w[f]=void 0;else for(h=0;h<S;h++){if((m=w[h])&&g.key==m.key&&g.type===m.type){w[h]=void 0;break}m=null}R(e,g,m=m||i,o,l,s,a,u,c),v=g.__e,(h=g.ref)&&m.ref!=h&&(b||(b=[]),m.ref&&b.push(m.ref,null,g),b.push(h,g.__c||v,g)),null!=v?(null==k&&(k=v),"function"==typeof g.type&&g.__k===m.__k?g.__d=u=M(g,u,e):u=P(e,g,m,w,v,u),"function"==typeof n.type&&(n.__d=u)):u&&m.__e==u&&u.parentNode!=e&&(u=y(m))}for(n.__e=k,f=S;f--;)null!=w[f]&&("function"==typeof n.type&&null!=w[f].__e&&w[f].__e==n.__d&&(n.__d=T(r).nextSibling),G(w[f],w[f]));if(b)for(f=0;f<b.length;f++)C(b[f],b[++f],b[++f])}function M(e,t,n){for(var r,o=e.__k,l=0;o&&l<o.length;l++)(r=o[l])&&(r.__=e,t="function"==typeof r.type?M(r,t,n):P(n,r,r,o,r.__e,t));return t}function P(e,t,n,r,o,l){var s,i,_;if(void 0!==t.__d)s=t.__d,t.__d=void 0;else if(null==n||o!=l||null==o.parentNode)e:if(null==l||l.parentNode!==e)e.appendChild(o),s=null;else{for(i=l,_=0;(i=i.nextSibling)&&_<r.length;_+=1)if(i==o)break e;e.insertBefore(o,l),s=l}return void 0!==s?s:o.nextSibling}function T(e){var t,n,r;if(null==e.type||"string"==typeof e.type)return e.__e;if(e.__k)for(t=e.__k.length-1;t>=0;t--)if((n=e.__k[t])&&(r=T(n)))return r;return null}function R(e,n,r,o,l,s,i,_,a){var c,d,f,h,m,g,y,k,b,w,S,M,P,T,R,E=n.type;if(void 0!==n.constructor)return null;null!=r.__h&&(a=r.__h,_=n.__e=r.__e,n.__h=null,s=[_]),(c=t.__b)&&c(n);try{e:if("function"==typeof E){if(k=n.props,b=(c=E.contextType)&&o[c.__c],w=c?b?b.props.value:c.__:o,r.__c?y=(d=n.__c=r.__c).__=d.__E:("prototype"in E&&E.prototype.render?n.__c=d=new E(k,w):(n.__c=d=new v(k,w),d.constructor=E,d.render=V),b&&b.sub(d),d.props=k,d.state||(d.state={}),d.context=w,d.__n=o,f=d.__d=!0,d.__h=[],d._sb=[]),null==d.__s&&(d.__s=d.state),null!=E.getDerivedStateFromProps&&(d.__s==d.state&&(d.__s=u({},d.__s)),u(d.__s,E.getDerivedStateFromProps(k,d.__s))),h=d.props,m=d.state,d.__v=n,f)null==E.getDerivedStateFromProps&&null!=d.componentWillMount&&d.componentWillMount(),null!=d.componentDidMount&&d.__h.push(d.componentDidMount);else{if(null==E.getDerivedStateFromProps&&k!==h&&null!=d.componentWillReceiveProps&&d.componentWillReceiveProps(k,w),!d.__e&&null!=d.shouldComponentUpdate&&!1===d.shouldComponentUpdate(k,d.__s,w)||n.__v===r.__v){for(n.__v!==r.__v&&(d.props=k,d.state=d.__s,d.__d=!1),n.__e=r.__e,n.__k=r.__k,n.__k.forEach((function(e){e&&(e.__=n)})),S=0;S<d._sb.length;S++)d.__h.push(d._sb[S]);d._sb=[],d.__h.length&&i.push(d);break e}null!=d.componentWillUpdate&&d.componentWillUpdate(k,d.__s,w),null!=d.componentDidUpdate&&d.__h.push((function(){d.componentDidUpdate(h,m,g)}))}if(d.context=w,d.props=k,d.__P=e,M=t.__r,P=0,"prototype"in E&&E.prototype.render){for(d.state=d.__s,d.__d=!1,M&&M(n),c=d.render(d.props,d.state,d.context),T=0;T<d._sb.length;T++)d.__h.push(d._sb[T]);d._sb=[]}else do{d.__d=!1,M&&M(n),c=d.render(d.props,d.state,d.context),d.state=d.__s}while(d.__d&&++P<25);d.state=d.__s,null!=d.getChildContext&&(o=u(u({},o),d.getChildContext())),f||null==d.getSnapshotBeforeUpdate||(g=d.getSnapshotBeforeUpdate(h,m)),R=null!=c&&c.type===p&&null==c.key?c.props.children:c,x(e,Array.isArray(R)?R:[R],n,r,o,l,s,i,_,a),d.base=n.__e,n.__h=null,d.__h.length&&i.push(d),y&&(d.__E=d.__=null),d.__e=!1}else null==s&&n.__v===r.__v?(n.__k=r.__k,n.__e=r.__e):n.__e=D(r.__e,n,r,o,l,s,i,a);(c=t.diffed)&&c(n)}catch(e){n.__v=null,(a||null!=s)&&(n.__e=_,n.__h=!!a,s[s.indexOf(_)]=null),t.__e(e,n,r)}}function E(e,n){t.__c&&t.__c(n,e),e.some((function(n){try{e=n.__h,n.__h=[],e.some((function(e){e.call(n)}))}catch(e){t.__e(e,n.__v)}}))}function D(t,n,r,o,l,s,_,a){var u,d,p,f=r.props,m=n.props,g=n.type,v=0;if("svg"===g&&(l=!0),null!=s)for(;v<s.length;v++)if((u=s[v])&&"setAttribute"in u==!!g&&(g?u.localName===g:3===u.nodeType)){t=u,s[v]=null;break}if(null==t){if(null===g)return document.createTextNode(m);t=l?document.createElementNS("http://www.w3.org/2000/svg",g):document.createElement(g,m.is&&m),s=null,a=!1}if(null===g)f===m||a&&t.data===m||(t.data=m);else{if(s=s&&e.call(t.childNodes),d=(f=r.props||i).dangerouslySetInnerHTML,p=m.dangerouslySetInnerHTML,!a){if(null!=s)for(f={},v=0;v<t.attributes.length;v++)f[t.attributes[v].name]=t.attributes[v].value;(p||d)&&(p&&(d&&p.__html==d.__html||p.__html===t.innerHTML)||(t.innerHTML=p&&p.__html||""))}if(function(e,t,n,r,o){var l;for(l in n)"children"===l||"key"===l||l in t||h(e,l,null,n[l],r);for(l in t)o&&"function"!=typeof t[l]||"children"===l||"key"===l||"value"===l||"checked"===l||n[l]===t[l]||h(e,l,t[l],n[l],r)}(t,m,f,l,a),p)n.__k=[];else if(v=n.props.children,x(t,Array.isArray(v)?v:[v],n,r,o,l&&"foreignObject"!==g,s,_,s?s[0]:r.__k&&y(r,0),a),null!=s)for(v=s.length;v--;)null!=s[v]&&c(s[v]);a||("value"in m&&void 0!==(v=m.value)&&(v!==t.value||"progress"===g&&!v||"option"===g&&v!==f.value)&&h(t,"value",v,f.value,!1),"checked"in m&&void 0!==(v=m.checked)&&v!==t.checked&&h(t,"checked",v,f.checked,!1))}return t}function C(e,n,r){try{"function"==typeof e?e(n):e.current=n}catch(e){t.__e(e,r)}}function G(e,n,r){var o,l;if(t.unmount&&t.unmount(e),(o=e.ref)&&(o.current&&o.current!==e.__e||C(o,null,n)),null!=(o=e.__c)){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(e){t.__e(e,n)}o.base=o.__P=null,e.__c=void 0}if(o=e.__k)for(l=0;l<o.length;l++)o[l]&&G(o[l],n,r||"function"!=typeof e.type);r||null==e.__e||c(e.__e),e.__=e.__e=e.__d=void 0}function V(e,t,n){return this.constructor(e,n)}function L(n,r,o){var l,s,_;t.__&&t.__(n,r),s=(l="function"==typeof o)?null:o&&o.__k||r.__k,_=[],R(r,n=(!l&&o||r).__k=function(t,n,r){var o,l,s,i={};for(s in n)"key"==s?o=n[s]:"ref"==s?l=n[s]:i[s]=n[s];if(arguments.length>2&&(i.children=arguments.length>3?e.call(arguments,2):r),"function"==typeof t&&null!=t.defaultProps)for(s in t.defaultProps)void 0===i[s]&&(i[s]=t.defaultProps[s]);return d(t,i,o,l,null)}(p,null,[n]),s||i,i,void 0!==r.ownerSVGElement,!l&&o?[o]:s?null:r.firstChild?e.call(r.childNodes):null,_,!l&&o?o:s?s.__e:r.firstChild,l),E(_,n)}e=_.slice,t={__e:function(e,t,n,r){for(var o,l,s;t=t.__;)if((o=t.__c)&&!o.__)try{if((l=o.constructor)&&null!=l.getDerivedStateFromError&&(o.setState(l.getDerivedStateFromError(e)),s=o.__d),null!=o.componentDidCatch&&(o.componentDidCatch(e,r||{}),s=o.__d),s)return o.__E=o}catch(t){e=t}throw e}},n=0,r=!1,v.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=u({},this.state),"function"==typeof e&&(e=e(u({},n),this.props)),e&&u(n,e),null!=e&&this.__v&&(t&&this._sb.push(t),w(this))},v.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),w(this))},v.prototype.render=p,o=[],s="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,S.__r=0;var N=0;function F(e,n,r,o,l,s){var i,_,a={};for(_ in n)"ref"==_?i=n[_]:a[_]=n[_];var u={type:e,props:a,key:r,ref:i,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:--N,__source:l,__self:s};if("function"==typeof e&&(i=e.defaultProps))for(_ in i)void 0===a[_]&&(a[_]=i[_]);return t.vnode&&t.vnode(u),u}let U=0;
// ==UserScript==
// @name      Unconfirmed Marks Preact
// @version   2.1.0
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
"https:"!==location.protocol&&(location.protocol="https:");class A extends v{state={marks:[],state:0,errorMsg:void 0,bottomHR:Boolean(GM_getValue("bottomHR"))};inputs={username:{current:null},password:{current:null},page:{current:null}};timeout={set:e=>{this.timeout.clear(),this.timeout.timeoutId=window.setTimeout(this.loginFromStorage,e)},clear:()=>{const{timeoutId:e}=this.timeout;void 0!==e&&(window.clearTimeout(e),delete this.timeout.timeoutId)}};render(){const{marks:e,state:t,errorMsg:n,bottomHR:r}=this.state;return F("div",{class:"mod-indent-outer w-100",children:F("div",{class:"contentwithoutlink",children:[F("div",{class:"ucmr-title",children:["Unconfirmed Marks",(2===t||3===t||1===t)&&F("i",{role:"button",class:"icon fa fa-refresh fa-fw ml-1",onClick:this.refresh})]}),0===t&&F("i",{class:"icon fa fa-circle-o-notch fa-fw fa-spin"}),2===t&&F("div",{children:e.map((({key:e,course:t,name:n,date:r,mark:o})=>F("div",{class:"ucmr-row",children:[F("div",{class:"ucmr-course",children:t}),F("div",{class:"ucmr-name",children:n}),F("div",{class:"ucmr-date",children:r}),F("div",{class:"ucmr-mark",children:o})]},e)))}),3===t&&F("div",{children:"Sie haben alle Noten bestätigt."}),5===t&&F("div",{children:"Offline"}),4===t&&F("form",{class:"login-form",onSubmit:this.handleLogin,children:[F("input",{ref:this.inputs.username,required:!0,class:"form-control",placeholder:"Username",type:"text",value:GM_getValue("username")}),F("input",{ref:this.inputs.password,required:!0,class:"form-control",placeholder:"Password",type:"password",value:GM_getValue("password")}),F("input",{ref:this.inputs.page,required:!0,class:"form-control",placeholder:"Page (ausserschwyz, einsiedeln...)",type:"text",value:GM_getValue("page")}),F("button",{class:"btn btn-primary",type:"submit",children:"Save"})]}),1===t&&F("div",{class:"ucmr-error",children:n??"Something went wrong"}),r&&F("hr",{})]})})}refresh=e=>{e.preventDefault(),this.loginFromStorage()};handleLogin=e=>{e.preventDefault();const t=this.inputs.username.current?.value,n=this.inputs.password.current?.value,r=this.inputs.page.current?.value;t&&n&&r&&(GM_setValue("username",t),GM_setValue("password",n),GM_setValue("page",r),this.setState({state:0}),this.getMarks({username:t,password:n,page:r}))};reset=()=>{this.setState({state:0,errorMsg:void 0,marks:[]})};loginFromStorage=()=>{this.timeout.clear();const e=GM_getValue("username"),t=GM_getValue("password"),n=GM_getValue("page");this.reset(),e&&t&&n?this.getMarks({username:e,password:t,page:n}):this.setState({state:4})};componentDidMount(){this.loginFromStorage(),GM_addValueChangeListener("bottomHR",((e,t,n)=>{this.setState({bottomHR:Boolean(n)})})),GM_registerMenuCommand("Toggle divider",(()=>{GM_setValue("bottomHR",!GM_getValue("bottomHR"))}))}logout=(e=[])=>{for(const t of e)GM_deleteValue(t);this.setState({state:4})};getMarks=async({username:e,password:t,page:n})=>{this.timeout.clear();const r=await(async({username:e,password:t,page:n})=>{let r;try{r=await new Promise(((e,t)=>{GM_xmlhttpRequest({method:"GET",url:`https://www.schul-netz.com/${n}/loginto.php`,onload:e,timeout:1e4,onerror:t,onabort:t,ontimeout:t})}))}catch(e){return console.error(e),navigator.onLine?{type:"error",errorMsg:`An error occurred fetching "/${n}/loginto.php"`}:{type:"offline"}}if(404===r.status)return{type:"loggedout",credentialsToRemove:["page"]};if(200!==r.status)return{type:"error",errorMsg:`An error occurred fetching "/${n}/loginto.php": "${r.statusText}"`};const o=(new DOMParser).parseFromString(r.responseText,"text/html").querySelector('input[name="loginhash"]');if(!o)return{type:"error",errorMsg:"Could not get loginhash."};const l=new URLSearchParams({loginhash:o.value,login:e,passwort:t});let s;try{s=await new Promise(((e,t)=>{GM_xmlhttpRequest({method:"POST",url:`https://www.schul-netz.com/${n}/index.php?pageid=`,data:l.toString(),headers:{"Content-Type":"application/x-www-form-urlencoded"},timeout:1e4,onload:e,onerror:t,onabort:t,ontimeout:t})}))}catch(e){return console.error(e),{type:"error",errorMsg:"An error occurred trying to log in."}}if(/loginto\.php/i.test(s.finalUrl))return{type:"loggedout",credentialsToRemove:["password"]};const i=(new DOMParser).parseFromString(s.responseText,"text/html"),_=i.evaluate('.//h3[contains(@class, "tabletitle")][text() = "Ihre letzten Noten"]/../following-sibling::table',i.body,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!_)return{type:"error",errorMsg:"Could not find table with marks."};const{rows:a}=_,u=[];let c=!1;for(const e of a){const[t,n,r,o]=[...e.children].map((e=>e.textContent?.trim()));if(/sie haben alle noten bestätigt./i.test(t??"")){c=!0;break}t&&n&&r&&o&&u.push({course:t,name:n,date:r,mark:o,key:""+ ++U})}const d=i.evaluate('//a[contains(@class, "mdl-menu__item")][contains(text(), "Abmelden")]',i.body,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,p=d?.getAttribute("href");return p&&GM_xmlhttpRequest({method:"GET",url:`https://www.schul-netz.com/${n}/${p}`}),{type:"success",marks:c||0===u.length?void 0:u}})({username:e,password:t,page:n});switch(r.type){case"error":this.timeout.set(18e5),this.setState({state:1,errorMsg:r.errorMsg});break;case"loggedout":this.logout(r.credentialsToRemove);break;case"success":if(this.timeout.set(18e5),void 0===r.marks)return void this.setState({state:3});this.setState({marks:r.marks,state:2});break;case"offline":this.setState({state:5}),addEventListener("online",(()=>{this.loginFromStorage()}),{once:!0})}}}const H=()=>{const e=document.querySelector("#region-main ul.section");if(!e)return;const t=document.createElement("li");t.id="module-marks",t.className="activity label modtype_label";const n=document.querySelector("#module-timetable-v5");n?n.after(t):e.prepend(t),L(F(A,{}),t),GM_addStyle("@keyframes ucmr-spin{0%{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg)}}#module-marks{line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:transparent;word-break:break-word}#module-marks *{box-sizing:border-box}#module-marks .login-form{display:flex;flex-direction:column;justify-content:center;width:max-content}#module-marks .login-form button,#module-marks .login-form input{flex:0 0 100%;margin:3px 0;padding:.2em .5em}#module-marks .ucmr-error,#module-marks .ucmr-title{font-size:large;font-weight:450}#module-marks .ucmr-title{margin-bottom:10px}#module-marks .ucmr-error{color:#ea4335}#module-marks .ucmr-circle-notch{width:1em;height:1em;animation:ucmr-spin 2s infinite linear}#module-marks .ucmr-row{display:grid;grid-template-columns:30% 45% 15% 10%}")};var O;"/"===location.pathname&&(O=H,"interactive"!==document.readyState&&"complete"!==document.readyState?document.addEventListener("DOMContentLoaded",O,{once:!0}):O())})();