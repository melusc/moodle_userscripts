(()=>{"use strict";var e={123:e=>{e.exports=".tt-title{font-weight:450;margin-bottom:10px}.tt-table,.tt-title{font-size:large}.tt-tr{display:flex}.tt-tr>*{flex:0 0 50%}.tt-th{font-weight:450}"},217:e=>{e.exports="@keyframes save-animation{0%{border-color:var(--color)}to{border-color:#30363d}}.suggestions{position:absolute;top:0;left:0;z-index:1;background-color:#202020;border:2px solid #30363d;border-radius:2px;padding:.75em 1em;max-width:calc(35% - 2.7em)}.suggestions .emphasised{font-weight:700}.suggestions:empty{display:none}.suggestions .suggestion{display:grid;width:100%;grid-template-columns:80% 20%;cursor:pointer}.suggestions .suggestion:hover{text-decoration:underline}.suggestion-name{padding:2px 4px}.suggestion-id{text-align:end}.login-popup{text-align:center;width:100%;height:100%;position:fixed;z-index:2;top:0;left:0;display:flex;align-items:center;justify-content:center}.login-popup .card{background-color:#202020;border:#30363d 2px solid;border-radius:2px;padding:.3em 1em}.login-popup button,.login-popup input{margin-top:5px;background:0 0;color:#f0f6fc;border:2px solid #30363d;border-radius:2px;padding:.2em 1.3em;font-size:90%}.login-popup input{display:block;cursor:text}.login-popup button{cursor:pointer}.grid-buttons{display:grid;grid-template-columns:1fr auto 1fr;justify-items:center;column-gap:5px;width:100%;margin-bottom:.3em;margin-top:.3em}.day-controls{display:flex;justify-content:space-evenly;align-items:center;grid-column-start:2;user-select:none;margin-right:1.5em}.day-current-day{min-width:13ch;text-align:center}.caret-back,.caret-forward{width:1.5em;height:1.5em;cursor:pointer}.save-button{cursor:pointer;justify-self:flex-end;background:0 0;color:#f0f6fc;border:2px solid #30363d;border-radius:2px;padding:.2em 1.3em;font-size:90%}*,::after,::before{box-sizing:border-box}::after,::before{text-decoration:inherit;vertical-align:inherit}html{cursor:default;line-height:1.5;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;word-break:break-word}body,button,input,ol ol,ol ul,select,ul ol,ul ul{margin:0}h1{font-size:2em;margin:.67em 0}hr{height:0;overflow:visible}a{background-color:transparent}img,svg{vertical-align:middle}img{border-style:none}svg:not([fill]){fill:currentColor}svg:not(:root){overflow:hidden}button{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}button,input{overflow:visible}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-input-placeholder{color:inherit;opacity:.54}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}::-moz-focus-inner{border-style:none;padding:0}:-moz-focusring{outline:1px dotted ButtonText}:-moz-ui-invalid{box-shadow:none}[tabindex],a,button,input,label,select{-ms-touch-action:manipulation;touch-action:manipulation}[hidden]{display:none}body{padding-top:.3em;width:100%;min-height:100vh;font:20px sans-serif;background-color:#171717}.container,.table-center{display:flex;flex-direction:column;align-items:center}.table-center{width:70%}.main-table{width:100%;margin-top:.5em}.table-cell.remove-row,body{color:#f0f6fc}.table-row{display:flex;width:100%;margin-bottom:.3em}.table-cell{width:50%;padding:.3em 1em;box-sizing:border-box;border:2px solid #30363d}.table-cell input{border:0;background:0 0;outline:0;font:inherit;color:inherit}.table-cell input.invalid-input{color:#dc3545}.table-cell.content,.table-cell.time{justify-content:center;align-items:center}.table-cell.time{display:grid;grid-template-columns:1fr auto 1fr;border-top-left-radius:2px;border-bottom-left-radius:2px}.table-cell.content{border-top-right-radius:2px;border-bottom-right-radius:2px;display:flex;width:50%;flex-direction:column}.table-cell.content>*{width:100%}.table-cell.remove-row{width:1.5em;border:0;cursor:pointer;padding-left:0;padding-right:0;display:flex;align-items:center;justify-content:center}.time-input{margin-left:.5em;margin-right:.5em}.time-input.time-from{text-align:right}.time-input.time-to{text-align:left}.icon-add-row,.row-icon-add-row{display:flex;justify-content:center;align-items:center}.icon-add-row{height:1.5em;cursor:pointer;margin-right:1.5em;width:1.5em}.row-icon-add-row{width:100%;padding-bottom:1em}.save-failed,.save-successful{animation:3s ease-in-out save-animation}.save-failed{--color: #dc3545}.save-successful{--color: #198754}"},222:e=>{e.exports=".login-popup-userscript .vertical-horizontal-center{width:100%;height:100%;position:fixed;z-index:100000000;top:0;left:0;display:flex;align-items:center;justify-content:center;pointer-events:none}.login-popup-userscript .card{pointer-events:auto}"}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,n),i.exports}(()=>{var e,t,o,r,i,l,s={},a=[],u=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function c(e,t){for(var n in t)e[n]=t[n];return e}function d(e){var t=e.parentNode;t&&t.removeChild(e)}function f(t,n,o){var r,i,l,s={};for(l in n)"key"==l?r=n[l]:"ref"==l?i=n[l]:s[l]=n[l];if(arguments.length>2&&(s.children=arguments.length>3?e.call(arguments,2):o),"function"==typeof t&&null!=t.defaultProps)for(l in t.defaultProps)void 0===s[l]&&(s[l]=t.defaultProps[l]);return _(t,s,r,i,null)}function _(e,n,r,i,l){var s={type:e,props:n,key:r,ref:i,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==l?++o:l};return null!=t.vnode&&t.vnode(s),s}function p(e){return e.children}function h(e,t){this.props=e,this.context=t}function m(e,t){if(null==t)return e.__?m(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?m(e):null}function v(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return v(e)}}function y(e){(!e.__d&&(e.__d=!0)&&r.push(e)&&!g.__r++||l!==t.debounceRendering)&&((l=t.debounceRendering)||i)(g)}function g(){for(var e;g.__r=r.length;)e=r.sort((function(e,t){return e.__v.__b-t.__v.__b})),r=[],e.some((function(e){var t,n,o,r,i,l;e.__d&&(i=(r=(t=e).__v).__e,(l=t.__P)&&(n=[],(o=c({},r)).__v=r.__v+1,C(l,r,o,t.__n,void 0!==l.ownerSVGElement,null!=r.__h?[i]:null,n,null==i?m(r):i,r.__h),E(n,r),r.__e!=i&&v(r)))}))}function b(e,t,n,o,r,i,l,u,c,d){var f,h,v,y,g,b,x,S=o&&o.__k||a,P=S.length;for(n.__k=[],f=0;f<t.length;f++)if(null!=(y=n.__k[f]=null==(y=t[f])||"boolean"==typeof y?null:"string"==typeof y||"number"==typeof y||"bigint"==typeof y?_(null,y,null,null,y):Array.isArray(y)?_(p,{children:y},null,null,null):y.__b>0?_(y.type,y.props,y.key,null,y.__v):y)){if(y.__=n,y.__b=n.__b+1,null===(v=S[f])||v&&y.key==v.key&&y.type===v.type)S[f]=void 0;else for(h=0;h<P;h++){if((v=S[h])&&y.key==v.key&&y.type===v.type){S[h]=void 0;break}v=null}C(e,y,v=v||s,r,i,l,u,c,d),g=y.__e,(h=y.ref)&&v.ref!=h&&(x||(x=[]),v.ref&&x.push(v.ref,null,y),x.push(h,y.__c||g,y)),null!=g?(null==b&&(b=g),"function"==typeof y.type&&null!=y.__k&&y.__k===v.__k?y.__d=c=w(y,c,e):c=k(e,y,v,S,g,c),d||"option"!==n.type?"function"==typeof n.type&&(n.__d=c):e.value=""):c&&v.__e==c&&c.parentNode!=e&&(c=m(v))}for(n.__e=b,f=P;f--;)null!=S[f]&&("function"==typeof n.type&&null!=S[f].__e&&S[f].__e==n.__d&&(n.__d=m(o,f+1)),j(S[f],S[f]));if(x)for(f=0;f<x.length;f++)A(x[f],x[++f],x[++f])}function w(e,t,n){var o,r;for(o=0;o<e.__k.length;o++)(r=e.__k[o])&&(r.__=e,t="function"==typeof r.type?w(r,t,n):k(n,r,r,e.__k,r.__e,t));return t}function k(e,t,n,o,r,i){var l,s,a;if(void 0!==t.__d)l=t.__d,t.__d=void 0;else if(null==n||r!=i||null==r.parentNode)e:if(null==i||i.parentNode!==e)e.appendChild(r),l=null;else{for(s=i,a=0;(s=s.nextSibling)&&a<o.length;a+=2)if(s==r)break e;e.insertBefore(r,i),l=i}return void 0!==l?l:r.nextSibling}function x(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]=null==n?"":"number"!=typeof n||u.test(t)?n:n+"px"}function S(e,t,n,o,r){var i;e:if("style"===t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof o&&(e.style.cssText=o=""),o)for(t in o)n&&t in n||x(e.style,t,"");if(n)for(t in n)o&&n[t]===o[t]||x(e.style,t,n[t])}else if("o"===t[0]&&"n"===t[1])i=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+i]=n,n?o||e.addEventListener(t,i?O:P,i):e.removeEventListener(t,i?O:P,i);else if("dangerouslySetInnerHTML"!==t){if(r)t=t.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if("href"!==t&&"list"!==t&&"form"!==t&&"tabIndex"!==t&&"download"!==t&&t in e)try{e[t]=null==n?"":n;break e}catch(e){}"function"==typeof n||(null!=n&&(!1!==n||"a"===t[0]&&"r"===t[1])?e.setAttribute(t,n):e.removeAttribute(t))}}function P(e){this.l[e.type+!1](t.event?t.event(e):e)}function O(e){this.l[e.type+!0](t.event?t.event(e):e)}function C(e,n,o,r,i,l,s,a,u){var d,f,_,m,v,y,g,w,k,x,S,P=n.type;if(void 0!==n.constructor)return null;null!=o.__h&&(u=o.__h,a=n.__e=o.__e,n.__h=null,l=[a]),(d=t.__b)&&d(n);try{e:if("function"==typeof P){if(w=n.props,k=(d=P.contextType)&&r[d.__c],x=d?k?k.props.value:d.__:r,o.__c?g=(f=n.__c=o.__c).__=f.__E:("prototype"in P&&P.prototype.render?n.__c=f=new P(w,x):(n.__c=f=new h(w,x),f.constructor=P,f.render=I),k&&k.sub(f),f.props=w,f.state||(f.state={}),f.context=x,f.__n=r,_=f.__d=!0,f.__h=[]),null==f.__s&&(f.__s=f.state),null!=P.getDerivedStateFromProps&&(f.__s==f.state&&(f.__s=c({},f.__s)),c(f.__s,P.getDerivedStateFromProps(w,f.__s))),m=f.props,v=f.state,_)null==P.getDerivedStateFromProps&&null!=f.componentWillMount&&f.componentWillMount(),null!=f.componentDidMount&&f.__h.push(f.componentDidMount);else{if(null==P.getDerivedStateFromProps&&w!==m&&null!=f.componentWillReceiveProps&&f.componentWillReceiveProps(w,x),!f.__e&&null!=f.shouldComponentUpdate&&!1===f.shouldComponentUpdate(w,f.__s,x)||n.__v===o.__v){f.props=w,f.state=f.__s,n.__v!==o.__v&&(f.__d=!1),f.__v=n,n.__e=o.__e,n.__k=o.__k,n.__k.forEach((function(e){e&&(e.__=n)})),f.__h.length&&s.push(f);break e}null!=f.componentWillUpdate&&f.componentWillUpdate(w,f.__s,x),null!=f.componentDidUpdate&&f.__h.push((function(){f.componentDidUpdate(m,v,y)}))}f.context=x,f.props=w,f.state=f.__s,(d=t.__r)&&d(n),f.__d=!1,f.__v=n,f.__P=e,d=f.render(f.props,f.state,f.context),f.state=f.__s,null!=f.getChildContext&&(r=c(c({},r),f.getChildContext())),_||null==f.getSnapshotBeforeUpdate||(y=f.getSnapshotBeforeUpdate(m,v)),S=null!=d&&d.type===p&&null==d.key?d.props.children:d,b(e,Array.isArray(S)?S:[S],n,o,r,i,l,s,a,u),f.base=n.__e,n.__h=null,f.__h.length&&s.push(f),g&&(f.__E=f.__=null),f.__e=!1}else null==l&&n.__v===o.__v?(n.__k=o.__k,n.__e=o.__e):n.__e=M(o.__e,n,o,r,i,l,s,u);(d=t.diffed)&&d(n)}catch(e){n.__v=null,(u||null!=l)&&(n.__e=a,n.__h=!!u,l[l.indexOf(a)]=null),t.__e(e,n,o)}}function E(e,n){t.__c&&t.__c(n,e),e.some((function(n){try{e=n.__h,n.__h=[],e.some((function(e){e.call(n)}))}catch(e){t.__e(e,n.__v)}}))}function M(t,n,o,r,i,l,a,u){var c,f,_,p=o.props,h=n.props,v=n.type,y=0;if("svg"===v&&(i=!0),null!=l)for(;y<l.length;y++)if((c=l[y])&&(c===t||(v?c.localName==v:3==c.nodeType))){t=c,l[y]=null;break}if(null==t){if(null===v)return document.createTextNode(h);t=i?document.createElementNS("http://www.w3.org/2000/svg",v):document.createElement(v,h.is&&h),l=null,u=!1}if(null===v)p===h||u&&t.data===h||(t.data=h);else{if(l=l&&e.call(t.childNodes),f=(p=o.props||s).dangerouslySetInnerHTML,_=h.dangerouslySetInnerHTML,!u){if(null!=l)for(p={},y=0;y<t.attributes.length;y++)p[t.attributes[y].name]=t.attributes[y].value;(_||f)&&(_&&(f&&_.__html==f.__html||_.__html===t.innerHTML)||(t.innerHTML=_&&_.__html||""))}if(function(e,t,n,o,r){var i;for(i in n)"children"===i||"key"===i||i in t||S(e,i,null,n[i],o);for(i in t)r&&"function"!=typeof t[i]||"children"===i||"key"===i||"value"===i||"checked"===i||n[i]===t[i]||S(e,i,t[i],n[i],o)}(t,h,p,i,u),_)n.__k=[];else if(y=n.props.children,b(t,Array.isArray(y)?y:[y],n,o,r,i&&"foreignObject"!==v,l,a,l?l[0]:o.__k&&m(o,0),u),null!=l)for(y=l.length;y--;)null!=l[y]&&d(l[y]);u||("value"in h&&void 0!==(y=h.value)&&(y!==t.value||"progress"===v&&!y)&&S(t,"value",y,p.value,!1),"checked"in h&&void 0!==(y=h.checked)&&y!==t.checked&&S(t,"checked",y,p.checked,!1))}return t}function A(e,n,o){try{"function"==typeof e?e(n):e.current=n}catch(e){t.__e(e,o)}}function j(e,n,o){var r,i;if(t.unmount&&t.unmount(e),(r=e.ref)&&(r.current&&r.current!==e.__e||A(r,null,n)),null!=(r=e.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(e){t.__e(e,n)}r.base=r.__P=null}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&j(r[i],n,"function"!=typeof e.type);o||null==e.__e||d(e.__e),e.__e=e.__d=void 0}function I(e,t,n){return this.constructor(e,n)}function T(n,o,r){var i,l,a;t.__&&t.__(n,o),l=(i="function"==typeof r)?null:r&&r.__k||o.__k,a=[],C(o,n=(!i&&r||o).__k=f(p,null,[n]),l||s,s,void 0!==o.ownerSVGElement,!i&&r?[r]:l?null:o.firstChild?e.call(o.childNodes):null,a,!i&&r?r:l?l.__e:o.firstChild,i),E(a,n)}function D(e){for(var t=arguments.length,n=Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];throw Error("[Immer] minified error nr: "+e+(n.length?" "+n.map((function(e){return"'"+e+"'"})).join(","):"")+". Find the full error at: https://bit.ly/3cXEKWf")}function H(e){return!!e&&!!e[ge]}function L(e){return!!e&&(function(e){if(!e||"object"!=typeof e)return!1;var t=Object.getPrototypeOf(e);if(null===t)return!0;var n=Object.hasOwnProperty.call(t,"constructor")&&t.constructor;return n===Object||"function"==typeof n&&Function.toString.call(n)===be}(e)||Array.isArray(e)||!!e[ye]||!!e.constructor[ye]||R(e)||G(e))}function F(e,t,n){void 0===n&&(n=!1),0===N(e)?(n?Object.keys:we)(e).forEach((function(o){n&&"symbol"==typeof o||t(o,e[o],e)})):e.forEach((function(n,o){return t(o,n,e)}))}function N(e){var t=e[ge];return t?t.i>3?t.i-4:t.i:Array.isArray(e)?1:R(e)?2:G(e)?3:0}function V(e,t){return 2===N(e)?e.has(t):Object.prototype.hasOwnProperty.call(e,t)}function z(e,t,n){var o=N(e);2===o?e.set(t,n):3===o?(e.delete(t),e.add(n)):e[t]=n}function R(e){return pe&&e instanceof Map}function G(e){return he&&e instanceof Set}function U(e){return e.o||e.t}function W(e){if(Array.isArray(e))return Array.prototype.slice.call(e);var t=ke(e);delete t[ge];for(var n=we(t),o=0;o<n.length;o++){var r=n[o],i=t[r];!1===i.writable&&(i.writable=!0,i.configurable=!0),(i.get||i.set)&&(t[r]={configurable:!0,writable:!0,enumerable:i.enumerable,value:e[r]})}return Object.create(Object.getPrototypeOf(e),t)}function $(e,t){return void 0===t&&(t=!1),q(e)||H(e)||!L(e)||(N(e)>1&&(e.set=e.add=e.clear=e.delete=B),Object.freeze(e),t&&F(e,(function(e,t){return $(t,!0)}),!0)),e}function B(){D(2)}function q(e){return null==e||"object"!=typeof e||Object.isFrozen(e)}function K(e){var t=xe[e];return t||D(18,e),t}function J(){return fe}function X(e,t){t&&(K("Patches"),e.u=[],e.s=[],e.v=t)}function Y(e){Z(e),e.p.forEach(ee),e.p=null}function Z(e){e===fe&&(fe=e.l)}function Q(e){return fe={p:[],l:fe,h:e,m:!0,_:0}}function ee(e){var t=e[ge];0===t.i||1===t.i?t.j():t.O=!0}function te(e,t){t._=t.p.length;var n=t.p[0],o=void 0!==e&&e!==n;return t.h.g||K("ES5").S(t,e,o),o?(n[ge].P&&(Y(t),D(4)),L(e)&&(e=ne(t,e),t.l||re(t,e)),t.u&&K("Patches").M(n[ge],e,t.u,t.s)):e=ne(t,n,[]),Y(t),t.u&&t.v(t.u,t.s),e!==ve?e:void 0}function ne(e,t,n){if(q(t))return t;var o=t[ge];if(!o)return F(t,(function(r,i){return oe(e,o,t,r,i,n)}),!0),t;if(o.A!==e)return t;if(!o.P)return re(e,o.t,!0),o.t;if(!o.I){o.I=!0,o.A._--;var r=4===o.i||5===o.i?o.o=W(o.k):o.o;F(3===o.i?new Set(r):r,(function(t,i){return oe(e,o,r,t,i,n)})),re(e,r,!1),n&&e.u&&K("Patches").R(o,n,e.u,e.s)}return o.o}function oe(e,t,n,o,r,i){if(H(r)){var l=ne(e,r,i&&t&&3!==t.i&&!V(t.D,o)?i.concat(o):void 0);if(z(n,o,l),!H(l))return;e.m=!1}if(L(r)&&!q(r)){if(!e.h.F&&e._<1)return;ne(e,r),t&&t.A.l||re(e,r)}}function re(e,t,n){void 0===n&&(n=!1),e.h.F&&e.m&&$(t,n)}function ie(e,t){var n=e[ge];return(n?U(n):e)[t]}function le(e,t){if(t in e)for(var n=Object.getPrototypeOf(e);n;){var o=Object.getOwnPropertyDescriptor(n,t);if(o)return o;n=Object.getPrototypeOf(n)}}function se(e){e.P||(e.P=!0,e.l&&se(e.l))}function ae(e){e.o||(e.o=W(e.t))}function ue(e,t,n){var o=R(t)?K("MapSet").N(t,n):G(t)?K("MapSet").T(t,n):e.g?function(e,t){var n=Array.isArray(e),o={i:n?1:0,A:t?t.A:J(),P:!1,I:!1,D:{},l:t,t:e,k:null,o:null,j:null,C:!1},r=o,i=Se;n&&(r=[o],i=Pe);var l=unsafeWindow.Proxy.revocable(r,i),s=l.revoke,a=l.proxy;return o.k=a,o.j=s,a}(t,n):K("ES5").J(t,n);return(n?n.A:J()).p.push(o),o}function ce(e,t){switch(t){case 2:return new Map(e);case 3:return Array.from(e)}return W(e)}e=a.slice,t={__e:function(e,t){for(var n,o,r;t=t.__;)if((n=t.__c)&&!n.__)try{if((o=n.constructor)&&null!=o.getDerivedStateFromError&&(n.setState(o.getDerivedStateFromError(e)),r=n.__d),null!=n.componentDidCatch&&(n.componentDidCatch(e),r=n.__d),r)return n.__E=n}catch(t){e=t}throw e}},o=0,h.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=c({},this.state),"function"==typeof e&&(e=e(c({},n),this.props)),e&&c(n,e),null!=e&&this.__v&&(t&&this.__h.push(t),y(this))},h.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),y(this))},h.prototype.render=p,r=[],i="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,g.__r=0;var de,fe,_e="undefined"!=typeof Symbol&&"symbol"==typeof Symbol("x"),pe="undefined"!=typeof Map,he="undefined"!=typeof Set,me=void 0!==unsafeWindow.Proxy&&void 0!==unsafeWindow.Proxy.revocable&&"undefined"!=typeof Reflect,ve=_e?Symbol.for("immer-nothing"):((de={})["immer-nothing"]=!0,de),ye=_e?Symbol.for("immer-draftable"):"__$immer_draftable",ge=_e?Symbol.for("immer-state"):"__$immer_state",be=("undefined"!=typeof Symbol&&Symbol.iterator,""+Object.prototype.constructor),we="undefined"!=typeof Reflect&&Reflect.ownKeys?Reflect.ownKeys:void 0!==Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:Object.getOwnPropertyNames,ke=Object.getOwnPropertyDescriptors||function(e){var t={};return we(e).forEach((function(n){t[n]=Object.getOwnPropertyDescriptor(e,n)})),t},xe={},Se={get:function(e,t){if(t===ge)return e;var n=U(e);if(!V(n,t))return function(e,t,n){var o,r=le(t,n);return r?"value"in r?r.value:null===(o=r.get)||void 0===o?void 0:o.call(e.k):void 0}(e,n,t);var o=n[t];return e.I||!L(o)?o:o===ie(e.t,t)?(ae(e),e.o[t]=ue(e.A.h,o,e)):o},has:function(e,t){return t in U(e)},ownKeys:function(e){return Reflect.ownKeys(U(e))},set:function(e,t,n){var o=le(U(e),t);if(null==o?void 0:o.set)return o.set.call(e.k,n),!0;if(!e.P){var r=ie(U(e),t),i=null==r?void 0:r[ge];if(i&&i.t===n)return e.o[t]=n,e.D[t]=!1,!0;if(function(e,t){return e===t?0!==e||1/e==1/t:e!=e&&t!=t}(n,r)&&(void 0!==n||V(e.t,t)))return!0;ae(e),se(e)}return e.o[t]===n&&"number"!=typeof n&&(void 0!==n||t in e.o)||(e.o[t]=n,e.D[t]=!0,!0)},deleteProperty:function(e,t){return void 0!==ie(e.t,t)||t in e.t?(e.D[t]=!1,ae(e),se(e)):delete e.D[t],e.o&&delete e.o[t],!0},getOwnPropertyDescriptor:function(e,t){var n=U(e),o=Reflect.getOwnPropertyDescriptor(n,t);return o?{writable:!0,configurable:1!==e.i||"length"!==t,enumerable:o.enumerable,value:n[t]}:o},defineProperty:function(){D(11)},getPrototypeOf:function(e){return Object.getPrototypeOf(e.t)},setPrototypeOf:function(){D(12)}},Pe={};F(Se,(function(e,t){Pe[e]=function(){return arguments[0]=arguments[0][0],t.apply(this,arguments)}})),Pe.deleteProperty=function(e,t){return Se.deleteProperty.call(this,e[0],t)},Pe.set=function(e,t,n){return Se.set.call(this,e[0],t,n,e[0])};var Oe=new(function(){function e(e){var t=this;this.g=me,this.F=!0,this.produce=function(e,n,o){if("function"==typeof e&&"function"!=typeof n){var r=n;n=e;var i=t;return function(e){var t=this;void 0===e&&(e=r);for(var o=arguments.length,l=Array(o>1?o-1:0),s=1;s<o;s++)l[s-1]=arguments[s];return i.produce(e,(function(e){var o;return(o=n).call.apply(o,[t,e].concat(l))}))}}var l;if("function"!=typeof n&&D(6),void 0!==o&&"function"!=typeof o&&D(7),L(e)){var s=Q(t),a=ue(t,e,void 0),u=!0;try{l=n(a),u=!1}finally{u?Y(s):Z(s)}return"undefined"!=typeof Promise&&l instanceof Promise?l.then((function(e){return X(s,o),te(e,s)}),(function(e){throw Y(s),e})):(X(s,o),te(l,s))}if(!e||"object"!=typeof e){if((l=n(e))===ve)return;return void 0===l&&(l=e),t.F&&$(l,!0),l}D(21,e)},this.produceWithPatches=function(e,n){return"function"==typeof e?function(n){for(var o=arguments.length,r=Array(o>1?o-1:0),i=1;i<o;i++)r[i-1]=arguments[i];return t.produceWithPatches(n,(function(t){return e.apply(void 0,[t].concat(r))}))}:[t.produce(e,n,(function(e,t){o=e,r=t})),o,r];var o,r},"boolean"==typeof(null==e?void 0:e.useProxies)&&this.setUseProxies(e.useProxies),"boolean"==typeof(null==e?void 0:e.autoFreeze)&&this.setAutoFreeze(e.autoFreeze)}var t=e.prototype;return t.createDraft=function(e){L(e)||D(8),H(e)&&(e=function(e){return H(e)||D(22,e),function e(t){if(!L(t))return t;var n,o=t[ge],r=N(t);if(o){if(!o.P&&(o.i<4||!K("ES5").K(o)))return o.t;o.I=!0,n=ce(t,r),o.I=!1}else n=ce(t,r);return F(n,(function(t,r){o&&function(e,t){return 2===N(e)?e.get(t):e[t]}(o.t,t)===r||z(n,t,e(r))})),3===r?new Set(n):n}(e)}(e));var t=Q(this),n=ue(this,e,void 0);return n[ge].C=!0,Z(t),n},t.finishDraft=function(e,t){var n=(e&&e[ge]).A;return X(n,t),te(void 0,n)},t.setAutoFreeze=function(e){this.F=e},t.setUseProxies=function(e){e&&!me&&D(20),this.g=e},t.applyPatches=function(e,t){var n;for(n=t.length-1;n>=0;n--){var o=t[n];if(0===o.path.length&&"replace"===o.op){e=o.value;break}}var r=K("Patches").$;return H(e)?r(e,t):this.produce(e,(function(e){return r(e,t.slice(n+1))}))},e}()),Ce=Oe.produce;function Ee(e){var t,n,o="";if("string"==typeof e||"number"==typeof e)o+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=Ee(e[t]))&&(o&&(o+=" "),o+=n);else for(t in e)e[t]&&(o&&(o+=" "),o+=t);return o}function Me(){for(var e,t,n=0,o="";n<arguments.length;)(e=arguments[n++])&&(t=Ee(e))&&(o&&(o+=" "),o+=t);return o}Oe.produceWithPatches.bind(Oe),Oe.setAutoFreeze.bind(Oe),Oe.setUseProxies.bind(Oe),Oe.applyPatches.bind(Oe),Oe.createDraft.bind(Oe),Oe.finishDraft.bind(Oe);let Ae=0;const je=()=>""+ ++Ae,Ie=new Intl.Collator(void 0,{sensitivity:"base",numeric:!0}),Te=async({username:e,password:t})=>{const n=new URLSearchParams({username:e,password:t,service:"moodle_mobile_app"}),o=await fetch("/login/token.php",{method:"POST",body:n.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}}),r=await o.json();if("errorcode"in r)throw new Error("Token was invalid");return GM_setValue("token",r.token),GM_setValue("username",e),GM_setValue("password",t),r.token};let De;var He,Le,Fe,Ne=0,Ve=[],ze=t.__b,Re=t.__r,Ge=t.diffed,Ue=t.__c,We=t.unmount;function $e(e){return Ne=5,function(e,n){var o=function(e,n){t.__h&&t.__h(Le,e,Ne||7),Ne=0;var o=Le.__H||(Le.__H={__:[],__h:[]});return e>=o.__.length&&o.__.push({}),o.__[e]}(He++);return function(e,t){return!e||e.length!==t.length||t.some((function(t,n){return t!==e[n]}))}(o.__H,n)&&(o.__=e(),o.__H=n,o.__h=e),o.__}((function(){return{current:e}}),[])}function Be(){Ve.forEach((function(e){if(e.__P)try{e.__H.__h.forEach(Ke),e.__H.__h.forEach(Je),e.__H.__h=[]}catch(n){e.__H.__h=[],t.__e(n,e.__v)}})),Ve=[]}t.__b=function(e){Le=null,ze&&ze(e)},t.__r=function(e){Re&&Re(e),He=0;var t=(Le=e.__c).__H;t&&(t.__h.forEach(Ke),t.__h.forEach(Je),t.__h=[])},t.diffed=function(e){Ge&&Ge(e);var n=e.__c;n&&n.__H&&n.__H.__h.length&&(1!==Ve.push(n)&&Fe===t.requestAnimationFrame||((Fe=t.requestAnimationFrame)||function(e){var t,n=function(){clearTimeout(o),qe&&cancelAnimationFrame(t),setTimeout(e)},o=setTimeout(n,100);qe&&(t=requestAnimationFrame(n))})(Be)),Le=void 0},t.__c=function(e,n){n.some((function(e){try{e.__h.forEach(Ke),e.__h=e.__h.filter((function(e){return!e.__||Je(e)}))}catch(o){n.some((function(e){e.__h&&(e.__h=[])})),n=[],t.__e(o,e.__v)}})),Ue&&Ue(e,n)},t.unmount=function(e){We&&We(e);var n=e.__c;if(n&&n.__H)try{n.__H.__.forEach(Ke)}catch(e){t.__e(e,n.__v)}};var qe="function"==typeof requestAnimationFrame;function Ke(e){var t=Le;"function"==typeof e.__c&&e.__c(),Le=t}function Je(e){var t=Le;e.__c=e.__(),Le=t}n(222);const Xe=e=>f("svg",{...e,viewBox:"0 0 512 512"},f("path",{stroke:"currentColor","stroke-linecap":"round","stroke-width":"32",d:"M368 368 144 144m224 0L144 368"})),Ye=e=>f("svg",{...e,viewBox:"0 0 512 512"},f("path",{fill:"currentColor",d:"M321.94 98 158.82 237.78a24 24 0 0 0 0 36.44L321.94 414c15.57 13.34 39.62 2.28 39.62-18.22v-279.6c0-20.5-24.05-31.56-39.62-18.18z"})),Ze=e=>f("svg",{...e,viewBox:"0 0 512 512"},f("path",{fill:"currentColor",d:"m190.06 414 163.12-139.78a24 24 0 0 0 0-36.44L190.06 98c-15.57-13.34-39.62-2.28-39.62 18.22v279.6c0 20.5 24.05 31.56 39.62 18.18z"})),Qe=e=>f("svg",{...e,viewBox:"0 0 512 512"},f("path",{stroke:"currentColor","stroke-linecap":"round","stroke-width":"32",d:"M256 112v288m144-144H112"})),et=e=>{const t=e%60;return`${Math.floor(e/60)}:${`0${t}`.slice(-2)}`},tt=new RegExp("^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$"),nt=e=>{if(e=e.trim(),!tt.test(e))return!1;const[t,n]=e.split(":");return 60*Number(t)+Number(n)},ot=({time:e,class:t,onInput:n,index:o,...r})=>f("input",{...r,class:Me("time-input",t,{"invalid-input":!1===nt(e)}),value:e,onInput:n}),rt=({row:e,index:t,onInput:n,deleteRow:o,handleFocus:r})=>{const{fromInvalid:i,from:l,toInvalid:s,to:a,content:u,id:c}=e,d=$e(null),_=$e(null);return f("div",{class:"table-row"},f("div",{class:"table-cell time"},f(ot,{index:t,class:Me("time-from",{"invalid-input":!0===i}),time:l.str,placeholder:"HH:mm",onInput:n("from",t)})," - ",f(ot,{index:3,class:Me("time-to",{"invalid-input":!0===s}),time:a.str,placeholder:"HH:mm",onInput:n("to",t)})),f("div",{class:"table-cell content"},f("input",{ref:_,value:u,placeholder:"Content",onInput:n("content",t),onFocus:r(d,_,t)}),f("hr",null),f("input",{ref:d,value:c,placeholder:"Course id",onInput:n("id",t),onFocus:r(d,_,t)})),f("div",{class:"table-cell remove-row",onClick:()=>{o(t)}},f(Xe,null)))},it=({rows:e,handleFocus:t,onInput:n,deleteRow:o})=>f("div",null,e?.map(((e,r)=>f(rt,{key:e.key,row:e,index:r,handleFocus:t,deleteRow:o,onInput:n})))),lt=({courses:e,focusedElement:t,onClick:n})=>{if(void 0===t)return null;const{left:o,height:r,top:i}=t,l=t.inputText.trim().toLowerCase();return""===l?null:f("div",{class:"suggestions",style:{transform:`translate(${o}px, ${i+r}px)`}},((e,t)=>{const n=[],o=new RegExp(t,"i");for(const t of e)o.test(t.name)&&n.push({...t,index:t.name.search(o)});return n.sort(((e,t)=>e.index-t.index||Ie.compare(e.name,t.name)||Number(e.id)-Number(t.id)))})(e,l).map((({id:e,name:t})=>{const o=t.toLowerCase().indexOf(l),r=t.slice(0,o),i=t.slice(o+l.length),s=t.slice(o,o+l.length);return f("div",{key:e,class:"suggestion",onMouseDown:()=>{n(e)}},f("div",{class:"suggestion-name"},r,f("span",{class:"emphasised"},s),i),f("div",{class:"suggestion-id"},e))})))},st=({loggedOut:e,cb:t})=>{const n=$e(null),o=$e(null);return e?f("div",{class:"login-popup"},f("div",{class:"card"},f("div",{class:"card-body"},f("h5",{class:"card-title"},"Login"),f("input",{ref:n,required:!0,placeholder:"Username",class:"input-group-text"}),f("input",{ref:o,required:!0,placeholder:"Password",class:"input-group-text",type:"password"})),f("button",{type:"button",class:"btn btn-primary",onClick:()=>{const e=n.current?.value.trim(),r=o.current?.value;void 0!==e&&void 0!==r&&t({username:e,password:r})}},"Login"))):null},at=({handleClick:e,handleSave:t,day:n,saveButtonClass:o,resetSaveValidity:r})=>f(p,null,f("div",{class:"day-controls"},f("div",{class:"caret-back",onClick:()=>{e((n-1+5)%5)}},f(Ye,null)),f("div",{class:"day-current-day"},(e=>{const t=["Monday","Tuesday","Wednesday","Thursday","Friday"][e];if(void 0===t)throw new Error(`n was out of range: ${e}`);return t})(n)),f("div",{class:"caret-forward",onClick:()=>{e((n+1)%5)}},f(Ze,null))),f("button",{type:"button",class:Me("save-button",o),onClick:t,onAnimationEnd:r},"Save"));var ut=n(217);const ct=()=>{const e=((new Date).getDay()+6)%7;return e>4?0:e},dt=()=>({key:je(),from:{num:0,str:et(0)},to:{num:0,str:et(0)},content:"",id:""}),ft=()=>{const e=[],t=GM_getValue("days");for(let n=0;n<5;++n){const o=t?.[n];e[n]=o?o.map((({from:e,to:t,content:n,id:o})=>({key:je(),from:{str:et(e),num:e},to:{str:et(t),num:t},id:o??"",content:n??""}))):[{from:480,to:525},{from:525,to:570},{from:590,to:635},{from:640,to:685},{from:690,to:735},{from:735,to:790},{from:790,to:835},{from:835,to:880},{from:890,to:935},{from:935,to:975}].map((({from:e,to:t})=>({...dt(),from:{num:e,str:et(e)},to:{num:t,str:et(t)}})))}return e};class _t extends h{state={day:ct(),loggedOut:!1,courses:[],focusedElement:void 0,tables:ft(),saveValidity:void 0};callbacksAfterLogin=new Set;constructor(...e){super(...e),this.callbacksAfterLogin.add(this.fetchCourses)}render=()=>{const{state:e,loggedOutCallback:t,handleButtonNavigate:n,handleSave:o,deleteRow:r,handleTableInput:i,createRow:l,handleSuggestionsClick:s,resetSaveValidity:a,handleTableFocus:u}=this,{loggedOut:c,focusedElement:d,courses:_,day:h,tables:m,saveValidity:v}=e;return f(p,null,f(st,{loggedOut:c,cb:t}),f("div",{class:"container"},f("div",{class:"table-center"},f("div",{class:"grid-buttons"},f(at,{day:h,handleSave:o,handleClick:n,saveButtonClass:Me({"save-successful":!0===v,"save-failed":!1===v}),resetSaveValidity:a})),f("div",{class:"main-table"},f(it,{rows:m[h],deleteRow:r,handleFocus:u,onInput:i}),f("div",{class:"row-icon-add-row"},f("div",{class:"icon-add-row"},f(Qe,{onClick:l})))))),f(lt,{focusedElement:d,courses:_,onClick:s}))};resetSaveValidity=()=>{this.setState({saveValidity:void 0})};validateOrder=()=>{let e=!0;return this.setState(Ce((t=>{const n=n=>{e&&(e=!1,t.day=n)};for(const[e,o]of t.tables.entries()){for(const e of o)delete e.fromInvalid,delete e.toInvalid;for(const[t,r]of o.entries()){const i=o[t+1],{from:l,to:s}=r;!1===nt(l.str)&&(r.fromInvalid=!0,n(e)),!1===nt(s.str)&&(r.toInvalid=!0,n(e)),l.num>=s.num&&(r.fromInvalid=!0,r.toInvalid=!0,n(e)),i&&i.from.num<s.num&&(r.toInvalid=!0,i.fromInvalid=!0,n(e))}}}))),e};handleSave=()=>{if(!this.validateOrder())return void this.setState({saveValidity:!1});this.setState({saveValidity:!0});const e=[];for(const t of this.state.tables){const n=[];e.push(n);for(const{from:e,to:o,content:r,id:i}of t)n.push({from:e.num,to:o.num,content:r||void 0,id:i||void 0})}GM_setValue("days",{...e})};handleTableFocus=(e,t,n)=>o=>{const r=e?.current,i=t?.current;if(!i||!r||void 0===n)return void this.setState({focusedElement:void 0});o.stopImmediatePropagation();const l=r.getBoundingClientRect(),s=r.ownerDocument.defaultView;if(!s)return void this.setState({focusedElement:void 0});const a=l.top+s.pageYOffset,u=l.left+s.pageXOffset,c=r.clientHeight,d=i.value.trim();this.setState({focusedElement:{top:a,left:u,height:c,inputText:d,index:n}})};handleSuggestionsClick=e=>{this.setState(Ce((t=>{if(!t.focusedElement)return;const n=t.tables[t.day]?.[t.focusedElement.index];n&&(n.id=e,t.focusedElement=void 0)})))};deleteRow=e=>{this.setState(Ce((t=>{t.tables[t.day]?.splice(e,1)})))};componentDidMount=async()=>{document.body.addEventListener("focusout",(()=>{this.setState({focusedElement:void 0})})),document.body.addEventListener("keydown",(e=>{"s"===e.key&&e.ctrlKey&&(e.preventDefault(),this.handleSave())}));const e=GM_getValue("token");if(e)return void this.callbackAfterLoginHandler(e);const t=(()=>{const e=GM_getValue("username"),t=GM_getValue("password");if(e&&t)return{username:e,password:t}})();if(t)try{const e=await Te(t);return void this.callbackAfterLoginHandler(e)}catch{}this.logout(!0)};handleTableInput=(e,t)=>n=>{this.setState(Ce((o=>{const r=o.tables[o.day]?.[t];if(!r)return;const i=n.currentTarget.value,l=nt(i);switch(e){case"from":delete r.fromInvalid,r.from.str=i,!1===l?r.fromInvalid=!0:r.from.num=l;break;case"to":delete r.toInvalid,r.to.str=i,!1===l?r.toInvalid=!0:r.to.num=l;break;case"content":r.content=i,o.focusedElement&&(o.focusedElement.inputText=i);break;case"id":r.id=i}}))),this.validateOrder()};createRow=()=>{this.setState(Ce((e=>{e.tables[e.day]?.push(dt())})))};logout=(e,t)=>{((e=!1)=>{if(GM_deleteValue("token"),e)for(const e of["username","password"])GM_deleteValue(e)})(e),t&&this.callbacksAfterLogin.add(t),this.setState({loggedOut:!0})};callbackAfterLoginHandler=e=>{for(const t of this.callbacksAfterLogin)t(e),this.callbacksAfterLogin.delete(t)};loggedOutCallback=async e=>{try{const t=await Te(e);this.setState({loggedOut:!1}),this.callbackAfterLoginHandler(t)}catch{this.logout(!0)}};fetchCourses=async e=>{let t;try{t=await(async e=>{const t=await(async e=>{if(void 0!==De)return De;const t=new URLSearchParams({wsfunction:"core_webservice_get_site_info",wstoken:e}),n=await fetch("/webservice/rest/server.php?moodlewsrestformat=json",{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:t.toString()}),o=await n.json();if("exception"in o)throw new Error("token was undefined");return De=o.userid,De})(e),n=new URLSearchParams({"requests[0][function]":"core_enrol_get_users_courses","requests[0][arguments]":JSON.stringify({userid:t,returnusercount:!1}),wstoken:e,wsfunction:"tool_mobile_call_external_functions",moodlewsrestformat:"json"}),o=await fetch("/webservice/rest/server.php",{method:"POST",body:n.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}});if(!o.ok)throw new Error(`Response was not ok: ${o.status}`);const r=await o.json();if("exception"in r||r.responses[0].error)throw new Error("Token was invalid");const i=JSON.parse(r.responses[0].data),l={};for(const{id:e,fullname:t}of i)l[e]=t;return l})(e)}catch{return void this.logout(!1,this.fetchCourses)}const n=Object.entries(t).map((([e,t])=>({id:e,name:t,key:je()})));this.setState({courses:n})};handleButtonNavigate=e=>{this.setState({day:e})}}var pt=n(123);
// ==UserScript==
// @name      Moodle Timetable v5
// @version   2021.08.27a
// @author    lusc
// @updateURL https://git.io/Jqlt4
// @include   *://moodle.ksasz.ch/
// @include   *://moodle.ksasz.ch/?*
// @include   *://moodle.ksasz.ch/timetable/v5*
// @grant     GM_addValueChangeListener
// @grant     GM_setValue
// @grant     GM_getValue
// @grant     GM_deleteValue
// @grant     GM_registerMenuCommand
// @grant     GM_addStyle
// @grant     GM_notification
// @run-at    document-start
// ==/UserScript==
"https:"!==location.protocol&&(location.protocol="https:");const ht=e=>Number.isInteger(Number(e))?`/course/view.php?id=${e}`:e,mt=({values:e,isNow:t=!1})=>{const{from:n,to:o,id:r}=e,i=e.content??"Free lesson";return f("div",{class:"tt-tr"},f("div",{class:"tt-th"},t?"Now":"Next",void 0!==n&&void 0!==o&&` (${et(n)} - ${et(o)})`,":"),f("div",{class:"tt-td"},"string"==typeof r?f("a",{href:ht(r),target:"_blank",rel:"noopener noreferrer"},i):i))},vt=()=>{const e=new Date;return 60*e.getHours()+e.getMinutes()+e.getSeconds()/60+e.getMilliseconds()/60/1e3};class yt extends h{state={courses:[],timetableState:4};_timeoutId;setTimeout=e=>{const t=60*(e-vt())*1e3;this.clearTimeout(),this._timeoutId=setTimeout((()=>{this.updateCourses(!0)}),t+200)};clearTimeout=()=>{void 0!==this._timeoutId&&clearTimeout(this._timeoutId)};updateCourses=e=>{if(this.clearTimeout(),(()=>{const e=GM_getValue("isHoliday");return"boolean"!=typeof e?(GM_setValue("isHoliday",!1),!1):e})())return void this.setState({timetableState:5});if(!(()=>{const e=(new Date).getDay();return 0!==e&&6!==e})())return void this.setState({timetableState:6});const{courses:t,state:n}=(()=>{const e=GM_getValue("days"),t=new Date,n=vt(),o=e?.[t.getDay()-1];if(void 0===o||0===o.length)return{state:3};const r=o[o.length-1];if(!r||r.to<=n)return{state:1};const i=o[0];if(!i||i.from>n)return{state:0,courses:[void 0,i]};let l,s=0;for(;(l=o[s])&&l.to<n;)++s;return{state:2,courses:[l,o[s+1]]}})();if(this.setState({timetableState:n}),t){const[n,o]=t;this.setState({courses:t});const r=n?.to??o?.from;"number"==typeof r&&this.setTimeout(r),e&&n&&(e=>{const{id:t,content:n}=e;if(n){const e=4e3,o=GM_notification({text:n,title:"Now",image:"https://i.imgur.com/ZtPH8v7.png",timeout:e,onclick:()=>{void 0!==t&&open(ht(t))}});o&&setTimeout((()=>{o.remove()}),e)}})(n)}};componentDidMount=()=>{this.updateCourses();const e=()=>{this.updateCourses()};GM_addValueChangeListener("days",e),GM_addValueChangeListener("isHoliday",e)};render=()=>{const{timetableState:e,courses:t}=this.state,[n,o]=t;return f("div",null,f("div",{class:"mod-indent-outer"},f("div",{class:"contentwithoutlink"},f("div",{class:"no-overflow"},f("hr",null),f("div",{class:"tt-body"},f("div",{class:"tt-title"},"Timetable"),4===e&&f("div",null,"Loading"),1===e&&f("div",null,"No school anymore"),6===e&&f("div",{class:"tt-title"},"Weekend"),5===e&&f("div",{class:"tt-title"},"Holiday"),3===e&&f("div",null,"Today's timetable is empty, you can update it ",f("a",{href:"/timetable/v5",rel:"noopener noreferrer",target:"_blank"},"here")),f("div",{class:"tt-table"},(0===e||2===e)&&f("div",{class:"tt-tbody"},f(mt,{isNow:!0,values:n??{content:"No school"}}),f(mt,{values:o??{content:"No school"}})))),f("hr",null)))))}}const gt=/^\/timetable\/v5/i.test(location.pathname)?()=>{history.replaceState({},"","/timetable/v5");const{body:e,head:t}=document;for(;t.lastChild;)t.lastChild.remove();for(;e.lastChild;)e.lastChild.remove();document.title="Moodle timetable v5";const n=document.createElement("link");n.rel="shortcut icon",n.href="/theme/image.php/classic/theme/1620639422/favicon",t.append(n),GM_addStyle(ut);const o=document.createElement("div");o.id="root",e.append(o),T(f(_t,null),o)}:()=>{GM_registerMenuCommand("Open settings",(()=>{open("/timetable/v5","_blank")})),GM_registerMenuCommand("Toggle holiday",(()=>{GM_setValue("isHoliday",!GM_getValue("isHoliday"))})),GM_addStyle(pt);const e=document.querySelector("#region-main-box ul.section");if(e){const t=document.createElement("li");t.id="module-timetable-v5",t.className="activity label modtype_label",e.prepend(t),T(f(yt,null),t)}};"complete"===document.readyState?gt():addEventListener("DOMContentLoaded",gt,{once:!0})})()})();