import { SEventEmitter } from "./SEmitter";
import { EnumStatus, ListenerFunction, NextFnGenerator, NextFnInfo } from "./types";

const TypeName = "listener";

export default class NextGenerator<T = any> {

    private status: EnumStatus = EnumStatus.uninitialized;
    private nextInfo!: NextFnInfo;

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
        this.nextInfo.next.apply(this.args[0], this.args.slice(1));
    }

    private nextCallback = () => {
        this.status = EnumStatus.working;
        const args = this.args;
        const context = args[0];
        const rArgs = [this.next].concat(args.slice(1));
        this.emitter.emit(TypeName, context, rArgs)
        this.status = EnumStatus.initialized;
    }

    addListener(listener: ListenerFunction) {
        if (!this.checkStatus()) return;
        this.emitter.on(TypeName, listener)
    }

    removeListener(listener: ListenerFunction) {
        if (!this.checkStatus()) return;
        this.emitter.off(TypeName, listener)
    }

    removeAllListener() {
        if (!this.checkStatus()) return;
        this.emitter.removeAllListeners(TypeName)
    }

    cancel() {
        if (!this.checkStatus()) return;
        this.status = EnumStatus.canceled;
        if (this.nextInfo && typeof this.nextInfo.cancel === "function") {
            this.nextInfo.cancel();
        }
    }

    start(context?: any, ...args: any[]) {
        if (!this.checkStatus()) return;
        this.next(...Array.prototype.slice.call(arguments));
    }

    continue() {
        if (!this.checkStatus()) return;
        this.status = EnumStatus.initialized;
        this.next();
    }


    destroy() {
        if (!this.checkStatus()) return;
        this.emitter.removeAllListeners(TypeName);
        // @ts-ignore
        this.emitter = undefined;
        // @ts-ignore
        this.args = undefined;
        // @ts-ignore
        this.nextInfo = undefined;
        this.status = EnumStatus.destroyed;
    }
}

