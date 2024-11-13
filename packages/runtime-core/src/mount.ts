// import {createElement,insert,setElementText,patchProps} from './renderer'
// export function shouldSetAsProps(el:HTMLElement,key:string):Boolean{
//     return key === 'form' && el.tagName === 'INPUT' ? false : key in el
//  }
// function setProps(el:HTMLElement,vnode:VNode):void{
//     if(vnode.props) {
//         for(const key in vnode.props){
//             patchProps(el,key,null,vnode.props[key)
//         }
//     }
// }
// function mountElement(vnode:VNode,container:HTMLElement):void{
//     const el = document.createElement(vnode.type);
//     //设置props
//     setProps(el,vnode)
//     insert(el,container);
// }
