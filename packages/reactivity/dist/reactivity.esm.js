var e,t;(e=self.document)&&!e.getElementById("livereloadscript")&&((t=e.createElement("script")).async=1,t.src="//"+(self.location.host||"localhost").split(":")[0]+":35729/livereload.js?snipver=1",t.id="livereloadscript",e.getElementsByTagName("head")[0].appendChild(t));const n=Symbol(),r=new WeakMap;let o;const s=[];function l(e,t={}){const n=()=>{!function(e){for(let t=0;t<e.deps.length;t++)e.deps[t].delete(e);e.deps.length=0}(n),o=n,s.push(n);const t=e();return s.pop(),o=s[s.length-1],t};return n.deps=[],n.options=t,t.lazy||n(),n}const c=(e,t)=>{if(!o)return;let n=r.get(e);n||r.set(e,n=new Map);let s=n.get(t);s||n.set(t,s=new Set),s.add(o),o.deps.push(s)},i=(e,t,s,l)=>{let c=r.get(e);if(!c)return;let i=c.get(t);const a=new Set;if("ADD"==s){const e=c.get(n);e&&e.forEach((e=>{e!==o&&a.add(e)}))}if("ADD"===s&&Array.isArray(e)){const e=c.get("length");e&&e.forEach((e=>{e!==o&&a.add(e)}))}Array.isArray(e)&&"length"===t&&c.forEach(((e,t)=>{t>=l&&e.forEach((e=>{e!==o&&a.add(e)}))})),i&&i.forEach((e=>{e!=o&&a.add(e)})),a.forEach((e=>{e.options.scheduler?e.options.scheduler(e):e()}))};function a(e){let t,n=!0;const r=l(e,{lazy:!0,scheduler:()=>{n||(n=!0,i(o,"value"))}}),o={get value(){return n&&(t=r(),n=!1),c(o,"value"),t}};return o}function u(e,t,n={immediate:!1}){let r;r="function"==typeof e?e:()=>f(e);let o,s=null,c=null;function i(e){o=e}const a=()=>{s=u(),o&&o(),t(s,c,i),c=s},u=l((()=>r()),{lazy:!0,scheduler:()=>{if("post"==n.flush){Promise.resolve().then((()=>a()))}else a()}});n.immediate?a():c=u()}function f(e,t=new Set){if("object"==typeof e&&null!=e&&!t.has(e)){t.add(e);for(const n in e)f(e[n],t);return e}}const p={};function d(e,t=!1,r=!1){return new Proxy(e,{get(e,n,o){if("raw"===n)return e;if(Array.isArray(e)&&p.hasOwnProperty(n))return Reflect.get(p,n,o);r||"symbol"==typeof n||c(e,n);const s=Reflect.get(e,n,o);return"object"!=typeof s||null==s||t?s:r?E(s):h(s)},set(e,t,n,o){if(r)return console.warn(`属性${t} 是只读的`),!0;const s=e[t],l=Array.isArray(e)?Number(t)<e.length?"SET":"ADD":Object.prototype.hasOwnProperty.call(e,t)?"SET":"ADD";return Reflect.set(e,t,n,o),e===o.raw&&(s==n||s!=s&&n!=n||i(e,t,l,n)),!0},has:(e,t)=>(c(e,t),Reflect.get(e,t)),ownKeys:e=>(c(e,Array.isArray(e)?"length":n),Reflect.ownKeys(e)),deleteProperty(e,t){if(r)return console.warn(`属性${t} 是只读的`),!0;const n=Object.prototype.hasOwnProperty.call(e,t),o=Reflect.deleteProperty(e,t);return o&&n&&i(e,t,"DELETE"),o}})}["include","indexOf","lastIndexOf"].forEach((e=>{const t=Array.prototype[e];p[e]=function(...e){let n=t.apply(this,e);return!1!==n&&-1!==n||(n=t.apply(this.raw,e)),n}}));const y=new Map;function h(e){const t=y.get(e);if(t)return t;const n=d(e);return y.set(e,n),n}function g(e){return d(e,!0)}function E(e){return d(e,!1,!0)}function A(e){return d(e,!0,!0)}function m(e){const t={value:e};return Object.defineProperty(t,"__v_isRef",{value:!0}),h(t)}const w=function(e){const{createElement:t,insert:n,setElementText:r}=e;function o(e,s,l){e||function(e,s){const l=t(e);if(e.props)for(const t in e.props)l.setAttribute(t,e.props[t]);"string"==typeof e.children?r(l,e.children):Array.isArray(e.children)&&e.children.forEach((e=>o(null,e,l))),n(l,s)}(s,l)}return{render:function(e,t){e?o(t._vnode,e,t):t._vnode&&(t.innerHTML=""),t._vnode=e}}}({createElement:e=>document.createElement(e.type),insert:(e,t)=>{t.appendChild(e)},setElementText:(e,t)=>{e.textContent=t},patchProps:(e,t,n,r)=>{if(shouldSetAsProps(e,t)){const n=typeof e[t];e[t]="boolean"===n&&""===r||r}else e.setAttribute(t,r)}});export{a as computed,l as effect,h as reactive,E as readonly,m as ref,w as renderer,g as shallowReactive,A as shallowReadonly,c as track,i as trigger,u as watch};
//# sourceMappingURL=reactivity.esm.js.map
