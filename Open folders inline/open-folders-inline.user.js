(()=>{"use strict";var e,n,t,o,r,i,l={},_=[],s=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function c(e,n){for(var t in n)e[t]=n[t];return e}function a(e){var n=e.parentNode;n&&n.removeChild(e)}function u(n,t,o){var r,i,l,_={};for(l in t)"key"==l?r=t[l]:"ref"==l?i=t[l]:_[l]=t[l];if(arguments.length>2&&(_.children=arguments.length>3?e.call(arguments,2):o),"function"==typeof n&&null!=n.defaultProps)for(l in n.defaultProps)void 0===_[l]&&(_[l]=n.defaultProps[l]);return f(n,_,r,i,null)}function f(e,o,r,i,l){var _={type:e,props:o,key:r,ref:i,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==l?++t:l};return null==l&&null!=n.vnode&&n.vnode(_),_}function d(e){return e.children}function p(e,n){this.props=e,this.context=n}function h(e,n){if(null==n)return e.__?h(e.__,e.__.__k.indexOf(e)+1):null;for(var t;n<e.__k.length;n++)if(null!=(t=e.__k[n])&&null!=t.__e)return t.__e;return"function"==typeof e.type?h(e):null}function v(e){var n,t;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,n=0;n<e.__k.length;n++)if(null!=(t=e.__k[n])&&null!=t.__e){e.__e=e.__c.base=t.__e;break}return v(e)}}function m(e){(!e.__d&&(e.__d=!0)&&o.push(e)&&!y.__r++||r!==n.debounceRendering)&&((r=n.debounceRendering)||i)(y)}function y(){var e,n,t,r,i,l,_,s;for(o.sort((function(e,n){return e.__v.__b-n.__v.__b}));e=o.shift();)e.__d&&(n=o.length,r=void 0,i=void 0,_=(l=(t=e).__v).__e,(s=t.__P)&&(r=[],(i=c({},l)).__v=l.__v+1,E(s,l,i,t.__n,void 0!==s.ownerSVGElement,null!=l.__h?[_]:null,r,null==_?h(l):_,l.__h),L(r,l),l.__e!=_&&v(l)),o.length>n&&o.sort((function(e,n){return e.__v.__b-n.__v.__b})));y.__r=0}function g(e,n,t,o,r,i,s,c,a,u){var p,v,m,y,g,w,x,P=o&&o.__k||_,S=P.length;for(t.__k=[],p=0;p<n.length;p++)if(null!=(y=t.__k[p]=null==(y=n[p])||"boolean"==typeof y?null:"string"==typeof y||"number"==typeof y||"bigint"==typeof y?f(null,y,null,null,y):Array.isArray(y)?f(d,{children:y},null,null,null):y.__b>0?f(y.type,y.props,y.key,y.ref?y.ref:null,y.__v):y)){if(y.__=t,y.__b=t.__b+1,null===(m=P[p])||m&&y.key==m.key&&y.type===m.type)P[p]=void 0;else for(v=0;v<S;v++){if((m=P[v])&&y.key==m.key&&y.type===m.type){P[v]=void 0;break}m=null}E(e,y,m=m||l,r,i,s,c,a,u),g=y.__e,(v=y.ref)&&m.ref!=v&&(x||(x=[]),m.ref&&x.push(m.ref,null,y),x.push(v,y.__c||g,y)),null!=g?(null==w&&(w=g),"function"==typeof y.type&&y.__k===m.__k?y.__d=a=b(y,a,e):a=k(e,y,m,P,g,a),"function"==typeof t.type&&(t.__d=a)):a&&m.__e==a&&a.parentNode!=e&&(a=h(m))}for(t.__e=w,p=S;p--;)null!=P[p]&&("function"==typeof t.type&&null!=P[p].__e&&P[p].__e==t.__d&&(t.__d=C(o).nextSibling),O(P[p],P[p]));if(x)for(p=0;p<x.length;p++)H(x[p],x[++p],x[++p])}function b(e,n,t){for(var o,r=e.__k,i=0;r&&i<r.length;i++)(o=r[i])&&(o.__=e,n="function"==typeof o.type?b(o,n,t):k(t,o,o,r,o.__e,n));return n}function w(e,n){return n=n||[],null==e||"boolean"==typeof e||(Array.isArray(e)?e.some((function(e){w(e,n)})):n.push(e)),n}function k(e,n,t,o,r,i){var l,_,s;if(void 0!==n.__d)l=n.__d,n.__d=void 0;else if(null==t||r!=i||null==r.parentNode)e:if(null==i||i.parentNode!==e)e.appendChild(r),l=null;else{for(_=i,s=0;(_=_.nextSibling)&&s<o.length;s+=1)if(_==r)break e;e.insertBefore(r,i),l=i}return void 0!==l?l:r.nextSibling}function C(e){var n,t,o;if(null==e.type||"string"==typeof e.type)return e.__e;if(e.__k)for(n=e.__k.length-1;n>=0;n--)if((t=e.__k[n])&&(o=C(t)))return o;return null}function x(e,n,t){"-"===n[0]?e.setProperty(n,null==t?"":t):e[n]=null==t?"":"number"!=typeof t||s.test(n)?t:t+"px"}function P(e,n,t,o,r){var i;e:if("style"===n)if("string"==typeof t)e.style.cssText=t;else{if("string"==typeof o&&(e.style.cssText=o=""),o)for(n in o)t&&n in t||x(e.style,n,"");if(t)for(n in t)o&&t[n]===o[n]||x(e.style,n,t[n])}else if("o"===n[0]&&"n"===n[1])i=n!==(n=n.replace(/Capture$/,"")),n=n.toLowerCase()in e?n.toLowerCase().slice(2):n.slice(2),e.l||(e.l={}),e.l[n+i]=t,t?o||e.addEventListener(n,i?U:S,i):e.removeEventListener(n,i?U:S,i);else if("dangerouslySetInnerHTML"!==n){if(r)n=n.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("width"!==n&&"height"!==n&&"href"!==n&&"list"!==n&&"form"!==n&&"tabIndex"!==n&&"download"!==n&&n in e)try{e[n]=null==t?"":t;break e}catch(e){}"function"==typeof t||(null==t||!1===t&&-1==n.indexOf("-")?e.removeAttribute(n):e.setAttribute(n,t))}}function S(e){return this.l[e.type+!1](n.event?n.event(e):e)}function U(e){return this.l[e.type+!0](n.event?n.event(e):e)}function E(e,t,o,r,i,l,_,s,a){var u,f,h,v,m,y,b,w,k,C,x,P,S,U,E,L=t.type;if(void 0!==t.constructor)return null;null!=o.__h&&(a=o.__h,s=t.__e=o.__e,t.__h=null,l=[s]),(u=n.__b)&&u(t);try{e:if("function"==typeof L){if(w=t.props,k=(u=L.contextType)&&r[u.__c],C=u?k?k.props.value:u.__:r,o.__c?b=(f=t.__c=o.__c).__=f.__E:("prototype"in L&&L.prototype.render?t.__c=f=new L(w,C):(t.__c=f=new p(w,C),f.constructor=L,f.render=M),k&&k.sub(f),f.props=w,f.state||(f.state={}),f.context=C,f.__n=r,h=f.__d=!0,f.__h=[],f._sb=[]),null==f.__s&&(f.__s=f.state),null!=L.getDerivedStateFromProps&&(f.__s==f.state&&(f.__s=c({},f.__s)),c(f.__s,L.getDerivedStateFromProps(w,f.__s))),v=f.props,m=f.state,f.__v=t,h)null==L.getDerivedStateFromProps&&null!=f.componentWillMount&&f.componentWillMount(),null!=f.componentDidMount&&f.__h.push(f.componentDidMount);else{if(null==L.getDerivedStateFromProps&&w!==v&&null!=f.componentWillReceiveProps&&f.componentWillReceiveProps(w,C),!f.__e&&null!=f.shouldComponentUpdate&&!1===f.shouldComponentUpdate(w,f.__s,C)||t.__v===o.__v){for(t.__v!==o.__v&&(f.props=w,f.state=f.__s,f.__d=!1),f.__e=!1,t.__e=o.__e,t.__k=o.__k,t.__k.forEach((function(e){e&&(e.__=t)})),x=0;x<f._sb.length;x++)f.__h.push(f._sb[x]);f._sb=[],f.__h.length&&_.push(f);break e}null!=f.componentWillUpdate&&f.componentWillUpdate(w,f.__s,C),null!=f.componentDidUpdate&&f.__h.push((function(){f.componentDidUpdate(v,m,y)}))}if(f.context=C,f.props=w,f.__P=e,P=n.__r,S=0,"prototype"in L&&L.prototype.render){for(f.state=f.__s,f.__d=!1,P&&P(t),u=f.render(f.props,f.state,f.context),U=0;U<f._sb.length;U++)f.__h.push(f._sb[U]);f._sb=[]}else do{f.__d=!1,P&&P(t),u=f.render(f.props,f.state,f.context),f.state=f.__s}while(f.__d&&++S<25);f.state=f.__s,null!=f.getChildContext&&(r=c(c({},r),f.getChildContext())),h||null==f.getSnapshotBeforeUpdate||(y=f.getSnapshotBeforeUpdate(v,m)),E=null!=u&&u.type===d&&null==u.key?u.props.children:u,g(e,Array.isArray(E)?E:[E],t,o,r,i,l,_,s,a),f.base=t.__e,t.__h=null,f.__h.length&&_.push(f),b&&(f.__E=f.__=null),f.__e=!1}else null==l&&t.__v===o.__v?(t.__k=o.__k,t.__e=o.__e):t.__e=N(o.__e,t,o,r,i,l,_,a);(u=n.diffed)&&u(t)}catch(e){t.__v=null,(a||null!=l)&&(t.__e=s,t.__h=!!a,l[l.indexOf(s)]=null),n.__e(e,t,o)}}function L(e,t){n.__c&&n.__c(t,e),e.some((function(t){try{e=t.__h,t.__h=[],e.some((function(e){e.call(t)}))}catch(e){n.__e(e,t.__v)}}))}function N(n,t,o,r,i,_,s,c){var u,f,d,p=o.props,v=t.props,m=t.type,y=0;if("svg"===m&&(i=!0),null!=_)for(;y<_.length;y++)if((u=_[y])&&"setAttribute"in u==!!m&&(m?u.localName===m:3===u.nodeType)){n=u,_[y]=null;break}if(null==n){if(null===m)return document.createTextNode(v);n=i?document.createElementNS("http://www.w3.org/2000/svg",m):document.createElement(m,v.is&&v),_=null,c=!1}if(null===m)p===v||c&&n.data===v||(n.data=v);else{if(_=_&&e.call(n.childNodes),f=(p=o.props||l).dangerouslySetInnerHTML,d=v.dangerouslySetInnerHTML,!c){if(null!=_)for(p={},y=0;y<n.attributes.length;y++)p[n.attributes[y].name]=n.attributes[y].value;(d||f)&&(d&&(f&&d.__html==f.__html||d.__html===n.innerHTML)||(n.innerHTML=d&&d.__html||""))}if(function(e,n,t,o,r){var i;for(i in t)"children"===i||"key"===i||i in n||P(e,i,null,t[i],o);for(i in n)r&&"function"!=typeof n[i]||"children"===i||"key"===i||"value"===i||"checked"===i||t[i]===n[i]||P(e,i,n[i],t[i],o)}(n,v,p,i,c),d)t.__k=[];else if(y=t.props.children,g(n,Array.isArray(y)?y:[y],t,o,r,i&&"foreignObject"!==m,_,s,_?_[0]:o.__k&&h(o,0),c),null!=_)for(y=_.length;y--;)null!=_[y]&&a(_[y]);c||("value"in v&&void 0!==(y=v.value)&&(y!==n.value||"progress"===m&&!y||"option"===m&&y!==p.value)&&P(n,"value",y,p.value,!1),"checked"in v&&void 0!==(y=v.checked)&&y!==n.checked&&P(n,"checked",y,p.checked,!1))}return n}function H(e,t,o){try{"function"==typeof e?e(t):e.current=t}catch(e){n.__e(e,o)}}function O(e,t,o){var r,i;if(n.unmount&&n.unmount(e),(r=e.ref)&&(r.current&&r.current!==e.__e||H(r,null,t)),null!=(r=e.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(e){n.__e(e,t)}r.base=r.__P=null,e.__c=void 0}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&O(r[i],t,o||"function"!=typeof e.type);o||null==e.__e||a(e.__e),e.__=e.__e=e.__d=void 0}function M(e,n,t){return this.constructor(e,t)}function A(t,o,r){var i,_,s;n.__&&n.__(t,o),_=(i="function"==typeof r)?null:r&&r.__k||o.__k,s=[],E(o,t=(!i&&r||o).__k=u(d,null,[t]),_||l,l,void 0!==o.ownerSVGElement,!i&&r?[r]:_?null:o.firstChild?e.call(o.childNodes):null,s,!i&&r?r:_?_.__e:o.firstChild,i),L(s,t)}e=_.slice,n={__e:function(e,n,t,o){for(var r,i,l;n=n.__;)if((r=n.__c)&&!r.__)try{if((i=r.constructor)&&null!=i.getDerivedStateFromError&&(r.setState(i.getDerivedStateFromError(e)),l=r.__d),null!=r.componentDidCatch&&(r.componentDidCatch(e,o||{}),l=r.__d),l)return r.__E=r}catch(n){e=n}throw e}},t=0,p.prototype.setState=function(e,n){var t;t=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=c({},this.state),"function"==typeof e&&(e=e(c({},t),this.props)),e&&c(t,e),null!=e&&this.__v&&(n&&this._sb.push(n),m(this))},p.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),m(this))},p.prototype.render=d,o=[],i="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,y.__r=0;var R=0;function V(e,t,o,r,i,l){var _,s,c={};for(s in t)"ref"==s?_=t[s]:c[s]=t[s];var a={type:e,props:c,key:o,ref:_,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:--R,__source:i,__self:l};if("function"==typeof e&&(_=e.defaultProps))for(s in _)void 0===c[s]&&(c[s]=_[s]);return n.vnode&&n.vnode(a),a}const D=new Intl.Collator(void 0,{sensitivity:"base",numeric:!0}),I=e=>{if(!/^\d+\.\d+\.\d+$/.test(e))throw new Error(`Invalid version: ${e}.`);const[n,t,o]=e.split(".").map(Number);return[n,t,o]},T=(e,n)=>e-n,W=(e,n)=>T(e[0],n[0])||T(e[1],n[1])||T(e[2],n[2]),$="lastUpgraded";var F,B,j,G,q=0,z=[],K=[],Z=n.__b,J=n.__r,Q=n.diffed,X=n.__c,Y=n.unmount;function ee(e,t){n.__h&&n.__h(B,e,q||t),q=0;var o=B.__H||(B.__H={__:[],__h:[]});return e>=o.__.length&&o.__.push({__V:K}),o.__[e]}function ne(e){return q=1,te(fe,e)}function te(e,n,t){var o=ee(F++,2);if(o.t=e,!o.__c&&(o.__=[t?t(n):fe(void 0,n),function(e){var n=o.__N?o.__N[0]:o.__[0],t=o.t(n,e);n!==t&&(o.__N=[t,o.__[1]],o.__c.setState({}))}],o.__c=B,!B.u)){B.u=!0;var r=B.shouldComponentUpdate;B.shouldComponentUpdate=function(e,n,t){if(!o.__c.__H)return!0;var i=o.__c.__H.__.filter((function(e){return e.__c}));if(i.every((function(e){return!e.__N})))return!r||r.call(this,e,n,t);var l=!1;return i.forEach((function(e){if(e.__N){var n=e.__[0];e.__=e.__N,e.__N=void 0,n!==e.__[0]&&(l=!0)}})),!(!l&&o.__c.props===e)&&(!r||r.call(this,e,n,t))}}return o.__N||o.__}function oe(e,t){var o=ee(F++,3);!n.__s&&ue(o.__H,t)&&(o.__=e,o.i=t,B.__H.__h.push(o))}function re(e){return q=5,ie((function(){return{current:e}}),[])}function ie(e,n){var t=ee(F++,7);return ue(t.__H,n)?(t.__V=e(),t.i=n,t.__h=e,t.__V):t.__}function le(){for(var e;e=z.shift();)if(e.__P&&e.__H)try{e.__H.__h.forEach(ce),e.__H.__h.forEach(ae),e.__H.__h=[]}catch(t){e.__H.__h=[],n.__e(t,e.__v)}}n.__b=function(e){B=null,Z&&Z(e)},n.__r=function(e){J&&J(e),F=0;var n=(B=e.__c).__H;n&&(j===B?(n.__h=[],B.__h=[],n.__.forEach((function(e){e.__N&&(e.__=e.__N),e.__V=K,e.__N=e.i=void 0}))):(n.__h.forEach(ce),n.__h.forEach(ae),n.__h=[])),j=B},n.diffed=function(e){Q&&Q(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&(1!==z.push(t)&&G===n.requestAnimationFrame||((G=n.requestAnimationFrame)||se)(le)),t.__H.__.forEach((function(e){e.i&&(e.__H=e.i),e.__V!==K&&(e.__=e.__V),e.i=void 0,e.__V=K}))),j=B=null},n.__c=function(e,t){t.some((function(e){try{e.__h.forEach(ce),e.__h=e.__h.filter((function(e){return!e.__||ae(e)}))}catch(o){t.some((function(e){e.__h&&(e.__h=[])})),t=[],n.__e(o,e.__v)}})),X&&X(e,t)},n.unmount=function(e){Y&&Y(e);var t,o=e.__c;o&&o.__H&&(o.__H.__.forEach((function(e){try{ce(e)}catch(e){t=e}})),o.__H=void 0,t&&n.__e(t,o.__v))};var _e="function"==typeof requestAnimationFrame;function se(e){var n,t=function(){clearTimeout(o),_e&&cancelAnimationFrame(n),setTimeout(e)},o=setTimeout(t,100);_e&&(n=requestAnimationFrame(t))}function ce(e){var n=B,t=e.__c;"function"==typeof t&&(e.__c=void 0,t()),B=n}function ae(e){var n=B;e.__c=e.__(),B=n}function ue(e,n){return!e||e.length!==n.length||n.some((function(n,t){return n!==e[t]}))}function fe(e,n){return"function"==typeof n?n(e):n}function de(e,n){for(var t in n)e[t]=n[t];return e}function pe(e,n){for(var t in e)if("__source"!==t&&!(t in n))return!0;for(var o in n)if("__source"!==o&&e[o]!==n[o])return!0;return!1}function he(e){this.props=e}(he.prototype=new p).isPureReactComponent=!0,he.prototype.shouldComponentUpdate=function(e,n){return pe(this.props,e)||pe(this.state,n)};var ve=n.__b;n.__b=function(e){e.type&&e.type.__f&&e.ref&&(e.props.ref=e.ref,e.ref=null),ve&&ve(e)};"undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.forward_ref");var me=n.__e;n.__e=function(e,n,t,o){if(e.then)for(var r,i=n;i=i.__;)if((r=i.__c)&&r.__c)return null==n.__e&&(n.__e=t.__e,n.__k=t.__k),r.__c(e,n);me(e,n,t,o)};var ye=n.unmount;function ge(e,n,t){return e&&(e.__c&&e.__c.__H&&(e.__c.__H.__.forEach((function(e){"function"==typeof e.__c&&e.__c()})),e.__c.__H=null),null!=(e=de({},e)).__c&&(e.__c.__P===t&&(e.__c.__P=n),e.__c=null),e.__k=e.__k&&e.__k.map((function(e){return ge(e,n,t)}))),e}function be(e,n,t){return e&&(e.__v=null,e.__k=e.__k&&e.__k.map((function(e){return be(e,n,t)})),e.__c&&e.__c.__P===n&&(e.__e&&t.insertBefore(e.__e,e.__d),e.__c.__e=!0,e.__c.__P=t)),e}function we(){this.__u=0,this.t=null,this.__b=null}function ke(e){var n=e.__.__c;return n&&n.__a&&n.__a(e)}function Ce(){this.u=null,this.o=null}n.unmount=function(e){var n=e.__c;n&&n.__R&&n.__R(),n&&!0===e.__h&&(e.type=null),ye&&ye(e)},(we.prototype=new p).__c=function(e,n){var t=n.__c,o=this;null==o.t&&(o.t=[]),o.t.push(t);var r=ke(o.__v),i=!1,l=function(){i||(i=!0,t.__R=null,r?r(_):_())};t.__R=l;var _=function(){if(!--o.__u){if(o.state.__a){var e=o.state.__a;o.__v.__k[0]=be(e,e.__c.__P,e.__c.__O)}var n;for(o.setState({__a:o.__b=null});n=o.t.pop();)n.forceUpdate()}},s=!0===n.__h;o.__u++||s||o.setState({__a:o.__b=o.__v.__k[0]}),e.then(l,l)},we.prototype.componentWillUnmount=function(){this.t=[]},we.prototype.render=function(e,n){if(this.__b){if(this.__v.__k){var t=document.createElement("div"),o=this.__v.__k[0].__c;this.__v.__k[0]=ge(this.__b,t,o.__O=o.__P)}this.__b=null}var r=n.__a&&u(d,null,e.fallback);return r&&(r.__h=null),[u(d,null,n.__a?null:e.children),r]};var xe=function(e,n,t){if(++t[1]===t[0]&&e.o.delete(n),e.props.revealOrder&&("t"!==e.props.revealOrder[0]||!e.o.size))for(t=e.u;t;){for(;t.length>3;)t.pop()();if(t[1]<t[0])break;e.u=t=t[2]}};function Pe(e){return this.getChildContext=function(){return e.context},e.children}function Se(e){var n=this,t=e.i;n.componentWillUnmount=function(){A(null,n.l),n.l=null,n.i=null},n.i&&n.i!==t&&n.componentWillUnmount(),e.__v?(n.l||(n.i=t,n.l={nodeType:1,parentNode:t,childNodes:[],appendChild:function(e){this.childNodes.push(e),n.i.appendChild(e)},insertBefore:function(e,t){this.childNodes.push(e),n.i.appendChild(e)},removeChild:function(e){this.childNodes.splice(this.childNodes.indexOf(e)>>>1,1),n.i.removeChild(e)}}),A(u(Pe,{context:n.context},e.__v),n.l)):n.l&&n.componentWillUnmount()}function Ue(e,n){var t=u(Se,{__v:e,i:n});return t.containerInfo=n,t}(Ce.prototype=new p).__a=function(e){var n=this,t=ke(n.__v),o=n.o.get(e);return o[0]++,function(r){var i=function(){n.props.revealOrder?(o.push(r),xe(n,e,o)):r()};t?t(i):i()}},Ce.prototype.render=function(e){this.u=null,this.o=new Map;var n=w(e.children);e.revealOrder&&"b"===e.revealOrder[0]&&n.reverse();for(var t=n.length;t--;)this.o.set(n[t],this.u=[1,0,this.u]);return e.children},Ce.prototype.componentDidUpdate=Ce.prototype.componentDidMount=function(){var e=this;this.o.forEach((function(n,t){xe(e,t,n)}))};var Ee="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,Le=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,Ne="undefined"!=typeof document,He=function(e){return("undefined"!=typeof Symbol&&"symbol"==typeof Symbol()?/fil|che|rad/i:/fil|che|ra/i).test(e)};p.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach((function(e){Object.defineProperty(p.prototype,e,{configurable:!0,get:function(){return this["UNSAFE_"+e]},set:function(n){Object.defineProperty(this,e,{configurable:!0,writable:!0,value:n})}})}));var Oe=n.event;function Me(){}function Ae(){return this.cancelBubble}function Re(){return this.defaultPrevented}n.event=function(e){return Oe&&(e=Oe(e)),e.persist=Me,e.isPropagationStopped=Ae,e.isDefaultPrevented=Re,e.nativeEvent=e};var Ve={configurable:!0,get:function(){return this.class}},De=n.vnode;n.vnode=function(e){var n=e.type,t=e.props,o=t;if("string"==typeof n){var r=-1===n.indexOf("-");for(var i in o={},t){var l=t[i];Ne&&"children"===i&&"noscript"===n||"value"===i&&"defaultValue"in t&&null==l||("defaultValue"===i&&"value"in t&&null==t.value?i="value":"download"===i&&!0===l?l="":/ondoubleclick/i.test(i)?i="ondblclick":/^onchange(textarea|input)/i.test(i+n)&&!He(t.type)?i="oninput":/^onfocus$/i.test(i)?i="onfocusin":/^onblur$/i.test(i)?i="onfocusout":/^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(i)?i=i.toLowerCase():r&&Le.test(i)?i=i.replace(/[A-Z0-9]/g,"-$&").toLowerCase():null===l&&(l=void 0),/^oninput$/i.test(i)&&(i=i.toLowerCase(),o[i]&&(i="oninputCapture")),o[i]=l)}"select"==n&&o.multiple&&Array.isArray(o.value)&&(o.value=w(t.children).forEach((function(e){e.props.selected=-1!=o.value.indexOf(e.props.value)}))),"select"==n&&null!=o.defaultValue&&(o.value=w(t.children).forEach((function(e){e.props.selected=o.multiple?-1!=o.defaultValue.indexOf(e.props.value):o.defaultValue==e.props.value}))),e.props=o,t.class!=t.className&&(Ve.enumerable="className"in t,null!=t.className&&(o.class=t.className),Object.defineProperty(o,"className",Ve))}e.$$typeof=Ee,De&&De(e)};var Ie=n.__r;n.__r=function(e){Ie&&Ie(e),e.__c};var Te=n.diffed;n.diffed=function(e){Te&&Te(e);var n=e.props,t=e.__e;null!=t&&"textarea"===e.type&&"value"in n&&n.value!==t.value&&(t.value=null==n.value?"":n.value),null};const We=e=>[()=>GM_getValue(e),n=>{GM_setValue(e,n)},()=>{GM_deleteValue(e)}],[$e,Fe,Be]=We("token"),[je,Ge,qe]=We("username"),ze=Symbol("getCourseContent");async function Ke(e,n=!1){e=String(e);const t=this._readCache(ze)??{},o=t[e];if(o&&!n)return o;const r=await this.login(),i=new URLSearchParams({courseid:e,"options[0][name]":"includestealthmodules","options[0][value]":"1",moodlewsrestformat:"json",wsfunction:"core_course_get_contents",wstoken:r}),l=await fetch(this.resolveUrl("/webservice/rest/server.php"),{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:i.toString()});if(!l.ok)throw new Error(`Response was not ok: ${l.status}`);const _=await l.json();if("exception"in _)throw this.logout(),new Error("Invalid token");return t[e]=_,this._writeCache(ze,t),_}Symbol("getUserId");Symbol("getCourses");class Ze extends Error{constructor(){super("No credentials provided.")}}class Je extends Error{constructor(){super("Invalid credentials.")}}class Qe extends Error{constructor(e){super(`${e} not included`)}}let Xe=new URL("http://localhost/");"undefined"!=typeof location?Xe=new URL("/",location.href):"undefined"!=typeof process&&"string"==typeof process.env.MOODLE_BASE_URL&&(Xe=new URL(process.env.MOODLE_BASE_URL));class Ye{static extend(e){return e(Ye),Ye}baseUrl=Xe;credentials={token:$e(),username:je()};#e=new Map;resolveUrl=e=>new URL(e,this.baseUrl);_readCache(e){return this.#e.get(e)}_writeCache(e,n){return this.#e.set(e,n),n}async login(e){const{credentials:n}=this;if(e&&(n.username=e.username,n.password=e.password,Ge(e.username)),n.token)return n.token;const{username:t,password:o}=n;if(!t||!o)throw new Ze;const r=new URLSearchParams({username:t,password:o,service:"moodle_mobile_app"}),i=await fetch(this.resolveUrl("/login/token.php"),{method:"POST",body:r.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}});if(!i.ok)throw new Error(`Response was not ok: ${i.status}`);const l=await i.json();if("errorcode"in l)throw this.logout(),new Je;const{token:_}=l;return Fe(_),n.token=_,_}logout(){delete this.credentials.token,Be(),delete this.credentials.password}async getCourses(e){throw new Qe("getCourses")}async getUserId(){throw new Qe("getUserId")}async popupLogin(e){throw new Qe("popupLogin")}async getCourseContent(e,n){throw new Qe("getCourseContent")}}const en=({cb:e,title:n,moodle:t})=>{const o=re(null),r=re(null),[i,l]=ne(!0),[_,s]=ne({username:!0,password:!0});return i?V("div",{class:"vertical-horizontal-center",children:V("form",{onSubmit:async n=>{n.preventDefault(),n.stopImmediatePropagation();const i=o.current?.value.trim(),_=r.current?.value;if(s({password:Boolean(_),username:Boolean(i)}),i&&_){l(!1);try{const n=await t.login({username:i,password:_});e(n)}catch{l(!0)}}},children:V("div",{class:"card shadow",children:[V("div",{class:"card-body",children:[V("h5",{class:"card-title",children:["Login - ",n]}),V("div",{class:"mb-3",children:[V("label",{htmlFor:"popup-username",class:"form-label",children:"Username"}),V("input",{ref:o,required:!0,defaultValue:je(),id:"popup-username",placeholder:"Username",class:"form-control"+(_.username?"":" is-invalid"),onInput:()=>{s((e=>({...e,username:!0})))}})]}),V("div",{class:"mb-3",children:[V("label",{htmlFor:"popup-password",class:"form-label",children:"Password"}),V("input",{ref:r,required:!0,id:"popup-password",placeholder:"Password",class:"form-control"+(_.password?"":" is-invalid"),type:"password",onInput:()=>{s((e=>({...e,password:!0})))}})]})]}),V("button",{class:"btn btn-primary",type:"submit",children:"Login"})]})})}):null},nn=async function(e){return new Promise((n=>{const t=GM_addStyle(".login-popup-userscript .vertical-horizontal-center{width:100%;height:100%;position:fixed;z-index:100000000;top:0;left:0;display:flex;align-items:center;justify-content:center;pointer-events:none}.login-popup-userscript .card{pointer-events:auto}"),o=document.createElement("div");o.className="login-popup-userscript",document.body.append(o),A(V(en,{cb:e=>{A(null,o),t.remove(),o.remove(),n(e)},title:e,moodle:this}),o)}))},tn={"application/pdf":"pdf-256","application/zip":"archive-256","application/vnd.openxmlformats-officedocument.wordprocessingml.document":"document-256","application/msword":"document-256","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"spreadsheet-256","application/vnd.ms-excel":"spreadsheet-256","application/vnd.openxmlformats-officedocument.presentationml.presentation":"powerpoint-256","application/vnd.ms-powerpoint":"powerpoint-256","text/plain":"sourcecode-256","audio/mp3":"mp3-256","audio/mp4":"mp3-256","video/quicktime":"quicktime-256","video/mp4":"mpeg-256"},on=(e,n)=>{const t=tn[e];return t?`/theme/image.php/classic/core/1601902087/f/${t}`:n};Ye.extend((e=>{e.prototype.popupLogin=nn})).extend((e=>{e.prototype.getCourseContent=Ke}));const rn=new Ye,ln=async(e,n,t)=>{const o=await(async e=>{const n=new URLSearchParams(location.search),t=n.get("id");if(!t)return console.error('Could not extract courseId "%s"',n),!1;try{return await rn.getCourseContent(t,e)}catch{return await rn.popupLogin("Open folders inline"),rn.getCourseContent(t,e)}})(t);if(!1===o)return!1;const r=o.find((({id:n})=>n===Number(e)));if(!r)return console.error("Could not find sectionObject."),!1;const{modules:i}=r,l=i.find((({id:e,modname:t})=>"folder"===t&&e===Number(n)));if(!l)return console.error("Could not find folderObject."),!1;const{contents:_}=l,s=[];for(const e of _)if("file"===e.type){const{filepath:n,mimetype:t}=e,o=rn.resolveUrl(e.fileurl);o.pathname=o.pathname.replace(/^\/webservice/,"");const r=new URL(o.href);t?.startsWith("image")||r.searchParams.set("preview","1"),s.push({...e,filePath:(c=n,c.trim().split(/\/+/).filter(Boolean)),imgPath:on(t,r.href),fileUrl:o.href})}var c;return s},_n=({onClick:e})=>V("span",{style:{marginLeft:5},class:"svg-refresh-hitbox",onClick:n=>{n.stopPropagation(),n.preventDefault(),e()},children:V("svg",{fill:"currentColor","aria-hidden":"true",class:"icon navicon svg-refresh",viewBox:"0 0 512 512",children:V("path",{d:"M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"})})}),sn=e=>{const n=new URL(e);return"1"===n.searchParams.get("forcedownload")&&n.searchParams.set("forcedownload","0"),n.href},cn=({isHidden:e,base:n,handleClick:t})=>V("div",{class:"fp-filename-icon folders-inline-icon",onClick:t,children:[V("div",{class:"folders-inline-icon-div",children:[V("i",{class:`icon fa ${e?"fa-caret-right":"fa-caret-down"} fa-fw navicon folders-inline-caret`}),V("img",{alt:"",class:"iconlarge activityicon",role:"presentation",title:n,"aria-hidden":"true",src:"/theme/image.php/classic/core/1601902087/f/folder-128"})]}),V("span",{class:"fp-filename",children:n})]}),an=({contents:e,directoryDepth:n=0,base:t,isParent:o=!1})=>{const[r,i]=ne(!o),l={};for(const t of e)if("isexternalfile"in t){const e=t.filePath[n]??"/";(l[e]??(l[e]=[])).push(t)}const _=l["/"];_?.sort(((e,n)=>D.compare(e.filename.trim(),n.filename.trim()))),delete l["/"];const s=Object.entries(l);s.sort((([e],[n])=>D.compare(e.trim(),n.trim())));const c=r&&!o;return V(d,{children:[!o&&V(cn,{isHidden:r,base:t,handleClick:e=>{e.stopPropagation(),i((e=>!e))}}),!c&&V("ul",{style:{listStyle:"none"},children:[s.map((([e,t])=>V("li",{children:V(an,{contents:t,base:e,directoryDepth:n+1})},e))),_?.map((({fileUrl:e,filename:n,imgPath:t})=>V("li",{children:V("span",{class:"fp-filename-icon",children:V("a",{href:sn(e),children:[V("span",{class:"fp-icon",children:V("img",{alt:"",title:n,src:t})}),V("span",{class:"fp-filename",children:n})]})})},n)))]})]})},un=({folderId:e,sectionId:n,anchor:t})=>{const[o,r]=ne(void 0),[i,l]=ne(!1);oe((()=>{const e=e=>{e.ctrlKey||(e.preventDefault(),e.stopImmediatePropagation(),l((e=>!e)))};return t.addEventListener("click",e),()=>{t.removeEventListener("click",e)}}),[t]);const _=async(e,n,t)=>{const o=await ln(n,e,t);o&&r(o)};return oe((()=>{_(e,n)}),[e,n]),i?null:o?V(d,{children:[0===o.length?V("div",{class:"folder-empty",children:"The folder was empty"}):V(an,{isParent:!0,contents:o}),Ue(V(_n,{onClick:()=>{r(void 0),_(e,n,!0)}}),t)]}):V("div",{class:"folder-loading",children:"Loading"})};
// ==UserScript==
// @name      Moodle open folders inline preact
// @version   3.2.0
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
(e=>{try{(e=>{const n=GM_getValue($),t=void 0===n?[-1,-1,-1]:I(n),o=Object.entries(e).map((([e,n])=>[I(e),n])).sort((([e],[n])=>W(e,n)));for(const[e,n]of o)W(t,e)<0&&n();GM_setValue($,GM_info.script.version)})(e)}catch(e){console.error("Upgrading threw %o. Failing silently.",e)}})({"1.2.0":()=>{GM_deleteValue("lastValidatedToken"),GM_deleteValue("password")}}),GM_addStyle('@keyframes folder-loading-dots{0%{content:""}33%{content:"."}67%{content:".."}to{content:"..."}}div.folders-inline-icon{cursor:pointer;user-select:none}div.folders-inline-icon-div{display:inline}.folder-parent li{margin-left:24px;padding-left:none}.folder-empty,.folder-loading{margin-left:calc(1rem + 24px)}.folder-loading::after{content:"";animation:folder-loading-dots .6s infinite linear alternate}');const fn=e=>{if(e.ctrlKey)return;if(!(e.target instanceof Element))return;const n=e.target.closest("a");if("/mod/folder/view.php"!==n?.pathname)return;const t=n.closest("li.activity.folder");if(!t)return;const o=/\d+$/.exec(t.id)?.[0];if(!o)return void console.error("Could not get folderId.");const r=n.closest("li.section.main"),i=r?.getAttribute("aria-labelledby")?.match(/-(\d+)-/)?.[1];if(!i)return void console.error("sectionId was undefined.");e.preventDefault();const l=document.createElement("span");l.className="folder-parent",A(V(un,{sectionId:i,folderId:o,anchor:n}),l),t.append(l)};var dn;dn=()=>{document.querySelector("div.course-content > ul")?.addEventListener("click",fn)},"interactive"!==document.readyState&&"complete"!==document.readyState?document.addEventListener("DOMContentLoaded",dn,{once:!0}):dn()})();