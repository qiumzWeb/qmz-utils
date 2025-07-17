var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
/**
 * @desc 判断是不是null
 * @param {Any} val
 */
export var isNUll = function (val) { return typeof val === 'object' && !val; };
/**
 * @desc 判断是不是JSON数据
 * @param {Any} val
 */
export var isJSON = function (str) {
    if (typeof str === 'string') {
        try {
            JSON.parse(str);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    return false;
};
/**
* @desc 合并对象
* @param {Object} (a, b)
* @return {Object} (a)
*/
export function mergeObj(a, b) {
    isObj(a) &&
        isObj(b) &&
        Object.keys(b).forEach(function (k) {
            if (isObj(a[k]) && isObj(b[k])) {
                mergeObj(a[k], b[k]);
            }
            else {
                a[k] = b[k];
            }
        });
    return a;
}
/**
* @desc 深度合并，多个对象
* @param {*} args
*/
export function deepAssign() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args.some(function (a) { return !isObj(a) && isTrue(a); })) {
        throw new Error('all args must be a Object');
    }
    if (!args[0]) {
        throw new Error('target must be a Object');
    }
    return args.reduce(mergeObj);
}
/**
* @desc 深度克隆
* @param {Any} obj
* @return {Any}
*/
export var deepClone = function (obj) {
    if (isObj(obj)) {
        return deepAssign(JSON.parse(JSON.stringify(obj)), obj);
    }
    return obj;
};
/**
* @desc 计算dom元素到顶部的距离
* @param {Element} target
* @return {Number}
*/
export function getOffsetTop(target, topParent) {
    var top = 0;
    var parent = target;
    if (parent instanceof HTMLElement) {
        while (parent instanceof HTMLElement && parent !== (topParent || document.body)) {
            top += parent.offsetTop;
            parent = parent.offsetParent;
        }
    }
    return top;
}
/**
* @desc 只调用一次
* @param {Function} fn
*/
export function onceCall(fn) {
    var called = false;
    return function () {
        if (!called) {
            called = true;
            fn.apply(this, arguments);
        }
    };
}
/**
* @desc 首字母大写
* @param {String} str
* @return {String}
*/
export function firstToUp(str) {
    if (typeof str !== 'string')
        return str;
    return str[0].toLocaleUpperCase() + str.slice(1);
}
/**
* @desc 下划线转驼峰
* @param {String} name
* @return {String}
*/
export function toUpper(name) {
    if (typeof name !== 'string')
        return name;
    return name.replace(/(?:\_|\-)(\w+?)/g, function (_, $2) {
        return $2.toLocaleUpperCase();
    });
}
/**
* @desc 驼峰转中划线
* @param {String} name
* @return {String}
*/
export function upperToLine(name) {
    if (typeof name !== 'string')
        return name;
    return name
        .replace(/(?:[A-Z])(\w+?)/g, function ($1) {
        return '-' + $1.toLocaleLowerCase();
    })
        .replace(/^\-/, '');
}
/**
* @desc 是否为空
* @param {Any} obj
* @return {Boolean}
*/
export function isEmpty(obj) {
    if (isObj(obj)) {
        if (['Object', 'Array'].includes(getObjType(obj)))
            return !Object.values(obj).toString();
    }
    return !isTrue(obj);
}
/**
* @desc 数组扁平化
* @param {Array} arr
* @param {Object} options
* @return {Array}
*/
export function flatMap(arr, options) {
    var flatArr = [];
    var _a = deepAssign({
        childrenCode: 'children'
    }, options), childrenCode = _a.childrenCode, callBack = _a.callBack;
    var flat = function (ar) {
        if (Array.isArray(ar)) {
            var d = deepClone(ar);
            d.forEach(function (a) {
                flatArr.push(a);
                typeof callBack === 'function' && callBack(a);
                isObj(a) && flat(a[childrenCode]);
            });
        }
    };
    flat(arr);
    return flatArr;
}
/**
* @desc 数组去重
* @param {Array} arr
* @param {String} code
* @return {Array}
*/
export function uniqBy(Arr, code) {
    var resultArr = [];
    var valArr = [];
    var codeArr = [];
    Array.isArray(Arr) &&
        Arr.forEach(function (a) {
            if (isObj(a) && isTrue(code)) {
                !codeArr.includes(a[code]) && resultArr.push(a);
                !codeArr.includes(a[code]) && codeArr.push(a[code]);
            }
            else {
                !valArr.includes(a) && resultArr.push(a);
                !valArr.includes(a) && valArr.push(a);
            }
        });
    return resultArr;
}
/**
* @desc 获取数据类型
* @param {Any} obj
* @return {Boolean}
*/
export function getObjType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
}
/**
* @desc 清空对象
* @param {Any} obj
*/
export function setEmpty(obj) {
    try {
        return new window[getObjType(obj)]().valueOf();
    }
    catch (e) {
        return '';
    }
}
/**
* @desc 获取结果 支持 方法，对象，promise
* @param {Any} source
* @return {Any}
*/
export function getResult(source) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return __awaiter(this, void 0, void 0, function () {
        var type, r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    type = typeof source;
                    r = source;
                    if (!(type === 'function')) return [3 /*break*/, 3];
                    r = source.apply(void 0, args);
                    if (!(r && typeof r.then === 'function')) return [3 /*break*/, 2];
                    return [4 /*yield*/, r];
                case 1:
                    r = _a.sent();
                    _a.label = 2;
                case 2: return [3 /*break*/, 5];
                case 3:
                    if (!(type === 'object')) return [3 /*break*/, 5];
                    if (!(typeof source.then === 'function')) return [3 /*break*/, 5];
                    return [4 /*yield*/, source];
                case 4:
                    r = _a.sent();
                    _a.label = 5;
                case 5: return [2 /*return*/, r];
            }
        });
    });
}
/**
* @desc 对象检测
* @param {Any} target
* @return {Boolean}
*/
export function isObj(target) {
    return target !== null && typeof target === 'object';
}
/**
* @desc 判断是不是非空值
* @param {Any} val
* @return {Boolean}
*/
export function isTrue(target) {
    return target !== null && target !== undefined && target !== '';
}
/**
 * @desc 随机生成uuid
 * @param {String} val
 * @return {String}
 */
export function getUuid(s) {
    if (s === void 0) { s = ''; }
    return s + _uid() + _uid() + _uid() + Date.now().toString(32);
}
export function _uid() {
    return (Math.random() * 9999).toString(32).split('.')[1].slice(-4);
}
/**
 * @desc 获取地址栏参数
 * @param {String} val
 * @return {String}
 */
export function getQuery(q) {
    var m = window.location.search.match(new RegExp("(\\?|&)" + q + "=([^&]*)(&|$)"));
    return !m ? "" : decodeURIComponent(m[2]);
}
// 获取地址栏参数集合
export function getQueryParams(url) {
    if (url === void 0) { url = location.href; }
    // 创建一个空对象来存储参数
    var params = {};
    // 使用 '?' 分割 URL 和查询字符串
    var queryString = url.split('?')[1];
    // 如果没有查询字符串，返回空对象
    if (!queryString) {
        return params;
    }
    // 使用 '&' 分割查询字符串中的每个参数
    var pairs = queryString.split('&');
    // 遍历参数对
    for (var i = 0; i < pairs.length; i++) {
        // 使用 '=' 分割键和值
        var pair = pairs[i].split('=');
        // 解码 URI 编码的键和值
        var key = decodeURIComponent(pair[0]);
        var value = decodeURIComponent(pair[1] || '');
        // 如果键已经存在于对象中，则它是一个数组，否则，初始化为字符串
        if (params.hasOwnProperty(key)) {
            // 如果它不是一个数组，将其转换为数组
            if (!Array.isArray(params[key])) {
                params[key] = [params[key]];
            }
            // 添加新值到数组
            params[key].push(value);
        }
        else {
            // 添加新键值对到对象
            params[key] = value;
        }
    }
    return params;
}
/**
* @desc 异步防抖
* @param {*} val
* @returns
*/
export function AsyncDebounce(fn, delay) {
    if (delay === void 0) { delay = 300; }
    var timer = null;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        clearTimeout(timer);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                timer = setTimeout(function () {
                                    getResult.apply(void 0, __spreadArrays([fn], args)).then(resolve).catch(reject).finally(function () { return clearTimeout(timer); });
                                }, delay);
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
}
/**
 * @desc 获取设备
 * @return {Boolean}
 */
export function getDevice() {
    var u = window.navigator.userAgent;
    return {
        isPhone: !!u.match(/AppleWebKit.*Mobile.*/),
        isPad: u.indexOf('iPad') > -1,
        IsAndroid: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
        isIos: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        isIPhone: u.indexOf('iPhone') > -1
    };
}
/**
 * @desc 判断http 路径
 * @param {*} url
 * @returns {Boolean}
 */
export function isHttpUrl(url) {
    return /^(https?:)?\/\//.test(url);
}
/**
 * 保留两位小数千分位
 * @param {*} num
 * @param {*} precision
 * @returns
 */
export var decimal = function (num, precision) {
    if (precision === void 0) { precision = 2; }
    if (typeof num !== 'number' && !num) {
        return '';
    }
    if (typeof num === 'string' && (num.includes('**') || num.includes('✽✽'))) {
        return num;
    }
    return "" + (+num).toFixed(precision).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
};
/**
 * 千分位
 * @param {*} num
 * @returns
 */
export var thousands = function (num) {
    if (!num)
        return 0;
    if (isNaN(num))
        return num;
    return (+num).toLocaleString();
};
/**
 * 等待
 */
export function sleepTime(time, cb) {
    if (time === void 0) { time = 0; }
    return __awaiter(this, void 0, void 0, function () {
        var timer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    timer = null;
                    return [4 /*yield*/, new Promise(function (resolve) {
                            function getStatus() {
                                timer = setTimeout(function () {
                                    if (typeof cb === 'function') {
                                        if (cb()) {
                                            resolve(true);
                                        }
                                        else {
                                            getStatus();
                                        }
                                    }
                                    else {
                                        resolve(true);
                                    }
                                    clearTimeout(timer);
                                }, time);
                            }
                            getStatus();
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, timer];
            }
        });
    });
}
/**
 * 通过value 匹配 label 值
 */
export function _getName(options, value, _) {
    if (_ === void 0) { _ = ""; }
    return Array.isArray(options) ? ((options.find(function (o) { return isObj(o) && o.value == value; }) || { label: _ }).label) : value;
}
export function isAllIncludes(options, value) {
    value = Array.isArray(value) ? value : [value];
    return Array.isArray(options) && value.every(function (v) { return options.some(function (s) { return s.value == v; }); });
}
// 空数据过虑
export function filterNotEmptyData(data) {
    var newData = {};
    Object.entries(data).forEach(function (_a) {
        var key = _a[0], val = _a[1];
        isTrue(val) && (newData[key] = val);
    });
    return newData;
}
// 获取可枚举长度空数组
export function getEmptyList(length) {
    if (length === void 0) { length = 0; }
    return new Array(length).fill(undefined);
}
// 下载数据
export function download(res, _a) {
    var _b = _a === void 0 ? { fileName: 'data.txt', mimeType: 'text/plain;charset=utf-8' } : _a, fileName = _b.fileName, mimeType = _b.mimeType;
    var blob = new Blob(res, { type: mimeType });
    if (window.navigator.msSaveBlob) { // IE
        window.navigator.msSaveBlob(blob, fileName);
    }
    else { // 其它
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.download = fileName;
        a.href = url;
        a.click();
        window.URL.revokeObjectURL(url);
        a = null;
    }
}
// 获取TextArea 批量code , 支持 空格 回车 换行 制表符, 自定义符号
export function getStringCodeToArray(strCode, split) {
    if (typeof strCode === 'string') {
        var reg = /\s|\r|\n|\t/;
        if (split) {
            reg = split;
        }
        var trimStr = strCode.trim();
        return trimStr.split(reg).filter(function (s) { return s; });
    }
    else {
        return [];
    }
}
// 判断是否是无效时间
export function isInvalidDate(time) {
    return new Date(time) == 'Invalid Date';
}
// 短字符串（HH:mm:ss）转时间长字符串(YYYY-MM-DD HH:mm:ss)
export function getShortStrToTimeLongStr(str) {
    var format = [
        /^[0-2]?[0-9]\:[0-6]?[0-9]$/,
        /^[0-2]?[0-9]\:[0-6]?[0-9]\:[0-6]?[0-9]$/,
    ];
    if (format.some(function (reg) { return reg.test(str); })) {
        return new Date().toLocaleDateString() + (" " + str);
    }
    if (isInvalidDate(str)) {
        return new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
    }
    return str;
}
// 时间戳 转换为 HH:mm:ss
export function getToTT(str) {
    if (isNaN(str))
        return '00';
    return String(str)[1] ? str : '0' + str;
}
export function getTimeStampToHMS(timeStamp, lang) {
    if (lang === void 0) { lang = 'zh'; }
    if (isNaN(timeStamp))
        return timeStamp;
    var time = timeStamp / 1000;
    var d = parseInt(time / (3600 * 24) + '');
    var ht = time % (3600 * 24);
    var h = parseInt(ht / 3600 + '');
    var mt = ht % 3600;
    var m = parseInt(mt / 60 + '');
    var st = mt % 60;
    var s = parseInt(st + '');
    var g = function (t, n) { return t ? t + n : ''; };
    var output = {
        en: getToTT(h) + ':' + getToTT(m) + ':' + getToTT(s),
        zh: g(d, '天') + g(h, '小时') + g(m, '分钟') + g(s, '秒')
    };
    return output[lang] || timeStamp;
}
// 判断两个符串是否相同，不区分大小写
export function isSameURLStr(str1, str2) {
    if (typeof str1 === 'string' && typeof str2 === 'string') {
        return str1.toLowerCase() === str2.toLowerCase();
    }
    return false;
}
/**
 * 字符串对比
 */
export function isSame(str1, str2) {
    if (typeof str1 === 'string' && typeof str2 === 'string') {
        return str1.toLowerCase().trim() == str2.toLowerCase().trim();
    }
    else {
        return str1 == str2;
    }
}
// 多选字段转换为字符串提交
export function transMultipleToStr(val, _a) {
    var action = _a.action;
    var result = {
        inset: typeof val === 'string' && val.split(',').filter(function (f) { return isTrue(f); }) || [],
        output: Array.isArray(val) && val.join() || ''
    };
    return result[action];
}
/**
 *
 * @param {*} obj 需要取值的 对象
 * @param {*} key 提供取值的key
 * @returns
 */
// 获取对象对应 key 的值 ，支持 key.childKey 模式
export function getValueOfObj(obj, key) {
    if (isEmpty(obj) || isEmpty(key))
        return null;
    var keys = String(key).split('.').filter(function (f) { return f; });
    var value = keys.reduce(function (item, key) {
        return ['Object', 'Array'].includes(getObjType(item)) ? item[key] : item;
    }, obj);
    return value;
}
/**
 * 数字转百分比
 */
export function NumToPercentage(num, radix, unit) {
    if (radix === void 0) { radix = 100; }
    if (unit === void 0) { unit = "%"; }
    if (isNaN(num))
        return '-' + unit;
    return decimal(+num * radix) + unit;
}
// 转换成HTTPS
export var httpToHttps = function (url) {
    return url.replace(/^http:/, 'https:');
};
// input 输入框回车事件
export var inputOnEnter = function (callBack) {
    return function (event) {
        var _a;
        var value = (_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.value;
        if (event.which === 13 && value) {
            typeof callBack === 'function' && callBack(event);
        }
    };
};
/**
 * 接口轮询
 * @param {*} requestCall 请求接口方法， 返回数据时会中断轮询并返回该数据，需要继续轮询则不返回数据
 * @param {Object} Obj  Obj.times: 请求次数  Obj.delay: 延迟请求时间  Obj.timeoutMsg: 超时未请求成功返回的提示语
 * @returns {resData} 接口返回数据
 */
export function getRequestRepeatTimes(requestCall, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.times, times = _c === void 0 ? 10 : _c, _d = _b.delay, delay = _d === void 0 ? 1000 : _d, _e = _b.timeoutMsg, timeoutMsg = _e === void 0 ? '请求次数已达上限，请稍后再试' : _e, _f = _b.callResult, callResult = _f === void 0 ? null : _f;
    return __awaiter(this, void 0, void 0, function () {
        var doRequest;
        var _this = this;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    doRequest = function (requestTimes) {
                        if (requestTimes === void 0) { requestTimes = 1; }
                        return __awaiter(_this, void 0, void 0, function () {
                            var res, result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, getResult(requestCall, requestTimes)];
                                    case 1:
                                        res = _a.sent();
                                        result = res;
                                        if (typeof callResult === 'function') {
                                            result = callResult(res, requestTimes);
                                        }
                                        if (!!result) return [3 /*break*/, 4];
                                        if (!(requestTimes < times)) return [3 /*break*/, 3];
                                        return [4 /*yield*/, sleepTime(delay)];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/, doRequest(requestTimes + 1)];
                                    case 3: throw new Error(timeoutMsg);
                                    case 4: return [2 /*return*/, res];
                                }
                            });
                        });
                    };
                    return [4 /*yield*/, doRequest()];
                case 1: return [2 /*return*/, _g.sent()];
            }
        });
    });
}
/**
 * base64 加密， 解密
 */
export var Base64 = {
    // 加密
    enCode: function (str) {
        return window.btoa(decodeURIComponent(encodeURIComponent(str)));
    },
    // 解密
    deCode: function (str) {
        return decodeURIComponent(encodeURIComponent(window.atob(str)));
    }
};
// 语音播报
export function speakText(text, opts) {
    opts = opts || {
        volume: 1,
        rate: 1,
        lang: 'zh-CN'
    };
    var synth = window.speechSynthesis;
    var zhVoice = synth.getVoices().find(function (v) { return v.lang == (opts.lang || "zh-CN"); });
    var utterThis = new SpeechSynthesisUtterance(text);
    utterThis.voice = zhVoice;
    utterThis.volume = opts.volume || 1;
    utterThis.rate = opts.rate || 1;
    synth.speak(utterThis);
}
//# sourceMappingURL=index.js.map