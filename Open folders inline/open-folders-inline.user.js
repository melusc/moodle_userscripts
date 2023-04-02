/*! For license information please see open-folders-inline.user.js.LICENSE.txt */
(()=>{"use strict";var e,n,t,o,r,i,l,_={},s=[],c=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function a(e,n){for(var t in n)e[t]=n[t];return e}function u(e){var n=e.parentNode;n&&n.removeChild(e)}function f(n,t,o){var r,i,l,_={};for(l in t)"key"==l?r=t[l]:"ref"==l?i=t[l]:_[l]=t[l];if(arguments.length>2&&(_.children=arguments.length>3?e.call(arguments,2):o),"function"==typeof n&&null!=n.defaultProps)for(l in n.defaultProps)void 0===_[l]&&(_[l]=n.defaultProps[l]);return p(n,_,r,i,null)}function p(e,o,r,i,l){var _={type:e,props:o,key:r,ref:i,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==l?++t:l};return null==l&&null!=n.vnode&&n.vnode(_),_}function d(e){return e.children}function h(e,n){this.props=e,this.context=n}function v(e,n){if(null==n)return e.__?v(e.__,e.__.__k.indexOf(e)+1):null;for(var t;n<e.__k.length;n++)if(null!=(t=e.__k[n])&&null!=t.__e)return t.__e;return"function"==typeof e.type?v(e):null}function m(e){var n,t;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,n=0;n<e.__k.length;n++)if(null!=(t=e.__k[n])&&null!=t.__e){e.__e=e.__c.base=t.__e;break}return m(e)}}function y(e){(!e.__d&&(e.__d=!0)&&o.push(e)&&!g.__r++||r!==n.debounceRendering)&&((r=n.debounceRendering)||i)(g)}function g(){var e,n,t,r,i,_,s,c;for(o.sort(l);e=o.shift();)e.__d&&(n=o.length,r=void 0,i=void 0,s=(_=(t=e).__v).__e,(c=t.__P)&&(r=[],(i=a({},_)).__v=_.__v+1,N(c,_,i,t.__n,void 0!==c.ownerSVGElement,null!=_.__h?[s]:null,r,null==s?v(_):s,_.__h),L(r,_),_.__e!=s&&m(_)),o.length>n&&o.sort(l));g.__r=0}function b(e,n,t,o,r,i,l,c,a,u){var f,h,m,y,g,b,k,P=o&&o.__k||s,S=P.length;for(t.__k=[],f=0;f<n.length;f++)if(null!=(y=t.__k[f]=null==(y=n[f])||"boolean"==typeof y||"function"==typeof y?null:"string"==typeof y||"number"==typeof y||"bigint"==typeof y?p(null,y,null,null,y):Array.isArray(y)?p(d,{children:y},null,null,null):y.__b>0?p(y.type,y.props,y.key,y.ref?y.ref:null,y.__v):y)){if(y.__=t,y.__b=t.__b+1,null===(m=P[f])||m&&y.key==m.key&&y.type===m.type)P[f]=void 0;else for(h=0;h<S;h++){if((m=P[h])&&y.key==m.key&&y.type===m.type){P[h]=void 0;break}m=null}N(e,y,m=m||_,r,i,l,c,a,u),g=y.__e,(h=y.ref)&&m.ref!=h&&(k||(k=[]),m.ref&&k.push(m.ref,null,y),k.push(h,y.__c||g,y)),null!=g?(null==b&&(b=g),"function"==typeof y.type&&y.__k===m.__k?y.__d=a=w(y,a,e):a=C(e,y,m,P,g,a),"function"==typeof t.type&&(t.__d=a)):a&&m.__e==a&&a.parentNode!=e&&(a=v(m))}for(t.__e=b,f=S;f--;)null!=P[f]&&("function"==typeof t.type&&null!=P[f].__e&&P[f].__e==t.__d&&(t.__d=x(o).nextSibling),M(P[f],P[f]));if(k)for(f=0;f<k.length;f++)O(k[f],k[++f],k[++f])}function w(e,n,t){for(var o,r=e.__k,i=0;r&&i<r.length;i++)(o=r[i])&&(o.__=e,n="function"==typeof o.type?w(o,n,t):C(t,o,o,r,o.__e,n));return n}function k(e,n){return n=n||[],null==e||"boolean"==typeof e||(Array.isArray(e)?e.some((function(e){k(e,n)})):n.push(e)),n}function C(e,n,t,o,r,i){var l,_,s;if(void 0!==n.__d)l=n.__d,n.__d=void 0;else if(null==t||r!=i||null==r.parentNode)e:if(null==i||i.parentNode!==e)e.appendChild(r),l=null;else{for(_=i,s=0;(_=_.nextSibling)&&s<o.length;s+=1)if(_==r)break e;e.insertBefore(r,i),l=i}return void 0!==l?l:r.nextSibling}function x(e){var n,t,o;if(null==e.type||"string"==typeof e.type)return e.__e;if(e.__k)for(n=e.__k.length-1;n>=0;n--)if((t=e.__k[n])&&(o=x(t)))return o;return null}function P(e,n,t){"-"===n[0]?e.setProperty(n,null==t?"":t):e[n]=null==t?"":"number"!=typeof t||c.test(n)?t:t+"px"}function S(e,n,t,o,r){var i;e:if("style"===n)if("string"==typeof t)e.style.cssText=t;else{if("string"==typeof o&&(e.style.cssText=o=""),o)for(n in o)t&&n in t||P(e.style,n,"");if(t)for(n in t)o&&t[n]===o[n]||P(e.style,n,t[n])}else if("o"===n[0]&&"n"===n[1])i=n!==(n=n.replace(/Capture$/,"")),n=n.toLowerCase()in e?n.toLowerCase().slice(2):n.slice(2),e.l||(e.l={}),e.l[n+i]=t,t?o||e.addEventListener(n,i?E:U,i):e.removeEventListener(n,i?E:U,i);else if("dangerouslySetInnerHTML"!==n){if(r)n=n.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("width"!==n&&"height"!==n&&"href"!==n&&"list"!==n&&"form"!==n&&"tabIndex"!==n&&"download"!==n&&n in e)try{e[n]=null==t?"":t;break e}catch(e){}"function"==typeof t||(null==t||!1===t&&"-"!==n[4]?e.removeAttribute(n):e.setAttribute(n,t))}}function U(e){return this.l[e.type+!1](n.event?n.event(e):e)}function E(e){return this.l[e.type+!0](n.event?n.event(e):e)}function N(e,t,o,r,i,l,_,s,c){var u,f,p,v,m,y,g,w,k,C,x,P,S,U,E,N=t.type;if(void 0!==t.constructor)return null;null!=o.__h&&(c=o.__h,s=t.__e=o.__e,t.__h=null,l=[s]),(u=n.__b)&&u(t);try{e:if("function"==typeof N){if(w=t.props,k=(u=N.contextType)&&r[u.__c],C=u?k?k.props.value:u.__:r,o.__c?g=(f=t.__c=o.__c).__=f.__E:("prototype"in N&&N.prototype.render?t.__c=f=new N(w,C):(t.__c=f=new h(w,C),f.constructor=N,f.render=A),k&&k.sub(f),f.props=w,f.state||(f.state={}),f.context=C,f.__n=r,p=f.__d=!0,f.__h=[],f._sb=[]),null==f.__s&&(f.__s=f.state),null!=N.getDerivedStateFromProps&&(f.__s==f.state&&(f.__s=a({},f.__s)),a(f.__s,N.getDerivedStateFromProps(w,f.__s))),v=f.props,m=f.state,f.__v=t,p)null==N.getDerivedStateFromProps&&null!=f.componentWillMount&&f.componentWillMount(),null!=f.componentDidMount&&f.__h.push(f.componentDidMount);else{if(null==N.getDerivedStateFromProps&&w!==v&&null!=f.componentWillReceiveProps&&f.componentWillReceiveProps(w,C),!f.__e&&null!=f.shouldComponentUpdate&&!1===f.shouldComponentUpdate(w,f.__s,C)||t.__v===o.__v){for(t.__v!==o.__v&&(f.props=w,f.state=f.__s,f.__d=!1),f.__e=!1,t.__e=o.__e,t.__k=o.__k,t.__k.forEach((function(e){e&&(e.__=t)})),x=0;x<f._sb.length;x++)f.__h.push(f._sb[x]);f._sb=[],f.__h.length&&_.push(f);break e}null!=f.componentWillUpdate&&f.componentWillUpdate(w,f.__s,C),null!=f.componentDidUpdate&&f.__h.push((function(){f.componentDidUpdate(v,m,y)}))}if(f.context=C,f.props=w,f.__P=e,P=n.__r,S=0,"prototype"in N&&N.prototype.render){for(f.state=f.__s,f.__d=!1,P&&P(t),u=f.render(f.props,f.state,f.context),U=0;U<f._sb.length;U++)f.__h.push(f._sb[U]);f._sb=[]}else do{f.__d=!1,P&&P(t),u=f.render(f.props,f.state,f.context),f.state=f.__s}while(f.__d&&++S<25);f.state=f.__s,null!=f.getChildContext&&(r=a(a({},r),f.getChildContext())),p||null==f.getSnapshotBeforeUpdate||(y=f.getSnapshotBeforeUpdate(v,m)),E=null!=u&&u.type===d&&null==u.key?u.props.children:u,b(e,Array.isArray(E)?E:[E],t,o,r,i,l,_,s,c),f.base=t.__e,t.__h=null,f.__h.length&&_.push(f),g&&(f.__E=f.__=null),f.__e=!1}else null==l&&t.__v===o.__v?(t.__k=o.__k,t.__e=o.__e):t.__e=H(o.__e,t,o,r,i,l,_,c);(u=n.diffed)&&u(t)}catch(e){t.__v=null,(c||null!=l)&&(t.__e=s,t.__h=!!c,l[l.indexOf(s)]=null),n.__e(e,t,o)}}function L(e,t){n.__c&&n.__c(t,e),e.some((function(t){try{e=t.__h,t.__h=[],e.some((function(e){e.call(t)}))}catch(e){n.__e(e,t.__v)}}))}function H(n,t,o,r,i,l,s,c){var a,f,p,d=o.props,h=t.props,m=t.type,y=0;if("svg"===m&&(i=!0),null!=l)for(;y<l.length;y++)if((a=l[y])&&"setAttribute"in a==!!m&&(m?a.localName===m:3===a.nodeType)){n=a,l[y]=null;break}if(null==n){if(null===m)return document.createTextNode(h);n=i?document.createElementNS("http://www.w3.org/2000/svg",m):document.createElement(m,h.is&&h),l=null,c=!1}if(null===m)d===h||c&&n.data===h||(n.data=h);else{if(l=l&&e.call(n.childNodes),f=(d=o.props||_).dangerouslySetInnerHTML,p=h.dangerouslySetInnerHTML,!c){if(null!=l)for(d={},y=0;y<n.attributes.length;y++)d[n.attributes[y].name]=n.attributes[y].value;(p||f)&&(p&&(f&&p.__html==f.__html||p.__html===n.innerHTML)||(n.innerHTML=p&&p.__html||""))}if(function(e,n,t,o,r){var i;for(i in t)"children"===i||"key"===i||i in n||S(e,i,null,t[i],o);for(i in n)r&&"function"!=typeof n[i]||"children"===i||"key"===i||"value"===i||"checked"===i||t[i]===n[i]||S(e,i,n[i],t[i],o)}(n,h,d,i,c),p)t.__k=[];else if(y=t.props.children,b(n,Array.isArray(y)?y:[y],t,o,r,i&&"foreignObject"!==m,l,s,l?l[0]:o.__k&&v(o,0),c),null!=l)for(y=l.length;y--;)null!=l[y]&&u(l[y]);c||("value"in h&&void 0!==(y=h.value)&&(y!==n.value||"progress"===m&&!y||"option"===m&&y!==d.value)&&S(n,"value",y,d.value,!1),"checked"in h&&void 0!==(y=h.checked)&&y!==n.checked&&S(n,"checked",y,d.checked,!1))}return n}function O(e,t,o){try{"function"==typeof e?e(t):e.current=t}catch(e){n.__e(e,o)}}function M(e,t,o){var r,i;if(n.unmount&&n.unmount(e),(r=e.ref)&&(r.current&&r.current!==e.__e||O(r,null,t)),null!=(r=e.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(e){n.__e(e,t)}r.base=r.__P=null,e.__c=void 0}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&M(r[i],t,o||"function"!=typeof e.type);o||null==e.__e||u(e.__e),e.__=e.__e=e.__d=void 0}function A(e,n,t){return this.constructor(e,t)}function R(t,o,r){var i,l,s;n.__&&n.__(t,o),l=(i="function"==typeof r)?null:r&&r.__k||o.__k,s=[],N(o,t=(!i&&r||o).__k=f(d,null,[t]),l||_,_,void 0!==o.ownerSVGElement,!i&&r?[r]:l?null:o.firstChild?e.call(o.childNodes):null,s,!i&&r?r:l?l.__e:o.firstChild,i),L(s,t)}e=s.slice,n={__e:function(e,n,t,o){for(var r,i,l;n=n.__;)if((r=n.__c)&&!r.__)try{if((i=r.constructor)&&null!=i.getDerivedStateFromError&&(r.setState(i.getDerivedStateFromError(e)),l=r.__d),null!=r.componentDidCatch&&(r.componentDidCatch(e,o||{}),l=r.__d),l)return r.__E=r}catch(n){e=n}throw e}},t=0,h.prototype.setState=function(e,n){var t;t=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=a({},this.state),"function"==typeof e&&(e=e(a({},t),this.props)),e&&a(t,e),null!=e&&this.__v&&(n&&this._sb.push(n),y(this))},h.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),y(this))},h.prototype.render=d,o=[],i="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,l=function(e,n){return e.__v.__b-n.__v.__b},g.__r=0;var V=0;function D(e,t,o,r,i,l){var _,s,c={};for(s in t)"ref"==s?_=t[s]:c[s]=t[s];var a={type:e,props:c,key:o,ref:_,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:--V,__source:i,__self:l};if("function"==typeof e&&(_=e.defaultProps))for(s in _)void 0===c[s]&&(c[s]=_[s]);return n.vnode&&n.vnode(a),a}const I=new Intl.Collator(void 0,{sensitivity:"base",numeric:!0}),T=e=>{if(!/^\d+\.\d+\.\d+$/.test(e))throw new Error(`Invalid version: ${e}.`);const[n,t,o]=e.split(".").map(Number);return[n,t,o]},W=(e,n)=>e-n,F=(e,n)=>W(e[0],n[0])||W(e[1],n[1])||W(e[2],n[2]),$="lastUpgraded";var B,j,G,q,z=0,K=[],Z=[],J=n.__b,Q=n.__r,X=n.diffed,Y=n.__c,ee=n.unmount;function ne(e,t){n.__h&&n.__h(j,e,z||t),z=0;var o=j.__H||(j.__H={__:[],__h:[]});return e>=o.__.length&&o.__.push({__V:Z}),o.__[e]}function te(e){return z=1,oe(pe,e)}function oe(e,n,t){var o=ne(B++,2);if(o.t=e,!o.__c&&(o.__=[t?t(n):pe(void 0,n),function(e){var n=o.__N?o.__N[0]:o.__[0],t=o.t(n,e);n!==t&&(o.__N=[t,o.__[1]],o.__c.setState({}))}],o.__c=j,!j.u)){var r=function(e,n,t){if(!o.__c.__H)return!0;var r=o.__c.__H.__.filter((function(e){return e.__c}));if(r.every((function(e){return!e.__N})))return!i||i.call(this,e,n,t);var l=!1;return r.forEach((function(e){if(e.__N){var n=e.__[0];e.__=e.__N,e.__N=void 0,n!==e.__[0]&&(l=!0)}})),!(!l&&o.__c.props===e)&&(!i||i.call(this,e,n,t))};j.u=!0;var i=j.shouldComponentUpdate,l=j.componentWillUpdate;j.componentWillUpdate=function(e,n,t){if(this.__e){var o=i;i=void 0,r(e,n,t),i=o}l&&l.call(this,e,n,t)},j.shouldComponentUpdate=r}return o.__N||o.__}function re(e,t){var o=ne(B++,3);!n.__s&&fe(o.__H,t)&&(o.__=e,o.i=t,j.__H.__h.push(o))}function ie(e){return z=5,le((function(){return{current:e}}),[])}function le(e,n){var t=ne(B++,7);return fe(t.__H,n)?(t.__V=e(),t.i=n,t.__h=e,t.__V):t.__}function _e(){for(var e;e=K.shift();)if(e.__P&&e.__H)try{e.__H.__h.forEach(ae),e.__H.__h.forEach(ue),e.__H.__h=[]}catch(t){e.__H.__h=[],n.__e(t,e.__v)}}n.__b=function(e){j=null,J&&J(e)},n.__r=function(e){Q&&Q(e),B=0;var n=(j=e.__c).__H;n&&(G===j?(n.__h=[],j.__h=[],n.__.forEach((function(e){e.__N&&(e.__=e.__N),e.__V=Z,e.__N=e.i=void 0}))):(n.__h.forEach(ae),n.__h.forEach(ue),n.__h=[])),G=j},n.diffed=function(e){X&&X(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&(1!==K.push(t)&&q===n.requestAnimationFrame||((q=n.requestAnimationFrame)||ce)(_e)),t.__H.__.forEach((function(e){e.i&&(e.__H=e.i),e.__V!==Z&&(e.__=e.__V),e.i=void 0,e.__V=Z}))),G=j=null},n.__c=function(e,t){t.some((function(e){try{e.__h.forEach(ae),e.__h=e.__h.filter((function(e){return!e.__||ue(e)}))}catch(o){t.some((function(e){e.__h&&(e.__h=[])})),t=[],n.__e(o,e.__v)}})),Y&&Y(e,t)},n.unmount=function(e){ee&&ee(e);var t,o=e.__c;o&&o.__H&&(o.__H.__.forEach((function(e){try{ae(e)}catch(e){t=e}})),o.__H=void 0,t&&n.__e(t,o.__v))};var se="function"==typeof requestAnimationFrame;function ce(e){var n,t=function(){clearTimeout(o),se&&cancelAnimationFrame(n),setTimeout(e)},o=setTimeout(t,100);se&&(n=requestAnimationFrame(t))}function ae(e){var n=j,t=e.__c;"function"==typeof t&&(e.__c=void 0,t()),j=n}function ue(e){var n=j;e.__c=e.__(),j=n}function fe(e,n){return!e||e.length!==n.length||n.some((function(n,t){return n!==e[t]}))}function pe(e,n){return"function"==typeof n?n(e):n}function de(e,n){for(var t in n)e[t]=n[t];return e}function he(e,n){for(var t in e)if("__source"!==t&&!(t in n))return!0;for(var o in n)if("__source"!==o&&e[o]!==n[o])return!0;return!1}function ve(e){this.props=e}(ve.prototype=new h).isPureReactComponent=!0,ve.prototype.shouldComponentUpdate=function(e,n){return he(this.props,e)||he(this.state,n)};var me=n.__b;n.__b=function(e){e.type&&e.type.__f&&e.ref&&(e.props.ref=e.ref,e.ref=null),me&&me(e)};"undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.forward_ref");var ye=n.__e;n.__e=function(e,n,t,o){if(e.then)for(var r,i=n;i=i.__;)if((r=i.__c)&&r.__c)return null==n.__e&&(n.__e=t.__e,n.__k=t.__k),r.__c(e,n);ye(e,n,t,o)};var ge=n.unmount;function be(e,n,t){return e&&(e.__c&&e.__c.__H&&(e.__c.__H.__.forEach((function(e){"function"==typeof e.__c&&e.__c()})),e.__c.__H=null),null!=(e=de({},e)).__c&&(e.__c.__P===t&&(e.__c.__P=n),e.__c=null),e.__k=e.__k&&e.__k.map((function(e){return be(e,n,t)}))),e}function we(e,n,t){return e&&(e.__v=null,e.__k=e.__k&&e.__k.map((function(e){return we(e,n,t)})),e.__c&&e.__c.__P===n&&(e.__e&&t.insertBefore(e.__e,e.__d),e.__c.__e=!0,e.__c.__P=t)),e}function ke(){this.__u=0,this.t=null,this.__b=null}function Ce(e){var n=e.__.__c;return n&&n.__a&&n.__a(e)}function xe(){this.u=null,this.o=null}n.unmount=function(e){var n=e.__c;n&&n.__R&&n.__R(),n&&!0===e.__h&&(e.type=null),ge&&ge(e)},(ke.prototype=new h).__c=function(e,n){var t=n.__c,o=this;null==o.t&&(o.t=[]),o.t.push(t);var r=Ce(o.__v),i=!1,l=function(){i||(i=!0,t.__R=null,r?r(_):_())};t.__R=l;var _=function(){if(!--o.__u){if(o.state.__a){var e=o.state.__a;o.__v.__k[0]=we(e,e.__c.__P,e.__c.__O)}var n;for(o.setState({__a:o.__b=null});n=o.t.pop();)n.forceUpdate()}},s=!0===n.__h;o.__u++||s||o.setState({__a:o.__b=o.__v.__k[0]}),e.then(l,l)},ke.prototype.componentWillUnmount=function(){this.t=[]},ke.prototype.render=function(e,n){if(this.__b){if(this.__v.__k){var t=document.createElement("div"),o=this.__v.__k[0].__c;this.__v.__k[0]=be(this.__b,t,o.__O=o.__P)}this.__b=null}var r=n.__a&&f(d,null,e.fallback);return r&&(r.__h=null),[f(d,null,n.__a?null:e.children),r]};var Pe=function(e,n,t){if(++t[1]===t[0]&&e.o.delete(n),e.props.revealOrder&&("t"!==e.props.revealOrder[0]||!e.o.size))for(t=e.u;t;){for(;t.length>3;)t.pop()();if(t[1]<t[0])break;e.u=t=t[2]}};function Se(e){return this.getChildContext=function(){return e.context},e.children}function Ue(e){var n=this,t=e.i;n.componentWillUnmount=function(){R(null,n.l),n.l=null,n.i=null},n.i&&n.i!==t&&n.componentWillUnmount(),e.__v?(n.l||(n.i=t,n.l={nodeType:1,parentNode:t,childNodes:[],appendChild:function(e){this.childNodes.push(e),n.i.appendChild(e)},insertBefore:function(e,t){this.childNodes.push(e),n.i.appendChild(e)},removeChild:function(e){this.childNodes.splice(this.childNodes.indexOf(e)>>>1,1),n.i.removeChild(e)}}),R(f(Se,{context:n.context},e.__v),n.l)):n.l&&n.componentWillUnmount()}function Ee(e,n){var t=f(Ue,{__v:e,i:n});return t.containerInfo=n,t}(xe.prototype=new h).__a=function(e){var n=this,t=Ce(n.__v),o=n.o.get(e);return o[0]++,function(r){var i=function(){n.props.revealOrder?(o.push(r),Pe(n,e,o)):r()};t?t(i):i()}},xe.prototype.render=function(e){this.u=null,this.o=new Map;var n=k(e.children);e.revealOrder&&"b"===e.revealOrder[0]&&n.reverse();for(var t=n.length;t--;)this.o.set(n[t],this.u=[1,0,this.u]);return e.children},xe.prototype.componentDidUpdate=xe.prototype.componentDidMount=function(){var e=this;this.o.forEach((function(n,t){Pe(e,t,n)}))};var Ne="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,Le=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,He=/^on(Ani|Tra|Tou|BeforeInp|Compo)/,Oe=/[A-Z0-9]/g,Me="undefined"!=typeof document,Ae=function(e){return("undefined"!=typeof Symbol&&"symbol"==typeof Symbol()?/fil|che|rad/:/fil|che|ra/).test(e)};h.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach((function(e){Object.defineProperty(h.prototype,e,{configurable:!0,get:function(){return this["UNSAFE_"+e]},set:function(n){Object.defineProperty(this,e,{configurable:!0,writable:!0,value:n})}})}));var Re=n.event;function Ve(){}function De(){return this.cancelBubble}function Ie(){return this.defaultPrevented}n.event=function(e){return Re&&(e=Re(e)),e.persist=Ve,e.isPropagationStopped=De,e.isDefaultPrevented=Ie,e.nativeEvent=e};var Te={enumerable:!1,configurable:!0,get:function(){return this.class}},We=n.vnode;n.vnode=function(e){"string"==typeof e.type&&function(e){var n=e.props,t=e.type,o={};for(var r in n){var i=n[r];if(!("value"===r&&"defaultValue"in n&&null==i||Me&&"children"===r&&"noscript"===t||"class"===r||"className"===r)){var l=r.toLowerCase();"defaultValue"===r&&"value"in n&&null==n.value?r="value":"download"===r&&!0===i?i="":"ondoubleclick"===l?r="ondblclick":"onchange"!==l||"input"!==t&&"textarea"!==t||Ae(n.type)?"onfocus"===l?r="onfocusin":"onblur"===l?r="onfocusout":He.test(r)?r=l:-1===t.indexOf("-")&&Le.test(r)?r=r.replace(Oe,"-$&").toLowerCase():null===i&&(i=void 0):l=r="oninput","oninput"===l&&o[r=l]&&(r="oninputCapture"),o[r]=i}}"select"==t&&o.multiple&&Array.isArray(o.value)&&(o.value=k(n.children).forEach((function(e){e.props.selected=-1!=o.value.indexOf(e.props.value)}))),"select"==t&&null!=o.defaultValue&&(o.value=k(n.children).forEach((function(e){e.props.selected=o.multiple?-1!=o.defaultValue.indexOf(e.props.value):o.defaultValue==e.props.value}))),n.class&&!n.className?(o.class=n.class,Object.defineProperty(o,"className",Te)):(n.className&&!n.class||n.class&&n.className)&&(o.class=o.className=n.className),e.props=o}(e),e.$$typeof=Ne,We&&We(e)};var Fe=n.__r;n.__r=function(e){Fe&&Fe(e),e.__c};var $e=n.diffed;n.diffed=function(e){$e&&$e(e);var n=e.props,t=e.__e;null!=t&&"textarea"===e.type&&"value"in n&&n.value!==t.value&&(t.value=null==n.value?"":n.value),null};var Be;!function(e){e.username="username",e.token="token"}(Be||(Be={}));const je=e=>[()=>GM_getValue(e),n=>{GM_setValue(e,n)},()=>{GM_deleteValue(e)}],[Ge,qe,ze]=je(Be.token),[Ke,Ze,Je]=je(Be.username),Qe=Symbol("getCourseContent");async function Xe(e,n=!1){e=String(e);const t=this._readCache(Qe)??{},o=t[e];if(o&&!n)return o;const r=await this.login(),i=new URLSearchParams({courseid:e,"options[0][name]":"includestealthmodules","options[0][value]":"1",moodlewsrestformat:"json",wsfunction:"core_course_get_contents",wstoken:r}),l=await fetch(this.resolveUrl("/webservice/rest/server.php"),{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:i.toString()});if(!l.ok)throw new Error(`Response was not ok: ${l.status}`);const _=await l.json();if("exception"in _)throw this.logout(),new Error("Invalid token");return t[e]=_,this._writeCache(Qe,t),_}Symbol("getUserId");Symbol("getCourses");class Ye extends Error{constructor(){super("No credentials provided.")}}class en extends Error{constructor(){super("Invalid credentials.")}}class nn extends Error{constructor(e){super(`${e} not included`)}}let tn=new URL("http://localhost/");"undefined"!=typeof location?tn=new URL("/",location.href):"undefined"!=typeof process&&"string"==typeof process.env.MOODLE_BASE_URL&&(tn=new URL(process.env.MOODLE_BASE_URL));class on{static extend(e){return e(on),on}baseUrl=tn;credentials={token:Ge(),username:Ke()};#e=new Map;resolveUrl=e=>new URL(e,this.baseUrl);_readCache(e){return this.#e.get(e)}_writeCache(e,n){return this.#e.set(e,n),n}async login(e){const{credentials:n}=this;if(e&&(n.username=e.username,n.password=e.password,Ze(e.username)),n.token)return n.token;const{username:t,password:o}=n;if(!t||!o)throw new Ye;const r=new URLSearchParams({username:t,password:o,service:"moodle_mobile_app"}),i=await fetch(this.resolveUrl("/login/token.php"),{method:"POST",body:r.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}});if(!i.ok)throw new Error(`Response was not ok: ${i.status}`);const l=await i.json();if("errorcode"in l)throw this.logout(),new en;const{token:_}=l;return qe(_),n.token=_,_}logout(){delete this.credentials.token,ze(),delete this.credentials.password}async getCourses(e){throw new nn("getCourses")}async getUserId(){throw new nn("getUserId")}async popupLogin(e){throw new nn("popupLogin")}async getCourseContent(e,n){throw new nn("getCourseContent")}}const rn=({cb:e,title:n,moodle:t})=>{const o=ie(null),r=ie(null),[i,l]=te(!0),[_,s]=te({username:!0,password:!0});return i?D("div",{class:"vertical-horizontal-center",children:D("form",{onSubmit:async n=>{n.preventDefault(),n.stopImmediatePropagation();const i=o.current?.value.trim(),_=r.current?.value;if(s({password:Boolean(_),username:Boolean(i)}),i&&_){l(!1);try{const n=await t.login({username:i,password:_});e(n)}catch{l(!0)}}},children:D("div",{class:"card shadow",children:[D("div",{class:"card-body",children:[D("h5",{class:"card-title",children:["Login - ",n]}),D("div",{class:"mb-3",children:[D("label",{htmlFor:"popup-username",class:"form-label",children:"Username"}),D("input",{ref:o,required:!0,defaultValue:Ke(),id:"popup-username",placeholder:"Username",class:"form-control"+(_.username?"":" is-invalid"),onInput:()=>{s((e=>({...e,username:!0})))}})]}),D("div",{class:"mb-3",children:[D("label",{htmlFor:"popup-password",class:"form-label",children:"Password"}),D("input",{ref:r,required:!0,id:"popup-password",placeholder:"Password",class:"form-control"+(_.password?"":" is-invalid"),type:"password",onInput:()=>{s((e=>({...e,password:!0})))}})]})]}),D("button",{class:"btn btn-primary",type:"submit",children:"Login"})]})})}):null},ln=async function(e){return new Promise((n=>{const t=GM_addStyle(".login-popup-userscript .vertical-horizontal-center{width:100%;height:100%;position:fixed;z-index:100000000;top:0;left:0;display:flex;align-items:center;justify-content:center;pointer-events:none}.login-popup-userscript .card{pointer-events:auto}"),o=document.createElement("div");o.className="login-popup-userscript",document.body.append(o),R(D(rn,{cb:e=>{R(null,o),t.remove(),o.remove(),n(e)},title:e,moodle:this}),o)}))},_n={"application/pdf":"pdf-256","application/zip":"archive-256","application/vnd.openxmlformats-officedocument.wordprocessingml.document":"document-256","application/msword":"document-256","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"spreadsheet-256","application/vnd.ms-excel":"spreadsheet-256","application/vnd.openxmlformats-officedocument.presentationml.presentation":"powerpoint-256","application/vnd.ms-powerpoint":"powerpoint-256","text/plain":"sourcecode-256","audio/mp3":"mp3-256","audio/mp4":"mp3-256","video/quicktime":"quicktime-256","video/mp4":"mpeg-256"},sn=(e,n)=>{const t=_n[e];return t?`/theme/image.php/classic/core/1601902087/f/${t}`:n};on.extend((e=>{e.prototype.popupLogin=ln})).extend((e=>{e.prototype.getCourseContent=Xe}));const cn=new on,an=async(e,n,t)=>{const o=await(async e=>{const n=new URLSearchParams(location.search),t=n.get("id");if(!t)return console.error('Could not extract courseId "%s"',n),!1;try{return await cn.getCourseContent(t,e)}catch{return await cn.popupLogin("Open folders inline"),cn.getCourseContent(t,e)}})(t);if(!1===o)return!1;const r=o.find((({id:n})=>n===Number(e)));if(!r)return console.error("Could not find sectionObject."),!1;const{modules:i}=r,l=i.find((({id:e,modname:t})=>"folder"===t&&e===Number(n)));if(!l)return console.error("Could not find folderObject."),!1;const{contents:_}=l,s=[];for(const e of _)if("file"===e.type){const{filepath:n,mimetype:t}=e,o=cn.resolveUrl(e.fileurl);o.pathname=o.pathname.replace(/^\/webservice/,"");const r=new URL(o.href);t?.startsWith("image")||r.searchParams.set("preview","1"),s.push({...e,filePath:(c=n,c.trim().split(/\/+/).filter(Boolean)),imgPath:sn(t,r.href),fileUrl:o.href})}var c;return s},un=({onClick:e})=>D("span",{style:{marginLeft:5},class:"svg-refresh-hitbox",onClick:n=>{n.stopPropagation(),n.preventDefault(),e()},children:D("svg",{fill:"currentColor","aria-hidden":"true",class:"icon navicon svg-refresh",viewBox:"0 0 512 512",children:D("path",{d:"M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"})})}),fn=e=>{const n=new URL(e);return"1"===n.searchParams.get("forcedownload")&&n.searchParams.set("forcedownload","0"),n.href},pn=({isHidden:e,base:n,handleClick:t})=>D("div",{class:"fp-filename-icon folders-inline-icon",onClick:t,children:[D("div",{class:"folders-inline-icon-div",children:[D("i",{class:`icon fa ${e?"fa-caret-right":"fa-caret-down"} fa-fw navicon folders-inline-caret`}),D("img",{alt:"",class:"iconlarge activityicon",role:"presentation",title:n,"aria-hidden":"true",src:"/theme/image.php/classic/core/1601902087/f/folder-128"})]}),D("span",{class:"fp-filename",children:n})]}),dn=({contents:e,directoryDepth:n=0,base:t,isParent:o=!1})=>{const[r,i]=te(!o),l={};for(const t of e)if("isexternalfile"in t){const e=t.filePath[n]??"/";(l[e]??(l[e]=[])).push(t)}const _=l["/"];_?.sort(((e,n)=>I.compare(e.filename.trim(),n.filename.trim()))),delete l["/"];const s=Object.entries(l);s.sort((([e],[n])=>I.compare(e.trim(),n.trim())));const c=r&&!o;return D(d,{children:[!o&&D(pn,{isHidden:r,base:t,handleClick:e=>{e.stopPropagation(),i((e=>!e))}}),!c&&D("ul",{style:{listStyle:"none"},children:[s.map((([e,t])=>D("li",{children:D(dn,{contents:t,base:e,directoryDepth:n+1})},e))),_?.map((({fileUrl:e,filename:n,imgPath:t})=>D("li",{children:D("span",{class:"fp-filename-icon",children:D("a",{href:fn(e),children:[D("span",{class:"fp-icon",children:D("img",{alt:"",title:n,src:t})}),D("span",{class:"fp-filename",children:n})]})})},n)))]})]})},hn=({folderId:e,sectionId:n,anchor:t})=>{const[o,r]=te(void 0),[i,l]=te(!1);re((()=>{const e=e=>{e.ctrlKey||(e.preventDefault(),e.stopImmediatePropagation(),l((e=>!e)))};return t.addEventListener("click",e),()=>{t.removeEventListener("click",e)}}),[t]);const _=async(e,n,t)=>{const o=await an(n,e,t);o&&r(o)};return re((()=>{_(e,n)}),[e,n]),i?null:o?D(d,{children:[0===o.length?D("div",{class:"folder-empty",children:"The folder was empty"}):D(dn,{isParent:!0,contents:o}),Ee(D(un,{onClick:()=>{r(void 0),_(e,n,!0)}}),t)]}):D("div",{class:"folder-loading",children:"Loading"})};
// ==UserScript==
// @name      Moodle open folders inline preact
// @version   3.3.0
// @author    lusc
// @match     *://moodle.*/course/view.php?id=*
// @match     *://moodle*.*/course/view.php?id=*
// @updateURL https://github.com/melusc/moodle_userscripts/raw/userscript-out/Open%20folders%20inline/open-folders-inline.user.js
// @grant     GM_setValue
// @grant     GM_getValue
// @grant     GM_deleteValue
// @grant     GM_addStyle
// @run-at    document-start
// @license   MIT
// ==/UserScript==
(e=>{try{(e=>{const n=GM_getValue($),t=void 0===n?[-1,-1,-1]:T(n),o=Object.entries(e).map((([e,n])=>[T(e),n])).sort((([e],[n])=>F(e,n)));for(const[e,n]of o)F(t,e)<0&&n();GM_setValue($,GM_info.script.version)})(e)}catch(e){console.error("Upgrading threw %o. Failing silently.",e)}})({"1.2.0":()=>{GM_deleteValue("lastValidatedToken"),GM_deleteValue("password")}}),GM_addStyle('@keyframes folder-loading-dots{0%{content:""}33%{content:"."}67%{content:".."}to{content:"..."}}div.folders-inline-icon{cursor:pointer;user-select:none}div.folders-inline-icon-div{display:inline}.folder-parent li{margin-left:24px;padding-left:none}.folder-empty,.folder-loading{margin-left:calc(1rem + 24px)}.folder-loading::after{content:"";animation:folder-loading-dots .6s infinite linear alternate}');const vn=e=>{if(e.ctrlKey)return;if(!(e.target instanceof Element))return;const n=e.target.closest("a");if("/mod/folder/view.php"!==n?.pathname)return;const t=n.closest("li.activity.folder");if(!t)return;const o=/\d+$/.exec(t.id)?.[0];if(!o)return void console.error("Could not get folderId.");const r=n.closest("li.section.main"),i=r?.getAttribute("aria-labelledby")?.match(/-(\d+)-/)?.[1];if(!i)return void console.error("sectionId was undefined.");e.preventDefault();const l=document.createElement("span");l.className="folder-parent",R(D(hn,{sectionId:i,folderId:o,anchor:n}),l),t.append(l)};var mn;mn=()=>{document.querySelector("div.course-content > ul")?.addEventListener("click",vn)},"interactive"!==document.readyState&&"complete"!==document.readyState?document.addEventListener("DOMContentLoaded",mn,{once:!0}):mn()})();