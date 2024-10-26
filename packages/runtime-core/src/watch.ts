import { effect } from "packages/reactivity/index";

export function watch(source:any,cb:Function,options:{immediate:boolean,flush?:string} = {immediate:false}){
    //定义一个getter来接一个函数，如果函数的
    let getter:Function
    if(typeof source === 'function'){
        getter = source
    }else{
        getter = () => traverse(source)
    }
    //闭包保存此时的新值和旧值
    let newValue:any = null,oldValue:any = null
    //定义一个函数寄存外部传来的fn
    let cleanup:Function
    function onInvalidate(fn:Function){
        cleanup = fn
    }
    const job = () =>{
        //执行副作用函数拿到新值   
        newValue = effectFn()
        //执行watch传入的函数
        if(cleanup) cleanup()
        cb(newValue,oldValue,onInvalidate)
        //把旧值更新
        oldValue = newValue
    }
    const effectFn = effect(() => getter(),{
        lazy:true,
        scheduler:() => {
            if(options.flush == 'post'){
                const p = Promise.resolve()
                p.then(() => job())
            }else{
                job()
            }
        }
    })
    //第一次执行拿到添加响应式依赖
    if(options.immediate){
        job()
    }else{
        oldValue = effectFn()
    }
}
function traverse<T>(value:T,seen:Set<any> = new Set()):T|void{
    if(typeof value != 'object' || value == null || seen.has(value)) return
    seen.add(value)
    for (const key in value as Object) {
        traverse(value[key as keyof Object],seen)
    }
    return value
}