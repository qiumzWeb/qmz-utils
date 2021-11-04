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
export function getOffsetTop(target) {
    var top = 0;
    var parent = target;
    if (parent instanceof HTMLElement) {
        while (parent instanceof HTMLElement && parent !== document.body) {
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
    return s + (Date.now().toString(32) + Math.random() * Math.pow(10, 5)).split('.')[0];
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
//# sourceMappingURL=index.js.map