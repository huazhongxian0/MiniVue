!function(e,t){e&&!e.getElementById("livereloadscript")&&((t=e.createElement("script")).async=1,t.src="//"+(self.location.host||"localhost").split(":")[0]+":35729/livereload.js?snipver=1",t.id="livereloadscript",e.getElementsByTagName("head")[0].appendChild(t))}(self.document);var ReactivityModule=function(e){"use strict";const t=Symbol(),n=new WeakMap;let r;const o=[];function l(e,t={}){const n=()=>{!function(e){for(let t=0;t<e.deps.length;t++)e.deps[t].delete(e);e.deps.length=0}(n),r=n,o.push(n);const t=e();return o.pop(),r=o[o.length-1],t};return n.deps=[],n.options=t,t.lazy||n(),n}const c=(e,t)=>{if(!r)return;let o=n.get(e);o||n.set(e,o=new Map);let l=o.get(t);l||o.set(t,l=new Set),l.add(r),r.deps.push(l)},s=(e,o,l,c)=>{let s=n.get(e);if(!s)return;let i=s.get(o);const a=new Set;if("ADD"==l){const e=s.get(t);e&&e.forEach((e=>{e!==r&&a.add(e)}))}if("ADD"===l&&Array.isArray(e)){const e=s.get("length");e&&e.forEach((e=>{e!==r&&a.add(e)}))}Array.isArray(e)&&"length"===o&&s.forEach(((e,t)=>{t>=c&&e.forEach((e=>{e!==r&&a.add(e)}))})),i&&i.forEach((e=>{e!=r&&a.add(e)})),a.forEach((e=>{e.options.scheduler?e.options.scheduler(e):e()}))};function i(e,t=new Set){if("object"==typeof e&&null!=e&&!t.has(e)){t.add(e);for(const n in e)i(e[n],t);return e}}const a={};function u(e,n=!1,r=!1){return new Proxy(e,{get(e,t,o){if("raw"===t)return e;if(Array.isArray(e)&&a.hasOwnProperty(t))return Reflect.get(a,t,o);r||"symbol"==typeof t||c(e,t);const l=Reflect.get(e,t,o);return"object"!=typeof l||null==l||n?l:r?h(l):p(l)},set(e,t,n,o){if(r)return console.warn(`属性${t} 是只读的`),!0;const l=e[t],c=Array.isArray(e)?Number(t)<e.length?"SET":"ADD":Object.prototype.hasOwnProperty.call(e,t)?"SET":"ADD";return Reflect.set(e,t,n,o),e===o.raw&&(l==n||l!=l&&n!=n||s(e,t,c,n)),!0},has:(e,t)=>(c(e,t),Reflect.get(e,t)),ownKeys:e=>(c(e,Array.isArray(e)?"length":t),Reflect.ownKeys(e)),deleteProperty(e,t){if(r)return console.warn(`属性${t} 是只读的`),!0;const n=Object.prototype.hasOwnProperty.call(e,t),o=Reflect.deleteProperty(e,t);return o&&n&&s(e,t,"DELETE"),o}})}["include","indexOf","lastIndexOf"].forEach((e=>{const t=Array.prototype[e];a[e]=function(...e){let n=t.apply(this,e);return!1!==n&&-1!==n||(n=t.apply(this.raw,e)),n}}));const f=new Map;function p(e){const t=f.get(e);if(t)return t;const n=u(e);return f.set(e,n),n}function d(e){return u(e,!0)}function h(e){return u(e,!1,!0)}const y=new Set;let v=!1;const g=Promise.resolve();function m(e){y.add(e),v||(v=!0,g.then((()=>{try{y.forEach((e=>e()))}catch(e){console.error(e)}finally{v=!1,y.clear=0}})))}const A=function(e){const{createElement:t,insert:n,setElementText:r,patchProps:o,createText:c,setText:s}=e;function i(e,l){const c=e.el=t(e);if(function(e,t){if(t.props)for(const n in t.props)o(e,n,null,t.props[n])}(c,e),"string"==typeof e.children?r(c,e.children):Array.isArray(e.children)&&e.children.forEach((e=>h(null,e,c))),e.props)for(const t in e.props)o(c,t,null,e.props[t]);n(c,l)}function a(e,t,n){"string"==typeof t.children?(Array.isArray(e.children)&&e.children.forEach((e=>y(e))),r(n,t.children)):Array.isArray(t.children)?Array.isArray(e.children)?function(e,t,n){const r=e.length,o=t.length,l=Math.min(r,o);for(let r=0;r<l;r++)h(e[r],t[r],n);if(o>r)for(let e=l;e<o;e++)h(null,t[e],n);else if(o<r)for(let t=l;t<r;t++)y(e[t])}(e.children,t.children,n):(r(n,""),t.children.forEach((e=>h(null,e,n)))):Array.isArray(e.children)?e.children.forEach((e=>y(e))):"string"==typeof e.children&&r(n,"")}function u(e={},t){const n={},r={};for(const o in t)o in e?n[o]=t[o]:r[o]=t[o];return[n,r]}function f(e,t,n){const r=t.component=e.component,{props:o}=r;if(function(e,t){const n=Object.keys(t);if(n.length!==Object.keys(e).length)return!0;for(let r=0;r<n.length;r++){const o=n[r];if(e[o]!==t[o])return!0}return!1}(e.props,t.props)){const[e]=u(t.type.props,t.props);for(const t in e)o[t]=e[t];for(const t in o)t in e||delete o[t]}}function h(e,t,r,v){e&&e.type!==t.type&&(y(e),e=null);const{type:g}=t;if("string"==typeof g)e?function(e,t){const n=t.el=e.el,r=e.props,l=t.props;for(const e in l)(null==r?void 0:r[e])!==(null==l?void 0:l[e])&&o(n,e,null==r?void 0:r[e],null==l?void 0:l[e]);a(e,t,n)}(e,t):i(t,r);else if("object"==typeof g)e?f(e,t):function(e,t){const n=e.type,{setup:r,render:o,data:c,beforeCreate:s,created:i,beforeMount:a,mounted:f,beforeUpdate:y,updated:v,props:g}=n;s&&s();const A=p((null==c?void 0:c())||{}),[E,w]=u(g,e.props),b={state:A,props:d(E),isMounted:!1,subTree:null},T={attrs:w};e.component=b,r(d(b.props),T);const x=new Proxy(b,{get(e,t,n){const{state:r,props:o}=e;return r&&t in r?r[t]:o&&t in o?o[t]:void console.error("不存在")},set(e,t,n,r){const{state:o,props:l}=e;return o&&t in o?o[t]=n:l&&t in l?console.warn("props 是只读的"):console.error("不存在"),!0}});i&&i.call(x),l((()=>{const e=null==o?void 0:o.call(x,A);b.isMounted?(y&&y.call(x),h(b.subTree,e,t),v&&v.call(x)):(a&&a.call(x),h(null,e,t),b.isMounted=!0,f&&f.call(x)),b.subTree=e}),{scheduler:m})}(t,r);else if(g===Text)if(e){const n=t.el=e.el;t.children!==e.children&&s(n,t.children)}else{const e=t.el=c(t.children);n(e,r)}}function y(e){var t;const n=null===(t=e.el)||void 0===t?void 0:t.parentNode;n&&n.removeChild(e.el)}return{render:function(e,t){e?h(t._vnode,e,t):t._vnode&&y(t._vnode),t._vnode=e}}}({createElement:e=>document.createElement(e.type),insert:(e,t)=>{t.appendChild(e)},setElementText:(e,t)=>{e.textContent=t},patchProps:(e,t,n,r)=>{if(/^on/.test(t)&&"function"==typeof r){let n=(e._vei||(e._vei={}))[t];const o=t.slice(2).toLowerCase();r?n?n.value=r:(n=e._vei[t]=e=>{e.timeStamp<n.attached||(Array.isArray(n.value)?n.value.forEach((t=>t(e))):n.value(e))},n.value=r,n.attached=performance.now(),e.addEventListener(o,n)):n&&e.removeEventListener(o,n)}else if(function(e,t){return("form"!==t||"INPUT"!==e.tagName)&&t in e}(e,t)){const n=typeof e[t];e[t]="boolean"===n&&""===r||r}else null===r?e.removeAttribute(t):e.setAttribute(t,r)},createText:e=>document.createTextNode(e),setText(e,t){e.nodeValue=t}});return e.computed=function(e){let t,n=!0;const r=l(e,{lazy:!0,scheduler:()=>{n||(n=!0,s(o,"value"))}}),o={get value(){return n&&(t=r(),n=!1),c(o,"value"),t}};return o},e.effect=l,e.reactive=p,e.readonly=h,e.ref=function(e){const t={value:e};return Object.defineProperty(t,"__v_isRef",{value:!0}),p(t)},e.renderer=A,e.shallowReactive=d,e.shallowReadonly=function(e){return u(e,!0,!0)},e.track=c,e.trigger=s,e.watch=function(e,t,n={immediate:!1}){let r;r="function"==typeof e?e:()=>i(e);let o,c=null,s=null;function a(e){o=e}const u=()=>{c=f(),o&&o(),t(c,s,a),console.log("oldSet了为",s.name),s=c},f=l((()=>r()),{lazy:!0,scheduler:()=>{if("post"==n.flush){Promise.resolve().then((()=>u()))}else u()}});n.immediate?u():s=f()},e}({});
//# sourceMappingURL=reactivity.iife.js.map
