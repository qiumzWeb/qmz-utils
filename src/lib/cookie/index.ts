interface setOptions {
    domain: string,
    path: string,
    hour: number,
    expireTime: any,
    [key: string]: any
}
const Cookie = {
    get: function(n: string): any {
        var m = document.cookie.match(new RegExp("(^| )" + n + "=([^;]*)(;|$)"));
        return !m ? "" : m[2];
    },
    set: function(
        name: string,
        value: [string | number],
        {domain, path, hour, expireTime} : setOptions = undefined
    ) {
        var cookie = [
            name + "=" + value + ";"
        ];
        if (domain && domain != "/") {
            cookie.push("domain =" + domain);
        } else {
            cookie.push("domain =" + document.domain);
        }
        if (path) {
            cookie.push("path =" + path);
        }
        if (hour) {
            var expire = new Date();
            expire.setTime(expire.getTime() + (hour ? 3600000 * hour : 30 * 24 * 60 * 60 * 1000));
            cookie.push("expires=" + expire.toUTCString());
        }
        if (expireTime) {
            var expire = new Date(expireTime);
            if (expire.toString() !== 'Invalid Date') {
                cookie.push("expires=" + expire.toUTCString());
            }
        }
        document.cookie = cookie.join(";");
    },
    del: function(name: string, domain: string = '', path: string = '') {
        document.cookie = name + 
            "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; path=" + 
            (path ? path : "/") + "; " + 
            (domain && domain != '/' ? ("domain=" + domain + ";") : "domain=" + document.domain);
        //旧数据清理
        document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; path=" + (path ? path : "/") + "; " + "domain=";
    }
}

export default Cookie;