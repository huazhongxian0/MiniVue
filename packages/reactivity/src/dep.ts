export type Dep = Map<ReactiveEffect,number>&{
    cleanup:() => void
}
//导出一个函数用来创建dep
export const createDep = (cleanup:() => void,computed?:ComputedRefImpl<any>)