(()=>{"use strict";var e,t,n,o,r,i,s={},l=[],a=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function c(e,t){for(var n in t)e[n]=t[n];return e}function u(e){var t=e.parentNode;t&&t.removeChild(e)}function d(t,n,o){var r,i,s,l={};for(s in n)"key"==s?r=n[s]:"ref"==s?i=n[s]:l[s]=n[s];if(arguments.length>2&&(l.children=arguments.length>3?e.call(arguments,2):o),"function"==typeof t&&null!=t.defaultProps)for(s in t.defaultProps)void 0===l[s]&&(l[s]=t.defaultProps[s]);return _(t,l,r,i,null)}function _(e,o,r,i,s){var l={type:e,props:o,key:r,ref:i,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==s?++n:s};return null==s&&null!=t.vnode&&t.vnode(l),l}function p(e){return e.children}function h(e,t){this.props=e,this.context=t}function f(e,t){if(null==t)return e.__?f(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?f(e):null}function m(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return m(e)}}function v(e){(!e.__d&&(e.__d=!0)&&o.push(e)&&!g.__r++||r!==t.debounceRendering)&&((r=t.debounceRendering)||i)(g)}function g(){var e,t,n,r,i,s,l,a;for(o.sort((function(e,t){return e.__v.__b-t.__v.__b}));e=o.shift();)e.__d&&(t=o.length,r=void 0,i=void 0,l=(s=(n=e).__v).__e,(a=n.__P)&&(r=[],(i=c({},s)).__v=s.__v+1,I(a,s,i,n.__n,void 0!==a.ownerSVGElement,null!=s.__h?[l]:null,r,null==l?f(s):l,s.__h),U(r,s),s.__e!=l&&m(s)),o.length>t&&o.sort((function(e,t){return e.__v.__b-t.__v.__b})));g.__r=0}function y(e,t,n,o,r,i,a,c,u,d){var h,m,v,g,y,x,C,S=o&&o.__k||l,L=S.length;for(n.__k=[],h=0;h<t.length;h++)if(null!=(g=n.__k[h]=null==(g=t[h])||"boolean"==typeof g?null:"string"==typeof g||"number"==typeof g||"bigint"==typeof g?_(null,g,null,null,g):Array.isArray(g)?_(p,{children:g},null,null,null):g.__b>0?_(g.type,g.props,g.key,g.ref?g.ref:null,g.__v):g)){if(g.__=n,g.__b=n.__b+1,null===(v=S[h])||v&&g.key==v.key&&g.type===v.type)S[h]=void 0;else for(m=0;m<L;m++){if((v=S[m])&&g.key==v.key&&g.type===v.type){S[m]=void 0;break}v=null}I(e,g,v=v||s,r,i,a,c,u,d),y=g.__e,(m=g.ref)&&v.ref!=m&&(C||(C=[]),v.ref&&C.push(v.ref,null,g),C.push(m,g.__c||y,g)),null!=y?(null==x&&(x=y),"function"==typeof g.type&&g.__k===v.__k?g.__d=u=b(g,u,e):u=w(e,g,v,S,y,u),"function"==typeof n.type&&(n.__d=u)):u&&v.__e==u&&u.parentNode!=e&&(u=f(v))}for(n.__e=x,h=L;h--;)null!=S[h]&&("function"==typeof n.type&&null!=S[h].__e&&S[h].__e==n.__d&&(n.__d=k(o).nextSibling),P(S[h],S[h]));if(C)for(h=0;h<C.length;h++)M(C[h],C[++h],C[++h])}function b(e,t,n){for(var o,r=e.__k,i=0;r&&i<r.length;i++)(o=r[i])&&(o.__=e,t="function"==typeof o.type?b(o,t,n):w(n,o,o,r,o.__e,t));return t}function w(e,t,n,o,r,i){var s,l,a;if(void 0!==t.__d)s=t.__d,t.__d=void 0;else if(null==n||r!=i||null==r.parentNode)e:if(null==i||i.parentNode!==e)e.appendChild(r),s=null;else{for(l=i,a=0;(l=l.nextSibling)&&a<o.length;a+=1)if(l==r)break e;e.insertBefore(r,i),s=i}return void 0!==s?s:r.nextSibling}function k(e){var t,n,o;if(null==e.type||"string"==typeof e.type)return e.__e;if(e.__k)for(t=e.__k.length-1;t>=0;t--)if((n=e.__k[t])&&(o=k(n)))return o;return null}function x(e,t,n){"-"===t[0]?e.setProperty(t,null==n?"":n):e[t]=null==n?"":"number"!=typeof n||a.test(t)?n:n+"px"}function C(e,t,n,o,r){var i;e:if("style"===t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof o&&(e.style.cssText=o=""),o)for(t in o)n&&t in n||x(e.style,t,"");if(n)for(t in n)o&&n[t]===o[t]||x(e.style,t,n[t])}else if("o"===t[0]&&"n"===t[1])i=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+i]=n,n?o||e.addEventListener(t,i?L:S,i):e.removeEventListener(t,i?L:S,i);else if("dangerouslySetInnerHTML"!==t){if(r)t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("width"!==t&&"height"!==t&&"href"!==t&&"list"!==t&&"form"!==t&&"tabIndex"!==t&&"download"!==t&&t in e)try{e[t]=null==n?"":n;break e}catch(e){}"function"==typeof n||(null==n||!1===n&&-1==t.indexOf("-")?e.removeAttribute(t):e.setAttribute(t,n))}}function S(e){return this.l[e.type+!1](t.event?t.event(e):e)}function L(e){return this.l[e.type+!0](t.event?t.event(e):e)}function I(e,n,o,r,i,s,l,a,u){var d,_,f,m,v,g,b,w,k,x,C,S,L,I,U,M=n.type;if(void 0!==n.constructor)return null;null!=o.__h&&(u=o.__h,a=n.__e=o.__e,n.__h=null,s=[a]),(d=t.__b)&&d(n);try{e:if("function"==typeof M){if(w=n.props,k=(d=M.contextType)&&r[d.__c],x=d?k?k.props.value:d.__:r,o.__c?b=(_=n.__c=o.__c).__=_.__E:("prototype"in M&&M.prototype.render?n.__c=_=new M(w,x):(n.__c=_=new h(w,x),_.constructor=M,_.render=R),k&&k.sub(_),_.props=w,_.state||(_.state={}),_.context=x,_.__n=r,f=_.__d=!0,_.__h=[],_._sb=[]),null==_.__s&&(_.__s=_.state),null!=M.getDerivedStateFromProps&&(_.__s==_.state&&(_.__s=c({},_.__s)),c(_.__s,M.getDerivedStateFromProps(w,_.__s))),m=_.props,v=_.state,_.__v=n,f)null==M.getDerivedStateFromProps&&null!=_.componentWillMount&&_.componentWillMount(),null!=_.componentDidMount&&_.__h.push(_.componentDidMount);else{if(null==M.getDerivedStateFromProps&&w!==m&&null!=_.componentWillReceiveProps&&_.componentWillReceiveProps(w,x),!_.__e&&null!=_.shouldComponentUpdate&&!1===_.shouldComponentUpdate(w,_.__s,x)||n.__v===o.__v){for(n.__v!==o.__v&&(_.props=w,_.state=_.__s,_.__d=!1),_.__e=!1,n.__e=o.__e,n.__k=o.__k,n.__k.forEach((function(e){e&&(e.__=n)})),C=0;C<_._sb.length;C++)_.__h.push(_._sb[C]);_._sb=[],_.__h.length&&l.push(_);break e}null!=_.componentWillUpdate&&_.componentWillUpdate(w,_.__s,x),null!=_.componentDidUpdate&&_.__h.push((function(){_.componentDidUpdate(m,v,g)}))}if(_.context=x,_.props=w,_.__P=e,S=t.__r,L=0,"prototype"in M&&M.prototype.render){for(_.state=_.__s,_.__d=!1,S&&S(n),d=_.render(_.props,_.state,_.context),I=0;I<_._sb.length;I++)_.__h.push(_._sb[I]);_._sb=[]}else do{_.__d=!1,S&&S(n),d=_.render(_.props,_.state,_.context),_.state=_.__s}while(_.__d&&++L<25);_.state=_.__s,null!=_.getChildContext&&(r=c(c({},r),_.getChildContext())),f||null==_.getSnapshotBeforeUpdate||(g=_.getSnapshotBeforeUpdate(m,v)),U=null!=d&&d.type===p&&null==d.key?d.props.children:d,y(e,Array.isArray(U)?U:[U],n,o,r,i,s,l,a,u),_.base=n.__e,n.__h=null,_.__h.length&&l.push(_),b&&(_.__E=_.__=null),_.__e=!1}else null==s&&n.__v===o.__v?(n.__k=o.__k,n.__e=o.__e):n.__e=E(o.__e,n,o,r,i,s,l,u);(d=t.diffed)&&d(n)}catch(e){n.__v=null,(u||null!=s)&&(n.__e=a,n.__h=!!u,s[s.indexOf(a)]=null),t.__e(e,n,o)}}function U(e,n){t.__c&&t.__c(n,e),e.some((function(n){try{e=n.__h,n.__h=[],e.some((function(e){e.call(n)}))}catch(e){t.__e(e,n.__v)}}))}function E(t,n,o,r,i,l,a,c){var d,_,p,h=o.props,m=n.props,v=n.type,g=0;if("svg"===v&&(i=!0),null!=l)for(;g<l.length;g++)if((d=l[g])&&"setAttribute"in d==!!v&&(v?d.localName===v:3===d.nodeType)){t=d,l[g]=null;break}if(null==t){if(null===v)return document.createTextNode(m);t=i?document.createElementNS("http://www.w3.org/2000/svg",v):document.createElement(v,m.is&&m),l=null,c=!1}if(null===v)h===m||c&&t.data===m||(t.data=m);else{if(l=l&&e.call(t.childNodes),_=(h=o.props||s).dangerouslySetInnerHTML,p=m.dangerouslySetInnerHTML,!c){if(null!=l)for(h={},g=0;g<t.attributes.length;g++)h[t.attributes[g].name]=t.attributes[g].value;(p||_)&&(p&&(_&&p.__html==_.__html||p.__html===t.innerHTML)||(t.innerHTML=p&&p.__html||""))}if(function(e,t,n,o,r){var i;for(i in n)"children"===i||"key"===i||i in t||C(e,i,null,n[i],o);for(i in t)r&&"function"!=typeof t[i]||"children"===i||"key"===i||"value"===i||"checked"===i||n[i]===t[i]||C(e,i,t[i],n[i],o)}(t,m,h,i,c),p)n.__k=[];else if(g=n.props.children,y(t,Array.isArray(g)?g:[g],n,o,r,i&&"foreignObject"!==v,l,a,l?l[0]:o.__k&&f(o,0),c),null!=l)for(g=l.length;g--;)null!=l[g]&&u(l[g]);c||("value"in m&&void 0!==(g=m.value)&&(g!==t.value||"progress"===v&&!g||"option"===v&&g!==h.value)&&C(t,"value",g,h.value,!1),"checked"in m&&void 0!==(g=m.checked)&&g!==t.checked&&C(t,"checked",g,h.checked,!1))}return t}function M(e,n,o){try{"function"==typeof e?e(n):e.current=n}catch(e){t.__e(e,o)}}function P(e,n,o){var r,i;if(t.unmount&&t.unmount(e),(r=e.ref)&&(r.current&&r.current!==e.__e||M(r,null,n)),null!=(r=e.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(e){t.__e(e,n)}r.base=r.__P=null,e.__c=void 0}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&P(r[i],n,o||"function"!=typeof e.type);o||null==e.__e||u(e.__e),e.__=e.__e=e.__d=void 0}function R(e,t,n){return this.constructor(e,n)}function H(n,o,r){var i,l,a;t.__&&t.__(n,o),l=(i="function"==typeof r)?null:r&&r.__k||o.__k,a=[],I(o,n=(!i&&r||o).__k=d(p,null,[n]),l||s,s,void 0!==o.ownerSVGElement,!i&&r?[r]:l?null:o.firstChild?e.call(o.childNodes):null,a,!i&&r?r:l?l.__e:o.firstChild,i),U(a,n)}e=l.slice,t={__e:function(e,t,n,o){for(var r,i,s;t=t.__;)if((r=t.__c)&&!r.__)try{if((i=r.constructor)&&null!=i.getDerivedStateFromError&&(r.setState(i.getDerivedStateFromError(e)),s=r.__d),null!=r.componentDidCatch&&(r.componentDidCatch(e,o||{}),s=r.__d),s)return r.__E=r}catch(t){e=t}throw e}},n=0,h.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=c({},this.state),"function"==typeof e&&(e=e(c({},n),this.props)),e&&c(n,e),null!=e&&this.__v&&(t&&this._sb.push(t),v(this))},h.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),v(this))},h.prototype.render=p,o=[],i="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,g.__r=0;var N=function(e,t,n,o){var r;t[0]=0;for(var i=1;i<t.length;i++){var s=t[i++],l=t[i]?(t[0]|=s?1:2,n[t[i++]]):t[++i];3===s?o[0]=l:4===s?o[1]=Object.assign(o[1]||{},l):5===s?(o[1]=o[1]||{})[t[++i]]=l:6===s?o[1][t[++i]]+=l+"":s?(r=e.apply(l,N(e,l,n,["",null])),o.push(r),l[0]?t[0]|=2:(t[i-2]=0,t[i]=r)):o.push(l)}return o},O=new Map;var T=function(e){var t=O.get(this);return t||(t=new Map,O.set(this,t)),(t=N(this,t.get(e)||(t.set(e,t=function(e){for(var t,n,o=1,r="",i="",s=[0],l=function(e){1===o&&(e||(r=r.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?s.push(0,e,r):3===o&&(e||r)?(s.push(3,e,r),o=2):2===o&&"..."===r&&e?s.push(4,e,0):2===o&&r&&!e?s.push(5,0,!0,r):o>=5&&((r||!e&&5===o)&&(s.push(o,0,r,n),o=6),e&&(s.push(o,e,0,n),o=6)),r=""},a=0;a<e.length;a++){a&&(1===o&&l(),l(a));for(var c=0;c<e[a].length;c++)t=e[a][c],1===o?"<"===t?(l(),s=[s],o=3):r+=t:4===o?"--"===r&&">"===t?(o=1,r=""):r=t+r[0]:i?t===i?i="":r+=t:'"'===t||"'"===t?i=t:">"===t?(l(),o=1):o&&("="===t?(o=5,n=r,r=""):"/"===t&&(o<5||">"===e[a][c+1])?(l(),3===o&&(s=s[0]),o=s,(s=s[0]).push(2,0,o),o=0):" "===t||"\t"===t||"\n"===t||"\r"===t?(l(),o=2):r+=t),3===o&&"!--"===r&&(o=4,s=s[0])}return l(),s}(e)),t),arguments,[])).length>1?t:t[0]}.bind(d);const V=()=>document.querySelector('#page-content li.type_system.depth_2 > ul[role="group"]'),j=new Intl.Collator(void 0,{sensitivity:"base",numeric:!0}),A=e=>{if(!/^\d+\.\d+\.\d+$/.test(e))throw new Error(`Invalid version: ${e}.`);const[t,n,o]=e.split(".").map(Number);return[t,n,o]},F=(e,t)=>e-t,G=(e,t)=>F(e[0],t[0])||F(e[1],t[1])||F(e[2],t[2]),B="lastUpgraded",D=e=>[()=>GM_getValue(e),t=>{GM_setValue(e,t)},()=>{GM_deleteValue(e)}],[$,q,z]=D("token"),[W,X,Y]=D("username");Symbol("getCourseContent");const J=Symbol("getUserId");async function K(){const e=this._readCache(J);if(void 0!==e)return e;const t=await this.login(),n=new URLSearchParams({wsfunction:"core_webservice_get_site_info",wstoken:t}),o=await fetch(this.resolveUrl("/webservice/rest/server.php?moodlewsrestformat=json"),{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:n.toString()});if(!o.ok)throw new Error(`Response was not ok: ${o.status}`);const r=await o.json();if("exception"in r)throw this.logout(),new Error("token was undefined");return this._writeCache(J,r.userid)}const Q=e=>{e.prototype.getUserId=K},Z=Symbol("getCourses");async function ee(e=!1){const t=this._readCache(Z);if(t&&!e)return t;const n=await this.getUserId(),o=await this.login(),r=new URLSearchParams({"requests[0][function]":"core_enrol_get_users_courses","requests[0][arguments]":JSON.stringify({userid:n,returnusercount:!1}),wstoken:o,wsfunction:"tool_mobile_call_external_functions",moodlewsrestformat:"json"}),i=await fetch(this.resolveUrl("/webservice/rest/server.php"),{method:"POST",body:r.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}});if(!i.ok)throw new Error(`Response was not ok: ${i.status}`);const s=await i.json();if("exception"in s||s.responses[0].error)throw this.logout(),new Error("Token was invalid");const l=JSON.parse(s.responses[0].data),a=[];for(const{id:e,fullname:t}of l)a.push({id:e,name:t});return this._writeCache(Z,a)}const te=e=>{e.prototype.getCourses=ee,e.extend(Q)};class ne extends Error{constructor(){super("No credentials provided.")}}class oe extends Error{constructor(){super("Invalid credentials.")}}class re extends Error{constructor(e){super(`${e} not included`)}}let ie=new URL("http://localhost/");"undefined"!=typeof location?ie=new URL("/",location.href):"undefined"!=typeof process&&"string"==typeof process.env.MOODLE_BASE_URL&&(ie=new URL(process.env.MOODLE_BASE_URL));class se{static extend(e){return e(se),se}baseUrl=ie;credentials={token:$(),username:W()};#e=new Map;resolveUrl=e=>new URL(e,this.baseUrl);_readCache(e){return this.#e.get(e)}_writeCache(e,t){return this.#e.set(e,t),t}async login(e){const{credentials:t}=this;if(e&&(t.username=e.username,t.password=e.password,X(e.username)),t.token)return t.token;const{username:n,password:o}=t;if(!n||!o)throw new ne;const r=new URLSearchParams({username:n,password:o,service:"moodle_mobile_app"}),i=await fetch(this.resolveUrl("/login/token.php"),{method:"POST",body:r.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}});if(!i.ok)throw new Error(`Response was not ok: ${i.status}`);const s=await i.json();if("errorcode"in s)throw this.logout(),new oe;const{token:l}=s;return q(l),t.token=l,l}logout(){delete this.credentials.token,z(),delete this.credentials.password}async getCourses(e){throw new re("getCourses")}async getUserId(){throw new re("getUserId")}async popupLogin(e){throw new re("popupLogin")}async getCourseContent(e,t){throw new re("getCourseContent")}}var le=0;function ae(e,n,o,r,i,s){var l,a,c={};for(a in n)"ref"==a?l=n[a]:c[a]=n[a];var u={type:e,props:c,key:o,ref:l,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:--le,__source:i,__self:s};if("function"==typeof e&&(l=e.defaultProps))for(a in l)void 0===c[a]&&(c[a]=l[a]);return t.vnode&&t.vnode(u),u}var ce,ue,de,_e,pe=0,he=[],fe=[],me=t.__b,ve=t.__r,ge=t.diffed,ye=t.__c,be=t.unmount;function we(e,n){t.__h&&t.__h(ue,e,pe||n),pe=0;var o=ue.__H||(ue.__H={__:[],__h:[]});return e>=o.__.length&&o.__.push({__V:fe}),o.__[e]}function ke(e){return pe=1,function(e,t,n){var o=we(ce++,2);if(o.t=e,!o.__c&&(o.__=[n?n(t):Pe(void 0,t),function(e){var t=o.__N?o.__N[0]:o.__[0],n=o.t(t,e);t!==n&&(o.__N=[n,o.__[1]],o.__c.setState({}))}],o.__c=ue,!ue.u)){ue.u=!0;var r=ue.shouldComponentUpdate;ue.shouldComponentUpdate=function(e,t,n){if(!o.__c.__H)return!0;var i=o.__c.__H.__.filter((function(e){return e.__c}));if(i.every((function(e){return!e.__N})))return!r||r.call(this,e,t,n);var s=!1;return i.forEach((function(e){if(e.__N){var t=e.__[0];e.__=e.__N,e.__N=void 0,t!==e.__[0]&&(s=!0)}})),!(!s&&o.__c.props===e)&&(!r||r.call(this,e,t,n))}}return o.__N||o.__}(Pe,e)}function xe(e){return pe=5,Ce((function(){return{current:e}}),[])}function Ce(e,t){var n=we(ce++,7);return Me(n.__H,t)?(n.__V=e(),n.i=t,n.__h=e,n.__V):n.__}function Se(){for(var e;e=he.shift();)if(e.__P&&e.__H)try{e.__H.__h.forEach(Ue),e.__H.__h.forEach(Ee),e.__H.__h=[]}catch(n){e.__H.__h=[],t.__e(n,e.__v)}}t.__b=function(e){ue=null,me&&me(e)},t.__r=function(e){ve&&ve(e),ce=0;var t=(ue=e.__c).__H;t&&(de===ue?(t.__h=[],ue.__h=[],t.__.forEach((function(e){e.__N&&(e.__=e.__N),e.__V=fe,e.__N=e.i=void 0}))):(t.__h.forEach(Ue),t.__h.forEach(Ee),t.__h=[])),de=ue},t.diffed=function(e){ge&&ge(e);var n=e.__c;n&&n.__H&&(n.__H.__h.length&&(1!==he.push(n)&&_e===t.requestAnimationFrame||((_e=t.requestAnimationFrame)||Ie)(Se)),n.__H.__.forEach((function(e){e.i&&(e.__H=e.i),e.__V!==fe&&(e.__=e.__V),e.i=void 0,e.__V=fe}))),de=ue=null},t.__c=function(e,n){n.some((function(e){try{e.__h.forEach(Ue),e.__h=e.__h.filter((function(e){return!e.__||Ee(e)}))}catch(o){n.some((function(e){e.__h&&(e.__h=[])})),n=[],t.__e(o,e.__v)}})),ye&&ye(e,n)},t.unmount=function(e){be&&be(e);var n,o=e.__c;o&&o.__H&&(o.__H.__.forEach((function(e){try{Ue(e)}catch(e){n=e}})),o.__H=void 0,n&&t.__e(n,o.__v))};var Le="function"==typeof requestAnimationFrame;function Ie(e){var t,n=function(){clearTimeout(o),Le&&cancelAnimationFrame(t),setTimeout(e)},o=setTimeout(n,100);Le&&(t=requestAnimationFrame(n))}function Ue(e){var t=ue,n=e.__c;"function"==typeof n&&(e.__c=void 0,n()),ue=t}function Ee(e){var t=ue;e.__c=e.__(),ue=t}function Me(e,t){return!e||e.length!==t.length||t.some((function(t,n){return t!==e[n]}))}function Pe(e,t){return"function"==typeof t?t(e):t}const Re=({cb:e,title:t,moodle:n})=>{const o=xe(null),r=xe(null),[i,s]=ke(!0),[l,a]=ke({username:!0,password:!0});return i?ae("div",{class:"vertical-horizontal-center",children:ae("form",{onSubmit:async t=>{t.preventDefault(),t.stopImmediatePropagation();const i=o.current?.value.trim(),l=r.current?.value;if(a({password:Boolean(l),username:Boolean(i)}),i&&l){s(!1);try{const t=await n.login({username:i,password:l});e(t)}catch{s(!0)}}},children:ae("div",{class:"card shadow",children:[ae("div",{class:"card-body",children:[ae("h5",{class:"card-title",children:["Login - ",t]}),ae("div",{class:"mb-3",children:[ae("label",{htmlFor:"popup-username",class:"form-label",children:"Username"}),ae("input",{ref:o,required:!0,defaultValue:W(),id:"popup-username",placeholder:"Username",class:"form-control"+(l.username?"":" is-invalid"),onInput:()=>{a((e=>({...e,username:!0})))}})]}),ae("div",{class:"mb-3",children:[ae("label",{htmlFor:"popup-password",class:"form-label",children:"Password"}),ae("input",{ref:r,required:!0,id:"popup-password",placeholder:"Password",class:"form-control"+(l.password?"":" is-invalid"),type:"password",onInput:()=>{a((e=>({...e,password:!0})))}})]})]}),ae("button",{class:"btn btn-primary",type:"submit",children:"Login"})]})})}):null},He=async function(e){return new Promise((t=>{const n=GM_addStyle(".login-popup-userscript .vertical-horizontal-center{width:100%;height:100%;position:fixed;z-index:100000000;top:0;left:0;display:flex;align-items:center;justify-content:center;pointer-events:none}.login-popup-userscript .card{pointer-events:auto}"),o=document.createElement("div");o.className="login-popup-userscript",document.body.append(o),H(ae(Re,{cb:e=>{H(null,o),n.remove(),o.remove(),t(e)},title:e,moodle:this}),o)}))},Ne="icons",Oe=e=>{const{pointers:t,values:n}=Fe();delete t[e];const o=new Set(Object.values(t));for(const e of Object.keys(n))o.has(e)||delete n[e];Ge({pointers:t,values:n})},Te=()=>Fe().pointers,Ve=(e,t)=>{const n=Te();n[e]=t,Ge({pointers:n})},je=()=>Fe().values,Ae=e=>{const t=Te()[e];if(!t)return;const n=je()[t];return n||void 0},Fe=()=>GM_getValue(Ne)??{pointers:{},values:{}},Ge=e=>{const t={...Fe(),...e};GM_setValue(Ne,t)},Be=(e,t)=>{Oe(e);const n=crypto.randomUUID();((e,t)=>{const n=je();n[e]=t,Ge({values:n})})(n,t),Ve(e,n)};se.extend(te);const De=({class:e,...t})=>ae("svg",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",class:"svg-icon svg-icon-x"+(e?` ${e}`:""),viewBox:"0 0 24 24",...t,children:ae("path",{d:"M24 0 0 24M0 0l24 24"})}),$e=({icon:e})=>e?e.rawXML?ae("span",{class:"icon",children:T(Object.assign([e.rawXML],{raw:[e.rawXML]}))}):e.dataURI?ae("img",{class:"icon",src:e.dataURI}):null:null,qe=({content:e,cb:n})=>{const o=xe(null);return function(e,n){var o=we(ce++,3);!t.__s&&Me(o.__H,n)&&(o.__=e,o.i=n,ue.__H.__h.push(o))}((()=>{void 0!==e&&scroll({top:0,left:0,behavior:"smooth"})}),[e]),e?ae("div",{class:"outer-notification",onClick:e=>{e.currentTarget===e.target&&n()},children:ae("div",{ref:o,class:"inner-notification",children:[ae(De,{class:"svg-close",onClick:()=>{n()}}),ae("div",{class:"notification-string",children:e})]})}):null},ze=({cb:e})=>{const t=xe(null),n=xe(null);return ae("div",{class:"outer-main",children:ae("div",{class:"main",children:ae("form",{onSubmit:o=>{o.preventDefault();const r=t.current?.value.trim(),i=n.current?.value;void 0!==r&&void 0!==i&&e({username:r,password:i})},children:ae("div",{class:"replace-flex-inputs",children:[ae("h2",{children:"Login"}),ae("input",{ref:t,placeholder:"Username"}),ae("input",{ref:n,placeholder:"Password",type:"password"}),ae("button",{class:"btn-save",type:"submit",children:"Login"})]})})})})};class We extends h{state={selected:3};refs_={form:{current:null},url:{current:null},file:{current:null},copy:{current:null}};render(){const{refs_:e,props:t,handleInput:n,resetForm:o}=this,{selected:r}=this.state,{selectedCourse:i,courses:s}=t,l=e.file.current?.files?.[0];return ae("div",{class:"outer-main",children:ae("div",{class:"main",children:ae("form",{ref:e.form,children:[ae("h2",{children:"Change or add an icon"}),ae("div",i?{ref:e=>{e?.scrollIntoView({behavior:"smooth",block:"center"})},children:[ae($e,{icon:i.icon}),ae("span",{children:i.name})]}:{children:"Select course to the left"}),ae("h3",{children:"Upload image from URL"}),ae("input",{ref:e.url,type:"url",placeholder:"Image url",disabled:2!==r&&3!==r,onInput:e=>{n(2,e)}}),ae("h3",{children:"Upload image from file"}),ae("input",{ref:e.file,hidden:!0,type:"file",onInput:e=>{n(0,e)}}),ae("button",{type:"button",disabled:0!==r&&3!==r,onClick:()=>{e.file.current?.click()},children:0===r&&l?ae(p,{children:[l.name,ae(De,{class:"svg-clear",onClick:e=>{e.stopPropagation(),o()}})]}):"Upload file"}),ae("h3",{children:"Copy image from other course"}),ae("select",{ref:e.copy,disabled:1!==r&&3!==r,onInput:e=>{n(1,e)},children:[ae("option",{selected:!0,value:"null",children:"Select course to copy icon from"}),s.map((({id:e,icon:t,name:n})=>t&&e!==i?.id&&ae("option",{value:e,children:n},e)))]}),ae("button",{class:"btn-save",type:"button",disabled:3===r||void 0===i,onClick:this.save,children:"Save"})]})})})}resetForm=()=>{this.refs_.form.current?.reset(),this.setState({selected:3})};handleInput=(e,t)=>{let n=!1;const o=t.currentTarget;1===e||2===e?n=""!==o.value:0===e&&o instanceof HTMLInputElement&&(n=null!==o.files&&o.files.length>0),this.setState({selected:n?e:3})};resetSelected=()=>{this.props.resetSelected(),this.resetForm()};save=()=>{const{notify:e,selectedCourse:t}=this.props;if(void 0!==t)switch(this.state.selected){case 3:e("You have not submitted an icon");break;case 1:{const n=this.refs_.copy.current?.value;n?this.saveByCopy(n,t):e("You have not submitted an icon");break}case 0:{const n=this.refs_.file.current?.files?.[0];n?this.saveWithFileHandler(n,t):e("You have not submitted an icon");break}case 2:{const n=this.refs_.url.current?.value;n?this.saveByURL(n,t):e("Invalid URL submitted");break}}else e("You have not selected a course")};saveByURL=(e,t)=>{const{notify:n}=this.props;let o;try{o=new URL(e)}catch{return void n("Invalid URL submitted")}GM_xmlhttpRequest({method:"GET",url:o.href,timeout:15e3,responseType:"blob",anonymous:!0,onerror(){n("An error occured")},ontimeout(){n("Request timed out")},onload:e=>{var o,r;200===e.status&&e.response instanceof Blob?this.saveWithFileHandler(e.response,t):n((o=e.status,r=e.statusText,`Error ${o}: ${r}`))}})};saveWithFileHandler=(e,t)=>{const{notify:n}=this.props,{id:o}=t,r=new FileReader;if(r.addEventListener("error",(()=>{n("An error occured")})),"image/svg+xml"===e.type)return r.addEventListener("load",(()=>{const e=r.result;"string"==typeof e&&(Be(o,{rawXML:e}),this.props.updateCourseById(o),this.resetSelected())})),void r.readAsText(e);r.addEventListener("load",(()=>{const e=r.result;if("string"!=typeof e)return;const t=new Image;t.addEventListener("error",(()=>{n("File was not an image")})),t.addEventListener("load",(()=>{const t=/^data:[\w+/]+;base64,(?<data>.+)$/.exec(e)?.groups;if(!t)return;t.data?(Be(o,{dataURI:e}),this.props.updateCourseById(o),this.resetSelected()):n("Could not extract data from data URI")})),t.src=e})),r.readAsDataURL(e)};saveByCopy=(e,t)=>{const{id:n}=t;((e,t)=>{Oe(e);const n=Te()[t];void 0!==n&&Ve(e,n)})(n,e),this.resetSelected(),this.props.updateCourseById(n)}}const Xe=({courses:e,resetIcon:t,isCoursesLoading:n,selectCourse:o})=>ae("div",{class:"outer-sidebar",children:ae("div",{class:"sidebar",children:n?ae("div",{class:"row",children:"Loading courses..."}):e.map((({id:e,name:n,icon:r})=>ae("div",{class:"row",onClick:()=>{o(e)},children:[ae($e,{icon:r}),r&&ae(De,{class:"svg-del-icon",onClick:n=>{n.stopPropagation(),t(e)}}),ae("span",{children:n})]},e)))})});class Ye extends h{state={loggedOut:!1,courses:[],selectedCourse:void 0,isCoursesLoading:!0,notification:void 0};moodle=new se;render(){const{resetIcon:e,selectCourse:t,loggedOutCallback:n,updateCourseById:o,resetSelected:r,notify:i}=this,{loggedOut:s,selectedCourse:l,courses:a,isCoursesLoading:c,notification:u}=this.state;return ae(p,{children:[ae(qe,{cb:()=>{i(void 0)},content:u}),ae("div",{class:"container"+(void 0===u?"":" blur"),children:[ae(Xe,{courses:a,resetIcon:e,isCoursesLoading:c,selectCourse:t}),s?ae(ze,{cb:n}):ae(We,{updateCourseById:o,courses:a,selectedCourse:l,resetSelected:r,notify:i})]})]})}componentDidMount(){this.tryLogin(),document.addEventListener("keydown",(e=>{"Escape"===e.key&&this.notify(void 0)}))}notify=e=>{this.setState({notification:e})};resetIcon=e=>{Oe(e),this.updateCourseById(e),this.resetSelectedIfEqualId(e)};selectCourse=e=>{for(const t of this.state.courses)if(t.id===e){this.setState({selectedCourse:{...t}});break}};loggedOutCallback=e=>{this.setState({loggedOut:!1}),this.tryLogin(e)};tryLogin=e=>{this.moodle.login(e).then(this.onLogin,this.logout)};updateCourseById=e=>{const t=Ae(e);this.setState((({courses:n})=>{const o=[...n];for(const[r,i]of n.entries())if(i.id===e){o[r]={...i,icon:t};break}return{courses:o}}))};resetSelected=()=>{this.setState({selectedCourse:void 0})};resetSelectedIfEqualId=e=>{this.state.selectedCourse?.id===e&&this.resetSelected()};logout=()=>{this.moodle.logout(),this.setState({loggedOut:!0})};onLogin=async()=>{await this.getCourses()};getCourses=async()=>{let e;try{e=await this.moodle.getCourses()}catch{return void this.logout()}const t=[];for(const{id:n,name:o}of e)t.push({id:String(n),name:o,icon:Ae(String(n))});(e=>{e.sort((({name:e,id:t},{name:n,id:o})=>(e=e.trim(),n=n.trim(),j.compare(e,n)||Number(o)-Number(t))))})(t),this.setState({courses:t,isCoursesLoading:!1})}}const Je=()=>{"https:"!==location.protocol&&(location.protocol="https:");const{body:e,head:t}=document;for(;e.lastChild;)e.lastChild.remove();for(;t.lastChild;)t.lastChild.remove();const n=document.createElement("link");n.rel="shortcut icon",n.href="/theme/image.php/classic/theme/1606210545/favicon",t.append(n),document.title="Custom Icons Setup",history.replaceState({},"","/customIconsPreact"),GM_addStyle('*,::after,::before{box-sizing:border-box}blockquote,body,dd,dl,figure,h1,h2,h3,h4,p{margin:0}ol[role=list],ul[role=list]{list-style:none}html:focus-within{scroll-behavior:smooth}body{min-height:100vh;text-rendering:optimizeSpeed;line-height:1.5}a:not([class]){text-decoration-skip-ink:auto}img,picture{max-width:100%;display:block}textarea{font:inherit}@media (prefers-reduced-motion:reduce){html:focus-within{scroll-behavior:auto}*,::after,::before{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}html{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";background:#202020;color:#ccc;font-size:.9375rem;font-weight:400;line-height:1.5;user-select:none}@media (min-width:0px){:root{--sidebar-flex: 0 0 100%;--main-flex: 0 0 100%;--padding-horizontal: 0;--padding-vertical: 0.5%}}@media (min-width:768px){:root{--sidebar-flex: 0 0 32%;--main-flex: 0 0 68%;--padding-horizontal: 0.5%;--padding-vertical: 0}}@media (min-width:992px){:root{--sidebar-flex: 0 0 25%;--main-flex: 0 0 75%}}@media (min-width:1200px){:root{--sidebar-flex: 0 0 20%;--main-flex: 0 0 80%}}.outer-sidebar{flex:var(--sidebar-flex);padding-right:var(--padding-horizontal);padding-bottom:var(--padding-vertical)}.outer-sidebar .sidebar{display:flex;flex-direction:column;padding:10px 15px;border:1.5px solid #343434;border-radius:4px;background-color:#141414}.outer-sidebar .row{cursor:pointer}.outer-sidebar .row:hover{text-decoration:underline}.outer-sidebar .row .svg-icon-x,.outer-sidebar .row:hover .icon{display:none}.outer-sidebar .row:hover .svg-icon-x{display:initial}.outer-sidebar .row[data-removed=false]{color:#2ecc40}.outer-sidebar .row[data-removed=true],.svg-icon-x.svg-clear,.svg-icon-x.svg-del-icon{color:#ff4136}h2,h3{font-weight:300}h2{font-size:1.875rem}h3{font-size:1.64rem}input{margin-top:5px;width:220px}button,input,select{display:block;background:0 0;box-shadow:none;border:1.5px solid #343434;color:inherit;border-radius:2px;padding:5px 15px;max-width:100%;min-width:max-content;outline:0;font:inherit}button:disabled,input:disabled,select:disabled{color:gray}button[hidden],input[hidden],select[hidden]{display:none}select>option{color:#111}button,select{width:auto}button:enabled,select:enabled{cursor:pointer}.svg-icon-x{margin-left:5px;height:1em;width:1em;cursor:pointer}.svg-icon-x.svg-del-icon{margin-left:0;margin-right:5px}.svg-icon-x.svg-close{color:#111;grid-column-start:3;grid-row-start:1;margin-left:auto}.btn-save{margin-top:10px;display:block}.icon{height:1em;width:1em;margin-right:5px}.icon:not(span){fill:#ccc;stroke:#ccc;-moz-context-properties:fill,stroke}span.icon{display:inline-block}.outer-main{flex:var(--main-flex);padding-left:var(--padding-horizontal);padding-top:var(--padding-vertical)}.main{padding:1.25rem 2.25rem;border:1.5px solid #343434;border-radius:4px;background-color:#141414}.container{padding:1%;display:flex;flex-direction:row;flex-wrap:wrap;width:100%;height:max-content}.outer-notification{position:absolute;top:0;left:0;width:100%;min-height:100%;z-index:2}.notification-string,.outer-notification{display:flex;justify-content:center;align-items:center}.inner-notification{display:grid;grid-template-columns:1fr auto 1fr;grid-template-rows:1fr auto 1fr;justify-items:center;width:375px;height:300px;max-height:90vh;max-width:90vw;background:#fff;border:#ddd solid 2px;border-radius:4px;padding:1em}.notification-string{grid-area:2/2/3/3;text-align:center;color:#111}.blur{filter:blur(4px);overflow:hidden}'),H(ae(Ye,{}),e)};
// ==UserScript==
// @name      Custom Icons Preact
// @version   3.2.0
// @author    lusc
// @updateURL https://git.io/JXgei
// @match     *://moodle.*/*
// @match     *://moodle*.*/*
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
se.extend(te).extend((e=>{e.prototype.popupLogin=He}));const Ke=new se;(e=>{try{(e=>{const t=GM_getValue(B),n=void 0===t?[-1,-1,-1]:A(t),o=Object.entries(e).map((([e,t])=>[A(e),t])).sort((([e],[t])=>G(e,t)));for(const[e,t]of o)G(n,e)<0&&t();GM_setValue(B,GM_info.script.version)})(e)}catch(e){console.error("Upgrading threw %o. Failing silently.",e)}})({"1.3.0":()=>{GM_deleteValue("lastValidatedToken"),GM_deleteValue("password")},"1.4.0"(){GM_deleteValue("changed");const e=GM_getValue("pointers"),t=GM_getValue("values");e&&t&&Ge({pointers:e,values:t}),GM_deleteValue("pointers"),GM_deleteValue("values")}}),"https:"!==location.protocol&&(location.protocol="https:");const Qe=!/^\/customiconspreact/i.test(location.pathname),Ze=e=>V()?.querySelector(`a[href$="/course/view.php?id=${e}"]`),et=(e,t)=>{const n=Ze(e);if(n){if(!t){const n=Ae(e);if(!n)return tt(e),void Oe(e);t=n}if("rawXML"in t){const e=document.createElement("span");e.dataset.customIcon="true",e.classList.add("icon","navicon"),e.style.display="inline-block",e.style.color="var(--svg-fill, inherit)",e.tabIndex=-1,H(T(Object.assign([t.rawXML],{raw:[t.rawXML]})),e),n.prepend(e)}else{const e=new Image;e.dataset.customIcon="true",e.classList.add("icon","navicon"),e.setAttribute("aria-hidden","true"),e.style.cssText="fill: var(--svg-fill, inherit);stroke: var(--svg-fill, inherit);-moz-context-properties: fill, stroke;",e.tabIndex=-1,e.src=t.dataURI,n.prepend(e)}}else(async e=>{let t;try{t=await Ke.getCourses()}catch{await Ke.popupLogin("Custom Icons"),t=await Ke.getCourses()}t.some((t=>String(t.id)===e))||(Oe(e),alert(`You appear to not be in the course with the id "${e}" anymore.\nThe course will not be checked for anymore`))})(e)},tt=e=>{const t=Ze(e),n=t?.querySelector('[data-custom-icon="true"]');n?.remove()},nt=(e,t,n,o)=>{if(!t&&!n)return;if(!o)return;if(!n){const{pointers:e}=t;for(const t of Object.keys(e))tt(t);return}if(!t)return void ot();const{pointers:r}=t,{pointers:i}=n,s=new Set(Object.keys(r));for(const e of Object.keys(i))i[e]!==r[e]&&et(e),s.delete(e);for(const e of s)tt(e)},ot=()=>{if(V()){const e=Te(),t=Object.keys(e);for(const e of t)et(e);GM_addValueChangeListener(Ne,nt)}},rt=()=>{V()&&(GM_registerMenuCommand("Open settings",(()=>{open("/customIconsPreact/","_blank")})),addEventListener("customIconsPreact",ot),ot())};if(!/^\/cleanmoodle/i.test(location.pathname)){it=Qe?rt:Je,"interactive"!==document.readyState&&"complete"!==document.readyState?document.addEventListener("DOMContentLoaded",it,{once:!0}):it()}var it})();