import { createTimeoutGenerator } from "..";

const nextFactory = createTimeoutGenerator();

let context = {
    counts: 0
};

nextFactory.start(function (this: any, next: Function) {

    context.counts ++;

    console.log("counts", context.counts);
    if(context.counts > 3){
        nextFactory.cancel();
    }
    
    next();

}, context);

