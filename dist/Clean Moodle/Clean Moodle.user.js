(()=>{"use strict";var e={235:e=>{e.exports='html{cursor:default;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;word-break:break-word;background:#202020;color:#ccc;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";font-size:.9375rem;font-weight:400;line-height:1.5;user-select:none}img{border-style:none}button{overflow:visible}button,input{font-family:inherit;font-size:100%}button::-moz-focus-inner{border-style:none;padding:0}:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}*,::after,::before{box-sizing:border-box}::after,::before{text-decoration:inherit;vertical-align:inherit}body,button,input{margin:0}svg{vertical-align:middle}svg:not([fill]){fill:currentColor}svg:not(:root){overflow:hidden}button{-webkit-appearance:button;text-transform:none}input{overflow:visible}::-webkit-input-placeholder{color:inherit;opacity:.54}::-moz-focus-inner{border-style:none;padding:0}button,input{-ms-touch-action:manipulation;touch-action:manipulation}body{padding:1%}@media (min-width:0px){:root{--sidebar-flex: 0 0 100%;--main-flex: 0 0 100%;--padding-horizontal: 0;--padding-vertical: 0.5%}}@media (min-width:768px){:root{--sidebar-flex: 0 0 32%;--main-flex: 0 0 68%;--padding-horizontal: 0.5%;--padding-vertical: 0}}@media (min-width:992px){:root{--sidebar-flex: 0 0 25%;--main-flex: 0 0 75%}}@media (min-width:1200px){:root{--sidebar-flex: 0 0 20%;--main-flex: 0 0 80%}}.outer-sidebar{flex:var(--sidebar-flex);padding-right:var(--padding-horizontal);padding-bottom:var(--padding-vertical)}.outer-sidebar .sidebar{display:flex;flex-direction:column;padding:10px 15px;border:1.5px solid #343434;border-radius:4px;background-color:#141414}.outer-sidebar .row{cursor:pointer;display:flex;align-items:center;color:#198754}.outer-sidebar .row:hover{text-decoration:underline}.outer-sidebar .row.removed{color:#dc3545}.btn-save:not([disabled]){cursor:pointer}h5{font-size:18.75px;font-weight:300;margin:0 0 12px}.icon{height:1.5em;width:1.5em}.section-title{font-size:30px;font-weight:300;-webkit-font-smoothing:antialiased}.svg-icon-check{color:#198754}.svg-icon-x{color:#dc3545}.outer-main{flex:var(--main-flex);padding-left:var(--padding-horizontal);padding-top:var(--padding-vertical)}.main{padding:3% 2% 5%;border:1.5px solid #343434;border-radius:4px;background-color:#141414}.replace-flex-inputs{display:flex;flex-direction:column;margin-top:10px}.replace-flex-inputs *{align-self:flex-start;margin-bottom:10px}button,input{display:flex;align-items:center;padding:.375rem .75rem;font-size:.9375rem;font-weight:400;line-height:1.5;color:#495057;white-space:nowrap;background-color:#e9ecef;border:1px solid #8f959e;border-radius:.25rem}button{text-align:center;background-color:#1177d1;color:#ccc;margin-top:10px}.container{display:flex;flex-direction:row;flex-wrap:wrap;width:100%;height:max-content}'},703:e=>{e.exports=".shared-login-popup .vertical-horizontal-center{width:100%;height:100%;position:fixed;z-index:100000000;top:0;left:0;display:flex;align-items:center;justify-content:center;pointer-events:none}.shared-login-popup .card{pointer-events:auto}"}},t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={exports:{}};return e[o](r,r.exports,n),r.exports}(()=>{var e,t,o,r,l={},s=[],i=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function a(e,t){for(var n in t)e[n]=t[n];return e}function c(e){var t=e.parentNode;t&&t.removeChild(e)}function u(e,t,n){var o,r,l,s=arguments,i={};for(l in t)"key"==l?o=t[l]:"ref"==l?r=t[l]:i[l]=t[l];if(arguments.length>3)for(n=[n],l=3;l<arguments.length;l++)n.push(s[l]);if(null!=n&&(i.children=n),"function"==typeof e&&null!=e.defaultProps)for(l in e.defaultProps)void 0===i[l]&&(i[l]=e.defaultProps[l]);return d(e,i,o,r,null)}function d(t,n,o,r,l){var s={type:t,props:n,key:o,ref:r,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==l?++e.__v:l};return null!=e.vnode&&e.vnode(s),s}function p(e){return e.children}function _(e,t){this.props=e,this.context=t}function f(e,t){if(null==t)return e.__?f(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?f(e):null}function h(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return h(e)}}function m(n){(!n.__d&&(n.__d=!0)&&t.push(n)&&!g.__r++||r!==e.debounceRendering)&&((r=e.debounceRendering)||o)(g)}function g(){for(var e;g.__r=t.length;)e=t.sort((function(e,t){return e.__v.__b-t.__v.__b})),t=[],e.some((function(e){var t,n,o,r,l,s;e.__d&&(l=(r=(t=e).__v).__e,(s=t.__P)&&(n=[],(o=a({},r)).__v=r.__v+1,S(s,r,o,t.__n,void 0!==s.ownerSVGElement,null!=r.__h?[l]:null,n,null==l?f(r):l,r.__h),M(n,r),r.__e!=l&&h(r)))}))}function v(e,t,n,o,r,i,a,c,u,_){var h,m,g,v,k,w,x,C=o&&o.__k||s,M=C.length;for(n.__k=[],h=0;h<t.length;h++)if(null!=(v=n.__k[h]=null==(v=t[h])||"boolean"==typeof v?null:"string"==typeof v||"number"==typeof v?d(null,v,null,null,v):Array.isArray(v)?d(p,{children:v},null,null,null):v.__b>0?d(v.type,v.props,v.key,null,v.__v):v)){if(v.__=n,v.__b=n.__b+1,null===(g=C[h])||g&&v.key==g.key&&v.type===g.type)C[h]=void 0;else for(m=0;m<M;m++){if((g=C[m])&&v.key==g.key&&v.type===g.type){C[m]=void 0;break}g=null}S(e,v,g=g||l,r,i,a,c,u,_),k=v.__e,(m=v.ref)&&g.ref!=m&&(x||(x=[]),g.ref&&x.push(g.ref,null,v),x.push(m,v.__c||k,v)),null!=k?(null==w&&(w=k),"function"==typeof v.type&&null!=v.__k&&v.__k===g.__k?v.__d=u=b(v,u,e):u=y(e,v,g,C,k,u),_||"option"!==n.type?"function"==typeof n.type&&(n.__d=u):e.value=""):u&&g.__e==u&&u.parentNode!=e&&(u=f(g))}for(n.__e=w,h=M;h--;)null!=C[h]&&("function"==typeof n.type&&null!=C[h].__e&&C[h].__e==n.__d&&(n.__d=f(o,h+1)),P(C[h],C[h]));if(x)for(h=0;h<x.length;h++)O(x[h],x[++h],x[++h])}function b(e,t,n){var o,r;for(o=0;o<e.__k.length;o++)(r=e.__k[o])&&(r.__=e,t="function"==typeof r.type?b(r,t,n):y(n,r,r,e.__k,r.__e,t));return t}function y(e,t,n,o,r,l){var s,i,a;if(void 0!==t.__d)s=t.__d,t.__d=void 0;else if(null==n||r!=l||null==r.parentNode)e:if(null==l||l.parentNode!==e)e.appendChild(r),s=null;else{for(i=l,a=0;(i=i.nextSibling)&&a<o.length;a+=2)if(i==r)break e;e.insertBefore(r,l),s=l}return void 0!==s?s:r.nextSibling}function k(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]=null==n?"":"number"!=typeof n||i.test(t)?n:n+"px"}function w(e,t,n,o,r){var l;e:if("style"===t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof o&&(e.style.cssText=o=""),o)for(t in o)n&&t in n||k(e.style,t,"");if(n)for(t in n)o&&n[t]===o[t]||k(e.style,t,n[t])}else if("o"===t[0]&&"n"===t[1])l=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+l]=n,n?o||e.addEventListener(t,l?C:x,l):e.removeEventListener(t,l?C:x,l);else if("dangerouslySetInnerHTML"!==t){if(r)t=t.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if("href"!==t&&"list"!==t&&"form"!==t&&"download"!==t&&t in e)try{e[t]=null==n?"":n;break e}catch(e){}"function"==typeof n||(null!=n&&(!1!==n||"a"===t[0]&&"r"===t[1])?e.setAttribute(t,n):e.removeAttribute(t))}}function x(t){this.l[t.type+!1](e.event?e.event(t):t)}function C(t){this.l[t.type+!0](e.event?e.event(t):t)}function S(t,n,o,r,l,s,i,c,u){var d,f,h,m,g,b,y,k,w,x,C,S=n.type;if(void 0!==n.constructor)return null;null!=o.__h&&(u=o.__h,c=n.__e=o.__e,n.__h=null,s=[c]),(d=e.__b)&&d(n);try{e:if("function"==typeof S){if(k=n.props,w=(d=S.contextType)&&r[d.__c],x=d?w?w.props.value:d.__:r,o.__c?y=(f=n.__c=o.__c).__=f.__E:("prototype"in S&&S.prototype.render?n.__c=f=new S(k,x):(n.__c=f=new _(k,x),f.constructor=S,f.render=V),w&&w.sub(f),f.props=k,f.state||(f.state={}),f.context=x,f.__n=r,h=f.__d=!0,f.__h=[]),null==f.__s&&(f.__s=f.state),null!=S.getDerivedStateFromProps&&(f.__s==f.state&&(f.__s=a({},f.__s)),a(f.__s,S.getDerivedStateFromProps(k,f.__s))),m=f.props,g=f.state,h)null==S.getDerivedStateFromProps&&null!=f.componentWillMount&&f.componentWillMount(),null!=f.componentDidMount&&f.__h.push(f.componentDidMount);else{if(null==S.getDerivedStateFromProps&&k!==m&&null!=f.componentWillReceiveProps&&f.componentWillReceiveProps(k,x),!f.__e&&null!=f.shouldComponentUpdate&&!1===f.shouldComponentUpdate(k,f.__s,x)||n.__v===o.__v){f.props=k,f.state=f.__s,n.__v!==o.__v&&(f.__d=!1),f.__v=n,n.__e=o.__e,n.__k=o.__k,f.__h.length&&i.push(f);break e}null!=f.componentWillUpdate&&f.componentWillUpdate(k,f.__s,x),null!=f.componentDidUpdate&&f.__h.push((function(){f.componentDidUpdate(m,g,b)}))}f.context=x,f.props=k,f.state=f.__s,(d=e.__r)&&d(n),f.__d=!1,f.__v=n,f.__P=t,d=f.render(f.props,f.state,f.context),f.state=f.__s,null!=f.getChildContext&&(r=a(a({},r),f.getChildContext())),h||null==f.getSnapshotBeforeUpdate||(b=f.getSnapshotBeforeUpdate(m,g)),C=null!=d&&d.type===p&&null==d.key?d.props.children:d,v(t,Array.isArray(C)?C:[C],n,o,r,l,s,i,c,u),f.base=n.__e,n.__h=null,f.__h.length&&i.push(f),y&&(f.__E=f.__=null),f.__e=!1}else null==s&&n.__v===o.__v?(n.__k=o.__k,n.__e=o.__e):n.__e=I(o.__e,n,o,r,l,s,i,u);(d=e.diffed)&&d(n)}catch(t){n.__v=null,(u||null!=s)&&(n.__e=c,n.__h=!!u,s[s.indexOf(c)]=null),e.__e(t,n,o)}}function M(t,n){e.__c&&e.__c(n,t),t.some((function(n){try{t=n.__h,n.__h=[],t.some((function(e){e.call(n)}))}catch(t){e.__e(t,n.__v)}}))}function I(e,t,n,o,r,i,a,u){var d,p,_,f,h=n.props,m=t.props,g=t.type,b=0;if("svg"===g&&(r=!0),null!=i)for(;b<i.length;b++)if((d=i[b])&&(d===e||(g?d.localName==g:3==d.nodeType))){e=d,i[b]=null;break}if(null==e){if(null===g)return document.createTextNode(m);e=r?document.createElementNS("http://www.w3.org/2000/svg",g):document.createElement(g,m.is&&m),i=null,u=!1}if(null===g)h===m||u&&e.data===m||(e.data=m);else{if(i=i&&s.slice.call(e.childNodes),p=(h=n.props||l).dangerouslySetInnerHTML,_=m.dangerouslySetInnerHTML,!u){if(null!=i)for(h={},f=0;f<e.attributes.length;f++)h[e.attributes[f].name]=e.attributes[f].value;(_||p)&&(_&&(p&&_.__html==p.__html||_.__html===e.innerHTML)||(e.innerHTML=_&&_.__html||""))}if(function(e,t,n,o,r){var l;for(l in n)"children"===l||"key"===l||l in t||w(e,l,null,n[l],o);for(l in t)r&&"function"!=typeof t[l]||"children"===l||"key"===l||"value"===l||"checked"===l||n[l]===t[l]||w(e,l,t[l],n[l],o)}(e,m,h,r,u),_)t.__k=[];else if(b=t.props.children,v(e,Array.isArray(b)?b:[b],t,n,o,r&&"foreignObject"!==g,i,a,e.firstChild,u),null!=i)for(b=i.length;b--;)null!=i[b]&&c(i[b]);u||("value"in m&&void 0!==(b=m.value)&&(b!==e.value||"progress"===g&&!b)&&w(e,"value",b,h.value,!1),"checked"in m&&void 0!==(b=m.checked)&&b!==e.checked&&w(e,"checked",b,h.checked,!1))}return e}function O(t,n,o){try{"function"==typeof t?t(n):t.current=n}catch(t){e.__e(t,o)}}function P(t,n,o){var r,l,s;if(e.unmount&&e.unmount(t),(r=t.ref)&&(r.current&&r.current!==t.__e||O(r,null,n)),o||"function"==typeof t.type||(o=null!=(l=t.__e)),t.__e=t.__d=void 0,null!=(r=t.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(t){e.__e(t,n)}r.base=r.__P=null}if(r=t.__k)for(s=0;s<r.length;s++)r[s]&&P(r[s],n,o);null!=l&&c(l)}function V(e,t,n){return this.constructor(e,n)}function E(t,n,o){var r,i,a;e.__&&e.__(t,n),i=(r="function"==typeof o)?null:o&&o.__k||n.__k,a=[],S(n,t=(!r&&o||n).__k=u(p,null,[t]),i||l,l,void 0!==n.ownerSVGElement,!r&&o?[o]:i?null:n.firstChild?s.slice.call(n.childNodes):null,a,!r&&o?o:i?i.__e:n.firstChild,r),M(a,t)}e={__e:function(e,t){for(var n,o,r;t=t.__;)if((n=t.__c)&&!n.__)try{if((o=n.constructor)&&null!=o.getDerivedStateFromError&&(n.setState(o.getDerivedStateFromError(e)),r=n.__d),null!=n.componentDidCatch&&(n.componentDidCatch(e),r=n.__d),r)return n.__E=n}catch(t){e=t}throw e},__v:0},_.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=a({},this.state),"function"==typeof e&&(e=e(a({},n),this.props)),e&&a(n,e),null!=e&&this.__v&&(t&&this.__h.push(t),m(this))},_.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),m(this))},_.prototype.render=p,t=[],o="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,g.__r=0;var R=n(703);function z(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const G=()=>GM_setValue("lastValidatedToken",(new Date).getTime()),L=(e=!1)=>{["token","lastValidatedToken"].forEach(GM_deleteValue),e&&["username","password"].forEach(GM_deleteValue)};let N;const j=(e=!1,t=q)=>{if(!e&&N)return N;const n=GM_getValue("token"),o=GM_getValue("lastValidatedToken");return!N&&n&&+new Date-o<18e6&&(N=Promise.resolve(n)),!e&&N||(N=U(t).then((({username:e,password:n})=>{const o=new URLSearchParams;return o.set("username",e),o.set("password",n),o.set("service","moodle_mobile_app"),fetch("/login/token.php",{method:"POST",body:o.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}}).then((e=>e.json())).then((e=>e.hasOwnProperty("errorcode")?(L(!0),j(!0,t)):(GM_setValue("token",e.token),G(),e.token)))}))),N},T=(e=q)=>j(!1,e).then((e=>{const t=new URLSearchParams;return t.set("wsfunction","core_webservice_get_site_info"),t.set("wstoken",e),fetch("/webservice/rest/server.php?moodlewsrestformat=json",{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:t.toString()})})).then((e=>e.json())).then((t=>t.hasOwnProperty("exception")?(L(),T(e)):(G(),t.userid))),U=(e=q)=>new Promise((t=>{const n=({username:n,password:o})=>{GM_setValue("username",n),GM_setValue("password",o),e({loggedOut:!1,loggedOutCallback:null}),t({username:n,password:o})},o=GM_getValue("username"),r=GM_getValue("password");o&&r?t({username:o,password:r}):e({loggedOut:!0,loggedOutCallback:n})}));let A,D={};class B extends _{constructor(...e){super(...e),z(this,"state",D),z(this,"inputs",{}),z(this,"render",((e,{loggedOut:t})=>t&&u("div",{class:"vertical-horizontal-center"},u("div",{class:"card"},u("div",{class:"card-body"},u("h5",{class:"card-title"},"Login"),u("input",{placeholder:"Username",required:!0,class:"input-group-text",ref:e=>{this.inputs.username=e}}),u("input",{placeholder:"Password",required:!0,class:"input-group-text",ref:e=>{this.inputs.password=e},type:"password"})),u("button",{class:"btn btn-primary",onClick:this.handleClick},"Login"))))),z(this,"handleClick",(()=>{const e=this.inputs.username.value.trim(),t=this.inputs.password.value;e&&t&&this.state.loggedOutCallback({username:e,password:t})})),z(this,"componentDidMount",(()=>{A=this.setState.bind(this)}))}}const q=e=>{if("function"==typeof A)A(e);else{D=e;const t=document.createElement("div");t.className="shared-login-popup",document.body.append(t),GM_addStyle(R),E(u(B,null),t)}};let H;const W=(e=!1,t=q)=>(!e&&H||(H=Promise.all([j(!1,t),T(t)]).then((([e,t])=>{const n=new URLSearchParams;return n.set("requests[0][function]","core_enrol_get_users_courses"),n.set("requests[0][arguments]",JSON.stringify({userid:t,returnusercount:!1})),n.set("wsfunction","tool_mobile_call_external_functions"),n.set("wstoken",e),fetch("/webservice/rest/server.php?moodlewsrestformat=json",{method:"POST",body:n.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}}).then((e=>e.json()))})).then((e=>{if(e.hasOwnProperty("exception"))return L(),W(!0,t);const n=JSON.parse(e.responses[0].data),o={};for(const{id:e,fullname:t}of n)o[e]=t;return G(),o}))),H),$=(e,t,n)=>{[e[t],e[n]]=[e[n],e[t]]},F=(e,t,n=0,o=e.length-1)=>{let r;return e.length>1&&(r=((e,t,n,o)=>{const r=e[o+n>>>1];let l=n,s=o;for(;l<=s;){for(;-1===t(e[l],r);)l++;for(;1===t(e[s],r);)s--;l<=s&&($(e,l,s),l++,s--)}return l})(e,t,n,o),n<r-1&&F(e,t,n,r-1),r<o&&F(e,t,r,o)),e},J=(e,{updateReplacers:t=!0,updateRemovers:n=!0}={})=>{const o=new Set(GM_getValue("remove"));o.delete(e);const r=[...o],l=GM_getValue("replace")??{};return delete l[e],n&&GM_setValue("remove",r),t&&GM_setValue("replace",l),{replacers:l,removers:r}};var K=n(235);function Y(){return(Y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}function Q(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const X=()=>{const{head:e,body:t}=document;for(;e.lastChild;)e.lastChild.remove();for(;t.lastChild;)t.lastChild.remove();history.replaceState({},"","/cleanMoodlePreact"),document.title="Clean Moodle Setup",GM_addStyle(K),E(u(Z,null),t);const n=document.createElement("link");n.rel="shortcut icon",n.href="/theme/image.php/classic/theme/1588340020/favicon",document.head.append(n)};class Z extends _{constructor(...e){super(...e),Q(this,"state",{courses:[],loadingCourses:!0,selected:{isSelected:!1},loggedOut:!1,loggedOutCallback:null}),Q(this,"replaceInputRef",{current:null}),Q(this,"inputs",{username:{current:null},password:{current:null}}),Q(this,"render",((e,{courses:t,selected:n,loggedOut:o,loadingCourses:r})=>u("div",{class:"container"},u(le,{courses:t,handleClick:this.handleSidebarClick,toggleItem:this.toggleItem,resetItem:this.resetItem,loadingCourses:r}),u(ue,{selected:n,replaceInputRef:this.replaceInputRef,handleSave:this.handleSave,loggedOut:o,loggedOutCallback:this.loggedOutCallbackHandler,loggedOutInputs:this.inputs})))),Q(this,"loggedOutCallbackHandler",(()=>{const e=this.inputs.username.current.value.trim(),t=this.inputs.password.current.value;e&&t&&this.state.loggedOutCallback({username:e,password:t})})),Q(this,"componentDidMount",(()=>{W(!1,this.setState.bind(this)).then((e=>{const t=Object.entries(e).map((([e,t])=>{const n=te(e);return{courseName:t,courseId:e,isReplaced:!1!==n,replacedName:n,isRemoved:ne(e)}}));ee(t),this.setState({courses:t,loadingCourses:!1})}))})),Q(this,"handleSave",(e=>{if("keydown"!==e.type||"Enter"===e.key){const e=this.replaceInputRef.current.value,{courseId:t,courseName:n}=this.state.selected;re(t,e,n),this.setState((()=>({selected:{isSelected:!1}}))),this.updateCourseById(t)}})),Q(this,"toggleItem",((e,{isRemoved:t,courseId:n})=>{e.stopImmediatePropagation(),t?J(n):oe(n),this.updateCourseById(n),this.removeSelectedIfEqualId(n)})),Q(this,"resetItem",((e,t)=>{const{courseId:n}=t;e.stopImmediatePropagation(),this.removeSelectedIfEqualId(n),J(n),this.updateCourseById(n)})),Q(this,"removeSelectedIfEqualId",(e=>{this.setState((({selected:t})=>t.courseId===e?{selected:{isSelected:!1}}:{}))})),Q(this,"updateCourseById",(e=>{this.setState((({courses:t})=>{for(const n of t)if(n.courseId===e){n.isRemoved=ne(e);const t=te(e);n.isReplaced=!1!==t,n.replacedName=t;break}return ee(t),{courses:t}}))})),Q(this,"handleSidebarClick",((e,t)=>{t.isRemoved&&(J(t.courseId,{updateReplacers:!1}),this.updateCourseById(t.courseId)),this.setState({selected:{isSelected:!0,...t}},(()=>{const e=this.replaceInputRef.current;e&&(e.focus(),e.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}))}))}))}}const ee=e=>F(e,(({courseName:e,isReplaced:t,replacedName:n},{courseName:o,isReplaced:r,replacedName:l})=>{const s=(t?n:e).toLowerCase(),i=(r?l:o).toLowerCase();return s<i?-1:s>i?1:0})),te=e=>{const t=GM_getValue("replace")??{};return"string"==typeof t[e]&&t[e]},ne=e=>(GM_getValue("remove")??[]).includes(e),oe=e=>{const{removers:t}=J(e,{updateRemovers:!1});t.push(e),GM_setValue("remove",t)},re=(e,t,n)=>{const{replacers:o}=J(e,{updateReplacers:!1}),r=(t??"").trim(),l=(n??"").trim();""!==r&&r!==l&&(o[e]=r),GM_setValue("replace",o)},le=({courses:e,loadingCourses:t,...n})=>u("div",{class:"outer-sidebar"},u("div",{class:"sidebar"},t&&u("div",null,"Loading courses..."),e.map((e=>u(ce,Y({key:e.courseId,item:e},n)))))),se=()=>u("svg",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",class:"icon svg-icon-check",viewBox:"0 0 24 24"},u("path",{d:"M5 12l5 5L20 7"})),ie=()=>u("svg",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",class:"icon svg-icon-x",viewBox:"0 0 24 24"},u("path",{d:"M18 6L6 18M6 6l12 12"})),ae=()=>u("svg",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",class:"icon svg-icon-arrow-back",viewBox:"0 0 24 24"},u("path",{d:"M9 11l-4 4 4 4m-4-4h11a4 4 0 000-8h-1"})),ce=({item:e,handleClick:t,toggleItem:n,resetItem:o})=>{const{courseName:r,isReplaced:l,replacedName:s,isRemoved:i}=e;return u("div",{class:"row"+(i?" removed":""),onClick:n=>{t(n,e)}},u("span",null,u("span",{onClick:t=>{n(t,e)}},u(i?ie:se,null)),l?u(p,null,s,u("span",{onClick:t=>{o(t,e)}},u(ae,null))):r))};class ue extends _{constructor(...e){super(...e),Q(this,"render",(({selected:{isSelected:e,courseName:t,isReplaced:n,replacedName:o},replaceInputRef:r,handleSave:l,loggedOut:s,loggedOutCallback:i,loggedOutInputs:a})=>u("div",{class:"outer-main"},u("div",{class:"main"},s?u(p,null,u("div",{class:"replace-flex-input"},u("h5",null,"Login"),u("input",{placeholder:"Username",ref:a.username}),u("input",{placeholder:"Password",ref:a.password,type:"password"}),u("button",{class:"btn-save",onClick:i},"Login"))):u(p,null,u("div",{class:"section-title"},"Rename course"),u("div",{class:"replace-flex-inputs"},u("div",null,e?`Selected: ${t}`:"Select course to the left"),u("input",{class:"replace-input",placeholder:"Select course to the left",disabled:!e,ref:r,onKeydown:l,value:e?!1===n?t:o:null}),u("button",{class:"btn-save",disabled:!e,onClick:l},"Save")))))))}}
// ==UserScript==
// @name      Clean Moodle with Preact
// @version   2021.01.27c
// @author    lusc
// @include   *://moodle.ksasz.ch/*
// @updateURL https://github.com/melusc/moodle_userscripts/raw/master/dist/Clean%20Moodle/Clean%20Moodle.user.js
// @grant     GM_setValue
// @grant     GM_getValue
// @grant     GM_deleteValue
// @grant     GM_addStyle
// @grant     GM_registerMenuCommand
// @grant     GM_addValueChangeListener
// @run-at    document-start
// ==/UserScript==
"https:"!==location.protocol&&(location.protocol="https:");const de=!/^\/cleanmoodlepreact/i.test(location.pathname),pe=()=>{const e=ke(document);if(GM_registerMenuCommand("Open settings",(()=>{open("https://moodle.ksasz.ch/cleanMoodlePreact/")})),e){_e(e),GM_addValueChangeListener("replace",ve),GM_addValueChangeListener("remove",ve);const t=e.previousSibling,n=document.createElement("span");t.append(n),E(u(fe,null),n)}},_e=e=>{const t=GM_getValue("replace");if("object"==typeof t){const n=Object.entries(t);for(const t of n)he(...t,e)}else GM_setValue("replace",{});const n=GM_getValue("remove");if(Array.isArray(n))for(const t of n)me(t,e);else GM_setValue("remove",[]);ge(e)},fe=()=>u("a",{href:"/cleanMoodlePreact/",target:"_blank",rel:"noreferrer noopener",onClick:e=>{e.stopPropagation()}},u("svg",{style:{marginLeft:"0.2em"},fill:"currentColor",class:"icon svg-icon-gear",viewBox:"0 0 16 16"},u("path",{d:"M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 014.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 01-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 011.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 012.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 012.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 011.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 01-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 018.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 001.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 00.52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 00-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 00-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 00-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 00-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 00.52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 001.255-.52l.094-.319zM8 5.754a2.246 2.246 0 100 4.492 2.246 2.246 0 000-4.492zM4.754 8a3.246 3.246 0 116.492 0 3.246 3.246 0 01-6.492 0z"}))),he=(e,t,n)=>{const o=be(e,n);if(!o)return ye(e);const r=t??o.title;0===o.childElementCount?o.textContent=r:o.querySelector("span.item-content-wrap").textContent=r},me=(e,t)=>{const n=be(e,t);if(n){const e=n.closest("li.type_course");e.classList.contains("contains_branch")||e.remove()}else ye(e)},ge=e=>{const t=[...e.querySelectorAll(":scope > li.type_course")];F(t,((e,t)=>{const n=e.firstElementChild.textContent.toLowerCase(),o=t.firstElementChild.textContent.toLowerCase();return n<o?-1:n>o?1:0})),e.prepend(...t)},ve=(()=>{let e;return(t,n,o,r)=>{if(r&&(e||(e=ke(document)))){const{removedVals:r,addedOrChanged:l}=((e,t)=>{if(Array.isArray(e))return{addedOrChanged:t.filter((t=>!e.includes(t))),removedVals:e.filter((e=>!t.includes(e)))};const n=Object.keys(e),o=Object.keys(t);return{addedOrChanged:o.filter((o=>!n.includes(o)||e[o]!==t[o])),removedVals:n.filter((e=>!o.includes(e)))}})(n,o);if("replace"===t){for(const t of r)he(t,null,e);for(const t of l)he(t,o[t],e);ge(e)}else if("remove"===t){for(const t of l)me(t,e);r.length>0&&W().then((t=>{for(const n of r){const o=t[n];if(!be(n,e)){const t=document.createElement("li");t.className="type_course depth_3 item_with_icon",t.tabIndex=-1,e.prepend(t),E(u("p",{class:"tree_item hasicon",role:"treeitem",id:`expandable_branch_20_${n}`,tabindex:"-1","aria-selected":"false"},u("a",{tabindex:"-1",title:o,href:`https://moodle.ksasz.ch/course/view.php?id=${n}`},u("i",{class:"icon fa fa-graduation-cap fa-fw navicon","aria-hidden":"true",tabindex:"-1"}),u("span",{class:"item-content-wrap",tabindex:"-1"},o))),t)}}ge(e),dispatchEvent(new Event("customIconsPreact"))}))}}}})(),be=(e,t)=>t.querySelector(`a[href="https://moodle.ksasz.ch/course/view.php?id=${e}"]`),ye=e=>{W().then((t=>{t.hasOwnProperty(e)||(J(e),alert(`You appear to not be in the course with the id "${e}" anymore.\nThe course will not be checked for anymore`))}))},ke=e=>e.querySelector('li[aria-labelledby="label_2_4"] ul[role="group"]')??e.getElementById("label_3_21")?.closest('ul[role="group"]');if(!/^\/customicons/i.test(location.pathname)){const e=de?pe:X;"complete"===document.readyState?e():addEventListener("DOMContentLoaded",e,{once:!0})}})()})();