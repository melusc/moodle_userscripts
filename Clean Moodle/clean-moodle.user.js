(()=>{"use strict";var e,t,n,o,r,l,a={},i=[],s=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function c(e,t){for(var n in t)e[n]=t[n];return e}function u(e){var t=e.parentNode;t&&t.removeChild(e)}function d(t,n,o){var r,l,a,i={};for(a in n)"key"==a?r=n[a]:"ref"==a?l=n[a]:i[a]=n[a];if(arguments.length>2&&(i.children=arguments.length>3?e.call(arguments,2):o),"function"==typeof t&&null!=t.defaultProps)for(a in t.defaultProps)void 0===i[a]&&(i[a]=t.defaultProps[a]);return _(t,i,r,l,null)}function _(e,o,r,l,a){var i={type:e,props:o,key:r,ref:l,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==a?++n:a};return null==a&&null!=t.vnode&&t.vnode(i),i}function p(e){return e.children}function f(e,t){this.props=e,this.context=t}function h(e,t){if(null==t)return e.__?h(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?h(e):null}function m(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return m(e)}}function v(e){(!e.__d&&(e.__d=!0)&&o.push(e)&&!g.__r++||l!==t.debounceRendering)&&((l=t.debounceRendering)||r)(g)}function g(){for(var e;g.__r=o.length;)e=o.sort((function(e,t){return e.__v.__b-t.__v.__b})),o=[],e.some((function(e){var t,n,o,r,l,a;e.__d&&(l=(r=(t=e).__v).__e,(a=t.__P)&&(n=[],(o=c({},r)).__v=r.__v+1,I(a,r,o,t.__n,void 0!==a.ownerSVGElement,null!=r.__h?[l]:null,n,null==l?h(r):l,r.__h),M(n,r),r.__e!=l&&m(r)))}))}function y(e,t,n,o,r,l,s,c,u,d){var f,m,v,g,y,k,x,S=o&&o.__k||i,C=S.length;for(n.__k=[],f=0;f<t.length;f++)if(null!=(g=n.__k[f]=null==(g=t[f])||"boolean"==typeof g?null:"string"==typeof g||"number"==typeof g||"bigint"==typeof g?_(null,g,null,null,g):Array.isArray(g)?_(p,{children:g},null,null,null):g.__b>0?_(g.type,g.props,g.key,null,g.__v):g)){if(g.__=n,g.__b=n.__b+1,null===(v=S[f])||v&&g.key==v.key&&g.type===v.type)S[f]=void 0;else for(m=0;m<C;m++){if((v=S[m])&&g.key==v.key&&g.type===v.type){S[m]=void 0;break}v=null}I(e,g,v=v||a,r,l,s,c,u,d),y=g.__e,(m=g.ref)&&v.ref!=m&&(x||(x=[]),v.ref&&x.push(v.ref,null,g),x.push(m,g.__c||y,g)),null!=y?(null==k&&(k=y),"function"==typeof g.type&&g.__k===v.__k?g.__d=u=w(g,u,e):u=b(e,g,v,S,y,u),"function"==typeof n.type&&(n.__d=u)):u&&v.__e==u&&u.parentNode!=e&&(u=h(v))}for(n.__e=k,f=C;f--;)null!=S[f]&&("function"==typeof n.type&&null!=S[f].__e&&S[f].__e==n.__d&&(n.__d=h(o,f+1)),E(S[f],S[f]));if(x)for(f=0;f<x.length;f++)O(x[f],x[++f],x[++f])}function w(e,t,n){for(var o,r=e.__k,l=0;r&&l<r.length;l++)(o=r[l])&&(o.__=e,t="function"==typeof o.type?w(o,t,n):b(n,o,o,r,o.__e,t));return t}function b(e,t,n,o,r,l){var a,i,s;if(void 0!==t.__d)a=t.__d,t.__d=void 0;else if(null==n||r!=l||null==r.parentNode)e:if(null==l||l.parentNode!==e)e.appendChild(r),a=null;else{for(i=l,s=0;(i=i.nextSibling)&&s<o.length;s+=2)if(i==r)break e;e.insertBefore(r,l),a=l}return void 0!==a?a:r.nextSibling}function k(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]=null==n?"":"number"!=typeof n||s.test(t)?n:n+"px"}function x(e,t,n,o,r){var l;e:if("style"===t)if("string"==typeof n)e.style.cssText=n;else{if("string"==typeof o&&(e.style.cssText=o=""),o)for(t in o)n&&t in n||k(e.style,t,"");if(n)for(t in n)o&&n[t]===o[t]||k(e.style,t,n[t])}else if("o"===t[0]&&"n"===t[1])l=t!==(t=t.replace(/Capture$/,"")),t=t.toLowerCase()in e?t.toLowerCase().slice(2):t.slice(2),e.l||(e.l={}),e.l[t+l]=n,n?o||e.addEventListener(t,l?C:S,l):e.removeEventListener(t,l?C:S,l);else if("dangerouslySetInnerHTML"!==t){if(r)t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("href"!==t&&"list"!==t&&"form"!==t&&"tabIndex"!==t&&"download"!==t&&t in e)try{e[t]=null==n?"":n;break e}catch(e){}"function"==typeof n||(null!=n&&(!1!==n||"a"===t[0]&&"r"===t[1])?e.setAttribute(t,n):e.removeAttribute(t))}}function S(e){this.l[e.type+!1](t.event?t.event(e):e)}function C(e){this.l[e.type+!0](t.event?t.event(e):e)}function I(e,n,o,r,l,a,i,s,u){var d,_,h,m,v,g,w,b,k,x,S,C=n.type;if(void 0!==n.constructor)return null;null!=o.__h&&(u=o.__h,s=n.__e=o.__e,n.__h=null,a=[s]),(d=t.__b)&&d(n);try{e:if("function"==typeof C){if(b=n.props,k=(d=C.contextType)&&r[d.__c],x=d?k?k.props.value:d.__:r,o.__c?w=(_=n.__c=o.__c).__=_.__E:("prototype"in C&&C.prototype.render?n.__c=_=new C(b,x):(n.__c=_=new f(b,x),_.constructor=C,_.render=P),k&&k.sub(_),_.props=b,_.state||(_.state={}),_.context=x,_.__n=r,h=_.__d=!0,_.__h=[]),null==_.__s&&(_.__s=_.state),null!=C.getDerivedStateFromProps&&(_.__s==_.state&&(_.__s=c({},_.__s)),c(_.__s,C.getDerivedStateFromProps(b,_.__s))),m=_.props,v=_.state,h)null==C.getDerivedStateFromProps&&null!=_.componentWillMount&&_.componentWillMount(),null!=_.componentDidMount&&_.__h.push(_.componentDidMount);else{if(null==C.getDerivedStateFromProps&&b!==m&&null!=_.componentWillReceiveProps&&_.componentWillReceiveProps(b,x),!_.__e&&null!=_.shouldComponentUpdate&&!1===_.shouldComponentUpdate(b,_.__s,x)||n.__v===o.__v){_.props=b,_.state=_.__s,n.__v!==o.__v&&(_.__d=!1),_.__v=n,n.__e=o.__e,n.__k=o.__k,n.__k.forEach((function(e){e&&(e.__=n)})),_.__h.length&&i.push(_);break e}null!=_.componentWillUpdate&&_.componentWillUpdate(b,_.__s,x),null!=_.componentDidUpdate&&_.__h.push((function(){_.componentDidUpdate(m,v,g)}))}_.context=x,_.props=b,_.state=_.__s,(d=t.__r)&&d(n),_.__d=!1,_.__v=n,_.__P=e,d=_.render(_.props,_.state,_.context),_.state=_.__s,null!=_.getChildContext&&(r=c(c({},r),_.getChildContext())),h||null==_.getSnapshotBeforeUpdate||(g=_.getSnapshotBeforeUpdate(m,v)),S=null!=d&&d.type===p&&null==d.key?d.props.children:d,y(e,Array.isArray(S)?S:[S],n,o,r,l,a,i,s,u),_.base=n.__e,n.__h=null,_.__h.length&&i.push(_),w&&(_.__E=_.__=null),_.__e=!1}else null==a&&n.__v===o.__v?(n.__k=o.__k,n.__e=o.__e):n.__e=L(o.__e,n,o,r,l,a,i,u);(d=t.diffed)&&d(n)}catch(e){n.__v=null,(u||null!=a)&&(n.__e=s,n.__h=!!u,a[a.indexOf(s)]=null),t.__e(e,n,o)}}function M(e,n){t.__c&&t.__c(n,e),e.some((function(n){try{e=n.__h,n.__h=[],e.some((function(e){e.call(n)}))}catch(e){t.__e(e,n.__v)}}))}function L(t,n,o,r,l,i,s,c){var d,_,p,f=o.props,m=n.props,v=n.type,g=0;if("svg"===v&&(l=!0),null!=i)for(;g<i.length;g++)if((d=i[g])&&"setAttribute"in d==!!v&&(v?d.localName===v:3===d.nodeType)){t=d,i[g]=null;break}if(null==t){if(null===v)return document.createTextNode(m);t=l?document.createElementNS("http://www.w3.org/2000/svg",v):document.createElement(v,m.is&&m),i=null,c=!1}if(null===v)f===m||c&&t.data===m||(t.data=m);else{if(i=i&&e.call(t.childNodes),_=(f=o.props||a).dangerouslySetInnerHTML,p=m.dangerouslySetInnerHTML,!c){if(null!=i)for(f={},g=0;g<t.attributes.length;g++)f[t.attributes[g].name]=t.attributes[g].value;(p||_)&&(p&&(_&&p.__html==_.__html||p.__html===t.innerHTML)||(t.innerHTML=p&&p.__html||""))}if(function(e,t,n,o,r){var l;for(l in n)"children"===l||"key"===l||l in t||x(e,l,null,n[l],o);for(l in t)r&&"function"!=typeof t[l]||"children"===l||"key"===l||"value"===l||"checked"===l||n[l]===t[l]||x(e,l,t[l],n[l],o)}(t,m,f,l,c),p)n.__k=[];else if(g=n.props.children,y(t,Array.isArray(g)?g:[g],n,o,r,l&&"foreignObject"!==v,i,s,i?i[0]:o.__k&&h(o,0),c),null!=i)for(g=i.length;g--;)null!=i[g]&&u(i[g]);c||("value"in m&&void 0!==(g=m.value)&&(g!==t.value||"progress"===v&&!g||"option"===v&&g!==f.value)&&x(t,"value",g,f.value,!1),"checked"in m&&void 0!==(g=m.checked)&&g!==t.checked&&x(t,"checked",g,f.checked,!1))}return t}function O(e,n,o){try{"function"==typeof e?e(n):e.current=n}catch(e){t.__e(e,o)}}function E(e,n,o){var r,l;if(t.unmount&&t.unmount(e),(r=e.ref)&&(r.current&&r.current!==e.__e||O(r,null,n)),null!=(r=e.__c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(e){t.__e(e,n)}r.base=r.__P=null}if(r=e.__k)for(l=0;l<r.length;l++)r[l]&&E(r[l],n,"function"!=typeof e.type);o||null==e.__e||u(e.__e),e.__e=e.__d=void 0}function P(e,t,n){return this.constructor(e,n)}function N(n,o,r){var l,i,s;t.__&&t.__(n,o),i=(l="function"==typeof r)?null:r&&r.__k||o.__k,s=[],I(o,n=(!l&&r||o).__k=d(p,null,[n]),i||a,a,void 0!==o.ownerSVGElement,!l&&r?[r]:i?null:o.firstChild?e.call(o.childNodes):null,s,!l&&r?r:i?i.__e:o.firstChild,l),M(s,n)}e=i.slice,t={__e:function(e,t,n,o){for(var r,l,a;t=t.__;)if((r=t.__c)&&!r.__)try{if((l=r.constructor)&&null!=l.getDerivedStateFromError&&(r.setState(l.getDerivedStateFromError(e)),a=r.__d),null!=r.componentDidCatch&&(r.componentDidCatch(e,o||{}),a=r.__d),a)return r.__E=r}catch(t){e=t}throw e}},n=0,f.prototype.setState=function(e,t){var n;n=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=c({},this.state),"function"==typeof e&&(e=e(c({},n),this.props)),e&&c(n,e),null!=e&&this.__v&&(t&&this.__h.push(t),v(this))},f.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),v(this))},f.prototype.render=p,o=[],r="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,g.__r=0;const R=async(e=!1)=>{if(await GM.deleteValue("token"),e)for(const e of["username","password"])await GM.deleteValue(e)};let G;const T=async({username:e,password:t})=>{if(void 0!==G)return G;const n=new URLSearchParams({username:e,password:t,service:"moodle_mobile_app"}),o=await fetch("/login/token.php",{method:"POST",body:n.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}}),r=await o.json();if("errorcode"in r)throw new Error("Token was invalid");return await Promise.all([GM.setValue("token",r.token),GM.setValue("username",e),GM.setValue("password",t)]),G=r.token,r.token};let V,H;const A=async e=>{if(void 0!==H)return H;const t=await(async e=>{if(void 0!==V)return V;const t=new URLSearchParams({wsfunction:"core_webservice_get_site_info",wstoken:e}),n=await fetch("/webservice/rest/server.php?moodlewsrestformat=json",{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:t.toString()}),o=await n.json();if("exception"in o)throw new Error("token was undefined");return V=o.userid,V})(e),n=new URLSearchParams({"requests[0][function]":"core_enrol_get_users_courses","requests[0][arguments]":JSON.stringify({userid:t,returnusercount:!1}),wstoken:e,wsfunction:"tool_mobile_call_external_functions",moodlewsrestformat:"json"}),o=await fetch("/webservice/rest/server.php",{method:"POST",body:n.toString(),headers:{"content-type":"application/x-www-form-urlencoded"}});if(!o.ok)throw new Error(`Response was not ok: ${o.status}`);const r=await o.json();if("exception"in r||r.responses[0].error)throw new Error("Token was invalid");const l=JSON.parse(r.responses[0].data);H={};for(const{id:e,fullname:t}of l)H[e]=t;return H},U=async()=>{const[e,t]=await Promise.all([GM.getValue("username"),GM.getValue("password")]);if(e&&t)return{username:e,password:t}},z=async()=>GM.getValue("token");var j,q,B,D=0,F=[],$=t.__b,W=t.__r,K=t.diffed,J=t.__c,Y=t.unmount;function Q(e,n){t.__h&&t.__h(q,e,D||n),D=0;var o=q.__H||(q.__H={__:[],__h:[]});return e>=o.__.length&&o.__.push({}),o.__[e]}function X(e){return D=1,function(e,t,n){var o=Q(j++,2);return o.t=e,o.__c||(o.__=[re(void 0,t),function(e){var t=o.t(o.__[0],e);o.__[0]!==t&&(o.__=[t,o.__[1]],o.__c.setState({}))}],o.__c=q),o.__}(re,e)}function Z(e){return D=5,function(e,t){var n=Q(j++,7);return function(e,t){return!e||e.length!==t.length||t.some((function(t,n){return t!==e[n]}))}(n.__H,t)&&(n.__=e(),n.__H=t,n.__h=e),n.__}((function(){return{current:e}}),[])}function ee(){for(var e;e=F.shift();)if(e.__P)try{e.__H.__h.forEach(ne),e.__H.__h.forEach(oe),e.__H.__h=[]}catch(n){e.__H.__h=[],t.__e(n,e.__v)}}t.__b=function(e){q=null,$&&$(e)},t.__r=function(e){W&&W(e),j=0;var t=(q=e.__c).__H;t&&(t.__h.forEach(ne),t.__h.forEach(oe),t.__h=[])},t.diffed=function(e){K&&K(e);var n=e.__c;n&&n.__H&&n.__H.__h.length&&(1!==F.push(n)&&B===t.requestAnimationFrame||((B=t.requestAnimationFrame)||function(e){var t,n=function(){clearTimeout(o),te&&cancelAnimationFrame(t),setTimeout(e)},o=setTimeout(n,100);te&&(t=requestAnimationFrame(n))})(ee)),q=null},t.__c=function(e,n){n.some((function(e){try{e.__h.forEach(ne),e.__h=e.__h.filter((function(e){return!e.__||oe(e)}))}catch(o){n.some((function(e){e.__h&&(e.__h=[])})),n=[],t.__e(o,e.__v)}})),J&&J(e,n)},t.unmount=function(e){Y&&Y(e);var n,o=e.__c;o&&o.__H&&(o.__H.__.forEach((function(e){try{ne(e)}catch(e){n=e}})),n&&t.__e(n,o.__v))};var te="function"==typeof requestAnimationFrame;function ne(e){var t=q,n=e.__c;"function"==typeof n&&(e.__c=void 0,n()),q=t}function oe(e){var t=q;e.__c=e.__(),q=t}function re(e,t){return"function"==typeof t?t(e):t}const le=e=>{const t=Z(null),n=Z(null),[o,r]=X(!0),[l,a]=X({username:!0,password:!0});return o?d("div",{class:"vertical-horizontal-center"},d("div",{class:"card shadow"},d("div",{class:"card-body"},d("h5",{class:"card-title"},"Login - ",e.title),d("div",{class:"mb-3"},d("label",{htmlFor:"popup-username",class:"form-label"},"Username"),d("input",{ref:t,required:!0,id:"popup-username",placeholder:"Username",class:"form-control"+(l.username?"":" is-invalid"),onInput:()=>{a((e=>({...e,username:!0})))}})),d("div",{class:"mb-3"},d("label",{htmlFor:"popup-password",class:"form-label"},"Password"),d("input",{ref:n,required:!0,id:"popup-password",placeholder:"Password",class:"form-control"+(l.password?"":" is-invalid"),type:"password",onInput:()=>{a((e=>({...e,password:!0})))}}))),d("button",{class:"btn btn-primary",type:"button",onClick:async()=>{const o=t.current?.value.trim(),l=n.current?.value;if(a({password:Boolean(l),username:Boolean(o)}),o&&l){r(!1);try{const t=await T({username:o,password:l});e.cb(t)}catch{r(!0)}}}},"Login"))):null},ae=async e=>{const t=await(async e=>{const t=await z();if(t)return t;const n=await U();if(n)try{return await T(n)}catch{await R(!0)}else await R(!0);return(async e=>new Promise((t=>{const n=GM_addStyle(".login-popup-userscript .vertical-horizontal-center{width:100%;height:100%;position:fixed;z-index:100000000;top:0;left:0;display:flex;align-items:center;justify-content:center;pointer-events:none}.login-popup-userscript .card{pointer-events:auto}"),o=document.createElement("div");o.className="login-popup-userscript",document.body.append(o),N(d(le,{cb:e=>{n.remove(),o.remove(),t(e)},title:e}),o)})))(e)})(e);try{return await A(t)}catch{return await R(),ae(e)}},ie=new Intl.Collator(void 0,{sensitivity:"base",numeric:!0}),se=()=>document.querySelector('li[aria-labelledby$="label_2_4"] ul[role="group"]'),ce=async(e,{updateReplacers:t=!0,updateRemovers:n=!0}={})=>{const o=new Set(await GM.getValue("remove"));o.delete(e);const r=[...o],l=await GM.getValue("replace")??{};return delete l[e],n&&await GM.setValue("remove",r),t&&await GM.setValue("replace",l),{replacers:l,removers:r}},ue=()=>d("svg",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",class:"icon svg-icon-check",viewBox:"0 0 24 24"},d("path",{d:"m5 12 5 5L20 7"})),de=()=>d("svg",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",class:"icon svg-icon-x",viewBox:"0 0 24 24"},d("path",{d:"M18 6 6 18M6 6l12 12"})),_e=()=>d("svg",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",class:"icon svg-icon-arrow-back",viewBox:"0 0 24 24"},d("path",{d:"m9 11-4 4 4 4m-4-4h11a4 4 0 0 0 0-8h-1"})),pe=e=>e.sort((({courseName:e,replacedName:t},{courseName:n,replacedName:o})=>{const r=(t??e).trim(),l=(o??n).trim();return ie.compare(r,l)})),fe=async e=>(await GM.getValue("replace"))?.[e],he=async e=>(await GM.getValue("remove"))?.includes(e)??!1,me=({course:e,handleClick:t,toggleItem:n,resetItem:o})=>{const{courseName:r,replacedName:l,isRemoved:a}=e;return d("div",{class:"row"+(a?" removed":""),title:r,onClick:n=>{t(n,e)}},d("span",{onClick:t=>{n(t,e)}},d(a?de:ue,null)),l??r,void 0!==l&&d("span",{onClick:t=>{o(t,e)}},d(_e,null)))},ve=({courses:e,loadingCourses:t,...n})=>d("div",{class:"outer-sidebar"},d("div",{class:"sidebar"},t&&d("div",null,"Loading courses..."),e.map((e=>d(me,{key:e.courseId,course:e,...n}))))),ge=e=>{const{loggedOutInputs:t,loggedOutCallback:n}=e;return d("div",{class:"replace-flex-input"},d("h5",null,"Login"),d("input",{ref:t.username,placeholder:"Username"}),d("input",{ref:t.password,placeholder:"Password",type:"password"}),d("button",{class:"btn-save",type:"button",onClick:n},"Login"))},ye=e=>{const{selected:t,replaceInputRef:n,handleSaveClick:o,handleKeydown:r}=e;return d("div",{class:"outer-main"},d("div",{class:"main"},d("div",{class:"section-title"},"Rename course"),d("div",{class:"replace-flex-inputs"},d("div",null,t.isSelected?`Selected: ${t.courseName}`:"Select course to the left"),d("input",{ref:n,class:"replace-input",placeholder:t.isSelected?`Leave empty to reset to ${t.courseName}`:"Select course to the left",disabled:!t.isSelected,value:t.isSelected?t.replacedName??t.courseName:"",onKeyDown:r}),d("button",{class:"btn-save",disabled:!t.isSelected,type:"button",onClick:o},"Save"))))};class we extends f{state={courses:[],loadingCourses:!0,selected:{isSelected:!1},loggedOut:!1};replaceInputRef={current:null};loggedOutInputs={username:{current:null},password:{current:null}};callbacksOnLoggedIn=new Set;constructor(...e){super(...e),this.callbacksOnLoggedIn.add(this.setCourses)}render(){const{courses:e,selected:t,loggedOut:n,loadingCourses:o}=this.state,{handleSidebarClick:r,toggleCourseRemoved:l,resetCourse:a,replaceInputRef:i,loggedOutInputs:s,loggedOutCallbackHandler:c,handleMainKeydown:u,handleSave:_}=this;return d("div",{class:"container"},d(ve,{courses:e,handleClick:r,toggleItem:l,resetItem:a,loadingCourses:o}),n?d(ge,{loggedOutCallback:c,loggedOutInputs:s}):d(ye,{selected:t,replaceInputRef:i,handleKeydown:u,handleSaveClick:_}))}setCourses=async e=>{let t;try{t=await A(e)}catch{return void await this.handleLogOut(!1,this.setCourses)}const n=[];for(const[e,o]of Object.entries(t))n.push({courseName:o,courseId:e,replacedName:await fe(e),isRemoved:await he(e)});pe(n),this.setState({courses:n,loadingCourses:!1})};loggedOutCallbackHandler=async()=>{const e=this.loggedOutInputs.username.current?.value.trim(),t=this.loggedOutInputs.password.current?.value;if(e&&t)try{const n=await T({username:e,password:t});this.setState({loggedOut:!1}),this.callCallbacksOnLogIn(n)}catch{await this.handleLogOut(!0)}};callCallbacksOnLogIn=e=>{for(const t of this.callbacksOnLoggedIn)t(e),this.callbacksOnLoggedIn.delete(t)};handleLogOut=async(e,t)=>{await R(e),t&&this.callbacksOnLoggedIn.add(t),this.setState({loggedOut:!0})};getToken=async()=>{const e=await z();if(e)return e;const t=await U();if(t)try{return await T(t)}catch{return void await this.handleLogOut(!0)}else await this.handleLogOut(!0)};componentDidMount(){this.getToken().then((e=>{e&&this.callCallbacksOnLogIn(e)}))}handleMainKeydown=e=>{"Enter"===e.key&&this.handleSave()};handleSave=async()=>{const e=this.replaceInputRef.current?.value;if(void 0===e)return;const t=this.state.selected;if(!t.isSelected)return;const{courseId:n,courseName:o}=t;await(async(e,t="",n="")=>{t=t.trim(),n=n.trim();const{replacers:o}=await ce(e,{updateReplacers:!1});""!==t&&t!==n&&(o[e]=t),await GM.setValue("replace",o)})(n,e,o),await this.updateCourseById(n),this.setState({selected:{isSelected:!1}})};toggleCourseRemoved=async(e,{isRemoved:t,courseId:n})=>{e.stopImmediatePropagation(),await(t?ce(n):(async e=>{const{removers:t}=await ce(e,{updateRemovers:!1});t.push(e),await GM.setValue("remove",t)})(n)),await this.updateCourseById(n),this.removeSelectedIfEqualId(n)};resetCourse=async(e,t)=>{const{courseId:n}=t;e.stopImmediatePropagation(),this.removeSelectedIfEqualId(n),await ce(n),await this.updateCourseById(n)};removeSelectedIfEqualId=e=>{this.setState((({selected:t})=>t.isSelected&&t.courseId===e?{selected:{isSelected:!1}}:null))};updateCourseById=async e=>{const t=await he(e),n=await fe(e);this.setState((({courses:o})=>{for(const[r,l]of o.entries())if(l.courseId===e){o[r]={...l,isRemoved:t,replacedName:n};break}return pe(o),{courses:o}}))};handleSidebarClick=async(e,t)=>{t.isRemoved&&(await ce(t.courseId,{updateReplacers:!1}),await this.updateCourseById(t.courseId)),this.setState({selected:{isSelected:!0,...t}},(()=>{const e=this.replaceInputRef.current;e&&(e.focus(),e.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}))}))}}
// ==UserScript==
// @name      Clean Moodle with Preact
// @version   1.3.0
// @author    lusc
// @include   *://moodle.ksasz.ch/*
// @updateURL https://git.io/JXgeW
// @grant     GM.setValue
// @grant     GM.getValue
// @grant     GM.deleteValue
// @grant     GM_addStyle
// @grant     GM_registerMenuCommand
// @grant     GM_addValueChangeListener
// @run-at    document-start
// ==/UserScript==
"https:"!==location.protocol&&(location.protocol="https:");const{isArray:be}=Array,ke=!/^\/cleanmoodlepreact/i.test(location.pathname),xe=()=>d("a",{href:"/cleanMoodlePreact/",target:"_blank",rel:"noreferrer noopener",onClick:e=>{e.stopPropagation()}},d("svg",{style:{marginLeft:"0.2em"},fill:"currentColor",class:"icon svg-icon-gear",viewBox:"0 0 16 16"},d("path",{d:"M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 014.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 01-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 011.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 012.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 012.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 011.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 01-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 018.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 001.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 00.52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 00-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 00-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 00-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 00-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 00.52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 001.255-.52l.094-.319zM8 5.754a2.246 2.246 0 100 4.492 2.246 2.246 0 000-4.492zM4.754 8a3.246 3.246 0 116.492 0 3.246 3.246 0 01-6.492 0z"}))),Se=e=>se()?.querySelector(`a[href="https://moodle.ksasz.ch/course/view.php?id=${e}"]`),Ce=async e=>{e in await ae("Clean Moodle")||(await ce(e),alert(`You appear to not be in the course with the id "${e}" anymore.\nThe course will not be checked for anymore`))},Ie=(e,t)=>{const n=Se(e);if(!n)return void Ce(e);const o=t??n.title;if(0===n.childElementCount)n.textContent=o;else{const e=n.querySelector("span.item-content-wrap");e&&(e.textContent=o)}},Me=(e,t=!1)=>{const n=Se(e);if(n){const e=n.closest("li.type_course");e&&!e.classList.contains("contains_branch")&&(e.classList.toggle("hide",!t),t?e.classList.remove("hide","hidden"):e.classList.add("hide","hidden"))}else Ce(e)},Le=()=>{const e=se();if(!e)return;const t=[...e.querySelectorAll(":scope > li.type_course")];t.sort(((e,t)=>{const n=e.firstElementChild?.textContent,o=t.firstElementChild?.textContent;if(!n||!o)throw new Error("aText or bText was undefined");return ie.compare(n,o)})),e.prepend(...t)},Oe=(e,t)=>{for(const n of Object.keys({...e,...t}))e[n]!==t[n]&&Ie(n,t[n]);Le()},Ee=(e,t)=>{for(const n of e)t.includes(n)||Me(n,!0);for(const n of t)e.includes(n)||Me(n)},Pe=e=>(t,n,o,r)=>{r&&se()&&e(n,o)};var Ne;/^\/customicons/i.test(location.pathname)||(Ne=ke?()=>{const e=se();if(GM_registerMenuCommand("Open settings",(()=>{open("https://moodle.ksasz.ch/cleanMoodlePreact/")})),e){(async()=>{if(!se())return;const e=await GM.getValue("replace");if("object"==typeof e){const t=Object.entries(e);for(const e of t)Ie(...e)}else GM.setValue("replace",{});const t=await GM.getValue("remove");if(be(t))for(const e of t)Me(e);else GM.setValue("remove",[]);Le()})(),GM_addValueChangeListener("replace",Pe(Oe)),GM_addValueChangeListener("remove",Pe(Ee));const t=e.previousSibling;if(t instanceof HTMLParagraphElement){const e=document.createElement("span");t.append(e),N(d(xe,null),e)}}}:()=>{const{head:e,body:t}=document;for(;e.lastChild;)e.lastChild.remove();for(;t.lastChild;)t.lastChild.remove();history.replaceState({},"","/cleanMoodlePreact"),document.title="Clean Moodle Setup",GM_addStyle('*,::after,::before{box-sizing:border-box}blockquote,body,dd,dl,figure,h1,h2,h3,h4,p{margin:0}ol[role=list],ul[role=list]{list-style:none}html:focus-within{scroll-behavior:smooth}body{min-height:100vh;text-rendering:optimizeSpeed;line-height:1.5;padding:1%}a:not([class]){text-decoration-skip-ink:auto}img,picture{max-width:100%;display:block}button,input,select,textarea{font:inherit}@media (prefers-reduced-motion:reduce){html:focus-within{scroll-behavior:auto}*,::after,::before{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}html{background:#202020;color:#ccc;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";font-size:.9375rem;font-weight:400;line-height:1.5;user-select:none}@media (min-width:0px){:root{--sidebar-flex: 0 0 100%;--main-flex: 0 0 100%;--padding-horizontal: 0;--padding-vertical: 0.5%}}@media (min-width:768px){:root{--sidebar-flex: 0 0 32%;--main-flex: 0 0 68%;--padding-horizontal: 0.5%;--padding-vertical: 0}}@media (min-width:992px){:root{--sidebar-flex: 0 0 25%;--main-flex: 0 0 75%}}@media (min-width:1200px){:root{--sidebar-flex: 0 0 20%;--main-flex: 0 0 80%}}.outer-sidebar{flex:var(--sidebar-flex);padding-right:var(--padding-horizontal);padding-bottom:var(--padding-vertical)}.outer-sidebar .sidebar{display:flex;flex-direction:column;padding:10px 15px;border:1.5px solid #343434;border-radius:4px;background-color:#141414}.outer-sidebar .row{cursor:pointer;display:flex;align-items:flex-start;color:#198754}.outer-sidebar .row:hover{text-decoration:underline}.outer-sidebar .row.removed{color:#dc3545}.btn-save:not([disabled]){cursor:pointer}.icon{height:1.5em;width:1.5em}.section-title{font-size:30px;font-weight:300;-webkit-font-smoothing:antialiased}.svg-icon-check{color:#198754}.svg-icon-x{color:#dc3545}.outer-main{flex:var(--main-flex);padding-left:var(--padding-horizontal);padding-top:var(--padding-vertical)}.main{padding:3% 2% 5%;border:1.5px solid #343434;border-radius:4px;background-color:#141414}.replace-flex-inputs{display:flex;flex-direction:column;gap:10px;margin-top:10px}.replace-flex-inputs *{align-self:flex-start}button,input{display:flex;align-items:center;padding:.375rem .75rem;font-size:.9375rem;font-weight:400;line-height:1.5;color:#495057;white-space:nowrap;background-color:#e9ecef;border:1px solid #8f959e;border-radius:.25rem;font-family:inherit}button{text-align:center;background-color:#1177d1;color:#ccc;margin-top:10px}.container{display:flex;flex-direction:row;flex-wrap:wrap;width:100%;height:max-content}'),N(d(we,null),t);const n=document.createElement("link");n.rel="shortcut icon",n.href="/theme/image.php/classic/theme/1588340020/favicon",e.append(n)},"undefined"!=typeof document&&("complete"!==document.readyState&&"interactive"!==document.readyState?document.addEventListener("DOMContentLoaded",Ne):Ne()))})();