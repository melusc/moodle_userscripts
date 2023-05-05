/*! For license information please see clean-moodle.user.js.LICENSE.txt */
(()=>{"use strict";const e=e=>{if(!/^\d+\.\d+\.\d+$/.test(e))throw new Error(`Invalid version: ${e}.`);const[t,n,o]=e.split(".").map(Number);return[t,n,o]},t=(e,t)=>e-t,n=(e,n)=>t(e[0],n[0])||t(e[1],n[1])||t(e[2],n[2]),o="lastUpgraded",r=()=>document.querySelector('#page-content li.type_system.depth_2 > ul[role="group"]'),s=new Intl.Collator(void 0,{sensitivity:"base",numeric:!0}),i=Symbol("getUserId");async function c(){const e=this._readCache(i);if(void 0!==e)return e;const t=await this.login(),n=new URLSearchParams({wsfunction:"core_webservice_get_site_info",wstoken:t}),o=await fetch(this.resolveUrl("/webservice/rest/server.php?moodlewsrestformat=json"),{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:n.toString()});if(!o.ok)throw new Error(`Response was not ok: ${o.status}`);const r=await o.json();if("exception"in r)throw this.logout(),new Error("token was undefined");return this._writeCache(i,r.userid)}const l=e=>{e.prototype.getUserId=c},a=Symbol("getCourses");async function u(e=!1){const t=this._readCache(a);if(t&&!e)return t;const n=await this.getUserId(),o=await this.login(),r=new URLSearchParams({wstoken:o,moodlewsrestformat:"json",wsfunction:"core_enrol_get_users_courses",userid:String(n),returnusercount:"0"}),s=await fetch(this.resolveUrl("/webservice/rest/server.php"),{method:"POST",body:r.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}});if(!s.ok)throw new Error(`Response was not ok: ${s.status}`);const i=await s.json();if("exception"in i)throw this.logout(),new Error("Token was invalid");const c=[];for(const{id:e,fullname:t}of i)c.push({id:e,name:t});return this._writeCache(a,c)}const d=e=>{e.prototype.getCourses=u,e.extend(l)};var p;!function(e){e.username="username",e.token="token"}(p||(p={}));const f=e=>[()=>GM_getValue(e),t=>{GM_setValue(e,t)},()=>{GM_deleteValue(e)}],[m,h,g]=f(p.token),[w,v,$]=f(p.username);class b extends Error{constructor(){super("No credentials provided.")}}class y extends Error{constructor(){super("Invalid credentials.")}}class x extends Error{constructor(e){super(`${e} not included`)}}let k=new URL("http://localhost/");"undefined"!=typeof location?k=new URL("/",location.href):"undefined"!=typeof process&&"string"==typeof process.env.MOODLE_BASE_URL&&(k=new URL(process.env.MOODLE_BASE_URL));class _{static extend(e){return e(_),_}baseUrl=k;credentials={token:m(),username:w()};#e=new Map;resolveUrl=e=>new URL(e,this.baseUrl);_readCache(e){return this.#e.get(e)}_writeCache(e,t){return this.#e.set(e,t),t}async login(e){const{credentials:t}=this;if(e&&(t.username=e.username,t.password=e.password,v(e.username)),t.token)return t.token;const{username:n,password:o}=t;if(!n||!o)throw new b;const r=new URLSearchParams({username:n,password:o,service:"moodle_mobile_app"}),s=await fetch(this.resolveUrl("/login/token.php"),{method:"POST",body:r.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}});if(!s.ok)throw new Error(`Response was not ok: ${s.status}`);const i=await s.json();if("errorcode"in i)throw this.logout(),new y;const{token:c}=i;return h(c),t.token=c,c}logout(){delete this.credentials.token,g(),delete this.credentials.password}async getCourses(e){throw new x("getCourses")}async getUserId(){throw new x("getUserId")}async popupLogin(e){throw new x("popupLogin")}async getCourseContent(e,t){throw new x("getCourseContent")}}function C(){}function E(e){return e()}function S(){return Object.create(null)}function M(e){e.forEach(E)}function L(e){return"function"==typeof e}function U(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function N(e){return 0===Object.keys(e).length}new Set;let G=!1;function j(e,t){e.appendChild(t)}function O(e,t,n){e.insertBefore(t,n||null)}function I(e){e.parentNode&&e.parentNode.removeChild(e)}function T(e){return document.createElement(e)}function V(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function z(e){return document.createTextNode(e)}function P(){return z(" ")}function R(){return z("")}function A(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function q(e){return function(t){return t.preventDefault(),e.call(this,t)}}function B(e){return function(t){return t.stopPropagation(),e.call(this,t)}}function D(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function H(e,t){t=""+t,e.data!==t&&(e.data=t)}function F(e,t){e.value=null==t?"":t}function X(e,t,n){e.classList[n?"add":"remove"](t)}function Y(e,t,{bubbles:n=!1,cancelable:o=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(e,n,o,t),r}new Map;let J;function K(e){J=e}function Q(){if(!J)throw new Error("Function called outside component initialization");return J}function W(){const e=Q();return(t,n,{cancelable:o=!1}={})=>{const r=e.$$.callbacks[t];if(r){const s=Y(t,n,{cancelable:o});return r.slice().forEach((t=>{t.call(e,s)})),!s.defaultPrevented}return!0}}function Z(e,t){const n=e.$$.callbacks[t.type];n&&n.slice().forEach((e=>e.call(this,t)))}const ee=[],te=[];let ne=[];const oe=[],re=Promise.resolve();let se=!1;function ie(){se||(se=!0,re.then(ue))}function ce(e){ne.push(e)}const le=new Set;let ae=0;function ue(){if(0!==ae)return;const e=J;do{try{for(;ae<ee.length;){const e=ee[ae];ae++,K(e),de(e.$$)}}catch(e){throw ee.length=0,ae=0,e}for(K(null),ee.length=0,ae=0;te.length;)te.pop()();for(let e=0;e<ne.length;e+=1){const t=ne[e];le.has(t)||(le.add(t),t())}ne.length=0}while(ee.length);for(;oe.length;)oe.pop()();se=!1,le.clear(),K(e)}function de(e){if(null!==e.fragment){e.update(),M(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(ce)}}const pe=new Set;let fe;function me(){fe={r:0,c:[],p:fe}}function he(){fe.r||M(fe.c),fe=fe.p}function ge(e,t){e&&e.i&&(pe.delete(e),e.i(t))}function we(e,t,n,o){if(e&&e.o){if(pe.has(e))return;pe.add(e),fe.c.push((()=>{pe.delete(e),o&&(n&&e.d(1),o())})),e.o(t)}else o&&o()}"undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:global;function ve(e,t){we(e,1,1,(()=>{t.delete(e.key)}))}new Set(["allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","hidden","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"]);let $e;function be(e){e&&e.c()}function ye(e,t,n,o){const{fragment:r,after_update:s}=e.$$;r&&r.m(t,n),o||ce((()=>{const t=e.$$.on_mount.map(E).filter(L);e.$$.on_destroy?e.$$.on_destroy.push(...t):M(t),e.$$.on_mount=[]})),s.forEach(ce)}function xe(e,t){const n=e.$$;null!==n.fragment&&(!function(e){const t=[],n=[];ne.forEach((o=>-1===e.indexOf(o)?t.push(o):n.push(o))),n.forEach((e=>e())),ne=t}(n.after_update),M(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function ke(e,t,n,o,r,s,i,c=[-1]){const l=J;K(e);const a=e.$$={fragment:null,ctx:[],props:s,update:C,not_equal:r,bound:S(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(l?l.$$.context:[])),callbacks:S(),dirty:c,skip_bound:!1,root:t.target||l.$$.root};i&&i(a.root);let u=!1;if(a.ctx=n?n(e,t.props||{},((t,n,...o)=>{const s=o.length?o[0]:n;return a.ctx&&r(a.ctx[t],a.ctx[t]=s)&&(!a.skip_bound&&a.bound[t]&&a.bound[t](s),u&&function(e,t){-1===e.$$.dirty[0]&&(ee.push(e),ie(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}(e,t)),n})):[],a.update(),u=!0,M(a.before_update),a.fragment=!!o&&o(a.ctx),t.target){if(t.hydrate){G=!0;const e=(d=t.target,Array.from(d.childNodes));a.fragment&&a.fragment.l(e),e.forEach(I)}else a.fragment&&a.fragment.c();t.intro&&ge(e.$$.fragment),ye(e,t.target,t.anchor,t.customElement),G=!1,ue()}var d;K(l)}"function"==typeof HTMLElement&&($e=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){const{on_mount:e}=this.$$;this.$$.on_disconnect=e.map(E).filter(L);for(const e in this.$$.slotted)this.appendChild(this.$$.slotted[e])}attributeChangedCallback(e,t,n){this[e]=n}disconnectedCallback(){M(this.$$.on_disconnect)}$destroy(){xe(this,1),this.$destroy=C}$on(e,t){if(!L(t))return C;const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){this.$$set&&!N(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}});class _e{$destroy(){xe(this,1),this.$destroy=C}$on(e,t){if(!L(t))return C;const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){this.$$set&&!N(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function Ce(e){let t,n,o,r,s,i,c,l,a,u,d,p,f,m,h,g,w,v,$,b,y;return{c(){t=T("div"),n=T("form"),o=T("div"),r=T("div"),s=T("h5"),i=z("Login - "),c=z(e[0]),l=P(),a=T("div"),u=T("label"),u.textContent="Username",d=P(),p=T("input"),f=P(),m=T("div"),h=T("label"),h.textContent="Password",g=P(),w=T("input"),v=P(),$=T("button"),$.textContent="Login",D(s,"class","card-title"),D(u,"for","popup-username"),D(u,"class","form-label"),p.required=!0,D(p,"id","popup-username"),D(p,"placeholder","Username"),D(p,"class","form-control"),X(p,"is-invalid",""===e[2].trim()),D(a,"class","mb-3"),D(h,"for","popup-password"),D(h,"class","form-label"),w.required=!0,D(w,"id","popup-password"),D(w,"placeholder","Password"),D(w,"class","form-control"),D(w,"type","password"),X(w,"is-invalid",""===e[3]),D(m,"class","mb-3"),D(r,"class","card-body"),D($,"class","btn btn-primary"),D($,"type","submit"),D(o,"class","card shadow"),D(t,"class","vertical-horizontal-center")},m(x,k){O(x,t,k),j(t,n),j(n,o),j(o,r),j(r,s),j(s,i),j(s,c),j(r,l),j(r,a),j(a,u),j(a,d),j(a,p),F(p,e[2]),j(r,f),j(r,m),j(m,h),j(m,g),j(m,w),F(w,e[3]),j(o,v),j(o,$),b||(y=[A(p,"input",e[6]),A(w,"input",e[7]),A(n,"submit",B(q(e[4])))],b=!0)},p(e,t){1&t&&H(c,e[0]),4&t&&p.value!==e[2]&&F(p,e[2]),4&t&&X(p,"is-invalid",""===e[2].trim()),8&t&&w.value!==e[3]&&F(w,e[3]),8&t&&X(w,"is-invalid",""===e[3])},d(e){e&&I(t),b=!1,M(y)}}}function Ee(e){let t,n=e[1]&&Ce(e);return{c(){n&&n.c(),t=R()},m(e,o){n&&n.m(e,o),O(e,t,o)},p(e,[o]){e[1]?n?n.p(e,o):(n=Ce(e),n.c(),n.m(t.parentNode,t)):n&&(n.d(1),n=null)},i:C,o:C,d(e){n&&n.d(e),e&&I(t)}}}function Se(e,t,n){let{title:o}=t,{moodle:r}=t;const s=W();let i=!0,c=w()??"",l="";return e.$$set=e=>{"title"in e&&n(0,o=e.title),"moodle"in e&&n(5,r=e.moodle)},[o,i,c,l,async function(){if(n(2,c=c.trim()),c&&l){n(1,i=!1);try{const e=await r.login({username:c,password:l});s("login",e)}catch{n(1,i=!0)}}},r,function(){c=this.value,n(2,c)},function(){l=this.value,n(3,l)}]}const Me=class extends _e{constructor(e){super(),ke(this,e,Se,Ee,U,{title:0,moodle:5})}};async function Le(e){return new Promise((t=>{const n=GM_addStyle(".login-popup-userscript .vertical-horizontal-center{width:100%;height:100%;position:fixed;z-index:100000000;top:0;left:0;display:flex;align-items:center;justify-content:center;pointer-events:none}.login-popup-userscript .card{pointer-events:auto}"),o=document.createElement("div");o.className="login-popup-userscript",document.body.append(o);const r=new Me({target:o,props:{title:e,moodle:this}});r.$on("login",(({detail:e})=>{r.$destroy(),n.remove(),o.remove(),t(e)}))}))}function Ue(e){let t,n,o,r,s;return{c(){t=T("a"),n=V("svg"),o=V("path"),D(o,"d","M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 014.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 01-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 011.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 012.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 012.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 011.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 01-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 018.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 001.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 00.52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 00-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 00-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 00-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 00-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 00.52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 001.255-.52l.094-.319zM8 5.754a2.246 2.246 0 100 4.492 2.246 2.246 0 000-4.492zM4.754 8a3.246 3.246 0 116.492 0 3.246 3.246 0 01-6.492 0z"),D(n,"fill","currentColor"),D(n,"class","icon svg-icon-gear"),D(n,"viewBox","0 0 16 16"),function(e,t,n,o){null===n?e.style.removeProperty(t):e.style.setProperty(t,n,o?"important":"")}(n,"margin-left","0.2em"),D(t,"href","/cleanMoodle"),D(t,"target","_blank"),D(t,"rel","noreferrer noopener")},m(i,c){O(i,t,c),j(t,n),j(n,o),r||(s=A(t,"click",B(e[0])),r=!0)},p:C,i:C,o:C,d(e){e&&I(t),r=!1,s()}}}function Ne(e){return[function(t){Z.call(this,e,t)}]}const Ge=class extends _e{constructor(e){super(),ke(this,e,Ne,Ue,U,{})}},je=()=>GM_getValue("overrides")??{},Oe=e=>je()[e],Ie=(e,t)=>{const n=je();n[e]=t,(e=>{GM_setValue("overrides",e)})(n)},Te=e=>{const t=je();return delete t[e],GM_setValue("overrides",t),t};_.extend(d).extend((e=>{e.prototype.popupLogin=Le}));const Ve=new _,ze=e=>r()?.querySelector(`a[href$="/course/view.php?id=${e}"]`);let Pe;function Re(){const e=r();if(!e)return;const t=[...e.querySelectorAll(":scope > li.type_course")];t.sort(((e,t)=>{const n=e.firstElementChild?.textContent,o=t.firstElementChild?.textContent;if(!n||!o)throw new Error("aText or bText was undefined");return s.compare(n.trim(),o.trim())})),e.prepend(...t)}function Ae(e,t){const n=ze(e);n?(function(e,t){const n=e.closest("li.type_course"),o=n?.classList;o&&"true"!==n.getAttribute("aria-expanded")&&(o.toggle("hide",!t),o.toggle("hidden",!t))}(n,!1!==t),function(e,t){const n=t??e.title,o=e.lastChild;o?.nodeType===Node.TEXT_NODE&&(o.textContent=n)}(n,"string"==typeof t?t:void 0)):async function(e){let t;Pe&&await Pe;try{t=await Ve.getCourses()}catch{await(Pe=Ve.popupLogin("Clean Moodle")),t=await Ve.getCourses()}t.some((t=>String(t.id)===e))||(Te(e),alert(`You appear to not be in the course with the id "${e}" anymore.\nThe course will not be checked for anymore`))}(e)}function qe(){if(!r())return;const e=je();for(const[t,n]of Object.entries(e))Ae(t,n);Re()}function Be(e){let t,n,o,r,s,i,c,l,a,u,d;return{c(){t=T("form"),n=T("div"),o=T("h5"),o.textContent="Login",r=P(),s=T("input"),i=P(),c=T("input"),l=P(),a=T("button"),a.textContent="Login",D(s,"placeholder","Username"),D(c,"placeholder","Password"),D(c,"type","password"),D(a,"class","btn-save"),D(a,"type","submit"),D(n,"class","replace-flex-input")},m(p,f){O(p,t,f),j(t,n),j(n,o),j(n,r),j(n,s),F(s,e[0]),j(n,i),j(n,c),F(c,e[1]),j(n,l),j(n,a),u||(d=[A(s,"input",e[3]),A(c,"input",e[4]),A(t,"submit",q(e[2]))],u=!0)},p(e,[t]){1&t&&s.value!==e[0]&&F(s,e[0]),2&t&&c.value!==e[1]&&F(c,e[1])},i:C,o:C,d(e){e&&I(t),u=!1,M(d)}}}function De(e,t,n){const o=W();let r=w()??"",s="";return[r,s,function(){r&&s&&o("login",{username:r,password:s})},function(){r=this.value,n(0,r)},function(){s=this.value,n(1,s)}]}const He=class extends _e{constructor(e){super(),ke(this,e,De,Be,U,{})}};function Fe(e){let t,n,o,r,s,i,c,l,a,u,d,p,f,m,h,g,w,v=void 0===e[0]?"Select course to the left":`Selected: ${e[0].courseName}`;return{c(){t=T("div"),n=T("div"),o=T("div"),o.textContent="Rename course",r=P(),s=T("form"),i=T("div"),c=z(v),l=P(),a=T("input"),p=P(),f=T("button"),m=z("Save"),D(o,"class","section-title"),D(a,"class","replace-input"),D(a,"placeholder",u=void 0===e[0]?"Select course to the left":`Leave empty to reset to ${e[0].courseName}`),a.disabled=d=void 0===e[0],a.value=e[2],D(f,"class","btn-save"),f.disabled=h=void 0===e[0],D(f,"type","submit"),D(s,"class","replace-flex-inputs"),D(n,"class","main"),D(t,"class","outer-main")},m(u,d){O(u,t,d),j(t,n),j(n,o),j(n,r),j(n,s),j(s,i),j(i,c),j(s,l),j(s,a),e[4](a),j(s,p),j(s,f),j(f,m),g||(w=[A(a,"input",e[5]),A(s,"submit",q(e[3]))],g=!0)},p(e,[t]){1&t&&v!==(v=void 0===e[0]?"Select course to the left":`Selected: ${e[0].courseName}`)&&H(c,v),1&t&&u!==(u=void 0===e[0]?"Select course to the left":`Leave empty to reset to ${e[0].courseName}`)&&D(a,"placeholder",u),1&t&&d!==(d=void 0===e[0])&&(a.disabled=d),4&t&&a.value!==e[2]&&(a.value=e[2]),1&t&&h!==(h=void 0===e[0])&&(f.disabled=h)},i:C,o:C,d(n){n&&I(t),e[4](null),g=!1,M(w)}}}function Xe(e,t,n){let o,{selected:r}=t;const s=W();let i,c;var l;l=()=>{i&&c!==r&&(c=r,i.focus(),i.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}))},Q().$$.after_update.push(l);return e.$$set=e=>{"selected"in e&&n(0,r=e.selected)},e.$$.update=()=>{1&e.$$.dirty&&n(2,o=(r?.value||r?.courseName)??"")},[r,i,o,function(){void 0!==r&&s("input",o)},function(e){te[e?"unshift":"push"]((()=>{i=e,n(1,i)}))},e=>{n(2,o=e.currentTarget.value)}]}const Ye=class extends _e{constructor(e){super(),ke(this,e,Xe,Fe,U,{selected:0})}};function Je(e){let t,n;return{c(){t=V("svg"),n=V("path"),D(n,"d","m9 11-4 4 4 4m-4-4h11a4 4 0 0 0 0-8h-1"),D(t,"fill","none"),D(t,"stroke","currentColor"),D(t,"stroke-linecap","round"),D(t,"stroke-linejoin","round"),D(t,"stroke-width","2"),D(t,"class","icon svg-icon-arrow-back"),D(t,"viewBox","0 0 24 24")},m(e,o){O(e,t,o),j(t,n)},p:C,i:C,o:C,d(e){e&&I(t)}}}const Ke=class extends _e{constructor(e){super(),ke(this,e,null,Je,U,{})}};function Qe(e){let t,n;return{c(){t=V("svg"),n=V("path"),D(n,"d","m5 12 5 5L20 7"),D(t,"fill","none"),D(t,"stroke","currentColor"),D(t,"stroke-linecap","round"),D(t,"stroke-linejoin","round"),D(t,"stroke-width","2"),D(t,"class","icon svg-icon-check"),D(t,"viewBox","0 0 24 24")},m(e,o){O(e,t,o),j(t,n)},p:C,i:C,o:C,d(e){e&&I(t)}}}const We=class extends _e{constructor(e){super(),ke(this,e,null,Qe,U,{})}};function Ze(e){let t,n;return{c(){t=V("svg"),n=V("path"),D(n,"d","M18 6 6 18M6 6l12 12"),D(t,"fill","none"),D(t,"stroke","currentColor"),D(t,"stroke-linecap","round"),D(t,"stroke-linejoin","round"),D(t,"stroke-width","2"),D(t,"class","icon svg-icon-x"),D(t,"viewBox","0 0 24 24")},m(e,o){O(e,t,o),j(t,n)},p:C,i:C,o:C,d(e){e&&I(t)}}}const et=class extends _e{constructor(e){super(),ke(this,e,null,Ze,U,{})}},tt=e=>e.sort((({courseName:e,value:t},{courseName:n,value:o})=>{const r=nt(t,e).trim(),i=nt(o,n).trim();return s.compare(r,i)})),nt=(e,t)=>"string"==typeof e?e:t;function ot(e){let t,n;return t=new We({}),{c(){be(t.$$.fragment)},m(e,o){ye(t,e,o),n=!0},i(e){n||(ge(t.$$.fragment,e),n=!0)},o(e){we(t.$$.fragment,e),n=!1},d(e){xe(t,e)}}}function rt(e){let t,n;return t=new et({}),{c(){be(t.$$.fragment)},m(e,o){ye(t,e,o),n=!0},i(e){n||(ge(t.$$.fragment,e),n=!0)},o(e){we(t.$$.fragment,e),n=!1},d(e){xe(t,e)}}}function st(e){let t,n,o,r,s;return n=new Ke({}),{c(){t=T("span"),be(n.$$.fragment)},m(i,c){O(i,t,c),ye(n,t,null),o=!0,r||(s=[A(t,"click",B(e[2])),A(t,"keydown",B(e[7]))],r=!0)},p:C,i(e){o||(ge(n.$$.fragment,e),o=!0)},o(e){we(n.$$.fragment,e),o=!1},d(e){e&&I(t),xe(n),r=!1,M(s)}}}function it(e){let t,n,o,r,s,i,c,l,a,u,d=nt(e[0],e[1])+"";const p=[rt,ot],f=[];function m(e,t){return!1===e[0]?0:1}o=m(e),r=f[o]=p[o](e);let h="string"==typeof e[0]&&st(e);return{c(){t=T("div"),n=T("span"),r.c(),s=P(),i=z(d),c=P(),h&&h.c(),D(t,"class","row"),D(t,"title",e[1]),X(t,"removed",!1===e[0])},m(r,d){O(r,t,d),j(t,n),f[o].m(n,null),j(t,s),j(t,i),j(t,c),h&&h.m(t,null),l=!0,a||(u=[A(n,"click",B(e[3])),A(n,"keydown",B(e[6])),A(t,"click",e[4]),A(t,"keydown",B(e[8]))],a=!0)},p(e,[s]){let c=o;o=m(e),o!==c&&(me(),we(f[c],1,1,(()=>{f[c]=null})),he(),r=f[o],r||(r=f[o]=p[o](e),r.c()),ge(r,1),r.m(n,null)),(!l||3&s)&&d!==(d=nt(e[0],e[1])+"")&&H(i,d),"string"==typeof e[0]?h?(h.p(e,s),1&s&&ge(h,1)):(h=st(e),h.c(),ge(h,1),h.m(t,null)):h&&(me(),we(h,1,1,(()=>{h=null})),he()),(!l||2&s)&&D(t,"title",e[1]),(!l||1&s)&&X(t,"removed",!1===e[0])},i(e){l||(ge(r),ge(h),l=!0)},o(e){we(r),we(h),l=!1},d(e){e&&I(t),f[o].d(),h&&h.d(),a=!1,M(u)}}}function ct(e,t,n){let o,r,s,{course:i}=t;const c=W();function l(){c("reset",s)}function a(){c("toggle",s)}function u(){c("select",i)}return e.$$set=e=>{"course"in e&&n(5,i=e.course)},e.$$.update=()=>{32&e.$$.dirty&&n(1,({courseName:o,value:r,courseId:s}=i),o,(n(0,r),n(5,i)))},[r,o,l,a,u,i,e=>{"Enter"===e.key&&a()},e=>{"Enter"===e.key&&l()},e=>{"Enter"===e.key&&u()}]}const lt=class extends _e{constructor(e){super(),ke(this,e,ct,it,U,{course:5})}};function at(e,t,n){const o=e.slice();return o[5]=t[n],o}function ut(e){let t;return{c(){t=T("div"),t.textContent="Loading courses..."},m(e,n){O(e,t,n)},d(e){e&&I(t)}}}function dt(e,t){let n,o,r;return o=new lt({props:{course:t[5]}}),o.$on("select",t[2]),o.$on("toggle",t[3]),o.$on("reset",t[4]),{key:e,first:null,c(){n=R(),be(o.$$.fragment),this.first=n},m(e,t){O(e,n,t),ye(o,e,t),r=!0},p(e,n){t=e;const r={};1&n&&(r.course=t[5]),o.$set(r)},i(e){r||(ge(o.$$.fragment,e),r=!0)},o(e){we(o.$$.fragment,e),r=!1},d(e){e&&I(n),xe(o,e)}}}function pt(e){let t,n,o,r,s=[],i=new Map,c=e[1]&&ut(),l=e[0];const a=e=>e[5].courseId;for(let t=0;t<l.length;t+=1){let n=at(e,l,t),o=a(n);i.set(o,s[t]=dt(o,n))}return{c(){t=T("div"),n=T("div"),c&&c.c(),o=P();for(let e=0;e<s.length;e+=1)s[e].c();D(n,"class","sidebar"),D(t,"class","outer-sidebar")},m(e,i){O(e,t,i),j(t,n),c&&c.m(n,null),j(n,o);for(let e=0;e<s.length;e+=1)s[e]&&s[e].m(n,null);r=!0},p(e,[t]){e[1]?c||(c=ut(),c.c(),c.m(n,o)):c&&(c.d(1),c=null),1&t&&(l=e[0],me(),s=function(e,t,n,o,r,s,i,c,l,a,u,d){let p=e.length,f=s.length,m=p;const h={};for(;m--;)h[e[m].key]=m;const g=[],w=new Map,v=new Map,$=[];for(m=f;m--;){const e=d(r,s,m),c=n(e);let l=i.get(c);l?o&&$.push((()=>l.p(e,t))):(l=a(c,e),l.c()),w.set(c,g[m]=l),c in h&&v.set(c,Math.abs(m-h[c]))}const b=new Set,y=new Set;function x(e){ge(e,1),e.m(c,u),i.set(e.key,e),u=e.first,f--}for(;p&&f;){const t=g[f-1],n=e[p-1],o=t.key,r=n.key;t===n?(u=t.first,p--,f--):w.has(r)?!i.has(o)||b.has(o)?x(t):y.has(r)?p--:v.get(o)>v.get(r)?(y.add(o),x(t)):(b.add(r),p--):(l(n,i),p--)}for(;p--;){const t=e[p];w.has(t.key)||l(t,i)}for(;f;)x(g[f-1]);return M($),g}(s,t,a,1,e,l,i,n,ve,dt,null,at),he())},i(e){if(!r){for(let e=0;e<l.length;e+=1)ge(s[e]);r=!0}},o(e){for(let e=0;e<s.length;e+=1)we(s[e]);r=!1},d(e){e&&I(t),c&&c.d();for(let e=0;e<s.length;e+=1)s[e].d()}}}function ft(e,t,n){let{courses:o}=t,{loadingCourses:r}=t;return e.$$set=e=>{"courses"in e&&n(0,o=e.courses),"loadingCourses"in e&&n(1,r=e.loadingCourses)},[o,r,function(t){Z.call(this,e,t)},function(t){Z.call(this,e,t)},function(t){Z.call(this,e,t)}]}const mt=class extends _e{constructor(e){super(),ke(this,e,ft,pt,U,{courses:0,loadingCourses:1})}};function ht(e){let t,n;return t=new Ye({props:{selected:e[2]}}),t.$on("input",e[5]),{c(){be(t.$$.fragment)},m(e,o){ye(t,e,o),n=!0},p(e,n){const o={};4&n&&(o.selected=e[2]),t.$set(o)},i(e){n||(ge(t.$$.fragment,e),n=!0)},o(e){we(t.$$.fragment,e),n=!1},d(e){xe(t,e)}}}function gt(e){let t,n;return t=new He({}),t.$on("login",e[4]),{c(){be(t.$$.fragment)},m(e,o){ye(t,e,o),n=!0},p:C,i(e){n||(ge(t.$$.fragment,e),n=!0)},o(e){we(t.$$.fragment,e),n=!1},d(e){xe(t,e)}}}function wt(e){let t,n,o,r,s,i,c,l;r=new mt({props:{courses:e[0],loadingCourses:e[1]}}),r.$on("toggle",e[6]),r.$on("select",e[7]),r.$on("reset",e[8]);const a=[gt,ht],u=[];function d(e,t){return e[3]?0:1}return i=d(e),c=u[i]=a[i](e),{c(){t=T("link"),n=P(),o=T("div"),be(r.$$.fragment),s=P(),c.c(),D(t,"rel","shortcut icon"),D(t,"href","/theme/image.php/classic/theme/1588340020/favicon"),document.title="Clean Moodle Setup",D(o,"class","container")},m(e,c){j(document.head,t),O(e,n,c),O(e,o,c),ye(r,o,null),j(o,s),u[i].m(o,null),l=!0},p(e,[t]){const n={};1&t&&(n.courses=e[0]),2&t&&(n.loadingCourses=e[1]),r.$set(n);let s=i;i=d(e),i===s?u[i].p(e,t):(me(),we(u[s],1,1,(()=>{u[s]=null})),he(),c=u[i],c?c.p(e,t):(c=u[i]=a[i](e),c.c()),ge(c,1),c.m(o,null))},i(e){l||(ge(r.$$.fragment,e),ge(c),l=!0)},o(e){we(r.$$.fragment,e),we(c),l=!1},d(e){I(t),e&&I(n),e&&I(o),xe(r),u[i].d()}}}function vt(e,t,n){let o,r=[],s=!0,i=!1;_.extend(d);const c=new _;async function l(){let e;try{e=await c.getCourses()}catch{return void a()}const t=[];for(const{id:n,name:o}of e)t.push({courseName:o,courseId:n,value:Oe(n)});tt(t),n(0,r=t),n(1,s=!1)}function a(){c.logout(),n(3,i=!0)}function u(e,t){n(0,r=r.map((n=>n.courseId===e?t(n):n))),n(0,r=tt(r))}return c.login().then(l,a),[r,s,o,i,async function(e){const t=e.detail.username.trim(),{password:o}=e.detail;if(t&&o)try{await c.login({username:t,password:o}),n(3,i=!1),l()}catch{a()}},function(e){const t=o.courseId,r=e.detail.trim();u(t,(e=>e.courseName===r||""===r?(Te(t),{...e,value:void 0}):(Ie(t,r),{...e,value:r}))),n(2,o=void 0)},function(e){const t=e.detail;o?.courseId===t&&n(2,o=void 0),u(t,(e=>(!1===e.value?Te(t):Ie(t,!1),{...e,value:!1===e.value&&void 0})))},function(e){n(2,o=e.detail)},function(e){u(e.detail,(e=>({...e,value:void 0}))),Te(e.detail)}]}const $t=class extends _e{constructor(e){super(),ke(this,e,vt,wt,U,{})}},bt=()=>{const{head:e,body:t}=document;t.replaceChildren(),e.replaceChildren(),history.replaceState({},"","/cleanMoodle"),GM_addStyle('*,::after,::before{box-sizing:border-box}blockquote,body,dd,dl,figure,h1,h2,h3,h4,p{margin:0}ol[role=list],ul[role=list]{list-style:none}html:focus-within{scroll-behavior:smooth}body{min-height:100vh;text-rendering:optimizeSpeed;line-height:1.5;padding:1%}a:not([class]){text-decoration-skip-ink:auto}img,picture{max-width:100%;display:block}button,input,select,textarea{font:inherit}@media (prefers-reduced-motion:reduce){html:focus-within{scroll-behavior:auto}*,::after,::before{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}html{background:#202020;color:#ccc;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";font-size:.9375rem;font-weight:400;line-height:1.5;user-select:none}@media (min-width:0px){:root{--sidebar-flex: 0 0 100%;--main-flex: 0 0 100%;--padding-horizontal: 0;--padding-vertical: 0.5%}}@media (min-width:768px){:root{--sidebar-flex: 0 0 32%;--main-flex: 0 0 68%;--padding-horizontal: 0.5%;--padding-vertical: 0}}@media (min-width:992px){:root{--sidebar-flex: 0 0 25%;--main-flex: 0 0 75%}}@media (min-width:1200px){:root{--sidebar-flex: 0 0 20%;--main-flex: 0 0 80%}}.outer-sidebar{flex:var(--sidebar-flex);padding-right:var(--padding-horizontal);padding-bottom:var(--padding-vertical)}.outer-sidebar .sidebar{display:flex;flex-direction:column;padding:10px 15px;border:1.5px solid #343434;border-radius:4px;background-color:#141414}.outer-sidebar .row{cursor:pointer;display:flex;align-items:flex-start;color:#198754}.outer-sidebar .row:hover{text-decoration:underline}.outer-sidebar .row.removed{color:#dc3545}.btn-save:not([disabled]){cursor:pointer}.icon{height:1.5em;width:1.5em}.section-title{font-size:30px;font-weight:300;-webkit-font-smoothing:antialiased}.svg-icon-check{color:#198754}.svg-icon-x{color:#dc3545}.outer-main{flex:var(--main-flex);padding-left:var(--padding-horizontal);padding-top:var(--padding-vertical)}.main{padding:3% 2% 5%;border:1.5px solid #343434;border-radius:4px;background-color:#141414}.replace-flex-inputs{display:flex;flex-direction:column;gap:10px;margin-top:10px}.replace-flex-inputs *{align-self:flex-start}button,input{display:flex;align-items:center;padding:.375rem .75rem;font-size:.9375rem;font-weight:400;line-height:1.5;color:#495057;white-space:nowrap;background-color:#e9ecef;border:1px solid #8f959e;border-radius:.25rem;font-family:inherit}button{text-align:center;background-color:#1177d1;color:#ccc;margin-top:10px}.container{display:flex;flex-direction:row;flex-wrap:wrap;width:100%;height:max-content}'),new $t({target:t})};if(
// ==UserScript==
// @name      Clean Moodle
// @version   4.0.2
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
(t=>{try{(t=>{const r=GM_getValue(o),s=void 0===r?[-1,-1,-1]:e(r),i=Object.entries(t).map((([t,n])=>[e(t),n])).sort((([e],[t])=>n(e,t)));for(const[e,t]of i)n(s,e)<0&&t();GM_setValue(o,GM_info.script.version)})(t)}catch(e){console.error("Upgrading threw %o. Failing silently.",e)}})({"1.4.0":()=>{GM_deleteValue("lastValidatedToken"),GM_deleteValue("password")},"1.5.0"(){const e=GM_getValue("remove")??[],t=GM_getValue("replace")??{};for(const n of e)t[n]=!1;GM_setValue("overrides",t),GM_deleteValue("remove"),GM_deleteValue("replace")}}),"https:"!==location.protocol&&(location.protocol="https:"),!/^\/customicons/i.test(location.pathname)){const e=!/^\/cleanmoodle/i.test(location.pathname);yt=e?function(){const e=r();if(GM_registerMenuCommand("Open settings",(()=>{open("/cleanMoodle")})),e){qe(),GM_addValueChangeListener("overrides",((e,t,n,o)=>{if(o)if(t){for(const e of Object.keys(t))e in n||Ae(e,void 0);for(const[e,o]of Object.entries(n))o!==t[e]&&Ae(e,o);Re()}else qe()}));const t=e.previousSibling;if(t instanceof HTMLParagraphElement){const e=document.createElement("span");t.append(e),new Ge({target:e})}}}:bt,"interactive"!==document.readyState&&"complete"!==document.readyState?document.addEventListener("DOMContentLoaded",yt,{once:!0}):yt()}var yt})();