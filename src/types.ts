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


export interface NextStartFunc {
    (next: NextFunction, ...args: any[]): void
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


