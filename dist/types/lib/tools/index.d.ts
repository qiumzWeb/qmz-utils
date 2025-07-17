/**
 * @desc 判断是不是null
 * @param {Any} val
 */
export declare const isNUll: (val: any) => boolean;
/**
 * @desc 判断是不是JSON数据
 * @param {Any} val
 */
export declare const isJSON: (str: any) => boolean;
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
export declare function getOffsetTop(target: any, topParent?: any): any;
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
export declare function getUuid(s?: string): string;
export declare function _uid(): string;
/**
 * @desc 获取地址栏参数
 * @param {String} val
 * @return {String}
 */
export declare function getQuery(q: any): any;
export declare function getQueryParams(url?: any): any;
/**
* @desc 异步防抖
* @param {*} val
* @returns
*/
export declare function AsyncDebounce(fn: any, delay?: number): (...args: any[]) => Promise<unknown>;
/**
 * @desc 获取设备
 * @return {Boolean}
 */
export declare function getDevice(): {
    isPhone: boolean;
    isPad: boolean;
    IsAndroid: boolean;
    isIos: boolean;
    isIPhone: boolean;
};
/**
 * @desc 判断http 路径
 * @param {*} url
 * @returns {Boolean}
 */
export declare function isHttpUrl(url: any): boolean;
/**
 * 保留两位小数千分位
 * @param {*} num
 * @param {*} precision
 * @returns
 */
export declare const decimal: (num: any, precision?: number) => string;
/**
 * 千分位
 * @param {*} num
 * @returns
 */
export declare const thousands: (num: any) => any;
/**
 * 等待
 */
export declare function sleepTime(time: number, cb: any): Promise<any>;
/**
 * 通过value 匹配 label 值
 */
export declare function _getName(options: any, value: any, _?: string): any;
export declare function isAllIncludes(options: any, value: any): any;
export declare function filterNotEmptyData(data: any): {};
export declare function getEmptyList(length?: number): any[];
export declare function download(res: any, { fileName, mimeType }?: {
    fileName: string;
    mimeType: string;
}): void;
export declare function getStringCodeToArray(strCode: any, split: any): string[];
export declare function isInvalidDate(time: any): boolean;
export declare function getShortStrToTimeLongStr(str: any): any;
export declare function getToTT(str: any): any;
export declare function getTimeStampToHMS(timeStamp: number, lang?: string): any;
export declare function isSameURLStr(str1: any, str2: any): boolean;
export declare function transMultipleToStr(val: any, { action }: {
    action: any;
}): any;
/**
 *
 * @param {*} obj 需要取值的 对象
 * @param {*} key 提供取值的key
 * @returns
 */
export declare function getValueOfObj(obj: any, key: any): any;
/**
 * 数字转百分比
 */
export declare function NumToPercentage(num: any, radix?: number, unit?: string): string;
export declare const httpToHttps: (url: string) => string;
export declare const inputOnEnter: (callBack: any) => (event: any) => void;
//# sourceMappingURL=index.d.ts.map