interface Options {
    createElement: (vnode:VNode) => HTMLElement
    insert:(el:HTMLElement,parents:HTMLElement) => void
    setElementText:(el:HTMLElement,text:string) => void
    patchProps:(el:HTMLElement,key:string,prevValue:string,nextValue:string) => void 
}
interface Render {
    render: (vnode:VNode,container:HTMLElement) => void
}
export function createRenderer(options:Options):Render{
    console.log("createRender触发")
    const {createElement,insert,setElementText} = options
    function mountElement(vnode:VNode,container:HTMLElement):void{
        const el = createElement(vnode)
        //处理props
        for(let key in vnode.props){
            if(Object.prototype.hasOwnProperty.call(vnode.props,key)){
                el.setAttribute(key,vnode.props[key])
            }
        }
        //处理子类节点
        if(typeof vnode.children =='string'){
            setElementText(el,vnode.children)
        }else if(Array.isArray(typeof vnode.children)){

        }
        insert(el, container)
    }
    function patch(n1:VNode,n2:VNode,container:HTMLElement):void{
        if(!n1){
            mountElement(n2,container)
        }else{

        }

    }
    function render(vnode:VNode,container:HTMLElement):void{
        if(vnode){
            patch(container._vnode,vnode,container)
        }else{
            if(container._vnode){
                //卸载载旧节点
                container.innerHTML = ''
            }
        }
        container._vnode = vnode
    }
    return {
        render
    }
}
//写成这样的目的是脱离完全依赖浏览器的掌控，让节点的操作是可人为定义的
export const renderer = createRenderer({
    createElement:(vnode:VNode) => {
        return document.createElement(vnode.type)
    },
    insert:(el:HTMLElement,container:HTMLElement) => {
        container.appendChild(el)
    },
    setElementText:(el:HTMLElement,text:string) => {
        el.textContent = text
    },
    patchProps:(el:HTMLElement,key:string,prevValue:string,nextValue:string) => {
        if(shouldSetAsProps(el,key)){
            const type = typeof el[key]
            if(type === 'boolean' && nextValue === ''){
                el[key] = true
            }else{
                el[key] = nextValue
            }
        }else{
            el.setAttribute(key,nextValue)
        }
    }
})