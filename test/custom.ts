import NextGenerator from "../src/NextGenerator"

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