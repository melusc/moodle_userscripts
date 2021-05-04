(()=>{"use strict";var e={630:e=>{e.exports='html{cursor:default;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;word-break:break-word;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";background:#202020;color:#ccc;font-size:.9375rem;font-weight:400;line-height:1.5;user-select:none}a{background-color:transparent}button,input,select{font-family:inherit;font-size:100%;line-height:1.15}button::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring{outline:1px dotted ButtonText}*,::after,::before{box-sizing:border-box}::after,::before{text-decoration:inherit;vertical-align:inherit}body,button,input,select{margin:0}img,svg{vertical-align:middle}img{border-style:none}svg:not(:root){overflow:hidden}button{-webkit-appearance:button}button,input{overflow:visible}button,select{text-transform:none}::-webkit-input-placeholder{color:inherit;opacity:.54}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}::-moz-focus-inner{border-style:none;padding:0}:-moz-focusring{outline:1px dotted ButtonText}:-moz-ui-invalid{box-shadow:none}[tabindex],a,button,input,select{-ms-touch-action:manipulation;touch-action:manipulation}[hidden]{display:none}[disabled]{cursor:not-allowed}@media (min-width:0px){:root{--sidebar-flex: 0 0 100%;--main-flex: 0 0 100%;--padding-horizontal: 0;--padding-vertical: 0.5%}}@media (min-width:768px){:root{--sidebar-flex: 0 0 32%;--main-flex: 0 0 68%;--padding-horizontal: 0.5%;--padding-vertical: 0}}@media (min-width:992px){:root{--sidebar-flex: 0 0 25%;--main-flex: 0 0 75%}}@media (min-width:1200px){:root{--sidebar-flex: 0 0 20%;--main-flex: 0 0 80%}}.outer-sidebar{flex:var(--sidebar-flex);padding-right:var(--padding-horizontal);padding-bottom:var(--padding-vertical)}.outer-sidebar .sidebar{display:flex;flex-direction:column;padding:10px 15px;border:1.5px solid #343434;border-radius:4px;background-color:#141414}.outer-sidebar .row{cursor:pointer}.outer-sidebar .row:hover{text-decoration:underline}.outer-sidebar .row[data-removed=false]{color:#2ecc40}.outer-sidebar .row[data-removed=true],.svg-icon-x.svg-clear,.svg-icon-x.svg-del-icon{color:#ff4136}h2,h3{font-weight:300}h2{font-size:1.875rem}h3{font-size:1.64rem}input{margin-top:5px;width:220px}button,input,select{display:block;background:0 0;box-shadow:none;border:1.5px solid #343434;color:inherit;border-radius:2px;padding:5px 15px;max-width:100%;min-width:max-content;outline:0}button:disabled,input:disabled,select:disabled{color:gray}select>option{color:#111}button,select{width:auto}button:enabled,select:enabled{cursor:pointer}.svg-icon-x{margin-left:5px;height:1em;width:1em;cursor:pointer}.svg-icon-x.svg-del-icon{margin-left:0;margin-right:5px}.svg-icon-x.svg-close{color:#111;grid-column-start:3;grid-row-start:1;margin-left:auto}.btn-save{margin-top:10px;display:block}.icon{height:16px;width:16px;margin-right:5px}.icon:not(span){fill:#ccc;stroke:#ccc;-moz-context-properties:fill,stroke}span.icon{display:inline-block}.outer-main{flex:var(--main-flex);padding-left:var(--padding-horizontal);padding-top:var(--padding-vertical)}.main{padding:1.25rem 2.25rem;border:1.5px solid #343434;border-radius:4px;background-color:#141414}.container{padding:1%;display:flex;flex-direction:row;flex-wrap:wrap;width:100%;height:max-content}.outer-notification{position:absolute;top:0;left:0;width:100%;min-height:100%}.notification-string,.outer-notification{display:flex;justify-content:center;align-items:center}.inner-notification{display:grid;grid-template-columns:1fr auto 1fr;grid-template-rows:1fr auto 1fr;justify-items:center;width:375px;height:300px;max-height:90vh;max-width:90vw;background:#fff;border:#ddd solid 2px;border-radius:4px;padding:1em}.notification-string{grid-area:2/2/3/3;text-align:center;color:#111}.blur{filter:blur(4px);overflow:hidden}'},176:e=>{e.exports=".shared-login-popup .vertical-horizontal-center{width:100%;height:100%;position:fixed;z-index:100000000;top:0;left:0;display:flex;align-items:center;justify-content:center;pointer-events:none}.shared-login-popup .card{pointer-events:auto}"}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,n),i.exports}(()=>{var e,t,o,r,i={},s=[],l=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function a(e,t){for(var n in t)e[n]=t[n];return e}function c(e){var t=e.parentNode;t&&t.removeChild(e)}function u(e,t,n){var o,r,i,s=arguments,l={};for(i in t)"key"==i?o=t[i]:"ref"==i?r=t[i]:l[i]=t[i];if(arguments.length>3)for(n=[n],i=3;i<arguments.length;i++)n.push(s[i]);if(null!=n&&(l.children=n),"function"==typeof e&&null!=e.defaultProps)for(i in e.defaultProps)void 0===l[i]&&(l[i]=e.defaultProps[i]);return d(e,l,o,r,null)}function d(t,n,o,r,i){var s={type:t,props:n,key:o,ref:r,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==i?++e.__v:i};return null!=e.vnode&&e.vnode(s),s}function _(e){return e.children}function p(e,t){this.props=e,this.context=t}function f(e,t){if(null==t)return e.__?f(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?f(e):null}function h(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return h(e)}}function m(n){(!n.__d&&(n.__d=!0)&&t.push(n)&&!v.__r++||r!==e.debounceRendering)&&((r=e.debounceRendering)||o)(v)}function v(){for(var e;v.__r=t.length;)e=t.sort((function(e,t){return e.__v.__b-t.__v.__b})),t=[],e.some((function(e){var t,n,o,r,i,s;e.__d&&(i=(r=(t=e).__v).__e,(s=t.__P)&&(n=[],(o=a({},r)).__v=r.__v+1,M(s,r,o,t.__n,void 0!==s.ownerSVGElement,null!=r.__h?[i]:null,n,null==i?f(r):i,r.__h),C(n,r),r.__e!=i&&h(r)))}))}function g(e,t,n,o,r,l,a,c,u,p){var h,m,v,g,w,k,x,S=o&&o.__k||s,C=S.length;for(n.__k=[],h=0;h<t.length;h++)if(null!=(g=n.__k[h]=null==(g=t[h])||"boolean"==typeof g?null:"string"==typeof g||"number"==typeof g||"bigint"==typeof g?d(null,g,null,null,g):Array.isArray(g)?d(_,{children:g},null,null,null):g.__b>0?d(g.type,g.props,g.key,null,g.__v):g)){if(g.__=n,g.__b=n.__b+1,null===(v=S[h])||v&&g.key==v.key&&g.type===v.type)S[h]=void 0;else for(m=0;m<C;m++){if((v=S[m])&&g.key==v.key&&g.type===v.type){S[m]=void 0;break}v=null}M(e,g,v=v||i,r,l,a,c,u,p),w=g.__e,(m=g.ref)&&v.ref!=m&&(x||(x=[]),v.ref&&x.push(v.ref,null,g),x.push(m,g.__c||w,g)),null!=w?(null==k&&(k=w),"function"==typeof g.type&&null!=g.__k&&g.__k===v.__k?g.__d=u=b(g,u,e):u=y(e,g,v,S,w,u),p||"option"!==n.type?"function"==typeof n.type&&(n.__d=u):e.value=""):u&&v.__e==u&&u.parentNode!=e&&(u=f(v))}for(n.__e=k,h=C;h--;)null!=S[h]&&("function"==typeof n.type&&null!=S[h].__e&&S[h].__e==n.__d&&(n.__d=f(o,h+1)),V(S[h],S[h]));if(x)for(h=0;h<x.length;h++)I(x[h],x[++h],x[++h])}function b(e,t,n){var o,r;for(o=0;o<e.__k.length;o++)(r=e.__k[o])&&(r.__=e,t="function"==typeof r.type?b(r,t,n):y(n,r,r,e.__k,r.__e,t));return t}function y(e,t,n,o,r,i){var s,l,a;if(void 0!==t.__d)s=t.__d,t.__d=void 0;else if(null==n||r!=i||null==r.parentNode)e:if(null==i||i.parentNode!==e)e.appendChild(r),s=null;else{for(l=i,a=0;(l=l.nextSibling)&&a<o.length;a+=2)if(l==r)break e;e.insertBefore(r,i),s=i}return void 0!==s?s:r.nextSibling}function w(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]=null==n?"":"number"!=typeof n||l.test(t)?n:n+"px"}function k(e,t,n,o,r){var i;e:if("style"===t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof o&&(e.style.cssText=o=""),o)for(t in o)n&&t in n||w(e.style,t,"");if(n)for(t in n)o&&n[t]===o[t]||w(e.style,t,n[t])}else if("o"===t[0]&&"n"===t[1])i=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+i]=n,n?o||e.addEventListener(t,i?S:x,i):e.removeEventListener(t,i?S:x,i);else if("dangerouslySetInnerHTML"!==t){if(r)t=t.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if("href"!==t&&"list"!==t&&"form"!==t&&"tabIndex"!==t&&"download"!==t&&t in e)try{e[t]=null==n?"":n;break e}catch(e){}"function"==typeof n||(null!=n&&(!1!==n||"a"===t[0]&&"r"===t[1])?e.setAttribute(t,n):e.removeAttribute(t))}}function x(t){this.l[t.type+!1](e.event?e.event(t):t)}function S(t){this.l[t.type+!0](e.event?e.event(t):t)}function M(t,n,o,r,i,s,l,c,u){var d,f,h,m,v,b,y,w,k,x,S,M=n.type;if(void 0!==n.constructor)return null;null!=o.__h&&(u=o.__h,c=n.__e=o.__e,n.__h=null,s=[c]),(d=e.__b)&&d(n);try{e:if("function"==typeof M){if(w=n.props,k=(d=M.contextType)&&r[d.__c],x=d?k?k.props.value:d.__:r,o.__c?y=(f=n.__c=o.__c).__=f.__E:("prototype"in M&&M.prototype.render?n.__c=f=new M(w,x):(n.__c=f=new p(w,x),f.constructor=M,f.render=U),k&&k.sub(f),f.props=w,f.state||(f.state={}),f.context=x,f.__n=r,h=f.__d=!0,f.__h=[]),null==f.__s&&(f.__s=f.state),null!=M.getDerivedStateFromProps&&(f.__s==f.state&&(f.__s=a({},f.__s)),a(f.__s,M.getDerivedStateFromProps(w,f.__s))),m=f.props,v=f.state,h)null==M.getDerivedStateFromProps&&null!=f.componentWillMount&&f.componentWillMount(),null!=f.componentDidMount&&f.__h.push(f.componentDidMount);else{if(null==M.getDerivedStateFromProps&&w!==m&&null!=f.componentWillReceiveProps&&f.componentWillReceiveProps(w,x),!f.__e&&null!=f.shouldComponentUpdate&&!1===f.shouldComponentUpdate(w,f.__s,x)||n.__v===o.__v){f.props=w,f.state=f.__s,n.__v!==o.__v&&(f.__d=!1),f.__v=n,n.__e=o.__e,n.__k=o.__k,n.__k.forEach((function(e){e&&(e.__=n)})),f.__h.length&&l.push(f);break e}null!=f.componentWillUpdate&&f.componentWillUpdate(w,f.__s,x),null!=f.componentDidUpdate&&f.__h.push((function(){f.componentDidUpdate(m,v,b)}))}f.context=x,f.props=w,f.state=f.__s,(d=e.__r)&&d(n),f.__d=!1,f.__v=n,f.__P=t,d=f.render(f.props,f.state,f.context),f.state=f.__s,null!=f.getChildContext&&(r=a(a({},r),f.getChildContext())),h||null==f.getSnapshotBeforeUpdate||(b=f.getSnapshotBeforeUpdate(m,v)),S=null!=d&&d.type===_&&null==d.key?d.props.children:d,g(t,Array.isArray(S)?S:[S],n,o,r,i,s,l,c,u),f.base=n.__e,n.__h=null,f.__h.length&&l.push(f),y&&(f.__E=f.__=null),f.__e=!1}else null==s&&n.__v===o.__v?(n.__k=o.__k,n.__e=o.__e):n.__e=L(o.__e,n,o,r,i,s,l,u);(d=e.diffed)&&d(n)}catch(t){n.__v=null,(u||null!=s)&&(n.__e=c,n.__h=!!u,s[s.indexOf(c)]=null),e.__e(t,n,o)}}function C(t,n){e.__c&&e.__c(n,t),t.some((function(n){try{t=n.__h,n.__h=[],t.some((function(e){e.call(n)}))}catch(t){e.__e(t,n.__v)}}))}function L(e,t,n,o,r,l,a,u){var d,_,p,f,h=n.props,m=t.props,v=t.type,b=0;if("svg"===v&&(r=!0),null!=l)for(;b<l.length;b++)if((d=l[b])&&(d===e||(v?d.localName==v:3==d.nodeType))){e=d,l[b]=null;break}if(null==e){if(null===v)return document.createTextNode(m);e=r?document.createElementNS("http://www.w3.org/2000/svg",v):document.createElement(v,m.is&&m),l=null,u=!1}if(null===v)h===m||u&&e.data===m||(e.data=m);else{if(l=l&&s.slice.call(e.childNodes),_=(h=n.props||i).dangerouslySetInnerHTML,p=m.dangerouslySetInnerHTML,!u){if(null!=l)for(h={},f=0;f<e.attributes.length;f++)h[e.attributes[f].name]=e.attributes[f].value;(p||_)&&(p&&(_&&p.__html==_.__html||p.__html===e.innerHTML)||(e.innerHTML=p&&p.__html||""))}if(function(e,t,n,o,r){var i;for(i in n)"children"===i||"key"===i||i in t||k(e,i,null,n[i],o);for(i in t)r&&"function"!=typeof t[i]||"children"===i||"key"===i||"value"===i||"checked"===i||n[i]===t[i]||k(e,i,t[i],n[i],o)}(e,m,h,r,u),p)t.__k=[];else if(b=t.props.children,g(e,Array.isArray(b)?b:[b],t,n,o,r&&"foreignObject"!==v,l,a,e.firstChild,u),null!=l)for(b=l.length;b--;)null!=l[b]&&c(l[b]);u||("value"in m&&void 0!==(b=m.value)&&(b!==e.value||"progress"===v&&!b)&&k(e,"value",b,h.value,!1),"checked"in m&&void 0!==(b=m.checked)&&b!==e.checked&&k(e,"checked",b,h.checked,!1))}return e}function I(t,n,o){try{"function"==typeof t?t(n):t.current=n}catch(t){e.__e(t,o)}}function V(t,n,o){var r,i,s;if(e.unmount&&e.unmount(t),(r=t.ref)&&(r.current&&r.current!==t.__e||I(r,null,n)),o||"function"==typeof t.type||(o=null!=(i=t.__e)),t.__e=t.__d=void 0,null!=(r=t.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(t){e.__e(t,n)}r.base=r.__P=null}if(r=t.__k)for(s=0;s<r.length;s++)r[s]&&V(r[s],n,o);null!=i&&c(i)}function U(e,t,n){return this.constructor(e,n)}function O(t,n,o){var r,l,a;e.__&&e.__(t,n),l=(r="function"==typeof o)?null:o&&o.__k||n.__k,a=[],M(n,t=(!r&&o||n).__k=u(_,null,[t]),l||i,i,void 0!==n.ownerSVGElement,!r&&o?[o]:l?null:n.firstChild?s.slice.call(n.childNodes):null,a,!r&&o?o:l?l.__e:n.firstChild,r),C(a,t)}e={__e:function(e,t){for(var n,o,r;t=t.__;)if((n=t.__c)&&!n.__)try{if((o=n.constructor)&&null!=o.getDerivedStateFromError&&(n.setState(o.getDerivedStateFromError(e)),r=n.__d),null!=n.componentDidCatch&&(n.componentDidCatch(e),r=n.__d),r)return n.__E=n}catch(t){e=t}throw e},__v:0},p.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=a({},this.state),"function"==typeof e&&(e=e(a({},n),this.props)),e&&a(n,e),null!=e&&this.__v&&(t&&this.__h.push(t),m(this))},p.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),m(this))},p.prototype.render=_,t=[],o="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,v.__r=0;var E=function(e,t,n,o){var r;t[0]=0;for(var i=1;i<t.length;i++){var s=t[i++],l=t[i]?(t[0]|=s?1:2,n[t[i++]]):t[++i];3===s?o[0]=l:4===s?o[1]=Object.assign(o[1]||{},l):5===s?(o[1]=o[1]||{})[t[++i]]=l:6===s?o[1][t[++i]]+=l+"":s?(r=e.apply(l,E(e,l,n,["",null])),o.push(r),l[0]?t[0]|=2:(t[i-2]=0,t[i]=r)):o.push(l)}return o},P=new Map,G=function(e){var t=P.get(this);return t||(t=new Map,P.set(this,t)),(t=E(this,t.get(e)||(t.set(e,t=function(e){for(var t,n,o=1,r="",i="",s=[0],l=function(e){1===o&&(e||(r=r.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?s.push(0,e,r):3===o&&(e||r)?(s.push(3,e,r),o=2):2===o&&"..."===r&&e?s.push(4,e,0):2===o&&r&&!e?s.push(5,0,!0,r):o>=5&&((r||!e&&5===o)&&(s.push(o,0,r,n),o=6),e&&(s.push(o,e,0,n),o=6)),r=""},a=0;a<e.length;a++){a&&(1===o&&l(),l(a));for(var c=0;c<e[a].length;c++)t=e[a][c],1===o?"<"===t?(l(),s=[s],o=3):r+=t:4===o?"--"===r&&">"===t?(o=1,r=""):r=t+r[0]:i?t===i?i="":r+=t:'"'===t||"'"===t?i=t:">"===t?(l(),o=1):o&&("="===t?(o=5,n=r,r=""):"/"===t&&(o<5||">"===e[a][c+1])?(l(),3===o&&(s=s[0]),o=s,(s=s[0]).push(2,0,o),o=0):" "===t||"\t"===t||"\n"===t||"\r"===t?(l(),o=2):r+=t),3===o&&"!--"===r&&(o=4,s=s[0])}return l(),s}(e)),t),arguments,[])).length>1?t:t[0]}.bind(u);function j(t,n,o,r,i){var s={};for(var l in n)"ref"!=l&&(s[l]=n[l]);var a,c,u={type:t,props:s,key:o,ref:n&&n.ref,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:++e.__v,__source:r,__self:i};if("function"==typeof t&&(a=t.defaultProps))for(c in a)void 0===s[c]&&(s[c]=a[c]);return e.vnode&&e.vnode(u),u}var R=n(176);let H,T;class z extends p{constructor(){super(...arguments),this.state=T,this.inputs={username:{current:null},password:{current:null}},this.render=(e,{loggedOut:t})=>t&&j("div",Object.assign({class:"vertical-horizontal-center"},{children:j("div",Object.assign({class:"card"},{children:[j("div",Object.assign({class:"card-body"},{children:[j("h5",Object.assign({class:"card-title"},{children:"Login"}),void 0),j("input",{placeholder:"Username",required:!0,class:"input-group-text",ref:this.inputs.username},void 0),j("input",{placeholder:"Password",required:!0,class:"input-group-text",ref:this.inputs.password,type:"password"},void 0)]}),void 0),j("button",Object.assign({class:"btn btn-primary",type:"button",onClick:this.handleClick},{children:"Login"}),void 0)]}),void 0)}),void 0),this.handleClick=()=>{const e=this.inputs.username.current?.value.trim(),t=this.inputs.password.current?.value;e&&t&&this.state?.loggedOutCallback&&this.state.loggedOutCallback({username:e,password:t})},this.componentDidMount=()=>{H=this.setState.bind(this)}}}const N=e=>{if("function"==typeof H)H(e);else{T=e;const t=document.createElement("div");t.className="shared-login-popup",document.body.append(t),GM_addStyle(R),O(j(z,{},void 0),t)}},A=(e=!1)=>{for(const e of["token","lastValidatedToken"])GM_deleteValue(e);if(e)for(const e of["username","password"])GM_deleteValue(e)},B=()=>{GM_setValue("lastValidatedToken",Date.now())};let D;const X=async(e=!1,t=N)=>{if(!e&&D)return D;const n=GM_getValue("token"),o=GM_getValue("lastValidatedToken");return!D&&n&&o&&Date.now()-o<18e6&&(D=Promise.resolve(n)),!e&&D||(D=(async(e=N)=>new Promise((t=>{const n=GM_getValue("username"),o=GM_getValue("password");n&&o?t({username:n,password:o}):e({loggedOut:!0,loggedOutCallback:({username:n,password:o})=>{n&&o&&(GM_setValue("username",n),GM_setValue("password",o),e({loggedOut:!1,loggedOutCallback:void 0}),t({username:n,password:o}))}})})))(t).then((async({username:e,password:n})=>{const o=new URLSearchParams({username:e,password:n,service:"moodle_mobile_app"});return fetch("/login/token.php",{method:"POST",body:o.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}}).then((async e=>e.json())).then((e=>"errorcode"in e?(A(!0),X(!0,t)):(GM_setValue("token",e.token),B(),e.token)))}))),D},F=async(e=N)=>X(!1,e).then((async e=>{const t=new URLSearchParams({wsfunction:"core_webservice_get_site_info",wstoken:e});return fetch("/webservice/rest/server.php?moodlewsrestformat=json",{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:t.toString()}).then((async e=>e.json()))})).then((t=>"exception"in t?(A(),F(e)):(B(),t.userid)));let q;const W=async(e=!1,t=N)=>(!e&&q||(q=Promise.all([X(e,t),F(t)]).then((async([e,t])=>{const n=new URLSearchParams({"requests[0][function]":"core_enrol_get_users_courses","requests[0][arguments]":JSON.stringify({userid:t,returnusercount:!1}),wstoken:e});return fetch("/webservice/rest/server.php?moodlewsrestformat=json&wsfunction=tool_mobile_call_external_functions",{method:"POST",body:n.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}}).then((async e=>e.json()))})).then((e=>{if("exception"in e||e.responses[0].error)return A(),W(!0,t);const n=JSON.parse(e.responses[0].data),o={};for(const{id:e,fullname:t}of n)o[e]=t;return B(),o}))),q);function $(){return($=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var Y,J,K,Q=0,Z=[],ee=e.__b,te=e.__r,ne=e.diffed,oe=e.__c,re=e.unmount;function ie(t,n){e.__h&&e.__h(J,t,Q||n),Q=0;var o=J.__H||(J.__H={__:[],__h:[]});return t>=o.__.length&&o.__.push({}),o.__[t]}function se(e){return Q=5,function(e,t){var n=ie(Y++,7);return de(n.__H,t)&&(n.__=e(),n.__H=t,n.__h=e),n.__}((function(){return{current:e}}),[])}function le(){Z.forEach((function(t){if(t.__P)try{t.__H.__h.forEach(ce),t.__H.__h.forEach(ue),t.__H.__h=[]}catch(n){t.__H.__h=[],e.__e(n,t.__v)}})),Z=[]}e.__b=function(e){J=null,ee&&ee(e)},e.__r=function(e){te&&te(e),Y=0;var t=(J=e.__c).__H;t&&(t.__h.forEach(ce),t.__h.forEach(ue),t.__h=[])},e.diffed=function(t){ne&&ne(t);var n=t.__c;n&&n.__H&&n.__H.__h.length&&(1!==Z.push(n)&&K===e.requestAnimationFrame||((K=e.requestAnimationFrame)||function(e){var t,n=function(){clearTimeout(o),ae&&cancelAnimationFrame(t),setTimeout(e)},o=setTimeout(n,100);ae&&(t=requestAnimationFrame(n))})(le)),J=void 0},e.__c=function(t,n){n.some((function(t){try{t.__h.forEach(ce),t.__h=t.__h.filter((function(e){return!e.__||ue(e)}))}catch(o){n.some((function(e){e.__h&&(e.__h=[])})),n=[],e.__e(o,t.__v)}})),oe&&oe(t,n)},e.unmount=function(t){re&&re(t);var n=t.__c;if(n&&n.__H)try{n.__H.__.forEach(ce)}catch(t){e.__e(t,n.__v)}};var ae="function"==typeof requestAnimationFrame;function ce(e){var t=J;"function"==typeof e.__c&&e.__c(),J=t}function ue(e){var t=J;e.__c=e.__(),J=t}function de(e,t){return!e||e.length!==t.length||t.some((function(t,n){return t!==e[n]}))}var _e=n(630);const pe=e=>{const t=GM_getValue("pointers"),n=GM_getValue("values"),o=t[e];o&&(delete t[e],Object.values(t).includes(o)||(delete n[o],GM_setValue("values",n)),GM_setValue("pointers",t))},fe="FILE",he="COPY",me="URL",ve="An error occured",ge=({class:e,...t})=>u("svg",$({fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",class:"svg-icon svg-icon-x"+(e?` ${e}`:""),viewBox:"0 0 24 24"},t),u("path",{d:"M24 0L0 24M0 0l24 24"})),be=({iconVals:{hasIcon:e,isXML:t,rawXML:n,dataURI:o},delIcon:r,renderX:i=!1})=>e&&u(_,null,t?u("span",{class:"icon"},G([n])):u("img",{src:o,class:"icon"}),i&&u(ge,{class:"svg-del-icon",onClick:r})),ye=({item:e,rowClick:t,delIcon:n})=>{const{courseName:o,iconVals:r}=e;return u("div",{class:"row",onClick:n=>{t(n,e)}},u(be,{renderX:!0,iconVals:r,delIcon:t=>{n(t,e)}}),u("span",null,o))},we=({courses:e,...t})=>u("div",{class:"outer-sidebar"},u("div",{class:"sidebar"},0===e.length&&u("div",null,"Loading courses...."),e.map((e=>u(ye,$({key:e.courseId,item:e},t)))))),ke=e=>{const t=GM_getValue("pointers")[e];if(t){const e=GM_getValue("values")[t];if(e){const t={isXML:"rawXML"in e,hasIcon:!0};if(t.isXML)t.rawXML=e.rawXML;else{const{mediaType:n,rawByteString:o}=e;t.dataURI=`data:${n};base64,${o}`}return t}}return{hasIcon:!1}},xe=({selected:{iconVals:e,courseName:t,isSelected:n,courseId:o},courses:r,handleInput:i,currentInput:s,currentInputVal:l,handleSave:a,loggedOut:c,loggedOutCallback:d,formRef:p,reset:f})=>{const h=se(null),m=se(null),v=se(null);return u("div",{class:"outer-main"},u("div",{class:"main"},c?u("div",{class:"replace-flex-input"},u("h2",null,"Login"),u("input",{placeholder:"Username",ref:m}),u("input",{placeholder:"Password",ref:v,type:"password"}),u("button",{class:"btn-save",type:"button",onClick:()=>{const e=m.current?.value?.trim(),t=v.current?.value;d({username:e,password:t})}},"Login")):u("form",{ref:p},u("h2",null,"Change or add an icon"),u("div",null,n?u(_,null,u(be,{iconVals:e}),u("span",null,t)):"Select course to the left"),u("h3",null,"Upload image from URL"),u("input",{type:"url",placeholder:"Image url",disabled:s&&s!==me,onInput:e=>{i(e,me)}}),u("h3",null,"Upload image from file"),u("input",{type:"file",hidden:!0,ref:h,onInput:e=>{i(e,fe)}}),u("button",{type:"button",onClick:()=>{h.current?.click()},disabled:s&&s!==fe},s===fe?u(_,null,l.name,u(ge,{class:"svg-clear",onClick:e=>{e.preventDefault(),e.stopImmediatePropagation(),f()}})):"Upload file"),u("h3",null,"Copy image from other course"),u("select",{disabled:s&&s!==he,onInput:e=>{i(e,he)}},u("option",{selected:!0,value:"null"},"Select course to copy icon from"),r.map((({courseName:e,courseId:t,iconVals:{hasIcon:r}})=>r&&(!n||o!==t)&&u("option",{value:t},e)))),u("button",{class:"btn-save",type:"button",onClick:a},"Save"))))},Se=({handleClick:t,notificationString:n})=>(function(t,n){var o=ie(Y++,3);!e.__s&&de(o.__H,n)&&(o.__=()=>{scroll({top:0,left:0,behavior:"smooth"})},o.__H=n,J.__H.__h.push(o))}(0,[]),u("div",{class:"outer-notification",onClick:e=>{t(e,!0)}},u("div",{class:"inner-notification"},u(ge,{class:"svg-close",onClick:t}),u("div",{class:"notification-string"},n))));class Me extends p{state={courses:[],selected:{isSelected:!1},notificationString:void 0,inputVals:{current:!1}};form={current:null};render=(e,{courses:t,selected:n,inputVals:{current:o,val:r},loggedOut:i,loggedOutCallback:s,notificationString:l})=>u(_,null,u("div",{class:"container"+(l?" blur":"")},u(we,{courses:t,rowClick:this.rowClick,delIcon:this.delIcon}),u(xe,{courses:t,selected:n,handleInput:this.handleMainInput,currentInput:o,currentInputVal:r,loggedOut:i,loggedOutCallback:s,handleSave:this.handleSave,formRef:this.form,reset:this.reset})),l&&u(Se,{handleClick:this.closeNotification,notificationString:l}));closeNotification=(e,t)=>{e.stopImmediatePropagation(),t&&e.target.classList.contains("outer-notification")||this.setState({notificationString:void 0})};handleSave=()=>{const{isSelected:e}=this.state.selected;if(e){const e=this.state.inputVals.current;if(e){const{val:t}=this.state.inputVals;e===me?this.saveHandlers.saveByURL(t):e===fe?this.saveHandlers.saveWithFileHandler(t):e===he&&this.saveHandlers.saveByCopy(t)}else this.setState({notificationString:"You haven't submitted an icon"})}else this.setState({notificationString:"You haven't selected a course"})};handleMainInput=(e,t)=>{const{target:n}=e,{value:o,files:r}=n;this.setState((()=>{const e={current:!1};switch(t){case me:e.val=o,e.current=""!==o.trim()&&me;break;case he:e.val=o,e.current="null"!==o&&he;break;case fe:e.val=r[0],e.current=0!==r?.length&&fe}return e.current?{inputVals:e}:{inputVals:{current:!1}}}))};rowClick=(e,t)=>{this.setState({selected:{...t,isSelected:!0}})};delIcon=(e,{courseId:t})=>{e.stopImmediatePropagation(),pe(t),t===this.state.selected.courseId&&this.reset(),this.updateCourseById(t)};updateCourseById=e=>{this.setState((({courses:t})=>{for(const n of t)if(n.courseId===e){n.iconVals=ke(e);break}return{courses:t}}))};componentDidMount=()=>{this.updateCourses()};updateCourses=()=>{W(!1,this.setState.bind(this)).then((e=>{const t=Object.entries(e).sort(((e,t)=>{const n=e[1].toLowerCase(),o=t[1].toLowerCase();return n<o?-1:n>o?1:0})).map((([e,t])=>({courseId:e,courseName:t,iconVals:ke(e)})));this.setState({courses:t})}))};reset=(e=!0)=>{this.form.current.reset(),this.setState({inputVals:{current:!1},...e&&{selected:{isSelected:!1}}})};saveHandlers={saveByURL:e=>{try{const t=new URL(e);GM_xmlhttpRequest({method:"GET",url:t.href,timeout:15e3,responseType:"blob",anonymous:!0,onabort:()=>{this.setState({notificationString:"Request was aborted"})},onerror:()=>{this.setState({notificationString:ve})},ontimeout:()=>{this.setState({notificationString:"Request timed out"})},onload:e=>{var t,n;200===e.status?this.saveHandlers.saveWithFileHandler(e.response):this.setState({notificationString:(t=e.status,n=e.statusText,`Error ${t}: ${n}`)})}})}catch{this.setState({notificationString:"Invalid URL submitted"})}},saveWithFileHandler:e=>{const t=new FileReader;t.addEventListener("error",(()=>{this.setState({notificationString:ve})})),t.addEventListener("load",(()=>{const n=new Image;n.addEventListener("error",(()=>{this.setState({notificationString:"File was not an image"})})),n.addEventListener("load",(()=>{const n=this.state.selected.courseId;pe(n);const o=GM_getValue("pointers"),r=((e=21)=>{let t="",n=crypto.getRandomValues(new Uint8Array(e));for(;e--;){let o=63&n[e];t+=o<36?o.toString(36):o<62?(o-26).toString(36).toUpperCase():o<63?"_":"-"}return t})(),i=GM_getValue("values"),s={},{rawByteString:l}=t.result.match(/^data:[\w+/]+;base64,(?<rawByteString>.+)$/).groups;if("image/svg+xml"===e.type){const e=decodeURI(atob(l));s.rawXML=e}else s.rawByteString=l,s.mediaType=e.type;i[r]=s,GM_setValue("values",i),o[n]=r,GM_setValue("pointers",o),this.updateCourseById(n),this.reset()})),n.src=t.result})),t.readAsDataURL(e)},saveByCopy:e=>{const{courseId:t}=this.state.selected,n=GM_getValue("pointers");pe(t),n[t]=n[e],GM_setValue("pointers",n),this.updateCourseById(t),this.reset()}}}const Ce=()=>{"https:"!==location.protocol&&(location.protocol="https:");const{body:e,head:t}=document;for(;e.lastChild;)e.lastChild.remove();for(;t.lastChild;)t.lastChild.remove();const n=document.createElement("link");n.rel="shortcut icon",n.href="/theme/image.php/classic/theme/1606210545/favicon",t.append(n),document.title="Custom Icons Setup",history.replaceState({},"","/customIconsPreact"),GM_addStyle(_e),O(u(Me,null),e)};
// ==UserScript==
// @name      Custom Icons Preact
// @version   2021.05.04a
// @author    lusc
// @updateURL https://git.io/Jqlt8
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
"object"!=typeof GM_getValue("pointers")&&(GM_setValue("pointers",{}),GM_setValue("values",{}));const Le=!/^\/customiconspreact/i.test(location.pathname),Ie=e=>e.querySelector('li[aria-labelledby="label_2_4"] ul[role="group"]')??e.querySelector("#label_3_21")?.closest('ul[role="group"]'),Ve=(e,t)=>{const n=t.querySelector(`a[href="https://moodle.ksasz.ch/course/view.php?id=${e}"]`);if(n){if(n.childElementCount>0){const t=(e=>{const t=(e=>{const t=GM_getValue("pointers")[e];if(!t)return;const n=GM_getValue("values")[t];return"rawXML"in n?{rawXML:n.rawXML,isXML:!0}:{...n,isXML:!1}})(e);if("object"==typeof t){if(t.isXML)return t;const{mediaType:e,rawByteString:n}=t,o=atob(n),{length:r}=o,i=new ArrayBuffer(r),s=new Uint8Array(i);for(let e=0;e<r;++e)s[e]=o.charCodeAt(e);const l=new Blob([s],{type:e});return{blobURL:URL.createObjectURL(l),isXML:!1}}})(e);if("object"!=typeof t)return;if(t.isXML){const e=document.createElement("span");e.className="icon navicon",e.style.display="inline-block",e.style.color="var(--svg-fill, inherit)",O(G([t.rawXML]),e),n.firstElementChild.replaceWith(e)}else{const e=new Image;e.classList.add("icon","navicon"),e.setAttribute("aria-hidden",!0),e.style="fill: var(--svg-fill, inherit);stroke: var(--svg-fill, inherit);-moz-context-properties: fill, stroke;",e.tabIndex=-1,e.src=t.blobURL,e.addEventListener("load",(()=>{URL.revokeObjectURL(t.blobURL)}),{once:!0}),n.firstElementChild.replaceWith(e)}}}else(e=>{W().then((t=>{e in t||(pe(e),alert(`You appear to not be in the course with the id "${e}" anymore.\nThe course will not be checked for anymore`))}))})(e)},Ue=(e,t={},n={},o)=>{if(o){const e=Ie(document),o=Object.entries(t),r=Object.entries(n).filter((([e,n])=>!(e in t)&&t[e]!==n)),i=o.filter((([e])=>!(e in n)));for(const[t]of i){const n=e.querySelector(`a[href="https://moodle.ksasz.ch/course/view.php?id=${t}"] > .icon.navicon`);if(n&&("SPAN"===n.nodeName||"IMG"===n.nodeName)){const e=document.createElement("i");e.classList.add("icon","fa","fa-graduation-cap","fa-fw","navicon"),e.setAttribute("aria-hidden",!0),e.tabIndex=-1,n.replaceWith(e)}}for(const[t]of r)Ve(t,e)}},Oe=()=>{const e=Ie(document);if(e){const t=Object.keys(GM_getValue("pointers"));for(const n of t)Ve(n,e);GM_addValueChangeListener("pointers",Ue)}},Ee=()=>{GM_registerMenuCommand("Open settings",(()=>{open("/customIconsPreact/","_blank")})),addEventListener("customIconsPreact",Oe),Oe()};if(!/^\/cleanmoodle/i.test(location.pathname)){const e=Le?Ee:Ce;"complete"===document.readyState?e():addEventListener("DOMContentLoaded",e,{once:!0})}})()})();