(()=>{"use strict";var e,t,n,o,r,i={},_=[],l=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function s(e,t){for(var n in t)e[n]=t[n];return e}function c(e){var t=e.parentNode;t&&t.removeChild(e)}function a(t,n,o){var r,i,_,l={};for(_ in n)"key"==_?r=n[_]:"ref"==_?i=n[_]:l[_]=n[_];if(arguments.length>2&&(l.children=arguments.length>3?e.call(arguments,2):o),"function"==typeof t&&null!=t.defaultProps)for(_ in t.defaultProps)void 0===l[_]&&(l[_]=t.defaultProps[_]);return u(t,l,r,i,null)}function u(e,o,r,i,_){var l={type:e,props:o,key:r,ref:i,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==_?++n:_};return null==_&&null!=t.vnode&&t.vnode(l),l}function p(e){return e.children}function f(e,t){this.props=e,this.context=t}function d(e,t){if(null==t)return e.__?d(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?d(e):null}function h(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return h(e)}}function m(e){(!e.__d&&(e.__d=!0)&&o.push(e)&&!v.__r++||r!==t.debounceRendering)&&((r=t.debounceRendering)||setTimeout)(v)}function v(){for(var e;v.__r=o.length;)e=o.sort((function(e,t){return e.__v.__b-t.__v.__b})),o=[],e.some((function(e){var t,n,o,r,i,_;e.__d&&(i=(r=(t=e).__v).__e,(_=t.__P)&&(n=[],(o=s({},r)).__v=r.__v+1,P(_,r,o,t.__n,void 0!==_.ownerSVGElement,null!=r.__h?[i]:null,n,null==i?d(r):i,r.__h),E(n,r),r.__e!=i&&h(r)))}))}function y(e,t,n,o,r,l,s,c,a,f){var h,m,v,y,b,k,C,x=o&&o.__k||_,S=x.length;for(n.__k=[],h=0;h<t.length;h++)if(null!=(y=n.__k[h]=null==(y=t[h])||"boolean"==typeof y?null:"string"==typeof y||"number"==typeof y||"bigint"==typeof y?u(null,y,null,null,y):Array.isArray(y)?u(p,{children:y},null,null,null):y.__b>0?u(y.type,y.props,y.key,null,y.__v):y)){if(y.__=n,y.__b=n.__b+1,null===(v=x[h])||v&&y.key==v.key&&y.type===v.type)x[h]=void 0;else for(m=0;m<S;m++){if((v=x[m])&&y.key==v.key&&y.type===v.type){x[m]=void 0;break}v=null}P(e,y,v=v||i,r,l,s,c,a,f),b=y.__e,(m=y.ref)&&v.ref!=m&&(C||(C=[]),v.ref&&C.push(v.ref,null,y),C.push(m,y.__c||b,y)),null!=b?(null==k&&(k=b),"function"==typeof y.type&&y.__k===v.__k?y.__d=a=g(y,a,e):a=w(e,y,v,x,b,a),"function"==typeof n.type&&(n.__d=a)):a&&v.__e==a&&a.parentNode!=e&&(a=d(v))}for(n.__e=k,h=S;h--;)null!=x[h]&&("function"==typeof n.type&&null!=x[h].__e&&x[h].__e==n.__d&&(n.__d=d(o,h+1)),H(x[h],x[h]));if(C)for(h=0;h<C.length;h++)N(C[h],C[++h],C[++h])}function g(e,t,n){for(var o,r=e.__k,i=0;r&&i<r.length;i++)(o=r[i])&&(o.__=e,t="function"==typeof o.type?g(o,t,n):w(n,o,o,r,o.__e,t));return t}function b(e,t){return t=t||[],null==e||"boolean"==typeof e||(Array.isArray(e)?e.some((function(e){b(e,t)})):t.push(e)),t}function w(e,t,n,o,r,i){var _,l,s;if(void 0!==t.__d)_=t.__d,t.__d=void 0;else if(null==n||r!=i||null==r.parentNode)e:if(null==i||i.parentNode!==e)e.appendChild(r),_=null;else{for(l=i,s=0;(l=l.nextSibling)&&s<o.length;s+=2)if(l==r)break e;e.insertBefore(r,i),_=i}return void 0!==_?_:r.nextSibling}function k(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]=null==n?"":"number"!=typeof n||l.test(t)?n:n+"px"}function C(e,t,n,o,r){var i;e:if("style"===t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof o&&(e.style.cssText=o=""),o)for(t in o)n&&t in n||k(e.style,t,"");if(n)for(t in n)o&&n[t]===o[t]||k(e.style,t,n[t])}else if("o"===t[0]&&"n"===t[1])i=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+i]=n,n?o||e.addEventListener(t,i?S:x,i):e.removeEventListener(t,i?S:x,i);else if("dangerouslySetInnerHTML"!==t){if(r)t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("href"!==t&&"list"!==t&&"form"!==t&&"tabIndex"!==t&&"download"!==t&&t in e)try{e[t]=null==n?"":n;break e}catch(e){}"function"==typeof n||(null!=n&&(!1!==n||"a"===t[0]&&"r"===t[1])?e.setAttribute(t,n):e.removeAttribute(t))}}function x(e){this.l[e.type+!1](t.event?t.event(e):e)}function S(e){this.l[e.type+!0](t.event?t.event(e):e)}function P(e,n,o,r,i,_,l,c,a){var u,d,h,m,v,g,b,w,k,C,x,S,P,E=n.type;if(void 0!==n.constructor)return null;null!=o.__h&&(a=o.__h,c=n.__e=o.__e,n.__h=null,_=[c]),(u=t.__b)&&u(n);try{e:if("function"==typeof E){if(w=n.props,k=(u=E.contextType)&&r[u.__c],C=u?k?k.props.value:u.__:r,o.__c?b=(d=n.__c=o.__c).__=d.__E:("prototype"in E&&E.prototype.render?n.__c=d=new E(w,C):(n.__c=d=new f(w,C),d.constructor=E,d.render=L),k&&k.sub(d),d.props=w,d.state||(d.state={}),d.context=C,d.__n=r,h=d.__d=!0,d.__h=[]),null==d.__s&&(d.__s=d.state),null!=E.getDerivedStateFromProps&&(d.__s==d.state&&(d.__s=s({},d.__s)),s(d.__s,E.getDerivedStateFromProps(w,d.__s))),m=d.props,v=d.state,h)null==E.getDerivedStateFromProps&&null!=d.componentWillMount&&d.componentWillMount(),null!=d.componentDidMount&&d.__h.push(d.componentDidMount);else{if(null==E.getDerivedStateFromProps&&w!==m&&null!=d.componentWillReceiveProps&&d.componentWillReceiveProps(w,C),!d.__e&&null!=d.shouldComponentUpdate&&!1===d.shouldComponentUpdate(w,d.__s,C)||n.__v===o.__v){d.props=w,d.state=d.__s,n.__v!==o.__v&&(d.__d=!1),d.__v=n,n.__e=o.__e,n.__k=o.__k,n.__k.forEach((function(e){e&&(e.__=n)})),d.__h.length&&l.push(d);break e}null!=d.componentWillUpdate&&d.componentWillUpdate(w,d.__s,C),null!=d.componentDidUpdate&&d.__h.push((function(){d.componentDidUpdate(m,v,g)}))}if(d.context=C,d.props=w,d.__v=n,d.__P=e,x=t.__r,S=0,"prototype"in E&&E.prototype.render)d.state=d.__s,d.__d=!1,x&&x(n),u=d.render(d.props,d.state,d.context);else do{d.__d=!1,x&&x(n),u=d.render(d.props,d.state,d.context),d.state=d.__s}while(d.__d&&++S<25);d.state=d.__s,null!=d.getChildContext&&(r=s(s({},r),d.getChildContext())),h||null==d.getSnapshotBeforeUpdate||(g=d.getSnapshotBeforeUpdate(m,v)),P=null!=u&&u.type===p&&null==u.key?u.props.children:u,y(e,Array.isArray(P)?P:[P],n,o,r,i,_,l,c,a),d.base=n.__e,n.__h=null,d.__h.length&&l.push(d),b&&(d.__E=d.__=null),d.__e=!1}else null==_&&n.__v===o.__v?(n.__k=o.__k,n.__e=o.__e):n.__e=U(o.__e,n,o,r,i,_,l,a);(u=t.diffed)&&u(n)}catch(e){n.__v=null,(a||null!=_)&&(n.__e=c,n.__h=!!a,_[_.indexOf(c)]=null),t.__e(e,n,o)}}function E(e,n){t.__c&&t.__c(n,e),e.some((function(n){try{e=n.__h,n.__h=[],e.some((function(e){e.call(n)}))}catch(e){t.__e(e,n.__v)}}))}function U(t,n,o,r,_,l,s,a){var u,p,f,h=o.props,m=n.props,v=n.type,g=0;if("svg"===v&&(_=!0),null!=l)for(;g<l.length;g++)if((u=l[g])&&"setAttribute"in u==!!v&&(v?u.localName===v:3===u.nodeType)){t=u,l[g]=null;break}if(null==t){if(null===v)return document.createTextNode(m);t=_?document.createElementNS("http://www.w3.org/2000/svg",v):document.createElement(v,m.is&&m),l=null,a=!1}if(null===v)h===m||a&&t.data===m||(t.data=m);else{if(l=l&&e.call(t.childNodes),p=(h=o.props||i).dangerouslySetInnerHTML,f=m.dangerouslySetInnerHTML,!a){if(null!=l)for(h={},g=0;g<t.attributes.length;g++)h[t.attributes[g].name]=t.attributes[g].value;(f||p)&&(f&&(p&&f.__html==p.__html||f.__html===t.innerHTML)||(t.innerHTML=f&&f.__html||""))}if(function(e,t,n,o,r){var i;for(i in n)"children"===i||"key"===i||i in t||C(e,i,null,n[i],o);for(i in t)r&&"function"!=typeof t[i]||"children"===i||"key"===i||"value"===i||"checked"===i||n[i]===t[i]||C(e,i,t[i],n[i],o)}(t,m,h,_,a),f)n.__k=[];else if(g=n.props.children,y(t,Array.isArray(g)?g:[g],n,o,r,_&&"foreignObject"!==v,l,s,l?l[0]:o.__k&&d(o,0),a),null!=l)for(g=l.length;g--;)null!=l[g]&&c(l[g]);a||("value"in m&&void 0!==(g=m.value)&&(g!==t.value||"progress"===v&&!g||"option"===v&&g!==h.value)&&C(t,"value",g,h.value,!1),"checked"in m&&void 0!==(g=m.checked)&&g!==t.checked&&C(t,"checked",g,h.checked,!1))}return t}function N(e,n,o){try{"function"==typeof e?e(n):e.current=n}catch(e){t.__e(e,o)}}function H(e,n,o){var r,i;if(t.unmount&&t.unmount(e),(r=e.ref)&&(r.current&&r.current!==e.__e||N(r,null,n)),null!=(r=e.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(e){t.__e(e,n)}r.base=r.__P=null}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&H(r[i],n,"function"!=typeof e.type);o||null==e.__e||c(e.__e),e.__e=e.__d=void 0}function L(e,t,n){return this.constructor(e,n)}function M(n,o,r){var _,l,s;t.__&&t.__(n,o),l=(_="function"==typeof r)?null:r&&r.__k||o.__k,s=[],P(o,n=(!_&&r||o).__k=a(p,null,[n]),l||i,i,void 0!==o.ownerSVGElement,!_&&r?[r]:l?null:o.firstChild?e.call(o.childNodes):null,s,!_&&r?r:l?l.__e:o.firstChild,_),E(s,n)}e=_.slice,t={__e:function(e,t,n,o){for(var r,i,_;t=t.__;)if((r=t.__c)&&!r.__)try{if((i=r.constructor)&&null!=i.getDerivedStateFromError&&(r.setState(i.getDerivedStateFromError(e)),_=r.__d),null!=r.componentDidCatch&&(r.componentDidCatch(e,o||{}),_=r.__d),_)return r.__E=r}catch(t){e=t}throw e}},n=0,f.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=s({},this.state),"function"==typeof e&&(e=e(s({},n),this.props)),e&&s(n,e),null!=e&&this.__v&&(t&&this.__h.push(t),m(this))},f.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),m(this))},f.prototype.render=p,o=[],v.__r=0;const O=new Intl.Collator(void 0,{sensitivity:"base",numeric:!0}),V=e=>{if(!/^\d+\.\d+\.\d+$/.test(e))throw new Error(`Invalid version: ${e}.`);const[t,n,o]=e.split(".").map(Number);return[t,n,o]},I=(e,t)=>e-t,A=(e,t)=>I(e[0],t[0])||I(e[1],t[1])||I(e[2],t[2]),D="lastUpgraded";var T,R,$,W,F=0,j=[],G=[],z=t.__b,B=t.__r,q=t.diffed,Z=t.__c,K=t.unmount;function J(e,n){t.__h&&t.__h(R,e,F||n),F=0;var o=R.__H||(R.__H={__:[],__h:[]});return e>=o.__.length&&o.__.push({__V:G}),o.__[e]}function Q(e){return F=1,X(le,e)}function X(e,t,n){var o=J(T++,2);if(o.t=e,!o.__c&&(o.__=[n?n(t):le(void 0,t),function(e){var t=o.__N?o.__N[0]:o.__[0],n=o.t(t,e);t!==n&&(o.__N=[n,o.__[1]],o.__c.setState({}))}],o.__c=R,!R.u)){R.u=!0;var r=R.shouldComponentUpdate;R.shouldComponentUpdate=function(e,t,n){if(!o.__c.__H)return!0;var i=o.__c.__H.__.filter((function(e){return e.__c}));if(i.every((function(e){return!e.__N})))return!r||r.call(this,e,t,n);var _=!1;return i.forEach((function(e){if(e.__N){var t=e.__[0];e.__=e.__N,e.__N=void 0,t!==e.__[0]&&(_=!0)}})),!!_&&(!r||r.call(this,e,t,n))}}return o.__N||o.__}function Y(e,n){var o=J(T++,3);!t.__s&&_e(o.__H,n)&&(o.__=e,o.i=n,R.__H.__h.push(o))}function ee(e){return F=5,te((function(){return{current:e}}),[])}function te(e,t){var n=J(T++,7);return _e(n.__H,t)?(n.__V=e(),n.i=t,n.__h=e,n.__V):n.__}function ne(){for(var e;e=j.shift();)if(e.__P&&e.__H)try{e.__H.__h.forEach(re),e.__H.__h.forEach(ie),e.__H.__h=[]}catch(n){e.__H.__h=[],t.__e(n,e.__v)}}t.__b=function(e){R=null,z&&z(e)},t.__r=function(e){B&&B(e),T=0;var t=(R=e.__c).__H;t&&($===R?(t.__h=[],R.__h=[],t.__.forEach((function(e){e.__N&&(e.__=e.__N),e.__V=G,e.__N=e.i=void 0}))):(t.__h.forEach(re),t.__h.forEach(ie),t.__h=[])),$=R},t.diffed=function(e){q&&q(e);var n=e.__c;n&&n.__H&&(n.__H.__h.length&&(1!==j.push(n)&&W===t.requestAnimationFrame||((W=t.requestAnimationFrame)||function(e){var t,n=function(){clearTimeout(o),oe&&cancelAnimationFrame(t),setTimeout(e)},o=setTimeout(n,100);oe&&(t=requestAnimationFrame(n))})(ne)),n.__H.__.forEach((function(e){e.i&&(e.__H=e.i),e.__V!==G&&(e.__=e.__V),e.i=void 0,e.__V=G}))),$=R=null},t.__c=function(e,n){n.some((function(e){try{e.__h.forEach(re),e.__h=e.__h.filter((function(e){return!e.__||ie(e)}))}catch(o){n.some((function(e){e.__h&&(e.__h=[])})),n=[],t.__e(o,e.__v)}})),Z&&Z(e,n)},t.unmount=function(e){K&&K(e);var n,o=e.__c;o&&o.__H&&(o.__H.__.forEach((function(e){try{re(e)}catch(e){n=e}})),n&&t.__e(n,o.__v))};var oe="function"==typeof requestAnimationFrame;function re(e){var t=R,n=e.__c;"function"==typeof n&&(e.__c=void 0,n()),R=t}function ie(e){var t=R;e.__c=e.__(),R=t}function _e(e,t){return!e||e.length!==t.length||t.some((function(t,n){return t!==e[n]}))}function le(e,t){return"function"==typeof t?t(e):t}function se(e,t){for(var n in t)e[n]=t[n];return e}function ce(e,t){for(var n in e)if("__source"!==n&&!(n in t))return!0;for(var o in t)if("__source"!==o&&e[o]!==t[o])return!0;return!1}function ae(e){this.props=e}(ae.prototype=new f).isPureReactComponent=!0,ae.prototype.shouldComponentUpdate=function(e,t){return ce(this.props,e)||ce(this.state,t)};var ue=t.__b;t.__b=function(e){e.type&&e.type.__f&&e.ref&&(e.props.ref=e.ref,e.ref=null),ue&&ue(e)};"undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.forward_ref");var pe=t.__e;t.__e=function(e,t,n,o){if(e.then)for(var r,i=t;i=i.__;)if((r=i.__c)&&r.__c)return null==t.__e&&(t.__e=n.__e,t.__k=n.__k),r.__c(e,t);pe(e,t,n,o)};var fe=t.unmount;function de(){this.__u=0,this.t=null,this.__b=null}function he(e){var t=e.__.__c;return t&&t.__a&&t.__a(e)}function me(){this.u=null,this.o=null}t.unmount=function(e){var t=e.__c;t&&t.__R&&t.__R(),t&&!0===e.__h&&(e.type=null),fe&&fe(e)},(de.prototype=new f).__c=function(e,t){var n=t.__c,o=this;null==o.t&&(o.t=[]),o.t.push(n);var r=he(o.__v),i=!1,_=function(){i||(i=!0,n.__R=null,r?r(l):l())};n.__R=_;var l=function(){if(!--o.__u){if(o.state.__a){var e=o.state.__a;o.__v.__k[0]=function e(t,n,o){return t&&(t.__v=null,t.__k=t.__k&&t.__k.map((function(t){return e(t,n,o)})),t.__c&&t.__c.__P===n&&(t.__e&&o.insertBefore(t.__e,t.__d),t.__c.__e=!0,t.__c.__P=o)),t}(e,e.__c.__P,e.__c.__O)}var t;for(o.setState({__a:o.__b=null});t=o.t.pop();)t.forceUpdate()}},s=!0===t.__h;o.__u++||s||o.setState({__a:o.__b=o.__v.__k[0]}),e.then(_,_)},de.prototype.componentWillUnmount=function(){this.t=[]},de.prototype.render=function(e,t){if(this.__b){if(this.__v.__k){var n=document.createElement("div"),o=this.__v.__k[0].__c;this.__v.__k[0]=function e(t,n,o){return t&&(t.__c&&t.__c.__H&&(t.__c.__H.__.forEach((function(e){"function"==typeof e.__c&&e.__c()})),t.__c.__H=null),null!=(t=se({},t)).__c&&(t.__c.__P===o&&(t.__c.__P=n),t.__c=null),t.__k=t.__k&&t.__k.map((function(t){return e(t,n,o)}))),t}(this.__b,n,o.__O=o.__P)}this.__b=null}var r=t.__a&&a(p,null,e.fallback);return r&&(r.__h=null),[a(p,null,t.__a?null:e.children),r]};var ve=function(e,t,n){if(++n[1]===n[0]&&e.o.delete(t),e.props.revealOrder&&("t"!==e.props.revealOrder[0]||!e.o.size))for(n=e.u;n;){for(;n.length>3;)n.pop()();if(n[1]<n[0])break;e.u=n=n[2]}};function ye(e){return this.getChildContext=function(){return e.context},e.children}function ge(e){var t=this,n=e.i;t.componentWillUnmount=function(){M(null,t.l),t.l=null,t.i=null},t.i&&t.i!==n&&t.componentWillUnmount(),e.__v?(t.l||(t.i=n,t.l={nodeType:1,parentNode:n,childNodes:[],appendChild:function(e){this.childNodes.push(e),t.i.appendChild(e)},insertBefore:function(e,n){this.childNodes.push(e),t.i.appendChild(e)},removeChild:function(e){this.childNodes.splice(this.childNodes.indexOf(e)>>>1,1),t.i.removeChild(e)}}),M(a(ye,{context:t.context},e.__v),t.l)):t.l&&t.componentWillUnmount()}function be(e,t){var n=a(ge,{__v:e,i:t});return n.containerInfo=t,n}(me.prototype=new f).__a=function(e){var t=this,n=he(t.__v),o=t.o.get(e);return o[0]++,function(r){var i=function(){t.props.revealOrder?(o.push(r),ve(t,e,o)):r()};n?n(i):i()}},me.prototype.render=function(e){this.u=null,this.o=new Map;var t=b(e.children);e.revealOrder&&"b"===e.revealOrder[0]&&t.reverse();for(var n=t.length;n--;)this.o.set(t[n],this.u=[1,0,this.u]);return e.children},me.prototype.componentDidUpdate=me.prototype.componentDidMount=function(){var e=this;this.o.forEach((function(t,n){ve(e,n,t)}))};var we="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,ke=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,Ce="undefined"!=typeof document,xe=function(e){return("undefined"!=typeof Symbol&&"symbol"==typeof Symbol()?/fil|che|rad/i:/fil|che|ra/i).test(e)};f.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach((function(e){Object.defineProperty(f.prototype,e,{configurable:!0,get:function(){return this["UNSAFE_"+e]},set:function(t){Object.defineProperty(this,e,{configurable:!0,writable:!0,value:t})}})}));var Se=t.event;function Pe(){}function Ee(){return this.cancelBubble}function Ue(){return this.defaultPrevented}t.event=function(e){return Se&&(e=Se(e)),e.persist=Pe,e.isPropagationStopped=Ee,e.isDefaultPrevented=Ue,e.nativeEvent=e};var Ne={configurable:!0,get:function(){return this.class}},He=t.vnode;t.vnode=function(e){var t=e.type,n=e.props,o=n;if("string"==typeof t){var r=-1===t.indexOf("-");for(var i in o={},n){var _=n[i];Ce&&"children"===i&&"noscript"===t||"value"===i&&"defaultValue"in n&&null==_||("defaultValue"===i&&"value"in n&&null==n.value?i="value":"download"===i&&!0===_?_="":/ondoubleclick/i.test(i)?i="ondblclick":/^onchange(textarea|input)/i.test(i+t)&&!xe(n.type)?i="oninput":/^onfocus$/i.test(i)?i="onfocusin":/^onblur$/i.test(i)?i="onfocusout":/^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(i)?i=i.toLowerCase():r&&ke.test(i)?i=i.replace(/[A-Z0-9]/g,"-$&").toLowerCase():null===_&&(_=void 0),/^oninput$/i.test(i)&&(i=i.toLowerCase(),o[i]&&(i="oninputCapture")),o[i]=_)}"select"==t&&o.multiple&&Array.isArray(o.value)&&(o.value=b(n.children).forEach((function(e){e.props.selected=-1!=o.value.indexOf(e.props.value)}))),"select"==t&&null!=o.defaultValue&&(o.value=b(n.children).forEach((function(e){e.props.selected=o.multiple?-1!=o.defaultValue.indexOf(e.props.value):o.defaultValue==e.props.value}))),e.props=o,n.class!=n.className&&(Ne.enumerable="className"in n,null!=n.className&&(o.class=n.className),Object.defineProperty(o,"className",Ne))}e.$$typeof=we,He&&He(e)};var Le=t.__r;t.__r=function(e){Le&&Le(e),e.__c};const Me=e=>[()=>GM_getValue(e),t=>{GM_setValue(e,t)},()=>{GM_deleteValue(e)}],[Oe,Ve,Ie]=Me("token"),[Ae,De,Te]=Me("username"),Re=Symbol("getCourseContent");async function $e(e,t=!1){e=String(e);const n=this._readCache(Re)??{},o=n[e];if(o&&!t)return o;const r=await this.login(),i=new URLSearchParams({courseid:e,"options[0][name]":"includestealthmodules","options[0][value]":"1",moodlewsrestformat:"json",wsfunction:"core_course_get_contents",wstoken:r}),_=await fetch(`${this.baseUrl}/webservice/rest/server.php`,{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:i.toString()});if(!_.ok)throw new Error(`Response was not ok: ${_.status}`);const l=await _.json();if("exception"in l)throw this.logout(),new Error("Invalid token");return n[e]=l,this._writeCache(Re,n),l}Symbol("getUserId");Symbol("getCourses");class We extends Error{constructor(){super("No credentials provided.")}}class Fe extends Error{constructor(){super("Invalid credentials.")}}class je extends Error{constructor(e){super(`${e} not included`)}}class Ge{static extend(e){return e(Ge),Ge}baseUrl="https://moodle.ksasz.ch";credentials={token:Oe(),username:Ae()};#e=new Map;_readCache(e){return this.#e.get(e)}_writeCache(e,t){return this.#e.set(e,t),t}async login(e){const{credentials:t}=this;if(e&&(t.username=e.username,t.password=e.password,De(e.username)),t.token)return t.token;const{username:n,password:o}=t;if(!n||!o)throw new We;const r=new URLSearchParams({username:n,password:o,service:"moodle_mobile_app"}),i=await fetch(`${this.baseUrl}/login/token.php`,{method:"POST",body:r.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}});if(!i.ok)throw new Error(`Response was not ok: ${i.status}`);const _=await i.json();if("errorcode"in _)throw this.logout(),new Fe;const{token:l}=_;return Ve(l),t.token=l,l}logout(){delete this.credentials.token,Ie(),delete this.credentials.password}async getCourses(e){throw new je("getCourses")}async getUserId(){throw new je("getUserId")}async popupLogin(e){throw new je("popupLogin")}async getCourseContent(e,t){throw new je("getCourseContent")}}const ze=({cb:e,title:t,moodle:n})=>{const o=ee(null),r=ee(null),[i,_]=Q(!0),[l,s]=Q({username:!0,password:!0});return i?a("div",{class:"vertical-horizontal-center"},a("form",{onSubmit:async t=>{t.preventDefault(),t.stopImmediatePropagation();const i=o.current?.value.trim(),l=r.current?.value;if(s({password:Boolean(l),username:Boolean(i)}),i&&l){_(!1);try{const t=await n.login({username:i,password:l});e(t)}catch{_(!0)}}}},a("div",{class:"card shadow"},a("div",{class:"card-body"},a("h5",{class:"card-title"},"Login - ",t),a("div",{class:"mb-3"},a("label",{htmlFor:"popup-username",class:"form-label"},"Username"),a("input",{ref:o,required:!0,defaultValue:Ae(),id:"popup-username",placeholder:"Username",class:"form-control"+(l.username?"":" is-invalid"),onInput:()=>{s((e=>({...e,username:!0})))}})),a("div",{class:"mb-3"},a("label",{htmlFor:"popup-password",class:"form-label"},"Password"),a("input",{ref:r,required:!0,id:"popup-password",placeholder:"Password",class:"form-control"+(l.password?"":" is-invalid"),type:"password",onInput:()=>{s((e=>({...e,password:!0})))}}))),a("button",{class:"btn btn-primary",type:"submit"},"Login")))):null},Be=async function(e){return new Promise((t=>{const n=GM_addStyle(".login-popup-userscript .vertical-horizontal-center{width:100%;height:100%;position:fixed;z-index:100000000;top:0;left:0;display:flex;align-items:center;justify-content:center;pointer-events:none}.login-popup-userscript .card{pointer-events:auto}"),o=document.createElement("div");o.className="login-popup-userscript",document.body.append(o),M(a(ze,{cb:e=>{M(null,o),n.remove(),o.remove(),t(e)},title:e,moodle:this}),o)}))},qe={"application/pdf":"pdf-256","application/zip":"archive-256","application/vnd.openxmlformats-officedocument.wordprocessingml.document":"document-256","application/msword":"document-256","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"spreadsheet-256","application/vnd.ms-excel":"spreadsheet-256","application/vnd.openxmlformats-officedocument.presentationml.presentation":"powerpoint-256","application/vnd.ms-powerpoint":"powerpoint-256","text/plain":"sourcecode-256","audio/mp3":"mp3-256","audio/mp4":"mp3-256","video/quicktime":"quicktime-256","video/mp4":"mpeg-256"},Ze=(e,t)=>{const n=qe[e];return n?`/theme/image.php/classic/core/1601902087/f/${n}`:t};Ge.extend((e=>{e.prototype.popupLogin=Be})).extend((e=>{e.prototype.getCourseContent=$e}));const Ke=new Ge,Je=async(e,t,n)=>{const o=await(async e=>{const t=new URLSearchParams(location.search),n=t.get("id");if(!n)return console.error('Could not extract courseId "%s"',t),!1;try{return await Ke.getCourseContent(n,e)}catch{return await Ke.popupLogin("Open folders inline"),Ke.getCourseContent(n,e)}})(n);if(!1===o)return!1;const r=o.find((({id:t})=>t===Number(e)));if(!r)return console.error("Could not find sectionObject."),!1;const{modules:i}=r,_=i.find((({id:e,modname:n})=>"folder"===n&&e===Number(t)));if(!_)return console.error("Could not find folderObject."),!1;const{contents:l}=_,s=[];for(const e of l)if("file"===e.type){const{filepath:t,mimetype:n}=e,o=new URL(e.fileurl,"https://moodle.ksasz.ch");o.pathname=o.pathname.replace(/^\/webservice/,"");const r=new URL(o.href);n?.startsWith("image")||r.searchParams.set("preview","1"),s.push({...e,filePath:(c=t,c.trim().split(/\/+/).filter(Boolean)),imgPath:Ze(n,r.href),fileUrl:o.href})}var c;return s},Qe=({onClick:e})=>a("span",{style:{marginLeft:5},class:"svg-refresh-hitbox",onClick:t=>{t.stopPropagation(),t.preventDefault(),e()}},a("svg",{fill:"currentColor","aria-hidden":"true",class:"icon navicon svg-refresh",viewBox:"0 0 512 512"},a("path",{d:"M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"}))),Xe=({isHidden:e,base:t,handleClick:n})=>a("div",{class:"fp-filename-icon folders-inline-icon",onClick:n},a("div",{class:"folders-inline-icon-div"},a("i",{class:`icon fa ${e?"fa-caret-right":"fa-caret-down"} fa-fw navicon folders-inline-caret`}),a("img",{alt:"",class:"iconlarge activityicon",role:"presentation",title:t,"aria-hidden":"true",src:"/theme/image.php/classic/core/1601902087/f/folder-128"})),a("span",{class:"fp-filename"},t)),Ye=({contents:e,directoryDepth:t=0,base:n,isParent:o=!1})=>{const[r,i]=Q(!o),_={};for(const n of e)if("isexternalfile"in n){const e=n.filePath[t]??"/";(_[e]??(_[e]=[])).push(n)}const l=_["/"];l?.sort(((e,t)=>O.compare(e.filename.trim(),t.filename.trim()))),delete _["/"];const s=Object.entries(_);s.sort((([e],[t])=>O.compare(e.trim(),t.trim())));const c=r&&!o;return a(p,null,!o&&a(Xe,{isHidden:r,base:n,handleClick:e=>{e.stopPropagation(),i((e=>!e))}}),!c&&a("ul",{style:{listStyle:"none"}},s.map((([e,n])=>a("li",{key:e},a(Ye,{contents:n,base:e,directoryDepth:t+1})))),l?.map((({fileUrl:e,filename:t,imgPath:n})=>a("li",{key:t},a("span",{class:"fp-filename-icon"},a("a",{href:e},a("span",{class:"fp-icon"},a("img",{alt:"",title:t,src:n})),a("span",{class:"fp-filename"},t))))))))},et=({folderId:e,sectionId:t,anchor:n})=>{const[o,r]=Q(void 0),[i,_]=Q(!1);Y((()=>{const e=e=>{e.preventDefault(),e.stopImmediatePropagation(),_((e=>!e))};return n.addEventListener("click",e),()=>{n.removeEventListener("click",e)}}),[n]);const l=async(e,t,n)=>{const o=await Je(t,e,n);o&&r(o)};return Y((()=>{l(e,t)}),[e,t]),i?null:o?a(p,null,0===o.length?a("div",{class:"folder-empty"},"The folder was empty"):a(Ye,{isParent:!0,contents:o}),be(a(Qe,{onClick:()=>{r(void 0),l(e,t,!0)}}),n)):a("div",{class:"folder-loading"},"Loading")};
// ==UserScript==
// @name      Moodle open folders inline preact
// @version   1.2.1
// @author    lusc
// @include   https://moodle.ksasz.ch/course/view.php?id=*
// @updateURL https://git.io/JXgvE
// @grant     GM_setValue
// @grant     GM_getValue
// @grant     GM_deleteValue
// @grant     GM_addStyle
// @run-at    document-start
// ==/UserScript==
(e=>{try{(e=>{const t=GM_getValue(D),n=void 0===t?[-1,-1,-1]:V(t),o=Object.entries(e).map((([e,t])=>[V(e),t])).sort((([e],[t])=>A(e,t)));for(const[e,t]of o)A(n,e)<0&&t();GM_setValue(D,GM_info.script.version)})(e)}catch(e){console.error("Upgrading threw %o. Failing silently.",e)}})({"1.2.0":()=>{GM_deleteValue("lastValidatedToken"),GM_deleteValue("password")}}),GM_addStyle('@keyframes folder-loading-dots{0%{content:""}33%{content:"."}67%{content:".."}to{content:"..."}}div.folders-inline-icon{cursor:pointer;user-select:none}div.folders-inline-icon-div{display:inline}.folder-parent li{margin-left:24px;padding-left:none}.folder-empty,.folder-loading{margin-left:calc(1rem + 24px)}.folder-loading::after{content:"";animation:folder-loading-dots .6s infinite linear alternate}');const tt=e=>{if(e.ctrlKey)return;if(!(e.target instanceof Element))return;const t=e.target.closest("a");if("/mod/folder/view.php"!==t?.pathname)return;const n=t.closest("li.activity.folder");if(!n)return;const o=/\d+$/.exec(n.id)?.[0];if(!o)return void console.error("Could not get folderId.");const r=t.closest("li.section.main")?.getAttribute("aria-labelledby")?.match(/-(\d+)-/)?.[1];if(!r)return void console.error("sectionId was undefined.");e.preventDefault();const i=document.createElement("span");i.className="folder-parent",M(a(et,{sectionId:r,folderId:o,anchor:t}),i),n.append(i)};var nt;nt=()=>{document.querySelector("div.course-content > ul.topics")?.addEventListener("click",tt)},"interactive"!==document.readyState&&"complete"!==document.readyState?document.addEventListener("DOMContentLoaded",nt,{once:!0}):nt()})();