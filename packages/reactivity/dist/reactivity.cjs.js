var e,t;(e=self.document)&&!e.getElementById("livereloadscript")&&((t=e.createElement("script")).async=1,t.src="//"+(self.location.host||"localhost").split(":")[0]+":35729/livereload.js?snipver=1",t.id="livereloadscript",e.getElementsByTagName("head")[0].appendChild(t));const r=Symbol(),n=new WeakMap;let o;const s=[];function l(e,t={}){const r=()=>{!function(e){for(let t=0;t<e.deps.length;t++)e.deps[t].delete(e);e.deps.length=0}(r),o=r,s.push(r);const t=e();return s.pop(),o=s[s.length-1],t};return r.deps=[],r.options=t,t.lazy||r(),r}const c=(e,t)=>{if(!o)return;let r=n.get(e);r||n.set(e,r=new Map);let s=r.get(t);s||r.set(t,s=new Set),s.add(o),o.deps.push(s)},a=(e,t,s,l)=>{let c=n.get(e);if(!c)return;let a=c.get(t);const i=new Set;if("ADD"==s){const e=c.get(r);e&&e.forEach((e=>{e!==o&&i.add(e)}))}if("ADD"===s&&Array.isArray(e)){const e=c.get("length");e&&e.forEach((e=>{e!==o&&i.add(e)}))}Array.isArray(e)&&"length"===t&&c.forEach(((e,t)=>{t>=l&&e.forEach((e=>{e!==o&&i.add(e)}))})),a&&a.forEach((e=>{e!=o&&i.add(e)})),i.forEach((e=>{e.options.scheduler?e.options.scheduler(e):e()}))};function i(e,t=new Set){if("object"==typeof e&&null!=e&&!t.has(e)){t.add(e);for(const r in e)i(e[r],t);return e}}const p={};function u(e,t=!1,n=!1){return new Proxy(e,{get(e,r,o){if("raw"===r)return e;if(Array.isArray(e)&&p.hasOwnProperty(r))return Reflect.get(p,r,o);n||"symbol"==typeof r||c(e,r);const s=Reflect.get(e,r,o);return"object"!=typeof s||null==s||t?s:n?y(s):d(s)},set(e,t,r,o){if(n)return console.warn(`属性${t} 是只读的`),!0;const s=e[t],l=Array.isArray(e)?Number(t)<e.length?"SET":"ADD":Object.prototype.hasOwnProperty.call(e,t)?"SET":"ADD";return Reflect.set(e,t,r,o),e===o.raw&&(s==r||s!=s&&r!=r||a(e,t,l,r)),!0},has:(e,t)=>(c(e,t),Reflect.get(e,t)),ownKeys:e=>(c(e,Array.isArray(e)?"length":r),Reflect.ownKeys(e)),deleteProperty(e,t){if(n)return console.warn(`属性${t} 是只读的`),!0;const r=Object.prototype.hasOwnProperty.call(e,t),o=Reflect.deleteProperty(e,t);return o&&r&&a(e,t,"DELETE"),o}})}["include","indexOf","lastIndexOf"].forEach((e=>{const t=Array.prototype[e];p[e]=function(...e){let r=t.apply(this,e);return!1!==r&&-1!==r||(r=t.apply(this.raw,e)),r}}));const f=new Map;function d(e){const t=f.get(e);if(t)return t;const r=u(e);return f.set(e,r),r}function y(e){return u(e,!1,!0)}const h=function(e){console.log("createRender触发");const{createElement:t,insert:r,setElementText:n}=e;function o(e,o,s){e||function(e,o){const s=t(e);for(let t in e.props)Object.prototype.hasOwnProperty.call(e.props,t)&&s.setAttribute(t,e.props[t]);"string"==typeof e.children?n(s,e.children):Array.isArray(typeof e.children),r(s,o)}(o,s)}return{render:function(e,t){e?o(t._vnode,e,t):t._vnode&&(t.innerHTML=""),t._vnode=e}}}({createElement:e=>document.createElement(e.type),insert:(e,t)=>{t.appendChild(e)},setElementText:(e,t)=>{e.textContent=t},patchProps:(e,t,r,n)=>{if(shouldSetAsProps(e,t)){const r=typeof e[t];e[t]="boolean"===r&&""===n||n}else e.setAttribute(t,n)}});exports.computed=function(e){let t,r=!0;const n=l(e,{lazy:!0,scheduler:()=>{r||(r=!0,a(o,"value"))}}),o={get value(){return r&&(t=n(),r=!1),c(o,"value"),t}};return o},exports.effect=l,exports.reactive=d,exports.readonly=y,exports.ref=function(e){const t={value:e};return Object.defineProperty(t,"__v_isRef",{value:!0}),d(t)},exports.renderer=h,exports.shallowReactive=function(e){return u(e,!0)},exports.shallowReadonly=function(e){return u(e,!0,!0)},exports.track=c,exports.trigger=a,exports.watch=function(e,t,r={immediate:!1}){let n;n="function"==typeof e?e:()=>i(e);let o,s=null,c=null;function a(e){o=e}const p=()=>{s=u(),o&&o(),t(s,c,a),c=s},u=l((()=>n()),{lazy:!0,scheduler:()=>{if("post"==r.flush){Promise.resolve().then((()=>p()))}else p()}});r.immediate?p():c=u()};
//# sourceMappingURL=reactivity.cjs.js.map
