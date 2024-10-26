import { effect, track, trigger } from "./effect"

export function computed(getter){
    let value
    //这个dirty是配合调度器用的
    let dirty = true
    const effectFn = effect(getter,{
        lazy:true,
        scheduler:()=>{
            if(!dirty){
                //调度器执行就证明值有改变然后需要下次get的时候重新调用一下了
                dirty = true
                trigger(obj,'value')
            }
        }
    })
    const obj = {
        get value(){
            if(dirty){
                //执行这个activeEffect函数就已经设为当前的effectFn了
                //然后其内部再有其他的响应式对象，执行时会嵌套触发新的响应式对象读取，又给他们（内部的所有响应式对象）加上了这个active
                value = effectFn()
                dirty = false
            }
            //紧接着跟track，就把computed的effectFn收集了
            track(obj,'value')
            //实际上是把computed的value返回了
            return value
        }
    }
    return obj
}
