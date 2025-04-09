export class SEventEmitter {
    // 存储事件名与对应监听器的映射
    private events: Record<string, Function[]> = {};

    // 注册事件监听器
    public on(type: string, listener: Function): void {
        if (!this.events[type]) {
            this.events[type] = [];
        }
        this.events[type].push(listener);
    }

    // 移除单个事件监听器
    public off(type: string, listener: Function): void {
        const listeners = this.events[type];
        if (listeners) {
            this.events[type] = listeners.filter(l => l !== listener);
        }
    }

    // 移除所有监听器（可指定事件名）
    public removeAllListeners(type?: string): void {
        if (type) {
            delete this.events[type];
        } else {
            this.events = {}; // 清空所有事件
        }
    }

    // 触发事件（可选参数传递给监听器）
    public emit(type: string, context: any = undefined, ...args: any[]): void {
        const listeners = this.events[type];
        if (listeners) {
            listeners.forEach(listener => listener.apply(context, Array.from(args)));
        }
    }

    public getListeners(type: string) {
        return this.events[type] || []
    }
}