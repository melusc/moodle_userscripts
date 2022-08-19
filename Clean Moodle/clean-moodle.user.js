(()=>{"use strict";var e,t,n,o,r,l={},i=[],s=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function a(e,t){for(var n in t)e[n]=t[n];return e}function c(e){var t=e.parentNode;t&&t.removeChild(e)}function _(t,n,o){var r,l,i,s={};for(i in n)"key"==i?r=n[i]:"ref"==i?l=n[i]:s[i]=n[i];if(arguments.length>2&&(s.children=arguments.length>3?e.call(arguments,2):o),"function"==typeof t&&null!=t.defaultProps)for(i in t.defaultProps)void 0===s[i]&&(s[i]=t.defaultProps[i]);return u(t,s,r,l,null)}function u(e,o,r,l,i){var s={type:e,props:o,key:r,ref:l,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==i?++n:i};return null==i&&null!=t.vnode&&t.vnode(s),s}function d(e){return e.children}function p(e,t){this.props=e,this.context=t}function f(e,t){if(null==t)return e.__?f(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?f(e):null}function h(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return h(e)}}function m(e){(!e.__d&&(e.__d=!0)&&o.push(e)&&!v.__r++||r!==t.debounceRendering)&&((r=t.debounceRendering)||setTimeout)(v)}function v(){for(var e;v.__r=o.length;)e=o.sort((function(e,t){return e.__v.__b-t.__v.__b})),o=[],e.some((function(e){var t,n,o,r,l,i;e.__d&&(l=(r=(t=e).__v).__e,(i=t.__P)&&(n=[],(o=a({},r)).__v=r.__v+1,S(i,r,o,t.__n,void 0!==i.ownerSVGElement,null!=r.__h?[l]:null,n,null==l?f(r):l,r.__h),M(n,r),r.__e!=l&&h(r)))}))}function g(e,t,n,o,r,s,a,c,_,p){var h,m,v,g,b,k,x,C=o&&o.__k||i,M=C.length;for(n.__k=[],h=0;h<t.length;h++)if(null!=(g=n.__k[h]=null==(g=t[h])||"boolean"==typeof g?null:"string"==typeof g||"number"==typeof g||"bigint"==typeof g?u(null,g,null,null,g):Array.isArray(g)?u(d,{children:g},null,null,null):g.__b>0?u(g.type,g.props,g.key,null,g.__v):g)){if(g.__=n,g.__b=n.__b+1,null===(v=C[h])||v&&g.key==v.key&&g.type===v.type)C[h]=void 0;else for(m=0;m<M;m++){if((v=C[m])&&g.key==v.key&&g.type===v.type){C[m]=void 0;break}v=null}S(e,g,v=v||l,r,s,a,c,_,p),b=g.__e,(m=g.ref)&&v.ref!=m&&(x||(x=[]),v.ref&&x.push(v.ref,null,g),x.push(m,g.__c||b,g)),null!=b?(null==k&&(k=b),"function"==typeof g.type&&g.__k===v.__k?g.__d=_=y(g,_,e):_=w(e,g,v,C,b,_),"function"==typeof n.type&&(n.__d=_)):_&&v.__e==_&&_.parentNode!=e&&(_=f(v))}for(n.__e=k,h=M;h--;)null!=C[h]&&("function"==typeof n.type&&null!=C[h].__e&&C[h].__e==n.__d&&(n.__d=f(o,h+1)),N(C[h],C[h]));if(x)for(h=0;h<x.length;h++)I(x[h],x[++h],x[++h])}function y(e,t,n){for(var o,r=e.__k,l=0;r&&l<r.length;l++)(o=r[l])&&(o.__=e,t="function"==typeof o.type?y(o,t,n):w(n,o,o,r,o.__e,t));return t}function w(e,t,n,o,r,l){var i,s,a;if(void 0!==t.__d)i=t.__d,t.__d=void 0;else if(null==n||r!=l||null==r.parentNode)e:if(null==l||l.parentNode!==e)e.appendChild(r),i=null;else{for(s=l,a=0;(s=s.nextSibling)&&a<o.length;a+=2)if(s==r)break e;e.insertBefore(r,l),i=l}return void 0!==i?i:r.nextSibling}function b(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]=null==n?"":"number"!=typeof n||s.test(t)?n:n+"px"}function k(e,t,n,o,r){var l;e:if("style"===t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof o&&(e.style.cssText=o=""),o)for(t in o)n&&t in n||b(e.style,t,"");if(n)for(t in n)o&&n[t]===o[t]||b(e.style,t,n[t])}else if("o"===t[0]&&"n"===t[1])l=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+l]=n,n?o||e.addEventListener(t,l?C:x,l):e.removeEventListener(t,l?C:x,l);else if("dangerouslySetInnerHTML"!==t){if(r)t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("href"!==t&&"list"!==t&&"form"!==t&&"tabIndex"!==t&&"download"!==t&&t in e)try{e[t]=null==n?"":n;break e}catch(e){}"function"==typeof n||(null!=n&&(!1!==n||"a"===t[0]&&"r"===t[1])?e.setAttribute(t,n):e.removeAttribute(t))}}function x(e){this.l[e.type+!1](t.event?t.event(e):e)}function C(e){this.l[e.type+!0](t.event?t.event(e):e)}function S(e,n,o,r,l,i,s,c,_){var u,f,h,m,v,y,w,b,k,x,C,S,M,I=n.type;if(void 0!==n.constructor)return null;null!=o.__h&&(_=o.__h,c=n.__e=o.__e,n.__h=null,i=[c]),(u=t.__b)&&u(n);try{e:if("function"==typeof I){if(b=n.props,k=(u=I.contextType)&&r[u.__c],x=u?k?k.props.value:u.__:r,o.__c?w=(f=n.__c=o.__c).__=f.__E:("prototype"in I&&I.prototype.render?n.__c=f=new I(b,x):(n.__c=f=new p(b,x),f.constructor=I,f.render=L),k&&k.sub(f),f.props=b,f.state||(f.state={}),f.context=x,f.__n=r,h=f.__d=!0,f.__h=[]),null==f.__s&&(f.__s=f.state),null!=I.getDerivedStateFromProps&&(f.__s==f.state&&(f.__s=a({},f.__s)),a(f.__s,I.getDerivedStateFromProps(b,f.__s))),m=f.props,v=f.state,h)null==I.getDerivedStateFromProps&&null!=f.componentWillMount&&f.componentWillMount(),null!=f.componentDidMount&&f.__h.push(f.componentDidMount);else{if(null==I.getDerivedStateFromProps&&b!==m&&null!=f.componentWillReceiveProps&&f.componentWillReceiveProps(b,x),!f.__e&&null!=f.shouldComponentUpdate&&!1===f.shouldComponentUpdate(b,f.__s,x)||n.__v===o.__v){f.props=b,f.state=f.__s,n.__v!==o.__v&&(f.__d=!1),f.__v=n,n.__e=o.__e,n.__k=o.__k,n.__k.forEach((function(e){e&&(e.__=n)})),f.__h.length&&s.push(f);break e}null!=f.componentWillUpdate&&f.componentWillUpdate(b,f.__s,x),null!=f.componentDidUpdate&&f.__h.push((function(){f.componentDidUpdate(m,v,y)}))}if(f.context=x,f.props=b,f.__v=n,f.__P=e,C=t.__r,S=0,"prototype"in I&&I.prototype.render)f.state=f.__s,f.__d=!1,C&&C(n),u=f.render(f.props,f.state,f.context);else do{f.__d=!1,C&&C(n),u=f.render(f.props,f.state,f.context),f.state=f.__s}while(f.__d&&++S<25);f.state=f.__s,null!=f.getChildContext&&(r=a(a({},r),f.getChildContext())),h||null==f.getSnapshotBeforeUpdate||(y=f.getSnapshotBeforeUpdate(m,v)),M=null!=u&&u.type===d&&null==u.key?u.props.children:u,g(e,Array.isArray(M)?M:[M],n,o,r,l,i,s,c,_),f.base=n.__e,n.__h=null,f.__h.length&&s.push(f),w&&(f.__E=f.__=null),f.__e=!1}else null==i&&n.__v===o.__v?(n.__k=o.__k,n.__e=o.__e):n.__e=E(o.__e,n,o,r,l,i,s,_);(u=t.diffed)&&u(n)}catch(e){n.__v=null,(_||null!=i)&&(n.__e=c,n.__h=!!_,i[i.indexOf(c)]=null),t.__e(e,n,o)}}function M(e,n){t.__c&&t.__c(n,e),e.some((function(n){try{e=n.__h,n.__h=[],e.some((function(e){e.call(n)}))}catch(e){t.__e(e,n.__v)}}))}function E(t,n,o,r,i,s,a,_){var u,d,p,h=o.props,m=n.props,v=n.type,y=0;if("svg"===v&&(i=!0),null!=s)for(;y<s.length;y++)if((u=s[y])&&"setAttribute"in u==!!v&&(v?u.localName===v:3===u.nodeType)){t=u,s[y]=null;break}if(null==t){if(null===v)return document.createTextNode(m);t=i?document.createElementNS("http://www.w3.org/2000/svg",v):document.createElement(v,m.is&&m),s=null,_=!1}if(null===v)h===m||_&&t.data===m||(t.data=m);else{if(s=s&&e.call(t.childNodes),d=(h=o.props||l).dangerouslySetInnerHTML,p=m.dangerouslySetInnerHTML,!_){if(null!=s)for(h={},y=0;y<t.attributes.length;y++)h[t.attributes[y].name]=t.attributes[y].value;(p||d)&&(p&&(d&&p.__html==d.__html||p.__html===t.innerHTML)||(t.innerHTML=p&&p.__html||""))}if(function(e,t,n,o,r){var l;for(l in n)"children"===l||"key"===l||l in t||k(e,l,null,n[l],o);for(l in t)r&&"function"!=typeof t[l]||"children"===l||"key"===l||"value"===l||"checked"===l||n[l]===t[l]||k(e,l,t[l],n[l],o)}(t,m,h,i,_),p)n.__k=[];else if(y=n.props.children,g(t,Array.isArray(y)?y:[y],n,o,r,i&&"foreignObject"!==v,s,a,s?s[0]:o.__k&&f(o,0),_),null!=s)for(y=s.length;y--;)null!=s[y]&&c(s[y]);_||("value"in m&&void 0!==(y=m.value)&&(y!==t.value||"progress"===v&&!y||"option"===v&&y!==h.value)&&k(t,"value",y,h.value,!1),"checked"in m&&void 0!==(y=m.checked)&&y!==t.checked&&k(t,"checked",y,h.checked,!1))}return t}function I(e,n,o){try{"function"==typeof e?e(n):e.current=n}catch(e){t.__e(e,o)}}function N(e,n,o){var r,l;if(t.unmount&&t.unmount(e),(r=e.ref)&&(r.current&&r.current!==e.__e||I(r,null,n)),null!=(r=e.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(e){t.__e(e,n)}r.base=r.__P=null}if(r=e.__k)for(l=0;l<r.length;l++)r[l]&&N(r[l],n,"function"!=typeof e.type);o||null==e.__e||c(e.__e),e.__e=e.__d=void 0}function L(e,t,n){return this.constructor(e,n)}function U(n,o,r){var i,s,a;t.__&&t.__(n,o),s=(i="function"==typeof r)?null:r&&r.__k||o.__k,a=[],S(o,n=(!i&&r||o).__k=_(d,null,[n]),s||l,l,void 0!==o.ownerSVGElement,!i&&r?[r]:s?null:o.firstChild?e.call(o.childNodes):null,a,!i&&r?r:s?s.__e:o.firstChild,i),M(a,n)}e=i.slice,t={__e:function(e,t,n,o){for(var r,l,i;t=t.__;)if((r=t.__c)&&!r.__)try{if((l=r.constructor)&&null!=l.getDerivedStateFromError&&(r.setState(l.getDerivedStateFromError(e)),i=r.__d),null!=r.componentDidCatch&&(r.componentDidCatch(e,o||{}),i=r.__d),i)return r.__E=r}catch(t){e=t}throw e}},n=0,p.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=a({},this.state),"function"==typeof e&&(e=e(a({},n),this.props)),e&&a(n,e),null!=e&&this.__v&&(t&&this.__h.push(t),m(this))},p.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),m(this))},p.prototype.render=d,o=[],v.__r=0;const P=new Intl.Collator(void 0,{sensitivity:"base",numeric:!0}),V=()=>document.querySelector('li[aria-labelledby$="label_2_4"] ul[role="group"]'),H=e=>{if(!/^\d+\.\d+\.\d+$/.test(e))throw new Error(`Invalid version: ${e}.`);const[t,n,o]=e.split(".").map(Number);return[t,n,o]},G=(e,t)=>e-t,T=(e,t)=>G(e[0],t[0])||G(e[1],t[1])||G(e[2],t[2]),z="lastUpgraded",O=e=>[()=>GM_getValue(e),t=>{GM_setValue(e,t)},()=>{GM_deleteValue(e)}],[A,R,j]=O("token"),[D,$,q]=O("username");class F extends Error{constructor(){super("No credentials provided.")}}class B extends Error{constructor(){super("Invalid credentials.")}}class W extends Error{constructor(e){super(`${e} not included`)}}class K{static extend(e){return e(K),K}baseUrl="https://moodle.ksasz.ch";credentials={token:A(),username:D()};#e=new Map;_readCache(e){return this.#e.get(e)}_writeCache(e,t){return this.#e.set(e,t),t}async login(e){const{credentials:t}=this;if(e&&(t.username=e.username,t.password=e.password,$(e.username)),t.token)return t.token;const{username:n,password:o}=t;if(!n||!o)throw new F;const r=new URLSearchParams({username:n,password:o,service:"moodle_mobile_app"}),l=await fetch(`${this.baseUrl}/login/token.php`,{method:"POST",body:r.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}});if(!l.ok)throw new Error(`Response was not ok: ${l.status}`);const i=await l.json();if("errorcode"in i)throw this.logout(),new B;const{token:s}=i;return R(s),t.token=s,s}logout(){delete this.credentials.token,j(),delete this.credentials.password}async getCourses(e){throw new W("getCourses")}async getUserId(){throw new W("getUserId")}async popupLogin(e){throw new W("popupLogin")}async getCourseContent(e,t){throw new W("getCourseContent")}}const J=Symbol("getUserId");async function Y(){const e=this._readCache(J);if(void 0!==e)return e;const t=await this.login(),n=new URLSearchParams({wsfunction:"core_webservice_get_site_info",wstoken:t}),o=await fetch(`${this.baseUrl}/webservice/rest/server.php?moodlewsrestformat=json`,{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:n.toString()});if(!o.ok)throw new Error(`Response was not ok: ${o.status}`);const r=await o.json();if("exception"in r)throw this.logout(),new Error("token was undefined");return this._writeCache(J,r.userid)}const Q=e=>{e.prototype.getUserId=Y},X=Symbol("getCourses");async function Z(e=!1){const t=this._readCache(X);if(t&&!e)return t;const n=await this.getUserId(),o=await this.login(),r=new URLSearchParams({"requests[0][function]":"core_enrol_get_users_courses","requests[0][arguments]":JSON.stringify({userid:n,returnusercount:!1}),wstoken:o,wsfunction:"tool_mobile_call_external_functions",moodlewsrestformat:"json"}),l=await fetch(`${this.baseUrl}/webservice/rest/server.php`,{method:"POST",body:r.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}});if(!l.ok)throw new Error(`Response was not ok: ${l.status}`);const i=await l.json();if("exception"in i||i.responses[0].error)throw this.logout(),new Error("Token was invalid");const s=JSON.parse(i.responses[0].data),a=[];for(const{id:e,fullname:t}of s)a.push({id:e,name:t});return this._writeCache(X,a)}const ee=e=>{e.prototype.getCourses=Z,e.extend(Q)};var te,ne,oe,re,le=0,ie=[],se=[],ae=t.__b,ce=t.__r,_e=t.diffed,ue=t.__c,de=t.unmount;function pe(e,n){t.__h&&t.__h(ne,e,le||n),le=0;var o=ne.__H||(ne.__H={__:[],__h:[]});return e>=o.__.length&&o.__.push({__V:se}),o.__[e]}function fe(e){return le=1,function(e,t,n){var o=pe(te++,2);if(o.t=e,!o.__c&&(o.__=[n?n(t):ke(void 0,t),function(e){var t=o.__N?o.__N[0]:o.__[0],n=o.t(t,e);t!==n&&(o.__N=[n,o.__[1]],o.__c.setState({}))}],o.__c=ne,!o.__c.u)){o.__c.__H.u=!0;var r=o.__c.shouldComponentUpdate;o.__c.shouldComponentUpdate=function(e,t,n){if(!o.__c.__H)return!0;var l=o.__c.__H.__.filter((function(e){return e.__c}));return(l.every((function(e){return!e.__N}))||!l.every((function(e){if(!e.__N)return!0;var t=e.__[0];return e.__=e.__N,e.__N=void 0,t===e.__[0]})))&&(!r||r(e,t,n))}}return o.__N||o.__}(ke,e)}function he(e){return le=5,me((function(){return{current:e}}),[])}function me(e,t){var n=pe(te++,7);return be(n.__H,t)?(n.__V=e(),n.i=t,n.__h=e,n.__V):n.__}function ve(){for(var e;e=ie.shift();)if(e.__P&&e.__H)try{e.__H.__h.forEach(ye),e.__H.__h.forEach(we),e.__H.__h=[]}catch(n){e.__H.__h=[],t.__e(n,e.__v)}}t.__b=function(e){ne=null,ae&&ae(e)},t.__r=function(e){ce&&ce(e),te=0;var t=(ne=e.__c).__H;t&&(oe===ne?(t.__h=[],ne.__h=[],t.__.forEach((function(e){e.__N&&(e.__=e.__N),e.__V=se,e.__N=e.i=void 0}))):(t.__h.forEach(ye),t.__h.forEach(we),t.__h=[])),oe=ne},t.diffed=function(e){_e&&_e(e);var n=e.__c;n&&n.__H&&(n.__H.__h.length&&(1!==ie.push(n)&&re===t.requestAnimationFrame||((re=t.requestAnimationFrame)||function(e){var t,n=function(){clearTimeout(o),ge&&cancelAnimationFrame(t),setTimeout(e)},o=setTimeout(n,100);ge&&(t=requestAnimationFrame(n))})(ve)),n.__H.__.forEach((function(e){e.i&&(e.__H=e.i),e.__V!==se&&(e.__=e.__V),e.i=void 0,e.__V=se}))),oe=ne=null},t.__c=function(e,n){n.some((function(e){try{e.__h.forEach(ye),e.__h=e.__h.filter((function(e){return!e.__||we(e)}))}catch(o){n.some((function(e){e.__h&&(e.__h=[])})),n=[],t.__e(o,e.__v)}})),ue&&ue(e,n)},t.unmount=function(e){de&&de(e);var n,o=e.__c;o&&o.__H&&(o.__H.__.forEach((function(e){try{ye(e)}catch(e){n=e}})),n&&t.__e(n,o.__v))};var ge="function"==typeof requestAnimationFrame;function ye(e){var t=ne,n=e.__c;"function"==typeof n&&(e.__c=void 0,n()),ne=t}function we(e){var t=ne;e.__c=e.__(),ne=t}function be(e,t){return!e||e.length!==t.length||t.some((function(t,n){return t!==e[n]}))}function ke(e,t){return"function"==typeof t?t(e):t}const xe=({cb:e,title:t,moodle:n})=>{const o=he(null),r=he(null),[l,i]=fe(!0),[s,a]=fe({username:!0,password:!0});return l?_("div",{class:"vertical-horizontal-center"},_("form",{onSubmit:async t=>{t.preventDefault(),t.stopImmediatePropagation();const l=o.current?.value.trim(),s=r.current?.value;if(a({password:Boolean(s),username:Boolean(l)}),l&&s){i(!1);try{const t=await n.login({username:l,password:s});e(t)}catch{i(!0)}}}},_("div",{class:"card shadow"},_("div",{class:"card-body"},_("h5",{class:"card-title"},"Login - ",t),_("div",{class:"mb-3"},_("label",{htmlFor:"popup-username",class:"form-label"},"Username"),_("input",{ref:o,required:!0,defaultValue:D(),id:"popup-username",placeholder:"Username",class:"form-control"+(s.username?"":" is-invalid"),onInput:()=>{a((e=>({...e,username:!0})))}})),_("div",{class:"mb-3"},_("label",{htmlFor:"popup-password",class:"form-label"},"Password"),_("input",{ref:r,required:!0,id:"popup-password",placeholder:"Password",class:"form-control"+(s.password?"":" is-invalid"),type:"password",onInput:()=>{a((e=>({...e,password:!0})))}}))),_("button",{class:"btn btn-primary",type:"submit"},"Login")))):null},Ce=async function(e){return new Promise((t=>{const n=GM_addStyle(".login-popup-userscript .vertical-horizontal-center{width:100%;height:100%;position:fixed;z-index:100000000;top:0;left:0;display:flex;align-items:center;justify-content:center;pointer-events:none}.login-popup-userscript .card{pointer-events:auto}"),o=document.createElement("div");o.className="login-popup-userscript",document.body.append(o),U(_(xe,{cb:e=>{U(null,o),n.remove(),o.remove(),t(e)},title:e,moodle:this}),o)}))};Symbol("getCourseContent");const Se=()=>GM_getValue("overrides")??{},Me=e=>Se()[e],Ee=(e,t)=>{const n=Se();n[e]=t,(e=>{GM_setValue("overrides",e)})(n)},Ie=e=>{const t=Se();return delete t[e],GM_setValue("overrides",t),t},Ne=()=>_("svg",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",class:"icon svg-icon-check",viewBox:"0 0 24 24"},_("path",{d:"m5 12 5 5L20 7"})),Le=()=>_("svg",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",class:"icon svg-icon-x",viewBox:"0 0 24 24"},_("path",{d:"M18 6 6 18M6 6l12 12"})),Ue=()=>_("svg",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",class:"icon svg-icon-arrow-back",viewBox:"0 0 24 24"},_("path",{d:"m9 11-4 4 4 4m-4-4h11a4 4 0 0 0 0-8h-1"}));K.extend(ee);const Pe=e=>e.sort((({courseName:e,value:t},{courseName:n,value:o})=>{const r=Ve(t,e).trim(),l=Ve(o,n).trim();return P.compare(r,l)})),Ve=(e,t)=>"string"==typeof e?e:t,He=({course:e,handleClick:t,onChange:n})=>{const{courseName:o,value:r,courseId:l}=e;return _("div",{class:"row"+(!1===r?" removed":""),title:o,onClick:n=>{t(n,e)}},_("span",{onClick:t=>{t.stopImmediatePropagation(),!1===r?Ie(l):Ee(l,!1),n(e)}},_(!1===r?Le:Ne,null)),Ve(r,o),"string"==typeof r&&_("span",{onClick:t=>{t.stopImmediatePropagation(),Ie(l),n(e)}},_(Ue,null)))},Ge=({courses:e,loadingCourses:t,handleClick:n,onChange:o})=>_("div",{class:"outer-sidebar"},_("div",{class:"sidebar"},t&&_("div",null,"Loading courses..."),e.map((e=>_(He,{key:e.courseId,course:e,handleClick:n,onChange:o}))))),Te=({cb:e})=>{const t=he(null),n=he(null);return _("form",{onSubmit:o=>{o.preventDefault();const r=t.current?.value,l=n.current?.value;r&&l&&e(r,l)}},_("div",{class:"replace-flex-input"},_("h5",null,"Login"),_("input",{ref:t,placeholder:"Username",defaultValue:D()}),_("input",{ref:n,placeholder:"Password",type:"password"}),_("button",{class:"btn-save",type:"submit"},"Login")))},ze=e=>{const{selected:t,replaceInputRef:n,handleSaveClick:o,handleKeydown:r}=e;return _("div",{class:"outer-main"},_("div",{class:"main"},_("div",{class:"section-title"},"Rename course"),_("div",{class:"replace-flex-inputs"},_("div",null,t.isSelected?`Selected: ${t.courseName}`:"Select course to the left"),_("input",{ref:n,class:"replace-input",placeholder:t.isSelected?`Leave empty to reset to ${t.courseName}`:"Select course to the left",disabled:!t.isSelected,value:t.isSelected?t.value||t.courseName:"",onKeyDown:r}),_("button",{class:"btn-save",disabled:!t.isSelected,type:"button",onClick:o},"Save"))))};class Oe extends p{moodle=new K;state={courses:[],loadingCourses:!0,selected:{isSelected:!1},loggedOut:!1};replaceInputRef={current:null};render(){const{courses:e,selected:t,loggedOut:n,loadingCourses:o}=this.state,{handleSidebarClick:r,replaceInputRef:l,loggedOutCallbackHandler:i,handleMainKeydown:s,handleSave:a,removeSelectedIfEqualId:c}=this;return _("div",{class:"container"},_(Ge,{courses:e,handleClick:r,loadingCourses:o,onChange:c}),n?_(Te,{cb:i}):_(ze,{selected:t,replaceInputRef:l,handleKeydown:s,handleSaveClick:a}))}getCourses=async()=>{let e;try{e=await this.moodle.getCourses()}catch{return void this.logout()}const t=[];for(const{id:n,name:o}of e)t.push({courseName:o,courseId:n,value:Me(n)});Pe(t),this.setState({courses:t,loadingCourses:!1})};loggedOutCallbackHandler=async(e,t)=>{if((e=e.trim())&&t)try{await this.moodle.login({username:e,password:t}),this.setState({loggedOut:!1}),this.onLogin()}catch{this.logout()}};onLogin=async()=>{await this.getCourses()};logout=()=>{this.moodle.logout(),this.setState({loggedOut:!0})};componentDidMount(){this.moodle.login().then(this.onLogin,(()=>{this.logout()})),GM_addValueChangeListener("overrides",(()=>{this.setState((({courses:e})=>{const t=e.map((({...e})=>({...e,value:Me(e.courseId)})));return Pe(t),{courses:t}}))}))}handleMainKeydown=e=>{"Enter"===e.key&&this.handleSave()};handleSave=()=>{const e=this.replaceInputRef.current?.value;if(void 0===e)return;const t=this.state.selected;if(!t.isSelected)return;const{courseId:n,courseName:o}=t;((e,t="",n="")=>{t=t.trim(),n=n.trim();const o=Se();delete o[e],""!==t&&t!==n&&(o[e]=t),GM_setValue("overrides",o)})(n,e,o),this.setState({selected:{isSelected:!1}})};removeSelectedIfEqualId=({courseId:e})=>{this.setState((({selected:t})=>t.isSelected&&t.courseId===e?{selected:{isSelected:!1}}:null))};handleSidebarClick=(e,t)=>{this.setState({selected:{isSelected:!0,...t}},(()=>{const e=this.replaceInputRef.current;e&&(e.focus(),e.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}))}))}}const Ae=()=>{const{head:e,body:t}=document;for(;e.lastChild;)e.lastChild.remove();for(;t.lastChild;)t.lastChild.remove();history.replaceState({},"","/cleanMoodlePreact"),document.title="Clean Moodle Setup",GM_addStyle('*,::after,::before{box-sizing:border-box}blockquote,body,dd,dl,figure,h1,h2,h3,h4,p{margin:0}ol[role=list],ul[role=list]{list-style:none}html:focus-within{scroll-behavior:smooth}body{min-height:100vh;text-rendering:optimizeSpeed;line-height:1.5;padding:1%}a:not([class]){text-decoration-skip-ink:auto}img,picture{max-width:100%;display:block}button,input,select,textarea{font:inherit}@media (prefers-reduced-motion:reduce){html:focus-within{scroll-behavior:auto}*,::after,::before{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}html{background:#202020;color:#ccc;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";font-size:.9375rem;font-weight:400;line-height:1.5;user-select:none}@media (min-width:0px){:root{--sidebar-flex: 0 0 100%;--main-flex: 0 0 100%;--padding-horizontal: 0;--padding-vertical: 0.5%}}@media (min-width:768px){:root{--sidebar-flex: 0 0 32%;--main-flex: 0 0 68%;--padding-horizontal: 0.5%;--padding-vertical: 0}}@media (min-width:992px){:root{--sidebar-flex: 0 0 25%;--main-flex: 0 0 75%}}@media (min-width:1200px){:root{--sidebar-flex: 0 0 20%;--main-flex: 0 0 80%}}.outer-sidebar{flex:var(--sidebar-flex);padding-right:var(--padding-horizontal);padding-bottom:var(--padding-vertical)}.outer-sidebar .sidebar{display:flex;flex-direction:column;padding:10px 15px;border:1.5px solid #343434;border-radius:4px;background-color:#141414}.outer-sidebar .row{cursor:pointer;display:flex;align-items:flex-start;color:#198754}.outer-sidebar .row:hover{text-decoration:underline}.outer-sidebar .row.removed{color:#dc3545}.btn-save:not([disabled]){cursor:pointer}.icon{height:1.5em;width:1.5em}.section-title{font-size:30px;font-weight:300;-webkit-font-smoothing:antialiased}.svg-icon-check{color:#198754}.svg-icon-x{color:#dc3545}.outer-main{flex:var(--main-flex);padding-left:var(--padding-horizontal);padding-top:var(--padding-vertical)}.main{padding:3% 2% 5%;border:1.5px solid #343434;border-radius:4px;background-color:#141414}.replace-flex-inputs{display:flex;flex-direction:column;gap:10px;margin-top:10px}.replace-flex-inputs *{align-self:flex-start}button,input{display:flex;align-items:center;padding:.375rem .75rem;font-size:.9375rem;font-weight:400;line-height:1.5;color:#495057;white-space:nowrap;background-color:#e9ecef;border:1px solid #8f959e;border-radius:.25rem;font-family:inherit}button{text-align:center;background-color:#1177d1;color:#ccc;margin-top:10px}.container{display:flex;flex-direction:row;flex-wrap:wrap;width:100%;height:max-content}'),U(_(Oe,null),t);const n=document.createElement("link");n.rel="shortcut icon",n.href="/theme/image.php/classic/theme/1588340020/favicon",e.append(n)};
// ==UserScript==
// @name      Clean Moodle with Preact
// @version   1.6.0
// @author    lusc
// @include   *://moodle.ksasz.ch/*
// @updateURL https://git.io/JXgeW
// @grant     GM_setValue
// @grant     GM_getValue
// @grant     GM_deleteValue
// @grant     GM_addStyle
// @grant     GM_registerMenuCommand
// @grant     GM_addValueChangeListener
// @run-at    document-start
// ==/UserScript==
K.extend(ee).extend((e=>{e.prototype.popupLogin=Ce})),(e=>{try{(e=>{const t=GM_getValue(z),n=void 0===t?[-1,-1,-1]:H(t),o=Object.entries(e).map((([e,t])=>[H(e),t])).sort((([e],[t])=>T(e,t)));for(const[e,t]of o)T(n,e)<0&&t();GM_setValue(z,GM_info.script.version)})(e)}catch(e){console.error("Upgrading threw %o. Failing silently.",e)}})({"1.4.0":()=>{GM_deleteValue("lastValidatedToken"),GM_deleteValue("password")},"1.5.0"(){const e=GM_getValue("remove")??[],t=GM_getValue("replace")??{};for(const n of e)t[n]=!1;GM_setValue("overrides",t),GM_deleteValue("remove"),GM_deleteValue("replace")}}),"https:"!==location.protocol&&(location.protocol="https:");const Re=new K,je=!/^\/cleanmoodlepreact/i.test(location.pathname),De=()=>_("a",{href:"/cleanMoodlePreact/",target:"_blank",rel:"noreferrer noopener",onClick:e=>{e.stopPropagation()}},_("svg",{style:{marginLeft:"0.2em"},fill:"currentColor",class:"icon svg-icon-gear",viewBox:"0 0 16 16"},_("path",{d:"M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 014.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 01-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 011.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 012.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 012.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 011.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 01-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 018.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 001.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 00.52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 00-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 00-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 00-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 00-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 00.52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 001.255-.52l.094-.319zM8 5.754a2.246 2.246 0 100 4.492 2.246 2.246 0 000-4.492zM4.754 8a3.246 3.246 0 116.492 0 3.246 3.246 0 01-6.492 0z"}))),$e=e=>V()?.querySelector(`a[href="https://moodle.ksasz.ch/course/view.php?id=${e}"]`),qe=async e=>{let t;try{t=await Re.getCourses()}catch{await Re.popupLogin("Clean Moodle"),t=await Re.getCourses()}t.some((t=>String(t.id)===e))||(Ie(e),alert(`You appear to not be in the course with the id "${e}" anymore.\nThe course will not be checked for anymore`))},Fe=(e,t)=>{const n=$e(e);if(!n)return void qe(e);const o=t??n.title;if(0===n.childElementCount)n.textContent=o;else{const e=n.querySelector("span.item-content-wrap");e&&(e.textContent=o)}},Be=(e,t)=>{const n=$e(e);if(n){const e=n.closest("li.type_course")?.classList;e&&!e.contains("contains_branch")&&(e.toggle("hide",!t),e.toggle("hidden",!t))}else qe(e)},We=()=>{const e=V();if(!e)return;const t=[...e.querySelectorAll(":scope > li.type_course")];t.sort(((e,t)=>{const n=e.firstElementChild?.textContent,o=t.firstElementChild?.textContent;if(!n||!o)throw new Error("aText or bText was undefined");return P.compare(n.trim(),o.trim())})),e.prepend(...t)},Ke=(e,t)=>{Be(e,!1!==t),Fe(e,!1===t?void 0:t)},Je=()=>{if(!V())return;const e=Se();for(const[t,n]of Object.entries(e))Ke(t,n);We()},Ye=()=>{const e=V();if(GM_registerMenuCommand("Open settings",(()=>{open("https://moodle.ksasz.ch/cleanMoodlePreact/")})),e){Je(),GM_addValueChangeListener("overrides",((e,t,n,o)=>{if(o)if(t){for(const e of Object.keys(t))e in n||(Fe(e,void 0),Be(e,!0));for(const[e,o]of Object.entries(n))o!==t[e]&&Ke(e,o);We()}else Je()}));const t=e.previousSibling;if(t instanceof HTMLParagraphElement){const e=document.createElement("span");t.append(e),U(_(De,null),e)}}};if(!/^\/customicons/i.test(location.pathname)){Qe=je?Ye:Ae,"interactive"!==document.readyState&&"complete"!==document.readyState?document.addEventListener("DOMContentLoaded",Qe,{once:!0}):Qe()}var Qe})();