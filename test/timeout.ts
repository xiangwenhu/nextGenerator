import { createTimeoutGenerator } from "../src";

const nextFactory = createTimeoutGenerator();

interface IContext {
    count: number
};

nextFactory.addListener(function listener(this: IContext, next, ...args: any[]) {
    next();
    console.log("listener1: count", this.count);
    console.log("listener1: args", ...args);
});

nextFactory.addListener(function listener2(this: IContext, next, ...args: any[]) {
    this.count++;
    console.log("listener2: count", this.count);
    console.log("listener2: args", ...args);
    if (this.count >= 3) {
        return nextFactory.cancel();
    }
    next();
})

nextFactory.start({
    count: 0
}, 1, 2, 3, 4);

nextFactory.start({
    count: 0
}, 1, 2, 3, 4);



