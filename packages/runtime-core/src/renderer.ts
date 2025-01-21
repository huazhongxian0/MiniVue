import {effect, reactive, shallowReactive} from '../../reactivity/index'
import {queueJob} from './queue'
interface Options {
    createElement: (vnode:VNode) => VHTMLElement
    insert:(el:HTMLElement,parents:HTMLElement) => void
    setElementText:(el:HTMLElement,text:string) => void
    patchProps:(el:HTMLElement,key:string,prevValue:string,nextValue:string) => void 
    createText: (text:string) => Text
    setText: (el:VHTMLElement,text:string) => void
}
interface Render {
    render: (vnode:VNode,container:VHTMLElement) => void
}
function shouldSetAsProps(el:HTMLElement,key:string):Boolean{
    return key === 'form' && el.tagName === 'INPUT' ? false : key in el
}
export function createRenderer(options:Options):Render{
    const {createElement,insert,setElementText,patchProps,createText,setText} = options
    //设置props
    function setProps(el:HTMLElement,vnode:VNode):void{
        if(vnode.props) {
            for(const key in vnode.props){
                patchProps(el,key,null,vnode.props[key])
            }
        }
    }
    function diff(oldChildren:VNode[],newChildren:VNode[],el:VHTMLElement){
         //其实这里就是diff
                // 1.无优化，假diff
                const oldlen = oldChildren.length
                const newlen = newChildren.length
                const commonlen = Math.min(oldlen,newlen)
                for(let i = 0;i < commonlen;i++){
                    patch(oldChildren[i],newChildren[i],el)
                }
                if(newlen > oldlen){
                    for(let i = commonlen;i < newlen;i++){
                        patch(null,newChildren[i],el)
                    }
                }else if(newlen < oldlen){
                    for(let i = commonlen;i < oldlen;i++){
                        unmount(oldChildren[i])
                    }
                }
                // 2.快速diff（好tm难啊～～～）
                // const oldChildren = n1.children
                // const newChildren = n2.children
                // for(let i = 0;i < newChildren.length;i++){
                //     const newChild = newChildren[i]
                //     for(let j = 0;j < oldChildren.length;j++){
                //         const oldChild = oldChildren[j]
                //         if(oldChild.key === newChild.key){
                //             patch(oldChild,newChild,el)
                //             break
                //         }
                //     }
                // }
    }   
    function mountElement(vnode:VNode,container:VHTMLElement):void{
        const el = vnode.el = createElement(vnode)
        setProps(el,vnode)
        //处理子类节点
        if(typeof vnode.children =='string'){
            setElementText(el,vnode.children)
        }else if(Array.isArray(vnode.children)){
            vnode.children.forEach(child => patch(null,child,el as VHTMLElement))
        }
        if(vnode.props){
            for(const key in vnode.props){
                patchProps(el,key,null,vnode.props[key])
            }
        }
        insert(el, container)
    }
    function patchChildren(n1:VNode,n2:VNode,el:VHTMLElement):void{
        if(typeof n2.children === 'string'){
            if(Array.isArray(n1.children)){
                n1.children.forEach(child => unmount(child))
            }
            setElementText(el,n2.children)
        } else if(Array.isArray(n2.children)){
            if(Array.isArray(n1.children)){
               diff(n1.children,n2.children,el)
            }else{
                setElementText(el,'')
                n2.children.forEach(child => patch(null,child,el))
            }
            
        } else {
            if(Array.isArray(n1.children)){
                n1.children.forEach(child => unmount(child))
            }else if(typeof n1.children === 'string'){
                setElementText(el,'')
            }
        }
    }
    function patchElement(n1:VNode,n2:VNode):void{
        const el = n2.el = n1.el
        const oldProps = n1.props
        const newProps = n2.props
        for(const key in newProps){
            if(oldProps?.[key] !== newProps?.[key]){
                patchProps(el,key,oldProps?.[key],newProps?.[key])
            }
        }
        patchChildren(n1,n2,el)
    }
    function resolveProps(options:Record<string,any> | undefined = {},propsData:Record<string,any>  | undefined):[Record<string,any>,Record<string,any>]{
        const props:Record<string,any> = {}
        const attrs:Record<string,any> = {}
        for(const key in propsData){
            if(key in options){
                props[key] = propsData[key]
            } else {
                attrs[key] = propsData[key]
            }
        }
        return [props,attrs]
    }
    function mountComponent(n2:VNode,container:VHTMLElement,anchor:VHTMLElement):void{
        const componentOptions = n2.type as ComponentType
        const {setup,render,data,beforeCreate,created,beforeMount,mounted,beforeUpdate,updated, props:propsOption} = componentOptions
        beforeCreate && beforeCreate()
        //这里其实返回了一个虚拟dom
        const state = reactive(data?.() || {})
        const [props,attrs] = resolveProps(propsOption,n2.props)
        const instance:ComponentType = {
            state,
            props: shallowReactive(props),
            isMounted:false,
            subTree:null
        }

        const setupContext = {attrs}


        n2.component = instance as ComponentType
        const setupResult = setup(shallowReactive(instance.props),setupContext)
        const renderContext = new Proxy(instance,{
            get(t,k,r){
                const { state,props } = t
                if(state && k in state){
                    return state[k]
                } else if(props && k in props){
                    return props[k]
                } else {
                    console.error('不存在')
                }
            },
            set (t,k,v,r){
                const {state,props} = t
                if(state && k in state){
                    state[k] = v
                } else if(props && k in props){
                    console.warn('props 是只读的')
                } else {
                    console.error('不存在')
                }
                return true
            }
        })
        created && created.call(renderContext)
        effect(() => {
            const subTree = render?.call(renderContext,state)
            if(!instance.isMounted){
                beforeMount && beforeMount.call(renderContext)
                patch(null,subTree as VNode,container,anchor)
                instance.isMounted = true
                mounted && mounted.call(renderContext)
            }else{
                beforeUpdate && beforeUpdate.call(renderContext)
                patch(instance.subTree,subTree as VNode,container,anchor)
                updated && updated.call(renderContext)
            }
            instance.subTree = subTree as VNode
        }, {scheduler:queueJob})
    }
    function hasPropsChanged(prevProps:Record<string,any>,nextProps:Record<string,any>):boolean{
        const nextKeys = Object.keys(nextProps)
        if(nextKeys.length !== Object.keys(prevProps).length) return true
        for(let i = 0;i < nextKeys.length;i++){
            const key = nextKeys[i]
            if(prevProps[key] !== nextProps[key]) return true
        }
        return false
    }
    function patchComponent(n1:VNode,n2:VNode,anchor:VHTMLElement):void{
        const instance = (n2.component = n1.component)
        const {props} = instance
        if(hasPropsChanged(n1.props as Record<string,any>,n2.props as Record<string,any>)){
            const [nextProps] = resolveProps(n2.type.props as Record<string,any> ,n2.props as Record<string,any>)
            for(const key in nextProps){
                props[key] = nextProps[key]
            }
            for(const key in props){
                if(!(key in nextProps)) delete props[key]
            }
        }
    }
    function patch(n1:VNode | undefined | null,n2:VNode,container:VHTMLElement,anchor?:VHTMLElement):void{
        if(n1 && n1.type !== n2.type){
            unmount(n1)
            n1 = null
        }
        const {type} = n2
        if(typeof type === 'string'){
            if(!n1){
                mountElement(n2,container)
            }else{
                patchElement(n1,n2)
            }
        }else if(typeof type === 'object'){
            //object代表是组件
            if(!n1){
                mountComponent(n2,container,anchor as VHTMLElement)
            } else{
                patchComponent(n1,n2,anchor as VHTMLElement)
            }
        }else if(type === Text){
            if(!n1){
                const el = n2.el =  createText(n2.children as string)
                insert(el as any,container)
            }else{
                // 如果旧 vnode 存在，只需要使用新文本节点的文本内容更新旧文本节点即
                const el = n2.el = n1.el
                if(n2.children !== n1.children){
                    setText(el as VHTMLElement, n2.children as string)
                }
            }
        }

    }
    function render(vnode:VNode,container:VHTMLElement):void{
        if(vnode){
            patch(container._vnode,vnode,container)
        }else{
            if(container._vnode){
                unmount(container._vnode)
            }
        }
        container._vnode = vnode
    }
    function unmount(vnode:VNode):void{
        const parent = vnode.el?.parentNode
        if(parent){
            parent.removeChild(vnode.el as Node)
        }
    }
    return {
        render
    }
}
//写成这样的目的是脱离完全依赖浏览器的掌控，让节点的操作是可人为定义的
export const renderer = createRenderer({
    createElement:(vnode:VNode) => {
        return document.createElement(vnode.type) as VHTMLElement
    },
    insert:(el:HTMLElement,container:HTMLElement) => {
        container.appendChild(el)   
    },
    setElementText:(el:HTMLElement,text:string) => {
        el.textContent = text
    },
    patchProps:(el:HTMLElement,key:string,prevValue:string | null,nextValue:string | null) => {
        if(/^on/.test(key) && typeof nextValue === 'function'){
            const invokers = el._vei || (el._vei = {})
            // 获取为该元素伪造的事件处理函数 invoker
            let invoker = invokers[key]
           // 根据属性名称得到对应的事件名称，例如 onClick ---> click
            const name = key.slice(2).toLowerCase();
            if(nextValue){
                if(!invoker){
                    invoker = el._vei[key]= (e:Event) => {
                        if (e.timeStamp < invoker.attached) return
                        if(Array.isArray(invoker.value)){
                            invoker.value.forEach((fn:Function) => fn(e))
                        }else{
                            invoker.value(e)
                        }
                    }
                    invoker.value = nextValue
                    invoker.attached = performance.now()
                    el.addEventListener(name,invoker)
                }else{
                    invoker.value = nextValue
                }
            }else if(invoker){
                //没有nextValue,但又有invoker，证明是卸载时间
                el.removeEventListener(name,invoker)
            }
        } else if (shouldSetAsProps(el,key)){
            const type = typeof el[key as keyof HTMLElement];
            if(type === 'boolean' && nextValue === ''){
                el[key] = true;
            }else{
                el[key] = nextValue;
            }
        }else{
            if (nextValue === null) {
                el.removeAttribute(key);
            } else {
                el.setAttribute(key, nextValue as string);
            }
        }
    },
    createText(text) {
        return document.createTextNode(text)
    },
    setText(el:VHTMLElement,text:string) {
        el.nodeValue = text
    }
})