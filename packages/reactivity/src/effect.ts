
import type { Dep } from './dep'
//清除函数
function cleanup(effectFn){
    for(let i = 0 ; i < effectFn.deps.length;i++){
        const deps = effectFn.deps[i]
        deps.delete(effectFn)
    }
    effectFn.deps.length = 0;
}
export const ITERATE_KEY = Symbol()
//这个bucket就是来存副作用函数的
const bucket = new WeakMap<any,Map<string,Set<Function>>>();
//用一个全局变量activeEffect来存储被注册的副作用函数
let activeEffect:any
//这个栈：当发生effect嵌套时，会出现第二个(子effect)把第一个（父effect）的activeEffect给覆盖(因为同时activeEffect的值只有一个)，所以需要一个栈来存储正在执行的副作用函数，副作用函数执行完毕就给弹出
const effectStack:Array<any> = []
// class RectiveEffect<T = any>{
//     //因为set的时候改变值会触发新的set，所以为了避免死循环，需要一个字段来识别是否执行这个副作用函数,true就是这个副作用函数在执行，false就是没有执行就要触发。
//     //因为在一开始创建effect的时候肯定是接下来在触发的（这就是业务要求)所以初始为true,接下来执行完就需要手动设置为false
//     active=true
//     //这个deps就是用来存放副作用函数的
//     deps:Dep[] = []
// }
//effect函数
export function effect(fn:() => any,options:Object = {}){ 
    const effectFn = () => {
        cleanup(effectFn)
        activeEffect = effectFn
        effectStack.push(effectFn)
        const result = fn()
        effectStack.pop()
        //把栈顶函数拿出来给active,就是为了解决嵌套
        activeEffect = effectStack[effectStack.length - 1]   
        return result
    }
    //源码里的effectFn是一个class类
    effectFn.deps = []
    effectFn.options = options
    if(!options.lazy){
        effectFn()
    }
    return effectFn
}
//track ,目的是把当前的activeEffect存储到target和key的依赖集合中
export const track = <T>(target:T,key:string |symbol):void => {
    //这里的判断是，当副作用函数effect已经执行完，接下来系统中某个地方改变了代理值，effect取出重新执行时，依然会触发代理的get（这时候就没有必要再注册一边了）。这个时候是没有active的，所以用这个来让其避免重复注册
    if(!activeEffect) return
    let depsMap = bucket.get(target)
    if(!depsMap) bucket.set(target,(depsMap = new Map()));
    let deps = depsMap.get(key)
    if(!deps) depsMap.set(key,(deps = new Set()))
    deps.add(activeEffect)
    activeEffect.deps.push(deps)
}
//trigger,目的是把当前target和key的依赖集合中的函数取出并执行一遍
export const trigger = <T>(target:T,key:string,type:string |symbol,newVal?:any):void => {
    let depsMap = bucket.get(target)
    if(!depsMap) return
    let deps = depsMap.get(key)
    const effectsToRun = new Set()
    if(type == 'ADD') {
        //把跟ITERATE绑定的（forin这种情况）拿出执行
        const iterateEffects = depsMap.get(ITERATE_KEY)
        iterateEffects && iterateEffects.forEach(effectFn => {
            if (effectFn !== activeEffect) {
                effectsToRun.add(effectFn)
            }
        })
    }   
    //如果是数组。那么需要额外处理
    if(type === 'ADD' && Array.isArray(target)){
        const lengthEffects = depsMap.get('length')
        lengthEffects && lengthEffects.forEach(effectFn => {
            if(effectFn !== activeEffect){
                effectsToRun.add(effectFn)
            }
        })
    }
    //如果改变length，就需要把大于等于length的值拿出来遍历
    if(Array.isArray(target) && key === 'length'){
        depsMap.forEach((effects,key) => {
           if(key >= newVal){
            effects.forEach(effectFn => {
                if(effectFn !== activeEffect){
                    effectsToRun.add(effectFn)
                }
            })
           }
        })
    }
    deps && deps.forEach(effect => {
        if(effect != activeEffect) {
            effectsToRun.add(effect)
        }
    })
    effectsToRun.forEach(effectFn => {
        if(effectFn.options.scheduler){
            effectFn.options.scheduler(effectFn)
        }else{
            effectFn()
        }
    })
}
