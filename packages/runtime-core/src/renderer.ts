interface Options {
    createElement: (vnode:VNode) => HTMLElement
    insert:(el:HTMLElement,parents:HTMLElement) => void
    setElementText:(el:HTMLElement,text:string) => void
    patchProps:(el:HTMLElement,key:string,prevValue:string,nextValue:string) => void 
}
interface Render {
    render: (vnode:VNode,container:VHTMLElement) => void
}
function shouldSetAsProps(el:HTMLElement,key:string):Boolean{
    return key === 'form' && el.tagName === 'INPUT' ? false : key in el
}
export function createRenderer(options:Options):Render{
    const {createElement,insert,setElementText,patchProps} = options
    //设置props
    function setProps(el:HTMLElement,vnode:VNode):void{
        if(vnode.props) {
            for(const key in vnode.props){
                patchProps(el,key,null,vnode.props[key])
            }
        }
    }   
    function mountElement(vnode:VNode,container:VHTMLElement):void{
        const el = createElement(vnode)
        setProps(el,vnode)
        //处理子类节点
        if(typeof vnode.children =='string'){
            setElementText(el,vnode.children)
        }else if(Array.isArray(vnode.children)){
            vnode.children.forEach(child => patch(null,child,el as VHTMLElement))
        }
        insert(el, container)
    }
    function patch(n1:VNode | undefined | null,n2:VNode,container:VHTMLElement):void{
        if(!n1){
            mountElement(n2,container)
        }else{

        }

    }
    function render(vnode:VNode,container:VHTMLElement):void{
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
    patchProps:(el:HTMLElement,key:string,prevValue:string | null,nextValue:string | null) => {
        if(shouldSetAsProps(el,key)){
            const type = typeof el[key as keyof HTMLElement]
            if(type === 'boolean' && nextValue === ''){
                el[key] = true
            }else{
                el[key] = nextValue
            }
        }else{
            el.setAttribute(key,nextValue as string)
        }
    }
})