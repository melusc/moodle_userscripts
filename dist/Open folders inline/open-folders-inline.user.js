(()=>{"use strict";var e={391:e=>{e.exports='@keyframes folder-loading-dots{0%{content:""}33%{content:"."}67%{content:".."}to{content:"..."}}div.folders-inline-icon{cursor:pointer;user-select:none}div.folders-inline-icon-div{display:inline}.folder-parent li{margin-left:24px;padding-left:none}.folder-empty,.folder-loading{margin-left:calc(1rem + 24px)}.folder-loading::after{content:"";animation:folder-loading-dots .6s infinite linear alternate}'},222:e=>{e.exports=".login-popup-userscript .vertical-horizontal-center{width:100%;height:100%;position:fixed;z-index:100000000;top:0;left:0;display:flex;align-items:center;justify-content:center;pointer-events:none}.login-popup-userscript .card{pointer-events:auto}"}},n={};function t(o){var r=n[o];if(void 0!==r)return r.exports;var i=n[o]={exports:{}};return e[o](i,i.exports,t),i.exports}(()=>{var e,n,o,r,i,l,_={},s=[],a=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function c(e,n){for(var t in n)e[t]=n[t];return e}function u(e){var n=e.parentNode;n&&n.removeChild(e)}function f(n,t,o){var r,i,l,_={};for(l in t)"key"==l?r=t[l]:"ref"==l?i=t[l]:_[l]=t[l];if(arguments.length>2&&(_.children=arguments.length>3?e.call(arguments,2):o),"function"==typeof n&&null!=n.defaultProps)for(l in n.defaultProps)void 0===_[l]&&(_[l]=n.defaultProps[l]);return p(n,_,r,i,null)}function p(e,t,r,i,l){var _={type:e,props:t,key:r,ref:i,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==l?++o:l};return null==l&&null!=n.vnode&&n.vnode(_),_}function d(e){return e.children}function h(e,n){this.props=e,this.context=n}function m(e,n){if(null==n)return e.__?m(e.__,e.__.__k.indexOf(e)+1):null;for(var t;n<e.__k.length;n++)if(null!=(t=e.__k[n])&&null!=t.__e)return t.__e;return"function"==typeof e.type?m(e):null}function v(e){var n,t;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,n=0;n<e.__k.length;n++)if(null!=(t=e.__k[n])&&null!=t.__e){e.__e=e.__c.base=t.__e;break}return v(e)}}function y(e){(!e.__d&&(e.__d=!0)&&r.push(e)&&!g.__r++||l!==n.debounceRendering)&&((l=n.debounceRendering)||i)(g)}function g(){for(var e;g.__r=r.length;)e=r.sort((function(e,n){return e.__v.__b-n.__v.__b})),r=[],e.some((function(e){var n,t,o,r,i,l;e.__d&&(i=(r=(n=e).__v).__e,(l=n.__P)&&(t=[],(o=c({},r)).__v=r.__v+1,E(l,r,o,n.__n,void 0!==l.ownerSVGElement,null!=r.__h?[i]:null,t,null==i?m(r):i,r.__h),H(t,r),r.__e!=i&&v(r)))}))}function w(e,n,t,o,r,i,l,a,c,u){var f,h,v,y,g,w,x,P=o&&o.__k||s,C=P.length;for(t.__k=[],f=0;f<n.length;f++)if(null!=(y=t.__k[f]=null==(y=n[f])||"boolean"==typeof y?null:"string"==typeof y||"number"==typeof y||"bigint"==typeof y?p(null,y,null,null,y):Array.isArray(y)?p(d,{children:y},null,null,null):y.__b>0?p(y.type,y.props,y.key,null,y.__v):y)){if(y.__=t,y.__b=t.__b+1,null===(v=P[f])||v&&y.key==v.key&&y.type===v.type)P[f]=void 0;else for(h=0;h<C;h++){if((v=P[h])&&y.key==v.key&&y.type===v.type){P[h]=void 0;break}v=null}E(e,y,v=v||_,r,i,l,a,c,u),g=y.__e,(h=y.ref)&&v.ref!=h&&(x||(x=[]),v.ref&&x.push(v.ref,null,y),x.push(h,y.__c||g,y)),null!=g?(null==w&&(w=g),"function"==typeof y.type&&y.__k===v.__k?y.__d=c=b(y,c,e):c=k(e,y,v,P,g,c),"function"==typeof t.type&&(t.__d=c)):c&&v.__e==c&&c.parentNode!=e&&(c=m(v))}for(t.__e=w,f=C;f--;)null!=P[f]&&("function"==typeof t.type&&null!=P[f].__e&&P[f].__e==t.__d&&(t.__d=m(o,f+1)),U(P[f],P[f]));if(x)for(f=0;f<x.length;f++)M(x[f],x[++f],x[++f])}function b(e,n,t){for(var o,r=e.__k,i=0;r&&i<r.length;i++)(o=r[i])&&(o.__=e,n="function"==typeof o.type?b(o,n,t):k(t,o,o,r,o.__e,n));return n}function k(e,n,t,o,r,i){var l,_,s;if(void 0!==n.__d)l=n.__d,n.__d=void 0;else if(null==t||r!=i||null==r.parentNode)e:if(null==i||i.parentNode!==e)e.appendChild(r),l=null;else{for(_=i,s=0;(_=_.nextSibling)&&s<o.length;s+=2)if(_==r)break e;e.insertBefore(r,i),l=i}return void 0!==l?l:r.nextSibling}function x(e,n,t){"-"===n[0]?e.setProperty(n,t):e[n]=null==t?"":"number"!=typeof t||a.test(n)?t:t+"px"}function P(e,n,t,o,r){var i;e:if("style"===n)if("string"==typeof t)e.style.cssText=t;else{if("string"==typeof o&&(e.style.cssText=o=""),o)for(n in o)t&&n in t||x(e.style,n,"");if(t)for(n in t)o&&t[n]===o[n]||x(e.style,n,t[n])}else if("o"===n[0]&&"n"===n[1])i=n!==(n=n.replace(/Capture$/,"")),n=n.toLowerCase()in e?n.toLowerCase().slice(2):n.slice(2),e.l||(e.l={}),e.l[n+i]=t,t?o||e.addEventListener(n,i?S:C,i):e.removeEventListener(n,i?S:C,i);else if("dangerouslySetInnerHTML"!==n){if(r)n=n.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if("href"!==n&&"list"!==n&&"form"!==n&&"tabIndex"!==n&&"download"!==n&&n in e)try{e[n]=null==t?"":t;break e}catch(e){}"function"==typeof t||(null!=t&&(!1!==t||"a"===n[0]&&"r"===n[1])?e.setAttribute(n,t):e.removeAttribute(n))}}function C(e){this.l[e.type+!1](n.event?n.event(e):e)}function S(e){this.l[e.type+!0](n.event?n.event(e):e)}function E(e,t,o,r,i,l,_,s,a){var u,f,p,m,v,y,g,b,k,x,P,C=t.type;if(void 0!==t.constructor)return null;null!=o.__h&&(a=o.__h,s=t.__e=o.__e,t.__h=null,l=[s]),(u=n.__b)&&u(t);try{e:if("function"==typeof C){if(b=t.props,k=(u=C.contextType)&&r[u.__c],x=u?k?k.props.value:u.__:r,o.__c?g=(f=t.__c=o.__c).__=f.__E:("prototype"in C&&C.prototype.render?t.__c=f=new C(b,x):(t.__c=f=new h(b,x),f.constructor=C,f.render=T),k&&k.sub(f),f.props=b,f.state||(f.state={}),f.context=x,f.__n=r,p=f.__d=!0,f.__h=[]),null==f.__s&&(f.__s=f.state),null!=C.getDerivedStateFromProps&&(f.__s==f.state&&(f.__s=c({},f.__s)),c(f.__s,C.getDerivedStateFromProps(b,f.__s))),m=f.props,v=f.state,p)null==C.getDerivedStateFromProps&&null!=f.componentWillMount&&f.componentWillMount(),null!=f.componentDidMount&&f.__h.push(f.componentDidMount);else{if(null==C.getDerivedStateFromProps&&b!==m&&null!=f.componentWillReceiveProps&&f.componentWillReceiveProps(b,x),!f.__e&&null!=f.shouldComponentUpdate&&!1===f.shouldComponentUpdate(b,f.__s,x)||t.__v===o.__v){f.props=b,f.state=f.__s,t.__v!==o.__v&&(f.__d=!1),f.__v=t,t.__e=o.__e,t.__k=o.__k,t.__k.forEach((function(e){e&&(e.__=t)})),f.__h.length&&_.push(f);break e}null!=f.componentWillUpdate&&f.componentWillUpdate(b,f.__s,x),null!=f.componentDidUpdate&&f.__h.push((function(){f.componentDidUpdate(m,v,y)}))}f.context=x,f.props=b,f.state=f.__s,(u=n.__r)&&u(t),f.__d=!1,f.__v=t,f.__P=e,u=f.render(f.props,f.state,f.context),f.state=f.__s,null!=f.getChildContext&&(r=c(c({},r),f.getChildContext())),p||null==f.getSnapshotBeforeUpdate||(y=f.getSnapshotBeforeUpdate(m,v)),P=null!=u&&u.type===d&&null==u.key?u.props.children:u,w(e,Array.isArray(P)?P:[P],t,o,r,i,l,_,s,a),f.base=t.__e,t.__h=null,f.__h.length&&_.push(f),g&&(f.__E=f.__=null),f.__e=!1}else null==l&&t.__v===o.__v?(t.__k=o.__k,t.__e=o.__e):t.__e=L(o.__e,t,o,r,i,l,_,a);(u=n.diffed)&&u(t)}catch(e){t.__v=null,(a||null!=l)&&(t.__e=s,t.__h=!!a,l[l.indexOf(s)]=null),n.__e(e,t,o)}}function H(e,t){n.__c&&n.__c(t,e),e.some((function(t){try{e=t.__h,t.__h=[],e.some((function(e){e.call(t)}))}catch(e){n.__e(e,t.__v)}}))}function L(n,t,o,r,i,l,s,a){var c,f,p,d=o.props,h=t.props,v=t.type,y=0;if("svg"===v&&(i=!0),null!=l)for(;y<l.length;y++)if((c=l[y])&&(c===n||(v?c.localName==v:3==c.nodeType))){n=c,l[y]=null;break}if(null==n){if(null===v)return document.createTextNode(h);n=i?document.createElementNS("http://www.w3.org/2000/svg",v):document.createElement(v,h.is&&h),l=null,a=!1}if(null===v)d===h||a&&n.data===h||(n.data=h);else{if(l=l&&e.call(n.childNodes),f=(d=o.props||_).dangerouslySetInnerHTML,p=h.dangerouslySetInnerHTML,!a){if(null!=l)for(d={},y=0;y<n.attributes.length;y++)d[n.attributes[y].name]=n.attributes[y].value;(p||f)&&(p&&(f&&p.__html==f.__html||p.__html===n.innerHTML)||(n.innerHTML=p&&p.__html||""))}if(function(e,n,t,o,r){var i;for(i in t)"children"===i||"key"===i||i in n||P(e,i,null,t[i],o);for(i in n)r&&"function"!=typeof n[i]||"children"===i||"key"===i||"value"===i||"checked"===i||t[i]===n[i]||P(e,i,n[i],t[i],o)}(n,h,d,i,a),p)t.__k=[];else if(y=t.props.children,w(n,Array.isArray(y)?y:[y],t,o,r,i&&"foreignObject"!==v,l,s,l?l[0]:o.__k&&m(o,0),a),null!=l)for(y=l.length;y--;)null!=l[y]&&u(l[y]);a||("value"in h&&void 0!==(y=h.value)&&(y!==n.value||"progress"===v&&!y)&&P(n,"value",y,d.value,!1),"checked"in h&&void 0!==(y=h.checked)&&y!==n.checked&&P(n,"checked",y,d.checked,!1))}return n}function M(e,t,o){try{"function"==typeof e?e(t):e.current=t}catch(e){n.__e(e,o)}}function U(e,t,o){var r,i;if(n.unmount&&n.unmount(e),(r=e.ref)&&(r.current&&r.current!==e.__e||M(r,null,t)),null!=(r=e.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(e){n.__e(e,t)}r.base=r.__P=null}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&U(r[i],t,"function"!=typeof e.type);o||null==e.__e||u(e.__e),e.__e=e.__d=void 0}function T(e,n,t){return this.constructor(e,t)}function D(t,o,r){var i,l,s;n.__&&n.__(t,o),l=(i="function"==typeof r)?null:r&&r.__k||o.__k,s=[],E(o,t=(!i&&r||o).__k=f(d,null,[t]),l||_,_,void 0!==o.ownerSVGElement,!i&&r?[r]:l?null:o.firstChild?e.call(o.childNodes):null,s,!i&&r?r:l?l.__e:o.firstChild,i),H(s,t)}e=s.slice,n={__e:function(e,n){for(var t,o,r;n=n.__;)if((t=n.__c)&&!t.__)try{if((o=t.constructor)&&null!=o.getDerivedStateFromError&&(t.setState(o.getDerivedStateFromError(e)),r=t.__d),null!=t.componentDidCatch&&(t.componentDidCatch(e),r=t.__d),r)return t.__E=t}catch(n){e=n}throw e}},o=0,h.prototype.setState=function(e,n){var t;t=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=c({},this.state),"function"==typeof e&&(e=e(c({},t),this.props)),e&&c(t,e),null!=e&&this.__v&&(n&&this.__h.push(n),y(this))},h.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),y(this))},h.prototype.render=d,r=[],i="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,g.__r=0;var A,I,N,F=0,G=[],V=n.__b,O=n.__r,j=n.diffed,q=n.__c,R=n.unmount;function W(e,t){n.__h&&n.__h(I,e,F||t),F=0;var o=I.__H||(I.__H={__:[],__h:[]});return e>=o.__.length&&o.__.push({}),o.__[e]}function z(e){return F=1,function(e,n,t){var o=W(A++,2);return o.t=e,o.__c||(o.__=[Z(void 0,n),function(e){var n=o.t(o.__[0],e);o.__[0]!==n&&(o.__=[n,o.__[1]],o.__c.setState({}))}],o.__c=I),o.__}(Z,e)}function B(e,t){var o=W(A++,3);!n.__s&&Y(o.__H,t)&&(o.__=e,o.__H=t,I.__H.__h.push(o))}function $(e){return F=5,function(e,n){var t=W(A++,7);return Y(t.__H,n)&&(t.__=e(),t.__H=n,t.__h=e),t.__}((function(){return{current:e}}),[])}function K(){G.forEach((function(e){if(e.__P)try{e.__H.__h.forEach(Q),e.__H.__h.forEach(X),e.__H.__h=[]}catch(t){e.__H.__h=[],n.__e(t,e.__v)}})),G=[]}n.__b=function(e){I=null,V&&V(e)},n.__r=function(e){O&&O(e),A=0;var n=(I=e.__c).__H;n&&(n.__h.forEach(Q),n.__h.forEach(X),n.__h=[])},n.diffed=function(e){j&&j(e);var t=e.__c;t&&t.__H&&t.__H.__h.length&&(1!==G.push(t)&&N===n.requestAnimationFrame||((N=n.requestAnimationFrame)||function(e){var n,t=function(){clearTimeout(o),J&&cancelAnimationFrame(n),setTimeout(e)},o=setTimeout(t,100);J&&(n=requestAnimationFrame(t))})(K)),I=null},n.__c=function(e,t){t.some((function(e){try{e.__h.forEach(Q),e.__h=e.__h.filter((function(e){return!e.__||X(e)}))}catch(o){t.some((function(e){e.__h&&(e.__h=[])})),t=[],n.__e(o,e.__v)}})),q&&q(e,t)},n.unmount=function(e){R&&R(e);var t=e.__c;if(t&&t.__H)try{t.__H.__.forEach(Q)}catch(e){n.__e(e,t.__v)}};var J="function"==typeof requestAnimationFrame;function Q(e){var n=I;"function"==typeof e.__c&&e.__c(),I=n}function X(e){var n=I;e.__c=e.__(),I=n}function Y(e,n){return!e||e.length!==n.length||n.some((function(n,t){return n!==e[t]}))}function Z(e,n){return"function"==typeof n?n(e):n}const ee=new Intl.Collator(void 0,{sensitivity:"base",numeric:!0}),ne=async(e=!1)=>{if(await GM.deleteValue("token"),e)for(const e of["username","password"])await GM.deleteValue(e)},te=async({username:e,password:n})=>{const t=new URLSearchParams({username:e,password:n,service:"moodle_mobile_app"}),o=await fetch("/login/token.php",{method:"POST",body:t.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}}),r=await o.json();if("errorcode"in r)throw new Error("Token was invalid");return await Promise.all([GM.setValue("token",r.token),GM.setValue("username",e),GM.setValue("password",n)]),r.token};var oe=t(222);const re=e=>{const n=$(null),t=$(null),[o,r]=z(!0),[i,l]=z({username:!0,password:!0});return o?f("div",{class:"vertical-horizontal-center"},f("div",{class:"card shadow"},f("div",{class:"card-body"},f("h5",{class:"card-title"},"Login - ",e.title),f("div",{class:"mb-3"},f("label",{htmlFor:"popup-username",class:"form-label"},"Username"),f("input",{ref:n,required:!0,id:"popup-username",placeholder:"Username",class:"form-control"+(i.username?"":" is-invalid"),onInput:()=>{l((e=>({...e,username:!0})))}})),f("div",{class:"mb-3"},f("label",{htmlFor:"popup-password",class:"form-label"},"Password"),f("input",{ref:t,required:!0,id:"popup-password",placeholder:"Password",class:"form-control"+(i.password?"":" is-invalid"),type:"password",onInput:()=>{l((e=>({...e,password:!0})))}}))),f("button",{class:"btn btn-primary",type:"button",onClick:async()=>{const o=n.current?.value.trim(),i=t.current?.value;if(l({password:Boolean(i),username:Boolean(o)}),o&&i){r(!1);try{const n=await te({username:o,password:i});e.cb(n)}catch{r(!0)}}}},"Login"))):null},ie={"application/pdf":"pdf-256","application/zip":"archive-256","application/vnd.openxmlformats-officedocument.wordprocessingml.document":"document-256","application/msword":"document-256","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"spreadsheet-256","application/vnd.ms-excel":"spreadsheet-256","application/vnd.openxmlformats-officedocument.presentationml.presentation":"powerpoint-256","application/vnd.ms-powerpoint":"powerpoint-256","text/plain":"sourcecode-256","audio/mp3":"mp3-256","audio/mp4":"mp3-256","video/quicktime":"quicktime-256","video/mp4":"mpeg-256"},le=(e,n)=>{const t=ie[e];return t?`/theme/image.php/classic/core/1601902087/f/${t}`:n};let _e;const se=async(e=!1)=>{if(!e&&void 0!==_e)return _e;const n=await(async e=>{const n=await(async()=>GM.getValue("token"))();if(n)return n;const t=await(async()=>{const[e,n]=await Promise.all([GM.getValue("username"),GM.getValue("password")]);if(e&&n)return{username:e,password:n}})();if(t)try{return await te(t)}catch{await ne(!0)}else await ne(!0);return(async e=>new Promise((e=>{const n=GM_addStyle(oe),t=document.createElement("div");t.className="login-popup-userscript",document.body.append(t),D(f(re,{cb:o=>{n.remove(),t.remove(),e(o)},title:"Open folders inline"}),t)})))()})(),t=new URLSearchParams(location.search),o=t.get("id");if(!o)return console.error("CourseId was falsy:",t),!1;const r=new URLSearchParams({courseid:o,"options[0][name]":"includestealthmodules","options[0][value]":"1",moodlewsrestformat:"json",wsfunction:"core_course_get_contents",wstoken:n}),i=await fetch("/webservice/rest/server.php",{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:r.toString()}),l=await i.json();return!Array.isArray(l)&&"exception"in l?(await ne(),se()):(_e=l,l)},ae=e=>{const n=e.trim().split(/\/+/),t=[];for(const e of n)e&&t.push(e);return t},ce={},ue={},fe=e=>{const{handleClick:n,isHidden:t,base:o}=e;return f("div",{class:"fp-filename-icon folders-inline-icon",onClick:n},f("div",{class:"folders-inline-icon-div"},f("i",{class:`icon fa ${t?"fa-caret-right":"fa-caret-down"} fa-fw navicon folders-inline-caret`}),f("img",{alt:"",class:"iconlarge activityicon",role:"presentation",title:o,"aria-hidden":"true",src:"/theme/image.php/classic/core/1601902087/f/folder-128"})),f("span",{class:"fp-filename"},o))},pe=({contents:e,directoryDepth:n=0,base:t,isParent:o=!1})=>{const[r,i]=z(!o),l={};for(const t of e)if("isexternalfile"in t){const e=t.filePath[n]??"/";(l[e]??(l[e]=[])).push(t)}const _=l["/"];_?.sort(((e,n)=>ee.compare(e.filename.trim(),n.filename.trim()))),delete l["/"];const s=Object.entries(l);s.sort((([e],[n])=>ee.compare(e.trim(),n.trim())));const a=r&&!o;return f(d,null,!o&&f(fe,{isHidden:r,base:t,handleClick:e=>{e.stopPropagation(),i((e=>!e))}}),!a&&f("ul",{style:{listStyle:"none"}},s.map((([e,t])=>f("li",{key:e},f(pe,{contents:t,base:e,directoryDepth:n+1})))),_?.map((({fileUrl:e,filename:n,imgPath:t})=>f("li",{key:n},f("span",{class:"fp-filename-icon"},f("a",{href:e},f("span",{class:"fp-icon"},f("img",{alt:"",title:n,src:t})),f("span",{class:"fp-filename"},n))))))))},de=({folderId:e,sectionId:n})=>{const[t,o]=z(void 0),[r,i]=z(!1);return B((()=>{const t=async t=>{const r=await(async(e,n,t)=>{const o=await se(t);if(!1===o)return!1;const r=o.find((({id:n})=>n===Number(e)));if(!r)return console.error("Could not find sectionObject."),!1;const{modules:i}=r,l=i.find((({id:e})=>e===Number(n)));if(!l)return console.error("Could not find folderObject."),!1;if(!("contents"in l))return console.warn("folderObject was a description."),!1;const{contents:_}=l,s=[];for(const e of _)if("isexternalfile"in e){const{filepath:n,mimetype:t}=e,o=new URL(e.fileurl,"https://moodle.ksasz.ch");o.pathname=o.pathname.replace(/^\/webservice/,"");const r=new URL(o.href);t.startsWith("image")||r.searchParams.set("preview","1"),s.push({...e,filePath:ae(n),imgPath:le(t,r.href),fileUrl:o.href})}return s})(n,e,t);r&&(o(r),i(!1))};ce[e]=()=>{o(void 0),i(!1),t(!0)},ue[e]=()=>{i((e=>!e))},t()}),[e,n]),r?null:t?0===t.length?f("div",{class:"folder-empty"},"The folder was empty"):f(pe,{isParent:!0,contents:t}):f("div",{class:"folder-loading"},"Loading")},he={},me=({folderId:e})=>{const[n,t]=z(!1);return B((()=>{he[e]=()=>{t((e=>!e))}}),[e]),n?null:f("span",{style:{marginLeft:5},class:"svg-refresh-hitbox",onClick:n=>{n.stopPropagation(),n.preventDefault(),(e=>{ce[e]?.()})(e)}},f("svg",{fill:"currentColor","aria-hidden":"true",class:"icon navicon svg-refresh",viewBox:"0 0 512 512"},f("path",{d:"M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"})))};var ve=t(391);
// ==UserScript==
// @name      Moodle open folders inline preact
// @version   2021.09.06c
// @author    lusc
// @include   https://moodle.ksasz.ch/course/view.php?id=*
// @updateURL https://git.io/Jqlt0
// @grant     GM.setValue
// @grant     GM.getValue
// @grant     GM.deleteValue
// @grant     GM_addStyle
// @run-at    document-start
// ==/UserScript==
GM_addStyle(ve);const ye=async e=>{if(e.ctrlKey)return;if(!(e.target instanceof Element))return;const n=e.target.closest("a");if("/mod/folder/view.php"!==n?.pathname)return;const t=n.closest("li.activity.folder");if(!t)return;const o=/\d+$/.exec(t?.id)?.[0];if(!o)return void console.error("Could not get folderId.");const r=n.closest("li.section.main")?.getAttribute("aria-labelledby")?.match(/(?<=-)\d+(?=-)/)?.[0];if(!r)return void console.error("sectionId was undefined.");if(e.preventDefault(),(e=>(ue[e]?.(),e in ue))(o))return void(e=>{he[e]?.()})(o);const i=document.createElement("span");D(f(me,{folderId:o}),i),n.append(i);const l=document.createElement("span");l.className="folder-parent",D(f(de,{sectionId:r,folderId:o}),l),t.append(l)},ge=()=>{document.querySelector("div.course-content > ul.topics")?.addEventListener("click",ye)};"complete"===document.readyState?ge():addEventListener("DOMContentLoaded",ge,{once:!0})})()})();