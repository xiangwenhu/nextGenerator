interface Unsubscribe {
    (): void
}

interface CallbackFunction<T = any> {
    (...args: any[]): void
}

interface NextFnInfo<T = any> {
    cancel: Unsubscribe
    execute: (next: CallbackFunction<T>) => any
}

interface NextFnGenerator {
    (...args: any[]): NextFnInfo;
}

enum EnumStatus {
    uninitialized = 0,
    initialized,
    waiting,
    working,
    canceled,
    unkown
}

class NextGenerator<T = any> {

    private status: EnumStatus = EnumStatus.uninitialized;
    private nextInfo!: NextFnInfo;

    // 传入的回调函数
    private cb!: CallbackFunction;

    // 下次回调函数的参数
    private args: any[] = [];


    constructor(private generator: NextFnGenerator) {
        this.status = EnumStatus.initialized;
    }

    createCallback() {
        return new Promise((resolve, reject) => {
            const info = this.generator(this.cb.bind(this.args[0], resolve));
            info.execute(undefined as any);
        })
    }

    cancel() {
        this.status = EnumStatus.canceled;
        if (this.nextInfo && typeof this.nextInfo.cancel === "function") {
            this.nextInfo.cancel();
        }
    }

    private async next(...args: any[]) {

        if (this.status === EnumStatus.canceled) {
            return console.warn("current status is canceled, please call continue method to continue");
        }

        if (this.status === EnumStatus.waiting) {
            return console.warn("current status is waiting, please don't multiple call next method");
        }

        if (args.length > 0) {
            this.args = args;
        }

        while (this.status as any !== EnumStatus.canceled) {
            await this.createCallback()
        }
    }


    start(cb: CallbackFunction, ...args: any[]) {
        if (typeof cb === "function") {
            this.cb = cb;
        }

        if (typeof this.cb !== "function") {
            throw new SyntaxError("param cb must be a function");
        }

        if (args.length > 0) {
            this.args = args;
        }

        this.next();
    }

    continue() {
        this.status = EnumStatus.initialized;
        this.next();
    }
}


function createTimeoutGenerator(interval: number = 1000) {


    const timeoutGenerator = function (cb: Function) {

        let ticket: number;
        function execute() {
            ticket = setTimeout(cb, interval);
        }

        return {
            execute,
            cancel: function () {
                clearTimeout(ticket);
            }
        }
    }

    const factory = new NextGenerator(timeoutGenerator);
    return factory;
}

function createRequestAnimationFrameGenerator() {

    const requestAnimationFrameGenerator = function (cb: FrameRequestCallback) {

        let ticket: any;
        function execute() {
            ticket = window.requestAnimationFrame(cb);
        }

        return {
            execute,
            cancel: function () {
                cancelAnimationFrame(ticket);
            }
        }
    }

    const factory = new NextGenerator(requestAnimationFrameGenerator);
    return factory
}