/*! For license information please see clean-moodle.user.js.LICENSE.txt */
(()=>{"use strict";const e=e=>{if(!/^\d+\.\d+\.\d+$/.test(e))throw new Error(`Invalid version: ${e}.`);const[t,n,o]=e.split(".").map(Number);return[t,n,o]},t=(e,t)=>e-t,n=(e,n)=>t(e[0],n[0])||t(e[1],n[1])||t(e[2],n[2]),o="lastUpgraded",r=()=>document.querySelector('#page-content li.type_system.depth_2 > ul[role="group"]'),s=new Intl.Collator(void 0,{sensitivity:"base",numeric:!0}),i=new Map;function c(e){const t=Symbol(e.name);return function(...n){const o=n.slice(0,-1),r=[this,...o],s=n.at(-1),c=function(e){let t=i;for(const n of e)t.has(n)||t.set(n,new Map),t=t.get(n);return t}(r);if(s&&c.has(t))return c.get(t);const l=e.apply(this,o);return c.set(t,l),l instanceof Promise&&l.catch((()=>{c.delete(t)})),l}}async function l(){return(await this.fetch("core_webservice_get_site_info",{})).userid}const a=e=>{e.prototype.getUserId=c(l)};async function u(){const e=await this.getUserId(!0),t=await this.fetch("core_enrol_get_users_courses",{userid:String(e),returnusercount:"0"}),n=[];for(const{id:e,fullname:o}of t)n.push({id:e,name:o});return n}const d=e=>{e.prototype.getCourses=c(u),e.extend(a)};var p;!function(e){e.username="username",e.token="token"}(p||(p={}));const f=e=>[()=>GM_getValue(e),t=>{GM_setValue(e,t)},()=>{GM_deleteValue(e)}],[m,h,g]=f(p.token),[v,$,w]=f(p.username);class b extends Error{constructor(){super("No credentials provided.")}}class y extends Error{constructor(){super("Invalid credentials.")}}class x extends Error{constructor(e){super(`${e} not included`)}}let k=new URL("http://localhost/");"undefined"!=typeof location?k=new URL("/",location.href):"undefined"!=typeof process&&"string"==typeof process.env.MOODLE_BASE_URL&&(k=new URL(process.env.MOODLE_BASE_URL));class _{static extend(e){return e(_),_}baseUrl=k;credentials={token:m(),username:v()};resolveUrl=e=>new URL(e,this.baseUrl);async login(e){const{credentials:t}=this;if(e&&(t.username=e.username,t.password=e.password,$(e.username)),t.token)return t.token;const{username:n,password:o}=t;if(!n||!o)throw new b;const r=new URLSearchParams({username:n,password:o,service:"moodle_mobile_app"}),s=await fetch(this.resolveUrl("/login/token.php"),{method:"POST",body:r.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}});if(!s.ok)throw new Error(`Response was not ok: ${s.status}`);const i=await s.json();if("errorcode"in i)throw this.logout(),new y;const{token:c}=i;return h(c),t.token=c,c}async fetch(e,t){const n=new URLSearchParams(t);n.set("wstoken",await this.login()),n.set("wsfunction",e),n.set("moodlewsrestformat","json");const o=await fetch(this.resolveUrl("/webservice/rest/server.php"),{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:n.toString()});if(!o.ok)throw new Error(`Response was not ok: ${o.status}`);const r=await o.json(),s=r;if("exception"in s)throw this.logout(),new Error(`Error(${s.exception}): ${s.message}`);return r}logout(){delete this.credentials.token,g(),delete this.credentials.password}async getCourses(e){throw new x("getCourses")}async getUserId(e){throw new x("getUserId")}async popupLogin(e,t){throw new x("popupLogin")}async getCourseContent(e,t){throw new x("getCourseContent")}}function C(){}function M(e){return e()}function E(){return Object.create(null)}function S(e){e.forEach(M)}function L(e){return"function"==typeof e}function U(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function N(e){return 0===Object.keys(e).length}new Set;const O="undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:global;class G{constructor(e){this.options=e,this._listeners="WeakMap"in O?new WeakMap:void 0}observe(e,t){return this._listeners.set(e,t),this._getObserver().observe(e,this.options),()=>{this._listeners.delete(e),this._observer.unobserve(e)}}_getObserver(){var e;return null!==(e=this._observer)&&void 0!==e?e:this._observer=new ResizeObserver((e=>{var t;for(const n of e)G.entries.set(n.target,n),null===(t=this._listeners.get(n.target))||void 0===t||t(n)}))}}G.entries="WeakMap"in O?new WeakMap:void 0;let z=!1;function V(e,t){e.appendChild(t)}function j(e,t,n){e.insertBefore(t,n||null)}function I(e){e.parentNode&&e.parentNode.removeChild(e)}function T(e){return document.createElement(e)}function P(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function R(e){return document.createTextNode(e)}function A(){return R(" ")}function q(){return R("")}function B(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function D(e){return function(t){return t.preventDefault(),e.call(this,t)}}function H(e){return function(t){return t.stopPropagation(),e.call(this,t)}}function W(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function F(e,t){t=""+t,e.data!==t&&(e.data=t)}function X(e,t){e.value=null==t?"":t}function Y(e,t,n){e.classList[n?"add":"remove"](t)}function J(e,t,{bubbles:n=!1,cancelable:o=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(e,n,o,t),r}new Map;let K;function Q(e){K=e}function Z(){if(!K)throw new Error("Function called outside component initialization");return K}function ee(){const e=Z();return(t,n,{cancelable:o=!1}={})=>{const r=e.$$.callbacks[t];if(r){const s=J(t,n,{cancelable:o});return r.slice().forEach((t=>{t.call(e,s)})),!s.defaultPrevented}return!0}}function te(e,t){const n=e.$$.callbacks[t.type];n&&n.slice().forEach((e=>e.call(this,t)))}const ne=[],oe=[];let re=[];const se=[],ie=Promise.resolve();let ce=!1;function le(){ce||(ce=!0,ie.then(pe))}function ae(e){re.push(e)}const ue=new Set;let de=0;function pe(){if(0!==de)return;const e=K;do{try{for(;de<ne.length;){const e=ne[de];de++,Q(e),fe(e.$$)}}catch(e){throw ne.length=0,de=0,e}for(Q(null),ne.length=0,de=0;oe.length;)oe.pop()();for(let e=0;e<re.length;e+=1){const t=re[e];ue.has(t)||(ue.add(t),t())}re.length=0}while(ne.length);for(;se.length;)se.pop()();ce=!1,ue.clear(),Q(e)}function fe(e){if(null!==e.fragment){e.update(),S(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(ae)}}const me=new Set;let he;function ge(){he={r:0,c:[],p:he}}function ve(){he.r||S(he.c),he=he.p}function $e(e,t){e&&e.i&&(me.delete(e),e.i(t))}function we(e,t,n,o){if(e&&e.o){if(me.has(e))return;me.add(e),he.c.push((()=>{me.delete(e),o&&(n&&e.d(1),o())})),e.o(t)}else o&&o()}function be(e,t){we(e,1,1,(()=>{t.delete(e.key)}))}new Set(["allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","hidden","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"]);let ye;function xe(e){e&&e.c()}function ke(e,t,n,o){const{fragment:r,after_update:s}=e.$$;r&&r.m(t,n),o||ae((()=>{const t=e.$$.on_mount.map(M).filter(L);e.$$.on_destroy?e.$$.on_destroy.push(...t):S(t),e.$$.on_mount=[]})),s.forEach(ae)}function _e(e,t){const n=e.$$;null!==n.fragment&&(!function(e){const t=[],n=[];re.forEach((o=>-1===e.indexOf(o)?t.push(o):n.push(o))),n.forEach((e=>e())),re=t}(n.after_update),S(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function Ce(e,t,n,o,r,s,i,c=[-1]){const l=K;Q(e);const a=e.$$={fragment:null,ctx:[],props:s,update:C,not_equal:r,bound:E(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(l?l.$$.context:[])),callbacks:E(),dirty:c,skip_bound:!1,root:t.target||l.$$.root};i&&i(a.root);let u=!1;if(a.ctx=n?n(e,t.props||{},((t,n,...o)=>{const s=o.length?o[0]:n;return a.ctx&&r(a.ctx[t],a.ctx[t]=s)&&(!a.skip_bound&&a.bound[t]&&a.bound[t](s),u&&function(e,t){-1===e.$$.dirty[0]&&(ne.push(e),le(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}(e,t)),n})):[],a.update(),u=!0,S(a.before_update),a.fragment=!!o&&o(a.ctx),t.target){if(t.hydrate){z=!0;const e=(d=t.target,Array.from(d.childNodes));a.fragment&&a.fragment.l(e),e.forEach(I)}else a.fragment&&a.fragment.c();t.intro&&$e(e.$$.fragment),ke(e,t.target,t.anchor,t.customElement),z=!1,pe()}var d;Q(l)}"function"==typeof HTMLElement&&(ye=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){const{on_mount:e}=this.$$;this.$$.on_disconnect=e.map(M).filter(L);for(const e in this.$$.slotted)this.appendChild(this.$$.slotted[e])}attributeChangedCallback(e,t,n){this[e]=n}disconnectedCallback(){S(this.$$.on_disconnect)}$destroy(){_e(this,1),this.$destroy=C}$on(e,t){if(!L(t))return C;const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){this.$$set&&!N(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}});class Me{$destroy(){_e(this,1),this.$destroy=C}$on(e,t){if(!L(t))return C;const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){this.$$set&&!N(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function Ee(e){let t,n,o,r,s,i,c,l,a,u,d,p,f,m,h,g,v,$,w,b,y;return{c(){t=T("div"),n=T("form"),o=T("div"),r=T("div"),s=T("h5"),i=R("Login - "),c=R(e[0]),l=A(),a=T("div"),u=T("label"),u.textContent="Username",d=A(),p=T("input"),f=A(),m=T("div"),h=T("label"),h.textContent="Password",g=A(),v=T("input"),$=A(),w=T("button"),w.textContent="Login",W(s,"class","card-title"),W(u,"for","popup-username"),W(u,"class","form-label"),p.required=!0,W(p,"id","popup-username"),W(p,"placeholder","Username"),W(p,"class","form-control"),Y(p,"is-invalid",""===e[2].trim()),W(a,"class","mb-3"),W(h,"for","popup-password"),W(h,"class","form-label"),v.required=!0,W(v,"id","popup-password"),W(v,"placeholder","Password"),W(v,"class","form-control"),W(v,"type","password"),Y(v,"is-invalid",""===e[3]),W(m,"class","mb-3"),W(r,"class","card-body"),W(w,"class","btn btn-primary"),W(w,"type","submit"),W(o,"class","card shadow"),W(t,"class","vertical-horizontal-center")},m(x,k){j(x,t,k),V(t,n),V(n,o),V(o,r),V(r,s),V(s,i),V(s,c),V(r,l),V(r,a),V(a,u),V(a,d),V(a,p),X(p,e[2]),V(r,f),V(r,m),V(m,h),V(m,g),V(m,v),X(v,e[3]),V(o,$),V(o,w),b||(y=[B(p,"input",e[6]),B(v,"input",e[7]),B(n,"submit",H(D(e[4])))],b=!0)},p(e,t){1&t&&F(c,e[0]),4&t&&p.value!==e[2]&&X(p,e[2]),4&t&&Y(p,"is-invalid",""===e[2].trim()),8&t&&v.value!==e[3]&&X(v,e[3]),8&t&&Y(v,"is-invalid",""===e[3])},d(e){e&&I(t),b=!1,S(y)}}}function Se(e){let t,n=e[1]&&Ee(e);return{c(){n&&n.c(),t=q()},m(e,o){n&&n.m(e,o),j(e,t,o)},p(e,[o]){e[1]?n?n.p(e,o):(n=Ee(e),n.c(),n.m(t.parentNode,t)):n&&(n.d(1),n=null)},i:C,o:C,d(e){n&&n.d(e),e&&I(t)}}}function Le(e,t,n){let{title:o}=t,{moodle:r}=t;const s=ee();let i=!0,c=v()??"",l="";return e.$$set=e=>{"title"in e&&n(0,o=e.title),"moodle"in e&&n(5,r=e.moodle)},[o,i,c,l,async function(){if(n(2,c=c.trim()),c&&l){n(1,i=!1);try{const e=await r.login({username:c,password:l});s("login",e)}catch{n(1,i=!0)}}},r,function(){c=this.value,n(2,c)},function(){l=this.value,n(3,l)}]}const Ue=class extends Me{constructor(e){super(),Ce(this,e,Le,Se,U,{title:0,moodle:5})}};async function Ne(e){return new Promise((t=>{const n=GM_addStyle(".login-popup-userscript .vertical-horizontal-center{width:100%;height:100%;position:fixed;z-index:100000000;top:0;left:0;display:flex;align-items:center;justify-content:center;pointer-events:none}.login-popup-userscript .card{pointer-events:auto}"),o=document.createElement("div");o.className="login-popup-userscript",document.body.append(o);const r=new Ue({target:o,props:{title:e,moodle:this}});r.$on("login",(({detail:e})=>{r.$destroy(),n.remove(),o.remove(),t(e)}))}))}function Oe(e){let t,n,o,r,s;return{c(){t=T("a"),n=P("svg"),o=P("path"),W(o,"d","M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 014.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 01-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 011.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 012.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 012.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 011.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 01-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 018.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 001.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 00.52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 00-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 00-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 00-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 00-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 00.52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 001.255-.52l.094-.319zM8 5.754a2.246 2.246 0 100 4.492 2.246 2.246 0 000-4.492zM4.754 8a3.246 3.246 0 116.492 0 3.246 3.246 0 01-6.492 0z"),W(n,"fill","currentColor"),W(n,"class","icon svg-icon-gear"),W(n,"viewBox","0 0 16 16"),function(e,t,n,o){null==n?e.style.removeProperty(t):e.style.setProperty(t,n,o?"important":"")}(n,"margin-left","0.2em"),W(t,"href","/cleanMoodle"),W(t,"target","_blank"),W(t,"rel","noreferrer noopener")},m(i,c){j(i,t,c),V(t,n),V(n,o),r||(s=B(t,"click",H(e[0])),r=!0)},p:C,i:C,o:C,d(e){e&&I(t),r=!1,s()}}}function Ge(e){return[function(t){te.call(this,e,t)}]}const ze=class extends Me{constructor(e){super(),Ce(this,e,Ge,Oe,U,{})}},Ve=()=>GM_getValue("overrides")??{},je=e=>Ve()[e],Ie=(e,t)=>{const n=Ve();n[e]=t,(e=>{GM_setValue("overrides",e)})(n)},Te=e=>{const t=Ve();return delete t[e],GM_setValue("overrides",t),t};_.extend(d).extend((e=>{e.prototype.popupLogin=c(Ne)}));const Pe=new _,Re=e=>r()?.querySelector(`a[href$="/course/view.php?id=${e}"]`);function Ae(){const e=r();if(!e)return;const t=[...e.querySelectorAll(":scope > li.type_course")];t.sort(((e,t)=>{const n=e.firstElementChild?.textContent,o=t.firstElementChild?.textContent;if(!n||!o)throw new Error("aText or bText was undefined");return s.compare(n.trim(),o.trim())})),e.prepend(...t)}function qe(e,t){const n=Re(e);n?(function(e,t){const n=e.closest("li.type_course"),o=n?.classList;o&&"true"!==n.getAttribute("aria-expanded")&&(o.toggle("hide",!t),o.toggle("hidden",!t))}(n,!1!==t),function(e,t){const n=t??e.title,o=e.lastChild;o?.nodeType===Node.TEXT_NODE&&(o.textContent=n)}(n,"string"==typeof t?t:void 0)):async function(e){let t;try{t=await Pe.getCourses(!0)}catch{await Pe.popupLogin("Clean Moodle",!0),t=await Pe.getCourses(!0)}t.some((t=>String(t.id)===e))||(Te(e),alert(`You appear to not be in the course with the id "${e}" anymore.\nThe course will not be checked for anymore`))}(e)}function Be(){if(!r())return;const e=Ve();for(const[t,n]of Object.entries(e))qe(t,n);Ae()}function De(e){let t,n,o,r,s,i,c,l,a,u,d;return{c(){t=T("form"),n=T("div"),o=T("h5"),o.textContent="Login",r=A(),s=T("input"),i=A(),c=T("input"),l=A(),a=T("button"),a.textContent="Login",W(s,"placeholder","Username"),W(c,"placeholder","Password"),W(c,"type","password"),W(a,"class","btn-save"),W(a,"type","submit"),W(n,"class","replace-flex-input")},m(p,f){j(p,t,f),V(t,n),V(n,o),V(n,r),V(n,s),X(s,e[0]),V(n,i),V(n,c),X(c,e[1]),V(n,l),V(n,a),u||(d=[B(s,"input",e[3]),B(c,"input",e[4]),B(t,"submit",D(e[2]))],u=!0)},p(e,[t]){1&t&&s.value!==e[0]&&X(s,e[0]),2&t&&c.value!==e[1]&&X(c,e[1])},i:C,o:C,d(e){e&&I(t),u=!1,S(d)}}}function He(e,t,n){const o=ee();let r=v()??"",s="";return[r,s,function(){r&&s&&o("login",{username:r,password:s})},function(){r=this.value,n(0,r)},function(){s=this.value,n(1,s)}]}const We=class extends Me{constructor(e){super(),Ce(this,e,He,De,U,{})}};function Fe(e){let t,n,o,r,s,i,c,l,a,u,d,p,f,m,h,g,v,$=void 0===e[0]?"Select course to the left":`Selected: ${e[0].courseName}`;return{c(){t=T("div"),n=T("div"),o=T("div"),o.textContent="Rename course",r=A(),s=T("form"),i=T("div"),c=R($),l=A(),a=T("input"),p=A(),f=T("button"),m=R("Save"),W(o,"class","section-title"),W(a,"class","replace-input"),W(a,"placeholder",u=void 0===e[0]?"Select course to the left":`Leave empty to reset to ${e[0].courseName}`),a.disabled=d=void 0===e[0],a.value=e[2],W(f,"class","btn-save"),f.disabled=h=void 0===e[0],W(f,"type","submit"),W(s,"class","replace-flex-inputs"),W(n,"class","main"),W(t,"class","outer-main")},m(u,d){j(u,t,d),V(t,n),V(n,o),V(n,r),V(n,s),V(s,i),V(i,c),V(s,l),V(s,a),e[4](a),V(s,p),V(s,f),V(f,m),g||(v=[B(a,"input",e[5]),B(s,"submit",D(e[3]))],g=!0)},p(e,[t]){1&t&&$!==($=void 0===e[0]?"Select course to the left":`Selected: ${e[0].courseName}`)&&F(c,$),1&t&&u!==(u=void 0===e[0]?"Select course to the left":`Leave empty to reset to ${e[0].courseName}`)&&W(a,"placeholder",u),1&t&&d!==(d=void 0===e[0])&&(a.disabled=d),4&t&&a.value!==e[2]&&(a.value=e[2]),1&t&&h!==(h=void 0===e[0])&&(f.disabled=h)},i:C,o:C,d(n){n&&I(t),e[4](null),g=!1,S(v)}}}function Xe(e,t,n){let o,{selected:r}=t;const s=ee();let i,c;var l;l=()=>{i&&c!==r&&(c=r,i.focus(),i.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}))},Z().$$.after_update.push(l);return e.$$set=e=>{"selected"in e&&n(0,r=e.selected)},e.$$.update=()=>{1&e.$$.dirty&&n(2,o=(r?.value||r?.courseName)??"")},[r,i,o,function(){void 0!==r&&s("input",o)},function(e){oe[e?"unshift":"push"]((()=>{i=e,n(1,i)}))},e=>{n(2,o=e.currentTarget.value)}]}const Ye=class extends Me{constructor(e){super(),Ce(this,e,Xe,Fe,U,{selected:0})}};function Je(e){let t,n;return{c(){t=P("svg"),n=P("path"),W(n,"d","m9 11-4 4 4 4m-4-4h11a4 4 0 0 0 0-8h-1"),W(t,"fill","none"),W(t,"stroke","currentColor"),W(t,"stroke-linecap","round"),W(t,"stroke-linejoin","round"),W(t,"stroke-width","2"),W(t,"class","icon svg-icon-arrow-back"),W(t,"viewBox","0 0 24 24")},m(e,o){j(e,t,o),V(t,n)},p:C,i:C,o:C,d(e){e&&I(t)}}}const Ke=class extends Me{constructor(e){super(),Ce(this,e,null,Je,U,{})}};function Qe(e){let t,n;return{c(){t=P("svg"),n=P("path"),W(n,"d","m5 12 5 5L20 7"),W(t,"fill","none"),W(t,"stroke","currentColor"),W(t,"stroke-linecap","round"),W(t,"stroke-linejoin","round"),W(t,"stroke-width","2"),W(t,"class","icon svg-icon-check"),W(t,"viewBox","0 0 24 24")},m(e,o){j(e,t,o),V(t,n)},p:C,i:C,o:C,d(e){e&&I(t)}}}const Ze=class extends Me{constructor(e){super(),Ce(this,e,null,Qe,U,{})}};function et(e){let t,n;return{c(){t=P("svg"),n=P("path"),W(n,"d","M18 6 6 18M6 6l12 12"),W(t,"fill","none"),W(t,"stroke","currentColor"),W(t,"stroke-linecap","round"),W(t,"stroke-linejoin","round"),W(t,"stroke-width","2"),W(t,"class","icon svg-icon-x"),W(t,"viewBox","0 0 24 24")},m(e,o){j(e,t,o),V(t,n)},p:C,i:C,o:C,d(e){e&&I(t)}}}const tt=class extends Me{constructor(e){super(),Ce(this,e,null,et,U,{})}},nt=e=>e.sort((({courseName:e,value:t},{courseName:n,value:o})=>{const r=ot(t,e).trim(),i=ot(o,n).trim();return s.compare(r,i)})),ot=(e,t)=>"string"==typeof e?e:t;function rt(e){let t,n;return t=new Ze({}),{c(){xe(t.$$.fragment)},m(e,o){ke(t,e,o),n=!0},i(e){n||($e(t.$$.fragment,e),n=!0)},o(e){we(t.$$.fragment,e),n=!1},d(e){_e(t,e)}}}function st(e){let t,n;return t=new tt({}),{c(){xe(t.$$.fragment)},m(e,o){ke(t,e,o),n=!0},i(e){n||($e(t.$$.fragment,e),n=!0)},o(e){we(t.$$.fragment,e),n=!1},d(e){_e(t,e)}}}function it(e){let t,n,o,r,s;return n=new Ke({}),{c(){t=T("span"),xe(n.$$.fragment)},m(i,c){j(i,t,c),ke(n,t,null),o=!0,r||(s=[B(t,"click",H(e[2])),B(t,"keydown",H(e[7]))],r=!0)},p:C,i(e){o||($e(n.$$.fragment,e),o=!0)},o(e){we(n.$$.fragment,e),o=!1},d(e){e&&I(t),_e(n),r=!1,S(s)}}}function ct(e){let t,n,o,r,s,i,c,l,a,u,d=ot(e[0],e[1])+"";const p=[st,rt],f=[];function m(e,t){return!1===e[0]?0:1}o=m(e),r=f[o]=p[o](e);let h="string"==typeof e[0]&&it(e);return{c(){t=T("div"),n=T("span"),r.c(),s=A(),i=R(d),c=A(),h&&h.c(),W(t,"class","row"),W(t,"title",e[1]),Y(t,"removed",!1===e[0])},m(r,d){j(r,t,d),V(t,n),f[o].m(n,null),V(t,s),V(t,i),V(t,c),h&&h.m(t,null),l=!0,a||(u=[B(n,"click",H(e[3])),B(n,"keydown",H(e[6])),B(t,"click",e[4]),B(t,"keydown",H(e[8]))],a=!0)},p(e,[s]){let c=o;o=m(e),o!==c&&(ge(),we(f[c],1,1,(()=>{f[c]=null})),ve(),r=f[o],r||(r=f[o]=p[o](e),r.c()),$e(r,1),r.m(n,null)),(!l||3&s)&&d!==(d=ot(e[0],e[1])+"")&&F(i,d),"string"==typeof e[0]?h?(h.p(e,s),1&s&&$e(h,1)):(h=it(e),h.c(),$e(h,1),h.m(t,null)):h&&(ge(),we(h,1,1,(()=>{h=null})),ve()),(!l||2&s)&&W(t,"title",e[1]),(!l||1&s)&&Y(t,"removed",!1===e[0])},i(e){l||($e(r),$e(h),l=!0)},o(e){we(r),we(h),l=!1},d(e){e&&I(t),f[o].d(),h&&h.d(),a=!1,S(u)}}}function lt(e,t,n){let o,r,s,{course:i}=t;const c=ee();function l(){c("reset",s)}function a(){c("toggle",s)}function u(){c("select",i)}return e.$$set=e=>{"course"in e&&n(5,i=e.course)},e.$$.update=()=>{32&e.$$.dirty&&n(1,({courseName:o,value:r,courseId:s}=i),o,(n(0,r),n(5,i)))},[r,o,l,a,u,i,e=>{"Enter"===e.key&&a()},e=>{"Enter"===e.key&&l()},e=>{"Enter"===e.key&&u()}]}const at=class extends Me{constructor(e){super(),Ce(this,e,lt,ct,U,{course:5})}};function ut(e,t,n){const o=e.slice();return o[5]=t[n],o}function dt(e){let t;return{c(){t=T("div"),t.textContent="Loading courses..."},m(e,n){j(e,t,n)},d(e){e&&I(t)}}}function pt(e,t){let n,o,r;return o=new at({props:{course:t[5]}}),o.$on("select",t[2]),o.$on("toggle",t[3]),o.$on("reset",t[4]),{key:e,first:null,c(){n=q(),xe(o.$$.fragment),this.first=n},m(e,t){j(e,n,t),ke(o,e,t),r=!0},p(e,n){t=e;const r={};1&n&&(r.course=t[5]),o.$set(r)},i(e){r||($e(o.$$.fragment,e),r=!0)},o(e){we(o.$$.fragment,e),r=!1},d(e){e&&I(n),_e(o,e)}}}function ft(e){let t,n,o,r,s=[],i=new Map,c=e[1]&&dt(),l=e[0];const a=e=>e[5].courseId;for(let t=0;t<l.length;t+=1){let n=ut(e,l,t),o=a(n);i.set(o,s[t]=pt(o,n))}return{c(){t=T("div"),n=T("div"),c&&c.c(),o=A();for(let e=0;e<s.length;e+=1)s[e].c();W(n,"class","sidebar"),W(t,"class","outer-sidebar")},m(e,i){j(e,t,i),V(t,n),c&&c.m(n,null),V(n,o);for(let e=0;e<s.length;e+=1)s[e]&&s[e].m(n,null);r=!0},p(e,[t]){e[1]?c||(c=dt(),c.c(),c.m(n,o)):c&&(c.d(1),c=null),1&t&&(l=e[0],ge(),s=function(e,t,n,o,r,s,i,c,l,a,u,d){let p=e.length,f=s.length,m=p;const h={};for(;m--;)h[e[m].key]=m;const g=[],v=new Map,$=new Map,w=[];for(m=f;m--;){const e=d(r,s,m),c=n(e);let l=i.get(c);l?o&&w.push((()=>l.p(e,t))):(l=a(c,e),l.c()),v.set(c,g[m]=l),c in h&&$.set(c,Math.abs(m-h[c]))}const b=new Set,y=new Set;function x(e){$e(e,1),e.m(c,u),i.set(e.key,e),u=e.first,f--}for(;p&&f;){const t=g[f-1],n=e[p-1],o=t.key,r=n.key;t===n?(u=t.first,p--,f--):v.has(r)?!i.has(o)||b.has(o)?x(t):y.has(r)?p--:$.get(o)>$.get(r)?(y.add(o),x(t)):(b.add(r),p--):(l(n,i),p--)}for(;p--;){const t=e[p];v.has(t.key)||l(t,i)}for(;f;)x(g[f-1]);return S(w),g}(s,t,a,1,e,l,i,n,be,pt,null,ut),ve())},i(e){if(!r){for(let e=0;e<l.length;e+=1)$e(s[e]);r=!0}},o(e){for(let e=0;e<s.length;e+=1)we(s[e]);r=!1},d(e){e&&I(t),c&&c.d();for(let e=0;e<s.length;e+=1)s[e].d()}}}function mt(e,t,n){let{courses:o}=t,{loadingCourses:r}=t;return e.$$set=e=>{"courses"in e&&n(0,o=e.courses),"loadingCourses"in e&&n(1,r=e.loadingCourses)},[o,r,function(t){te.call(this,e,t)},function(t){te.call(this,e,t)},function(t){te.call(this,e,t)}]}const ht=class extends Me{constructor(e){super(),Ce(this,e,mt,ft,U,{courses:0,loadingCourses:1})}};function gt(e){let t,n;return t=new Ye({props:{selected:e[2]}}),t.$on("input",e[5]),{c(){xe(t.$$.fragment)},m(e,o){ke(t,e,o),n=!0},p(e,n){const o={};4&n&&(o.selected=e[2]),t.$set(o)},i(e){n||($e(t.$$.fragment,e),n=!0)},o(e){we(t.$$.fragment,e),n=!1},d(e){_e(t,e)}}}function vt(e){let t,n;return t=new We({}),t.$on("login",e[4]),{c(){xe(t.$$.fragment)},m(e,o){ke(t,e,o),n=!0},p:C,i(e){n||($e(t.$$.fragment,e),n=!0)},o(e){we(t.$$.fragment,e),n=!1},d(e){_e(t,e)}}}function $t(e){let t,n,o,r,s,i,c,l;r=new ht({props:{courses:e[0],loadingCourses:e[1]}}),r.$on("toggle",e[6]),r.$on("select",e[7]),r.$on("reset",e[8]);const a=[vt,gt],u=[];function d(e,t){return e[3]?0:1}return i=d(e),c=u[i]=a[i](e),{c(){t=T("link"),n=A(),o=T("div"),xe(r.$$.fragment),s=A(),c.c(),W(t,"rel","shortcut icon"),W(t,"href","/theme/image.php/classic/theme/1588340020/favicon"),document.title="Clean Moodle Setup",W(o,"class","container")},m(e,c){V(document.head,t),j(e,n,c),j(e,o,c),ke(r,o,null),V(o,s),u[i].m(o,null),l=!0},p(e,[t]){const n={};1&t&&(n.courses=e[0]),2&t&&(n.loadingCourses=e[1]),r.$set(n);let s=i;i=d(e),i===s?u[i].p(e,t):(ge(),we(u[s],1,1,(()=>{u[s]=null})),ve(),c=u[i],c?c.p(e,t):(c=u[i]=a[i](e),c.c()),$e(c,1),c.m(o,null))},i(e){l||($e(r.$$.fragment,e),$e(c),l=!0)},o(e){we(r.$$.fragment,e),we(c),l=!1},d(e){I(t),e&&I(n),e&&I(o),_e(r),u[i].d()}}}function wt(e,t,n){let o,r=[],s=!0,i=!1;_.extend(d);const c=new _;async function l(){let e;try{e=await c.getCourses(!0)}catch{return void a()}const t=[];for(const{id:n,name:o}of e)t.push({courseName:o,courseId:n,value:je(n)});nt(t),n(0,r=t),n(1,s=!1)}function a(){c.logout(),n(3,i=!0)}function u(e,t){n(0,r=r.map((n=>n.courseId===e?t(n):n))),n(0,r=nt(r))}return c.login().then(l,a),[r,s,o,i,async function(e){const t=e.detail.username.trim(),{password:o}=e.detail;if(t&&o)try{await c.login({username:t,password:o}),n(3,i=!1),l()}catch{a()}},function(e){const t=o.courseId,r=e.detail.trim();u(t,(e=>e.courseName===r||""===r?(Te(t),{...e,value:void 0}):(Ie(t,r),{...e,value:r}))),n(2,o=void 0)},function(e){const t=e.detail;o?.courseId===t&&n(2,o=void 0),u(t,(e=>(!1===e.value?Te(t):Ie(t,!1),{...e,value:!1===e.value&&void 0})))},function(e){n(2,o=e.detail)},function(e){u(e.detail,(e=>({...e,value:void 0}))),Te(e.detail)}]}const bt=class extends Me{constructor(e){super(),Ce(this,e,wt,$t,U,{})}},yt=()=>{const{head:e,body:t}=document;t.replaceChildren(),e.replaceChildren(),history.replaceState({},"","/cleanMoodle"),GM_addStyle('*,::after,::before{box-sizing:border-box}blockquote,body,dd,dl,figure,h1,h2,h3,h4,p{margin:0}ol[role=list],ul[role=list]{list-style:none}html:focus-within{scroll-behavior:smooth}body{min-height:100vh;text-rendering:optimizeSpeed;line-height:1.5;padding:1%}a:not([class]){text-decoration-skip-ink:auto}img,picture{max-width:100%;display:block}button,input,select,textarea{font:inherit}@media (prefers-reduced-motion:reduce){html:focus-within{scroll-behavior:auto}*,::after,::before{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}html{background:#202020;color:#ccc;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";font-size:.9375rem;font-weight:400;line-height:1.5;user-select:none}@media (min-width:0px){:root{--sidebar-flex: 0 0 100%;--main-flex: 0 0 100%;--padding-horizontal: 0;--padding-vertical: 0.5%}}@media (min-width:768px){:root{--sidebar-flex: 0 0 32%;--main-flex: 0 0 68%;--padding-horizontal: 0.5%;--padding-vertical: 0}}@media (min-width:992px){:root{--sidebar-flex: 0 0 25%;--main-flex: 0 0 75%}}@media (min-width:1200px){:root{--sidebar-flex: 0 0 20%;--main-flex: 0 0 80%}}.outer-sidebar{flex:var(--sidebar-flex);padding-right:var(--padding-horizontal);padding-bottom:var(--padding-vertical)}.outer-sidebar .sidebar{display:flex;flex-direction:column;padding:10px 15px;border:1.5px solid #343434;border-radius:4px;background-color:#141414}.outer-sidebar .row{cursor:pointer;display:flex;align-items:flex-start;color:#198754}.outer-sidebar .row:hover{text-decoration:underline}.outer-sidebar .row.removed{color:#dc3545}.btn-save:not([disabled]){cursor:pointer}.icon{height:1.5em;width:1.5em}.section-title{font-size:30px;font-weight:300;-webkit-font-smoothing:antialiased}.svg-icon-check{color:#198754}.svg-icon-x{color:#dc3545}.outer-main{flex:var(--main-flex);padding-left:var(--padding-horizontal);padding-top:var(--padding-vertical)}.main{padding:3% 2% 5%;border:1.5px solid #343434;border-radius:4px;background-color:#141414}.replace-flex-inputs{display:flex;flex-direction:column;gap:10px;margin-top:10px}.replace-flex-inputs *{align-self:flex-start}button,input{display:flex;align-items:center;padding:.375rem .75rem;font-size:.9375rem;font-weight:400;line-height:1.5;color:#495057;white-space:nowrap;background-color:#e9ecef;border:1px solid #8f959e;border-radius:.25rem;font-family:inherit}button{text-align:center;background-color:#1177d1;color:#ccc;margin-top:10px}.container{display:flex;flex-direction:row;flex-wrap:wrap;width:100%;height:max-content}'),new bt({target:t})};if(
// ==UserScript==
// @name      Clean Moodle
// @version   4.0.3
// @author    lusc
// @match     *://moodle.*/*
// @match     *://moodle*.*/*
// @updateURL https://github.com/melusc/moodle_userscripts/raw/userscript-out/Clean%20Moodle/clean-moodle.user.js
// @grant     GM_setValue
// @grant     GM_getValue
// @grant     GM_deleteValue
// @grant     GM_addStyle
// @grant     GM_registerMenuCommand
// @grant     GM_addValueChangeListener
// @run-at    document-start
// @license   MIT
// ==/UserScript==
(t=>{try{(t=>{const r=GM_getValue(o),s=void 0===r?[-1,-1,-1]:e(r),i=Object.entries(t).map((([t,n])=>[e(t),n])).sort((([e],[t])=>n(e,t)));for(const[e,t]of i)n(s,e)<0&&t();GM_setValue(o,GM_info.script.version)})(t)}catch(e){console.error("Upgrading threw %o. Failing silently.",e)}})({"1.4.0":()=>{GM_deleteValue("lastValidatedToken"),GM_deleteValue("password")},"1.5.0"(){const e=GM_getValue("remove")??[],t=GM_getValue("replace")??{};for(const n of e)t[n]=!1;GM_setValue("overrides",t),GM_deleteValue("remove"),GM_deleteValue("replace")}}),"https:"!==location.protocol&&(location.protocol="https:"),!/^\/customicons/i.test(location.pathname)){const e=!/^\/cleanmoodle/i.test(location.pathname);xt=e?function(){const e=r();if(GM_registerMenuCommand("Open settings",(()=>{open("/cleanMoodle")})),e){Be(),GM_addValueChangeListener("overrides",((e,t,n,o)=>{if(o)if(t){for(const e of Object.keys(t))e in n||qe(e,void 0);for(const[e,o]of Object.entries(n))o!==t[e]&&qe(e,o);Ae()}else Be()}));const t=e.previousSibling;if(t instanceof HTMLParagraphElement){const e=document.createElement("span");t.append(e),new ze({target:e})}}}:yt,"interactive"!==document.readyState&&"complete"!==document.readyState?document.addEventListener("DOMContentLoaded",xt,{once:!0}):xt()}var xt})();