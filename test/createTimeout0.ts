import { createTimeout0 } from "../src/index";

const instance = createTimeout0();

interface IContext {
    count: number
};

instance.addListener(function listener1(ctx: IContext) {
    console.log(`${new Date().toTimeString()} listener1 count:`, ctx.count)
})

instance.addListener(function listener2(ctx: IContext) {
    console.log(`${new Date().toTimeString()} listener2 count:`, ctx.count)
})

instance.start(function fun(ins, ctx: IContext, name: string) {

    console.log("name:", name);
    console.log("ctx:", ctx);
    ctx.count++
    if (ctx.count >= 5) {
        return instance.cancel();
    }

    ins.next()
}, {
    count: 1
}, "tom")
