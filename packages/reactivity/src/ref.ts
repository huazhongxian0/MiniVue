import { reactive } from "./reactive"
export function ref(value:any){
    const wrapper = {
        value:value
    }
    Object.defineProperty(wrapper,'__v_isRef',{value:true})
    return reactive(wrapper)
}
export function toRef(obj:Object,key:string){
    const wrapper = {
        get value(){
            return obj[key]
        },
        set value(newVal){
            obj[key] = newVal
        }
    }
    Object.defineProperty(wrapper,'__v_isRef',{value:true})
    return wrapper
}
export function toRefs(obj:Object){
    const ret = {}
    for(const key in obj){
        ret[key] = toRef(obj,key)
    }
    return ret
}
export function proxyRefs(target){
    return new Proxy(target,{
        get(target,key,receiver){
            const value = Reflect.get(target,key,receiver)
            //是ref就用这个来返回.value后的值，不是ref就不返回
            return value.__v_isRef ? value.value : value
        }
    })
}