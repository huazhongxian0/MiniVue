function mountElement(vnode:VNode,container:HTMLElement){
    const el = document.createElement(vnode.type);
    const props = vnode.props
    for (const key in props) {
        if (Object.prototype.hasOwnProperty.call(props, key)) {
            el.setAttribute(key,props[key])
        }
    }
    // insert(el,container);
}