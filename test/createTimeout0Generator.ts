import { createTimeout0Generator } from "../src";

const nextFactory = createTimeout0Generator();

interface IContext {
    count: number
};

nextFactory.addListener(function listener1(ctx: IContext) {
    console.log(`${new Date().toTimeString()} listener1 count:`, ctx.count)
})

nextFactory.addListener(function listener2(ctx: IContext) {
    console.log(`${new Date().toTimeString()} listener2 count:`, ctx.count)
})

nextFactory.start(function fun(next, ctx: IContext, name: string) {

    console.log("name:", name);
    console.log("ctx:", ctx);
    ctx.count++
    if (ctx.count >= 5) {
        return nextFactory.cancel();
    }

    next()
}, {
    count: 1
}, "tom")
