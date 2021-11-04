declare class DBStorage {
    db: any;
    dbName: string;
    constructor(name: string);
    open(name: string): Promise<unknown>;
    createTransaction(type?: any): any;
    set(name: string, value: any): Promise<void>;
    add(name: any, value: any): Promise<unknown>;
    get(name: any): Promise<unknown>;
    remove(name: any): Promise<unknown>;
    clear(noClearArr: any): Promise<unknown>;
    getAllKeys(): Promise<unknown>;
}
export default function CreateDBStore(name: string): DBStorage;
export {};
//# sourceMappingURL=index.d.ts.map