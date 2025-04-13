## nextGenerator
面向next编程思想，封装下一次的调用逻辑，比较经典的场景就是`setTimeout`,`requestAnimationFrame`。

调用`next`即进入下一个周期。

## 特性
* 内置支持setTimeout
* 内置支持requestAnimationFrame
* 内置支持通用nextGenerator
* 支持自定义


## 实例支持的方法
```typescript
interface INextGenerator {
    /**
     * 添加监听函数
     */
    addListener(listener: ListenerFunction): void;
    /**
     * 移除监听函数
     */
    removeListener(listener: ListenerFunction): void;
    /**
     * 移除全部监听函数
     */
    removeAllListener(): void;
    /**
     * 取消，即暂停
     */
    cancel(): void;
    /**
     * 开始
     */
    start(nextFunc: NextStartFunc<INextGenerator>, ...args: any[]): void;
    /**
     * 继续，取消后，可以继续
     */
    continue(): void;
    /**
     * 进入下一次
     */
    next(): void;
    /**
     * 销毁
     */
    destroy(): void;
}
```

## 代码示例

###  createTimeout 
下面代码：
每秒调用一次回调函数， 5次后，取消调用。
```js
import { createTimeout, NextGenerator } from "next-generator-js";

const instance = createTimeout();

interface IContext {
    count: number
};

instance.addListener(function listener1(ctx: IContext) {
    console.log(`${new Date().toTimeString()} listener1 count:`, ctx.count)
})

instance.addListener(function listener2(ctx: IContext) {
    console.log(`${new Date().toTimeString()} listener2 count:`, ctx.count)
})

instance.start(timeoutHandler, {
    count: 1
})

// 单独文件定义处理函数
function timeoutHandler(ins: NextGenerator, ctx: IContext) {
    ctx.count++
    if (ctx.count >= 5) {
        return ins.cancel();
    }

    ins.next()
}


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

### createNext

```typescript
import { createNext, NextGenerator } from "next-generator-js";


function delay(duration: number = 1000) {
    return new Promise(resolve => {
        setTimeout(resolve, duration)
    })
}

const instance = createNext();

interface IContext {
    count: number
};

instance.addListener(function listener1(ctx: IContext) {
    console.log(`${new Date().toTimeString()} listener1 count:`, ctx.count)
})

instance.addListener(function listener2(ctx: IContext) {
    console.log(`${new Date().toTimeString()} listener2 count:`, ctx.count)
})

instance.start(handler, {
    count: 1
})

// 单独文件定义处理逻辑。
async function handler(ins: NextGenerator, ctx: IContext) {

    // 自定义的异步任务
    await delay();

    ctx.count++
    if (ctx.count >= 5) {
        return ins.cancel();
    }

    ins.next()
}
```

### createRequestAnimationFrame
```html
<script setup lang="ts">
import { createRequestAnimationFrame } from "next-generator-js"

const raf = createRequestAnimationFrame();


let time = performance.now();

raf.addListener(() => {
  console.log("raf listener");
})

raf.start((ins) => {
  const now = performance.now();
  console.log("raf fun: ", now - time)
  time = now;

  ins.next();
})

</script>
```

### 自定义
```typescript
import NextGenerator from "next-generator-js"

// 每次增加100ms
export function createStepUp(baseDuration: number = 1000) {
    // 次数
    let times = 1;

    const generator = function (cb: Function) {

        let ticket: any;
        function next() {
            ticket = setTimeout(cb, times * baseDuration);
            times++
        }

        return {
            next,
            cancel: function () {
                clearTimeout(ticket);
            }
        }
    }

    const factory = new NextGenerator(generator);
    return factory
}


interface IContext {
    count: number
};

const instance = createStepUp();

instance.addListener(function (ctx: IContext) {
    console.log(`${new Date().toTimeString()} count:`, ctx.count)
})

const ctx = {
    count: 1
}
instance.start((ins, ctx: IContext) => {

    ctx.count++;
    if (ctx.count >= 5) {
        return ins.cancel();
    }
    ins.next();
}, ctx)


// 输出
// 22:37:44 GMT+0800 (中国标准时间) count: 1
// 22:37:45 GMT+0800 (中国标准时间) count: 2
// 22:37:47 GMT+0800 (中国标准时间) count: 3
// 22:37:50 GMT+0800 (中国标准时间) count: 4
// 22:37:54 GMT+0800 (中国标准时间) count: 5

```