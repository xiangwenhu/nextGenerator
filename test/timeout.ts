import { createTimeoutGenerator } from "../";

const nextFactory = createTimeoutGenerator();

let context = {
    counts: 0
};

nextFactory.start(function cb(this: any, next: Function, ...args: any[]) {

    context.counts ++;

    console.log("counts", context.counts);
    console.log("args", ...args);
    if(context.counts > 3){
        nextFactory.cancel();
    }
    
    next(2,3,4,5);

}, context, 1, 2, 3, 4);

