import { createTimeout, NextGenerator } from "../src";

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

instance.start(handler, {
    count: 1
})

// 单独文件定义处理函数
function handler(ins: NextGenerator, ctx: IContext) {
    ctx.count++
    if (ctx.count >= 5) {
        return ins.cancel();
    }

    ins.next()
}



