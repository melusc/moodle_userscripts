(()=>{"use strict";var e,t,n,o,r,i,l={},_=[],s=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function c(e,t){for(var n in t)e[n]=t[n];return e}function a(e){var t=e.parentNode;t&&t.removeChild(e)}function u(t,n,o){var r,i,l,_={};for(l in n)"key"==l?r=n[l]:"ref"==l?i=n[l]:_[l]=n[l];if(arguments.length>2&&(_.children=arguments.length>3?e.call(arguments,2):o),"function"==typeof t&&null!=t.defaultProps)for(l in t.defaultProps)void 0===_[l]&&(_[l]=t.defaultProps[l]);return p(t,_,r,i,null)}function p(e,o,r,i,l){var _={type:e,props:o,key:r,ref:i,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==l?++n:l};return null==l&&null!=t.vnode&&t.vnode(_),_}function f(e){return e.children}function d(e,t){this.props=e,this.context=t}function h(e,t){if(null==t)return e.__?h(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?h(e):null}function m(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return m(e)}}function v(e){(!e.__d&&(e.__d=!0)&&o.push(e)&&!y.__r++||i!==t.debounceRendering)&&((i=t.debounceRendering)||r)(y)}function y(){for(var e;y.__r=o.length;)e=o.sort((function(e,t){return e.__v.__b-t.__v.__b})),o=[],e.some((function(e){var t,n,o,r,i,l;e.__d&&(i=(r=(t=e).__v).__e,(l=t.__P)&&(n=[],(o=c({},r)).__v=r.__v+1,E(l,r,o,t.__n,void 0!==l.ownerSVGElement,null!=r.__h?[i]:null,n,null==i?h(r):i,r.__h),U(n,r),r.__e!=i&&m(r)))}))}function g(e,t,n,o,r,i,s,c,a,u){var d,m,v,y,g,w,C,x=o&&o.__k||_,P=x.length;for(n.__k=[],d=0;d<t.length;d++)if(null!=(y=n.__k[d]=null==(y=t[d])||"boolean"==typeof y?null:"string"==typeof y||"number"==typeof y||"bigint"==typeof y?p(null,y,null,null,y):Array.isArray(y)?p(f,{children:y},null,null,null):y.__b>0?p(y.type,y.props,y.key,null,y.__v):y)){if(y.__=n,y.__b=n.__b+1,null===(v=x[d])||v&&y.key==v.key&&y.type===v.type)x[d]=void 0;else for(m=0;m<P;m++){if((v=x[m])&&y.key==v.key&&y.type===v.type){x[m]=void 0;break}v=null}E(e,y,v=v||l,r,i,s,c,a,u),g=y.__e,(m=y.ref)&&v.ref!=m&&(C||(C=[]),v.ref&&C.push(v.ref,null,y),C.push(m,y.__c||g,y)),null!=g?(null==w&&(w=g),"function"==typeof y.type&&y.__k===v.__k?y.__d=a=b(y,a,e):a=k(e,y,v,x,g,a),"function"==typeof n.type&&(n.__d=a)):a&&v.__e==a&&a.parentNode!=e&&(a=h(v))}for(n.__e=w,d=P;d--;)null!=x[d]&&("function"==typeof n.type&&null!=x[d].__e&&x[d].__e==n.__d&&(n.__d=h(o,d+1)),N(x[d],x[d]));if(C)for(d=0;d<C.length;d++)H(C[d],C[++d],C[++d])}function b(e,t,n){for(var o,r=e.__k,i=0;r&&i<r.length;i++)(o=r[i])&&(o.__=e,t="function"==typeof o.type?b(o,t,n):k(n,o,o,r,o.__e,t));return t}function w(e,t){return t=t||[],null==e||"boolean"==typeof e||(Array.isArray(e)?e.some((function(e){w(e,t)})):t.push(e)),t}function k(e,t,n,o,r,i){var l,_,s;if(void 0!==t.__d)l=t.__d,t.__d=void 0;else if(null==n||r!=i||null==r.parentNode)e:if(null==i||i.parentNode!==e)e.appendChild(r),l=null;else{for(_=i,s=0;(_=_.nextSibling)&&s<o.length;s+=2)if(_==r)break e;e.insertBefore(r,i),l=i}return void 0!==l?l:r.nextSibling}function C(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]=null==n?"":"number"!=typeof n||s.test(t)?n:n+"px"}function x(e,t,n,o,r){var i;e:if("style"===t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof o&&(e.style.cssText=o=""),o)for(t in o)n&&t in n||C(e.style,t,"");if(n)for(t in n)o&&n[t]===o[t]||C(e.style,t,n[t])}else if("o"===t[0]&&"n"===t[1])i=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+i]=n,n?o||e.addEventListener(t,i?S:P,i):e.removeEventListener(t,i?S:P,i);else if("dangerouslySetInnerHTML"!==t){if(r)t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("href"!==t&&"list"!==t&&"form"!==t&&"tabIndex"!==t&&"download"!==t&&t in e)try{e[t]=null==n?"":n;break e}catch(e){}"function"==typeof n||(null!=n&&(!1!==n||"a"===t[0]&&"r"===t[1])?e.setAttribute(t,n):e.removeAttribute(t))}}function P(e){this.l[e.type+!1](t.event?t.event(e):e)}function S(e){this.l[e.type+!0](t.event?t.event(e):e)}function E(e,n,o,r,i,l,_,s,a){var u,p,h,m,v,y,b,w,k,C,x,P=n.type;if(void 0!==n.constructor)return null;null!=o.__h&&(a=o.__h,s=n.__e=o.__e,n.__h=null,l=[s]),(u=t.__b)&&u(n);try{e:if("function"==typeof P){if(w=n.props,k=(u=P.contextType)&&r[u.__c],C=u?k?k.props.value:u.__:r,o.__c?b=(p=n.__c=o.__c).__=p.__E:("prototype"in P&&P.prototype.render?n.__c=p=new P(w,C):(n.__c=p=new d(w,C),p.constructor=P,p.render=M),k&&k.sub(p),p.props=w,p.state||(p.state={}),p.context=C,p.__n=r,h=p.__d=!0,p.__h=[]),null==p.__s&&(p.__s=p.state),null!=P.getDerivedStateFromProps&&(p.__s==p.state&&(p.__s=c({},p.__s)),c(p.__s,P.getDerivedStateFromProps(w,p.__s))),m=p.props,v=p.state,h)null==P.getDerivedStateFromProps&&null!=p.componentWillMount&&p.componentWillMount(),null!=p.componentDidMount&&p.__h.push(p.componentDidMount);else{if(null==P.getDerivedStateFromProps&&w!==m&&null!=p.componentWillReceiveProps&&p.componentWillReceiveProps(w,C),!p.__e&&null!=p.shouldComponentUpdate&&!1===p.shouldComponentUpdate(w,p.__s,C)||n.__v===o.__v){p.props=w,p.state=p.__s,n.__v!==o.__v&&(p.__d=!1),p.__v=n,n.__e=o.__e,n.__k=o.__k,n.__k.forEach((function(e){e&&(e.__=n)})),p.__h.length&&_.push(p);break e}null!=p.componentWillUpdate&&p.componentWillUpdate(w,p.__s,C),null!=p.componentDidUpdate&&p.__h.push((function(){p.componentDidUpdate(m,v,y)}))}p.context=C,p.props=w,p.state=p.__s,(u=t.__r)&&u(n),p.__d=!1,p.__v=n,p.__P=e,u=p.render(p.props,p.state,p.context),p.state=p.__s,null!=p.getChildContext&&(r=c(c({},r),p.getChildContext())),h||null==p.getSnapshotBeforeUpdate||(y=p.getSnapshotBeforeUpdate(m,v)),x=null!=u&&u.type===f&&null==u.key?u.props.children:u,g(e,Array.isArray(x)?x:[x],n,o,r,i,l,_,s,a),p.base=n.__e,n.__h=null,p.__h.length&&_.push(p),b&&(p.__E=p.__=null),p.__e=!1}else null==l&&n.__v===o.__v?(n.__k=o.__k,n.__e=o.__e):n.__e=L(o.__e,n,o,r,i,l,_,a);(u=t.diffed)&&u(n)}catch(e){n.__v=null,(a||null!=l)&&(n.__e=s,n.__h=!!a,l[l.indexOf(s)]=null),t.__e(e,n,o)}}function U(e,n){t.__c&&t.__c(n,e),e.some((function(n){try{e=n.__h,n.__h=[],e.some((function(e){e.call(n)}))}catch(e){t.__e(e,n.__v)}}))}function L(t,n,o,r,i,_,s,c){var u,p,f,d=o.props,m=n.props,v=n.type,y=0;if("svg"===v&&(i=!0),null!=_)for(;y<_.length;y++)if((u=_[y])&&"setAttribute"in u==!!v&&(v?u.localName===v:3===u.nodeType)){t=u,_[y]=null;break}if(null==t){if(null===v)return document.createTextNode(m);t=i?document.createElementNS("http://www.w3.org/2000/svg",v):document.createElement(v,m.is&&m),_=null,c=!1}if(null===v)d===m||c&&t.data===m||(t.data=m);else{if(_=_&&e.call(t.childNodes),p=(d=o.props||l).dangerouslySetInnerHTML,f=m.dangerouslySetInnerHTML,!c){if(null!=_)for(d={},y=0;y<t.attributes.length;y++)d[t.attributes[y].name]=t.attributes[y].value;(f||p)&&(f&&(p&&f.__html==p.__html||f.__html===t.innerHTML)||(t.innerHTML=f&&f.__html||""))}if(function(e,t,n,o,r){var i;for(i in n)"children"===i||"key"===i||i in t||x(e,i,null,n[i],o);for(i in t)r&&"function"!=typeof t[i]||"children"===i||"key"===i||"value"===i||"checked"===i||n[i]===t[i]||x(e,i,t[i],n[i],o)}(t,m,d,i,c),f)n.__k=[];else if(y=n.props.children,g(t,Array.isArray(y)?y:[y],n,o,r,i&&"foreignObject"!==v,_,s,_?_[0]:o.__k&&h(o,0),c),null!=_)for(y=_.length;y--;)null!=_[y]&&a(_[y]);c||("value"in m&&void 0!==(y=m.value)&&(y!==t.value||"progress"===v&&!y||"option"===v&&y!==d.value)&&x(t,"value",y,d.value,!1),"checked"in m&&void 0!==(y=m.checked)&&y!==t.checked&&x(t,"checked",y,d.checked,!1))}return t}function H(e,n,o){try{"function"==typeof e?e(n):e.current=n}catch(e){t.__e(e,o)}}function N(e,n,o){var r,i;if(t.unmount&&t.unmount(e),(r=e.ref)&&(r.current&&r.current!==e.__e||H(r,null,n)),null!=(r=e.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(e){t.__e(e,n)}r.base=r.__P=null}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&N(r[i],n,"function"!=typeof e.type);o||null==e.__e||a(e.__e),e.__e=e.__d=void 0}function M(e,t,n){return this.constructor(e,n)}function O(n,o,r){var i,_,s;t.__&&t.__(n,o),_=(i="function"==typeof r)?null:r&&r.__k||o.__k,s=[],E(o,n=(!i&&r||o).__k=u(f,null,[n]),_||l,l,void 0!==o.ownerSVGElement,!i&&r?[r]:_?null:o.firstChild?e.call(o.childNodes):null,s,!i&&r?r:_?_.__e:o.firstChild,i),U(s,n)}e=_.slice,t={__e:function(e,t,n,o){for(var r,i,l;t=t.__;)if((r=t.__c)&&!r.__)try{if((i=r.constructor)&&null!=i.getDerivedStateFromError&&(r.setState(i.getDerivedStateFromError(e)),l=r.__d),null!=r.componentDidCatch&&(r.componentDidCatch(e,o||{}),l=r.__d),l)return r.__E=r}catch(t){e=t}throw e}},n=0,d.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=c({},this.state),"function"==typeof e&&(e=e(c({},n),this.props)),e&&c(n,e),null!=e&&this.__v&&(t&&this.__h.push(t),v(this))},d.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),v(this))},d.prototype.render=f,o=[],r="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,y.__r=0;const I=new Intl.Collator(void 0,{sensitivity:"base",numeric:!0}),A=e=>{if(!/^\d+\.\d+\.\d+$/.test(e))throw new Error(`Invalid version: ${e}.`);const[t,n,o]=e.split(".").map(Number);return[t,n,o]},D=(e,t)=>e-t,T=(e,t)=>D(e[0],t[0])||D(e[1],t[1])||D(e[2],t[2]),R="lastUpgraded";var V,$,W,F=0,j=[],G=t.__b,z=t.__r,B=t.diffed,q=t.__c,Z=t.unmount;function K(e,n){t.__h&&t.__h($,e,F||n),F=0;var o=$.__H||($.__H={__:[],__h:[]});return e>=o.__.length&&o.__.push({}),o.__[e]}function J(e){return F=1,function(e,t,n){var o=K(V++,2);return o.t=e,o.__c||(o.__=[re(void 0,t),function(e){var t=o.t(o.__[0],e);o.__[0]!==t&&(o.__=[t,o.__[1]],o.__c.setState({}))}],o.__c=$),o.__}(re,e)}function Q(e,n){var o=K(V++,3);!t.__s&&oe(o.__H,n)&&(o.__=e,o.__H=n,$.__H.__h.push(o))}function X(e){return F=5,function(e,t){var n=K(V++,7);return oe(n.__H,t)&&(n.__=e(),n.__H=t,n.__h=e),n.__}((function(){return{current:e}}),[])}function Y(){for(var e;e=j.shift();)if(e.__P)try{e.__H.__h.forEach(te),e.__H.__h.forEach(ne),e.__H.__h=[]}catch(n){e.__H.__h=[],t.__e(n,e.__v)}}t.__b=function(e){$=null,G&&G(e)},t.__r=function(e){z&&z(e),V=0;var t=($=e.__c).__H;t&&(t.__h.forEach(te),t.__h.forEach(ne),t.__h=[])},t.diffed=function(e){B&&B(e);var n=e.__c;n&&n.__H&&n.__H.__h.length&&(1!==j.push(n)&&W===t.requestAnimationFrame||((W=t.requestAnimationFrame)||function(e){var t,n=function(){clearTimeout(o),ee&&cancelAnimationFrame(t),setTimeout(e)},o=setTimeout(n,100);ee&&(t=requestAnimationFrame(n))})(Y)),$=null},t.__c=function(e,n){n.some((function(e){try{e.__h.forEach(te),e.__h=e.__h.filter((function(e){return!e.__||ne(e)}))}catch(o){n.some((function(e){e.__h&&(e.__h=[])})),n=[],t.__e(o,e.__v)}})),q&&q(e,n)},t.unmount=function(e){Z&&Z(e);var n,o=e.__c;o&&o.__H&&(o.__H.__.forEach((function(e){try{te(e)}catch(e){n=e}})),n&&t.__e(n,o.__v))};var ee="function"==typeof requestAnimationFrame;function te(e){var t=$,n=e.__c;"function"==typeof n&&(e.__c=void 0,n()),$=t}function ne(e){var t=$;e.__c=e.__(),$=t}function oe(e,t){return!e||e.length!==t.length||t.some((function(t,n){return t!==e[n]}))}function re(e,t){return"function"==typeof t?t(e):t}function ie(e,t){for(var n in e)if("__source"!==n&&!(n in t))return!0;for(var o in t)if("__source"!==o&&e[o]!==t[o])return!0;return!1}function le(e){this.props=e}(le.prototype=new d).isPureReactComponent=!0,le.prototype.shouldComponentUpdate=function(e,t){return ie(this.props,e)||ie(this.state,t)};var _e=t.__b;t.__b=function(e){e.type&&e.type.__f&&e.ref&&(e.props.ref=e.ref,e.ref=null),_e&&_e(e)},"undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.forward_ref");var se=t.__e;t.__e=function(e,t,n,o){if(e.then)for(var r,i=t;i=i.__;)if((r=i.__c)&&r.__c)return null==t.__e&&(t.__e=n.__e,t.__k=n.__k),r.__c(e,t);se(e,t,n,o)};var ce=t.unmount;function ae(){this.__u=0,this.t=null,this.__b=null}function ue(e){var t=e.__.__c;return t&&t.__e&&t.__e(e)}function pe(){this.u=null,this.o=null}t.unmount=function(e){var t=e.__c;t&&t.__R&&t.__R(),t&&!0===e.__h&&(e.type=null),ce&&ce(e)},(ae.prototype=new d).__c=function(e,t){var n=t.__c,o=this;null==o.t&&(o.t=[]),o.t.push(n);var r=ue(o.__v),i=!1,l=function(){i||(i=!0,n.__R=null,r?r(_):_())};n.__R=l;var _=function(){if(!--o.__u){if(o.state.__e){var e=o.state.__e;o.__v.__k[0]=function e(t,n,o){return t&&(t.__v=null,t.__k=t.__k&&t.__k.map((function(t){return e(t,n,o)})),t.__c&&t.__c.__P===n&&(t.__e&&o.insertBefore(t.__e,t.__d),t.__c.__e=!0,t.__c.__P=o)),t}(e,e.__c.__P,e.__c.__O)}var t;for(o.setState({__e:o.__b=null});t=o.t.pop();)t.forceUpdate()}},s=!0===t.__h;o.__u++||s||o.setState({__e:o.__b=o.__v.__k[0]}),e.then(l,l)},ae.prototype.componentWillUnmount=function(){this.t=[]},ae.prototype.render=function(e,t){if(this.__b){if(this.__v.__k){var n=document.createElement("div"),o=this.__v.__k[0].__c;this.__v.__k[0]=function e(t,n,o){return t&&(t.__c&&t.__c.__H&&(t.__c.__H.__.forEach((function(e){"function"==typeof e.__c&&e.__c()})),t.__c.__H=null),null!=(t=function(e,t){for(var n in t)e[n]=t[n];return e}({},t)).__c&&(t.__c.__P===o&&(t.__c.__P=n),t.__c=null),t.__k=t.__k&&t.__k.map((function(t){return e(t,n,o)}))),t}(this.__b,n,o.__O=o.__P)}this.__b=null}var r=t.__e&&u(f,null,e.fallback);return r&&(r.__h=null),[u(f,null,t.__e?null:e.children),r]};var fe=function(e,t,n){if(++n[1]===n[0]&&e.o.delete(t),e.props.revealOrder&&("t"!==e.props.revealOrder[0]||!e.o.size))for(n=e.u;n;){for(;n.length>3;)n.pop()();if(n[1]<n[0])break;e.u=n=n[2]}};function de(e){return this.getChildContext=function(){return e.context},e.children}function he(e){var t=this,n=e.i;t.componentWillUnmount=function(){O(null,t.l),t.l=null,t.i=null},t.i&&t.i!==n&&t.componentWillUnmount(),e.__v?(t.l||(t.i=n,t.l={nodeType:1,parentNode:n,childNodes:[],appendChild:function(e){this.childNodes.push(e),t.i.appendChild(e)},insertBefore:function(e,n){this.childNodes.push(e),t.i.appendChild(e)},removeChild:function(e){this.childNodes.splice(this.childNodes.indexOf(e)>>>1,1),t.i.removeChild(e)}}),O(u(de,{context:t.context},e.__v),t.l)):t.l&&t.componentWillUnmount()}(pe.prototype=new d).__e=function(e){var t=this,n=ue(t.__v),o=t.o.get(e);return o[0]++,function(r){var i=function(){t.props.revealOrder?(o.push(r),fe(t,e,o)):r()};n?n(i):i()}},pe.prototype.render=function(e){this.u=null,this.o=new Map;var t=w(e.children);e.revealOrder&&"b"===e.revealOrder[0]&&t.reverse();for(var n=t.length;n--;)this.o.set(t[n],this.u=[1,0,this.u]);return e.children},pe.prototype.componentDidUpdate=pe.prototype.componentDidMount=function(){var e=this;this.o.forEach((function(t,n){fe(e,n,t)}))};var me="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,ve=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,ye="undefined"!=typeof document,ge=function(e){return("undefined"!=typeof Symbol&&"symbol"==typeof Symbol()?/fil|che|rad/i:/fil|che|ra/i).test(e)};d.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach((function(e){Object.defineProperty(d.prototype,e,{configurable:!0,get:function(){return this["UNSAFE_"+e]},set:function(t){Object.defineProperty(this,e,{configurable:!0,writable:!0,value:t})}})}));var be=t.event;function we(){}function ke(){return this.cancelBubble}function Ce(){return this.defaultPrevented}t.event=function(e){return be&&(e=be(e)),e.persist=we,e.isPropagationStopped=ke,e.isDefaultPrevented=Ce,e.nativeEvent=e};var xe={configurable:!0,get:function(){return this.class}},Pe=t.vnode;t.vnode=function(e){var t=e.type,n=e.props,o=n;if("string"==typeof t){var r=-1===t.indexOf("-");for(var i in o={},n){var l=n[i];ye&&"children"===i&&"noscript"===t||"value"===i&&"defaultValue"in n&&null==l||("defaultValue"===i&&"value"in n&&null==n.value?i="value":"download"===i&&!0===l?l="":/ondoubleclick/i.test(i)?i="ondblclick":/^onchange(textarea|input)/i.test(i+t)&&!ge(n.type)?i="oninput":/^onfocus$/i.test(i)?i="onfocusin":/^onblur$/i.test(i)?i="onfocusout":/^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(i)?i=i.toLowerCase():r&&ve.test(i)?i=i.replace(/[A-Z0-9]/,"-$&").toLowerCase():null===l&&(l=void 0),o[i]=l)}"select"==t&&o.multiple&&Array.isArray(o.value)&&(o.value=w(n.children).forEach((function(e){e.props.selected=-1!=o.value.indexOf(e.props.value)}))),"select"==t&&null!=o.defaultValue&&(o.value=w(n.children).forEach((function(e){e.props.selected=o.multiple?-1!=o.defaultValue.indexOf(e.props.value):o.defaultValue==e.props.value}))),e.props=o,n.class!=n.className&&(xe.enumerable="className"in n,null!=n.className&&(o.class=n.className),Object.defineProperty(o,"className",xe))}e.$$typeof=me,Pe&&Pe(e)};var Se=t.__r;t.__r=function(e){Se&&Se(e),e.__c};const Ee=e=>[()=>GM_getValue(e),t=>{GM_setValue(e,t)},()=>{GM_deleteValue(e)}],[Ue,Le,He]=Ee("token"),[Ne,Me,Oe]=Ee("username");class Ie extends Error{constructor(){super("No credentials provided.")}}class Ae extends Error{constructor(){super("Invalid credentials.")}}class De extends Error{constructor(e){super(`${e} not included`)}}class Te{static extend(e){return e(Te),Te}baseUrl="https://moodle.ksasz.ch";credentials={token:Ue(),username:Ne()};#e=new Map;_readCache(e){return this.#e.get(e)}_writeCache(e,t){return this.#e.set(e,t),t}async login(e){const{credentials:t}=this;if(e&&(t.username=e.username,t.password=e.password,Me(e.username)),t.token)return t.token;const{username:n,password:o}=t;if(!n||!o)throw new Ie;const r=new URLSearchParams({username:n,password:o,service:"moodle_mobile_app"}),i=await fetch(`${this.baseUrl}/login/token.php`,{method:"POST",body:r.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}});if(!i.ok)throw new Error(`Response was not ok: ${i.status}`);const l=await i.json();if("errorcode"in l)throw this.logout(),new Ae;const{token:_}=l;return Le(_),t.token=_,_}logout(){delete this.credentials.token,He(),delete this.credentials.password}async getCourses(e){throw new De("getCourses")}async getUserId(){throw new De("getUserId")}async popupLogin(e){throw new De("popupLogin")}async getCourseContent(e,t){throw new De("getCourseContent")}}Symbol("getUserId"),Symbol("getCourses");const Re=({cb:e,title:t,moodle:n})=>{const o=X(null),r=X(null),[i,l]=J(!0),[_,s]=J({username:!0,password:!0});return i?u("div",{class:"vertical-horizontal-center"},u("form",{onSubmit:async t=>{t.preventDefault(),t.stopImmediatePropagation();const i=o.current?.value.trim(),_=r.current?.value;if(s({password:Boolean(_),username:Boolean(i)}),i&&_){l(!1);try{const t=await n.login({username:i,password:_});e(t)}catch{l(!0)}}}},u("div",{class:"card shadow"},u("div",{class:"card-body"},u("h5",{class:"card-title"},"Login - ",t),u("div",{class:"mb-3"},u("label",{htmlFor:"popup-username",class:"form-label"},"Username"),u("input",{ref:o,required:!0,defaultValue:Ne(),id:"popup-username",placeholder:"Username",class:"form-control"+(_.username?"":" is-invalid"),onInput:()=>{s((e=>({...e,username:!0})))}})),u("div",{class:"mb-3"},u("label",{htmlFor:"popup-password",class:"form-label"},"Password"),u("input",{ref:r,required:!0,id:"popup-password",placeholder:"Password",class:"form-control"+(_.password?"":" is-invalid"),type:"password",onInput:()=>{s((e=>({...e,password:!0})))}}))),u("button",{class:"btn btn-primary",type:"submit"},"Login")))):null},Ve=async function(e){return new Promise((t=>{const n=GM_addStyle(".login-popup-userscript .vertical-horizontal-center{width:100%;height:100%;position:fixed;z-index:100000000;top:0;left:0;display:flex;align-items:center;justify-content:center;pointer-events:none}.login-popup-userscript .card{pointer-events:auto}"),o=document.createElement("div");o.className="login-popup-userscript",document.body.append(o),O(u(Re,{cb:e=>{O(null,o),n.remove(),o.remove(),t(e)},title:e,moodle:this}),o)}))},$e=Symbol("getCourseContent");async function We(e,t=!1){e=String(e);const n=this._readCache($e)??{},o=n[e];if(o&&!t)return o;const r=await this.login(),i=new URLSearchParams({courseid:e,"options[0][name]":"includestealthmodules","options[0][value]":"1",moodlewsrestformat:"json",wsfunction:"core_course_get_contents",wstoken:r}),l=await fetch(`${this.baseUrl}/webservice/rest/server.php`,{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:i.toString()});if(!l.ok)throw new Error(`Response was not ok: ${l.status}`);const _=await l.json();if("exception"in _)throw this.logout(),new Error("Invalid token");return n[e]=_,this._writeCache($e,n),_}const Fe={"application/pdf":"pdf-256","application/zip":"archive-256","application/vnd.openxmlformats-officedocument.wordprocessingml.document":"document-256","application/msword":"document-256","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"spreadsheet-256","application/vnd.ms-excel":"spreadsheet-256","application/vnd.openxmlformats-officedocument.presentationml.presentation":"powerpoint-256","application/vnd.ms-powerpoint":"powerpoint-256","text/plain":"sourcecode-256","audio/mp3":"mp3-256","audio/mp4":"mp3-256","video/quicktime":"quicktime-256","video/mp4":"mpeg-256"},je=(e,t)=>{const n=Fe[e];return n?`/theme/image.php/classic/core/1601902087/f/${n}`:t};Te.extend((e=>{e.prototype.popupLogin=Ve})).extend((e=>{e.prototype.getCourseContent=We}));const Ge=new Te,ze=({onClick:e})=>u("span",{style:{marginLeft:5},class:"svg-refresh-hitbox",onClick:t=>{t.stopPropagation(),t.preventDefault(),e()}},u("svg",{fill:"currentColor","aria-hidden":"true",class:"icon navicon svg-refresh",viewBox:"0 0 512 512"},u("path",{d:"M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"}))),Be=({isHidden:e,base:t,handleClick:n})=>u("div",{class:"fp-filename-icon folders-inline-icon",onClick:n},u("div",{class:"folders-inline-icon-div"},u("i",{class:`icon fa ${e?"fa-caret-right":"fa-caret-down"} fa-fw navicon folders-inline-caret`}),u("img",{alt:"",class:"iconlarge activityicon",role:"presentation",title:t,"aria-hidden":"true",src:"/theme/image.php/classic/core/1601902087/f/folder-128"})),u("span",{class:"fp-filename"},t)),qe=({contents:e,directoryDepth:t=0,base:n,isParent:o=!1})=>{const[r,i]=J(!o),l={};for(const n of e)if("isexternalfile"in n){const e=n.filePath[t]??"/";(l[e]??(l[e]=[])).push(n)}const _=l["/"];_?.sort(((e,t)=>I.compare(e.filename.trim(),t.filename.trim()))),delete l["/"];const s=Object.entries(l);s.sort((([e],[t])=>I.compare(e.trim(),t.trim())));const c=r&&!o;return u(f,null,!o&&u(Be,{isHidden:r,base:n,handleClick:e=>{e.stopPropagation(),i((e=>!e))}}),!c&&u("ul",{style:{listStyle:"none"}},s.map((([e,n])=>u("li",{key:e},u(qe,{contents:n,base:e,directoryDepth:t+1})))),_?.map((({fileUrl:e,filename:t,imgPath:n})=>u("li",{key:t},u("span",{class:"fp-filename-icon"},u("a",{href:e},u("span",{class:"fp-icon"},u("img",{alt:"",title:t,src:n})),u("span",{class:"fp-filename"},t))))))))},Ze=({folderId:e,sectionId:t,anchor:n})=>{const[o,r]=J(void 0),[i,l]=J(!1);Q((()=>{const e=e=>{e.preventDefault(),e.stopImmediatePropagation(),l((e=>!e))};return n.addEventListener("click",e),()=>{n.removeEventListener("click",e)}}),[n]);const _=async(e,t,n)=>{const o=await(async(e,t,n)=>{const o=await(async e=>{const t=new URLSearchParams(location.search),n=t.get("id");if(!n)return console.error('Could not extract courseId "%s"',t),!1;try{return await Ge.getCourseContent(n,e)}catch{return await Ge.popupLogin("Open folders inline"),Ge.getCourseContent(n,e)}})(n);if(!1===o)return!1;const r=o.find((({id:t})=>t===Number(e)));if(!r)return console.error("Could not find sectionObject."),!1;const{modules:i}=r,l=i.find((({id:e,modname:n})=>"folder"===n&&e===Number(t)));if(!l)return console.error("Could not find folderObject."),!1;const{contents:_}=l,s=[];for(const e of _)if("file"===e.type){const{filepath:t,mimetype:n}=e,o=new URL(e.fileurl,"https://moodle.ksasz.ch");o.pathname=o.pathname.replace(/^\/webservice/,"");const r=new URL(o.href);n?.startsWith("image")||r.searchParams.set("preview","1"),s.push({...e,filePath:(c=t,c.trim().split(/\/+/).filter(Boolean)),imgPath:je(n,r.href),fileUrl:o.href})}var c;return s})(t,e,n);o&&r(o)};return Q((()=>{_(e,t)}),[e,t]),i?null:o?u(f,null,0===o.length?u("div",{class:"folder-empty"},"The folder was empty"):u(qe,{isParent:!0,contents:o}),void 0!==o&&function(e,t){var n=u(he,{__v:e,i:t});return n.containerInfo=t,n}(u(ze,{onClick:()=>{r(void 0),_(e,t,!0)}}),n)):u("div",{class:"folder-loading"},"Loading")};
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
(e=>{try{(e=>{const t=GM_getValue(R),n=void 0===t?[-1,-1,-1]:A(t),o=Object.entries(e).map((([e,t])=>[A(e),t])).sort((([e],[t])=>T(e,t)));for(const[e,t]of o)T(n,e)<0&&t();GM_setValue(R,GM_info.script.version)})(e)}catch(e){console.error("Upgrading threw %o. Failing silently.",e)}})({"1.2.0":()=>{GM_deleteValue("lastValidatedToken"),GM_deleteValue("password")}}),GM_addStyle('@keyframes folder-loading-dots{0%{content:""}33%{content:"."}67%{content:".."}to{content:"..."}}div.folders-inline-icon{cursor:pointer;user-select:none}div.folders-inline-icon-div{display:inline}.folder-parent li{margin-left:24px;padding-left:none}.folder-empty,.folder-loading{margin-left:calc(1rem + 24px)}.folder-loading::after{content:"";animation:folder-loading-dots .6s infinite linear alternate}');const Ke=e=>{if(e.ctrlKey)return;if(!(e.target instanceof Element))return;const t=e.target.closest("a");if("/mod/folder/view.php"!==t?.pathname)return;const n=t.closest("li.activity.folder");if(!n)return;const o=/\d+$/.exec(n.id)?.[0];if(!o)return void console.error("Could not get folderId.");const r=t.closest("li.section.main")?.getAttribute("aria-labelledby")?.match(/-(\d+)-/)?.[1];if(!r)return void console.error("sectionId was undefined.");e.preventDefault();const i=document.createElement("span");i.className="folder-parent",O(u(Ze,{sectionId:r,folderId:o,anchor:t}),i),n.append(i)};var Je;Je=()=>{document.querySelector("div.course-content > ul.topics")?.addEventListener("click",Ke)},"undefined"!=typeof document&&("complete"!==document.readyState&&"interactive"!==document.readyState?document.addEventListener("DOMContentLoaded",Je):Je())})();