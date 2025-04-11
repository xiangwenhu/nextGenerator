import { createNext, NextGenerator } from "../src";


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
    await delay();

    ctx.count++
    if (ctx.count >= 5) {
        return ins.cancel();
    }

    ins.next()
}



