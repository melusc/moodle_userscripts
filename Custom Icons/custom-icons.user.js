(()=>{"use strict";var e,t,n,o,r,s,i={},l=[],a=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function c(e,t){for(var n in t)e[n]=t[n];return e}function u(e){var t=e.parentNode;t&&t.removeChild(e)}function d(t,n,o){var r,s,i,l={};for(i in n)"key"==i?r=n[i]:"ref"==i?s=n[i]:l[i]=n[i];if(arguments.length>2&&(l.children=arguments.length>3?e.call(arguments,2):o),"function"==typeof t&&null!=t.defaultProps)for(i in t.defaultProps)void 0===l[i]&&(l[i]=t.defaultProps[i]);return _(t,l,r,s,null)}function _(e,o,r,s,i){var l={type:e,props:o,key:r,ref:s,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==i?++n:i};return null==i&&null!=t.vnode&&t.vnode(l),l}function p(e){return e.children}function f(e,t){this.props=e,this.context=t}function h(e,t){if(null==t)return e.__?h(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?h(e):null}function m(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return m(e)}}function v(e){(!e.__d&&(e.__d=!0)&&o.push(e)&&!g.__r++||s!==t.debounceRendering)&&((s=t.debounceRendering)||r)(g)}function g(){for(var e;g.__r=o.length;)e=o.sort((function(e,t){return e.__v.__b-t.__v.__b})),o=[],e.some((function(e){var t,n,o,r,s,i;e.__d&&(s=(r=(t=e).__v).__e,(i=t.__P)&&(n=[],(o=c({},r)).__v=r.__v+1,I(i,r,o,t.__n,void 0!==i.ownerSVGElement,null!=r.__h?[s]:null,n,null==s?h(r):s,r.__h),L(n,r),r.__e!=s&&m(r)))}))}function y(e,t,n,o,r,s,a,c,u,d){var f,m,v,g,y,k,x,C=o&&o.__k||l,S=C.length;for(n.__k=[],f=0;f<t.length;f++)if(null!=(g=n.__k[f]=null==(g=t[f])||"boolean"==typeof g?null:"string"==typeof g||"number"==typeof g||"bigint"==typeof g?_(null,g,null,null,g):Array.isArray(g)?_(p,{children:g},null,null,null):g.__b>0?_(g.type,g.props,g.key,null,g.__v):g)){if(g.__=n,g.__b=n.__b+1,null===(v=C[f])||v&&g.key==v.key&&g.type===v.type)C[f]=void 0;else for(m=0;m<S;m++){if((v=C[m])&&g.key==v.key&&g.type===v.type){C[m]=void 0;break}v=null}I(e,g,v=v||i,r,s,a,c,u,d),y=g.__e,(m=g.ref)&&v.ref!=m&&(x||(x=[]),v.ref&&x.push(v.ref,null,g),x.push(m,g.__c||y,g)),null!=y?(null==k&&(k=y),"function"==typeof g.type&&g.__k===v.__k?g.__d=u=b(g,u,e):u=w(e,g,v,C,y,u),"function"==typeof n.type&&(n.__d=u)):u&&v.__e==u&&u.parentNode!=e&&(u=h(v))}for(n.__e=k,f=S;f--;)null!=C[f]&&("function"==typeof n.type&&null!=C[f].__e&&C[f].__e==n.__d&&(n.__d=h(o,f+1)),M(C[f],C[f]));if(x)for(f=0;f<x.length;f++)U(x[f],x[++f],x[++f])}function b(e,t,n){for(var o,r=e.__k,s=0;r&&s<r.length;s++)(o=r[s])&&(o.__=e,t="function"==typeof o.type?b(o,t,n):w(n,o,o,r,o.__e,t));return t}function w(e,t,n,o,r,s){var i,l,a;if(void 0!==t.__d)i=t.__d,t.__d=void 0;else if(null==n||r!=s||null==r.parentNode)e:if(null==s||s.parentNode!==e)e.appendChild(r),i=null;else{for(l=s,a=0;(l=l.nextSibling)&&a<o.length;a+=2)if(l==r)break e;e.insertBefore(r,s),i=s}return void 0!==i?i:r.nextSibling}function k(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]=null==n?"":"number"!=typeof n||a.test(t)?n:n+"px"}function x(e,t,n,o,r){var s;e:if("style"===t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof o&&(e.style.cssText=o=""),o)for(t in o)n&&t in n||k(e.style,t,"");if(n)for(t in n)o&&n[t]===o[t]||k(e.style,t,n[t])}else if("o"===t[0]&&"n"===t[1])s=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+s]=n,n?o||e.addEventListener(t,s?S:C,s):e.removeEventListener(t,s?S:C,s);else if("dangerouslySetInnerHTML"!==t){if(r)t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("href"!==t&&"list"!==t&&"form"!==t&&"tabIndex"!==t&&"download"!==t&&t in e)try{e[t]=null==n?"":n;break e}catch(e){}"function"==typeof n||(null!=n&&(!1!==n||"a"===t[0]&&"r"===t[1])?e.setAttribute(t,n):e.removeAttribute(t))}}function C(e){this.l[e.type+!1](t.event?t.event(e):e)}function S(e){this.l[e.type+!0](t.event?t.event(e):e)}function I(e,n,o,r,s,i,l,a,u){var d,_,h,m,v,g,b,w,k,x,C,S,I,L=n.type;if(void 0!==n.constructor)return null;null!=o.__h&&(u=o.__h,a=n.__e=o.__e,n.__h=null,i=[a]),(d=t.__b)&&d(n);try{e:if("function"==typeof L){if(w=n.props,k=(d=L.contextType)&&r[d.__c],x=d?k?k.props.value:d.__:r,o.__c?b=(_=n.__c=o.__c).__=_.__E:("prototype"in L&&L.prototype.render?n.__c=_=new L(w,x):(n.__c=_=new f(w,x),_.constructor=L,_.render=P),k&&k.sub(_),_.props=w,_.state||(_.state={}),_.context=x,_.__n=r,h=_.__d=!0,_.__h=[]),null==_.__s&&(_.__s=_.state),null!=L.getDerivedStateFromProps&&(_.__s==_.state&&(_.__s=c({},_.__s)),c(_.__s,L.getDerivedStateFromProps(w,_.__s))),m=_.props,v=_.state,h)null==L.getDerivedStateFromProps&&null!=_.componentWillMount&&_.componentWillMount(),null!=_.componentDidMount&&_.__h.push(_.componentDidMount);else{if(null==L.getDerivedStateFromProps&&w!==m&&null!=_.componentWillReceiveProps&&_.componentWillReceiveProps(w,x),!_.__e&&null!=_.shouldComponentUpdate&&!1===_.shouldComponentUpdate(w,_.__s,x)||n.__v===o.__v){_.props=w,_.state=_.__s,n.__v!==o.__v&&(_.__d=!1),_.__v=n,n.__e=o.__e,n.__k=o.__k,n.__k.forEach((function(e){e&&(e.__=n)})),_.__h.length&&l.push(_);break e}null!=_.componentWillUpdate&&_.componentWillUpdate(w,_.__s,x),null!=_.componentDidUpdate&&_.__h.push((function(){_.componentDidUpdate(m,v,g)}))}if(_.context=x,_.props=w,_.__v=n,_.__P=e,C=t.__r,S=0,"prototype"in L&&L.prototype.render)_.state=_.__s,_.__d=!1,C&&C(n),d=_.render(_.props,_.state,_.context);else do{_.__d=!1,C&&C(n),d=_.render(_.props,_.state,_.context),_.state=_.__s}while(_.__d&&++S<25);_.state=_.__s,null!=_.getChildContext&&(r=c(c({},r),_.getChildContext())),h||null==_.getSnapshotBeforeUpdate||(g=_.getSnapshotBeforeUpdate(m,v)),I=null!=d&&d.type===p&&null==d.key?d.props.children:d,y(e,Array.isArray(I)?I:[I],n,o,r,s,i,l,a,u),_.base=n.__e,n.__h=null,_.__h.length&&l.push(_),b&&(_.__E=_.__=null),_.__e=!1}else null==i&&n.__v===o.__v?(n.__k=o.__k,n.__e=o.__e):n.__e=E(o.__e,n,o,r,s,i,l,u);(d=t.diffed)&&d(n)}catch(e){n.__v=null,(u||null!=i)&&(n.__e=a,n.__h=!!u,i[i.indexOf(a)]=null),t.__e(e,n,o)}}function L(e,n){t.__c&&t.__c(n,e),e.some((function(n){try{e=n.__h,n.__h=[],e.some((function(e){e.call(n)}))}catch(e){t.__e(e,n.__v)}}))}function E(t,n,o,r,s,l,a,c){var d,_,p,f=o.props,m=n.props,v=n.type,g=0;if("svg"===v&&(s=!0),null!=l)for(;g<l.length;g++)if((d=l[g])&&"setAttribute"in d==!!v&&(v?d.localName===v:3===d.nodeType)){t=d,l[g]=null;break}if(null==t){if(null===v)return document.createTextNode(m);t=s?document.createElementNS("http://www.w3.org/2000/svg",v):document.createElement(v,m.is&&m),l=null,c=!1}if(null===v)f===m||c&&t.data===m||(t.data=m);else{if(l=l&&e.call(t.childNodes),_=(f=o.props||i).dangerouslySetInnerHTML,p=m.dangerouslySetInnerHTML,!c){if(null!=l)for(f={},g=0;g<t.attributes.length;g++)f[t.attributes[g].name]=t.attributes[g].value;(p||_)&&(p&&(_&&p.__html==_.__html||p.__html===t.innerHTML)||(t.innerHTML=p&&p.__html||""))}if(function(e,t,n,o,r){var s;for(s in n)"children"===s||"key"===s||s in t||x(e,s,null,n[s],o);for(s in t)r&&"function"!=typeof t[s]||"children"===s||"key"===s||"value"===s||"checked"===s||n[s]===t[s]||x(e,s,t[s],n[s],o)}(t,m,f,s,c),p)n.__k=[];else if(g=n.props.children,y(t,Array.isArray(g)?g:[g],n,o,r,s&&"foreignObject"!==v,l,a,l?l[0]:o.__k&&h(o,0),c),null!=l)for(g=l.length;g--;)null!=l[g]&&u(l[g]);c||("value"in m&&void 0!==(g=m.value)&&(g!==t.value||"progress"===v&&!g||"option"===v&&g!==f.value)&&x(t,"value",g,f.value,!1),"checked"in m&&void 0!==(g=m.checked)&&g!==t.checked&&x(t,"checked",g,f.checked,!1))}return t}function U(e,n,o){try{"function"==typeof e?e(n):e.current=n}catch(e){t.__e(e,o)}}function M(e,n,o){var r,s;if(t.unmount&&t.unmount(e),(r=e.ref)&&(r.current&&r.current!==e.__e||U(r,null,n)),null!=(r=e.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(e){t.__e(e,n)}r.base=r.__P=null}if(r=e.__k)for(s=0;s<r.length;s++)r[s]&&M(r[s],n,"function"!=typeof e.type);o||null==e.__e||u(e.__e),e.__e=e.__d=void 0}function P(e,t,n){return this.constructor(e,n)}function H(n,o,r){var s,l,a;t.__&&t.__(n,o),l=(s="function"==typeof r)?null:r&&r.__k||o.__k,a=[],I(o,n=(!s&&r||o).__k=d(p,null,[n]),l||i,i,void 0!==o.ownerSVGElement,!s&&r?[r]:l?null:o.firstChild?e.call(o.childNodes):null,a,!s&&r?r:l?l.__e:o.firstChild,s),L(a,n)}e=l.slice,t={__e:function(e,t,n,o){for(var r,s,i;t=t.__;)if((r=t.__c)&&!r.__)try{if((s=r.constructor)&&null!=s.getDerivedStateFromError&&(r.setState(s.getDerivedStateFromError(e)),i=r.__d),null!=r.componentDidCatch&&(r.componentDidCatch(e,o||{}),i=r.__d),i)return r.__E=r}catch(t){e=t}throw e}},n=0,f.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=c({},this.state),"function"==typeof e&&(e=e(c({},n),this.props)),e&&c(n,e),null!=e&&this.__v&&(t&&this.__h.push(t),v(this))},f.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),v(this))},f.prototype.render=p,o=[],r="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,g.__r=0;var T=function(e,t,n,o){var r;t[0]=0;for(var s=1;s<t.length;s++){var i=t[s++],l=t[s]?(t[0]|=i?1:2,n[t[s++]]):t[++s];3===i?o[0]=l:4===i?o[1]=Object.assign(o[1]||{},l):5===i?(o[1]=o[1]||{})[t[++s]]=l:6===i?o[1][t[++s]]+=l+"":i?(r=e.apply(l,T(e,l,n,["",null])),o.push(r),l[0]?t[0]|=2:(t[s-2]=0,t[s]=r)):o.push(l)}return o},R=new Map,O=function(e){var t=R.get(this);return t||(t=new Map,R.set(this,t)),(t=T(this,t.get(e)||(t.set(e,t=function(e){for(var t,n,o=1,r="",s="",i=[0],l=function(e){1===o&&(e||(r=r.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?i.push(0,e,r):3===o&&(e||r)?(i.push(3,e,r),o=2):2===o&&"..."===r&&e?i.push(4,e,0):2===o&&r&&!e?i.push(5,0,!0,r):o>=5&&((r||!e&&5===o)&&(i.push(o,0,r,n),o=6),e&&(i.push(o,e,0,n),o=6)),r=""},a=0;a<e.length;a++){a&&(1===o&&l(),l(a));for(var c=0;c<e[a].length;c++)t=e[a][c],1===o?"<"===t?(l(),i=[i],o=3):r+=t:4===o?"--"===r&&">"===t?(o=1,r=""):r=t+r[0]:s?t===s?s="":r+=t:'"'===t||"'"===t?s=t:">"===t?(l(),o=1):o&&("="===t?(o=5,n=r,r=""):"/"===t&&(o<5||">"===e[a][c+1])?(l(),3===o&&(i=i[0]),o=i,(i=i[0]).push(2,0,o),o=0):" "===t||"\t"===t||"\n"===t||"\r"===t?(l(),o=2):r+=t),3===o&&"!--"===r&&(o=4,i=i[0])}return l(),i}(e)),t),arguments,[])).length>1?t:t[0]}.bind(d);const A=e=>[()=>GM_getValue(e),t=>{GM_setValue(e,t)},()=>{GM_deleteValue(e)}],[G,j,F]=A("token"),[N,V,$]=A("username");class z extends Error{constructor(){super("No credentials provided.")}}class B extends Error{constructor(){super("Invalid credentials.")}}class D extends Error{constructor(e){super(`${e} not included`)}}class q{static extend(e){return e(q),q}baseUrl="https://moodle.ksasz.ch";credentials={token:G(),username:N()};#e=new Map;_readCache(e){return this.#e.get(e)}_writeCache(e,t){return this.#e.set(e,t),t}async login(e){const{credentials:t}=this;if(e&&(t.username=e.username,t.password=e.password,V(e.username)),t.token)return t.token;const{username:n,password:o}=t;if(!n||!o)throw new z;const r=new URLSearchParams({username:n,password:o,service:"moodle_mobile_app"}),s=await fetch(`${this.baseUrl}/login/token.php`,{method:"POST",body:r.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}});if(!s.ok)throw new Error(`Response was not ok: ${s.status}`);const i=await s.json();if("errorcode"in i)throw this.logout(),new B;const{token:l}=i;return j(l),t.token=l,l}logout(){delete this.credentials.token,F(),delete this.credentials.password}async getCourses(e){throw new D("getCourses")}async getUserId(){throw new D("getUserId")}async popupLogin(e){throw new D("popupLogin")}async getCourseContent(e,t){throw new D("getCourseContent")}}const W=Symbol("getUserId");async function X(){const e=this._readCache(W);if(void 0!==e)return e;const t=await this.login(),n=new URLSearchParams({wsfunction:"core_webservice_get_site_info",wstoken:t}),o=await fetch(`${this.baseUrl}/webservice/rest/server.php?moodlewsrestformat=json`,{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:n.toString()});if(!o.ok)throw new Error(`Response was not ok: ${o.status}`);const r=await o.json();if("exception"in r)throw this.logout(),new Error("token was undefined");return this._writeCache(W,r.userid)}const Y=e=>{e.prototype.getUserId=X},J=Symbol("getCourses");async function K(e=!1){const t=this._readCache(J);if(t&&!e)return t;const n=await this.getUserId(),o=await this.login(),r=new URLSearchParams({"requests[0][function]":"core_enrol_get_users_courses","requests[0][arguments]":JSON.stringify({userid:n,returnusercount:!1}),wstoken:o,wsfunction:"tool_mobile_call_external_functions",moodlewsrestformat:"json"}),s=await fetch(`${this.baseUrl}/webservice/rest/server.php`,{method:"POST",body:r.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}});if(!s.ok)throw new Error(`Response was not ok: ${s.status}`);const i=await s.json();if("exception"in i||i.responses[0].error)throw this.logout(),new Error("Token was invalid");const l=JSON.parse(i.responses[0].data),a=[];for(const{id:e,fullname:t}of l)a.push({id:e,name:t});return this._writeCache(J,a)}const Q=e=>{e.prototype.getCourses=K,e.extend(Y)};var Z,ee,te,ne,oe=0,re=[],se=t.__b,ie=t.__r,le=t.diffed,ae=t.__c,ce=t.unmount;function ue(e,n){t.__h&&t.__h(ee,e,oe||n),oe=0;var o=ee.__H||(ee.__H={__:[],__h:[]});return e>=o.__.length&&o.__.push({}),o.__[e]}function de(e){return oe=1,function(e,t,n){var o=ue(Z++,2);return o.t=e,o.__c||(o.__=[ge(void 0,t),function(e){var t=o.t(o.__[0],e);o.__[0]!==t&&(o.__=[t,o.__[1]],o.__c.setState({}))}],o.__c=ee),o.__}(ge,e)}function _e(e){return oe=5,function(e,t){var n=ue(Z++,7);return ve(n.__H,t)?(n.o=e(),n.u=t,n.__h=e,n.o):n.__}((function(){return{current:e}}),[])}function pe(){for(var e;e=re.shift();)if(e.__P)try{e.__H.__h.forEach(he),e.__H.__h.forEach(me),e.__H.__h=[]}catch(n){e.__H.__h=[],t.__e(n,e.__v)}}t.__b=function(e){ee=null,se&&se(e)},t.__r=function(e){ie&&ie(e),Z=0;var t=(ee=e.__c).__H;t&&(te===ee?(t.__h=[],ee.__h=[],t.__.forEach((function(e){e.o=e.u=void 0}))):(t.__.forEach((function(e){e.u&&(e.__H=e.u),e.o&&(e.__=e.o),e.o=e.u=void 0})),t.__h.forEach(he),t.__h.forEach(me),t.__h=[])),te=ee},t.diffed=function(e){le&&le(e);var n=e.__c;n&&n.__H&&n.__H.__h.length&&(1!==re.push(n)&&ne===t.requestAnimationFrame||((ne=t.requestAnimationFrame)||function(e){var t,n=function(){clearTimeout(o),fe&&cancelAnimationFrame(t),setTimeout(e)},o=setTimeout(n,100);fe&&(t=requestAnimationFrame(n))})(pe)),ee=null,te=null},t.__c=function(e,n){n.some((function(e){try{e.__H&&e.__H.__.forEach((function(e){e.u&&(e.__H=e.u),e.o&&(e.__=e.o),e.o=e.u=void 0})),e.__h.forEach(he),e.__h=e.__h.filter((function(e){return!e.__||me(e)}))}catch(o){n.some((function(e){e.__h&&(e.__h=[])})),n=[],t.__e(o,e.__v)}})),ae&&ae(e,n)},t.unmount=function(e){ce&&ce(e);var n,o=e.__c;o&&o.__H&&(o.__H.__.forEach((function(e){try{he(e)}catch(e){n=e}})),n&&t.__e(n,o.__v))};var fe="function"==typeof requestAnimationFrame;function he(e){var t=ee,n=e.__c;"function"==typeof n&&(e.__c=void 0,n()),ee=t}function me(e){var t=ee;e.__c=e.__(),ee=t}function ve(e,t){return!e||e.length!==t.length||t.some((function(t,n){return t!==e[n]}))}function ge(e,t){return"function"==typeof t?t(e):t}const ye=({cb:e,title:t,moodle:n})=>{const o=_e(null),r=_e(null),[s,i]=de(!0),[l,a]=de({username:!0,password:!0});return s?d("div",{class:"vertical-horizontal-center"},d("form",{onSubmit:async t=>{t.preventDefault(),t.stopImmediatePropagation();const s=o.current?.value.trim(),l=r.current?.value;if(a({password:Boolean(l),username:Boolean(s)}),s&&l){i(!1);try{const t=await n.login({username:s,password:l});e(t)}catch{i(!0)}}}},d("div",{class:"card shadow"},d("div",{class:"card-body"},d("h5",{class:"card-title"},"Login - ",t),d("div",{class:"mb-3"},d("label",{htmlFor:"popup-username",class:"form-label"},"Username"),d("input",{ref:o,required:!0,defaultValue:N(),id:"popup-username",placeholder:"Username",class:"form-control"+(l.username?"":" is-invalid"),onInput:()=>{a((e=>({...e,username:!0})))}})),d("div",{class:"mb-3"},d("label",{htmlFor:"popup-password",class:"form-label"},"Password"),d("input",{ref:r,required:!0,id:"popup-password",placeholder:"Password",class:"form-control"+(l.password?"":" is-invalid"),type:"password",onInput:()=>{a((e=>({...e,password:!0})))}}))),d("button",{class:"btn btn-primary",type:"submit"},"Login")))):null},be=async function(e){return new Promise((t=>{const n=GM_addStyle(".login-popup-userscript .vertical-horizontal-center{width:100%;height:100%;position:fixed;z-index:100000000;top:0;left:0;display:flex;align-items:center;justify-content:center;pointer-events:none}.login-popup-userscript .card{pointer-events:auto}"),o=document.createElement("div");o.className="login-popup-userscript",document.body.append(o),H(d(ye,{cb:e=>{H(null,o),n.remove(),o.remove(),t(e)},title:e,moodle:this}),o)}))};Symbol("getCourseContent");const we=new Intl.Collator(void 0,{sensitivity:"base",numeric:!0}),ke=()=>document.querySelector('li[aria-labelledby$="label_2_4"] ul[role="group"]'),xe=e=>{if(!/^\d+\.\d+\.\d+$/.test(e))throw new Error(`Invalid version: ${e}.`);const[t,n,o]=e.split(".").map(Number);return[t,n,o]},Ce=(e,t)=>e-t,Se=(e,t)=>Ce(e[0],t[0])||Ce(e[1],t[1])||Ce(e[2],t[2]),Ie="lastUpgraded";let Le=(e=21)=>crypto.getRandomValues(new Uint8Array(e)).reduce(((e,t)=>e+((t&=63)<36?t.toString(36):t<62?(t-26).toString(36).toUpperCase():t>62?"-":"_")),"");const Ee="icons",Ue=e=>{const{pointers:t,values:n}=Re();delete t[e];const o=new Set(Object.values(t));for(const e of Object.keys(n))o.has(e)||delete n[e];Oe({pointers:t,values:n})},Me=()=>Re().pointers,Pe=(e,t)=>{const n=Me();n[e]=t,Oe({pointers:n})},He=()=>Re().values,Te=e=>{const t=Me()[e];if(t)return He()[t]||void 0},Re=()=>GM_getValue(Ee)??{pointers:{},values:{}},Oe=e=>{const t={...Re(),...e};GM_setValue(Ee,t)},Ae=(e,t)=>{Ue(e);let n="";const o=He();do{n=Le(5)}while(n in o);((e,t)=>{const n=He();n[e]=t,Oe({values:n})})(n,t),Pe(e,n)};q.extend(Q);const Ge=({class:e,...t})=>d("svg",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",class:"svg-icon svg-icon-x"+(e?` ${e}`:""),viewBox:"0 0 24 24",...t},d("path",{d:"M24 0 0 24M0 0l24 24"})),je=e=>{const{icon:t}=e;return t?t.rawXML?d("span",{class:"icon"},O(Object.assign([t.rawXML],{raw:[t.rawXML]}))):t.dataURI?d("img",{class:"icon",src:t.dataURI}):null:null},Fe=({content:e,cb:n})=>{const o=_e(null);return function(n,o){var r=ue(Z++,3);!t.__s&&ve(r.__H,o)&&(r.__=()=>{void 0!==e&&scroll({top:0,left:0,behavior:"smooth"})},r.u=o,ee.__H.__h.push(r))}(0,[e]),e?d("div",{class:"outer-notification",onClick:e=>{e.currentTarget===e.target&&n()}},d("div",{ref:o,class:"inner-notification"},d(Ge,{class:"svg-close",onClick:()=>{n()}}),d("div",{class:"notification-string"},e))):null},Ne=e=>{const t=_e(null),n=_e(null);return d("div",{class:"outer-main"},d("div",{class:"main"},d("form",{onSubmit:o=>{o.preventDefault();const r=t.current?.value.trim(),s=n.current?.value;void 0!==r&&void 0!==s&&e.cb({username:r,password:s})}},d("div",{class:"replace-flex-inputs"},d("h2",null,"Login"),d("input",{ref:t,placeholder:"Username"}),d("input",{ref:n,placeholder:"Password",type:"password"}),d("button",{class:"btn-save",type:"submit"},"Login")))))};class Ve extends f{state={selected:3};refs_={form:{current:null},url:{current:null},file:{current:null},copy:{current:null}};render(){const{refs_:e,props:t,handleInput:n,resetForm:o}=this,{selected:r}=this.state,{selectedCourse:s,courses:i}=t,l=e.file.current?.files?.[0];return d("div",{class:"outer-main"},d("div",{class:"main"},d("form",{ref:e.form},d("h2",null,"Change or add an icon"),s?d("div",{ref:e=>{e?.scrollIntoView({behavior:"smooth",block:"center"})}},d(je,{icon:s.icon}),d("span",null,s.name)):d("div",null,"Select course to the left"),d("h3",null,"Upload image from URL"),d("input",{ref:e.url,type:"url",placeholder:"Image url",disabled:2!==r&&3!==r,onInput:e=>{n(2,e)}}),d("h3",null,"Upload image from file"),d("input",{ref:e.file,hidden:!0,type:"file",onInput:e=>{n(0,e)}}),d("button",{type:"button",disabled:0!==r&&3!==r,onClick:()=>{e.file.current?.click()}},0===r&&l?d(p,null,l.name,d(Ge,{class:"svg-clear",onClick:e=>{e.stopPropagation(),o()}})):"Upload file"),d("h3",null,"Copy image from other course"),d("select",{ref:e.copy,disabled:1!==r&&3!==r,onInput:e=>{n(1,e)}},d("option",{selected:!0,value:"null"},"Select course to copy icon from"),i.map((({id:e,icon:t,name:n})=>t&&e!==s?.id&&d("option",{key:e,value:e},n)))),d("button",{class:"btn-save",type:"button",disabled:3===r||void 0===s,onClick:this.save},"Save"))))}resetForm=()=>{this.refs_.form.current?.reset(),this.setState({selected:3})};handleInput=(e,t)=>{let n=!1;const o=t.currentTarget;1===e||2===e?n=""!==o.value:0===e&&o instanceof HTMLInputElement&&(n=null!==o.files&&o.files.length>0),this.setState({selected:n?e:3})};resetSelected=()=>{this.props.resetSelected(),this.resetForm()};save=()=>{const{notify:e,selectedCourse:t}=this.props;if(void 0!==t)switch(this.state.selected){case 3:e("You have not submitted an icon");break;case 1:{const n=this.refs_.copy.current?.value;n?this.saveByCopy(n,t):e("You have not submitted an icon");break}case 0:{const n=this.refs_.file.current?.files?.[0];n?this.saveWithFileHandler(n,t):e("You have not submitted an icon");break}case 2:{const n=this.refs_.url.current?.value;n?this.saveByURL(n,t):e("Invalid URL submitted");break}}else e("You have not selected a course")};saveByURL=(e,t)=>{const{notify:n}=this.props;let o;try{o=new URL(e)}catch{return void n("Invalid URL submitted")}GM_xmlhttpRequest({method:"GET",url:o.href,timeout:15e3,responseType:"blob",anonymous:!0,onerror(){n("An error occured")},ontimeout(){n("Request timed out")},onload:e=>{200===e.status&&e.response instanceof Blob?this.saveWithFileHandler(e.response,t):n(`Error ${e.status}: ${e.statusText}`)}})};saveWithFileHandler=(e,t)=>{const{notify:n}=this.props,{id:o}=t,r=new FileReader;if(r.addEventListener("error",(()=>{n("An error occured")})),"image/svg+xml"===e.type)return r.addEventListener("load",(()=>{const e=r.result;"string"==typeof e&&(Ae(o,{rawXML:e}),this.props.updateCourseById(o),this.resetSelected())})),void r.readAsText(e);r.addEventListener("load",(()=>{const e=r.result;if("string"!=typeof e)return;const t=new Image;t.addEventListener("error",(()=>{n("File was not an image")})),t.addEventListener("load",(()=>{const t=/^data:[\w+/]+;base64,(?<data>.+)$/.exec(e)?.groups;t&&(t.data?(Ae(o,{dataURI:e}),this.props.updateCourseById(o),this.resetSelected()):n("Could not extract data from data URI"))})),t.src=e})),r.readAsDataURL(e)};saveByCopy=(e,t)=>{const{id:n}=t;((e,t)=>{Ue(e);const n=Me()[t];void 0!==n&&Pe(e,n)})(n,e),this.resetSelected(),this.props.updateCourseById(n)}}const $e=({courses:e,resetIcon:t,isCoursesLoading:n,selectCourse:o})=>d("div",{class:"outer-sidebar"},d("div",{class:"sidebar"},n?d("div",{class:"row"},"Loading courses..."):e.map((({id:e,name:n,icon:r})=>d("div",{key:e,class:"row",onClick:()=>{o(e)}},d(je,{icon:r}),r&&d(Ge,{class:"svg-del-icon",onClick:n=>{n.stopPropagation(),t(e)}}),d("span",null,n))))));class ze extends f{state={loggedOut:!1,courses:[],selectedCourse:void 0,isCoursesLoading:!0,notification:void 0};moodle=new q;render(){const{resetIcon:e,selectCourse:t,loggedOutCallback:n,updateCourseById:o,resetSelected:r,notify:s}=this,{loggedOut:i,selectedCourse:l,courses:a,isCoursesLoading:c,notification:u}=this.state;return d(p,null,d(Fe,{cb:()=>{s(void 0)},content:u}),d("div",{class:"container"+(void 0===u?"":" blur")},d($e,{courses:a,resetIcon:e,isCoursesLoading:c,selectCourse:t}),i?d(Ne,{cb:n}):d(Ve,{updateCourseById:o,courses:a,selectedCourse:l,resetSelected:r,notify:s})))}componentDidMount(){this.tryLogin(),document.addEventListener("keydown",(e=>{"Escape"===e.key&&this.notify(void 0)}))}notify=e=>{this.setState({notification:e})};resetIcon=e=>{Ue(e),this.updateCourseById(e),this.resetSelectedIfEqualId(e)};selectCourse=e=>{for(const t of this.state.courses)if(t.id===e){this.setState({selectedCourse:{...t}});break}};loggedOutCallback=e=>{this.setState({loggedOut:!1}),this.tryLogin(e)};tryLogin=e=>{this.moodle.login(e).then(this.onLogin,this.logout)};updateCourseById=e=>{const t=Te(e);this.setState((({courses:n})=>{const o=[...n];for(const[r,s]of n.entries())if(s.id===e){o[r]={...s,icon:t};break}return{courses:o}}))};resetSelected=()=>{this.setState({selectedCourse:void 0})};resetSelectedIfEqualId=e=>{this.state.selectedCourse?.id===e&&this.resetSelected()};logout=()=>{this.moodle.logout(),this.setState({loggedOut:!0})};onLogin=async()=>{await this.getCourses()};getCourses=async()=>{let e;try{e=await this.moodle.getCourses()}catch{return void this.logout()}const t=[];for(const{id:n,name:o}of e)t.push({id:String(n),name:o,icon:Te(String(n))});(e=>{e.sort((({name:e,id:t},{name:n,id:o})=>(e=e.trim(),n=n.trim(),we.compare(e,n)||Number(o)-Number(t))))})(t),this.setState({courses:t,isCoursesLoading:!1})}}
// ==UserScript==
// @name      Custom Icons Preact
// @version   1.4.0
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
q.extend(Q).extend((e=>{e.prototype.popupLogin=be}));const Be=new q;(e=>{try{(e=>{const t=GM_getValue(Ie),n=void 0===t?[-1,-1,-1]:xe(t),o=Object.entries(e).map((([e,t])=>[xe(e),t])).sort((([e],[t])=>Se(e,t)));for(const[e,t]of o)Se(n,e)<0&&t();GM_setValue(Ie,GM_info.script.version)})(e)}catch(e){console.error("Upgrading threw %o. Failing silently.",e)}})({"1.3.0":()=>{GM_deleteValue("lastValidatedToken"),GM_deleteValue("password")},"1.4.0"(){GM_deleteValue("changed");const e=GM_getValue("pointers"),t=GM_getValue("values");e&&t&&Oe({pointers:e,values:t}),GM_deleteValue("pointers"),GM_deleteValue("values")}}),"https:"!==location.protocol&&(location.protocol="https:");const De=!/^\/customiconspreact/i.test(location.pathname),qe=(e,t)=>{const n=ke();if(!n)return;const o=n.querySelector(`a[href="https://moodle.ksasz.ch/course/view.php?id=${e}"]`);if(o){if(o.firstElementChild){if(!t){const n=Te(e);if(!n)return We(e),void Ue(e);t=n}if("rawXML"in t){const e=document.createElement("span");e.classList.add("icon","navicon"),e.style.display="inline-block",e.style.color="var(--svg-fill, inherit)",e.tabIndex=-1,H(O(Object.assign([t.rawXML],{raw:[t.rawXML]})),e),o.firstElementChild.replaceWith(e)}else{const e=new Image;e.classList.add("icon","navicon"),e.setAttribute("aria-hidden","true"),e.style.cssText="fill: var(--svg-fill, inherit);stroke: var(--svg-fill, inherit);-moz-context-properties: fill, stroke;",e.tabIndex=-1,e.src=t.dataURI,o.firstElementChild.replaceWith(e)}}}else(async e=>{let t;try{t=await Be.getCourses()}catch{await Be.popupLogin("Custom Icons"),t=await Be.getCourses()}t.some((t=>String(t.id)===e))||(Ue(e),alert(`You appear to not be in the course with the id "${e}" anymore.\nThe course will not be checked for anymore`))})(e)},We=e=>{const t=ke()?.querySelector(`a[href="https://moodle.ksasz.ch/course/view.php?id=${e}"] > .icon.navicon`);if(t&&("SPAN"===t.nodeName||"IMG"===t.nodeName)){const e=document.createElement("i");e.classList.add("icon","fa","fa-graduation-cap","fa-fw","navicon"),e.setAttribute("aria-hidden","true"),e.tabIndex=-1,t.replaceWith(e)}},Xe=(e,t,n,o)=>{if(!t&&!n)return;if(!o)return;if(!n){const{pointers:e}=t;for(const t of Object.keys(e))We(t);return}if(!t)return void Ye();const{pointers:r}=t,{pointers:s}=n,i=new Set(Object.keys(r));for(const e of Object.keys(s))s[e]!==r[e]&&qe(e),i.delete(e);for(const e of i)We(e)},Ye=()=>{if(ke()){const e=Me(),t=Object.keys(e);for(const e of t)qe(e);GM_addValueChangeListener(Ee,Xe)}};var Je;/^\/cleanmoodle/i.test(location.pathname)||(Je=De?()=>{ke()&&(GM_registerMenuCommand("Open settings",(()=>{open("/customIconsPreact/","_blank")})),addEventListener("customIconsPreact",Ye),Ye())}:()=>{"https:"!==location.protocol&&(location.protocol="https:");const{body:e,head:t}=document;for(;e.lastChild;)e.lastChild.remove();for(;t.lastChild;)t.lastChild.remove();const n=document.createElement("link");n.rel="shortcut icon",n.href="/theme/image.php/classic/theme/1606210545/favicon",t.append(n),document.title="Custom Icons Setup",history.replaceState({},"","/customIconsPreact"),GM_addStyle('*,::after,::before{box-sizing:border-box}blockquote,body,dd,dl,figure,h1,h2,h3,h4,p{margin:0}ol[role=list],ul[role=list]{list-style:none}html:focus-within{scroll-behavior:smooth}body{min-height:100vh;text-rendering:optimizeSpeed;line-height:1.5}a:not([class]){text-decoration-skip-ink:auto}img,picture{max-width:100%;display:block}textarea{font:inherit}@media (prefers-reduced-motion:reduce){html:focus-within{scroll-behavior:auto}*,::after,::before{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}html{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";background:#202020;color:#ccc;font-size:.9375rem;font-weight:400;line-height:1.5;user-select:none}@media (min-width:0px){:root{--sidebar-flex: 0 0 100%;--main-flex: 0 0 100%;--padding-horizontal: 0;--padding-vertical: 0.5%}}@media (min-width:768px){:root{--sidebar-flex: 0 0 32%;--main-flex: 0 0 68%;--padding-horizontal: 0.5%;--padding-vertical: 0}}@media (min-width:992px){:root{--sidebar-flex: 0 0 25%;--main-flex: 0 0 75%}}@media (min-width:1200px){:root{--sidebar-flex: 0 0 20%;--main-flex: 0 0 80%}}.outer-sidebar{flex:var(--sidebar-flex);padding-right:var(--padding-horizontal);padding-bottom:var(--padding-vertical)}.outer-sidebar .sidebar{display:flex;flex-direction:column;padding:10px 15px;border:1.5px solid #343434;border-radius:4px;background-color:#141414}.outer-sidebar .row{cursor:pointer}.outer-sidebar .row:hover{text-decoration:underline}.outer-sidebar .row:hover .icon{display:none}.outer-sidebar .row:hover .svg-icon-x{display:initial}.outer-sidebar .row[data-removed=false]{color:#2ecc40}.outer-sidebar .row[data-removed=true],.svg-icon-x.svg-clear,.svg-icon-x.svg-del-icon{color:#ff4136}h2,h3{font-weight:300}h2{font-size:1.875rem}h3{font-size:1.64rem}input{margin-top:5px;width:220px}button,input,select{display:block;background:0 0;box-shadow:none;border:1.5px solid #343434;color:inherit;border-radius:2px;padding:5px 15px;max-width:100%;min-width:max-content;outline:0;font:inherit}button:disabled,input:disabled,select:disabled{color:gray}select>option{color:#111}button,select{width:auto}button:enabled,select:enabled{cursor:pointer}.svg-icon-x{margin-left:5px;height:1em;width:1em;cursor:pointer;display:none}.svg-icon-x.svg-del-icon{margin-left:0;margin-right:5px}.svg-icon-x.svg-close{color:#111;grid-column-start:3;grid-row-start:1;margin-left:auto}.btn-save{margin-top:10px;display:block}.icon{height:1em;width:1em;margin-right:5px}.icon:not(span){fill:#ccc;stroke:#ccc;-moz-context-properties:fill,stroke}span.icon{display:inline-block}.outer-main{flex:var(--main-flex);padding-left:var(--padding-horizontal);padding-top:var(--padding-vertical)}.main{padding:1.25rem 2.25rem;border:1.5px solid #343434;border-radius:4px;background-color:#141414}.container{padding:1%;display:flex;flex-direction:row;flex-wrap:wrap;width:100%;height:max-content}.outer-notification{position:absolute;top:0;left:0;width:100%;min-height:100%;z-index:2}.notification-string,.outer-notification{display:flex;justify-content:center;align-items:center}.inner-notification{display:grid;grid-template-columns:1fr auto 1fr;grid-template-rows:1fr auto 1fr;justify-items:center;width:375px;height:300px;max-height:90vh;max-width:90vw;background:#fff;border:#ddd solid 2px;border-radius:4px;padding:1em}.notification-string{grid-area:2/2/3/3;text-align:center;color:#111}.blur{filter:blur(4px);overflow:hidden}'),H(d(ze,null),e)},"undefined"!=typeof document&&("complete"!==document.readyState&&"interactive"!==document.readyState?document.addEventListener("DOMContentLoaded",Je):Je()))})();