import NextGenerator from "./NextGenerator";

export function createRequestAnimationFrameGenerator() {

    const generator = function (cb: FrameRequestCallback) {

        let ticket: any;
        function next() {
            ticket = window.requestAnimationFrame(cb);
        }

        return {
            next,
            cancel: function () {
                cancelAnimationFrame(ticket);
            }
        }
    }

    const factory = new NextGenerator(generator);
    return factory
}


export function createTimeoutGenerator(interval: number = 1000) {
    const generator = function (cb: Function) {

        let ticket: number;
        function next() {
            ticket = setTimeout(cb, interval);
        }

        return {
            next,
            cancel: function () {
                clearTimeout(ticket);
            }
        }
    }

    const factory = new NextGenerator(generator);
    return factory;
}


export function createNextTimeout0Generator() {
    const generator = function (cb: Function) {

        let ticket: number;
        function next() {
            ticket = setTimeout(cb, 0);
        }

        return {
            next,
            cancel: function () {
                clearTimeout(ticket);
            }
        }
    }

    const factory = new NextGenerator(generator);
    return factory;
}

export function createNextGenerator() {
    const generator = function (cb: Function) {

        function next() {
            cb();
        }

        return {
            next,
            cancel: function () { }
        }
    }

    const factory = new NextGenerator(generator);
    return factory;
}