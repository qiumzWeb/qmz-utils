export declare function createBus(globalBusName: string): {
    _events: {};
    _store: {};
    _listeners: any[];
    $on(name: string, fn: Function): () => any;
    $emit(name: string, ...args: any[]): void;
    clear(name: any): void;
    setState(state: any): void;
    getState(key: any): any;
    subscribe(listener: any): () => any;
    watch(name: any, callback: any): any;
};
declare const _default: {
    _events: {};
    _store: {};
    _listeners: any[];
    $on(name: string, fn: Function): () => any;
    $emit(name: string, ...args: any[]): void;
    clear(name: any): void;
    setState(state: any): void;
    getState(key: any): any;
    subscribe(listener: any): () => any;
    watch(name: any, callback: any): any;
};
export default _default;
//# sourceMappingURL=index.d.ts.map