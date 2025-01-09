interface VNode{
    type: string,
    children: VNode[] | string,
    props?: any,
    key?: string,
    component?: Function,
}
interface VHTMLElement extends HTMLElement{
    _vnode: VNode | undefined
}
