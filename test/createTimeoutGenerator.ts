import { createTimeoutGenerator } from "../src";

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

nextFactory.start(function fun(next, ctx: IContext, ) {

    ctx.count++
    if (ctx.count >= 5) {
        return nextFactory.cancel();
    }

    next()
}, {
    count: 1
})



