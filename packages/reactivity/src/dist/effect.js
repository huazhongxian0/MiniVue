//用这个桶来存放副作用函数
var bucket = new Set();
//期待的副作用函数
function effect() {
    document.body.innerHTML = obj.text;
}
//原始数据
var data = { text: 'hello world' };
//为原始数据做代理
var obj = new Proxy(data, {
    get: function (target, key) {
        bucket.add(effect);
        return target[key];
    },
    set: function (target, key, newVal) {
        target[key] = newVal;
        //从桶中取出副作用函数执行
        bucket.forEach(function (fn) { return fn(); });
        return true;
    }
});
//执行函数注册
effect();
//拿出函数执行
setTimeout(function () {
    obj.text = 'hello vue3';
}, 1000);
