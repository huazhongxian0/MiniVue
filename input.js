console.log('test begin');
setTimeout(() => { 
    console.log('first setTime');
    Promise.resolve().then(e => {
        console.log('first resolve');
    })
},0)
setTimeout(() => { 
    console.log('second setTime');
    Promise.resolve().then(e => {
        console.log('second resolve');
    })
},0)
console.log('test end')
//test begin => test end => first setTime => second setTime => first resolve => second resolve => second resolve =>