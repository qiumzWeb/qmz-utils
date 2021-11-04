/**
* @desc 合并对象
* @param {Object} (a, b)
* @return {Object} (a)
*/
export declare function mergeObj(a: any, b: any): any;
/**
* @desc 深度合并，多个对象
* @param {*} args
*/
export declare function deepAssign(...args: any): any;
/**
* @desc 深度克隆
* @param {Any} obj
* @return {Any}
*/
export declare const deepClone: (obj: any) => any;
/**
* @desc 计算dom元素到顶部的距离
* @param {Element} target
* @return {Number}
*/
export declare function getOffsetTop(target: any): any;
/**
* @desc 只调用一次
* @param {Function} fn
*/
export declare function onceCall(fn: any): any;
/**
* @desc 首字母大写
* @param {String} str
* @return {String}
*/
export declare function firstToUp(str: any): any;
/**
* @desc 下划线转驼峰
* @param {String} name
* @return {String}
*/
export declare function toUpper(name: any): any;
/**
* @desc 驼峰转中划线
* @param {String} name
* @return {String}
*/
export declare function upperToLine(name: any): any;
/**
* @desc 是否为空
* @param {Any} obj
* @return {Boolean}
*/
export declare function isEmpty(obj: any): any;
/**
* @desc 数组扁平化
* @param {Array} arr
* @param {Object} options
* @return {Array}
*/
export declare function flatMap(arr: any, options: any): any;
/**
* @desc 数组去重
* @param {Array} arr
* @param {String} code
* @return {Array}
*/
export declare function uniqBy(Arr: any, code: any): any;
/**
* @desc 获取数据类型
* @param {Any} obj
* @return {Boolean}
*/
export declare function getObjType(obj: any): string;
/**
* @desc 清空对象
* @param {Any} obj
*/
export declare function setEmpty(obj: any): any;
/**
* @desc 获取结果 支持 方法，对象，promise
* @param {Any} source
* @return {Any}
*/
export declare function getResult(source: any, ...args: any): Promise<any>;
/**
* @desc 对象检测
* @param {Any} target
* @return {Boolean}
*/
export declare function isObj(target: any): any;
/**
* @desc 判断是不是非空值
* @param {Any} val
* @return {Boolean}
*/
export declare function isTrue(target: any): any;
/**
* @desc 随机生成uuid
* @param {String} val
* @return {String}
*/
export declare function getUuid(s: any): any;
/**
 * @desc 获取地址栏参数
 * @param {String} val
 * @return {String}
 */
export declare function getQuery(q: any): any;
//# sourceMappingURL=index.d.ts.map