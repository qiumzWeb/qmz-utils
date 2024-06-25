
/**
 * @desc 判断是不是null
 * @param {Any} val
 */
export const isNUll = val => typeof val === 'object' && !val;

/**
 * @desc 判断是不是JSON数据
 * @param {Any} val
 */
export const isJSON = str => {
  if (typeof str === 'string') {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
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
export function mergeObj(a:any, b:any):any {
 isObj(a) &&
   isObj(b) &&
   Object.keys(b).forEach(k => {
     if (isObj(a[k]) && isObj(b[k])) {
       mergeObj(a[k], b[k]);
     } else {
       a[k] = b[k];
     }
   });
 return a;
}

/**
* @desc 深度合并，多个对象
* @param {*} args
*/
export function deepAssign(...args:any):any {
 if (args.some((a:any) => !isObj(a) && isTrue(a))) {
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
export const deepClone = (obj:any):any => {
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
export function getOffsetTop(target:any):any {
 let top = 0;
 let parent = target;
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
export function onceCall(fn:any):any {
 let called = false;
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
export function firstToUp(str:any):any {
 if (typeof str !== 'string') return str;
 return str[0].toLocaleUpperCase() + str.slice(1);
}

/**
* @desc 下划线转驼峰
* @param {String} name
* @return {String}
*/
export function toUpper(name:any):any {
 if (typeof name !== 'string') return name;
 return name.replace(/(?:\_|\-)(\w+?)/g, function (_, $2) {
   return $2.toLocaleUpperCase();
 });
}

/**
* @desc 驼峰转中划线
* @param {String} name
* @return {String}
*/
export function upperToLine(name:any):any {
 if (typeof name !== 'string') return name;
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
export function isEmpty(obj:any):any {
 if (isObj(obj)) {
   if (['Object', 'Array'].includes(getObjType(obj))) return !Object.values(obj).toString();
 }
 return !isTrue(obj);
}

/**
* @desc 数组扁平化
* @param {Array} arr
* @param {Object} options
* @return {Array}
*/
export function flatMap(arr:any, options:any):any {
 const flatArr = [];
 const { childrenCode, callBack } = deepAssign(
   {
     childrenCode: 'children'
   },
   options
 );
 const flat = (ar:any):any => {
   if (Array.isArray(ar)) {
     const d = deepClone(ar);
     d.forEach((a:any) => {
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
export function uniqBy(Arr:any, code:any):any {
 const resultArr = [];
 const valArr = [];
 const codeArr = [];
 Array.isArray(Arr) &&
   Arr.forEach(a => {
     if (isObj(a) && isTrue(code)) {
       !codeArr.includes(a[code]) && resultArr.push(a);
       !codeArr.includes(a[code]) && codeArr.push(a[code]);
     } else {
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
export function getObjType(obj:any):string {
 return Object.prototype.toString.call(obj).slice(8, -1);
}

/**
* @desc 清空对象
* @param {Any} obj
*/
export function setEmpty(obj:any):any {
 try {
   return new window[getObjType(obj)]().valueOf();
 } catch (e) {
   return '';
 }
}

/**
* @desc 获取结果 支持 方法，对象，promise
* @param {Any} source
* @return {Any}
*/
export async function getResult(source:any, ...args:any):Promise<any> {
 const type = typeof source;
 let r = source;
 if (type === 'function') {
   r = source(...args);
   if (r && typeof r.then === 'function') {
     r = await r;
   }
 } else if (type === 'object') {
   if (typeof source.then === 'function') {
     r = await source;
   }
 }
 return r;
}

/**
* @desc 对象检测
* @param {Any} target
* @return {Boolean}
*/
export function isObj(target:any):any {
 return target !== null && typeof target === 'object';
}

/**
* @desc 判断是不是非空值
* @param {Any} val
* @return {Boolean}
*/
export function isTrue(target:any):any {
 return target !== null && target !== undefined && target !== '';
}

/**
* @desc 随机生成uuid
* @param {String} val
* @return {String}
*/
export function getUuid(s:any):any {
 return s + (Date.now().toString(32) + Math.random() * Math.pow(10, 5)).split('.')[0];
}

/**
 * @desc 获取地址栏参数
 * @param {String} val
 * @return {String}
 */
 export function getQuery(q:any):any {
    var m = window.location.search.match(new RegExp("(\\?|&)" + q + "=([^&]*)(&|$)"));
    return !m ? "" : decodeURIComponent(m[2]);
  }

  /**
 * @desc 异步防抖
 * @param {*} val 
 * @returns 
 */
export function AsyncDebounce(fn:any, delay = 300) {
  let timer = null;
  return async function(...args) {
    clearTimeout(timer)
    const res = await new Promise((resolve, reject) => {
      timer = setTimeout(() => {
        getResult(fn, ...args).then(resolve).catch(reject).finally(() => clearTimeout(timer))
      }, delay)
    })
    return res
  }
}

/**
 * @desc 获取设备
 * @return {Boolean}
 */
export function getDevice() {
  const u  = window.navigator.userAgent
  return {
    isPhone: !!u.match(/AppleWebKit.*Mobile.*/),
    isPad: u.indexOf('iPad') > -1,
    IsAndroid: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
    isIos: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    isIPhone: u.indexOf('iPhone') > -1
  }
}
/**
 * @desc 判断http 路径
 * @param {*} url 
 * @returns {Boolean}
 */
export function isHttpUrl(url) {
  return /^(https?:)?\/\//.test(url)
}

/**
 * 保留两位小数千分位
 * @param {*} num 
 * @param {*} precision 
 * @returns 
 */
export const decimal = (num, precision = 2) => {
  if (typeof num !== 'number' && !num) {
    return ''
  }
  if (typeof num === 'string' && (num.includes('**') || num.includes('✽✽'))) {
    return num
  }
  return `${(+num).toFixed(precision).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')}`
}
/**
 * 千分位
 * @param {*} num 
 * @returns 
 */
export const thousands = (num) => {
  if (!num) return 0
  if (isNaN(num)) return num
  return (+num).toLocaleString()
}

/**
 * 等待
 */
export async function sleepTime(time = 0, cb) {
  let timer = null
  await new Promise(resolve => {
    function getStatus() {
      timer = setTimeout(() => {
        if (typeof cb === 'function') {
          if (cb()) {
            resolve(true)
          } else {
            getStatus()
          }
        } else {
          resolve(true)
        }
        clearTimeout(timer)
      }, time)
    }
    getStatus()
  })
  return timer
}

/**
 * 通过value 匹配 label 值
 */
export function _getName(options, value, _ = "") {
  return Array.isArray(options) ? (
    (options.find(o => isObj(o) && o.value == value) || {label: _ }).label
  ) : value
}
export function isAllIncludes(options, value) {
  value = Array.isArray(value) ? value : [value]
  return Array.isArray(options) && value.every(v => options.some(s => s.value == v))
}

// 空数据过虑
export function filterNotEmptyData(data) {
  const newData = {}
  Object.entries(data).forEach(([key, val]) => {
    isTrue(val) && (newData[key] = val)
  })
  return newData
}

// 获取可枚举长度空数组
export function getEmptyList(length = 0) {
  return new Array(length).fill(undefined)
}


// 下载数据
export function download(res, {fileName, mimeType} = {fileName: 'data.txt', mimeType: 'text/plain;charset=utf-8'}) {
  const blob = new Blob(res, {type: mimeType})
  if ((window.navigator as any).msSaveBlob) { // IE
    (window.navigator as any).msSaveBlob(blob, fileName)
  } else { // 其它
    const url = window.URL.createObjectURL(blob)
    let a = document.createElement('a')
    a.download = fileName
    a.href= url
    a.click()
    window.URL.revokeObjectURL(url)
    a = null
  }
}

// 获取TextArea 批量code , 支持 空格 回车 换行 制表符, 自定义符号
export function getStringCodeToArray(strCode, split) {
  if (typeof strCode === 'string') {
    let reg = /\s|\r|\n|\t/;
    if (split) {
      reg = split
    }
    const trimStr = strCode.trim();
    return trimStr.split(reg).filter(s => s);
  } else {
    return []
  }
}
// 判断是否是无效时间
export function isInvalidDate(time:any) {
  return (new Date(time) as any) == 'Invalid Date'
}

// 短字符串（HH:mm:ss）转时间长字符串(YYYY-MM-DD HH:mm:ss)
export function getShortStrToTimeLongStr(str) {
  const format = [
    /^[0-2]?[0-9]\:[0-6]?[0-9]$/,
    /^[0-2]?[0-9]\:[0-6]?[0-9]\:[0-6]?[0-9]$/,
  ]
  if (format.some(reg => reg.test(str))) {
    return new Date().toLocaleDateString() + ` ${str}`
  }
  if (isInvalidDate(str)) {
    return new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
  }
  return str
}

// 时间戳 转换为 HH:mm:ss
export function getToTT(str) {
  if (isNaN(str)) return '00';
  return String(str)[1] ? str : '0' + str;
}
export function getTimeStampToHMS(timeStamp:number, lang = 'zh') {
  if (isNaN(timeStamp)) return timeStamp;
  const time:number = timeStamp / 1000;
  const d = parseInt(time / (3600 * 24) + '')
  const ht = time % (3600 * 24)
  const h = parseInt(ht / 3600 + '');
  const mt = ht % 3600
  const m = parseInt(mt / 60 + '');
  const st = mt % 60
  const s = parseInt(st + '');
  const g = (t, n) => t ? t + n : '';
  const output = {
    en: getToTT(h) + ':' + getToTT(m) + ':' + getToTT(s),
    zh: g(d, '天') + g(h, '小时') + g(m, '分钟') + g(s, '秒')
  }
  return output[lang] || timeStamp
}

// 判断两个符串是否相同，不区分大小写
export function isSameURLStr(str1, str2) {
  if (typeof str1 === 'string' && typeof str2 === 'string') {
    return str1.toLowerCase() === str2.toLowerCase()
  }
  return false
}

// 多选字段转换为字符串提交
export function transMultipleToStr(val, { action }) {
  const result = {
    inset: typeof val === 'string' && val.split(',').filter(f => isTrue(f)) || [],
    output: Array.isArray(val) && val.join() || ''
  }
  return result[action]
}

/**
 * 
 * @param {*} obj 需要取值的 对象
 * @param {*} key 提供取值的key 
 * @returns 
 */
// 获取对象对应 key 的值 ，支持 key.childKey 模式
export function getValueOfObj(obj, key) {
  if (isEmpty(obj) || isEmpty(key)) return null;
  const keys = String(key).split('.').filter(f => f);
  const value = keys.reduce((item, key) => {
    return ['Object', 'Array'].includes(getObjType(item)) ? item[key] : item
  }, obj);
  return value
}

/**
 * 数字转百分比
 */
export function NumToPercentage(num, radix = 100, unit = "%") {
  if (isNaN(num)) return '-' + unit;
  return decimal(+num * radix) + unit;
}