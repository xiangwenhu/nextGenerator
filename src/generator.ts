import NextGenerator from "./NextGenerator"

export function createRequestAnimationFrame() {

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


export function createTimeout(interval: number = 1000) {
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


export function createTimeout0() {
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

export function createNext() {
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