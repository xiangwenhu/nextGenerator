export interface Unsubscribe {
    (): void
}

export interface ContextFunction<T = any> {
    (context?: T, ...args: any[]): any
}

export interface ListenerFunction {
    (next: ContextFunction, ...args: any[]): void
}

export interface NextFnInfo {
    cancel: Unsubscribe
    next: ContextFunction
}

export interface NextFnGenerator {
    (...args: any[]): NextFnInfo;
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


