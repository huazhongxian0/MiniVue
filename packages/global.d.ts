interface VNode{
    type: string  | ComponentType,
    children: VNode[] | string,
    props?: Record<string,any>,
    key?: string,
    el?: VHTMLElement,
    component: ComponentType
}
interface ComponentType{
    state:Record<string,any>,
    isMounted:boolean,
    subTree:VNode | null,
    beforeCreate?:Function,
    created?:Function,
    beforeMount?:Function,
    mounted?:Function,
    data?:() => Record<string,any>,
    props?:Record<string,any>,
    render?:() => VNode
    beforeUpdate?:Function,
    updated?:Function
}
interface VHTMLElement extends HTMLElement{
    _vnode: VNode | undefined
}
