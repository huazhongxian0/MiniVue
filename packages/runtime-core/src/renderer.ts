export function renderer(DomString:string,dom:HTMLElement){
    dom.innerHTML = DomString
}
interface Options {
    createElement: (vnode:VNode) => HTMLElement
    insert:(el:HTMLElement,parents:HTMLElement) => void
    setElementText:(el:HTMLElement,text:string) => void
}
interface Render {
    render: (vnode:VNode,container:HTMLElement) => void
}
//校验函数，校验prop是否是DOM上该有的prop
function shouldSetAsProps(el:HTMLElement,key:string,value){
    if(key == 'form' && el.tagName == 'INPUT') return false
    return key in el
}

export function createRenderer(options:Options):Render{
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
    //补丁函数
    function patch(n1:VNode,n2:VNode,container:HTMLElement):void{
        
    }
    function render(vnode:VNode,container:HTMLElement):void{

    }
    return {
        render
    }
}
//写成这样的目的是脱离完全依赖浏览器的掌控，让节点的操作是可人为定义的
const render = createRenderer({
    createElement:(vnode:VNode) => {
        return document.createElement(vnode.type)
    },
    insert:(el:HTMLElement,container:HTMLElement){
        container.appendChild(el)
    },
    setElementText:(el:HTMLElement,text:string){
        el.textContent = text
    }
})