(()=>{"use strict";var e,t,n,o,r,i,s={},l=[],a=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function u(e,t){for(var n in t)e[n]=t[n];return e}function c(e){var t=e.parentNode;t&&t.removeChild(e)}function d(t,n,o){var r,i,s,l={};for(s in n)"key"==s?r=n[s]:"ref"==s?i=n[s]:l[s]=n[s];if(arguments.length>2&&(l.children=arguments.length>3?e.call(arguments,2):o),"function"==typeof t&&null!=t.defaultProps)for(s in t.defaultProps)void 0===l[s]&&(l[s]=t.defaultProps[s]);return f(t,l,r,i,null)}function f(e,o,r,i,s){var l={type:e,props:o,key:r,ref:i,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==s?++n:s};return null==s&&null!=t.vnode&&t.vnode(l),l}function _(e){return e.children}function p(e,t){this.props=e,this.context=t}function h(e,t){if(null==t)return e.__?h(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?h(e):null}function m(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return m(e)}}function v(e){(!e.__d&&(e.__d=!0)&&o.push(e)&&!y.__r++||i!==t.debounceRendering)&&((i=t.debounceRendering)||r)(y)}function y(){for(var e;y.__r=o.length;)e=o.sort((function(e,t){return e.__v.__b-t.__v.__b})),o=[],e.some((function(e){var t,n,o,r,i,s;e.__d&&(i=(r=(t=e).__v).__e,(s=t.__P)&&(n=[],(o=u({},r)).__v=r.__v+1,C(s,r,o,t.__n,void 0!==s.ownerSVGElement,null!=r.__h?[i]:null,n,null==i?h(r):i,r.__h),O(n,r),r.__e!=i&&m(r)))}))}function g(e,t,n,o,r,i,a,u,c,d){var p,m,v,y,g,k,x,S=o&&o.__k||l,P=S.length;for(n.__k=[],p=0;p<t.length;p++)if(null!=(y=n.__k[p]=null==(y=t[p])||"boolean"==typeof y?null:"string"==typeof y||"number"==typeof y||"bigint"==typeof y?f(null,y,null,null,y):Array.isArray(y)?f(_,{children:y},null,null,null):y.__b>0?f(y.type,y.props,y.key,null,y.__v):y)){if(y.__=n,y.__b=n.__b+1,null===(v=S[p])||v&&y.key==v.key&&y.type===v.type)S[p]=void 0;else for(m=0;m<P;m++){if((v=S[m])&&y.key==v.key&&y.type===v.type){S[m]=void 0;break}v=null}C(e,y,v=v||s,r,i,a,u,c,d),g=y.__e,(m=y.ref)&&v.ref!=m&&(x||(x=[]),v.ref&&x.push(v.ref,null,y),x.push(m,y.__c||g,y)),null!=g?(null==k&&(k=g),"function"==typeof y.type&&y.__k===v.__k?y.__d=c=b(y,c,e):c=w(e,y,v,S,g,c),"function"==typeof n.type&&(n.__d=c)):c&&v.__e==c&&c.parentNode!=e&&(c=h(v))}for(n.__e=k,p=P;p--;)null!=S[p]&&("function"==typeof n.type&&null!=S[p].__e&&S[p].__e==n.__d&&(n.__d=h(o,p+1)),I(S[p],S[p]));if(x)for(p=0;p<x.length;p++)M(x[p],x[++p],x[++p])}function b(e,t,n){for(var o,r=e.__k,i=0;r&&i<r.length;i++)(o=r[i])&&(o.__=e,t="function"==typeof o.type?b(o,t,n):w(n,o,o,r,o.__e,t));return t}function w(e,t,n,o,r,i){var s,l,a;if(void 0!==t.__d)s=t.__d,t.__d=void 0;else if(null==n||r!=i||null==r.parentNode)e:if(null==i||i.parentNode!==e)e.appendChild(r),s=null;else{for(l=i,a=0;(l=l.nextSibling)&&a<o.length;a+=2)if(l==r)break e;e.insertBefore(r,i),s=i}return void 0!==s?s:r.nextSibling}function k(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]=null==n?"":"number"!=typeof n||a.test(t)?n:n+"px"}function x(e,t,n,o,r){var i;e:if("style"===t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof o&&(e.style.cssText=o=""),o)for(t in o)n&&t in n||k(e.style,t,"");if(n)for(t in n)o&&n[t]===o[t]||k(e.style,t,n[t])}else if("o"===t[0]&&"n"===t[1])i=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+i]=n,n?o||e.addEventListener(t,i?P:S,i):e.removeEventListener(t,i?P:S,i);else if("dangerouslySetInnerHTML"!==t){if(r)t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("href"!==t&&"list"!==t&&"form"!==t&&"tabIndex"!==t&&"download"!==t&&t in e)try{e[t]=null==n?"":n;break e}catch(e){}"function"==typeof n||(null!=n&&(!1!==n||"a"===t[0]&&"r"===t[1])?e.setAttribute(t,n):e.removeAttribute(t))}}function S(e){this.l[e.type+!1](t.event?t.event(e):e)}function P(e){this.l[e.type+!0](t.event?t.event(e):e)}function C(e,n,o,r,i,s,l,a,c){var d,f,h,m,v,y,b,w,k,x,S,P,C,O=n.type;if(void 0!==n.constructor)return null;null!=o.__h&&(c=o.__h,a=n.__e=o.__e,n.__h=null,s=[a]),(d=t.__b)&&d(n);try{e:if("function"==typeof O){if(w=n.props,k=(d=O.contextType)&&r[d.__c],x=d?k?k.props.value:d.__:r,o.__c?b=(f=n.__c=o.__c).__=f.__E:("prototype"in O&&O.prototype.render?n.__c=f=new O(w,x):(n.__c=f=new p(w,x),f.constructor=O,f.render=D),k&&k.sub(f),f.props=w,f.state||(f.state={}),f.context=x,f.__n=r,h=f.__d=!0,f.__h=[]),null==f.__s&&(f.__s=f.state),null!=O.getDerivedStateFromProps&&(f.__s==f.state&&(f.__s=u({},f.__s)),u(f.__s,O.getDerivedStateFromProps(w,f.__s))),m=f.props,v=f.state,h)null==O.getDerivedStateFromProps&&null!=f.componentWillMount&&f.componentWillMount(),null!=f.componentDidMount&&f.__h.push(f.componentDidMount);else{if(null==O.getDerivedStateFromProps&&w!==m&&null!=f.componentWillReceiveProps&&f.componentWillReceiveProps(w,x),!f.__e&&null!=f.shouldComponentUpdate&&!1===f.shouldComponentUpdate(w,f.__s,x)||n.__v===o.__v){f.props=w,f.state=f.__s,n.__v!==o.__v&&(f.__d=!1),f.__v=n,n.__e=o.__e,n.__k=o.__k,n.__k.forEach((function(e){e&&(e.__=n)})),f.__h.length&&l.push(f);break e}null!=f.componentWillUpdate&&f.componentWillUpdate(w,f.__s,x),null!=f.componentDidUpdate&&f.__h.push((function(){f.componentDidUpdate(m,v,y)}))}if(f.context=x,f.props=w,f.__v=n,f.__P=e,S=t.__r,P=0,"prototype"in O&&O.prototype.render)f.state=f.__s,f.__d=!1,S&&S(n),d=f.render(f.props,f.state,f.context);else do{f.__d=!1,S&&S(n),d=f.render(f.props,f.state,f.context),f.state=f.__s}while(f.__d&&++P<25);f.state=f.__s,null!=f.getChildContext&&(r=u(u({},r),f.getChildContext())),h||null==f.getSnapshotBeforeUpdate||(y=f.getSnapshotBeforeUpdate(m,v)),C=null!=d&&d.type===_&&null==d.key?d.props.children:d,g(e,Array.isArray(C)?C:[C],n,o,r,i,s,l,a,c),f.base=n.__e,n.__h=null,f.__h.length&&l.push(f),b&&(f.__E=f.__=null),f.__e=!1}else null==s&&n.__v===o.__v?(n.__k=o.__k,n.__e=o.__e):n.__e=E(o.__e,n,o,r,i,s,l,c);(d=t.diffed)&&d(n)}catch(e){n.__v=null,(c||null!=s)&&(n.__e=a,n.__h=!!c,s[s.indexOf(a)]=null),t.__e(e,n,o)}}function O(e,n){t.__c&&t.__c(n,e),e.some((function(n){try{e=n.__h,n.__h=[],e.some((function(e){e.call(n)}))}catch(e){t.__e(e,n.__v)}}))}function E(t,n,o,r,i,l,a,u){var d,f,_,p=o.props,m=n.props,v=n.type,y=0;if("svg"===v&&(i=!0),null!=l)for(;y<l.length;y++)if((d=l[y])&&"setAttribute"in d==!!v&&(v?d.localName===v:3===d.nodeType)){t=d,l[y]=null;break}if(null==t){if(null===v)return document.createTextNode(m);t=i?document.createElementNS("http://www.w3.org/2000/svg",v):document.createElement(v,m.is&&m),l=null,u=!1}if(null===v)p===m||u&&t.data===m||(t.data=m);else{if(l=l&&e.call(t.childNodes),f=(p=o.props||s).dangerouslySetInnerHTML,_=m.dangerouslySetInnerHTML,!u){if(null!=l)for(p={},y=0;y<t.attributes.length;y++)p[t.attributes[y].name]=t.attributes[y].value;(_||f)&&(_&&(f&&_.__html==f.__html||_.__html===t.innerHTML)||(t.innerHTML=_&&_.__html||""))}if(function(e,t,n,o,r){var i;for(i in n)"children"===i||"key"===i||i in t||x(e,i,null,n[i],o);for(i in t)r&&"function"!=typeof t[i]||"children"===i||"key"===i||"value"===i||"checked"===i||n[i]===t[i]||x(e,i,t[i],n[i],o)}(t,m,p,i,u),_)n.__k=[];else if(y=n.props.children,g(t,Array.isArray(y)?y:[y],n,o,r,i&&"foreignObject"!==v,l,a,l?l[0]:o.__k&&h(o,0),u),null!=l)for(y=l.length;y--;)null!=l[y]&&c(l[y]);u||("value"in m&&void 0!==(y=m.value)&&(y!==t.value||"progress"===v&&!y||"option"===v&&y!==p.value)&&x(t,"value",y,p.value,!1),"checked"in m&&void 0!==(y=m.checked)&&y!==t.checked&&x(t,"checked",y,p.checked,!1))}return t}function M(e,n,o){try{"function"==typeof e?e(n):e.current=n}catch(e){t.__e(e,o)}}function I(e,n,o){var r,i;if(t.unmount&&t.unmount(e),(r=e.ref)&&(r.current&&r.current!==e.__e||M(r,null,n)),null!=(r=e.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(e){t.__e(e,n)}r.base=r.__P=null}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&I(r[i],n,"function"!=typeof e.type);o||null==e.__e||c(e.__e),e.__e=e.__d=void 0}function D(e,t,n){return this.constructor(e,n)}function T(n,o,r){var i,l,a;t.__&&t.__(n,o),l=(i="function"==typeof r)?null:r&&r.__k||o.__k,a=[],C(o,n=(!i&&r||o).__k=d(_,null,[n]),l||s,s,void 0!==o.ownerSVGElement,!i&&r?[r]:l?null:o.firstChild?e.call(o.childNodes):null,a,!i&&r?r:l?l.__e:o.firstChild,i),O(a,n)}e=l.slice,t={__e:function(e,t,n,o){for(var r,i,s;t=t.__;)if((r=t.__c)&&!r.__)try{if((i=r.constructor)&&null!=i.getDerivedStateFromError&&(r.setState(i.getDerivedStateFromError(e)),s=r.__d),null!=r.componentDidCatch&&(r.componentDidCatch(e,o||{}),s=r.__d),s)return r.__E=r}catch(t){e=t}throw e}},n=0,p.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=u({},this.state),"function"==typeof e&&(e=e(u({},n),this.props)),e&&u(n,e),null!=e&&this.__v&&(t&&this.__h.push(t),v(this))},p.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),v(this))},p.prototype.render=_,o=[],r="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,y.__r=0;let j=0;const A=()=>""+ ++j,V=new Intl.Collator(void 0,{sensitivity:"base",numeric:!0}),F=e=>{if(!/^\d+\.\d+\.\d+$/.test(e))throw new Error(`Invalid version: ${e}.`);const[t,n,o]=e.split(".").map(Number);return[t,n,o]},H=(e,t)=>e-t,N=(e,t)=>H(e[0],t[0])||H(e[1],t[1])||H(e[2],t[2]),U="lastUpgraded";function L(e){var t,n,o="";if("string"==typeof e||"number"==typeof e)o+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=L(e[t]))&&(o&&(o+=" "),o+=n);else for(t in e)e[t]&&(o&&(o+=" "),o+=t);return o}const R=function(){for(var e,t,n=0,o="";n<arguments.length;)(e=arguments[n++])&&(t=L(e))&&(o&&(o+=" "),o+=t);return o};function $(e){for(var t=arguments.length,n=Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];throw Error("[Immer] minified error nr: "+e+(n.length?" "+n.map((function(e){return"'"+e+"'"})).join(","):"")+". Find the full error at: https://bit.ly/3cXEKWf")}function G(e){return!!e&&!!e[Oe]}function z(e){return!!e&&(function(e){if(!e||"object"!=typeof e)return!1;var t=Object.getPrototypeOf(e);if(null===t)return!0;var n=Object.hasOwnProperty.call(t,"constructor")&&t.constructor;return n===Object||"function"==typeof n&&Function.toString.call(n)===Ee}(e)||Array.isArray(e)||!!e[Ce]||!!e.constructor[Ce]||J(e)||X(e))}function W(e,t,n){void 0===n&&(n=!1),0===B(e)?(n?Object.keys:Me)(e).forEach((function(o){n&&"symbol"==typeof o||t(o,e[o],e)})):e.forEach((function(n,o){return t(o,n,e)}))}function B(e){var t=e[Oe];return t?t.i>3?t.i-4:t.i:Array.isArray(e)?1:J(e)?2:X(e)?3:0}function q(e,t){return 2===B(e)?e.has(t):Object.prototype.hasOwnProperty.call(e,t)}function K(e,t,n){var o=B(e);2===o?e.set(t,n):3===o?(e.delete(t),e.add(n)):e[t]=n}function J(e){return ke&&e instanceof Map}function X(e){return xe&&e instanceof Set}function Y(e){return e.o||e.t}function Z(e){if(Array.isArray(e))return Array.prototype.slice.call(e);var t=Ie(e);delete t[Oe];for(var n=Me(t),o=0;o<n.length;o++){var r=n[o],i=t[r];!1===i.writable&&(i.writable=!0,i.configurable=!0),(i.get||i.set)&&(t[r]={configurable:!0,writable:!0,enumerable:i.enumerable,value:e[r]})}return Object.create(Object.getPrototypeOf(e),t)}function Q(e,t){return void 0===t&&(t=!1),te(e)||G(e)||!z(e)||(B(e)>1&&(e.set=e.add=e.clear=e.delete=ee),Object.freeze(e),t&&W(e,(function(e,t){return Q(t,!0)}),!0)),e}function ee(){$(2)}function te(e){return null==e||"object"!=typeof e||Object.isFrozen(e)}function ne(e){var t=De[e];return t||$(18,e),t}function oe(){return be}function re(e,t){t&&(ne("Patches"),e.u=[],e.s=[],e.v=t)}function ie(e){se(e),e.p.forEach(ae),e.p=null}function se(e){e===be&&(be=e.l)}function le(e){return be={p:[],l:be,h:e,m:!0,_:0}}function ae(e){var t=e[Oe];0===t.i||1===t.i?t.j():t.O=!0}function ue(e,t){t._=t.p.length;var n=t.p[0],o=void 0!==e&&e!==n;return t.h.g||ne("ES5").S(t,e,o),o?(n[Oe].P&&(ie(t),$(4)),z(e)&&(e=ce(t,e),t.l||fe(t,e)),t.u&&ne("Patches").M(n[Oe].t,e,t.u,t.s)):e=ce(t,n,[]),ie(t),t.u&&t.v(t.u,t.s),e!==Pe?e:void 0}function ce(e,t,n){if(te(t))return t;var o=t[Oe];if(!o)return W(t,(function(r,i){return de(e,o,t,r,i,n)}),!0),t;if(o.A!==e)return t;if(!o.P)return fe(e,o.t,!0),o.t;if(!o.I){o.I=!0,o.A._--;var r=4===o.i||5===o.i?o.o=Z(o.k):o.o;W(3===o.i?new Set(r):r,(function(t,i){return de(e,o,r,t,i,n)})),fe(e,r,!1),n&&e.u&&ne("Patches").R(o,n,e.u,e.s)}return o.o}function de(e,t,n,o,r,i){if(G(r)){var s=ce(e,r,i&&t&&3!==t.i&&!q(t.D,o)?i.concat(o):void 0);if(K(n,o,s),!G(s))return;e.m=!1}if(z(r)&&!te(r)){if(!e.h.F&&e._<1)return;ce(e,r),t&&t.A.l||fe(e,r)}}function fe(e,t,n){void 0===n&&(n=!1),e.h.F&&e.m&&Q(t,n)}function _e(e,t){var n=e[Oe];return(n?Y(n):e)[t]}function pe(e,t){if(t in e)for(var n=Object.getPrototypeOf(e);n;){var o=Object.getOwnPropertyDescriptor(n,t);if(o)return o;n=Object.getPrototypeOf(n)}}function he(e){e.P||(e.P=!0,e.l&&he(e.l))}function me(e){e.o||(e.o=Z(e.t))}function ve(e,t,n){var o=J(t)?ne("MapSet").N(t,n):X(t)?ne("MapSet").T(t,n):e.g?function(e,t){var n=Array.isArray(e),o={i:n?1:0,A:t?t.A:oe(),P:!1,I:!1,D:{},l:t,t:e,k:null,o:null,j:null,C:!1},r=o,i=Te;n&&(r=[o],i=je);var s=Proxy.revocable(r,i),l=s.revoke,a=s.proxy;return o.k=a,o.j=l,a}(t,n):ne("ES5").J(t,n);return(n?n.A:oe()).p.push(o),o}function ye(e,t){switch(t){case 2:return new Map(e);case 3:return Array.from(e)}return Z(e)}var ge,be,we="undefined"!=typeof Symbol&&"symbol"==typeof Symbol("x"),ke="undefined"!=typeof Map,xe="undefined"!=typeof Set,Se="undefined"!=typeof Proxy&&void 0!==Proxy.revocable&&"undefined"!=typeof Reflect,Pe=we?Symbol.for("immer-nothing"):((ge={})["immer-nothing"]=!0,ge),Ce=we?Symbol.for("immer-draftable"):"__$immer_draftable",Oe=we?Symbol.for("immer-state"):"__$immer_state",Ee=("undefined"!=typeof Symbol&&Symbol.iterator,""+Object.prototype.constructor),Me="undefined"!=typeof Reflect&&Reflect.ownKeys?Reflect.ownKeys:void 0!==Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:Object.getOwnPropertyNames,Ie=Object.getOwnPropertyDescriptors||function(e){var t={};return Me(e).forEach((function(n){t[n]=Object.getOwnPropertyDescriptor(e,n)})),t},De={},Te={get:function(e,t){if(t===Oe)return e;var n=Y(e);if(!q(n,t))return function(e,t,n){var o,r=pe(t,n);return r?"value"in r?r.value:null===(o=r.get)||void 0===o?void 0:o.call(e.k):void 0}(e,n,t);var o=n[t];return e.I||!z(o)?o:o===_e(e.t,t)?(me(e),e.o[t]=ve(e.A.h,o,e)):o},has:function(e,t){return t in Y(e)},ownKeys:function(e){return Reflect.ownKeys(Y(e))},set:function(e,t,n){var o=pe(Y(e),t);if(null==o?void 0:o.set)return o.set.call(e.k,n),!0;if(!e.P){var r=_e(Y(e),t),i=null==r?void 0:r[Oe];if(i&&i.t===n)return e.o[t]=n,e.D[t]=!1,!0;if(function(e,t){return e===t?0!==e||1/e==1/t:e!=e&&t!=t}(n,r)&&(void 0!==n||q(e.t,t)))return!0;me(e),he(e)}return e.o[t]===n&&"number"!=typeof n&&(void 0!==n||t in e.o)||(e.o[t]=n,e.D[t]=!0,!0)},deleteProperty:function(e,t){return void 0!==_e(e.t,t)||t in e.t?(e.D[t]=!1,me(e),he(e)):delete e.D[t],e.o&&delete e.o[t],!0},getOwnPropertyDescriptor:function(e,t){var n=Y(e),o=Reflect.getOwnPropertyDescriptor(n,t);return o?{writable:!0,configurable:1!==e.i||"length"!==t,enumerable:o.enumerable,value:n[t]}:o},defineProperty:function(){$(11)},getPrototypeOf:function(e){return Object.getPrototypeOf(e.t)},setPrototypeOf:function(){$(12)}},je={};W(Te,(function(e,t){je[e]=function(){return arguments[0]=arguments[0][0],t.apply(this,arguments)}})),je.deleteProperty=function(e,t){return je.set.call(this,e,t,void 0)},je.set=function(e,t,n){return Te.set.call(this,e[0],t,n,e[0])};var Ae=function(){function e(e){var t=this;this.g=Se,this.F=!0,this.produce=function(e,n,o){if("function"==typeof e&&"function"!=typeof n){var r=n;n=e;var i=t;return function(e){var t=this;void 0===e&&(e=r);for(var o=arguments.length,s=Array(o>1?o-1:0),l=1;l<o;l++)s[l-1]=arguments[l];return i.produce(e,(function(e){var o;return(o=n).call.apply(o,[t,e].concat(s))}))}}var s;if("function"!=typeof n&&$(6),void 0!==o&&"function"!=typeof o&&$(7),z(e)){var l=le(t),a=ve(t,e,void 0),u=!0;try{s=n(a),u=!1}finally{u?ie(l):se(l)}return"undefined"!=typeof Promise&&s instanceof Promise?s.then((function(e){return re(l,o),ue(e,l)}),(function(e){throw ie(l),e})):(re(l,o),ue(s,l))}if(!e||"object"!=typeof e){if(void 0===(s=n(e))&&(s=e),s===Pe&&(s=void 0),t.F&&Q(s,!0),o){var c=[],d=[];ne("Patches").M(e,s,c,d),o(c,d)}return s}$(21,e)},this.produceWithPatches=function(e,n){if("function"==typeof e)return function(n){for(var o=arguments.length,r=Array(o>1?o-1:0),i=1;i<o;i++)r[i-1]=arguments[i];return t.produceWithPatches(n,(function(t){return e.apply(void 0,[t].concat(r))}))};var o,r,i=t.produce(e,n,(function(e,t){o=e,r=t}));return"undefined"!=typeof Promise&&i instanceof Promise?i.then((function(e){return[e,o,r]})):[i,o,r]},"boolean"==typeof(null==e?void 0:e.useProxies)&&this.setUseProxies(e.useProxies),"boolean"==typeof(null==e?void 0:e.autoFreeze)&&this.setAutoFreeze(e.autoFreeze)}var t=e.prototype;return t.createDraft=function(e){z(e)||$(8),G(e)&&(e=function(e){return G(e)||$(22,e),function e(t){if(!z(t))return t;var n,o=t[Oe],r=B(t);if(o){if(!o.P&&(o.i<4||!ne("ES5").K(o)))return o.t;o.I=!0,n=ye(t,r),o.I=!1}else n=ye(t,r);return W(n,(function(t,r){o&&function(e,t){return 2===B(e)?e.get(t):e[t]}(o.t,t)===r||K(n,t,e(r))})),3===r?new Set(n):n}(e)}(e));var t=le(this),n=ve(this,e,void 0);return n[Oe].C=!0,se(t),n},t.finishDraft=function(e,t){var n=(e&&e[Oe]).A;return re(n,t),ue(void 0,n)},t.setAutoFreeze=function(e){this.F=e},t.setUseProxies=function(e){e&&!Se&&$(20),this.g=e},t.applyPatches=function(e,t){var n;for(n=t.length-1;n>=0;n--){var o=t[n];if(0===o.path.length&&"replace"===o.op){e=o.value;break}}n>-1&&(t=t.slice(n+1));var r=ne("Patches").$;return G(e)?r(e,t):this.produce(e,(function(e){return r(e,t)}))},e}(),Ve=new Ae,Fe=Ve.produce;Ve.produceWithPatches.bind(Ve),Ve.setAutoFreeze.bind(Ve),Ve.setUseProxies.bind(Ve),Ve.applyPatches.bind(Ve),Ve.createDraft.bind(Ve),Ve.finishDraft.bind(Ve);const He=e=>[()=>GM_getValue(e),t=>{GM_setValue(e,t)},()=>{GM_deleteValue(e)}],[Ne,Ue,Le]=He("token"),[Re,$e,Ge]=He("username");class ze extends Error{constructor(){super("No credentials provided.")}}class We extends Error{constructor(){super("Invalid credentials.")}}class Be extends Error{constructor(e){super(`${e} not included`)}}class qe{static extend(e){return e(qe),qe}baseUrl="https://moodle.ksasz.ch";credentials={token:Ne(),username:Re()};#e=new Map;_readCache(e){return this.#e.get(e)}_writeCache(e,t){return this.#e.set(e,t),t}async login(e){const{credentials:t}=this;if(e&&(t.username=e.username,t.password=e.password,$e(e.username)),t.token)return t.token;const{username:n,password:o}=t;if(!n||!o)throw new ze;const r=new URLSearchParams({username:n,password:o,service:"moodle_mobile_app"}),i=await fetch(`${this.baseUrl}/login/token.php`,{method:"POST",body:r.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}});if(!i.ok)throw new Error(`Response was not ok: ${i.status}`);const s=await i.json();if("errorcode"in s)throw this.logout(),new We;const{token:l}=s;return Ue(l),t.token=l,l}logout(){delete this.credentials.token,Le(),delete this.credentials.password}async getCourses(e){throw new Be("getCourses")}async getUserId(){throw new Be("getUserId")}async popupLogin(e){throw new Be("popupLogin")}async getCourseContent(e,t){throw new Be("getCourseContent")}}const Ke=Symbol("getUserId");async function Je(){const e=this._readCache(Ke);if(void 0!==e)return e;const t=await this.login(),n=new URLSearchParams({wsfunction:"core_webservice_get_site_info",wstoken:t}),o=await fetch(`${this.baseUrl}/webservice/rest/server.php?moodlewsrestformat=json`,{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:n.toString()});if(!o.ok)throw new Error(`Response was not ok: ${o.status}`);const r=await o.json();if("exception"in r)throw this.logout(),new Error("token was undefined");return this._writeCache(Ke,r.userid)}const Xe=e=>{e.prototype.getUserId=Je},Ye=Symbol("getCourses");async function Ze(e=!1){const t=this._readCache(Ye);if(t&&!e)return t;const n=await this.getUserId(),o=await this.login(),r=new URLSearchParams({"requests[0][function]":"core_enrol_get_users_courses","requests[0][arguments]":JSON.stringify({userid:n,returnusercount:!1}),wstoken:o,wsfunction:"tool_mobile_call_external_functions",moodlewsrestformat:"json"}),i=await fetch(`${this.baseUrl}/webservice/rest/server.php`,{method:"POST",body:r.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}});if(!i.ok)throw new Error(`Response was not ok: ${i.status}`);const s=await i.json();if("exception"in s||s.responses[0].error)throw this.logout(),new Error("Token was invalid");const l=JSON.parse(s.responses[0].data),a=[];for(const{id:e,fullname:t}of l)a.push({id:e,name:t});return this._writeCache(Ye,a)}var Qe,et,tt,nt,ot=0,rt=[],it=[],st=t.__b,lt=t.__r,at=t.diffed,ut=t.__c,ct=t.unmount;function dt(e){return ot=5,function(e,n){var o=function(e,n){t.__h&&t.__h(et,e,ot||7),ot=0;var o=et.__H||(et.__H={__:[],__h:[]});return e>=o.__.length&&o.__.push({__V:it}),o.__[e]}(Qe++);return function(e,t){return!e||e.length!==t.length||t.some((function(t,n){return t!==e[n]}))}(o.__H,n)?(o.__V=e(),o.u=n,o.__h=e,o.__V):o.__}((function(){return{current:e}}),[])}function ft(){for(var e;e=rt.shift();)if(e.__P)try{e.__H.__h.forEach(pt),e.__H.__h.forEach(ht),e.__H.__h=[]}catch(n){e.__H.__h=[],t.__e(n,e.__v)}}t.__b=function(e){et=null,st&&st(e)},t.__r=function(e){lt&&lt(e),Qe=0;var t=(et=e.__c).__H;t&&(tt===et?(t.__h=[],et.__h=[],t.__.forEach((function(e){e.__V=it,e.u=void 0}))):(t.__h.forEach(pt),t.__h.forEach(ht),t.__h=[])),tt=et},t.diffed=function(e){at&&at(e);var n=e.__c;n&&n.__H&&(n.__H.__h.length&&(1!==rt.push(n)&&nt===t.requestAnimationFrame||((nt=t.requestAnimationFrame)||function(e){var t,n=function(){clearTimeout(o),_t&&cancelAnimationFrame(t),setTimeout(e)},o=setTimeout(n,100);_t&&(t=requestAnimationFrame(n))})(ft)),n.__H.__.forEach((function(e){e.u&&(e.__H=e.u),e.__V!==it&&(e.__=e.__V),e.u=void 0,e.__V=it}))),tt=et=null},t.__c=function(e,n){n.some((function(e){try{e.__h.forEach(pt),e.__h=e.__h.filter((function(e){return!e.__||ht(e)}))}catch(o){n.some((function(e){e.__h&&(e.__h=[])})),n=[],t.__e(o,e.__v)}})),ut&&ut(e,n)},t.unmount=function(e){ct&&ct(e);var n,o=e.__c;o&&o.__H&&(o.__H.__.forEach((function(e){try{pt(e)}catch(e){n=e}})),n&&t.__e(n,o.__v))};var _t="function"==typeof requestAnimationFrame;function pt(e){var t=et,n=e.__c;"function"==typeof n&&(e.__c=void 0,n()),et=t}function ht(e){var t=et;e.__c=e.__(),et=t}Symbol("getCourseContent");const mt=e=>d("svg",{...e,viewBox:"0 0 512 512"},d("path",{stroke:"currentColor","stroke-linecap":"round","stroke-width":"32",d:"M368 368 144 144m224 0L144 368"})),vt=e=>d("svg",{...e,viewBox:"0 0 512 512"},d("path",{fill:"currentColor",d:"M321.94 98 158.82 237.78a24 24 0 0 0 0 36.44L321.94 414c15.57 13.34 39.62 2.28 39.62-18.22v-279.6c0-20.5-24.05-31.56-39.62-18.18z"})),yt=e=>d("svg",{...e,viewBox:"0 0 512 512"},d("path",{fill:"currentColor",d:"m190.06 414 163.12-139.78a24 24 0 0 0 0-36.44L190.06 98c-15.57-13.34-39.62-2.28-39.62 18.22v279.6c0 20.5 24.05 31.56 39.62 18.18z"})),gt=e=>d("svg",{...e,viewBox:"0 0 512 512"},d("path",{stroke:"currentColor","stroke-linecap":"round","stroke-width":"32",d:"M256 112v288m144-144H112"})),bt=({handleClick:e,handleSave:t,day:n,saveButtonClass:o,resetSaveValidity:r})=>d(_,null,d("div",{class:"day-controls"},d("div",{class:"caret-back",onClick:()=>{e((n-1+5)%5)}},d(vt,null)),d("div",{class:"day-current-day"},(e=>{const t=["Monday","Tuesday","Wednesday","Thursday","Friday"][e];if(void 0===t)throw new Error(`n was out of range: ${e}`);return t})(n)),d("div",{class:"caret-forward",onClick:()=>{e((n+1)%5)}},d(yt,null))),d("button",{type:"button",class:R("save-button",o),onClick:t,onAnimationEnd:r},"Save")),wt=({loggedOut:e,cb:t})=>{const n=dt(null),o=dt(null);return e?d("div",{class:"login-popup"},d("form",{onSubmit:e=>{e.preventDefault();const r=n.current?.value.trim(),i=o.current?.value;void 0!==r&&void 0!==i&&t({username:r,password:i})}},d("div",{class:"card"},d("div",{class:"card-body"},d("h5",{class:"card-title"},"Login"),d("input",{ref:n,required:!0,placeholder:"Username",class:"input-group-text",defaultValue:Re()}),d("input",{ref:o,required:!0,placeholder:"Password",class:"input-group-text",type:"password"})),d("button",{type:"submit",class:"btn btn-primary"},"Login")))):null},kt=({courses:e,focusedElement:t,onClick:n})=>{if(void 0===t)return null;const{left:o,height:r,top:i}=t,s=t.inputText.trim().toLowerCase();return""===s?null:d("div",{class:"suggestions",style:{transform:`translate(${o}px, ${i+r}px)`}},((e,t)=>{const n=[],o=new RegExp(t,"i");for(const t of e)o.test(t.name)&&n.push({...t,index:t.name.search(o)});return n.sort(((e,t)=>e.index-t.index||V.compare(e.name,t.name)||Number(e.id)-Number(t.id)))})(e,s).map((({id:e,name:t})=>{const o=t.toLowerCase().indexOf(s),r=t.slice(0,o),i=t.slice(o+s.length),l=t.slice(o,o+s.length);return d("div",{key:e,class:"suggestion",onMouseDown:()=>{n(e)}},d("div",{class:"suggestion-name"},r,d("span",{class:"emphasised"},l),i),d("div",{class:"suggestion-id"},e))})))},xt=e=>{const t=e%60;return`${Math.floor(e/60)}:${`0${t}`.slice(-2)}`},St=/^([01]?\d|2[0-3]):([0-5]\d)$/,Pt=e=>{if(e=e.trim(),!St.test(e))return!1;const[t,n]=e.split(":");return 60*Number(t)+Number(n)},Ct=({time:e,class:t,onInput:n,index:o,...r})=>d("input",{...r,class:R("time-input",t,{"invalid-input":!1===Pt(e)}),value:e,onInput:n}),Ot=({row:e,index:t,onInput:n,deleteRow:o,handleFocus:r})=>{const{fromInvalid:i,from:s,toInvalid:l,to:a,content:u,id:c}=e,f=dt(null),_=dt(null);return d("div",{class:"table-row"},d("div",{class:"table-cell time"},d(Ct,{index:t,class:R("time-from",{"invalid-input":!0===i}),time:s.str,placeholder:"HH:mm",onInput:n("from",t)})," - ",d(Ct,{index:3,class:R("time-to",{"invalid-input":!0===l}),time:a.str,placeholder:"HH:mm",onInput:n("to",t)})),d("div",{class:"table-cell content"},d("input",{ref:_,value:u,placeholder:"Content",onInput:n("content",t),onFocus:r(f,_,t)}),d("hr",null),d("input",{ref:f,value:c,placeholder:"Course id",onInput:n("id",t),onFocus:r(f,_,t)})),d("div",{class:"table-cell remove-row",onClick:()=>{o(t)}},d(mt,null)))},Et=({rows:e,handleFocus:t,onInput:n,deleteRow:o})=>d("div",null,e?.map(((e,r)=>d(Ot,{key:e.key,row:e,index:r,handleFocus:t,deleteRow:o,onInput:n}))));qe.extend((e=>{e.prototype.getCourses=Ze,e.extend(Xe)}));const Mt=()=>{const e=((new Date).getDay()+6)%7;return e>4?0:e},It=()=>({key:A(),from:{num:0,str:xt(0)},to:{num:0,str:xt(0)},content:"",id:""}),Dt=()=>{const e=[],t=GM_getValue("days");for(let n=0;n<5;++n){const o=t?.[n];e[n]=o?o.map((({from:e,to:t,content:n,id:o})=>({key:A(),from:{str:xt(e),num:e},to:{str:xt(t),num:t},id:o??"",content:n??""}))):[{from:480,to:525},{from:525,to:570},{from:590,to:635},{from:640,to:685},{from:690,to:735},{from:735,to:790},{from:790,to:835},{from:835,to:880},{from:890,to:935},{from:935,to:975}].map((({from:e,to:t})=>({...It(),from:{num:e,str:xt(e)},to:{num:t,str:xt(t)}})))}return e};class Tt extends p{state={day:Mt(),loggedOut:!1,courses:[],focusedElement:void 0,tables:Dt(),saveValidity:void 0};moodle=new qe;render(){const{tryLogin:e,handleButtonNavigate:t,handleSave:n,deleteRow:o,handleTableInput:r,createRow:i,handleSuggestionsClick:s,resetSaveValidity:l,handleTableFocus:a}=this,{loggedOut:u,focusedElement:c,courses:f,day:p,tables:h,saveValidity:m}=this.state;return d(_,null,d(wt,{loggedOut:u,cb:e}),d("div",{class:"container"},d("div",{class:"table-center"},d("div",{class:"grid-buttons"},d(bt,{day:p,handleSave:n,handleClick:t,saveButtonClass:R({"save-successful":!0===m,"save-failed":!1===m}),resetSaveValidity:l})),d("div",{class:"main-table"},d(Et,{rows:h[p],deleteRow:o,handleFocus:a,onInput:r}),d("div",{class:"row-icon-add-row"},d("div",{class:"icon-add-row"},d(gt,{onClick:i})))))),d(kt,{focusedElement:c,courses:f,onClick:s}))}resetSaveValidity=()=>{this.setState({saveValidity:void 0})};validateOrder=()=>{let e=!0;return this.setState(Fe((t=>{const n=n=>{e&&(e=!1,t.day=n)};for(const[e,o]of t.tables.entries()){for(const e of o)delete e.fromInvalid,delete e.toInvalid;for(const[t,r]of o.entries()){const i=o[t+1],{from:s,to:l}=r;!1===Pt(s.str)&&(r.fromInvalid=!0,n(e)),!1===Pt(l.str)&&(r.toInvalid=!0,n(e)),s.num>=l.num&&(r.fromInvalid=!0,r.toInvalid=!0,n(e)),i&&i.from.num<l.num&&(r.toInvalid=!0,i.fromInvalid=!0,n(e))}}}))),e};handleSave=()=>{if(!this.validateOrder())return void this.setState({saveValidity:!1});this.setState({saveValidity:!0});const e=[];for(const t of this.state.tables){const n=[];e.push(n);for(const{from:e,to:o,content:r,id:i}of t)n.push({from:e.num,to:o.num,content:r||void 0,id:i||void 0})}GM_setValue("days",{...e})};handleTableFocus=(e,t,n)=>o=>{const r=e?.current,i=t?.current;if(!i||!r||void 0===n)return void this.setState({focusedElement:void 0});o.stopImmediatePropagation();const s=r.getBoundingClientRect(),l=r.ownerDocument.defaultView;if(!l)return void this.setState({focusedElement:void 0});const a=s.top+l.pageYOffset,u=s.left+l.pageXOffset,c=r.clientHeight,d=i.value.trim();this.setState({focusedElement:{top:a,left:u,height:c,inputText:d,index:n}})};handleSuggestionsClick=e=>{this.setState(Fe((t=>{if(!t.focusedElement)return;const n=t.tables[t.day]?.[t.focusedElement.index];n&&(n.id=e,t.focusedElement=void 0)})))};deleteRow=e=>{this.setState(Fe((t=>{t.tables[t.day]?.splice(e,1)})))};componentDidMount(){document.body.addEventListener("focusout",(()=>{this.setState({focusedElement:void 0})})),document.body.addEventListener("keydown",(e=>{"s"===e.key&&e.ctrlKey&&(e.preventDefault(),this.handleSave())})),this.tryLogin()}handleTableInput=(e,t)=>n=>{this.setState(Fe((o=>{const r=o.tables[o.day]?.[t];if(!r)return;const i=n.currentTarget.value,s=Pt(i);switch(e){case"from":delete r.fromInvalid,r.from.str=i,!1===s?r.fromInvalid=!0:r.from.num=s;break;case"to":delete r.toInvalid,r.to.str=i,!1===s?r.toInvalid=!0:r.to.num=s;break;case"content":r.content=i,o.focusedElement&&(o.focusedElement.inputText=i);break;case"id":r.id=i}}))),this.validateOrder()};createRow=()=>{this.setState(Fe((e=>{e.tables[e.day]?.push(It())})))};onLogin=async()=>{await this.fetchCourses()};logout=()=>{this.moodle.logout(),this.setState({loggedOut:!0})};tryLogin=e=>{this.setState({loggedOut:!1}),this.moodle.login(e).then(this.onLogin,this.logout)};fetchCourses=async()=>{let e;try{e=await this.moodle.getCourses()}catch{return void this.logout()}const t=e.map((({id:e,name:t})=>({id:String(e),name:t,key:A()})));this.setState({courses:t})};handleButtonNavigate=e=>{this.setState({day:e})}}const jt=()=>{const e=new Date;return 60*e.getHours()*60*1e3+60*e.getMinutes()*1e3+1e3*e.getSeconds()+e.getMilliseconds()},At=e=>{if(void 0===e)return;let t,n=(new Date).getDay(),o=1;for(;(!(t=e[`${n}`])||0===t.length)&&o<=7;)++n,n%=7,++o;if(o>7||!t)return;const r=new Date;return r.setDate(r.getDate()+o),r.setMilliseconds(0),r.setSeconds(0),r.setMinutes(0),r.setHours(0),r.getTime()-Date.now()};
// ==UserScript==
// @name      Moodle Timetable v5
// @version   1.2.1
// @author    lusc
// @updateURL https://git.io/JXzjr
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
(e=>{try{(e=>{const t=GM_getValue(U),n=void 0===t?[-1,-1,-1]:F(t),o=Object.entries(e).map((([e,t])=>[F(e),t])).sort((([e],[t])=>N(e,t)));for(const[e,t]of o)N(n,e)<0&&t();GM_setValue(U,GM_info.script.version)})(e)}catch(e){console.error("Upgrading threw %o. Failing silently.",e)}})({"1.2.0":()=>{GM_deleteValue("lastValidatedToken"),GM_deleteValue("password")}}),"https:"!==location.protocol&&(location.protocol="https:");const Vt=e=>Number.isInteger(Number(e))?`/course/view.php?id=${e}`:e,Ft=({values:e,isNow:t=!1})=>{const{from:n,to:o,id:r}=e,i=e.content??"Free lesson";return d("div",{class:"tt-tr"},d("div",{class:"tt-th"},t?"Now":"Next",void 0!==n&&void 0!==o&&` (${xt(n)} - ${xt(o)})`,":"),d("div",{class:"tt-td"},"string"==typeof r?d("a",{href:Vt(r),target:"_blank",rel:"noopener noreferrer"},i):i))};class Ht extends p{state={courses:[],timetableState:4};_timeoutId;setTimeout=e=>{this.clearTimeout(),void 0!==e&&(this._timeoutId=setTimeout((()=>{this.updateCourses(!0)}),e+200))};clearTimeout=()=>{void 0!==this._timeoutId&&clearTimeout(this._timeoutId)};updateCourses=e=>{if(this.clearTimeout(),(()=>{const e=GM_getValue("isHoliday");return"boolean"!=typeof e?(GM_setValue("isHoliday",!1),!1):e})())return void this.setState({timetableState:5});const{courses:t,state:n,timeToUpdate:o}=(e=>{const t=new Date,n=jt()/60/1e3,o=e?.[(t.getDay()+6)%7];if(void 0===o||0===o.length)return{state:3,timeToUpdate:At(e)};const r=o[0];if(r.from>n)return{state:0,courses:[void 0,r],timeToUpdate:60*r.from*1e3-jt()};let i,s=0;for(;(i=o[s])&&i.to<=n;)++s;if(void 0===i)return{state:1,timeToUpdate:At(e)};const l=60*i.to*1e3-jt();return{state:2,courses:[i,o[s+1]],timeToUpdate:l}})(GM_getValue("days"));if(this.setTimeout(o),(()=>{const e=(new Date).getDay();return 0!==e&&6!==e})()){if(this.setState({timetableState:n}),t){const[n]=t;this.setState({courses:t}),e&&n&&(e=>{const{id:t,content:n}=e;if(n){const e=4e3,o=GM_notification({text:n,title:"Now",image:"https://i.imgur.com/ZtPH8v7.png",timeout:e,onclick(){void 0!==t&&open(Vt(t))}});o&&setTimeout((()=>{o.remove()}),e)}})(n)}}else this.setState({timetableState:6})};componentDidMount(){this.updateCourses();const e=()=>{this.updateCourses()};GM_addValueChangeListener("days",e),GM_addValueChangeListener("isHoliday",e)}render(){const{timetableState:e,courses:t}=this.state,[n,o]=t;return d("div",null,d("div",{class:"mod-indent-outer w-100"},d("div",{class:"contentwithoutlink"},d("div",{class:"no-overflow"},d("hr",null),d("div",{class:"tt-body"},d("div",{class:"tt-title"},"Timetable"),4===e&&d("div",null,"Loading"),1===e&&d("div",null,"No school anymore"),6===e&&d("div",{class:"tt-title"},"Weekend"),5===e&&d("div",{class:"tt-title"},"Holiday"),3===e&&d("div",null,"Today's timetable is empty, you can update it ",d("a",{href:"/timetable/v5",rel:"noopener noreferrer",target:"_blank"},"here")),d("div",{class:"tt-table"},(0===e||2===e)&&d("div",{class:"tt-tbody"},d(Ft,{isNow:!0,values:n??{content:"No school"}}),d(Ft,{values:o??{content:"No school"}})))),d("hr",null)))))}}var Nt;Nt=/^\/timetable\/v5/i.test(location.pathname)?()=>{history.replaceState({},"","/timetable/v5");const{body:e,head:t}=document;for(;t.lastChild;)t.lastChild.remove();for(;e.lastChild;)e.lastChild.remove();document.title="Moodle timetable v5";const n=document.createElement("link");n.rel="shortcut icon",n.href="/theme/image.php/classic/theme/1620639422/favicon",t.append(n),GM_addStyle("@keyframes save-animation{0%{border-color:var(--color)}to{border-color:#30363d}}.suggestions{position:absolute;top:0;left:0;z-index:1;background-color:#202020;border:2px solid #30363d;border-radius:2px;padding:.75em 1em;max-width:calc(35% - 2.7em)}.suggestions .emphasised{font-weight:700}.suggestions:empty{display:none}.suggestions .suggestion{display:grid;width:100%;grid-template-columns:80% 20%;cursor:pointer}.suggestions .suggestion:hover{text-decoration:underline}.suggestion-name{padding:2px 4px}.suggestion-id{text-align:end}.login-popup{text-align:center;width:100%;height:100%;position:fixed;z-index:2;top:0;left:0;display:flex;align-items:center;justify-content:center}.login-popup .card{background-color:#202020;border:#30363d 2px solid;border-radius:2px;padding:.3em 1em}.login-popup button,.login-popup input{margin-top:5px;background:0 0;color:#f0f6fc;border:2px solid #30363d;border-radius:2px;padding:.2em 1.3em;font-size:90%}.login-popup input{display:block;cursor:text}.login-popup button{cursor:pointer}.grid-buttons{display:grid;grid-template-columns:1fr auto 1fr;justify-items:center;column-gap:5px;width:100%;margin-bottom:.3em;margin-top:.3em}.day-controls{display:flex;justify-content:space-evenly;align-items:center;grid-column-start:2;user-select:none;margin-right:1.5em}.day-current-day{min-width:13ch;text-align:center}.caret-back,.caret-forward{width:1.5em;height:1.5em;cursor:pointer}.save-button{cursor:pointer;justify-self:flex-end;background:0 0;color:#f0f6fc;border:2px solid #30363d;border-radius:2px;padding:.2em 1.3em;font-size:90%}*,::after,::before{box-sizing:border-box}blockquote,body,dd,dl,figure,h1,h2,h3,h4,p{margin:0}ol[role=list],ul[role=list]{list-style:none}html:focus-within{scroll-behavior:smooth}body{text-rendering:optimizeSpeed;line-height:1.5;padding-top:.3em;width:100%;min-height:100vh;font:20px sans-serif;color:#f0f6fc;background-color:#171717}a:not([class]){text-decoration-skip-ink:auto}img,picture{max-width:100%;display:block}button,input,select,textarea{font:inherit}@media (prefers-reduced-motion:reduce){html:focus-within{scroll-behavior:auto}*,::after,::before{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}.container,.table-center{display:flex;flex-direction:column;align-items:center}.table-center{width:70%}.main-table{width:100%;margin-top:.5em}.table-cell.remove-row{color:#f0f6fc}.table-row{display:flex;width:100%;margin-bottom:.3em}.table-cell{width:50%;padding:.3em 1em;box-sizing:border-box;border:2px solid #30363d}.table-cell input{border:0;background:0 0;outline:0;font:inherit;color:inherit}.table-cell input.invalid-input{color:#dc3545}.table-cell.content,.table-cell.time{justify-content:center;align-items:center}.table-cell.time{display:grid;grid-template-columns:1fr auto 1fr;border-top-left-radius:2px;border-bottom-left-radius:2px}.table-cell.content{border-top-right-radius:2px;border-bottom-right-radius:2px;display:flex;width:50%;flex-direction:column}.table-cell.content>*{width:100%}.table-cell.remove-row{width:1.5em;border:0;cursor:pointer;padding-left:0;padding-right:0;display:flex;align-items:center;justify-content:center}.time-input{margin-left:.5em;margin-right:.5em}.time-input.time-from{text-align:right}.time-input.time-to{text-align:left}.icon-add-row,.row-icon-add-row{display:flex;justify-content:center;align-items:center}.icon-add-row{height:1.5em;cursor:pointer;margin-right:1.5em;width:1.5em}.row-icon-add-row{width:100%;padding-bottom:1em}.save-failed,.save-successful{animation:3s ease-in-out save-animation}.save-failed{--color: #dc3545}.save-successful{--color: #198754}");const o=document.createElement("div");o.id="root",e.append(o),T(d(Tt,null),o)}:()=>{GM_registerMenuCommand("Open settings",(()=>{open("/timetable/v5","_blank")})),GM_registerMenuCommand("Toggle holiday",(()=>{GM_setValue("isHoliday",!GM_getValue("isHoliday"))})),GM_addStyle(".tt-title{font-weight:450;margin-bottom:10px}.tt-table,.tt-title{font-size:large}.tt-tr{display:flex}.tt-tr>*{flex:0 0 50%}.tt-th{font-weight:450}");const e=document.querySelector("#region-main-box ul.section");if(e){const t=document.createElement("li");t.id="module-timetable-v5",t.className="activity label modtype_label",e.prepend(t),T(d(Ht,null),t)}},"undefined"!=typeof document&&("complete"!==document.readyState&&"interactive"!==document.readyState?document.addEventListener("DOMContentLoaded",Nt):Nt())})();