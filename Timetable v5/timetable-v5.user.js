(()=>{"use strict";var e,t,n,o,r,i={},s=[],l=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function a(e,t){for(var n in t)e[n]=t[n];return e}function u(e){var t=e.parentNode;t&&t.removeChild(e)}function c(t,n,o){var r,i,s,l={};for(s in n)"key"==s?r=n[s]:"ref"==s?i=n[s]:l[s]=n[s];if(arguments.length>2&&(l.children=arguments.length>3?e.call(arguments,2):o),"function"==typeof t&&null!=t.defaultProps)for(s in t.defaultProps)void 0===l[s]&&(l[s]=t.defaultProps[s]);return d(t,l,r,i,null)}function d(e,o,r,i,s){var l={type:e,props:o,key:r,ref:i,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==s?++n:s};return null==s&&null!=t.vnode&&t.vnode(l),l}function f(e){return e.children}function _(e,t){this.props=e,this.context=t}function p(e,t){if(null==t)return e.__?p(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?p(e):null}function h(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return h(e)}}function m(e){(!e.__d&&(e.__d=!0)&&o.push(e)&&!v.__r++||r!==t.debounceRendering)&&((r=t.debounceRendering)||setTimeout)(v)}function v(){for(var e;v.__r=o.length;)e=o.sort((function(e,t){return e.__v.__b-t.__v.__b})),o=[],e.some((function(e){var t,n,o,r,i,s;e.__d&&(i=(r=(t=e).__v).__e,(s=t.__P)&&(n=[],(o=a({},r)).__v=r.__v+1,C(s,r,o,t.__n,void 0!==s.ownerSVGElement,null!=r.__h?[i]:null,n,null==i?p(r):i,r.__h),P(n,r),r.__e!=i&&h(r)))}))}function g(e,t,n,o,r,l,a,u,c,_){var h,m,v,g,w,k,x,S=o&&o.__k||s,P=S.length;for(n.__k=[],h=0;h<t.length;h++)if(null!=(g=n.__k[h]=null==(g=t[h])||"boolean"==typeof g?null:"string"==typeof g||"number"==typeof g||"bigint"==typeof g?d(null,g,null,null,g):Array.isArray(g)?d(f,{children:g},null,null,null):g.__b>0?d(g.type,g.props,g.key,g.ref?g.ref:null,g.__v):g)){if(g.__=n,g.__b=n.__b+1,null===(v=S[h])||v&&g.key==v.key&&g.type===v.type)S[h]=void 0;else for(m=0;m<P;m++){if((v=S[m])&&g.key==v.key&&g.type===v.type){S[m]=void 0;break}v=null}C(e,g,v=v||i,r,l,a,u,c,_),w=g.__e,(m=g.ref)&&v.ref!=m&&(x||(x=[]),v.ref&&x.push(v.ref,null,g),x.push(m,g.__c||w,g)),null!=w?(null==k&&(k=w),"function"==typeof g.type&&g.__k===v.__k?g.__d=c=y(g,c,e):c=b(e,g,v,S,w,c),"function"==typeof n.type&&(n.__d=c)):c&&v.__e==c&&c.parentNode!=e&&(c=p(v))}for(n.__e=k,h=P;h--;)null!=S[h]&&M(S[h],S[h]);if(x)for(h=0;h<x.length;h++)E(x[h],x[++h],x[++h])}function y(e,t,n){for(var o,r=e.__k,i=0;r&&i<r.length;i++)(o=r[i])&&(o.__=e,t="function"==typeof o.type?y(o,t,n):b(n,o,o,r,o.__e,t));return t}function b(e,t,n,o,r,i){var s,l,a;if(void 0!==t.__d)s=t.__d,t.__d=void 0;else if(null==n||r!=i||null==r.parentNode)e:if(null==i||i.parentNode!==e)e.appendChild(r),s=null;else{for(l=i,a=0;(l=l.nextSibling)&&a<o.length;a+=2)if(l==r)break e;e.insertBefore(r,i),s=i}return void 0!==s?s:r.nextSibling}function w(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]=null==n?"":"number"!=typeof n||l.test(t)?n:n+"px"}function k(e,t,n,o,r){var i;e:if("style"===t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof o&&(e.style.cssText=o=""),o)for(t in o)n&&t in n||w(e.style,t,"");if(n)for(t in n)o&&n[t]===o[t]||w(e.style,t,n[t])}else if("o"===t[0]&&"n"===t[1])i=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+i]=n,n?o||e.addEventListener(t,i?S:x,i):e.removeEventListener(t,i?S:x,i);else if("dangerouslySetInnerHTML"!==t){if(r)t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("href"!==t&&"list"!==t&&"form"!==t&&"tabIndex"!==t&&"download"!==t&&t in e)try{e[t]=null==n?"":n;break e}catch(e){}"function"==typeof n||(null==n||!1===n&&-1==t.indexOf("-")?e.removeAttribute(t):e.setAttribute(t,n))}}function x(e){this.l[e.type+!1](t.event?t.event(e):e)}function S(e){this.l[e.type+!0](t.event?t.event(e):e)}function C(e,n,o,r,i,s,l,u,c){var d,p,h,m,v,y,b,w,k,x,S,C,P,E,M,D=n.type;if(void 0!==n.constructor)return null;null!=o.__h&&(c=o.__h,u=n.__e=o.__e,n.__h=null,s=[u]),(d=t.__b)&&d(n);try{e:if("function"==typeof D){if(w=n.props,k=(d=D.contextType)&&r[d.__c],x=d?k?k.props.value:d.__:r,o.__c?b=(p=n.__c=o.__c).__=p.__E:("prototype"in D&&D.prototype.render?n.__c=p=new D(w,x):(n.__c=p=new _(w,x),p.constructor=D,p.render=I),k&&k.sub(p),p.props=w,p.state||(p.state={}),p.context=x,p.__n=r,h=p.__d=!0,p.__h=[],p._sb=[]),null==p.__s&&(p.__s=p.state),null!=D.getDerivedStateFromProps&&(p.__s==p.state&&(p.__s=a({},p.__s)),a(p.__s,D.getDerivedStateFromProps(w,p.__s))),m=p.props,v=p.state,h)null==D.getDerivedStateFromProps&&null!=p.componentWillMount&&p.componentWillMount(),null!=p.componentDidMount&&p.__h.push(p.componentDidMount);else{if(null==D.getDerivedStateFromProps&&w!==m&&null!=p.componentWillReceiveProps&&p.componentWillReceiveProps(w,x),!p.__e&&null!=p.shouldComponentUpdate&&!1===p.shouldComponentUpdate(w,p.__s,x)||n.__v===o.__v){for(p.props=w,p.state=p.__s,n.__v!==o.__v&&(p.__d=!1),p.__v=n,n.__e=o.__e,n.__k=o.__k,n.__k.forEach((function(e){e&&(e.__=n)})),S=0;S<p._sb.length;S++)p.__h.push(p._sb[S]);p._sb=[],p.__h.length&&l.push(p);break e}null!=p.componentWillUpdate&&p.componentWillUpdate(w,p.__s,x),null!=p.componentDidUpdate&&p.__h.push((function(){p.componentDidUpdate(m,v,y)}))}if(p.context=x,p.props=w,p.__v=n,p.__P=e,C=t.__r,P=0,"prototype"in D&&D.prototype.render){for(p.state=p.__s,p.__d=!1,C&&C(n),d=p.render(p.props,p.state,p.context),E=0;E<p._sb.length;E++)p.__h.push(p._sb[E]);p._sb=[]}else do{p.__d=!1,C&&C(n),d=p.render(p.props,p.state,p.context),p.state=p.__s}while(p.__d&&++P<25);p.state=p.__s,null!=p.getChildContext&&(r=a(a({},r),p.getChildContext())),h||null==p.getSnapshotBeforeUpdate||(y=p.getSnapshotBeforeUpdate(m,v)),M=null!=d&&d.type===f&&null==d.key?d.props.children:d,g(e,Array.isArray(M)?M:[M],n,o,r,i,s,l,u,c),p.base=n.__e,n.__h=null,p.__h.length&&l.push(p),b&&(p.__E=p.__=null),p.__e=!1}else null==s&&n.__v===o.__v?(n.__k=o.__k,n.__e=o.__e):n.__e=O(o.__e,n,o,r,i,s,l,c);(d=t.diffed)&&d(n)}catch(e){n.__v=null,(c||null!=s)&&(n.__e=u,n.__h=!!c,s[s.indexOf(u)]=null),t.__e(e,n,o)}}function P(e,n){t.__c&&t.__c(n,e),e.some((function(n){try{e=n.__h,n.__h=[],e.some((function(e){e.call(n)}))}catch(e){t.__e(e,n.__v)}}))}function O(t,n,o,r,s,l,a,c){var d,f,_,h=o.props,m=n.props,v=n.type,y=0;if("svg"===v&&(s=!0),null!=l)for(;y<l.length;y++)if((d=l[y])&&"setAttribute"in d==!!v&&(v?d.localName===v:3===d.nodeType)){t=d,l[y]=null;break}if(null==t){if(null===v)return document.createTextNode(m);t=s?document.createElementNS("http://www.w3.org/2000/svg",v):document.createElement(v,m.is&&m),l=null,c=!1}if(null===v)h===m||c&&t.data===m||(t.data=m);else{if(l=l&&e.call(t.childNodes),f=(h=o.props||i).dangerouslySetInnerHTML,_=m.dangerouslySetInnerHTML,!c){if(null!=l)for(h={},y=0;y<t.attributes.length;y++)h[t.attributes[y].name]=t.attributes[y].value;(_||f)&&(_&&(f&&_.__html==f.__html||_.__html===t.innerHTML)||(t.innerHTML=_&&_.__html||""))}if(function(e,t,n,o,r){var i;for(i in n)"children"===i||"key"===i||i in t||k(e,i,null,n[i],o);for(i in t)r&&"function"!=typeof t[i]||"children"===i||"key"===i||"value"===i||"checked"===i||n[i]===t[i]||k(e,i,t[i],n[i],o)}(t,m,h,s,c),_)n.__k=[];else if(y=n.props.children,g(t,Array.isArray(y)?y:[y],n,o,r,s&&"foreignObject"!==v,l,a,l?l[0]:o.__k&&p(o,0),c),null!=l)for(y=l.length;y--;)null!=l[y]&&u(l[y]);c||("value"in m&&void 0!==(y=m.value)&&(y!==t.value||"progress"===v&&!y||"option"===v&&y!==h.value)&&k(t,"value",y,h.value,!1),"checked"in m&&void 0!==(y=m.checked)&&y!==t.checked&&k(t,"checked",y,h.checked,!1))}return t}function E(e,n,o){try{"function"==typeof e?e(n):e.current=n}catch(e){t.__e(e,o)}}function M(e,n,o){var r,i;if(t.unmount&&t.unmount(e),(r=e.ref)&&(r.current&&r.current!==e.__e||E(r,null,n)),null!=(r=e.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(e){t.__e(e,n)}r.base=r.__P=null,e.__c=void 0}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&M(r[i],n,o||"function"!=typeof e.type);o||null==e.__e||u(e.__e),e.__=e.__e=e.__d=void 0}function I(e,t,n){return this.constructor(e,n)}function D(n,o,r){var s,l,a;t.__&&t.__(n,o),l=(s="function"==typeof r)?null:r&&r.__k||o.__k,a=[],C(o,n=(!s&&r||o).__k=c(f,null,[n]),l||i,i,void 0!==o.ownerSVGElement,!s&&r?[r]:l?null:o.firstChild?e.call(o.childNodes):null,a,!s&&r?r:l?l.__e:o.firstChild,s),P(a,n)}e=s.slice,t={__e:function(e,t,n,o){for(var r,i,s;t=t.__;)if((r=t.__c)&&!r.__)try{if((i=r.constructor)&&null!=i.getDerivedStateFromError&&(r.setState(i.getDerivedStateFromError(e)),s=r.__d),null!=r.componentDidCatch&&(r.componentDidCatch(e,o||{}),s=r.__d),s)return r.__E=r}catch(t){e=t}throw e}},n=0,_.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=a({},this.state),"function"==typeof e&&(e=e(a({},n),this.props)),e&&a(n,e),null!=e&&this.__v&&(t&&this._sb.push(t),m(this))},_.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),m(this))},_.prototype.render=f,o=[],v.__r=0;const T=new Intl.Collator(void 0,{sensitivity:"base",numeric:!0});let j=0;const A=()=>""+ ++j,H=e=>{if(!/^\d+\.\d+\.\d+$/.test(e))throw new Error(`Invalid version: ${e}.`);const[t,n,o]=e.split(".").map(Number);return[t,n,o]},N=(e,t)=>e-t,V=(e,t)=>N(e[0],t[0])||N(e[1],t[1])||N(e[2],t[2]),F="lastUpgraded";function L(e){for(var t=arguments.length,n=Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];throw Error("[Immer] minified error nr: "+e+(n.length?" "+n.map((function(e){return"'"+e+"'"})).join(","):"")+". Find the full error at: https://bit.ly/3cXEKWf")}function U(e){return!!e&&!!e[Pe]}function R(e){var t;return!!e&&(function(e){if(!e||"object"!=typeof e)return!1;var t=Object.getPrototypeOf(e);if(null===t)return!0;var n=Object.hasOwnProperty.call(t,"constructor")&&t.constructor;return n===Object||"function"==typeof n&&Function.toString.call(n)===Oe}(e)||Array.isArray(e)||!!e[Ce]||!!(null===(t=e.constructor)||void 0===t?void 0:t[Ce])||K(e)||J(e))}function $(e,t,n){void 0===n&&(n=!1),0===G(e)?(n?Object.keys:Ee)(e).forEach((function(o){n&&"symbol"==typeof o||t(o,e[o],e)})):e.forEach((function(n,o){return t(o,n,e)}))}function G(e){var t=e[Pe];return t?t.i>3?t.i-4:t.i:Array.isArray(e)?1:K(e)?2:J(e)?3:0}function z(e,t){return 2===G(e)?e.has(t):Object.prototype.hasOwnProperty.call(e,t)}function W(e,t){return 2===G(e)?e.get(t):e[t]}function B(e,t,n){var o=G(e);2===o?e.set(t,n):3===o?(e.delete(t),e.add(n)):e[t]=n}function q(e,t){return e===t?0!==e||1/e==1/t:e!=e&&t!=t}function K(e){return we&&e instanceof Map}function J(e){return ke&&e instanceof Set}function X(e){return e.o||e.t}function Y(e){if(Array.isArray(e))return Array.prototype.slice.call(e);var t=Me(e);delete t[Pe];for(var n=Ee(t),o=0;o<n.length;o++){var r=n[o],i=t[r];!1===i.writable&&(i.writable=!0,i.configurable=!0),(i.get||i.set)&&(t[r]={configurable:!0,writable:!0,enumerable:i.enumerable,value:e[r]})}return Object.create(Object.getPrototypeOf(e),t)}function Z(e,t){return void 0===t&&(t=!1),ee(e)||U(e)||!R(e)||(G(e)>1&&(e.set=e.add=e.clear=e.delete=Q),Object.freeze(e),t&&$(e,(function(e,t){return Z(t,!0)}),!0)),e}function Q(){L(2)}function ee(e){return null==e||"object"!=typeof e||Object.isFrozen(e)}function te(e){var t=Ie[e];return t||L(18,e),t}function ne(){return ye}function oe(e,t){t&&(te("Patches"),e.u=[],e.s=[],e.v=t)}function re(e){ie(e),e.p.forEach(le),e.p=null}function ie(e){e===ye&&(ye=e.l)}function se(e){return ye={p:[],l:ye,h:e,m:!0,_:0}}function le(e){var t=e[Pe];0===t.i||1===t.i?t.j():t.O=!0}function ae(e,t){t._=t.p.length;var n=t.p[0],o=void 0!==e&&e!==n;return t.h.g||te("ES5").S(t,e,o),o?(n[Pe].P&&(re(t),L(4)),R(e)&&(e=ue(t,e),t.l||de(t,e)),t.u&&te("Patches").M(n[Pe].t,e,t.u,t.s)):e=ue(t,n,[]),re(t),t.u&&t.v(t.u,t.s),e!==Se?e:void 0}function ue(e,t,n){if(ee(t))return t;var o=t[Pe];if(!o)return $(t,(function(r,i){return ce(e,o,t,r,i,n)}),!0),t;if(o.A!==e)return t;if(!o.P)return de(e,o.t,!0),o.t;if(!o.I){o.I=!0,o.A._--;var r=4===o.i||5===o.i?o.o=Y(o.k):o.o;$(3===o.i?new Set(r):r,(function(t,i){return ce(e,o,r,t,i,n)})),de(e,r,!1),n&&e.u&&te("Patches").R(o,n,e.u,e.s)}return o.o}function ce(e,t,n,o,r,i){if(U(r)){var s=ue(e,r,i&&t&&3!==t.i&&!z(t.D,o)?i.concat(o):void 0);if(B(n,o,s),!U(s))return;e.m=!1}if(R(r)&&!ee(r)){if(!e.h.F&&e._<1)return;ue(e,r),t&&t.A.l||de(e,r)}}function de(e,t,n){void 0===n&&(n=!1),e.h.F&&e.m&&Z(t,n)}function fe(e,t){var n=e[Pe];return(n?X(n):e)[t]}function _e(e,t){if(t in e)for(var n=Object.getPrototypeOf(e);n;){var o=Object.getOwnPropertyDescriptor(n,t);if(o)return o;n=Object.getPrototypeOf(n)}}function pe(e){e.P||(e.P=!0,e.l&&pe(e.l))}function he(e){e.o||(e.o=Y(e.t))}function me(e,t,n){var o=K(t)?te("MapSet").N(t,n):J(t)?te("MapSet").T(t,n):e.g?function(e,t){var n=Array.isArray(e),o={i:n?1:0,A:t?t.A:ne(),P:!1,I:!1,D:{},l:t,t:e,k:null,o:null,j:null,C:!1},r=o,i=De;n&&(r=[o],i=Te);var s=Proxy.revocable(r,i),l=s.revoke,a=s.proxy;return o.k=a,o.j=l,a}(t,n):te("ES5").J(t,n);return(n?n.A:ne()).p.push(o),o}function ve(e,t){switch(t){case 2:return new Map(e);case 3:return Array.from(e)}return Y(e)}var ge,ye,be="undefined"!=typeof Symbol&&"symbol"==typeof Symbol("x"),we="undefined"!=typeof Map,ke="undefined"!=typeof Set,xe="undefined"!=typeof Proxy&&void 0!==Proxy.revocable&&"undefined"!=typeof Reflect,Se=be?Symbol.for("immer-nothing"):((ge={})["immer-nothing"]=!0,ge),Ce=be?Symbol.for("immer-draftable"):"__$immer_draftable",Pe=be?Symbol.for("immer-state"):"__$immer_state",Oe=("undefined"!=typeof Symbol&&Symbol.iterator,""+Object.prototype.constructor),Ee="undefined"!=typeof Reflect&&Reflect.ownKeys?Reflect.ownKeys:void 0!==Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:Object.getOwnPropertyNames,Me=Object.getOwnPropertyDescriptors||function(e){var t={};return Ee(e).forEach((function(n){t[n]=Object.getOwnPropertyDescriptor(e,n)})),t},Ie={},De={get:function(e,t){if(t===Pe)return e;var n=X(e);if(!z(n,t))return function(e,t,n){var o,r=_e(t,n);return r?"value"in r?r.value:null===(o=r.get)||void 0===o?void 0:o.call(e.k):void 0}(e,n,t);var o=n[t];return e.I||!R(o)?o:o===fe(e.t,t)?(he(e),e.o[t]=me(e.A.h,o,e)):o},has:function(e,t){return t in X(e)},ownKeys:function(e){return Reflect.ownKeys(X(e))},set:function(e,t,n){var o=_e(X(e),t);if(null==o?void 0:o.set)return o.set.call(e.k,n),!0;if(!e.P){var r=fe(X(e),t),i=null==r?void 0:r[Pe];if(i&&i.t===n)return e.o[t]=n,e.D[t]=!1,!0;if(q(n,r)&&(void 0!==n||z(e.t,t)))return!0;he(e),pe(e)}return e.o[t]===n&&"number"!=typeof n&&(void 0!==n||t in e.o)||(e.o[t]=n,e.D[t]=!0,!0)},deleteProperty:function(e,t){return void 0!==fe(e.t,t)||t in e.t?(e.D[t]=!1,he(e),pe(e)):delete e.D[t],e.o&&delete e.o[t],!0},getOwnPropertyDescriptor:function(e,t){var n=X(e),o=Reflect.getOwnPropertyDescriptor(n,t);return o?{writable:!0,configurable:1!==e.i||"length"!==t,enumerable:o.enumerable,value:n[t]}:o},defineProperty:function(){L(11)},getPrototypeOf:function(e){return Object.getPrototypeOf(e.t)},setPrototypeOf:function(){L(12)}},Te={};$(De,(function(e,t){Te[e]=function(){return arguments[0]=arguments[0][0],t.apply(this,arguments)}})),Te.deleteProperty=function(e,t){return Te.set.call(this,e,t,void 0)},Te.set=function(e,t,n){return De.set.call(this,e[0],t,n,e[0])};var je=function(){function e(e){var t=this;this.g=xe,this.F=!0,this.produce=function(e,n,o){if("function"==typeof e&&"function"!=typeof n){var r=n;n=e;var i=t;return function(e){var t=this;void 0===e&&(e=r);for(var o=arguments.length,s=Array(o>1?o-1:0),l=1;l<o;l++)s[l-1]=arguments[l];return i.produce(e,(function(e){var o;return(o=n).call.apply(o,[t,e].concat(s))}))}}var s;if("function"!=typeof n&&L(6),void 0!==o&&"function"!=typeof o&&L(7),R(e)){var l=se(t),a=me(t,e,void 0),u=!0;try{s=n(a),u=!1}finally{u?re(l):ie(l)}return"undefined"!=typeof Promise&&s instanceof Promise?s.then((function(e){return oe(l,o),ae(e,l)}),(function(e){throw re(l),e})):(oe(l,o),ae(s,l))}if(!e||"object"!=typeof e){if(void 0===(s=n(e))&&(s=e),s===Se&&(s=void 0),t.F&&Z(s,!0),o){var c=[],d=[];te("Patches").M(e,s,c,d),o(c,d)}return s}L(21,e)},this.produceWithPatches=function(e,n){if("function"==typeof e)return function(n){for(var o=arguments.length,r=Array(o>1?o-1:0),i=1;i<o;i++)r[i-1]=arguments[i];return t.produceWithPatches(n,(function(t){return e.apply(void 0,[t].concat(r))}))};var o,r,i=t.produce(e,n,(function(e,t){o=e,r=t}));return"undefined"!=typeof Promise&&i instanceof Promise?i.then((function(e){return[e,o,r]})):[i,o,r]},"boolean"==typeof(null==e?void 0:e.useProxies)&&this.setUseProxies(e.useProxies),"boolean"==typeof(null==e?void 0:e.autoFreeze)&&this.setAutoFreeze(e.autoFreeze)}var t=e.prototype;return t.createDraft=function(e){R(e)||L(8),U(e)&&(e=function(e){return U(e)||L(22,e),function e(t){if(!R(t))return t;var n,o=t[Pe],r=G(t);if(o){if(!o.P&&(o.i<4||!te("ES5").K(o)))return o.t;o.I=!0,n=ve(t,r),o.I=!1}else n=ve(t,r);return $(n,(function(t,r){o&&W(o.t,t)===r||B(n,t,e(r))})),3===r?new Set(n):n}(e)}(e));var t=se(this),n=me(this,e,void 0);return n[Pe].C=!0,ie(t),n},t.finishDraft=function(e,t){var n=(e&&e[Pe]).A;return oe(n,t),ae(void 0,n)},t.setAutoFreeze=function(e){this.F=e},t.setUseProxies=function(e){e&&!xe&&L(20),this.g=e},t.applyPatches=function(e,t){var n;for(n=t.length-1;n>=0;n--){var o=t[n];if(0===o.path.length&&"replace"===o.op){e=o.value;break}}n>-1&&(t=t.slice(n+1));var r=te("Patches").$;return U(e)?r(e,t):this.produce(e,(function(e){return r(e,t)}))},e}(),Ae=new je,He=Ae.produce;Ae.produceWithPatches.bind(Ae),Ae.setAutoFreeze.bind(Ae),Ae.setUseProxies.bind(Ae),Ae.applyPatches.bind(Ae),Ae.createDraft.bind(Ae),Ae.finishDraft.bind(Ae);const Ne=e=>[()=>GM_getValue(e),t=>{GM_setValue(e,t)},()=>{GM_deleteValue(e)}],[Ve,Fe,Le]=Ne("token"),[Ue,Re,$e]=Ne("username");Symbol("getCourseContent");const Ge=Symbol("getUserId");async function ze(){const e=this._readCache(Ge);if(void 0!==e)return e;const t=await this.login(),n=new URLSearchParams({wsfunction:"core_webservice_get_site_info",wstoken:t}),o=await fetch(`${this.baseUrl}/webservice/rest/server.php?moodlewsrestformat=json`,{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:n.toString()});if(!o.ok)throw new Error(`Response was not ok: ${o.status}`);const r=await o.json();if("exception"in r)throw this.logout(),new Error("token was undefined");return this._writeCache(Ge,r.userid)}const We=e=>{e.prototype.getUserId=ze},Be=Symbol("getCourses");async function qe(e=!1){const t=this._readCache(Be);if(t&&!e)return t;const n=await this.getUserId(),o=await this.login(),r=new URLSearchParams({"requests[0][function]":"core_enrol_get_users_courses","requests[0][arguments]":JSON.stringify({userid:n,returnusercount:!1}),wstoken:o,wsfunction:"tool_mobile_call_external_functions",moodlewsrestformat:"json"}),i=await fetch(`${this.baseUrl}/webservice/rest/server.php`,{method:"POST",body:r.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}});if(!i.ok)throw new Error(`Response was not ok: ${i.status}`);const s=await i.json();if("exception"in s||s.responses[0].error)throw this.logout(),new Error("Token was invalid");const l=JSON.parse(s.responses[0].data),a=[];for(const{id:e,fullname:t}of l)a.push({id:e,name:t});return this._writeCache(Be,a)}class Ke extends Error{constructor(){super("No credentials provided.")}}class Je extends Error{constructor(){super("Invalid credentials.")}}class Xe extends Error{constructor(e){super(`${e} not included`)}}class Ye{static extend(e){return e(Ye),Ye}baseUrl="https://moodle.ksasz.ch";credentials={token:Ve(),username:Ue()};#e=new Map;_readCache(e){return this.#e.get(e)}_writeCache(e,t){return this.#e.set(e,t),t}async login(e){const{credentials:t}=this;if(e&&(t.username=e.username,t.password=e.password,Re(e.username)),t.token)return t.token;const{username:n,password:o}=t;if(!n||!o)throw new Ke;const r=new URLSearchParams({username:n,password:o,service:"moodle_mobile_app"}),i=await fetch(`${this.baseUrl}/login/token.php`,{method:"POST",body:r.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}});if(!i.ok)throw new Error(`Response was not ok: ${i.status}`);const s=await i.json();if("errorcode"in s)throw this.logout(),new Je;const{token:l}=s;return Fe(l),t.token=l,l}logout(){delete this.credentials.token,Le(),delete this.credentials.password}async getCourses(e){throw new Xe("getCourses")}async getUserId(){throw new Xe("getUserId")}async popupLogin(e){throw new Xe("popupLogin")}async getCourseContent(e,t){throw new Xe("getCourseContent")}}var Ze,Qe,et,tt,nt=0,ot=[],rt=[],it=t.__b,st=t.__r,lt=t.diffed,at=t.__c,ut=t.unmount;function ct(e,n){t.__h&&t.__h(Qe,e,nt||n),nt=0;var o=Qe.__H||(Qe.__H={__:[],__h:[]});return e>=o.__.length&&o.__.push({__V:rt}),o.__[e]}function dt(e){return nt=5,ft((function(){return{current:e}}),[])}function ft(e,t){var n=ct(Ze++,7);return gt(n.__H,t)?(n.__V=e(),n.i=t,n.__h=e,n.__V):n.__}function _t(){for(var e;e=ot.shift();)if(e.__P&&e.__H)try{e.__H.__h.forEach(mt),e.__H.__h.forEach(vt),e.__H.__h=[]}catch(n){e.__H.__h=[],t.__e(n,e.__v)}}t.__b=function(e){"function"!=typeof e.type||e.__m||null===e.__?e.__m||(e.__m=e.__&&e.__.__m?e.__.__m:""):e.__m=(e.__&&e.__.__m?e.__.__m:"")+(e.__&&e.__.__k?e.__.__k.indexOf(e):0),Qe=null,it&&it(e)},t.__r=function(e){st&&st(e),Ze=0;var t=(Qe=e.__c).__H;t&&(et===Qe?(t.__h=[],Qe.__h=[],t.__.forEach((function(e){e.__N&&(e.__=e.__N),e.__V=rt,e.__N=e.i=void 0}))):(t.__h.forEach(mt),t.__h.forEach(vt),t.__h=[])),et=Qe},t.diffed=function(e){lt&&lt(e);var n=e.__c;n&&n.__H&&(n.__H.__h.length&&(1!==ot.push(n)&&tt===t.requestAnimationFrame||((tt=t.requestAnimationFrame)||ht)(_t)),n.__H.__.forEach((function(e){e.i&&(e.__H=e.i),e.__V!==rt&&(e.__=e.__V),e.i=void 0,e.__V=rt}))),et=Qe=null},t.__c=function(e,n){n.some((function(e){try{e.__h.forEach(mt),e.__h=e.__h.filter((function(e){return!e.__||vt(e)}))}catch(o){n.some((function(e){e.__h&&(e.__h=[])})),n=[],t.__e(o,e.__v)}})),at&&at(e,n)},t.unmount=function(e){ut&&ut(e);var n,o=e.__c;o&&o.__H&&(o.__H.__.forEach((function(e){try{mt(e)}catch(e){n=e}})),o.__H=void 0,n&&t.__e(n,o.__v))};var pt="function"==typeof requestAnimationFrame;function ht(e){var t,n=function(){clearTimeout(o),pt&&cancelAnimationFrame(t),setTimeout(e)},o=setTimeout(n,100);pt&&(t=requestAnimationFrame(n))}function mt(e){var t=Qe,n=e.__c;"function"==typeof n&&(e.__c=void 0,n()),Qe=t}function vt(e){var t=Qe;e.__c=e.__(),Qe=t}function gt(e,t){return!e||e.length!==t.length||t.some((function(t,n){return t!==e[n]}))}function yt(e){var t,n,o="";if("string"==typeof e||"number"==typeof e)o+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=yt(e[t]))&&(o&&(o+=" "),o+=n);else for(t in e)e[t]&&(o&&(o+=" "),o+=t);return o}function bt(){for(var e,t,n=0,o="";n<arguments.length;)(e=arguments[n++])&&(t=yt(e))&&(o&&(o+=" "),o+=t);return o}const wt=e=>c("svg",{...e,viewBox:"0 0 512 512"},c("path",{stroke:"currentColor","stroke-linecap":"round","stroke-width":"32",d:"M368 368 144 144m224 0L144 368"})),kt=e=>c("svg",{...e,viewBox:"0 0 512 512"},c("path",{fill:"currentColor",d:"M321.94 98 158.82 237.78a24 24 0 0 0 0 36.44L321.94 414c15.57 13.34 39.62 2.28 39.62-18.22v-279.6c0-20.5-24.05-31.56-39.62-18.18z"})),xt=e=>c("svg",{...e,viewBox:"0 0 512 512"},c("path",{fill:"currentColor",d:"m190.06 414 163.12-139.78a24 24 0 0 0 0-36.44L190.06 98c-15.57-13.34-39.62-2.28-39.62 18.22v279.6c0 20.5 24.05 31.56 39.62 18.18z"})),St=e=>c("svg",{...e,viewBox:"0 0 512 512"},c("path",{stroke:"currentColor","stroke-linecap":"round","stroke-width":"32",d:"M256 112v288m144-144H112"})),Ct=({handleClick:e,handleSave:t,day:n,saveButtonClass:o,resetSaveValidity:r})=>c(Fragment,null,c("div",{class:"day-controls"},c("div",{class:"caret-back",onClick:()=>{e((n-1+5)%5)}},c(kt,null)),c("div",{class:"day-current-day"},(e=>{const t=["Monday","Tuesday","Wednesday","Thursday","Friday"][e];if(void 0===t)throw new Error(`n was out of range: ${e}`);return t})(n)),c("div",{class:"caret-forward",onClick:()=>{e((n+1)%5)}},c(xt,null))),c("button",{type:"button",class:bt("save-button",o),onClick:t,onAnimationEnd:r},"Save")),Pt=({loggedOut:e,cb:t})=>{const n=dt(null),o=dt(null);if(!e)return null;return c("div",{class:"login-popup"},c("form",{onSubmit:e=>{e.preventDefault();const r=n.current?.value.trim(),i=o.current?.value;void 0!==r&&void 0!==i&&t({username:r,password:i})}},c("div",{class:"card"},c("div",{class:"card-body"},c("h5",{class:"card-title"},"Login"),c("input",{ref:n,required:!0,placeholder:"Username",class:"input-group-text",defaultValue:Ue()}),c("input",{ref:o,required:!0,placeholder:"Password",class:"input-group-text",type:"password"})),c("button",{type:"submit",class:"btn btn-primary"},"Login"))))},Ot=({courses:e,focusedElement:t,onClick:n})=>{if(void 0===t)return null;const{left:o,height:r,top:i}=t,s=t.inputText.trim().toLowerCase();return""===s?null:c("div",{class:"suggestions",style:{transform:`translate(${o}px, ${i+r}px)`}},((e,t)=>{const n=[];t=t.toLowerCase();for(const o of e)o.name.toLowerCase().includes(t)&&n.push({...o,index:o.name.indexOf(t)});return n.sort(((e,t)=>e.index-t.index||T.compare(e.name,t.name)||Number(e.id)-Number(t.id)))})(e,s).map((({id:e,name:t})=>{const o=t.toLowerCase().indexOf(s),r=t.slice(0,o),i=t.slice(o+s.length),l=t.slice(o,o+s.length);return c("div",{key:e,class:"suggestion",onMouseDown:()=>{n(e)}},c("div",{class:"suggestion-name"},r,c("span",{class:"emphasised"},l),i),c("div",{class:"suggestion-id"},e))})))},Et=e=>{const t=e%60;return`${Math.floor(e/60)}:${`0${t}`.slice(-2)}`},Mt=/^([01]?\d|2[0-3]):([0-5]\d)$/,It=e=>{if(e=e.trim(),!Mt.test(e))return!1;const[t,n]=e.split(":");return 60*Number(t)+Number(n)},Dt=({time:e,class:t,index:n,...o})=>c("input",{...o,class:bt("time-input",t,{"invalid-input":!1===It(e)}),value:e}),Tt=({row:e,index:t,onInput:n,deleteRow:o,handleFocus:r})=>{const{fromInvalid:i,from:s,toInvalid:l,to:a,content:u,id:d}=e,f=dt(null),_=dt(null);return c("div",{class:"table-row"},c("div",{class:"table-cell time"},c(Dt,{index:t,class:["time-from",{"invalid-input":!0===i}],time:s.str,placeholder:"HH:mm",onInput:n("from",t)})," - ",c(Dt,{index:3,class:["time-to",{"invalid-input":!0===l}],time:a.str,placeholder:"HH:mm",onInput:n("to",t)})),c("div",{class:"table-cell content"},c("input",{ref:_,value:u,placeholder:"Content",onInput:n("content",t),onFocus:r(f,_,t)}),c("hr",null),c("input",{ref:f,value:d,placeholder:"Course id",onInput:n("id",t),onFocus:r(f,_,t)})),c("div",{class:"table-cell remove-row",onClick:()=>{o(t)}},c(wt,null)))},jt=({rows:e,handleFocus:t,onInput:n,deleteRow:o})=>c("div",null,e?.map(((e,r)=>c(Tt,{key:e.key,row:e,index:r,handleFocus:t,deleteRow:o,onInput:n}))));Ye.extend((e=>{e.prototype.getCourses=qe,e.extend(We)}));const At=()=>{const e=((new Date).getDay()+6)%7;return e>4?0:e},Ht=()=>({key:A(),from:{num:0,str:Et(0)},to:{num:0,str:Et(0)},content:"",id:""}),Nt=()=>{const e=[],t=GM_getValue("days");for(let n=0;n<5;++n){const o=t?.[n];e[n]=o?o.map((({from:e,to:t,content:n,id:o})=>({key:A(),from:{str:Et(e),num:e},to:{str:Et(t),num:t},id:o??"",content:n??""}))):[{from:480,to:525},{from:525,to:570},{from:590,to:635},{from:640,to:685},{from:690,to:735},{from:735,to:790},{from:790,to:835},{from:835,to:880},{from:890,to:935},{from:935,to:975}].map((({from:e,to:t})=>({...Ht(),from:{num:e,str:Et(e)},to:{num:t,str:Et(t)}})))}return e};class Vt extends _{state={day:At(),loggedOut:!1,courses:[],focusedElement:void 0,tables:Nt(),saveValidity:void 0};moodle=new Ye;render(){const{tryLogin:e,handleButtonNavigate:t,handleSave:n,deleteRow:o,handleTableInput:r,createRow:i,handleSuggestionsClick:s,resetSaveValidity:l,handleTableFocus:a}=this,{loggedOut:u,focusedElement:d,courses:_,day:p,tables:h,saveValidity:m}=this.state;return c(f,null,c(Pt,{loggedOut:u,cb:e}),c("div",{class:"container"},c("div",{class:"table-center"},c("div",{class:"grid-buttons"},c(Ct,{day:p,handleSave:n,handleClick:t,saveButtonClass:{"save-successful":!0===m,"save-failed":!1===m},resetSaveValidity:l})),c("div",{class:"main-table"},c(jt,{rows:h[p],deleteRow:o,handleFocus:a,onInput:r}),c("div",{class:"row-icon-add-row"},c("div",{class:"icon-add-row"},c(St,{onClick:i})))))),c(Ot,{focusedElement:d,courses:_,onClick:s}))}resetSaveValidity=()=>{this.setState({saveValidity:void 0})};validateOrder=()=>{let e=!0;return this.setState(He((t=>{const n=n=>{e&&(e=!1,t.day=n)};for(const[e,o]of t.tables.entries()){for(const e of o)delete e.fromInvalid,delete e.toInvalid;for(const[t,r]of o.entries()){const i=o[t+1],{from:s,to:l}=r;!1===It(s.str)&&(r.fromInvalid=!0,n(e)),!1===It(l.str)&&(r.toInvalid=!0,n(e)),s.num>=l.num&&(r.fromInvalid=!0,r.toInvalid=!0,n(e)),i&&i.from.num<l.num&&(r.toInvalid=!0,i.fromInvalid=!0,n(e))}}}))),e};handleSave=()=>{if(!this.validateOrder())return void this.setState({saveValidity:!1});this.setState({saveValidity:!0});const e=[];for(const t of this.state.tables){const n=[];e.push(n);for(const{from:e,to:o,content:r,id:i}of t)n.push({from:e.num,to:o.num,content:r||void 0,id:i||void 0})}GM_setValue("days",{...e})};handleTableFocus=(e,t,n)=>o=>{const r=e?.current,i=t?.current;if(!i||!r||void 0===n)return void this.setState({focusedElement:void 0});o.stopImmediatePropagation();const s=r.getBoundingClientRect(),l=r.ownerDocument.defaultView;if(!l)return void this.setState({focusedElement:void 0});const a=s.top+l.pageYOffset,u=s.left+l.pageXOffset,c=r.clientHeight,d=i.value.trim();this.setState({focusedElement:{top:a,left:u,height:c,inputText:d,index:n}})};handleSuggestionsClick=e=>{this.setState(He((t=>{if(!t.focusedElement)return;const n=t.tables[t.day]?.[t.focusedElement.index];n&&(n.id=e,t.focusedElement=void 0)})))};deleteRow=e=>{this.setState(He((t=>{t.tables[t.day]?.splice(e,1)})))};componentDidMount(){document.body.addEventListener("focusout",(()=>{this.setState({focusedElement:void 0})})),document.body.addEventListener("keydown",(e=>{"s"===e.key&&e.ctrlKey&&(e.preventDefault(),this.handleSave())})),this.tryLogin()}handleTableInput=(e,t)=>n=>{this.setState(He((o=>{const r=o.tables[o.day]?.[t];if(!r)return;const i=n.currentTarget.value,s=It(i);switch(e){case"from":delete r.fromInvalid,r.from.str=i,!1===s?r.fromInvalid=!0:r.from.num=s;break;case"to":delete r.toInvalid,r.to.str=i,!1===s?r.toInvalid=!0:r.to.num=s;break;case"content":r.content=i,o.focusedElement&&(o.focusedElement.inputText=i);break;case"id":r.id=i}}))),this.validateOrder()};createRow=()=>{this.setState(He((e=>{e.tables[e.day]?.push(Ht())})))};onLogin=async()=>{await this.fetchCourses()};logout=()=>{this.moodle.logout(),this.setState({loggedOut:!0})};tryLogin=e=>{this.setState({loggedOut:!1}),this.moodle.login(e).then(this.onLogin,this.logout)};fetchCourses=async()=>{let e;try{e=await this.moodle.getCourses()}catch{return void this.logout()}const t=e.map((({id:e,name:t})=>({id:String(e),name:t,key:A()})));this.setState({courses:t})};handleButtonNavigate=e=>{this.setState({day:e})}}const Ft=()=>{const e=new Date;return 60*e.getHours()*60*1e3+60*e.getMinutes()*1e3+1e3*e.getSeconds()+e.getMilliseconds()},Lt=e=>{if(void 0===e)return;let t,n=(new Date).getDay(),o=1;for(;(!(t=e[`${n}`])||0===t.length)&&o<=7;)++n,n%=7,++o;if(o>7||!t)return;const r=new Date;return r.setDate(r.getDate()+o),r.setMilliseconds(0),r.setSeconds(0),r.setMinutes(0),r.setHours(0),r.getTime()-Date.now()},Ut=e=>{const t=new Date,n=Ft()/60/1e3,o=e?.[(t.getDay()+6)%7];if(void 0===o||0===o.length)return{state:3,timeToUpdate:Lt(e)};const r=o[0];if(r.from>n)return{state:0,courses:[void 0,r],timeToUpdate:60*r.from*1e3-Ft()};let i,s=0;for(;(i=o[s])&&i.to<=n;)++s;if(void 0===i)return{state:1,timeToUpdate:Lt(e)};const l=60*i.to*1e3-Ft();return{state:2,courses:[i,o[s+1]],timeToUpdate:l}};
// ==UserScript==
// @name      Moodle Timetable v5
// @version   1.3.0
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
(e=>{try{(e=>{const t=GM_getValue(F),n=void 0===t?[-1,-1,-1]:H(t),o=Object.entries(e).map((([e,t])=>[H(e),t])).sort((([e],[t])=>V(e,t)));for(const[e,t]of o)V(n,e)<0&&t();GM_setValue(F,GM_info.script.version)})(e)}catch(e){console.error("Upgrading threw %o. Failing silently.",e)}})({"1.2.0":()=>{GM_deleteValue("lastValidatedToken"),GM_deleteValue("password")}}),"https:"!==location.protocol&&(location.protocol="https:");const Rt=e=>Number.isInteger(Number(e))?`/course/view.php?id=${e}`:e,$t=({values:e,isNow:t=!1})=>{const{from:n,to:o,id:r}=e,i=e.content??"Free lesson";return c("div",{class:"tt-tr"},c("div",{class:"tt-th"},t?"Now":"Next",void 0!==n&&void 0!==o&&` (${Et(n)} - ${Et(o)})`,":"),c("div",{class:"tt-td"},"string"==typeof r?c("a",{href:Rt(r),target:"_blank",rel:"noopener noreferrer"},i):i))};class Gt extends _{state={courses:[],timetableState:4};_timeoutId;setTimeout=e=>{this.clearTimeout(),void 0!==e&&(this._timeoutId=setTimeout((()=>{this.updateCourses(!0)}),e+200))};clearTimeout=()=>{void 0!==this._timeoutId&&clearTimeout(this._timeoutId)};updateCourses=e=>{if(this.clearTimeout(),(()=>{const e=GM_getValue("isHoliday");return"boolean"!=typeof e?(GM_setValue("isHoliday",!1),!1):e})())return void this.setState({timetableState:5});const{courses:t,state:n,timeToUpdate:o}=Ut(GM_getValue("days"));if(this.setTimeout(o),(()=>{const e=(new Date).getDay();return 0!==e&&6!==e})()){if(this.setState({timetableState:n}),t){const[n]=t;this.setState({courses:t}),e&&n&&(e=>{const{id:t,content:n}=e;if(n){const e=4e3,o=GM_notification({text:n,title:"Now",image:"https://i.imgur.com/ZtPH8v7.png",timeout:e,onclick(){void 0!==t&&open(Rt(t))}});o&&setTimeout((()=>{o.remove()}),e)}})(n)}}else this.setState({timetableState:6})};componentDidMount(){this.updateCourses();const e=()=>{this.updateCourses()};GM_addValueChangeListener("days",e),GM_addValueChangeListener("isHoliday",e)}render(){const{timetableState:e,courses:t}=this.state,[n,o]=t;return c("div",null,c("div",{class:"mod-indent-outer w-100"},c("div",{class:"contentwithoutlink"},c("div",{class:"no-overflow"},c("hr",null),c("div",{class:"tt-body"},c("div",{class:"tt-title"},"Timetable"),4===e&&c("div",null,"Loading"),1===e&&c("div",null,"No school anymore"),6===e&&c("div",{class:"tt-title"},"Weekend"),5===e&&c("div",{class:"tt-title"},"Holiday"),3===e&&c("div",null,"Today's timetable is empty, you can update it ",c("a",{href:"/timetable/v5",rel:"noopener noreferrer",target:"_blank"},"here")),c("div",{class:"tt-table"},(0===e||2===e)&&c("div",{class:"tt-tbody"},c($t,{isNow:!0,values:n??{content:"No school"}}),c($t,{values:o??{content:"No school"}})))),c("hr",null)))))}}const zt=/^\/timetable\/v5/i.test(location.pathname)?()=>{history.replaceState({},"","/timetable/v5");const{body:e,head:t}=document;for(;t.lastChild;)t.lastChild.remove();for(;e.lastChild;)e.lastChild.remove();document.title="Moodle timetable v5";const n=document.createElement("link");n.rel="shortcut icon",n.href="/theme/image.php/classic/theme/1620639422/favicon",t.append(n),GM_addStyle("@keyframes save-animation{0%{border-color:var(--color)}to{border-color:#30363d}}.suggestions{position:absolute;top:0;left:0;z-index:1;background-color:#202020;border:2px solid #30363d;border-radius:2px;padding:.75em 1em;max-width:calc(35% - 2.7em)}.suggestions .emphasised{font-weight:700}.suggestions:empty{display:none}.suggestions .suggestion{display:grid;width:100%;grid-template-columns:80% 20%;cursor:pointer}.suggestions .suggestion:hover{text-decoration:underline}.suggestion-name{padding:2px 4px}.suggestion-id{text-align:end}.login-popup{text-align:center;width:100%;height:100%;position:fixed;z-index:2;top:0;left:0;display:flex;align-items:center;justify-content:center}.login-popup .card{background-color:#202020;border:#30363d 2px solid;border-radius:2px;padding:.3em 1em}.login-popup button,.login-popup input{margin-top:5px;background:0 0;color:#f0f6fc;border:2px solid #30363d;border-radius:2px;padding:.2em 1.3em;font-size:90%}.login-popup input{display:block;cursor:text}.login-popup button{cursor:pointer}.grid-buttons{display:grid;grid-template-columns:1fr auto 1fr;justify-items:center;column-gap:5px;width:100%;margin-bottom:.3em;margin-top:.3em}.day-controls{display:flex;justify-content:space-evenly;align-items:center;grid-column-start:2;user-select:none;margin-right:1.5em}.day-current-day{min-width:13ch;text-align:center}.caret-back,.caret-forward{width:1.5em;height:1.5em;cursor:pointer}.save-button{cursor:pointer;justify-self:flex-end;background:0 0;color:#f0f6fc;border:2px solid #30363d;border-radius:2px;padding:.2em 1.3em;font-size:90%}*,::after,::before{box-sizing:border-box}blockquote,body,dd,dl,figure,h1,h2,h3,h4,p{margin:0}ol[role=list],ul[role=list]{list-style:none}html:focus-within{scroll-behavior:smooth}body{text-rendering:optimizeSpeed;line-height:1.5;padding-top:.3em;width:100%;min-height:100vh;font:20px sans-serif;color:#f0f6fc;background-color:#171717}a:not([class]){text-decoration-skip-ink:auto}img,picture{max-width:100%;display:block}button,input,select,textarea{font:inherit}@media (prefers-reduced-motion:reduce){html:focus-within{scroll-behavior:auto}*,::after,::before{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}.container,.table-center{display:flex;flex-direction:column;align-items:center}.table-center{width:70%}.main-table{width:100%;margin-top:.5em}.table-cell.remove-row{color:#f0f6fc}.table-row{display:flex;width:100%;margin-bottom:.3em}.table-cell{width:50%;padding:.3em 1em;box-sizing:border-box;border:2px solid #30363d}.table-cell input{border:0;background:0 0;outline:0;font:inherit;color:inherit}.table-cell input.invalid-input{color:#dc3545}.table-cell.content,.table-cell.time{justify-content:center;align-items:center}.table-cell.time{display:grid;grid-template-columns:1fr auto 1fr;border-top-left-radius:2px;border-bottom-left-radius:2px}.table-cell.content{border-top-right-radius:2px;border-bottom-right-radius:2px;display:flex;width:50%;flex-direction:column}.table-cell.content>*{width:100%}.table-cell.remove-row{width:1.5em;border:0;cursor:pointer;padding-left:0;padding-right:0;display:flex;align-items:center;justify-content:center}.time-input{margin-left:.5em;margin-right:.5em}.time-input.time-from{text-align:right}.time-input.time-to{text-align:left}.icon-add-row,.row-icon-add-row{display:flex;justify-content:center;align-items:center}.icon-add-row{height:1.5em;cursor:pointer;margin-right:1.5em;width:1.5em}.row-icon-add-row{width:100%;padding-bottom:1em}.save-failed,.save-successful{animation:3s ease-in-out save-animation}.save-failed{--color: #dc3545}.save-successful{--color: #198754}");const o=document.createElement("div");o.id="root",e.append(o),D(c(Vt,null),o)}:()=>{GM_registerMenuCommand("Open settings",(()=>{open("/timetable/v5","_blank")})),GM_registerMenuCommand("Toggle holiday",(()=>{GM_setValue("isHoliday",!GM_getValue("isHoliday"))})),GM_addStyle(".tt-title{font-weight:450;margin-bottom:10px}.tt-table,.tt-title{font-size:large}.tt-tr{display:flex}.tt-tr>*{flex:0 0 50%}.tt-th{font-weight:450}");const e=document.querySelector("#region-main-box ul.section");if(e){const t=document.createElement("li");t.id="module-timetable-v5",t.className="activity label modtype_label",e.prepend(t),D(c(Gt,null),t)}};var Wt;Wt=zt,"interactive"!==document.readyState&&"complete"!==document.readyState?document.addEventListener("DOMContentLoaded",Wt,{once:!0}):Wt()})();