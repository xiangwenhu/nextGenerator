import { SEventEmitter } from "./SEmitter";
import { EnumStatus, ListenerFunction, NextFnGenerator, NextFnInfo, NextStartFunc } from "./types";

const ListenerTypeName = "listener";

const UndefinedContext = void 0;

export default class NextGenerator {

    private status: EnumStatus = EnumStatus.uninitialized;
    private nextInfo!: NextFnInfo;


    // @ts-ignore
    private nextFunc: Function;

    // 下次回调函数的参数
    private args: any[] = [];

    private emitter = new SEventEmitter();

    constructor(private generator: NextFnGenerator) {
        this.status = EnumStatus.initialized;
    }

    private checkStatus() {
        if (this.status === EnumStatus.destroyed) {
            console.error("current status is destroyed");
            return false;
        }
        return true;
    }

    private next = (...args: any[]) => {
        if (!this.checkStatus()) return;
        if (this.status === EnumStatus.canceled) {
            return console.warn("current status is cancelled, please call continue method to continue");
        }

        if (this.status === EnumStatus.waiting) {
            return console.warn("current status is waiting, please don't multiple call");
        }

        if (args.length > 0) {
            this.args = args;
        }

        this.nextInfo = this.generator(this.nextCallback);
        this.status = EnumStatus.waiting;
        this.nextInfo.next.apply(UndefinedContext, this.args);
    }

    private nextCallback = () => {
        this.status = EnumStatus.working;
        const args = this.args;
        const rArgs = [this.next].concat(args);

        this.nextFunc.apply(UndefinedContext, rArgs);
        this.notify(...args);
        this.status = EnumStatus.initialized;
    }


    private notify(...args: any[]) {
        this.emitter.emit(ListenerTypeName, UndefinedContext, ...args)
    }

    addListener(listener: ListenerFunction) {
        if (!this.checkStatus()) return;
        this.emitter.on(ListenerTypeName, listener)
    }

    removeListener(listener: ListenerFunction) {
        if (!this.checkStatus()) return;
        this.emitter.off(ListenerTypeName, listener)
    }

    removeAllListener() {
        if (!this.checkStatus()) return;
        this.emitter.removeAllListeners(ListenerTypeName)
    }

    cancel() {
        if (!this.checkStatus()) return;
        this.status = EnumStatus.canceled;
        if (this.nextInfo && typeof this.nextInfo.cancel === "function") {
            this.nextInfo.cancel();
        }
    }

    start(nextFunc: NextStartFunc, ...args: any[]) {
        if (!this.checkStatus()) return;
        this.notify(...args);
        this.nextFunc = nextFunc;
        this.next(...args);
    }

    continue() {
        if (!this.checkStatus()) return;
        this.status = EnumStatus.initialized;
        this.next();
    }


    destroy() {
        if (!this.checkStatus()) return;
        this.emitter.removeAllListeners(ListenerTypeName);
        // @ts-ignore
        this.emitter = undefined;
        // @ts-ignore
        this.args = undefined;
        // @ts-ignore
        this.nextInfo = undefined;
        this.status = EnumStatus.destroyed;
    }
}

