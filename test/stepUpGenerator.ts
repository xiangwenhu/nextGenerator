import { createStepUpGenerator } from "../index";

// let interval = 100;
// const stepUpGenerator = function (cb: Function) {


//     let ticket: any;
//     function execute() {
//         interval = interval * 2;
//         ticket = setTimeout(cb, interval);
//     }

//     return {
//         execute,
//         cancel: function () {
//             clearTimeout(ticket);
//         }
//     }
// }

// const nextFactory = new NextGenerator(stepUpGenerator);

const nextFactory = createStepUpGenerator(100);


let context = {
    val: 0
};

let lastTime = Date.now();
nextFactory.start(function (this: any, next, ...args: any[]) {
  
    const now = Date.now();


    console.log("time:", Date.now());
    console.log("costt time", now - lastTime);
    lastTime = now;
    console.log(" ");

    next(context);
  

}, context, "param1", "param2")