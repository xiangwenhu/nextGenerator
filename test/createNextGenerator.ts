import { createNextTimeout0Generator } from "../src";

const nextGenerator = createNextTimeout0Generator();


interface IContext {
    count: number
};

nextGenerator.addListener(function (this: IContext, next) {
    this.count++;
    console.log("count:", this.count)
    if (this.count >= 10) return nextGenerator.cancel();
    next()
})


nextGenerator.start({
    count: 1
})
