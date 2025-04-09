## nextGenerator
面向next编程思想，封装下一次的调用逻辑，比较经典的场景就是`setTimeout`,`requestAnimationFrame`。

调用`next`即进入下一个周期。

## 代码示例

### setTimeout 
下面代码：
每秒调用一次回调函数， 5次后，取消调用。
```js
const nextFactory = createTimeoutGenerator();

interface IContext {
    count: number
};

nextFactory.addListener(function listener1(ctx: IContext) {
    console.log(`${new Date().toTimeString()} listener1 count:`, ctx.count)
})

nextFactory.addListener(function listener2(ctx: IContext) {
    console.log(`${new Date().toTimeString()} listener2 count:`, ctx.count)
})

nextFactory.start(function fun(next, ctx: IContext) {

    ctx.count++
    if (ctx.count >= 5) {
        return nextFactory.cancel();
    }

    next()
}, {
    count: 1
})


// 输出:
// 11:03:24 GMT+0800 (中国标准时间) listener1 count: 1
// 11:03:24 GMT+0800 (中国标准时间) listener2 count: 1
// 11:03:25 GMT+0800 (中国标准时间) listener1 count: 2
// 11:03:25 GMT+0800 (中国标准时间) listener2 count: 2
// 11:03:26 GMT+0800 (中国标准时间) listener1 count: 3
// 11:03:26 GMT+0800 (中国标准时间) listener2 count: 3
// 11:03:27 GMT+0800 (中国标准时间) listener1 count: 4
// 11:03:27 GMT+0800 (中国标准时间) listener2 count: 4
// 11:03:28 GMT+0800 (中国标准时间) listener1 count: 5
// 11:03:28 GMT+0800 (中国标准时间) listener2 count: 5

```