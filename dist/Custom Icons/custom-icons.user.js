(()=>{"use strict";var e={708:e=>{e.exports='*,::after,::before{box-sizing:border-box}::after,::before{text-decoration:inherit;vertical-align:inherit}html{cursor:default;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;word-break:break-word;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";background:#202020;color:#ccc;font-size:.9375rem;font-weight:400;line-height:1.5;user-select:none}body,button,input,select{margin:0}a{background-color:transparent}img,svg{vertical-align:middle}img{border-style:none}svg:not(:root){overflow:hidden}button{-webkit-appearance:button}button,input{overflow:visible}button,select{text-transform:none}::-webkit-input-placeholder{color:inherit;opacity:.54}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}::-moz-focus-inner{border-style:none;padding:0}:-moz-focusring{outline:1px dotted ButtonText}:-moz-ui-invalid{box-shadow:none}[tabindex],a,button,input,select{-ms-touch-action:manipulation;touch-action:manipulation}[hidden]{display:none}[disabled]{cursor:not-allowed}@media (min-width:0px){:root{--sidebar-flex: 0 0 100%;--main-flex: 0 0 100%;--padding-horizontal: 0;--padding-vertical: 0.5%}}@media (min-width:768px){:root{--sidebar-flex: 0 0 32%;--main-flex: 0 0 68%;--padding-horizontal: 0.5%;--padding-vertical: 0}}@media (min-width:992px){:root{--sidebar-flex: 0 0 25%;--main-flex: 0 0 75%}}@media (min-width:1200px){:root{--sidebar-flex: 0 0 20%;--main-flex: 0 0 80%}}.outer-sidebar{flex:var(--sidebar-flex);padding-right:var(--padding-horizontal);padding-bottom:var(--padding-vertical)}.outer-sidebar .sidebar{display:flex;flex-direction:column;padding:10px 15px;border:1.5px solid #343434;border-radius:4px;background-color:#141414}.outer-sidebar .row{cursor:pointer}.outer-sidebar .row:hover{text-decoration:underline}.outer-sidebar .row[data-removed=false]{color:#2ecc40}.outer-sidebar .row[data-removed=true],.svg-icon-x.svg-clear,.svg-icon-x.svg-del-icon{color:#ff4136}h2,h3{font-weight:300}h2{font-size:1.875rem}h3{font-size:1.64rem}input{margin-top:5px;width:220px}button,input,select{display:block;background:0 0;box-shadow:none;border:1.5px solid #343434;color:inherit;border-radius:2px;padding:5px 15px;max-width:100%;min-width:max-content;outline:0;font:inherit}button:disabled,input:disabled,select:disabled{color:gray}select>option{color:#111}button,select{width:auto}button:enabled,select:enabled{cursor:pointer}.svg-icon-x{margin-left:5px;height:1em;width:1em;cursor:pointer}.svg-icon-x.svg-del-icon{margin-left:0;margin-right:5px}.svg-icon-x.svg-close{color:#111;grid-column-start:3;grid-row-start:1;margin-left:auto}.btn-save{margin-top:10px;display:block}.icon{height:16px;width:16px;margin-right:5px}.icon:not(span){fill:#ccc;stroke:#ccc;-moz-context-properties:fill,stroke}span.icon{display:inline-block}.outer-main{flex:var(--main-flex);padding-left:var(--padding-horizontal);padding-top:var(--padding-vertical)}.main{padding:1.25rem 2.25rem;border:1.5px solid #343434;border-radius:4px;background-color:#141414}.container{padding:1%;display:flex;flex-direction:row;flex-wrap:wrap;width:100%;height:max-content}.outer-notification{position:absolute;top:0;left:0;width:100%;min-height:100%;z-index:2}.notification-string,.outer-notification{display:flex;justify-content:center;align-items:center}.inner-notification{display:grid;grid-template-columns:1fr auto 1fr;grid-template-rows:1fr auto 1fr;justify-items:center;width:375px;height:300px;max-height:90vh;max-width:90vw;background:#fff;border:#ddd solid 2px;border-radius:4px;padding:1em}.notification-string{grid-area:2/2/3/3;text-align:center;color:#111}.blur{filter:blur(4px);overflow:hidden}'},222:e=>{e.exports=".login-popup-userscript .vertical-horizontal-center{width:100%;height:100%;position:fixed;z-index:100000000;top:0;left:0;display:flex;align-items:center;justify-content:center;pointer-events:none}.login-popup-userscript .card{pointer-events:auto}"}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,n),i.exports}(()=>{var e,t,o,r,i,a,s={},l=[],c=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function u(e,t){for(var n in t)e[n]=t[n];return e}function d(e){var t=e.parentNode;t&&t.removeChild(e)}function _(t,n,o){var r,i,a,s={};for(a in n)"key"==a?r=n[a]:"ref"==a?i=n[a]:s[a]=n[a];if(arguments.length>2&&(s.children=arguments.length>3?e.call(arguments,2):o),"function"==typeof t&&null!=t.defaultProps)for(a in t.defaultProps)void 0===s[a]&&(s[a]=t.defaultProps[a]);return p(t,s,r,i,null)}function p(e,n,r,i,a){var s={type:e,props:n,key:r,ref:i,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==a?++o:a};return null!=t.vnode&&t.vnode(s),s}function f(e){return e.children}function h(e,t){this.props=e,this.context=t}function m(e,t){if(null==t)return e.__?m(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?m(e):null}function v(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return v(e)}}function g(e){(!e.__d&&(e.__d=!0)&&r.push(e)&&!w.__r++||a!==t.debounceRendering)&&((a=t.debounceRendering)||i)(w)}function w(){for(var e;w.__r=r.length;)e=r.sort((function(e,t){return e.__v.__b-t.__v.__b})),r=[],e.some((function(e){var t,n,o,r,i,a;e.__d&&(i=(r=(t=e).__v).__e,(a=t.__P)&&(n=[],(o=u({},r)).__v=r.__v+1,I(a,r,o,t.__n,void 0!==a.ownerSVGElement,null!=r.__h?[i]:null,n,null==i?m(r):i,r.__h),M(n,r),r.__e!=i&&v(r)))}))}function y(e,t,n,o,r,i,a,c,u,d){var _,h,v,g,w,y,x,C=o&&o.__k||l,S=C.length;for(n.__k=[],_=0;_<t.length;_++)if(null!=(g=n.__k[_]=null==(g=t[_])||"boolean"==typeof g?null:"string"==typeof g||"number"==typeof g||"bigint"==typeof g?p(null,g,null,null,g):Array.isArray(g)?p(f,{children:g},null,null,null):g.__b>0?p(g.type,g.props,g.key,null,g.__v):g)){if(g.__=n,g.__b=n.__b+1,null===(v=C[_])||v&&g.key==v.key&&g.type===v.type)C[_]=void 0;else for(h=0;h<S;h++){if((v=C[h])&&g.key==v.key&&g.type===v.type){C[h]=void 0;break}v=null}I(e,g,v=v||s,r,i,a,c,u,d),w=g.__e,(h=g.ref)&&v.ref!=h&&(x||(x=[]),v.ref&&x.push(v.ref,null,g),x.push(h,g.__c||w,g)),null!=w?(null==y&&(y=w),"function"==typeof g.type&&null!=g.__k&&g.__k===v.__k?g.__d=u=b(g,u,e):u=k(e,g,v,C,w,u),d||"option"!==n.type?"function"==typeof n.type&&(n.__d=u):e.value=""):u&&v.__e==u&&u.parentNode!=e&&(u=m(v))}for(n.__e=y,_=S;_--;)null!=C[_]&&("function"==typeof n.type&&null!=C[_].__e&&C[_].__e==n.__d&&(n.__d=m(o,_+1)),P(C[_],C[_]));if(x)for(_=0;_<x.length;_++)U(x[_],x[++_],x[++_])}function b(e,t,n){var o,r;for(o=0;o<e.__k.length;o++)(r=e.__k[o])&&(r.__=e,t="function"==typeof r.type?b(r,t,n):k(n,r,r,e.__k,r.__e,t));return t}function k(e,t,n,o,r,i){var a,s,l;if(void 0!==t.__d)a=t.__d,t.__d=void 0;else if(null==n||r!=i||null==r.parentNode)e:if(null==i||i.parentNode!==e)e.appendChild(r),a=null;else{for(s=i,l=0;(s=s.nextSibling)&&l<o.length;l+=2)if(s==r)break e;e.insertBefore(r,i),a=i}return void 0!==a?a:r.nextSibling}function x(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]=null==n?"":"number"!=typeof n||c.test(t)?n:n+"px"}function C(e,t,n,o,r){var i;e:if("style"===t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof o&&(e.style.cssText=o=""),o)for(t in o)n&&t in n||x(e.style,t,"");if(n)for(t in n)o&&n[t]===o[t]||x(e.style,t,n[t])}else if("o"===t[0]&&"n"===t[1])i=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+i]=n,n?o||e.addEventListener(t,i?L:S,i):e.removeEventListener(t,i?L:S,i);else if("dangerouslySetInnerHTML"!==t){if(r)t=t.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if("href"!==t&&"list"!==t&&"form"!==t&&"tabIndex"!==t&&"download"!==t&&t in e)try{e[t]=null==n?"":n;break e}catch(e){}"function"==typeof n||(null!=n&&(!1!==n||"a"===t[0]&&"r"===t[1])?e.setAttribute(t,n):e.removeAttribute(t))}}function S(e){this.l[e.type+!1](t.event?t.event(e):e)}function L(e){this.l[e.type+!0](t.event?t.event(e):e)}function I(e,n,o,r,i,a,s,l,c){var d,_,p,m,v,g,w,b,k,x,C,S=n.type;if(void 0!==n.constructor)return null;null!=o.__h&&(c=o.__h,l=n.__e=o.__e,n.__h=null,a=[l]),(d=t.__b)&&d(n);try{e:if("function"==typeof S){if(b=n.props,k=(d=S.contextType)&&r[d.__c],x=d?k?k.props.value:d.__:r,o.__c?w=(_=n.__c=o.__c).__=_.__E:("prototype"in S&&S.prototype.render?n.__c=_=new S(b,x):(n.__c=_=new h(b,x),_.constructor=S,_.render=T),k&&k.sub(_),_.props=b,_.state||(_.state={}),_.context=x,_.__n=r,p=_.__d=!0,_.__h=[]),null==_.__s&&(_.__s=_.state),null!=S.getDerivedStateFromProps&&(_.__s==_.state&&(_.__s=u({},_.__s)),u(_.__s,S.getDerivedStateFromProps(b,_.__s))),m=_.props,v=_.state,p)null==S.getDerivedStateFromProps&&null!=_.componentWillMount&&_.componentWillMount(),null!=_.componentDidMount&&_.__h.push(_.componentDidMount);else{if(null==S.getDerivedStateFromProps&&b!==m&&null!=_.componentWillReceiveProps&&_.componentWillReceiveProps(b,x),!_.__e&&null!=_.shouldComponentUpdate&&!1===_.shouldComponentUpdate(b,_.__s,x)||n.__v===o.__v){_.props=b,_.state=_.__s,n.__v!==o.__v&&(_.__d=!1),_.__v=n,n.__e=o.__e,n.__k=o.__k,n.__k.forEach((function(e){e&&(e.__=n)})),_.__h.length&&s.push(_);break e}null!=_.componentWillUpdate&&_.componentWillUpdate(b,_.__s,x),null!=_.componentDidUpdate&&_.__h.push((function(){_.componentDidUpdate(m,v,g)}))}_.context=x,_.props=b,_.state=_.__s,(d=t.__r)&&d(n),_.__d=!1,_.__v=n,_.__P=e,d=_.render(_.props,_.state,_.context),_.state=_.__s,null!=_.getChildContext&&(r=u(u({},r),_.getChildContext())),p||null==_.getSnapshotBeforeUpdate||(g=_.getSnapshotBeforeUpdate(m,v)),C=null!=d&&d.type===f&&null==d.key?d.props.children:d,y(e,Array.isArray(C)?C:[C],n,o,r,i,a,s,l,c),_.base=n.__e,n.__h=null,_.__h.length&&s.push(_),w&&(_.__E=_.__=null),_.__e=!1}else null==a&&n.__v===o.__v?(n.__k=o.__k,n.__e=o.__e):n.__e=E(o.__e,n,o,r,i,a,s,c);(d=t.diffed)&&d(n)}catch(e){n.__v=null,(c||null!=a)&&(n.__e=l,n.__h=!!c,a[a.indexOf(l)]=null),t.__e(e,n,o)}}function M(e,n){t.__c&&t.__c(n,e),e.some((function(n){try{e=n.__h,n.__h=[],e.some((function(e){e.call(n)}))}catch(e){t.__e(e,n.__v)}}))}function E(t,n,o,r,i,a,l,c){var u,_,p,f=o.props,h=n.props,v=n.type,g=0;if("svg"===v&&(i=!0),null!=a)for(;g<a.length;g++)if((u=a[g])&&(u===t||(v?u.localName==v:3==u.nodeType))){t=u,a[g]=null;break}if(null==t){if(null===v)return document.createTextNode(h);t=i?document.createElementNS("http://www.w3.org/2000/svg",v):document.createElement(v,h.is&&h),a=null,c=!1}if(null===v)f===h||c&&t.data===h||(t.data=h);else{if(a=a&&e.call(t.childNodes),_=(f=o.props||s).dangerouslySetInnerHTML,p=h.dangerouslySetInnerHTML,!c){if(null!=a)for(f={},g=0;g<t.attributes.length;g++)f[t.attributes[g].name]=t.attributes[g].value;(p||_)&&(p&&(_&&p.__html==_.__html||p.__html===t.innerHTML)||(t.innerHTML=p&&p.__html||""))}if(function(e,t,n,o,r){var i;for(i in n)"children"===i||"key"===i||i in t||C(e,i,null,n[i],o);for(i in t)r&&"function"!=typeof t[i]||"children"===i||"key"===i||"value"===i||"checked"===i||n[i]===t[i]||C(e,i,t[i],n[i],o)}(t,h,f,i,c),p)n.__k=[];else if(g=n.props.children,y(t,Array.isArray(g)?g:[g],n,o,r,i&&"foreignObject"!==v,a,l,a?a[0]:o.__k&&m(o,0),c),null!=a)for(g=a.length;g--;)null!=a[g]&&d(a[g]);c||("value"in h&&void 0!==(g=h.value)&&(g!==t.value||"progress"===v&&!g)&&C(t,"value",g,f.value,!1),"checked"in h&&void 0!==(g=h.checked)&&g!==t.checked&&C(t,"checked",g,f.checked,!1))}return t}function U(e,n,o){try{"function"==typeof e?e(n):e.current=n}catch(e){t.__e(e,o)}}function P(e,n,o){var r,i;if(t.unmount&&t.unmount(e),(r=e.ref)&&(r.current&&r.current!==e.__e||U(r,null,n)),null!=(r=e.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(e){t.__e(e,n)}r.base=r.__P=null}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&P(r[i],n,"function"!=typeof e.type);o||null==e.__e||d(e.__e),e.__e=e.__d=void 0}function T(e,t,n){return this.constructor(e,n)}function A(n,o,r){var i,a,l;t.__&&t.__(n,o),a=(i="function"==typeof r)?null:r&&r.__k||o.__k,l=[],I(o,n=(!i&&r||o).__k=_(f,null,[n]),a||s,s,void 0!==o.ownerSVGElement,!i&&r?[r]:a?null:o.firstChild?e.call(o.childNodes):null,l,!i&&r?r:a?a.__e:o.firstChild,i),M(l,n)}e=l.slice,t={__e:function(e,t){for(var n,o,r;t=t.__;)if((n=t.__c)&&!n.__)try{if((o=n.constructor)&&null!=o.getDerivedStateFromError&&(n.setState(o.getDerivedStateFromError(e)),r=n.__d),null!=n.componentDidCatch&&(n.componentDidCatch(e),r=n.__d),r)return n.__E=n}catch(t){e=t}throw e}},o=0,h.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=u({},this.state),"function"==typeof e&&(e=e(u({},n),this.props)),e&&u(n,e),null!=e&&this.__v&&(t&&this.__h.push(t),g(this))},h.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),g(this))},h.prototype.render=f,r=[],i="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,w.__r=0;var H=function(e,t,n,o){var r;t[0]=0;for(var i=1;i<t.length;i++){var a=t[i++],s=t[i]?(t[0]|=a?1:2,n[t[i++]]):t[++i];3===a?o[0]=s:4===a?o[1]=Object.assign(o[1]||{},s):5===a?(o[1]=o[1]||{})[t[++i]]=s:6===a?o[1][t[++i]]+=s+"":a?(r=e.apply(s,H(e,s,n,["",null])),o.push(r),s[0]?t[0]|=2:(t[i-2]=0,t[i]=r)):o.push(s)}return o},R=new Map,G=function(e){var t=R.get(this);return t||(t=new Map,R.set(this,t)),(t=H(this,t.get(e)||(t.set(e,t=function(e){for(var t,n,o=1,r="",i="",a=[0],s=function(e){1===o&&(e||(r=r.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?a.push(0,e,r):3===o&&(e||r)?(a.push(3,e,r),o=2):2===o&&"..."===r&&e?a.push(4,e,0):2===o&&r&&!e?a.push(5,0,!0,r):o>=5&&((r||!e&&5===o)&&(a.push(o,0,r,n),o=6),e&&(a.push(o,e,0,n),o=6)),r=""},l=0;l<e.length;l++){l&&(1===o&&s(),s(l));for(var c=0;c<e[l].length;c++)t=e[l][c],1===o?"<"===t?(s(),a=[a],o=3):r+=t:4===o?"--"===r&&">"===t?(o=1,r=""):r=t+r[0]:i?t===i?i="":r+=t:'"'===t||"'"===t?i=t:">"===t?(s(),o=1):o&&("="===t?(o=5,n=r,r=""):"/"===t&&(o<5||">"===e[l][c+1])?(s(),3===o&&(a=a[0]),o=a,(a=a[0]).push(2,0,o),o=0):" "===t||"\t"===t||"\n"===t||"\r"===t?(s(),o=2):r+=t),3===o&&"!--"===r&&(o=4,a=a[0])}return s(),a}(e)),t),arguments,[])).length>1?t:t[0]}.bind(_);const z=async(e=!1)=>{if(await GM.deleteValue("token"),e)for(const e of["username","password"])await GM.deleteValue(e)},O=async({username:e,password:t})=>{const n=new URLSearchParams({username:e,password:t,service:"moodle_mobile_app"}),o=await fetch("/login/token.php",{method:"POST",body:n.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}}),r=await o.json();if("errorcode"in r)throw new Error("Token was invalid");return await Promise.all([GM.setValue("token",r.token),GM.setValue("username",e),GM.setValue("password",t)]),r.token};let j;const F=async e=>{const t=await(async e=>{if(void 0!==j)return j;const t=new URLSearchParams({wsfunction:"core_webservice_get_site_info",wstoken:e}),n=await fetch("/webservice/rest/server.php?moodlewsrestformat=json",{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:t.toString()}),o=await n.json();if("exception"in o)throw new Error("token was undefined");return j=o.userid,j})(e),n=new URLSearchParams({"requests[0][function]":"core_enrol_get_users_courses","requests[0][arguments]":JSON.stringify({userid:t,returnusercount:!1}),wstoken:e,wsfunction:"tool_mobile_call_external_functions",moodlewsrestformat:"json"}),o=await fetch("/webservice/rest/server.php",{method:"POST",body:n.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}});if(!o.ok)throw new Error(`Response was not ok: ${o.status}`);const r=await o.json();if("exception"in r||r.responses[0].error)throw new Error("Token was invalid");const i=JSON.parse(r.responses[0].data),a={};for(const{id:e,fullname:t}of i)a[e]=t;return a},V=async()=>{const[e,t]=await Promise.all([GM.getValue("username"),GM.getValue("password")]);if(e&&t)return{username:e,password:t}},B=async()=>GM.getValue("token");var N,q,D,W=0,$=[],X=t.__b,Y=t.__r,J=t.diffed,K=t.__c,Q=t.unmount;function Z(e,n){t.__h&&t.__h(q,e,W||n),W=0;var o=q.__H||(q.__H={__:[],__h:[]});return e>=o.__.length&&o.__.push({}),o.__[e]}function ee(e){return W=1,function(e,t,n){var o=Z(N++,2);return o.t=e,o.__c||(o.__=[se(void 0,t),function(e){var t=o.t(o.__[0],e);o.__[0]!==t&&(o.__=[t,o.__[1]],o.__c.setState({}))}],o.__c=q),o.__}(se,e)}function te(e){return W=5,function(e,t){var n=Z(N++,7);return ae(n.__H,t)&&(n.__=e(),n.__H=t,n.__h=e),n.__}((function(){return{current:e}}),[])}function ne(){$.forEach((function(e){if(e.__P)try{e.__H.__h.forEach(re),e.__H.__h.forEach(ie),e.__H.__h=[]}catch(n){e.__H.__h=[],t.__e(n,e.__v)}})),$=[]}t.__b=function(e){q=null,X&&X(e)},t.__r=function(e){Y&&Y(e),N=0;var t=(q=e.__c).__H;t&&(t.__h.forEach(re),t.__h.forEach(ie),t.__h=[])},t.diffed=function(e){J&&J(e);var n=e.__c;n&&n.__H&&n.__H.__h.length&&(1!==$.push(n)&&D===t.requestAnimationFrame||((D=t.requestAnimationFrame)||function(e){var t,n=function(){clearTimeout(o),oe&&cancelAnimationFrame(t),setTimeout(e)},o=setTimeout(n,100);oe&&(t=requestAnimationFrame(n))})(ne)),q=void 0},t.__c=function(e,n){n.some((function(e){try{e.__h.forEach(re),e.__h=e.__h.filter((function(e){return!e.__||ie(e)}))}catch(o){n.some((function(e){e.__h&&(e.__h=[])})),n=[],t.__e(o,e.__v)}})),K&&K(e,n)},t.unmount=function(e){Q&&Q(e);var n=e.__c;if(n&&n.__H)try{n.__H.__.forEach(re)}catch(e){t.__e(e,n.__v)}};var oe="function"==typeof requestAnimationFrame;function re(e){var t=q;"function"==typeof e.__c&&e.__c(),q=t}function ie(e){var t=q;e.__c=e.__(),q=t}function ae(e,t){return!e||e.length!==t.length||t.some((function(t,n){return t!==e[n]}))}function se(e,t){return"function"==typeof t?t(e):t}var le=n(222);const ce=e=>{const t=te(null),n=te(null),[o,r]=ee(!0),[i,a]=ee({username:!0,password:!0});return o?_("div",{class:"vertical-horizontal-center"},_("div",{class:"card shadow"},_("div",{class:"card-body"},_("h5",{class:"card-title"},"Login - ",e.title),_("div",{class:"mb-3"},_("label",{htmlFor:"popup-username",class:"form-label"},"Username"),_("input",{ref:t,required:!0,id:"popup-username",placeholder:"Username",class:"form-control"+(i.username?"":" is-invalid"),onInput:()=>{a((e=>({...e,username:!0})))}})),_("div",{class:"mb-3"},_("label",{htmlFor:"popup-password",class:"form-label"},"Password"),_("input",{ref:n,required:!0,id:"popup-password",placeholder:"Password",class:"form-control"+(i.password?"":" is-invalid"),type:"password",onInput:()=>{a((e=>({...e,password:!0})))}}))),_("button",{class:"btn btn-primary",type:"button",onClick:async()=>{const o=t.current?.value.trim(),i=n.current?.value;if(a({password:Boolean(i),username:Boolean(o)}),o&&i){r(!1);try{const t=await O({username:o,password:i});e.cb(t)}catch{r(!0)}}}},"Login"))):null},ue=async e=>{const t=await(async e=>{const t=await B();if(t)return t;const n=await V();if(n)try{return await O(n)}catch{await z(!0)}else await z(!0);return(async e=>new Promise((t=>{const n=GM_addStyle(le),o=document.createElement("div");o.className="login-popup-userscript",document.body.append(o),A(_(ce,{cb:e=>{n.remove(),o.remove(),t(e)},title:e}),o)})))(e)})(e);try{return await F(t)}catch{return await z(),ue(e)}},de=new Intl.Collator(void 0,{sensitivity:"base",numeric:!0});let _e=(e=21)=>{let t="",n=crypto.getRandomValues(new Uint8Array(e));for(;e--;){let o=63&n[e];t+=o<36?o.toString(36):o<62?(o-26).toString(36).toUpperCase():o<63?"_":"-"}return t};const pe=async e=>{const[t,n]=await Promise.all([fe(),me()]);delete t[e];const o=new Set(Object.values(t));for(const e of Object.keys(n))o.has(e)||delete n[e];await GM.setValue("values",n),await GM.setValue("pointers",t),await we(2,e)},fe=async()=>{let e=await GM.getValue("pointers");return void 0===e&&(e={},await GM.setValue("pointers",e)),{...e}},he=async(e,t)=>{const n=await fe();n[e]=t,await GM.setValue("pointers",n)},me=async()=>{let e=await GM.getValue("values");return void 0===e&&(e={},await GM.setValue("values",e)),{...e}},ve=async(e,t)=>{const n=await me();n[e]=t,await GM.setValue("values",n)},ge=async e=>{const t=(await fe())[e];if(!t)return!1;const n=(await me())[t];return!!n&&("rawByteString"in n?{dataURI:await ye(t,n)}:n)},we=async(e,t,n)=>{const o=[e,t,void 0];if(0===e)o[2]=n;else{const e=await ge(n);if(!e)return;o[2]=e}await GM.setValue("changed",[...o,Math.random()])},ye=async(e,t)=>{const{mediaType:n,rawByteString:o}=t,r=`data:${n};base64,${o}`;return await ve(e,{dataURI:r}),r};var be=n(708);const ke=async e=>{const t=await ge(e);if(t){const e={};return"rawXML"in t?e.rawXML=t.rawXML:e.dataURI=t.dataURI,e}},xe=({class:e,...t})=>_("svg",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",class:"svg-icon svg-icon-x"+(e?` ${e}`:""),viewBox:"0 0 24 24",...t},_("path",{d:"M24 0 0 24M0 0l24 24"})),Ce=e=>{const{icon:t}=e;return t?t.rawXML?_("span",{class:"icon"},G(Object.assign([t.rawXML],{raw:[t.rawXML]}))):t.dataURI?_("img",{class:"icon",src:t.dataURI}):null:null},Se=({content:e,cb:n})=>{const o=te(null);return function(n,o){var r=Z(N++,3);!t.__s&&ae(r.__H,o)&&(r.__=()=>{void 0!==e&&scroll({top:0,left:0,behavior:"smooth"})},r.__H=o,q.__H.__h.push(r))}(0,[e]),e?_("div",{class:"outer-notification",onClick:e=>{e.currentTarget===e.target&&n()}},_("div",{ref:o,class:"inner-notification"},_(xe,{class:"svg-close",onClick:()=>{n()}}),_("div",{class:"notification-string"},e))):null},Le=e=>{const t=te(null),n=te(null);return _("div",{class:"outer-main"},_("div",{class:"main"},_("div",{class:"replace-flex-inputs"},_("h2",null,"Login"),_("input",{ref:t,placeholder:"Username"}),_("input",{ref:n,placeholder:"Password",type:"password"}),_("button",{class:"btn-save",type:"button",onClick:()=>{const o=t.current?.value.trim(),r=n.current?.value;void 0!==o&&void 0!==r&&e.cb({username:o,password:r})}},"Login"))))};class Ie extends h{state={selected:3};refs_={form:{current:null},url:{current:null},file:{current:null},copy:{current:null}};render=()=>{const{state:e,refs_:t,props:n,handleInput:o,resetForm:r}=this,{selected:i}=e,{selectedCourse:a,courses:s}=n,l=t.file.current?.files?.[0];return _("div",{class:"outer-main"},_("div",{class:"main"},_("form",{ref:t.form},_("h2",null,"Change or add an icon"),a?_("div",{ref:e=>{e?.scrollIntoView({behavior:"smooth",block:"center"})}},_(Ce,{icon:a.icon}),_("span",null,a.name)):_("div",null,"Select course to the left"),_("h3",null,"Upload image from URL"),_("input",{ref:t.url,type:"url",placeholder:"Image url",disabled:2!==i&&3!==i,onInput:e=>{o(2,e)}}),_("h3",null,"Upload image from file"),_("input",{ref:t.file,hidden:!0,type:"file",onInput:e=>{o(0,e)}}),_("button",{type:"button",disabled:0!==i&&3!==i,onClick:()=>{t.file.current?.click()}},0===i&&l?_(f,null,l.name,_(xe,{class:"svg-clear",onClick:e=>{e.stopPropagation(),r()}})):"Upload file"),_("h3",null,"Copy image from other course"),_("select",{ref:t.copy,disabled:1!==i&&3!==i,onInput:e=>{o(1,e)}},_("option",{selected:!0,value:"null"},"Select course to copy icon from"),s.map((({id:e,icon:t,name:n})=>t&&e!==a?.id&&_("option",{key:e,value:e},n)))),_("button",{class:"btn-save",type:"button",disabled:3===i||void 0===a,onClick:this.save},"Save"))))};resetForm=()=>{this.refs_.form.current?.reset(),this.setState({selected:3})};handleInput=(e,t)=>{let n=!1;const o=t.currentTarget;1===e||2===e?n=""!==o.value:0===e&&o instanceof HTMLInputElement&&(n=null!==o.files&&o.files.length>0),this.setState({selected:n?e:3})};resetSelected=()=>{this.props.resetSelected(),this.resetForm()};save=async()=>{const{notify:e,selectedCourse:t}=this.props;if(void 0!==t)switch(this.state.selected){case 3:e("You have not submitted an icon");break;case 1:{const n=this.refs_.copy.current?.value;n?await this.saveByCopy(n,t):e("You have not submitted an icon");break}case 0:{const n=this.refs_.file.current?.files?.[0];n?this.saveWithFileHandler(n,t):e("You have not submitted an icon");break}case 2:{const n=this.refs_.url.current?.value;n?this.saveByURL(n,t):e("Invalid URL submitted");break}}else e("You have not selected a course")};saveByURL=(e,t)=>{const{notify:n}=this.props;let o;try{o=new URL(e)}catch{return void n("Invalid URL submitted")}GM_xmlhttpRequest({method:"GET",url:o.href,timeout:15e3,responseType:"blob",anonymous:!0,onerror:()=>{n("An error occured")},ontimeout:()=>{n("Request timed out")},onload:e=>{200===e.status&&e.response instanceof Blob?this.saveWithFileHandler(e.response,t):n(`Error ${e.status}: ${e.statusText}`)}})};saveWithFileHandler=(e,t)=>{const{notify:n}=this.props,o=new FileReader;o.addEventListener("error",(()=>{n("An error occured")})),o.addEventListener("load",(()=>{const r=o.result;if("string"!=typeof r)return;const i=new Image;i.addEventListener("error",(()=>{n("File was not an image")})),i.addEventListener("load",(async()=>{const{id:o}=t,i=/^data:[\w+/]+;base64,(?<data>.+)$/.exec(r)?.groups;if(!i)return;const a=i.data;if(!a)return void n("Could not extract data from data URI");let s;s="image/svg+xml"===e.type?{rawXML:decodeURI(atob(a))}:{dataURI:r},await(async(e,t)=>{await pe(e);let n="";const o=await me();do{n=_e(5)}while(n in o);await ve(n,t),await he(e,n),await we(0,e,t)})(o,s),this.props.updateCourseById(o),this.resetSelected()})),i.src=r})),o.readAsDataURL(e)};saveByCopy=async(e,t)=>{const{id:n}=t;await(async(e,t)=>{await pe(e);const n=(await fe())[t];void 0!==n&&await he(e,n),await we(1,e,t)})(n,e),this.resetSelected(),this.props.updateCourseById(n)}}const Me=({courses:e,resetIcon:t,isCoursesLoading:n,selectCourse:o})=>_("div",{class:"outer-sidebar"},_("div",{class:"sidebar"},n?_("div",{class:"row"},"Loading courses..."):e.map((({id:e,name:n,icon:r})=>_("div",{key:e,class:"row",onClick:()=>{o(e)}},_(Ce,{icon:r}),r&&_(xe,{class:"svg-del-icon",onClick:n=>{n.stopPropagation(),t(e)}}),_("span",null,n))))));class Ee extends h{state={loggedOut:!1,courses:[],selectedCourse:void 0,isCoursesLoading:!0,notification:void 0};callbacksAfterLogin=new Set;constructor(...e){super(...e),this.callbacksAfterLogin.add(this.setCourses)}render=()=>{const{state:e,resetIcon:t,selectCourse:n,loggedOutCallback:o,updateCourseById:r,resetSelected:i,notify:a}=this,{loggedOut:s,selectedCourse:l,courses:c,isCoursesLoading:u,notification:d}=e;return _(f,null,_(Se,{cb:()=>{a(void 0)},content:d}),_("div",{class:"container"+(void 0===d?"":" blur")},_(Me,{courses:c,resetIcon:t,isCoursesLoading:u,selectCourse:n}),s?_(Le,{cb:o}):_(Ie,{updateCourseById:r,courses:c,selectedCourse:l,resetSelected:i,notify:a})))};componentDidMount=async()=>{const e=await this.getToken();e&&this.callbackAfterLoginHandler(e),document.addEventListener("keydown",(e=>{"Escape"===e.key&&this.notify(void 0)}))};notify=e=>{this.setState({notification:e})};resetIcon=async e=>{await pe(e),await this.updateCourseById(e),this.resetSelectedIfEqualId(e)};selectCourse=e=>{for(const t of this.state.courses)if(t.id===e){this.setState({selectedCourse:{...t}});break}};callbackAfterLoginHandler=e=>{for(const t of this.callbacksAfterLogin)t(e),this.callbacksAfterLogin.delete(t)};loggedOutCallback=async e=>{try{this.setState({loggedOut:!1});const t=await O(e);this.callbackAfterLoginHandler(t)}catch{await this.logout(!0)}};updateCourseById=async e=>{const t=await ke(e);this.setState((({courses:n})=>{const o=[...n];for(const[r,i]of n.entries())if(i.id===e){o[r]={...i,icon:t};break}return{courses:o}}))};resetSelected=()=>{this.setState({selectedCourse:void 0})};resetSelectedIfEqualId=e=>{this.state.selectedCourse?.id===e&&this.resetSelected()};getToken=async()=>{const e=await B();if(e)return e;const t=await V();if(t)try{return await O(t)}catch{return void await this.logout(!0)}else await this.logout(!0)};logout=async(e,t)=>{await z(e),t&&this.callbacksAfterLogin.add(t),this.setState({loggedOut:!0})};setCourses=async e=>{let t;try{t=await F(e)}catch{return void await this.logout(!1,this.setCourses)}const n=[];for(const[e,o]of Object.entries(t))n.push({id:e,name:o,icon:await ke(e)});(e=>{e.sort((({name:e,id:t},{name:n,id:o})=>(e=e.trim(),n=n.trim(),de.compare(e,n)||Number(o)-Number(t))))})(n),this.setState({courses:n,isCoursesLoading:!1})}}const Ue=()=>{"https:"!==location.protocol&&(location.protocol="https:");const{body:e,head:t}=document;for(;e.lastChild;)e.lastChild.remove();for(;t.lastChild;)t.lastChild.remove();const n=document.createElement("link");n.rel="shortcut icon",n.href="/theme/image.php/classic/theme/1606210545/favicon",t.append(n),document.title="Custom Icons Setup",history.replaceState({},"","/customIconsPreact"),GM_addStyle(be),A(_(Ee,null),e)};
// ==UserScript==
// @name      Custom Icons Preact
// @version   2021.09.06a
// @author    lusc
// @updateURL https://git.io/Jqlt8
// @include   *://moodle.ksasz.ch/*
// @grant     GM.setValue
// @grant     GM.getValue
// @grant     GM_addStyle
// @grant     GM.deleteValue
// @grant     GM_addValueChangeListener
// @grant     GM_registerMenuCommand
// @grant     GM_xmlhttpRequest
// @run-at    document-start
// @connect   *
// ==/UserScript==
"https:"!==location.protocol&&(location.protocol="https:");const Pe=!/^\/customiconspreact/i.test(location.pathname),Te=()=>document.querySelector('li[aria-labelledby="label_2_4"] ul[role="group"]'),Ae=async(e,t)=>{const n=Te();if(!n)return;const o=n.querySelector(`a[href="https://moodle.ksasz.ch/course/view.php?id=${e}"]`);if(o){if(o.firstElementChild){if(!t){const n=await ge(e);if(!n)return He(e),void pe(e);t=n}if("rawXML"in t){const e=document.createElement("span");e.classList.add("icon","navicon"),e.style.display="inline-block",e.style.color="var(--svg-fill, inherit)",e.tabIndex=-1,A(G(Object.assign([t.rawXML],{raw:[t.rawXML]})),e),o.firstElementChild.replaceWith(e)}else{const e=new Image;e.classList.add("icon","navicon"),e.setAttribute("aria-hidden","true"),e.style.cssText="fill: var(--svg-fill, inherit);stroke: var(--svg-fill, inherit);-moz-context-properties: fill, stroke;",e.tabIndex=-1,e.src=t.dataURI,o.firstElementChild.replaceWith(e)}}}else(async e=>{e in await ue("Custom Icons")||(await pe(e),alert(`You appear to not be in the course with the id "${e}" anymore.\nThe course will not be checked for anymore`))})(e)},He=e=>{const t=Te()?.querySelector(`a[href="https://moodle.ksasz.ch/course/view.php?id=${e}"] > .icon.navicon`);if(t&&("SPAN"===t.nodeName||"IMG"===t.nodeName)){const e=document.createElement("i");e.classList.add("icon","fa","fa-graduation-cap","fa-fw","navicon"),e.setAttribute("aria-hidden","true"),e.tabIndex=-1,t.replaceWith(e)}},Re=async(e,t,n,o)=>{if(!o||!n)return;const[r,i,a]=n;2===r?He(i):Ae(i,a)},Ge=async()=>{if(Te()){const e=await fe(),t=Object.keys(e);for(const e of t)await Ae(e);GM_addValueChangeListener("changed",Re)}},ze=()=>{Te()&&(GM_registerMenuCommand("Open settings",(()=>{open("/customIconsPreact/","_blank")})),addEventListener("customIconsPreact",Ge),Ge())};if(!/^\/cleanmoodle/i.test(location.pathname)){const e=Pe?ze:Ue;"complete"===document.readyState?e():addEventListener("DOMContentLoaded",e,{once:!0})}})()})();