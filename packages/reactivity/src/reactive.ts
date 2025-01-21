import { track,trigger ,ITERATE_KEY} from "./effect";
//重写includes,indexof函数，因为原来的这几个函数的this指向是响应式对象
const originMethod = Array.prototype.includes
const arrayInstrumentations = {}
const methods = ['include','indexOf','lastIndexOf']
methods.forEach(method => {
    const originMethod = Array.prototype[method]
    arrayInstrumentations[method] = function(...args){
        let res = originMethod.apply(this,args)
        if(res === false || res === -1){
            res = originMethod.apply(this.raw,args)
        }
        return res
    }
})
//一个标记变量，代表是否进行跟踪。默认为true,代表允许跟踪
let shouldTrack:Boolean = true
let changeLengthmethods = ['push']
changeLengthmethods.forEach(method => {
    const originMethod = Array.prototype[method]
})
export function createReactive(data:Object,isShallow = false,isReadonly = false){ 
    return new Proxy(data, {
        get(target, key,receiver) {   
            if(key === 'raw') return target
            if(Array.isArray(target) && arrayInstrumentations.hasOwnProperty(key)) return Reflect.get(arrayInstrumentations,key,receiver)
            if(!isReadonly && typeof key !== 'symbol') track(target,key)    
            //Reflect对象，后面的receiver是对象本身，类似this
            const res =  Reflect.get(target,key,receiver); 
            if(typeof res == 'object' && res!=null && !isShallow){
                return isReadonly ? readonly(res) : reactive(res)
            }
            return res // 返回属性值
        },
        set(target, key, newVal,receiver) {
            //判断是否只读
            if(isReadonly){
                console.warn(`属性${key} 是只读的`)
                return true
            }
            //先获取旧值
            const oldVal = target[key]
            //属性不存在就添加新属性，否则就是设置已有已有属性
            const type = Array.isArray(target) ? Number(key) < target.length ? 'SET':'ADD'  : Object.prototype.hasOwnProperty.call(target,key) ? 'SET':'ADD'
            //设置属性值
            const res = Reflect.set(target, key, newVal, receiver)  // 设置新值
            // 触发所有副作用函数
            if(target === receiver.raw){
                if(oldVal != newVal && (oldVal === oldVal || newVal === newVal)) trigger(target,key,type,newVal)
            }
            return true;
        },
        //has来对in操作符来拦截
        has(target,key){
            track(target,key)
            return Reflect.get(target,key);
        },
        //拦截forin
        ownKeys(target) {
            // 将副作用函数与 ITERATE_KEY 关联,拦截for...in
            track(target, Array.isArray(target) ? 'length' : ITERATE_KEY)
            return Reflect.ownKeys(target)
        },
        //拦截删除
        deleteProperty(target,key){
            if(isReadonly){
                console.warn(`属性${key} 是只读的`)
                return true
            }
            const hadKey = Object.prototype.hasOwnProperty.call(target,key)
            const res = Reflect.deleteProperty(target, key)
            if (res && hadKey) {
                // 只有当被删除的属性是对象自己的属性并且成功删除时，才触发更新
                trigger(target, key, 'DELETE')
            }
            return res
        }
    });
}
//这个值用来记录Obj是否已经创建过代理对象
const reactiveMap = new Map()
//建立深响应
export function reactive(data:Object){
    //如果传入的对象曾经创建过响应式对象，就把曾经创建的对象返回出去
    const proxyObj = reactiveMap.get(data)
    if(proxyObj) return proxyObj
    const nowObj = createReactive(data)
    //存起来避免重复创建
    reactiveMap.set(data,nowObj)
    return nowObj
}
//建立浅响应
export function shallowReactive(data:any){
    return createReactive(data,true)
}
export function readonly(data:Object){
    return createReactive(data,false,true)
}
export function shallowReadonly(data:Object){
    return createReactive(data,true,true)
}