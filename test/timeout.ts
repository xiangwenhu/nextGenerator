import { createTimeoutGenerator } from "../index";


// const timeoutGenerator = function (cb: Function, interval: number = 1000) {

//     let ticket: number;
//     function execute() {
//         ticket = setTimeout(cb, interval);
//     }

//     return {
//         execute,
//         cancel: function () {
//             clearTimeout(ticket);
//         }
//     }
// }

// const nextFactory = new NextGenerator(timeoutGenerator);

const nextFactory = createTimeoutGenerator();

let context = {
    val: 0
};

let count = 0;

nextFactory.start(function (this: any, next, ...args: any[]) {

    count++;

    console.log("time:", Date.now());
    console.log("this:", this);
    console.log("args:", ...args);
    console.log(" ");
    context.val = count;

    if(count === 5){
       nextFactory.cancel();
    }

    if (count < 10) {
        // next(context, "param1-" + count, "param2-" + count);
        next(context, "param1-" + count, "param2-" + count);
    }

}, context, "param1", "param2")