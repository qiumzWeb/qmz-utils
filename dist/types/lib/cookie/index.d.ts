interface setOptions {
    domain: string;
    path: string;
    hour: number;
    expireTime: any;
    [key: string]: any;
}
declare const Cookie: {
    get: (n: string) => any;
    set: (name: string, value: [string | number], { domain, path, hour, expireTime }?: setOptions) => void;
    del: (name: string, domain?: string, path?: string) => void;
};
export default Cookie;
//# sourceMappingURL=index.d.ts.map