/*! For license information please see clean-moodle.user.js.LICENSE.txt */
(()=>{"use strict";var e,t,n,o,r,i,l,s={},a=[],c=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function _(e,t){for(var n in t)e[n]=t[n];return e}function u(e){var t=e.parentNode;t&&t.removeChild(e)}function d(e,o,r,i,l){var s={type:e,props:o,key:r,ref:i,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==l?++n:l};return null==l&&null!=t.vnode&&t.vnode(s),s}function p(e){return e.children}function h(e,t){this.props=e,this.context=t}function f(e,t){if(null==t)return e.__?f(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?f(e):null}function m(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return m(e)}}function v(e){(!e.__d&&(e.__d=!0)&&o.push(e)&&!g.__r++||r!==t.debounceRendering)&&((r=t.debounceRendering)||i)(g)}function g(){var e,t,n,r,i,s,a,c;for(o.sort(l);e=o.shift();)e.__d&&(t=o.length,r=void 0,i=void 0,a=(s=(n=e).__v).__e,(c=n.__P)&&(r=[],(i=_({},s)).__v=s.__v+1,E(c,s,i,n.__n,void 0!==c.ownerSVGElement,null!=s.__h?[a]:null,r,null==a?f(s):a,s.__h),U(r,s),s.__e!=a&&m(s)),o.length>t&&o.sort(l));g.__r=0}function y(e,t,n,o,r,i,l,c,_,u){var h,m,v,g,y,x,S,C=o&&o.__k||a,M=C.length;for(n.__k=[],h=0;h<t.length;h++)if(null!=(g=n.__k[h]=null==(g=t[h])||"boolean"==typeof g||"function"==typeof g?null:"string"==typeof g||"number"==typeof g||"bigint"==typeof g?d(null,g,null,null,g):Array.isArray(g)?d(p,{children:g},null,null,null):g.__b>0?d(g.type,g.props,g.key,g.ref?g.ref:null,g.__v):g)){if(g.__=n,g.__b=n.__b+1,null===(v=C[h])||v&&g.key==v.key&&g.type===v.type)C[h]=void 0;else for(m=0;m<M;m++){if((v=C[m])&&g.key==v.key&&g.type===v.type){C[m]=void 0;break}v=null}E(e,g,v=v||s,r,i,l,c,_,u),y=g.__e,(m=g.ref)&&v.ref!=m&&(S||(S=[]),v.ref&&S.push(v.ref,null,g),S.push(m,g.__c||y,g)),null!=y?(null==x&&(x=y),"function"==typeof g.type&&g.__k===v.__k?g.__d=_=w(g,_,e):_=b(e,g,v,C,y,_),"function"==typeof n.type&&(n.__d=_)):_&&v.__e==_&&_.parentNode!=e&&(_=f(v))}for(n.__e=x,h=M;h--;)null!=C[h]&&("function"==typeof n.type&&null!=C[h].__e&&C[h].__e==n.__d&&(n.__d=k(o).nextSibling),N(C[h],C[h]));if(S)for(h=0;h<S.length;h++)I(S[h],S[++h],S[++h])}function w(e,t,n){for(var o,r=e.__k,i=0;r&&i<r.length;i++)(o=r[i])&&(o.__=e,t="function"==typeof o.type?w(o,t,n):b(n,o,o,r,o.__e,t));return t}function b(e,t,n,o,r,i){var l,s,a;if(void 0!==t.__d)l=t.__d,t.__d=void 0;else if(null==n||r!=i||null==r.parentNode)e:if(null==i||i.parentNode!==e)e.appendChild(r),l=null;else{for(s=i,a=0;(s=s.nextSibling)&&a<o.length;a+=1)if(s==r)break e;e.insertBefore(r,i),l=i}return void 0!==l?l:r.nextSibling}function k(e){var t,n,o;if(null==e.type||"string"==typeof e.type)return e.__e;if(e.__k)for(t=e.__k.length-1;t>=0;t--)if((n=e.__k[t])&&(o=k(n)))return o;return null}function x(e,t,n){"-"===t[0]?e.setProperty(t,null==n?"":n):e[t]=null==n?"":"number"!=typeof n||c.test(t)?n:n+"px"}function S(e,t,n,o,r){var i;e:if("style"===t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof o&&(e.style.cssText=o=""),o)for(t in o)n&&t in n||x(e.style,t,"");if(n)for(t in n)o&&n[t]===o[t]||x(e.style,t,n[t])}else if("o"===t[0]&&"n"===t[1])i=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+i]=n,n?o||e.addEventListener(t,i?M:C,i):e.removeEventListener(t,i?M:C,i);else if("dangerouslySetInnerHTML"!==t){if(r)t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("width"!==t&&"height"!==t&&"href"!==t&&"list"!==t&&"form"!==t&&"tabIndex"!==t&&"download"!==t&&t in e)try{e[t]=null==n?"":n;break e}catch(e){}"function"==typeof n||(null==n||!1===n&&"-"!==t[4]?e.removeAttribute(t):e.setAttribute(t,n))}}function C(e){return this.l[e.type+!1](t.event?t.event(e):e)}function M(e){return this.l[e.type+!0](t.event?t.event(e):e)}function E(e,n,o,r,i,l,s,a,c){var u,d,f,m,v,g,w,b,k,x,S,C,M,E,U,I=n.type;if(void 0!==n.constructor)return null;null!=o.__h&&(c=o.__h,a=n.__e=o.__e,n.__h=null,l=[a]),(u=t.__b)&&u(n);try{e:if("function"==typeof I){if(b=n.props,k=(u=I.contextType)&&r[u.__c],x=u?k?k.props.value:u.__:r,o.__c?w=(d=n.__c=o.__c).__=d.__E:("prototype"in I&&I.prototype.render?n.__c=d=new I(b,x):(n.__c=d=new h(b,x),d.constructor=I,d.render=P),k&&k.sub(d),d.props=b,d.state||(d.state={}),d.context=x,d.__n=r,f=d.__d=!0,d.__h=[],d._sb=[]),null==d.__s&&(d.__s=d.state),null!=I.getDerivedStateFromProps&&(d.__s==d.state&&(d.__s=_({},d.__s)),_(d.__s,I.getDerivedStateFromProps(b,d.__s))),m=d.props,v=d.state,d.__v=n,f)null==I.getDerivedStateFromProps&&null!=d.componentWillMount&&d.componentWillMount(),null!=d.componentDidMount&&d.__h.push(d.componentDidMount);else{if(null==I.getDerivedStateFromProps&&b!==m&&null!=d.componentWillReceiveProps&&d.componentWillReceiveProps(b,x),!d.__e&&null!=d.shouldComponentUpdate&&!1===d.shouldComponentUpdate(b,d.__s,x)||n.__v===o.__v){for(n.__v!==o.__v&&(d.props=b,d.state=d.__s,d.__d=!1),d.__e=!1,n.__e=o.__e,n.__k=o.__k,n.__k.forEach((function(e){e&&(e.__=n)})),S=0;S<d._sb.length;S++)d.__h.push(d._sb[S]);d._sb=[],d.__h.length&&s.push(d);break e}null!=d.componentWillUpdate&&d.componentWillUpdate(b,d.__s,x),null!=d.componentDidUpdate&&d.__h.push((function(){d.componentDidUpdate(m,v,g)}))}if(d.context=x,d.props=b,d.__P=e,C=t.__r,M=0,"prototype"in I&&I.prototype.render){for(d.state=d.__s,d.__d=!1,C&&C(n),u=d.render(d.props,d.state,d.context),E=0;E<d._sb.length;E++)d.__h.push(d._sb[E]);d._sb=[]}else do{d.__d=!1,C&&C(n),u=d.render(d.props,d.state,d.context),d.state=d.__s}while(d.__d&&++M<25);d.state=d.__s,null!=d.getChildContext&&(r=_(_({},r),d.getChildContext())),f||null==d.getSnapshotBeforeUpdate||(g=d.getSnapshotBeforeUpdate(m,v)),U=null!=u&&u.type===p&&null==u.key?u.props.children:u,y(e,Array.isArray(U)?U:[U],n,o,r,i,l,s,a,c),d.base=n.__e,n.__h=null,d.__h.length&&s.push(d),w&&(d.__E=d.__=null),d.__e=!1}else null==l&&n.__v===o.__v?(n.__k=o.__k,n.__e=o.__e):n.__e=L(o.__e,n,o,r,i,l,s,c);(u=t.diffed)&&u(n)}catch(e){n.__v=null,(c||null!=l)&&(n.__e=a,n.__h=!!c,l[l.indexOf(a)]=null),t.__e(e,n,o)}}function U(e,n){t.__c&&t.__c(n,e),e.some((function(n){try{e=n.__h,n.__h=[],e.some((function(e){e.call(n)}))}catch(e){t.__e(e,n.__v)}}))}function L(t,n,o,r,i,l,a,c){var _,d,p,h=o.props,m=n.props,v=n.type,g=0;if("svg"===v&&(i=!0),null!=l)for(;g<l.length;g++)if((_=l[g])&&"setAttribute"in _==!!v&&(v?_.localName===v:3===_.nodeType)){t=_,l[g]=null;break}if(null==t){if(null===v)return document.createTextNode(m);t=i?document.createElementNS("http://www.w3.org/2000/svg",v):document.createElement(v,m.is&&m),l=null,c=!1}if(null===v)h===m||c&&t.data===m||(t.data=m);else{if(l=l&&e.call(t.childNodes),d=(h=o.props||s).dangerouslySetInnerHTML,p=m.dangerouslySetInnerHTML,!c){if(null!=l)for(h={},g=0;g<t.attributes.length;g++)h[t.attributes[g].name]=t.attributes[g].value;(p||d)&&(p&&(d&&p.__html==d.__html||p.__html===t.innerHTML)||(t.innerHTML=p&&p.__html||""))}if(function(e,t,n,o,r){var i;for(i in n)"children"===i||"key"===i||i in t||S(e,i,null,n[i],o);for(i in t)r&&"function"!=typeof t[i]||"children"===i||"key"===i||"value"===i||"checked"===i||n[i]===t[i]||S(e,i,t[i],n[i],o)}(t,m,h,i,c),p)n.__k=[];else if(g=n.props.children,y(t,Array.isArray(g)?g:[g],n,o,r,i&&"foreignObject"!==v,l,a,l?l[0]:o.__k&&f(o,0),c),null!=l)for(g=l.length;g--;)null!=l[g]&&u(l[g]);c||("value"in m&&void 0!==(g=m.value)&&(g!==t.value||"progress"===v&&!g||"option"===v&&g!==h.value)&&S(t,"value",g,h.value,!1),"checked"in m&&void 0!==(g=m.checked)&&g!==t.checked&&S(t,"checked",g,h.checked,!1))}return t}function I(e,n,o){try{"function"==typeof e?e(n):e.current=n}catch(e){t.__e(e,o)}}function N(e,n,o){var r,i;if(t.unmount&&t.unmount(e),(r=e.ref)&&(r.current&&r.current!==e.__e||I(r,null,n)),null!=(r=e.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(e){t.__e(e,n)}r.base=r.__P=null,e.__c=void 0}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&N(r[i],n,o||"function"!=typeof e.type);o||null==e.__e||u(e.__e),e.__=e.__e=e.__d=void 0}function P(e,t,n){return this.constructor(e,n)}function V(n,o,r){var i,l,a;t.__&&t.__(n,o),l=(i="function"==typeof r)?null:r&&r.__k||o.__k,a=[],E(o,n=(!i&&r||o).__k=function(t,n,o){var r,i,l,s={};for(l in n)"key"==l?r=n[l]:"ref"==l?i=n[l]:s[l]=n[l];if(arguments.length>2&&(s.children=arguments.length>3?e.call(arguments,2):o),"function"==typeof t&&null!=t.defaultProps)for(l in t.defaultProps)void 0===s[l]&&(s[l]=t.defaultProps[l]);return d(t,s,r,i,null)}(p,null,[n]),l||s,s,void 0!==o.ownerSVGElement,!i&&r?[r]:l?null:o.firstChild?e.call(o.childNodes):null,a,!i&&r?r:l?l.__e:o.firstChild,i),U(a,n)}e=a.slice,t={__e:function(e,t,n,o){for(var r,i,l;t=t.__;)if((r=t.__c)&&!r.__)try{if((i=r.constructor)&&null!=i.getDerivedStateFromError&&(r.setState(i.getDerivedStateFromError(e)),l=r.__d),null!=r.componentDidCatch&&(r.componentDidCatch(e,o||{}),l=r.__d),l)return r.__E=r}catch(t){e=t}throw e}},n=0,h.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=_({},this.state),"function"==typeof e&&(e=e(_({},n),this.props)),e&&_(n,e),null!=e&&this.__v&&(t&&this._sb.push(t),v(this))},h.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),v(this))},h.prototype.render=p,o=[],i="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,l=function(e,t){return e.__v.__b-t.__v.__b},g.__r=0;var H=0;function G(e,n,o,r,i,l){var s,a,c={};for(a in n)"ref"==a?s=n[a]:c[a]=n[a];var _={type:e,props:c,key:o,ref:s,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:--H,__source:i,__self:l};if("function"==typeof e&&(s=e.defaultProps))for(a in s)void 0===c[a]&&(c[a]=s[a]);return t.vnode&&t.vnode(_),_}const R=()=>document.querySelector('#page-content li.type_system.depth_2 > ul[role="group"]'),T=new Intl.Collator(void 0,{sensitivity:"base",numeric:!0}),O=e=>{if(!/^\d+\.\d+\.\d+$/.test(e))throw new Error(`Invalid version: ${e}.`);const[t,n,o]=e.split(".").map(Number);return[t,n,o]},A=(e,t)=>e-t,D=(e,t)=>A(e[0],t[0])||A(e[1],t[1])||A(e[2],t[2]),j="lastUpgraded";var z;!function(e){e.username="username",e.token="token"}(z||(z={}));const F=e=>[()=>GM_getValue(e),t=>{GM_setValue(e,t)},()=>{GM_deleteValue(e)}],[$,q,B]=F(z.token),[W,K,Y]=F(z.username);Symbol("getCourseContent");const J=Symbol("getUserId");async function Q(){const e=this._readCache(J);if(void 0!==e)return e;const t=await this.login(),n=new URLSearchParams({wsfunction:"core_webservice_get_site_info",wstoken:t}),o=await fetch(this.resolveUrl("/webservice/rest/server.php?moodlewsrestformat=json"),{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:n.toString()});if(!o.ok)throw new Error(`Response was not ok: ${o.status}`);const r=await o.json();if("exception"in r)throw this.logout(),new Error("token was undefined");return this._writeCache(J,r.userid)}const X=e=>{e.prototype.getUserId=Q},Z=Symbol("getCourses");async function ee(e=!1){const t=this._readCache(Z);if(t&&!e)return t;const n=await this.getUserId(),o=await this.login(),r=new URLSearchParams({wstoken:o,moodlewsrestformat:"json",wsfunction:"core_enrol_get_users_courses",userid:String(n),returnusercount:"0"}),i=await fetch(this.resolveUrl("/webservice/rest/server.php"),{method:"POST",body:r.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}});if(!i.ok)throw new Error(`Response was not ok: ${i.status}`);const l=await i.json();if("exception"in l)throw this.logout(),new Error("Token was invalid");const s=[];for(const{id:e,fullname:t}of l)s.push({id:e,name:t});return this._writeCache(Z,s)}const te=e=>{e.prototype.getCourses=ee,e.extend(X)};class ne extends Error{constructor(){super("No credentials provided.")}}class oe extends Error{constructor(){super("Invalid credentials.")}}class re extends Error{constructor(e){super(`${e} not included`)}}let ie=new URL("http://localhost/");"undefined"!=typeof location?ie=new URL("/",location.href):"undefined"!=typeof process&&"string"==typeof process.env.MOODLE_BASE_URL&&(ie=new URL(process.env.MOODLE_BASE_URL));class le{static extend(e){return e(le),le}baseUrl=ie;credentials={token:$(),username:W()};#e=new Map;resolveUrl=e=>new URL(e,this.baseUrl);_readCache(e){return this.#e.get(e)}_writeCache(e,t){return this.#e.set(e,t),t}async login(e){const{credentials:t}=this;if(e&&(t.username=e.username,t.password=e.password,K(e.username)),t.token)return t.token;const{username:n,password:o}=t;if(!n||!o)throw new ne;const r=new URLSearchParams({username:n,password:o,service:"moodle_mobile_app"}),i=await fetch(this.resolveUrl("/login/token.php"),{method:"POST",body:r.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}});if(!i.ok)throw new Error(`Response was not ok: ${i.status}`);const l=await i.json();if("errorcode"in l)throw this.logout(),new oe;const{token:s}=l;return q(s),t.token=s,s}logout(){delete this.credentials.token,B(),delete this.credentials.password}async getCourses(e){throw new re("getCourses")}async getUserId(){throw new re("getUserId")}async popupLogin(e){throw new re("popupLogin")}async getCourseContent(e,t){throw new re("getCourseContent")}}var se,ae,ce,_e,ue=0,de=[],pe=[],he=t.__b,fe=t.__r,me=t.diffed,ve=t.__c,ge=t.unmount;function ye(e,n){t.__h&&t.__h(ae,e,ue||n),ue=0;var o=ae.__H||(ae.__H={__:[],__h:[]});return e>=o.__.length&&o.__.push({__V:pe}),o.__[e]}function we(e){return ue=1,function(e,t,n){var o=ye(se++,2);if(o.t=e,!o.__c&&(o.__=[n?n(t):Le(void 0,t),function(e){var t=o.__N?o.__N[0]:o.__[0],n=o.t(t,e);t!==n&&(o.__N=[n,o.__[1]],o.__c.setState({}))}],o.__c=ae,!ae.u)){var r=function(e,t,n){if(!o.__c.__H)return!0;var r=o.__c.__H.__.filter((function(e){return e.__c}));if(r.every((function(e){return!e.__N})))return!i||i.call(this,e,t,n);var l=!1;return r.forEach((function(e){if(e.__N){var t=e.__[0];e.__=e.__N,e.__N=void 0,t!==e.__[0]&&(l=!0)}})),!(!l&&o.__c.props===e)&&(!i||i.call(this,e,t,n))};ae.u=!0;var i=ae.shouldComponentUpdate,l=ae.componentWillUpdate;ae.componentWillUpdate=function(e,t,n){if(this.__e){var o=i;i=void 0,r(e,t,n),i=o}l&&l.call(this,e,t,n)},ae.shouldComponentUpdate=r}return o.__N||o.__}(Le,e)}function be(e){return ue=5,ke((function(){return{current:e}}),[])}function ke(e,t){var n=ye(se++,7);return Ue(n.__H,t)?(n.__V=e(),n.i=t,n.__h=e,n.__V):n.__}function xe(){for(var e;e=de.shift();)if(e.__P&&e.__H)try{e.__H.__h.forEach(Me),e.__H.__h.forEach(Ee),e.__H.__h=[]}catch(n){e.__H.__h=[],t.__e(n,e.__v)}}t.__b=function(e){ae=null,he&&he(e)},t.__r=function(e){fe&&fe(e),se=0;var t=(ae=e.__c).__H;t&&(ce===ae?(t.__h=[],ae.__h=[],t.__.forEach((function(e){e.__N&&(e.__=e.__N),e.__V=pe,e.__N=e.i=void 0}))):(t.__h.forEach(Me),t.__h.forEach(Ee),t.__h=[])),ce=ae},t.diffed=function(e){me&&me(e);var n=e.__c;n&&n.__H&&(n.__H.__h.length&&(1!==de.push(n)&&_e===t.requestAnimationFrame||((_e=t.requestAnimationFrame)||Ce)(xe)),n.__H.__.forEach((function(e){e.i&&(e.__H=e.i),e.__V!==pe&&(e.__=e.__V),e.i=void 0,e.__V=pe}))),ce=ae=null},t.__c=function(e,n){n.some((function(e){try{e.__h.forEach(Me),e.__h=e.__h.filter((function(e){return!e.__||Ee(e)}))}catch(o){n.some((function(e){e.__h&&(e.__h=[])})),n=[],t.__e(o,e.__v)}})),ve&&ve(e,n)},t.unmount=function(e){ge&&ge(e);var n,o=e.__c;o&&o.__H&&(o.__H.__.forEach((function(e){try{Me(e)}catch(e){n=e}})),o.__H=void 0,n&&t.__e(n,o.__v))};var Se="function"==typeof requestAnimationFrame;function Ce(e){var t,n=function(){clearTimeout(o),Se&&cancelAnimationFrame(t),setTimeout(e)},o=setTimeout(n,100);Se&&(t=requestAnimationFrame(n))}function Me(e){var t=ae,n=e.__c;"function"==typeof n&&(e.__c=void 0,n()),ae=t}function Ee(e){var t=ae;e.__c=e.__(),ae=t}function Ue(e,t){return!e||e.length!==t.length||t.some((function(t,n){return t!==e[n]}))}function Le(e,t){return"function"==typeof t?t(e):t}const Ie=({cb:e,title:t,moodle:n})=>{const o=be(null),r=be(null),[i,l]=we(!0),[s,a]=we({username:!0,password:!0});return i?G("div",{class:"vertical-horizontal-center",children:G("form",{onSubmit:async t=>{t.preventDefault(),t.stopImmediatePropagation();const i=o.current?.value.trim(),s=r.current?.value;if(a({password:Boolean(s),username:Boolean(i)}),i&&s){l(!1);try{const t=await n.login({username:i,password:s});e(t)}catch{l(!0)}}},children:G("div",{class:"card shadow",children:[G("div",{class:"card-body",children:[G("h5",{class:"card-title",children:["Login - ",t]}),G("div",{class:"mb-3",children:[G("label",{htmlFor:"popup-username",class:"form-label",children:"Username"}),G("input",{ref:o,required:!0,defaultValue:W(),id:"popup-username",placeholder:"Username",class:"form-control"+(s.username?"":" is-invalid"),onInput:()=>{a((e=>({...e,username:!0})))}})]}),G("div",{class:"mb-3",children:[G("label",{htmlFor:"popup-password",class:"form-label",children:"Password"}),G("input",{ref:r,required:!0,id:"popup-password",placeholder:"Password",class:"form-control"+(s.password?"":" is-invalid"),type:"password",onInput:()=>{a((e=>({...e,password:!0})))}})]})]}),G("button",{class:"btn btn-primary",type:"submit",children:"Login"})]})})}):null},Ne=async function(e){return new Promise((t=>{const n=GM_addStyle(".login-popup-userscript .vertical-horizontal-center{width:100%;height:100%;position:fixed;z-index:100000000;top:0;left:0;display:flex;align-items:center;justify-content:center;pointer-events:none}.login-popup-userscript .card{pointer-events:auto}"),o=document.createElement("div");o.className="login-popup-userscript",document.body.append(o),V(G(Ie,{cb:e=>{V(null,o),n.remove(),o.remove(),t(e)},title:e,moodle:this}),o)}))},Pe=()=>G("svg",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",class:"icon svg-icon-check",viewBox:"0 0 24 24",children:G("path",{d:"m5 12 5 5L20 7"})}),Ve=()=>G("svg",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",class:"icon svg-icon-x",viewBox:"0 0 24 24",children:G("path",{d:"M18 6 6 18M6 6l12 12"})}),He=()=>G("svg",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",class:"icon svg-icon-arrow-back",viewBox:"0 0 24 24",children:G("path",{d:"m9 11-4 4 4 4m-4-4h11a4 4 0 0 0 0-8h-1"})}),Ge=()=>GM_getValue("overrides")??{},Re=e=>Ge()[e],Te=(e,t)=>{const n=Ge();n[e]=t,(e=>{GM_setValue("overrides",e)})(n)},Oe=e=>{const t=Ge();return delete t[e],GM_setValue("overrides",t),t};le.extend(te);const Ae=e=>e.sort((({courseName:e,value:t},{courseName:n,value:o})=>{const r=De(t,e).trim(),i=De(o,n).trim();return T.compare(r,i)})),De=(e,t)=>"string"==typeof e?e:t,je=({course:e,handleClick:t,onChange:n})=>{const{courseName:o,value:r,courseId:i}=e;return G("div",{class:"row"+(!1===r?" removed":""),title:o,onClick:n=>{t(n,e)},children:[G("span",{onClick:t=>{t.stopImmediatePropagation(),!1===r?Oe(i):Te(i,!1),n(e)},children:G(!1===r?Ve:Pe,{})}),De(r,o),"string"==typeof r&&G("span",{onClick:t=>{t.stopImmediatePropagation(),Oe(i),n(e)},children:G(He,{})})]})},ze=({courses:e,loadingCourses:t,handleClick:n,onChange:o})=>G("div",{class:"outer-sidebar",children:G("div",{class:"sidebar",children:[t&&G("div",{children:"Loading courses..."}),e.map((e=>G(je,{course:e,handleClick:n,onChange:o},e.courseId)))]})}),Fe=({cb:e})=>{const t=be(null),n=be(null);return G("form",{onSubmit:o=>{o.preventDefault();const r=t.current?.value,i=n.current?.value;r&&i&&e(r,i)},children:G("div",{class:"replace-flex-input",children:[G("h5",{children:"Login"}),G("input",{ref:t,placeholder:"Username",defaultValue:W()}),G("input",{ref:n,placeholder:"Password",type:"password"}),G("button",{class:"btn-save",type:"submit",children:"Login"})]})})},$e=({selected:e,replaceInputRef:t,handleKeydown:n,handleSaveClick:o})=>G("div",{class:"outer-main",children:G("div",{class:"main",children:[G("div",{class:"section-title",children:"Rename course"}),G("div",{class:"replace-flex-inputs",children:[G("div",{children:e.isSelected?`Selected: ${e.courseName}`:"Select course to the left"}),G("input",{ref:t,class:"replace-input",placeholder:e.isSelected?`Leave empty to reset to ${e.courseName}`:"Select course to the left",disabled:!e.isSelected,value:e.isSelected?e.value||e.courseName:"",onKeyDown:n}),G("button",{class:"btn-save",disabled:!e.isSelected,type:"button",onClick:o,children:"Save"})]})]})});class qe extends h{moodle=new le;state={courses:[],loadingCourses:!0,selected:{isSelected:!1},loggedOut:!1};replaceInputRef={current:null};render(){const{courses:e,selected:t,loggedOut:n,loadingCourses:o}=this.state,{handleSidebarClick:r,replaceInputRef:i,loggedOutCallbackHandler:l,handleMainKeydown:s,handleSave:a,removeSelectedIfEqualId:c}=this;return G("div",{class:"container",children:[G(ze,{courses:e,handleClick:r,loadingCourses:o,onChange:c}),n?G(Fe,{cb:l}):G($e,{selected:t,replaceInputRef:i,handleKeydown:s,handleSaveClick:a})]})}getCourses=async()=>{let e;try{e=await this.moodle.getCourses()}catch{return void this.logout()}const t=[];for(const{id:n,name:o}of e)t.push({courseName:o,courseId:n,value:Re(n)});Ae(t),this.setState({courses:t,loadingCourses:!1})};loggedOutCallbackHandler=async(e,t)=>{if((e=e.trim())&&t)try{await this.moodle.login({username:e,password:t}),this.setState({loggedOut:!1}),this.onLogin()}catch{this.logout()}};onLogin=async()=>{await this.getCourses()};logout=()=>{this.moodle.logout(),this.setState({loggedOut:!0})};componentDidMount(){this.moodle.login().then(this.onLogin,(()=>{this.logout()})),GM_addValueChangeListener("overrides",(()=>{this.setState((({courses:e})=>{const t=e.map((({...e})=>({...e,value:Re(e.courseId)})));return Ae(t),{courses:t}}))}))}handleMainKeydown=e=>{"Enter"===e.key&&this.handleSave()};handleSave=()=>{const e=this.replaceInputRef.current?.value;if(void 0===e)return;const t=this.state.selected;if(!t.isSelected)return;const{courseId:n,courseName:o}=t;((e,t="",n="")=>{t=t.trim(),n=n.trim();const o=Ge();delete o[e],""!==t&&t!==n&&(o[e]=t),GM_setValue("overrides",o)})(n,e,o),this.setState({selected:{isSelected:!1}})};removeSelectedIfEqualId=({courseId:e})=>{this.setState((({selected:t})=>t.isSelected&&t.courseId===e?{selected:{isSelected:!1}}:null))};handleSidebarClick=(e,t)=>{this.setState({selected:{isSelected:!0,...t}},(()=>{const e=this.replaceInputRef.current;e&&(e.focus(),e.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}))}))}}const Be=()=>{const{head:e,body:t}=document;for(;e.lastChild;)e.lastChild.remove();for(;t.lastChild;)t.lastChild.remove();history.replaceState({},"","/cleanMoodle"),document.title="Clean Moodle Setup",GM_addStyle('*,::after,::before{box-sizing:border-box}blockquote,body,dd,dl,figure,h1,h2,h3,h4,p{margin:0}ol[role=list],ul[role=list]{list-style:none}html:focus-within{scroll-behavior:smooth}body{min-height:100vh;text-rendering:optimizeSpeed;line-height:1.5;padding:1%}a:not([class]){text-decoration-skip-ink:auto}img,picture{max-width:100%;display:block}button,input,select,textarea{font:inherit}@media (prefers-reduced-motion:reduce){html:focus-within{scroll-behavior:auto}*,::after,::before{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}html{background:#202020;color:#ccc;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";font-size:.9375rem;font-weight:400;line-height:1.5;user-select:none}@media (min-width:0px){:root{--sidebar-flex: 0 0 100%;--main-flex: 0 0 100%;--padding-horizontal: 0;--padding-vertical: 0.5%}}@media (min-width:768px){:root{--sidebar-flex: 0 0 32%;--main-flex: 0 0 68%;--padding-horizontal: 0.5%;--padding-vertical: 0}}@media (min-width:992px){:root{--sidebar-flex: 0 0 25%;--main-flex: 0 0 75%}}@media (min-width:1200px){:root{--sidebar-flex: 0 0 20%;--main-flex: 0 0 80%}}.outer-sidebar{flex:var(--sidebar-flex);padding-right:var(--padding-horizontal);padding-bottom:var(--padding-vertical)}.outer-sidebar .sidebar{display:flex;flex-direction:column;padding:10px 15px;border:1.5px solid #343434;border-radius:4px;background-color:#141414}.outer-sidebar .row{cursor:pointer;display:flex;align-items:flex-start;color:#198754}.outer-sidebar .row:hover{text-decoration:underline}.outer-sidebar .row.removed{color:#dc3545}.btn-save:not([disabled]){cursor:pointer}.icon{height:1.5em;width:1.5em}.section-title{font-size:30px;font-weight:300;-webkit-font-smoothing:antialiased}.svg-icon-check{color:#198754}.svg-icon-x{color:#dc3545}.outer-main{flex:var(--main-flex);padding-left:var(--padding-horizontal);padding-top:var(--padding-vertical)}.main{padding:3% 2% 5%;border:1.5px solid #343434;border-radius:4px;background-color:#141414}.replace-flex-inputs{display:flex;flex-direction:column;gap:10px;margin-top:10px}.replace-flex-inputs *{align-self:flex-start}button,input{display:flex;align-items:center;padding:.375rem .75rem;font-size:.9375rem;font-weight:400;line-height:1.5;color:#495057;white-space:nowrap;background-color:#e9ecef;border:1px solid #8f959e;border-radius:.25rem;font-family:inherit}button{text-align:center;background-color:#1177d1;color:#ccc;margin-top:10px}.container{display:flex;flex-direction:row;flex-wrap:wrap;width:100%;height:max-content}'),V(G(qe,{}),t);const n=document.createElement("link");n.rel="shortcut icon",n.href="/theme/image.php/classic/theme/1588340020/favicon",e.append(n)};
// ==UserScript==
// @name      Clean Moodle with Preact
// @version   3.3.0
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
le.extend(te).extend((e=>{e.prototype.popupLogin=Ne})),(e=>{try{(e=>{const t=GM_getValue(j),n=void 0===t?[-1,-1,-1]:O(t),o=Object.entries(e).map((([e,t])=>[O(e),t])).sort((([e],[t])=>D(e,t)));for(const[e,t]of o)D(n,e)<0&&t();GM_setValue(j,GM_info.script.version)})(e)}catch(e){console.error("Upgrading threw %o. Failing silently.",e)}})({"1.4.0":()=>{GM_deleteValue("lastValidatedToken"),GM_deleteValue("password")},"1.5.0"(){const e=GM_getValue("remove")??[],t=GM_getValue("replace")??{};for(const n of e)t[n]=!1;GM_setValue("overrides",t),GM_deleteValue("remove"),GM_deleteValue("replace")}}),"https:"!==location.protocol&&(location.protocol="https:");const We=new le,Ke=!/^\/cleanmoodle/i.test(location.pathname),Ye=()=>G("a",{href:"/cleanMoodle",target:"_blank",rel:"noreferrer noopener",onClick:e=>{e.stopPropagation()},children:G("svg",{style:{marginLeft:"0.2em"},fill:"currentColor",class:"icon svg-icon-gear",viewBox:"0 0 16 16",children:G("path",{d:"M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 014.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 01-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 011.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 012.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 012.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 011.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 01-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 018.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 001.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 00.52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 00-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 00-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 00-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 00-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 00.52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 001.255-.52l.094-.319zM8 5.754a2.246 2.246 0 100 4.492 2.246 2.246 0 000-4.492zM4.754 8a3.246 3.246 0 116.492 0 3.246 3.246 0 01-6.492 0z"})})}),Je=e=>R()?.querySelector(`a[href$="/course/view.php?id=${e}"]`),Qe=async e=>{let t;try{t=await We.getCourses()}catch{await We.popupLogin("Clean Moodle"),t=await We.getCourses()}t.some((t=>String(t.id)===e))||(Oe(e),alert(`You appear to not be in the course with the id "${e}" anymore.\nThe course will not be checked for anymore`))},Xe=(e,t)=>{const n=Je(e);if(!n)return void Qe(e);const o=t??n.title;if(0===n.childElementCount)n.textContent=o;else{const e=n.querySelector("span.item-content-wrap");e&&(e.textContent=o)}},Ze=(e,t)=>{const n=Je(e);if(n){const e=n.closest("li.type_course"),o=e?.classList;o&&!o.contains("current_branch")&&(o.toggle("hide",!t),o.toggle("hidden",!t))}else Qe(e)},et=()=>{const e=R();if(!e)return;const t=[...e.querySelectorAll(":scope > li.type_course")];t.sort(((e,t)=>{const n=e.firstElementChild?.textContent,o=t.firstElementChild?.textContent;if(!n||!o)throw new Error("aText or bText was undefined");return T.compare(n.trim(),o.trim())})),e.prepend(...t)},tt=(e,t)=>{Ze(e,!1!==t),Xe(e,!1===t?void 0:t)},nt=()=>{if(!R())return;const e=Ge();for(const[t,n]of Object.entries(e))tt(t,n);et()},ot=()=>{const e=R();if(GM_registerMenuCommand("Open settings",(()=>{open("/cleanMoodle")})),e){nt(),GM_addValueChangeListener("overrides",((e,t,n,o)=>{if(o)if(t){for(const e of Object.keys(t))e in n||(Xe(e,void 0),Ze(e,!0));for(const[e,o]of Object.entries(n))o!==t[e]&&tt(e,o);et()}else nt()}));const t=e.previousSibling;if(t instanceof HTMLParagraphElement){const e=document.createElement("span");t.append(e),V(G(Ye,{}),e)}}};if(!/^\/customicons/i.test(location.pathname)){rt=Ke?ot:Be,"interactive"!==document.readyState&&"complete"!==document.readyState?document.addEventListener("DOMContentLoaded",rt,{once:!0}):rt()}var rt})();