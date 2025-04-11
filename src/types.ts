
export interface INextGeneratorConstructor {
    new(generator: NextFnGenerator): INextGenerator;
}

export interface INextGenerator {
    /**
     * 添加监听函数
     */
    addListener(listener: ListenerFunction): void;
    /**
     * 移除监听函数
     */
    removeListener(listener: ListenerFunction): void;
    /**
     * 移除全部监听函数
     */
    removeAllListener(): void;
    /**
     * 取消，即暂停
     */
    cancel(): void;
    /**
     * 开始
     */
    start(nextFunc: NextStartFunc<INextGenerator>, ...args: any[]): void;
    /**
     * 继续，取消后，可以继续
     */
    continue(): void;
    /**
     * 进入下一次
     */
    next(): void;
    /**
     * 销毁
     */
    destroy(): void;
}

export interface Unsubscribe {
    (): void
}

export interface ListenerFunction {
    (...args: any[]): void
}

export type NextFunction = ListenerFunction;

export interface NextFnInfo {
    cancel: Unsubscribe
    next: NextFunction
}

export interface NextFnGenerator {
    (...args: any[]): NextFnInfo;
}


export interface NextStartFunc<T extends INextGenerator> {
    (ins: T, ...args: any[]): any
}

export enum EnumStatus {
    uninitialized = 0,
    initialized,
    waiting,
    working,
    canceled,
    unkown,
    destroyed
}

export interface NextGeneratorOptions {
    
}
