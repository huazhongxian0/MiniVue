type VNode{
    type: string,
    children: VNode[] | string,
    props?: any,
    key?: string,
    component?: Function,
}