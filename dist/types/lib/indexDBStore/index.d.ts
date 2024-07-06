export declare class QmzDBStorage {
    db: any;
    dbName: string;
    _events_: any;
    setTimers: any;
    setPromises: any;
    constructor(name: any);
    open(name: any): Promise<unknown>;
    createTransaction(type?: string): any;
    get(name: any): Promise<unknown>;
    set(name: any, value: any): Promise<void>;
    add(name: any, value: any): Promise<unknown>;
    remove(name: any): Promise<unknown>;
    clear(noClearArr: any): Promise<unknown>;
    getAllKeys(): Promise<unknown>;
    watch(name: any, fn: any): () => void;
    $emit(name: any, value: any): void;
}
export default function CreateQmzDBStore(name: string): QmzDBStorage;
//# sourceMappingURL=index.d.ts.map