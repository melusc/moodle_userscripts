(()=>{"use strict";var e,t,n,o,r,s={},i=[],l=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function a(e,t){for(var n in t)e[n]=t[n];return e}function c(e){var t=e.parentNode;t&&t.removeChild(e)}function u(t,n,o){var r,s,i,l={};for(i in n)"key"==i?r=n[i]:"ref"==i?s=n[i]:l[i]=n[i];if(arguments.length>2&&(l.children=arguments.length>3?e.call(arguments,2):o),"function"==typeof t&&null!=t.defaultProps)for(i in t.defaultProps)void 0===l[i]&&(l[i]=t.defaultProps[i]);return _(t,l,r,s,null)}function _(e,o,r,s,i){var l={type:e,props:o,key:r,ref:s,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==i?++n:i};return null==i&&null!=t.vnode&&t.vnode(l),l}function d(e){return e.children}function p(e,t){this.props=e,this.context=t}function f(e,t){if(null==t)return e.__?f(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?f(e):null}function h(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return h(e)}}function m(e){(!e.__d&&(e.__d=!0)&&o.push(e)&&!v.__r++||r!==t.debounceRendering)&&((r=t.debounceRendering)||setTimeout)(v)}function v(){for(var e;v.__r=o.length;)e=o.sort((function(e,t){return e.__v.__b-t.__v.__b})),o=[],e.some((function(e){var t,n,o,r,s,i;e.__d&&(s=(r=(t=e).__v).__e,(i=t.__P)&&(n=[],(o=a({},r)).__v=r.__v+1,S(i,r,o,t.__n,void 0!==i.ownerSVGElement,null!=r.__h?[s]:null,n,null==s?f(r):s,r.__h),I(n,r),r.__e!=s&&h(r)))}))}function g(e,t,n,o,r,l,a,c,u,p){var h,m,v,g,w,k,x,C=o&&o.__k||i,I=C.length;for(n.__k=[],h=0;h<t.length;h++)if(null!=(g=n.__k[h]=null==(g=t[h])||"boolean"==typeof g?null:"string"==typeof g||"number"==typeof g||"bigint"==typeof g?_(null,g,null,null,g):Array.isArray(g)?_(d,{children:g},null,null,null):g.__b>0?_(g.type,g.props,g.key,g.ref?g.ref:null,g.__v):g)){if(g.__=n,g.__b=n.__b+1,null===(v=C[h])||v&&g.key==v.key&&g.type===v.type)C[h]=void 0;else for(m=0;m<I;m++){if((v=C[m])&&g.key==v.key&&g.type===v.type){C[m]=void 0;break}v=null}S(e,g,v=v||s,r,l,a,c,u,p),w=g.__e,(m=g.ref)&&v.ref!=m&&(x||(x=[]),v.ref&&x.push(v.ref,null,g),x.push(m,g.__c||w,g)),null!=w?(null==k&&(k=w),"function"==typeof g.type&&g.__k===v.__k?g.__d=u=y(g,u,e):u=b(e,g,v,C,w,u),"function"==typeof n.type&&(n.__d=u)):u&&v.__e==u&&u.parentNode!=e&&(u=f(v))}for(n.__e=k,h=I;h--;)null!=C[h]&&U(C[h],C[h]);if(x)for(h=0;h<x.length;h++)E(x[h],x[++h],x[++h])}function y(e,t,n){for(var o,r=e.__k,s=0;r&&s<r.length;s++)(o=r[s])&&(o.__=e,t="function"==typeof o.type?y(o,t,n):b(n,o,o,r,o.__e,t));return t}function b(e,t,n,o,r,s){var i,l,a;if(void 0!==t.__d)i=t.__d,t.__d=void 0;else if(null==n||r!=s||null==r.parentNode)e:if(null==s||s.parentNode!==e)e.appendChild(r),i=null;else{for(l=s,a=0;(l=l.nextSibling)&&a<o.length;a+=2)if(l==r)break e;e.insertBefore(r,s),i=s}return void 0!==i?i:r.nextSibling}function w(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]=null==n?"":"number"!=typeof n||l.test(t)?n:n+"px"}function k(e,t,n,o,r){var s;e:if("style"===t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof o&&(e.style.cssText=o=""),o)for(t in o)n&&t in n||w(e.style,t,"");if(n)for(t in n)o&&n[t]===o[t]||w(e.style,t,n[t])}else if("o"===t[0]&&"n"===t[1])s=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+s]=n,n?o||e.addEventListener(t,s?C:x,s):e.removeEventListener(t,s?C:x,s);else if("dangerouslySetInnerHTML"!==t){if(r)t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("href"!==t&&"list"!==t&&"form"!==t&&"tabIndex"!==t&&"download"!==t&&t in e)try{e[t]=null==n?"":n;break e}catch(e){}"function"==typeof n||(null==n||!1===n&&-1==t.indexOf("-")?e.removeAttribute(t):e.setAttribute(t,n))}}function x(e){this.l[e.type+!1](t.event?t.event(e):e)}function C(e){this.l[e.type+!0](t.event?t.event(e):e)}function S(e,n,o,r,s,i,l,c,u){var _,f,h,m,v,y,b,w,k,x,C,S,I,E,U,N=n.type;if(void 0!==n.constructor)return null;null!=o.__h&&(u=o.__h,c=n.__e=o.__e,n.__h=null,i=[c]),(_=t.__b)&&_(n);try{e:if("function"==typeof N){if(w=n.props,k=(_=N.contextType)&&r[_.__c],x=_?k?k.props.value:_.__:r,o.__c?b=(f=n.__c=o.__c).__=f.__E:("prototype"in N&&N.prototype.render?n.__c=f=new N(w,x):(n.__c=f=new p(w,x),f.constructor=N,f.render=M),k&&k.sub(f),f.props=w,f.state||(f.state={}),f.context=x,f.__n=r,h=f.__d=!0,f.__h=[],f._sb=[]),null==f.__s&&(f.__s=f.state),null!=N.getDerivedStateFromProps&&(f.__s==f.state&&(f.__s=a({},f.__s)),a(f.__s,N.getDerivedStateFromProps(w,f.__s))),m=f.props,v=f.state,h)null==N.getDerivedStateFromProps&&null!=f.componentWillMount&&f.componentWillMount(),null!=f.componentDidMount&&f.__h.push(f.componentDidMount);else{if(null==N.getDerivedStateFromProps&&w!==m&&null!=f.componentWillReceiveProps&&f.componentWillReceiveProps(w,x),!f.__e&&null!=f.shouldComponentUpdate&&!1===f.shouldComponentUpdate(w,f.__s,x)||n.__v===o.__v){for(f.props=w,f.state=f.__s,n.__v!==o.__v&&(f.__d=!1),f.__v=n,n.__e=o.__e,n.__k=o.__k,n.__k.forEach((function(e){e&&(e.__=n)})),C=0;C<f._sb.length;C++)f.__h.push(f._sb[C]);f._sb=[],f.__h.length&&l.push(f);break e}null!=f.componentWillUpdate&&f.componentWillUpdate(w,f.__s,x),null!=f.componentDidUpdate&&f.__h.push((function(){f.componentDidUpdate(m,v,y)}))}if(f.context=x,f.props=w,f.__v=n,f.__P=e,S=t.__r,I=0,"prototype"in N&&N.prototype.render){for(f.state=f.__s,f.__d=!1,S&&S(n),_=f.render(f.props,f.state,f.context),E=0;E<f._sb.length;E++)f.__h.push(f._sb[E]);f._sb=[]}else do{f.__d=!1,S&&S(n),_=f.render(f.props,f.state,f.context),f.state=f.__s}while(f.__d&&++I<25);f.state=f.__s,null!=f.getChildContext&&(r=a(a({},r),f.getChildContext())),h||null==f.getSnapshotBeforeUpdate||(y=f.getSnapshotBeforeUpdate(m,v)),U=null!=_&&_.type===d&&null==_.key?_.props.children:_,g(e,Array.isArray(U)?U:[U],n,o,r,s,i,l,c,u),f.base=n.__e,n.__h=null,f.__h.length&&l.push(f),b&&(f.__E=f.__=null),f.__e=!1}else null==i&&n.__v===o.__v?(n.__k=o.__k,n.__e=o.__e):n.__e=L(o.__e,n,o,r,s,i,l,u);(_=t.diffed)&&_(n)}catch(e){n.__v=null,(u||null!=i)&&(n.__e=c,n.__h=!!u,i[i.indexOf(c)]=null),t.__e(e,n,o)}}function I(e,n){t.__c&&t.__c(n,e),e.some((function(n){try{e=n.__h,n.__h=[],e.some((function(e){e.call(n)}))}catch(e){t.__e(e,n.__v)}}))}function L(t,n,o,r,i,l,a,u){var _,d,p,h=o.props,m=n.props,v=n.type,y=0;if("svg"===v&&(i=!0),null!=l)for(;y<l.length;y++)if((_=l[y])&&"setAttribute"in _==!!v&&(v?_.localName===v:3===_.nodeType)){t=_,l[y]=null;break}if(null==t){if(null===v)return document.createTextNode(m);t=i?document.createElementNS("http://www.w3.org/2000/svg",v):document.createElement(v,m.is&&m),l=null,u=!1}if(null===v)h===m||u&&t.data===m||(t.data=m);else{if(l=l&&e.call(t.childNodes),d=(h=o.props||s).dangerouslySetInnerHTML,p=m.dangerouslySetInnerHTML,!u){if(null!=l)for(h={},y=0;y<t.attributes.length;y++)h[t.attributes[y].name]=t.attributes[y].value;(p||d)&&(p&&(d&&p.__html==d.__html||p.__html===t.innerHTML)||(t.innerHTML=p&&p.__html||""))}if(function(e,t,n,o,r){var s;for(s in n)"children"===s||"key"===s||s in t||k(e,s,null,n[s],o);for(s in t)r&&"function"!=typeof t[s]||"children"===s||"key"===s||"value"===s||"checked"===s||n[s]===t[s]||k(e,s,t[s],n[s],o)}(t,m,h,i,u),p)n.__k=[];else if(y=n.props.children,g(t,Array.isArray(y)?y:[y],n,o,r,i&&"foreignObject"!==v,l,a,l?l[0]:o.__k&&f(o,0),u),null!=l)for(y=l.length;y--;)null!=l[y]&&c(l[y]);u||("value"in m&&void 0!==(y=m.value)&&(y!==t.value||"progress"===v&&!y||"option"===v&&y!==h.value)&&k(t,"value",y,h.value,!1),"checked"in m&&void 0!==(y=m.checked)&&y!==t.checked&&k(t,"checked",y,h.checked,!1))}return t}function E(e,n,o){try{"function"==typeof e?e(n):e.current=n}catch(e){t.__e(e,o)}}function U(e,n,o){var r,s;if(t.unmount&&t.unmount(e),(r=e.ref)&&(r.current&&r.current!==e.__e||E(r,null,n)),null!=(r=e.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(e){t.__e(e,n)}r.base=r.__P=null,e.__c=void 0}if(r=e.__k)for(s=0;s<r.length;s++)r[s]&&U(r[s],n,o||"function"!=typeof e.type);o||null==e.__e||c(e.__e),e.__=e.__e=e.__d=void 0}function M(e,t,n){return this.constructor(e,n)}function N(n,o,r){var i,l,a;t.__&&t.__(n,o),l=(i="function"==typeof r)?null:r&&r.__k||o.__k,a=[],S(o,n=(!i&&r||o).__k=u(d,null,[n]),l||s,s,void 0!==o.ownerSVGElement,!i&&r?[r]:l?null:o.firstChild?e.call(o.childNodes):null,a,!i&&r?r:l?l.__e:o.firstChild,i),I(a,n)}e=i.slice,t={__e:function(e,t,n,o){for(var r,s,i;t=t.__;)if((r=t.__c)&&!r.__)try{if((s=r.constructor)&&null!=s.getDerivedStateFromError&&(r.setState(s.getDerivedStateFromError(e)),i=r.__d),null!=r.componentDidCatch&&(r.componentDidCatch(e,o||{}),i=r.__d),i)return r.__E=r}catch(t){e=t}throw e}},n=0,p.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=a({},this.state),"function"==typeof e&&(e=e(a({},n),this.props)),e&&a(n,e),null!=e&&this.__v&&(t&&this._sb.push(t),m(this))},p.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),m(this))},p.prototype.render=d,o=[],v.__r=0;var H=function(e,t,n,o){var r;t[0]=0;for(var s=1;s<t.length;s++){var i=t[s++],l=t[s]?(t[0]|=i?1:2,n[t[s++]]):t[++s];3===i?o[0]=l:4===i?o[1]=Object.assign(o[1]||{},l):5===i?(o[1]=o[1]||{})[t[++s]]=l:6===i?o[1][t[++s]]+=l+"":i?(r=e.apply(l,H(e,l,n,["",null])),o.push(r),l[0]?t[0]|=2:(t[s-2]=0,t[s]=r)):o.push(l)}return o},P=new Map;var O=function(e){var t=P.get(this);return t||(t=new Map,P.set(this,t)),(t=H(this,t.get(e)||(t.set(e,t=function(e){for(var t,n,o=1,r="",s="",i=[0],l=function(e){1===o&&(e||(r=r.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?i.push(0,e,r):3===o&&(e||r)?(i.push(3,e,r),o=2):2===o&&"..."===r&&e?i.push(4,e,0):2===o&&r&&!e?i.push(5,0,!0,r):o>=5&&((r||!e&&5===o)&&(i.push(o,0,r,n),o=6),e&&(i.push(o,e,0,n),o=6)),r=""},a=0;a<e.length;a++){a&&(1===o&&l(),l(a));for(var c=0;c<e[a].length;c++)t=e[a][c],1===o?"<"===t?(l(),i=[i],o=3):r+=t:4===o?"--"===r&&">"===t?(o=1,r=""):r=t+r[0]:s?t===s?s="":r+=t:'"'===t||"'"===t?s=t:">"===t?(l(),o=1):o&&("="===t?(o=5,n=r,r=""):"/"===t&&(o<5||">"===e[a][c+1])?(l(),3===o&&(i=i[0]),o=i,(i=i[0]).push(2,0,o),o=0):" "===t||"\t"===t||"\n"===t||"\r"===t?(l(),o=2):r+=t),3===o&&"!--"===r&&(o=4,i=i[0])}return l(),i}(e)),t),arguments,[])).length>1?t:t[0]}.bind(u);const T=()=>document.querySelector('li[aria-labelledby$="label_2_4"] ul[role="group"]'),V=new Intl.Collator(void 0,{sensitivity:"base",numeric:!0}),R=e=>{if(!/^\d+\.\d+\.\d+$/.test(e))throw new Error(`Invalid version: ${e}.`);const[t,n,o]=e.split(".").map(Number);return[t,n,o]},G=(e,t)=>e-t,j=(e,t)=>G(e[0],t[0])||G(e[1],t[1])||G(e[2],t[2]),A="lastUpgraded",F=e=>[()=>GM_getValue(e),t=>{GM_setValue(e,t)},()=>{GM_deleteValue(e)}],[$,z,B]=F("token"),[D,q,W]=F("username");Symbol("getCourseContent");const X=Symbol("getUserId");async function Y(){const e=this._readCache(X);if(void 0!==e)return e;const t=await this.login(),n=new URLSearchParams({wsfunction:"core_webservice_get_site_info",wstoken:t}),o=await fetch(`${this.baseUrl}/webservice/rest/server.php?moodlewsrestformat=json`,{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:n.toString()});if(!o.ok)throw new Error(`Response was not ok: ${o.status}`);const r=await o.json();if("exception"in r)throw this.logout(),new Error("token was undefined");return this._writeCache(X,r.userid)}const J=e=>{e.prototype.getUserId=Y},K=Symbol("getCourses");async function Q(e=!1){const t=this._readCache(K);if(t&&!e)return t;const n=await this.getUserId(),o=await this.login(),r=new URLSearchParams({"requests[0][function]":"core_enrol_get_users_courses","requests[0][arguments]":JSON.stringify({userid:n,returnusercount:!1}),wstoken:o,wsfunction:"tool_mobile_call_external_functions",moodlewsrestformat:"json"}),s=await fetch(`${this.baseUrl}/webservice/rest/server.php`,{method:"POST",body:r.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}});if(!s.ok)throw new Error(`Response was not ok: ${s.status}`);const i=await s.json();if("exception"in i||i.responses[0].error)throw this.logout(),new Error("Token was invalid");const l=JSON.parse(i.responses[0].data),a=[];for(const{id:e,fullname:t}of l)a.push({id:e,name:t});return this._writeCache(K,a)}const Z=e=>{e.prototype.getCourses=Q,e.extend(J)};class ee extends Error{constructor(){super("No credentials provided.")}}class te extends Error{constructor(){super("Invalid credentials.")}}class ne extends Error{constructor(e){super(`${e} not included`)}}class oe{static extend(e){return e(oe),oe}baseUrl="https://moodle.ksasz.ch";credentials={token:$(),username:D()};#e=new Map;_readCache(e){return this.#e.get(e)}_writeCache(e,t){return this.#e.set(e,t),t}async login(e){const{credentials:t}=this;if(e&&(t.username=e.username,t.password=e.password,q(e.username)),t.token)return t.token;const{username:n,password:o}=t;if(!n||!o)throw new ee;const r=new URLSearchParams({username:n,password:o,service:"moodle_mobile_app"}),s=await fetch(`${this.baseUrl}/login/token.php`,{method:"POST",body:r.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}});if(!s.ok)throw new Error(`Response was not ok: ${s.status}`);const i=await s.json();if("errorcode"in i)throw this.logout(),new te;const{token:l}=i;return z(l),t.token=l,l}logout(){delete this.credentials.token,B(),delete this.credentials.password}async getCourses(e){throw new ne("getCourses")}async getUserId(){throw new ne("getUserId")}async popupLogin(e){throw new ne("popupLogin")}async getCourseContent(e,t){throw new ne("getCourseContent")}}var re,se,ie,le,ae=0,ce=[],ue=[],_e=t.__b,de=t.__r,pe=t.diffed,fe=t.__c,he=t.unmount;function me(e,n){t.__h&&t.__h(se,e,ae||n),ae=0;var o=se.__H||(se.__H={__:[],__h:[]});return e>=o.__.length&&o.__.push({__V:ue}),o.__[e]}function ve(e){return ae=1,function(e,t,n){var o=me(re++,2);if(o.t=e,!o.__c&&(o.__=[n?n(t):Ie(void 0,t),function(e){var t=o.__N?o.__N[0]:o.__[0],n=o.t(t,e);t!==n&&(o.__N=[n,o.__[1]],o.__c.setState({}))}],o.__c=se,!se.u)){se.u=!0;var r=se.shouldComponentUpdate;se.shouldComponentUpdate=function(e,t,n){if(!o.__c.__H)return!0;var s=o.__c.__H.__.filter((function(e){return e.__c}));if(s.every((function(e){return!e.__N})))return!r||r.call(this,e,t,n);var i=!1;return s.forEach((function(e){if(e.__N){var t=e.__[0];e.__=e.__N,e.__N=void 0,t!==e.__[0]&&(i=!0)}})),!(!i&&o.__c.props===e)&&(!r||r.call(this,e,t,n))}}return o.__N||o.__}(Ie,e)}function ge(e){return ae=5,ye((function(){return{current:e}}),[])}function ye(e,t){var n=me(re++,7);return Se(n.__H,t)?(n.__V=e(),n.i=t,n.__h=e,n.__V):n.__}function be(){for(var e;e=ce.shift();)if(e.__P&&e.__H)try{e.__H.__h.forEach(xe),e.__H.__h.forEach(Ce),e.__H.__h=[]}catch(n){e.__H.__h=[],t.__e(n,e.__v)}}t.__b=function(e){"function"!=typeof e.type||e.__m||null===e.__?e.__m||(e.__m=e.__&&e.__.__m?e.__.__m:""):e.__m=(e.__&&e.__.__m?e.__.__m:"")+(e.__&&e.__.__k?e.__.__k.indexOf(e):0),se=null,_e&&_e(e)},t.__r=function(e){de&&de(e),re=0;var t=(se=e.__c).__H;t&&(ie===se?(t.__h=[],se.__h=[],t.__.forEach((function(e){e.__N&&(e.__=e.__N),e.__V=ue,e.__N=e.i=void 0}))):(t.__h.forEach(xe),t.__h.forEach(Ce),t.__h=[])),ie=se},t.diffed=function(e){pe&&pe(e);var n=e.__c;n&&n.__H&&(n.__H.__h.length&&(1!==ce.push(n)&&le===t.requestAnimationFrame||((le=t.requestAnimationFrame)||ke)(be)),n.__H.__.forEach((function(e){e.i&&(e.__H=e.i),e.__V!==ue&&(e.__=e.__V),e.i=void 0,e.__V=ue}))),ie=se=null},t.__c=function(e,n){n.some((function(e){try{e.__h.forEach(xe),e.__h=e.__h.filter((function(e){return!e.__||Ce(e)}))}catch(o){n.some((function(e){e.__h&&(e.__h=[])})),n=[],t.__e(o,e.__v)}})),fe&&fe(e,n)},t.unmount=function(e){he&&he(e);var n,o=e.__c;o&&o.__H&&(o.__H.__.forEach((function(e){try{xe(e)}catch(e){n=e}})),o.__H=void 0,n&&t.__e(n,o.__v))};var we="function"==typeof requestAnimationFrame;function ke(e){var t,n=function(){clearTimeout(o),we&&cancelAnimationFrame(t),setTimeout(e)},o=setTimeout(n,100);we&&(t=requestAnimationFrame(n))}function xe(e){var t=se,n=e.__c;"function"==typeof n&&(e.__c=void 0,n()),se=t}function Ce(e){var t=se;e.__c=e.__(),se=t}function Se(e,t){return!e||e.length!==t.length||t.some((function(t,n){return t!==e[n]}))}function Ie(e,t){return"function"==typeof t?t(e):t}const Le=({cb:e,title:t,moodle:n})=>{const o=ge(null),r=ge(null),[s,i]=ve(!0),[l,a]=ve({username:!0,password:!0});return s?u("div",{class:"vertical-horizontal-center"},u("form",{onSubmit:async t=>{t.preventDefault(),t.stopImmediatePropagation();const s=o.current?.value.trim(),l=r.current?.value;if(a({password:Boolean(l),username:Boolean(s)}),s&&l){i(!1);try{const t=await n.login({username:s,password:l});e(t)}catch{i(!0)}}}},u("div",{class:"card shadow"},u("div",{class:"card-body"},u("h5",{class:"card-title"},"Login - ",t),u("div",{class:"mb-3"},u("label",{htmlFor:"popup-username",class:"form-label"},"Username"),u("input",{ref:o,required:!0,defaultValue:D(),id:"popup-username",placeholder:"Username",class:"form-control"+(l.username?"":" is-invalid"),onInput:()=>{a((e=>({...e,username:!0})))}})),u("div",{class:"mb-3"},u("label",{htmlFor:"popup-password",class:"form-label"},"Password"),u("input",{ref:r,required:!0,id:"popup-password",placeholder:"Password",class:"form-control"+(l.password?"":" is-invalid"),type:"password",onInput:()=>{a((e=>({...e,password:!0})))}}))),u("button",{class:"btn btn-primary",type:"submit"},"Login")))):null},Ee=async function(e){return new Promise((t=>{const n=GM_addStyle(".login-popup-userscript .vertical-horizontal-center{width:100%;height:100%;position:fixed;z-index:100000000;top:0;left:0;display:flex;align-items:center;justify-content:center;pointer-events:none}.login-popup-userscript .card{pointer-events:auto}"),o=document.createElement("div");o.className="login-popup-userscript",document.body.append(o),N(u(Le,{cb:e=>{N(null,o),n.remove(),o.remove(),t(e)},title:e,moodle:this}),o)}))},Ue="icons",Me=e=>{const{pointers:t,values:n}=Te();delete t[e];const o=new Set(Object.values(t));for(const e of Object.keys(n))o.has(e)||delete n[e];Ve({pointers:t,values:n})},Ne=()=>Te().pointers,He=(e,t)=>{const n=Ne();n[e]=t,Ve({pointers:n})},Pe=()=>Te().values,Oe=e=>{const t=Ne()[e];if(!t)return;const n=Pe()[t];return n||void 0},Te=()=>GM_getValue(Ue)??{pointers:{},values:{}},Ve=e=>{const t={...Te(),...e};GM_setValue(Ue,t)},Re=(e,t)=>{Me(e);const n=crypto.randomUUID();((e,t)=>{const n=Pe();n[e]=t,Ve({values:n})})(n,t),He(e,n)};oe.extend(Z);const Ge=({class:e,...t})=>u("svg",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",class:"svg-icon svg-icon-x"+(e?` ${e}`:""),viewBox:"0 0 24 24",...t},u("path",{d:"M24 0 0 24M0 0l24 24"})),je=e=>{const{icon:t}=e;return t?t.rawXML?u("span",{class:"icon"},O(Object.assign([t.rawXML],{raw:[t.rawXML]}))):t.dataURI?u("img",{class:"icon",src:t.dataURI}):null:null},Ae=({content:e,cb:n})=>{const o=ge(null);return function(e,n){var o=me(re++,3);!t.__s&&Se(o.__H,n)&&(o.__=e,o.i=n,se.__H.__h.push(o))}((()=>{void 0!==e&&scroll({top:0,left:0,behavior:"smooth"})}),[e]),e?u("div",{class:"outer-notification",onClick:e=>{e.currentTarget===e.target&&n()}},u("div",{ref:o,class:"inner-notification"},u(Ge,{class:"svg-close",onClick:()=>{n()}}),u("div",{class:"notification-string"},e))):null},Fe=e=>{const t=ge(null),n=ge(null);return u("div",{class:"outer-main"},u("div",{class:"main"},u("form",{onSubmit:o=>{o.preventDefault();const r=t.current?.value.trim(),s=n.current?.value;void 0!==r&&void 0!==s&&e.cb({username:r,password:s})}},u("div",{class:"replace-flex-inputs"},u("h2",null,"Login"),u("input",{ref:t,placeholder:"Username"}),u("input",{ref:n,placeholder:"Password",type:"password"}),u("button",{class:"btn-save",type:"submit"},"Login")))))};class $e extends p{state={selected:3};refs_={form:{current:null},url:{current:null},file:{current:null},copy:{current:null}};render(){const{refs_:e,props:t,handleInput:n,resetForm:o}=this,{selected:r}=this.state,{selectedCourse:s,courses:i}=t,l=e.file.current?.files?.[0];return u("div",{class:"outer-main"},u("div",{class:"main"},u("form",{ref:e.form},u("h2",null,"Change or add an icon"),s?u("div",{ref:e=>{e?.scrollIntoView({behavior:"smooth",block:"center"})}},u(je,{icon:s.icon}),u("span",null,s.name)):u("div",null,"Select course to the left"),u("h3",null,"Upload image from URL"),u("input",{ref:e.url,type:"url",placeholder:"Image url",disabled:2!==r&&3!==r,onInput:e=>{n(2,e)}}),u("h3",null,"Upload image from file"),u("input",{ref:e.file,hidden:!0,type:"file",onInput:e=>{n(0,e)}}),u("button",{type:"button",disabled:0!==r&&3!==r,onClick:()=>{e.file.current?.click()}},0===r&&l?u(d,null,l.name,u(Ge,{class:"svg-clear",onClick:e=>{e.stopPropagation(),o()}})):"Upload file"),u("h3",null,"Copy image from other course"),u("select",{ref:e.copy,disabled:1!==r&&3!==r,onInput:e=>{n(1,e)}},u("option",{selected:!0,value:"null"},"Select course to copy icon from"),i.map((({id:e,icon:t,name:n})=>t&&e!==s?.id&&u("option",{key:e,value:e},n)))),u("button",{class:"btn-save",type:"button",disabled:3===r||void 0===s,onClick:this.save},"Save"))))}resetForm=()=>{this.refs_.form.current?.reset(),this.setState({selected:3})};handleInput=(e,t)=>{let n=!1;const o=t.currentTarget;1===e||2===e?n=""!==o.value:0===e&&o instanceof HTMLInputElement&&(n=null!==o.files&&o.files.length>0),this.setState({selected:n?e:3})};resetSelected=()=>{this.props.resetSelected(),this.resetForm()};save=()=>{const{notify:e,selectedCourse:t}=this.props;if(void 0!==t)switch(this.state.selected){case 3:e("You have not submitted an icon");break;case 1:{const n=this.refs_.copy.current?.value;n?this.saveByCopy(n,t):e("You have not submitted an icon");break}case 0:{const n=this.refs_.file.current?.files?.[0];n?this.saveWithFileHandler(n,t):e("You have not submitted an icon");break}case 2:{const n=this.refs_.url.current?.value;n?this.saveByURL(n,t):e("Invalid URL submitted");break}}else e("You have not selected a course")};saveByURL=(e,t)=>{const{notify:n}=this.props;let o;try{o=new URL(e)}catch{return void n("Invalid URL submitted")}GM_xmlhttpRequest({method:"GET",url:o.href,timeout:15e3,responseType:"blob",anonymous:!0,onerror(){n("An error occured")},ontimeout(){n("Request timed out")},onload:e=>{var o,r;200===e.status&&e.response instanceof Blob?this.saveWithFileHandler(e.response,t):n((o=e.status,r=e.statusText,`Error ${o}: ${r}`))}})};saveWithFileHandler=(e,t)=>{const{notify:n}=this.props,{id:o}=t,r=new FileReader;if(r.addEventListener("error",(()=>{n("An error occured")})),"image/svg+xml"===e.type)return r.addEventListener("load",(()=>{const e=r.result;"string"==typeof e&&(Re(o,{rawXML:e}),this.props.updateCourseById(o),this.resetSelected())})),void r.readAsText(e);r.addEventListener("load",(()=>{const e=r.result;if("string"!=typeof e)return;const t=new Image;t.addEventListener("error",(()=>{n("File was not an image")})),t.addEventListener("load",(()=>{const t=/^data:[\w+/]+;base64,(?<data>.+)$/.exec(e)?.groups;if(!t)return;t.data?(Re(o,{dataURI:e}),this.props.updateCourseById(o),this.resetSelected()):n("Could not extract data from data URI")})),t.src=e})),r.readAsDataURL(e)};saveByCopy=(e,t)=>{const{id:n}=t;((e,t)=>{Me(e);const n=Ne()[t];void 0!==n&&He(e,n)})(n,e),this.resetSelected(),this.props.updateCourseById(n)}}const ze=({courses:e,resetIcon:t,isCoursesLoading:n,selectCourse:o})=>u("div",{class:"outer-sidebar"},u("div",{class:"sidebar"},n?u("div",{class:"row"},"Loading courses..."):e.map((({id:e,name:n,icon:r})=>u("div",{key:e,class:"row",onClick:()=>{o(e)}},u(je,{icon:r}),r&&u(Ge,{class:"svg-del-icon",onClick:n=>{n.stopPropagation(),t(e)}}),u("span",null,n))))));class Be extends p{state={loggedOut:!1,courses:[],selectedCourse:void 0,isCoursesLoading:!0,notification:void 0};moodle=new oe;render(){const{resetIcon:e,selectCourse:t,loggedOutCallback:n,updateCourseById:o,resetSelected:r,notify:s}=this,{loggedOut:i,selectedCourse:l,courses:a,isCoursesLoading:c,notification:_}=this.state;return u(d,null,u(Ae,{cb:()=>{s(void 0)},content:_}),u("div",{class:"container"+(void 0===_?"":" blur")},u(ze,{courses:a,resetIcon:e,isCoursesLoading:c,selectCourse:t}),i?u(Fe,{cb:n}):u($e,{updateCourseById:o,courses:a,selectedCourse:l,resetSelected:r,notify:s})))}componentDidMount(){this.tryLogin(),document.addEventListener("keydown",(e=>{"Escape"===e.key&&this.notify(void 0)}))}notify=e=>{this.setState({notification:e})};resetIcon=e=>{Me(e),this.updateCourseById(e),this.resetSelectedIfEqualId(e)};selectCourse=e=>{for(const t of this.state.courses)if(t.id===e){this.setState({selectedCourse:{...t}});break}};loggedOutCallback=e=>{this.setState({loggedOut:!1}),this.tryLogin(e)};tryLogin=e=>{this.moodle.login(e).then(this.onLogin,this.logout)};updateCourseById=e=>{const t=Oe(e);this.setState((({courses:n})=>{const o=[...n];for(const[r,s]of n.entries())if(s.id===e){o[r]={...s,icon:t};break}return{courses:o}}))};resetSelected=()=>{this.setState({selectedCourse:void 0})};resetSelectedIfEqualId=e=>{this.state.selectedCourse?.id===e&&this.resetSelected()};logout=()=>{this.moodle.logout(),this.setState({loggedOut:!0})};onLogin=async()=>{await this.getCourses()};getCourses=async()=>{let e;try{e=await this.moodle.getCourses()}catch{return void this.logout()}const t=[];for(const{id:n,name:o}of e)t.push({id:String(n),name:o,icon:Oe(String(n))});(e=>{e.sort((({name:e,id:t},{name:n,id:o})=>(e=e.trim(),n=n.trim(),V.compare(e,n)||Number(o)-Number(t))))})(t),this.setState({courses:t,isCoursesLoading:!1})}}const De=()=>{"https:"!==location.protocol&&(location.protocol="https:");const{body:e,head:t}=document;for(;e.lastChild;)e.lastChild.remove();for(;t.lastChild;)t.lastChild.remove();const n=document.createElement("link");n.rel="shortcut icon",n.href="/theme/image.php/classic/theme/1606210545/favicon",t.append(n),document.title="Custom Icons Setup",history.replaceState({},"","/customIconsPreact"),GM_addStyle('*,::after,::before{box-sizing:border-box}blockquote,body,dd,dl,figure,h1,h2,h3,h4,p{margin:0}ol[role=list],ul[role=list]{list-style:none}html:focus-within{scroll-behavior:smooth}body{min-height:100vh;text-rendering:optimizeSpeed;line-height:1.5}a:not([class]){text-decoration-skip-ink:auto}img,picture{max-width:100%;display:block}textarea{font:inherit}@media (prefers-reduced-motion:reduce){html:focus-within{scroll-behavior:auto}*,::after,::before{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}html{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";background:#202020;color:#ccc;font-size:.9375rem;font-weight:400;line-height:1.5;user-select:none}@media (min-width:0px){:root{--sidebar-flex: 0 0 100%;--main-flex: 0 0 100%;--padding-horizontal: 0;--padding-vertical: 0.5%}}@media (min-width:768px){:root{--sidebar-flex: 0 0 32%;--main-flex: 0 0 68%;--padding-horizontal: 0.5%;--padding-vertical: 0}}@media (min-width:992px){:root{--sidebar-flex: 0 0 25%;--main-flex: 0 0 75%}}@media (min-width:1200px){:root{--sidebar-flex: 0 0 20%;--main-flex: 0 0 80%}}.outer-sidebar{flex:var(--sidebar-flex);padding-right:var(--padding-horizontal);padding-bottom:var(--padding-vertical)}.outer-sidebar .sidebar{display:flex;flex-direction:column;padding:10px 15px;border:1.5px solid #343434;border-radius:4px;background-color:#141414}.outer-sidebar .row{cursor:pointer}.outer-sidebar .row:hover{text-decoration:underline}.outer-sidebar .row:hover .icon{display:none}.outer-sidebar .row:hover .svg-icon-x{display:initial}.outer-sidebar .row[data-removed=false]{color:#2ecc40}.outer-sidebar .row[data-removed=true],.svg-icon-x.svg-clear,.svg-icon-x.svg-del-icon{color:#ff4136}h2,h3{font-weight:300}h2{font-size:1.875rem}h3{font-size:1.64rem}input{margin-top:5px;width:220px}button,input,select{display:block;background:0 0;box-shadow:none;border:1.5px solid #343434;color:inherit;border-radius:2px;padding:5px 15px;max-width:100%;min-width:max-content;outline:0;font:inherit}button:disabled,input:disabled,select:disabled{color:gray}select>option{color:#111}button,select{width:auto}button:enabled,select:enabled{cursor:pointer}.svg-icon-x{margin-left:5px;height:1em;width:1em;cursor:pointer;display:none}.svg-icon-x.svg-del-icon{margin-left:0;margin-right:5px}.svg-icon-x.svg-close{color:#111;grid-column-start:3;grid-row-start:1;margin-left:auto}.btn-save{margin-top:10px;display:block}.icon{height:1em;width:1em;margin-right:5px}.icon:not(span){fill:#ccc;stroke:#ccc;-moz-context-properties:fill,stroke}span.icon{display:inline-block}.outer-main{flex:var(--main-flex);padding-left:var(--padding-horizontal);padding-top:var(--padding-vertical)}.main{padding:1.25rem 2.25rem;border:1.5px solid #343434;border-radius:4px;background-color:#141414}.container{padding:1%;display:flex;flex-direction:row;flex-wrap:wrap;width:100%;height:max-content}.outer-notification{position:absolute;top:0;left:0;width:100%;min-height:100%;z-index:2}.notification-string,.outer-notification{display:flex;justify-content:center;align-items:center}.inner-notification{display:grid;grid-template-columns:1fr auto 1fr;grid-template-rows:1fr auto 1fr;justify-items:center;width:375px;height:300px;max-height:90vh;max-width:90vw;background:#fff;border:#ddd solid 2px;border-radius:4px;padding:1em}.notification-string{grid-area:2/2/3/3;text-align:center;color:#111}.blur{filter:blur(4px);overflow:hidden}'),N(u(Be,null),e)};
// ==UserScript==
// @name      Custom Icons Preact
// @version   1.4.1
// @author    lusc
// @updateURL https://git.io/JXgei
// @include   *://moodle.ksasz.ch/*
// @grant     GM_setValue
// @grant     GM_getValue
// @grant     GM_addStyle
// @grant     GM_deleteValue
// @grant     GM_addValueChangeListener
// @grant     GM_registerMenuCommand
// @grant     GM_xmlhttpRequest
// @run-at    document-start
// @connect   *
// ==/UserScript==
oe.extend(Z).extend((e=>{e.prototype.popupLogin=Ee}));const qe=new oe;(e=>{try{(e=>{const t=GM_getValue(A),n=void 0===t?[-1,-1,-1]:R(t),o=Object.entries(e).map((([e,t])=>[R(e),t])).sort((([e],[t])=>j(e,t)));for(const[e,t]of o)j(n,e)<0&&t();GM_setValue(A,GM_info.script.version)})(e)}catch(e){console.error("Upgrading threw %o. Failing silently.",e)}})({"1.3.0":()=>{GM_deleteValue("lastValidatedToken"),GM_deleteValue("password")},"1.4.0"(){GM_deleteValue("changed");const e=GM_getValue("pointers"),t=GM_getValue("values");e&&t&&Ve({pointers:e,values:t}),GM_deleteValue("pointers"),GM_deleteValue("values")}}),"https:"!==location.protocol&&(location.protocol="https:");const We=!/^\/customiconspreact/i.test(location.pathname),Xe=(e,t)=>{const n=T();if(!n)return;const o=n.querySelector(`a[href="https://moodle.ksasz.ch/course/view.php?id=${e}"]`);if(o){if(o.firstElementChild){if(!t){const n=Oe(e);if(!n)return Ye(e),void Me(e);t=n}if("rawXML"in t){const e=document.createElement("span");e.classList.add("icon","navicon"),e.style.display="inline-block",e.style.color="var(--svg-fill, inherit)",e.tabIndex=-1,N(O(Object.assign([t.rawXML],{raw:[t.rawXML]})),e),o.firstElementChild.replaceWith(e)}else{const e=new Image;e.classList.add("icon","navicon"),e.setAttribute("aria-hidden","true"),e.style.cssText="fill: var(--svg-fill, inherit);stroke: var(--svg-fill, inherit);-moz-context-properties: fill, stroke;",e.tabIndex=-1,e.src=t.dataURI,o.firstElementChild.replaceWith(e)}}}else(async e=>{let t;try{t=await qe.getCourses()}catch{await qe.popupLogin("Custom Icons"),t=await qe.getCourses()}t.some((t=>String(t.id)===e))||(Me(e),alert(`You appear to not be in the course with the id "${e}" anymore.\nThe course will not be checked for anymore`))})(e)},Ye=e=>{const t=T()?.querySelector(`a[href="https://moodle.ksasz.ch/course/view.php?id=${e}"] > .icon.navicon`);if(t&&("SPAN"===t.nodeName||"IMG"===t.nodeName)){const e=document.createElement("i");e.classList.add("icon","fa","fa-graduation-cap","fa-fw","navicon"),e.setAttribute("aria-hidden","true"),e.tabIndex=-1,t.replaceWith(e)}},Je=(e,t,n,o)=>{if(!t&&!n)return;if(!o)return;if(!n){const{pointers:e}=t;for(const t of Object.keys(e))Ye(t);return}if(!t)return void Ke();const{pointers:r}=t,{pointers:s}=n,i=new Set(Object.keys(r));for(const e of Object.keys(s))s[e]!==r[e]&&Xe(e),i.delete(e);for(const e of i)Ye(e)},Ke=()=>{if(T()){const e=Ne(),t=Object.keys(e);for(const e of t)Xe(e);GM_addValueChangeListener(Ue,Je)}},Qe=()=>{T()&&(GM_registerMenuCommand("Open settings",(()=>{open("/customIconsPreact/","_blank")})),addEventListener("customIconsPreact",Ke),Ke())};if(!/^\/cleanmoodle/i.test(location.pathname)){Ze=We?Qe:De,"interactive"!==document.readyState&&"complete"!==document.readyState?document.addEventListener("DOMContentLoaded",Ze,{once:!0}):Ze()}var Ze})();