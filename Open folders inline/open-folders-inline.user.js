(()=>{"use strict";var e,t,n,o,r,i={},_=[],l=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function s(e,t){for(var n in t)e[n]=t[n];return e}function c(e){var t=e.parentNode;t&&t.removeChild(e)}function a(t,n,o){var r,i,_,l={};for(_ in n)"key"==_?r=n[_]:"ref"==_?i=n[_]:l[_]=n[_];if(arguments.length>2&&(l.children=arguments.length>3?e.call(arguments,2):o),"function"==typeof t&&null!=t.defaultProps)for(_ in t.defaultProps)void 0===l[_]&&(l[_]=t.defaultProps[_]);return u(t,l,r,i,null)}function u(e,o,r,i,_){var l={type:e,props:o,key:r,ref:i,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==_?++n:_};return null==_&&null!=t.vnode&&t.vnode(l),l}function p(e){return e.children}function f(e,t){this.props=e,this.context=t}function d(e,t){if(null==t)return e.__?d(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?d(e):null}function h(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return h(e)}}function m(e){(!e.__d&&(e.__d=!0)&&o.push(e)&&!v.__r++||r!==t.debounceRendering)&&((r=t.debounceRendering)||setTimeout)(v)}function v(){for(var e;v.__r=o.length;)e=o.sort((function(e,t){return e.__v.__b-t.__v.__b})),o=[],e.some((function(e){var t,n,o,r,i,_;e.__d&&(i=(r=(t=e).__v).__e,(_=t.__P)&&(n=[],(o=s({},r)).__v=r.__v+1,P(_,r,o,t.__n,void 0!==_.ownerSVGElement,null!=r.__h?[i]:null,n,null==i?d(r):i,r.__h),U(n,r),r.__e!=i&&h(r)))}))}function y(e,t,n,o,r,l,s,c,a,f){var h,m,v,y,b,k,C,x=o&&o.__k||_,S=x.length;for(n.__k=[],h=0;h<t.length;h++)if(null!=(y=n.__k[h]=null==(y=t[h])||"boolean"==typeof y?null:"string"==typeof y||"number"==typeof y||"bigint"==typeof y?u(null,y,null,null,y):Array.isArray(y)?u(p,{children:y},null,null,null):y.__b>0?u(y.type,y.props,y.key,y.ref?y.ref:null,y.__v):y)){if(y.__=n,y.__b=n.__b+1,null===(v=x[h])||v&&y.key==v.key&&y.type===v.type)x[h]=void 0;else for(m=0;m<S;m++){if((v=x[m])&&y.key==v.key&&y.type===v.type){x[m]=void 0;break}v=null}P(e,y,v=v||i,r,l,s,c,a,f),b=y.__e,(m=y.ref)&&v.ref!=m&&(C||(C=[]),v.ref&&C.push(v.ref,null,y),C.push(m,y.__c||b,y)),null!=b?(null==k&&(k=b),"function"==typeof y.type&&y.__k===v.__k?y.__d=a=g(y,a,e):a=w(e,y,v,x,b,a),"function"==typeof n.type&&(n.__d=a)):a&&v.__e==a&&a.parentNode!=e&&(a=d(v))}for(n.__e=k,h=S;h--;)null!=x[h]&&N(x[h],x[h]);if(C)for(h=0;h<C.length;h++)L(C[h],C[++h],C[++h])}function g(e,t,n){for(var o,r=e.__k,i=0;r&&i<r.length;i++)(o=r[i])&&(o.__=e,t="function"==typeof o.type?g(o,t,n):w(n,o,o,r,o.__e,t));return t}function b(e,t){return t=t||[],null==e||"boolean"==typeof e||(Array.isArray(e)?e.some((function(e){b(e,t)})):t.push(e)),t}function w(e,t,n,o,r,i){var _,l,s;if(void 0!==t.__d)_=t.__d,t.__d=void 0;else if(null==n||r!=i||null==r.parentNode)e:if(null==i||i.parentNode!==e)e.appendChild(r),_=null;else{for(l=i,s=0;(l=l.nextSibling)&&s<o.length;s+=1)if(l==r)break e;e.insertBefore(r,i),_=i}return void 0!==_?_:r.nextSibling}function k(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]=null==n?"":"number"!=typeof n||l.test(t)?n:n+"px"}function C(e,t,n,o,r){var i;e:if("style"===t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof o&&(e.style.cssText=o=""),o)for(t in o)n&&t in n||k(e.style,t,"");if(n)for(t in n)o&&n[t]===o[t]||k(e.style,t,n[t])}else if("o"===t[0]&&"n"===t[1])i=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+i]=n,n?o||e.addEventListener(t,i?S:x,i):e.removeEventListener(t,i?S:x,i);else if("dangerouslySetInnerHTML"!==t){if(r)t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("href"!==t&&"list"!==t&&"form"!==t&&"tabIndex"!==t&&"download"!==t&&t in e)try{e[t]=null==n?"":n;break e}catch(e){}"function"==typeof n||(null==n||!1===n&&-1==t.indexOf("-")?e.removeAttribute(t):e.setAttribute(t,n))}}function x(e){this.l[e.type+!1](t.event?t.event(e):e)}function S(e){this.l[e.type+!0](t.event?t.event(e):e)}function P(e,n,o,r,i,_,l,c,a){var u,d,h,m,v,g,b,w,k,C,x,S,P,U,L,N=n.type;if(void 0!==n.constructor)return null;null!=o.__h&&(a=o.__h,c=n.__e=o.__e,n.__h=null,_=[c]),(u=t.__b)&&u(n);try{e:if("function"==typeof N){if(w=n.props,k=(u=N.contextType)&&r[u.__c],C=u?k?k.props.value:u.__:r,o.__c?b=(d=n.__c=o.__c).__=d.__E:("prototype"in N&&N.prototype.render?n.__c=d=new N(w,C):(n.__c=d=new f(w,C),d.constructor=N,d.render=H),k&&k.sub(d),d.props=w,d.state||(d.state={}),d.context=C,d.__n=r,h=d.__d=!0,d.__h=[],d._sb=[]),null==d.__s&&(d.__s=d.state),null!=N.getDerivedStateFromProps&&(d.__s==d.state&&(d.__s=s({},d.__s)),s(d.__s,N.getDerivedStateFromProps(w,d.__s))),m=d.props,v=d.state,h)null==N.getDerivedStateFromProps&&null!=d.componentWillMount&&d.componentWillMount(),null!=d.componentDidMount&&d.__h.push(d.componentDidMount);else{if(null==N.getDerivedStateFromProps&&w!==m&&null!=d.componentWillReceiveProps&&d.componentWillReceiveProps(w,C),!d.__e&&null!=d.shouldComponentUpdate&&!1===d.shouldComponentUpdate(w,d.__s,C)||n.__v===o.__v){for(d.props=w,d.state=d.__s,n.__v!==o.__v&&(d.__d=!1),d.__v=n,n.__e=o.__e,n.__k=o.__k,n.__k.forEach((function(e){e&&(e.__=n)})),x=0;x<d._sb.length;x++)d.__h.push(d._sb[x]);d._sb=[],d.__h.length&&l.push(d);break e}null!=d.componentWillUpdate&&d.componentWillUpdate(w,d.__s,C),null!=d.componentDidUpdate&&d.__h.push((function(){d.componentDidUpdate(m,v,g)}))}if(d.context=C,d.props=w,d.__v=n,d.__P=e,S=t.__r,P=0,"prototype"in N&&N.prototype.render){for(d.state=d.__s,d.__d=!1,S&&S(n),u=d.render(d.props,d.state,d.context),U=0;U<d._sb.length;U++)d.__h.push(d._sb[U]);d._sb=[]}else do{d.__d=!1,S&&S(n),u=d.render(d.props,d.state,d.context),d.state=d.__s}while(d.__d&&++P<25);d.state=d.__s,null!=d.getChildContext&&(r=s(s({},r),d.getChildContext())),h||null==d.getSnapshotBeforeUpdate||(g=d.getSnapshotBeforeUpdate(m,v)),L=null!=u&&u.type===p&&null==u.key?u.props.children:u,y(e,Array.isArray(L)?L:[L],n,o,r,i,_,l,c,a),d.base=n.__e,n.__h=null,d.__h.length&&l.push(d),b&&(d.__E=d.__=null),d.__e=!1}else null==_&&n.__v===o.__v?(n.__k=o.__k,n.__e=o.__e):n.__e=E(o.__e,n,o,r,i,_,l,a);(u=t.diffed)&&u(n)}catch(e){n.__v=null,(a||null!=_)&&(n.__e=c,n.__h=!!a,_[_.indexOf(c)]=null),t.__e(e,n,o)}}function U(e,n){t.__c&&t.__c(n,e),e.some((function(n){try{e=n.__h,n.__h=[],e.some((function(e){e.call(n)}))}catch(e){t.__e(e,n.__v)}}))}function E(t,n,o,r,_,l,s,a){var u,p,f,h=o.props,m=n.props,v=n.type,g=0;if("svg"===v&&(_=!0),null!=l)for(;g<l.length;g++)if((u=l[g])&&"setAttribute"in u==!!v&&(v?u.localName===v:3===u.nodeType)){t=u,l[g]=null;break}if(null==t){if(null===v)return document.createTextNode(m);t=_?document.createElementNS("http://www.w3.org/2000/svg",v):document.createElement(v,m.is&&m),l=null,a=!1}if(null===v)h===m||a&&t.data===m||(t.data=m);else{if(l=l&&e.call(t.childNodes),p=(h=o.props||i).dangerouslySetInnerHTML,f=m.dangerouslySetInnerHTML,!a){if(null!=l)for(h={},g=0;g<t.attributes.length;g++)h[t.attributes[g].name]=t.attributes[g].value;(f||p)&&(f&&(p&&f.__html==p.__html||f.__html===t.innerHTML)||(t.innerHTML=f&&f.__html||""))}if(function(e,t,n,o,r){var i;for(i in n)"children"===i||"key"===i||i in t||C(e,i,null,n[i],o);for(i in t)r&&"function"!=typeof t[i]||"children"===i||"key"===i||"value"===i||"checked"===i||n[i]===t[i]||C(e,i,t[i],n[i],o)}(t,m,h,_,a),f)n.__k=[];else if(g=n.props.children,y(t,Array.isArray(g)?g:[g],n,o,r,_&&"foreignObject"!==v,l,s,l?l[0]:o.__k&&d(o,0),a),null!=l)for(g=l.length;g--;)null!=l[g]&&c(l[g]);a||("value"in m&&void 0!==(g=m.value)&&(g!==t.value||"progress"===v&&!g||"option"===v&&g!==h.value)&&C(t,"value",g,h.value,!1),"checked"in m&&void 0!==(g=m.checked)&&g!==t.checked&&C(t,"checked",g,h.checked,!1))}return t}function L(e,n,o){try{"function"==typeof e?e(n):e.current=n}catch(e){t.__e(e,o)}}function N(e,n,o){var r,i;if(t.unmount&&t.unmount(e),(r=e.ref)&&(r.current&&r.current!==e.__e||L(r,null,n)),null!=(r=e.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(e){t.__e(e,n)}r.base=r.__P=null,e.__c=void 0}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&N(r[i],n,o||"function"!=typeof e.type);o||null==e.__e||c(e.__e),e.__=e.__e=e.__d=void 0}function H(e,t,n){return this.constructor(e,n)}function O(n,o,r){var _,l,s;t.__&&t.__(n,o),l=(_="function"==typeof r)?null:r&&r.__k||o.__k,s=[],P(o,n=(!_&&r||o).__k=a(p,null,[n]),l||i,i,void 0!==o.ownerSVGElement,!_&&r?[r]:l?null:o.firstChild?e.call(o.childNodes):null,s,!_&&r?r:l?l.__e:o.firstChild,_),U(s,n)}e=_.slice,t={__e:function(e,t,n,o){for(var r,i,_;t=t.__;)if((r=t.__c)&&!r.__)try{if((i=r.constructor)&&null!=i.getDerivedStateFromError&&(r.setState(i.getDerivedStateFromError(e)),_=r.__d),null!=r.componentDidCatch&&(r.componentDidCatch(e,o||{}),_=r.__d),_)return r.__E=r}catch(t){e=t}throw e}},n=0,f.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=s({},this.state),"function"==typeof e&&(e=e(s({},n),this.props)),e&&s(n,e),null!=e&&this.__v&&(t&&this._sb.push(t),m(this))},f.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),m(this))},f.prototype.render=p,o=[],v.__r=0;const M=new Intl.Collator(void 0,{sensitivity:"base",numeric:!0}),A=e=>{if(!/^\d+\.\d+\.\d+$/.test(e))throw new Error(`Invalid version: ${e}.`);const[t,n,o]=e.split(".").map(Number);return[t,n,o]},R=(e,t)=>e-t,V=(e,t)=>R(e[0],t[0])||R(e[1],t[1])||R(e[2],t[2]),D="lastUpgraded";var I,T,W,$,F=0,B=[],j=[],G=t.__b,q=t.__r,z=t.diffed,K=t.__c,Z=t.unmount;function J(e,n){t.__h&&t.__h(T,e,F||n),F=0;var o=T.__H||(T.__H={__:[],__h:[]});return e>=o.__.length&&o.__.push({__V:j}),o.__[e]}function Q(e){return F=1,X(se,e)}function X(e,t,n){var o=J(I++,2);if(o.t=e,!o.__c&&(o.__=[n?n(t):se(void 0,t),function(e){var t=o.__N?o.__N[0]:o.__[0],n=o.t(t,e);t!==n&&(o.__N=[n,o.__[1]],o.__c.setState({}))}],o.__c=T,!T.u)){T.u=!0;var r=T.shouldComponentUpdate;T.shouldComponentUpdate=function(e,t,n){if(!o.__c.__H)return!0;var i=o.__c.__H.__.filter((function(e){return e.__c}));if(i.every((function(e){return!e.__N})))return!r||r.call(this,e,t,n);var _=!1;return i.forEach((function(e){if(e.__N){var t=e.__[0];e.__=e.__N,e.__N=void 0,t!==e.__[0]&&(_=!0)}})),!(!_&&o.__c.props===e)&&(!r||r.call(this,e,t,n))}}return o.__N||o.__}function Y(e,n){var o=J(I++,3);!t.__s&&le(o.__H,n)&&(o.__=e,o.i=n,T.__H.__h.push(o))}function ee(e){return F=5,te((function(){return{current:e}}),[])}function te(e,t){var n=J(I++,7);return le(n.__H,t)?(n.__V=e(),n.i=t,n.__h=e,n.__V):n.__}function ne(){for(var e;e=B.shift();)if(e.__P&&e.__H)try{e.__H.__h.forEach(ie),e.__H.__h.forEach(_e),e.__H.__h=[]}catch(n){e.__H.__h=[],t.__e(n,e.__v)}}t.__b=function(e){T=null,G&&G(e)},t.__r=function(e){q&&q(e),I=0;var t=(T=e.__c).__H;t&&(W===T?(t.__h=[],T.__h=[],t.__.forEach((function(e){e.__N&&(e.__=e.__N),e.__V=j,e.__N=e.i=void 0}))):(t.__h.forEach(ie),t.__h.forEach(_e),t.__h=[])),W=T},t.diffed=function(e){z&&z(e);var n=e.__c;n&&n.__H&&(n.__H.__h.length&&(1!==B.push(n)&&$===t.requestAnimationFrame||(($=t.requestAnimationFrame)||re)(ne)),n.__H.__.forEach((function(e){e.i&&(e.__H=e.i),e.__V!==j&&(e.__=e.__V),e.i=void 0,e.__V=j}))),W=T=null},t.__c=function(e,n){n.some((function(e){try{e.__h.forEach(ie),e.__h=e.__h.filter((function(e){return!e.__||_e(e)}))}catch(o){n.some((function(e){e.__h&&(e.__h=[])})),n=[],t.__e(o,e.__v)}})),K&&K(e,n)},t.unmount=function(e){Z&&Z(e);var n,o=e.__c;o&&o.__H&&(o.__H.__.forEach((function(e){try{ie(e)}catch(e){n=e}})),o.__H=void 0,n&&t.__e(n,o.__v))};var oe="function"==typeof requestAnimationFrame;function re(e){var t,n=function(){clearTimeout(o),oe&&cancelAnimationFrame(t),setTimeout(e)},o=setTimeout(n,100);oe&&(t=requestAnimationFrame(n))}function ie(e){var t=T,n=e.__c;"function"==typeof n&&(e.__c=void 0,n()),T=t}function _e(e){var t=T;e.__c=e.__(),T=t}function le(e,t){return!e||e.length!==t.length||t.some((function(t,n){return t!==e[n]}))}function se(e,t){return"function"==typeof t?t(e):t}function ce(e,t){for(var n in t)e[n]=t[n];return e}function ae(e,t){for(var n in e)if("__source"!==n&&!(n in t))return!0;for(var o in t)if("__source"!==o&&e[o]!==t[o])return!0;return!1}function ue(e){this.props=e}(ue.prototype=new f).isPureReactComponent=!0,ue.prototype.shouldComponentUpdate=function(e,t){return ae(this.props,e)||ae(this.state,t)};var pe=t.__b;t.__b=function(e){e.type&&e.type.__f&&e.ref&&(e.props.ref=e.ref,e.ref=null),pe&&pe(e)};"undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.forward_ref");var fe=t.__e;t.__e=function(e,t,n,o){if(e.then)for(var r,i=t;i=i.__;)if((r=i.__c)&&r.__c)return null==t.__e&&(t.__e=n.__e,t.__k=n.__k),r.__c(e,t);fe(e,t,n,o)};var de=t.unmount;function he(e,t,n){return e&&(e.__c&&e.__c.__H&&(e.__c.__H.__.forEach((function(e){"function"==typeof e.__c&&e.__c()})),e.__c.__H=null),null!=(e=ce({},e)).__c&&(e.__c.__P===n&&(e.__c.__P=t),e.__c=null),e.__k=e.__k&&e.__k.map((function(e){return he(e,t,n)}))),e}function me(e,t,n){return e&&(e.__v=null,e.__k=e.__k&&e.__k.map((function(e){return me(e,t,n)})),e.__c&&e.__c.__P===t&&(e.__e&&n.insertBefore(e.__e,e.__d),e.__c.__e=!0,e.__c.__P=n)),e}function ve(){this.__u=0,this.t=null,this.__b=null}function ye(e){var t=e.__.__c;return t&&t.__a&&t.__a(e)}function ge(){this.u=null,this.o=null}t.unmount=function(e){var t=e.__c;t&&t.__R&&t.__R(),t&&!0===e.__h&&(e.type=null),de&&de(e)},(ve.prototype=new f).__c=function(e,t){var n=t.__c,o=this;null==o.t&&(o.t=[]),o.t.push(n);var r=ye(o.__v),i=!1,_=function(){i||(i=!0,n.__R=null,r?r(l):l())};n.__R=_;var l=function(){if(!--o.__u){if(o.state.__a){var e=o.state.__a;o.__v.__k[0]=me(e,e.__c.__P,e.__c.__O)}var t;for(o.setState({__a:o.__b=null});t=o.t.pop();)t.forceUpdate()}},s=!0===t.__h;o.__u++||s||o.setState({__a:o.__b=o.__v.__k[0]}),e.then(_,_)},ve.prototype.componentWillUnmount=function(){this.t=[]},ve.prototype.render=function(e,t){if(this.__b){if(this.__v.__k){var n=document.createElement("div"),o=this.__v.__k[0].__c;this.__v.__k[0]=he(this.__b,n,o.__O=o.__P)}this.__b=null}var r=t.__a&&a(p,null,e.fallback);return r&&(r.__h=null),[a(p,null,t.__a?null:e.children),r]};var be=function(e,t,n){if(++n[1]===n[0]&&e.o.delete(t),e.props.revealOrder&&("t"!==e.props.revealOrder[0]||!e.o.size))for(n=e.u;n;){for(;n.length>3;)n.pop()();if(n[1]<n[0])break;e.u=n=n[2]}};function we(e){return this.getChildContext=function(){return e.context},e.children}function ke(e){var t=this,n=e.i;t.componentWillUnmount=function(){O(null,t.l),t.l=null,t.i=null},t.i&&t.i!==n&&t.componentWillUnmount(),e.__v?(t.l||(t.i=n,t.l={nodeType:1,parentNode:n,childNodes:[],appendChild:function(e){this.childNodes.push(e),t.i.appendChild(e)},insertBefore:function(e,n){this.childNodes.push(e),t.i.appendChild(e)},removeChild:function(e){this.childNodes.splice(this.childNodes.indexOf(e)>>>1,1),t.i.removeChild(e)}}),O(a(we,{context:t.context},e.__v),t.l)):t.l&&t.componentWillUnmount()}function Ce(e,t){var n=a(ke,{__v:e,i:t});return n.containerInfo=t,n}(ge.prototype=new f).__a=function(e){var t=this,n=ye(t.__v),o=t.o.get(e);return o[0]++,function(r){var i=function(){t.props.revealOrder?(o.push(r),be(t,e,o)):r()};n?n(i):i()}},ge.prototype.render=function(e){this.u=null,this.o=new Map;var t=b(e.children);e.revealOrder&&"b"===e.revealOrder[0]&&t.reverse();for(var n=t.length;n--;)this.o.set(t[n],this.u=[1,0,this.u]);return e.children},ge.prototype.componentDidUpdate=ge.prototype.componentDidMount=function(){var e=this;this.o.forEach((function(t,n){be(e,n,t)}))};var xe="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,Se=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,Pe="undefined"!=typeof document,Ue=function(e){return("undefined"!=typeof Symbol&&"symbol"==typeof Symbol()?/fil|che|rad/i:/fil|che|ra/i).test(e)};f.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach((function(e){Object.defineProperty(f.prototype,e,{configurable:!0,get:function(){return this["UNSAFE_"+e]},set:function(t){Object.defineProperty(this,e,{configurable:!0,writable:!0,value:t})}})}));var Ee=t.event;function Le(){}function Ne(){return this.cancelBubble}function He(){return this.defaultPrevented}t.event=function(e){return Ee&&(e=Ee(e)),e.persist=Le,e.isPropagationStopped=Ne,e.isDefaultPrevented=He,e.nativeEvent=e};var Oe={configurable:!0,get:function(){return this.class}},Me=t.vnode;t.vnode=function(e){var t=e.type,n=e.props,o=n;if("string"==typeof t){var r=-1===t.indexOf("-");for(var i in o={},n){var _=n[i];Pe&&"children"===i&&"noscript"===t||"value"===i&&"defaultValue"in n&&null==_||("defaultValue"===i&&"value"in n&&null==n.value?i="value":"download"===i&&!0===_?_="":/ondoubleclick/i.test(i)?i="ondblclick":/^onchange(textarea|input)/i.test(i+t)&&!Ue(n.type)?i="oninput":/^onfocus$/i.test(i)?i="onfocusin":/^onblur$/i.test(i)?i="onfocusout":/^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(i)?i=i.toLowerCase():r&&Se.test(i)?i=i.replace(/[A-Z0-9]/g,"-$&").toLowerCase():null===_&&(_=void 0),/^oninput$/i.test(i)&&(i=i.toLowerCase(),o[i]&&(i="oninputCapture")),o[i]=_)}"select"==t&&o.multiple&&Array.isArray(o.value)&&(o.value=b(n.children).forEach((function(e){e.props.selected=-1!=o.value.indexOf(e.props.value)}))),"select"==t&&null!=o.defaultValue&&(o.value=b(n.children).forEach((function(e){e.props.selected=o.multiple?-1!=o.defaultValue.indexOf(e.props.value):o.defaultValue==e.props.value}))),e.props=o,n.class!=n.className&&(Oe.enumerable="className"in n,null!=n.className&&(o.class=n.className),Object.defineProperty(o,"className",Oe))}e.$$typeof=xe,Me&&Me(e)};var Ae=t.__r;t.__r=function(e){Ae&&Ae(e),e.__c};const Re=e=>[()=>GM_getValue(e),t=>{GM_setValue(e,t)},()=>{GM_deleteValue(e)}],[Ve,De,Ie]=Re("token"),[Te,We,$e]=Re("username"),Fe=Symbol("getCourseContent");async function Be(e,t=!1){e=String(e);const n=this._readCache(Fe)??{},o=n[e];if(o&&!t)return o;const r=await this.login(),i=new URLSearchParams({courseid:e,"options[0][name]":"includestealthmodules","options[0][value]":"1",moodlewsrestformat:"json",wsfunction:"core_course_get_contents",wstoken:r}),_=await fetch(this.resolveUrl("/webservice/rest/server.php"),{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:i.toString()});if(!_.ok)throw new Error(`Response was not ok: ${_.status}`);const l=await _.json();if("exception"in l)throw this.logout(),new Error("Invalid token");return n[e]=l,this._writeCache(Fe,n),l}Symbol("getUserId");Symbol("getCourses");class je extends Error{constructor(){super("No credentials provided.")}}class Ge extends Error{constructor(){super("Invalid credentials.")}}class qe extends Error{constructor(e){super(`${e} not included`)}}let ze=new URL("http://localhost/");"undefined"!=typeof location?ze=new URL("/",location.href):"undefined"!=typeof process&&"string"==typeof process.env.MOODLE_BASE_URL&&(ze=new URL(process.env.MOODLE_BASE_URL));class Ke{static extend(e){return e(Ke),Ke}baseUrl=ze;credentials={token:Ve(),username:Te()};#e=new Map;resolveUrl=e=>new URL(e,this.baseUrl);_readCache(e){return this.#e.get(e)}_writeCache(e,t){return this.#e.set(e,t),t}async login(e){const{credentials:t}=this;if(e&&(t.username=e.username,t.password=e.password,We(e.username)),t.token)return t.token;const{username:n,password:o}=t;if(!n||!o)throw new je;const r=new URLSearchParams({username:n,password:o,service:"moodle_mobile_app"}),i=await fetch(this.resolveUrl("/login/token.php"),{method:"POST",body:r.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}});if(!i.ok)throw new Error(`Response was not ok: ${i.status}`);const _=await i.json();if("errorcode"in _)throw this.logout(),new Ge;const{token:l}=_;return De(l),t.token=l,l}logout(){delete this.credentials.token,Ie(),delete this.credentials.password}async getCourses(e){throw new qe("getCourses")}async getUserId(){throw new qe("getUserId")}async popupLogin(e){throw new qe("popupLogin")}async getCourseContent(e,t){throw new qe("getCourseContent")}}const Ze=({cb:e,title:t,moodle:n})=>{const o=ee(null),r=ee(null),[i,_]=Q(!0),[l,s]=Q({username:!0,password:!0});return i?a("div",{class:"vertical-horizontal-center"},a("form",{onSubmit:async t=>{t.preventDefault(),t.stopImmediatePropagation();const i=o.current?.value.trim(),l=r.current?.value;if(s({password:Boolean(l),username:Boolean(i)}),i&&l){_(!1);try{const t=await n.login({username:i,password:l});e(t)}catch{_(!0)}}}},a("div",{class:"card shadow"},a("div",{class:"card-body"},a("h5",{class:"card-title"},"Login - ",t),a("div",{class:"mb-3"},a("label",{htmlFor:"popup-username",class:"form-label"},"Username"),a("input",{ref:o,required:!0,defaultValue:Te(),id:"popup-username",placeholder:"Username",class:"form-control"+(l.username?"":" is-invalid"),onInput:()=>{s((e=>({...e,username:!0})))}})),a("div",{class:"mb-3"},a("label",{htmlFor:"popup-password",class:"form-label"},"Password"),a("input",{ref:r,required:!0,id:"popup-password",placeholder:"Password",class:"form-control"+(l.password?"":" is-invalid"),type:"password",onInput:()=>{s((e=>({...e,password:!0})))}}))),a("button",{class:"btn btn-primary",type:"submit"},"Login")))):null},Je=async function(e){return new Promise((t=>{const n=GM_addStyle(".login-popup-userscript .vertical-horizontal-center{width:100%;height:100%;position:fixed;z-index:100000000;top:0;left:0;display:flex;align-items:center;justify-content:center;pointer-events:none}.login-popup-userscript .card{pointer-events:auto}"),o=document.createElement("div");o.className="login-popup-userscript",document.body.append(o),O(a(Ze,{cb:e=>{O(null,o),n.remove(),o.remove(),t(e)},title:e,moodle:this}),o)}))},Qe={"application/pdf":"pdf-256","application/zip":"archive-256","application/vnd.openxmlformats-officedocument.wordprocessingml.document":"document-256","application/msword":"document-256","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"spreadsheet-256","application/vnd.ms-excel":"spreadsheet-256","application/vnd.openxmlformats-officedocument.presentationml.presentation":"powerpoint-256","application/vnd.ms-powerpoint":"powerpoint-256","text/plain":"sourcecode-256","audio/mp3":"mp3-256","audio/mp4":"mp3-256","video/quicktime":"quicktime-256","video/mp4":"mpeg-256"},Xe=(e,t)=>{const n=Qe[e];return n?`/theme/image.php/classic/core/1601902087/f/${n}`:t};Ke.extend((e=>{e.prototype.popupLogin=Je})).extend((e=>{e.prototype.getCourseContent=Be}));const Ye=new Ke,et=async(e,t,n)=>{const o=await(async e=>{const t=new URLSearchParams(location.search),n=t.get("id");if(!n)return console.error('Could not extract courseId "%s"',t),!1;try{return await Ye.getCourseContent(n,e)}catch{return await Ye.popupLogin("Open folders inline"),Ye.getCourseContent(n,e)}})(n);if(!1===o)return!1;const r=o.find((({id:t})=>t===Number(e)));if(!r)return console.error("Could not find sectionObject."),!1;const{modules:i}=r,_=i.find((({id:e,modname:n})=>"folder"===n&&e===Number(t)));if(!_)return console.error("Could not find folderObject."),!1;const{contents:l}=_,s=[];for(const e of l)if("file"===e.type){const{filepath:t,mimetype:n}=e,o=Ye.resolveUrl(e.fileurl);o.pathname=o.pathname.replace(/^\/webservice/,"");const r=new URL(o.href);n?.startsWith("image")||r.searchParams.set("preview","1"),s.push({...e,filePath:(c=t,c.trim().split(/\/+/).filter(Boolean)),imgPath:Xe(n,r.href),fileUrl:o.href})}var c;return s},tt=({onClick:e})=>a("span",{style:{marginLeft:5},class:"svg-refresh-hitbox",onClick:t=>{t.stopPropagation(),t.preventDefault(),e()}},a("svg",{fill:"currentColor","aria-hidden":"true",class:"icon navicon svg-refresh",viewBox:"0 0 512 512"},a("path",{d:"M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"}))),nt=e=>{const t=new URL(e);return"1"===t.searchParams.get("forcedownload")&&t.searchParams.set("forcedownload","0"),t.href},ot=({isHidden:e,base:t,handleClick:n})=>a("div",{class:"fp-filename-icon folders-inline-icon",onClick:n},a("div",{class:"folders-inline-icon-div"},a("i",{class:`icon fa ${e?"fa-caret-right":"fa-caret-down"} fa-fw navicon folders-inline-caret`}),a("img",{alt:"",class:"iconlarge activityicon",role:"presentation",title:t,"aria-hidden":"true",src:"/theme/image.php/classic/core/1601902087/f/folder-128"})),a("span",{class:"fp-filename"},t)),rt=({contents:e,directoryDepth:t=0,base:n,isParent:o=!1})=>{const[r,i]=Q(!o),_={};for(const n of e)if("isexternalfile"in n){const e=n.filePath[t]??"/";(_[e]??(_[e]=[])).push(n)}const l=_["/"];l?.sort(((e,t)=>M.compare(e.filename.trim(),t.filename.trim()))),delete _["/"];const s=Object.entries(_);s.sort((([e],[t])=>M.compare(e.trim(),t.trim())));const c=r&&!o;return a(p,null,!o&&a(ot,{isHidden:r,base:n,handleClick:e=>{e.stopPropagation(),i((e=>!e))}}),!c&&a("ul",{style:{listStyle:"none"}},s.map((([e,n])=>a("li",{key:e},a(rt,{contents:n,base:e,directoryDepth:t+1})))),l?.map((({fileUrl:e,filename:t,imgPath:n})=>a("li",{key:t},a("span",{class:"fp-filename-icon"},a("a",{href:nt(e)},a("span",{class:"fp-icon"},a("img",{alt:"",title:t,src:n})),a("span",{class:"fp-filename"},t))))))))},it=({folderId:e,sectionId:t,anchor:n})=>{const[o,r]=Q(void 0),[i,_]=Q(!1);Y((()=>{const e=e=>{e.ctrlKey||(e.preventDefault(),e.stopImmediatePropagation(),_((e=>!e)))};return n.addEventListener("click",e),()=>{n.removeEventListener("click",e)}}),[n]);const l=async(e,t,n)=>{const o=await et(t,e,n);o&&r(o)};return Y((()=>{l(e,t)}),[e,t]),i?null:o?a(p,null,0===o.length?a("div",{class:"folder-empty"},"The folder was empty"):a(rt,{isParent:!0,contents:o}),Ce(a(tt,{onClick:()=>{r(void 0),l(e,t,!0)}}),n)):a("div",{class:"folder-loading"},"Loading")};
// ==UserScript==
// @name      Moodle open folders inline preact
// @version   3.0.0
// @author    lusc
// @match     *://moodle.*/course/view.php?id=*
// @match     *://moodle*.*/course/view.php?id=*
// @updateURL https://git.io/JXgvE
// @grant     GM_setValue
// @grant     GM_getValue
// @grant     GM_deleteValue
// @grant     GM_addStyle
// @run-at    document-start
// ==/UserScript==
(e=>{try{(e=>{const t=GM_getValue(D),n=void 0===t?[-1,-1,-1]:A(t),o=Object.entries(e).map((([e,t])=>[A(e),t])).sort((([e],[t])=>V(e,t)));for(const[e,t]of o)V(n,e)<0&&t();GM_setValue(D,GM_info.script.version)})(e)}catch(e){console.error("Upgrading threw %o. Failing silently.",e)}})({"1.2.0":()=>{GM_deleteValue("lastValidatedToken"),GM_deleteValue("password")}}),GM_addStyle('@keyframes folder-loading-dots{0%{content:""}33%{content:"."}67%{content:".."}to{content:"..."}}div.folders-inline-icon{cursor:pointer;user-select:none}div.folders-inline-icon-div{display:inline}.folder-parent li{margin-left:24px;padding-left:none}.folder-empty,.folder-loading{margin-left:calc(1rem + 24px)}.folder-loading::after{content:"";animation:folder-loading-dots .6s infinite linear alternate}');const _t=e=>{if(e.ctrlKey)return;if(!(e.target instanceof Element))return;const t=e.target.closest("a");if("/mod/folder/view.php"!==t?.pathname)return;const n=t.closest("li.activity.folder");if(!n)return;const o=/\d+$/.exec(n.id)?.[0];if(!o)return void console.error("Could not get folderId.");const r=t.closest("li.section.main")?.getAttribute("aria-labelledby")?.match(/-(\d+)-/)?.[1];if(!r)return void console.error("sectionId was undefined.");e.preventDefault();const i=document.createElement("span");i.className="folder-parent",O(a(it,{sectionId:r,folderId:o,anchor:t}),i),n.append(i)};var lt;lt=()=>{document.querySelector("div.course-content > ul.topics")?.addEventListener("click",_t)},"interactive"!==document.readyState&&"complete"!==document.readyState?document.addEventListener("DOMContentLoaded",lt,{once:!0}):lt()})();