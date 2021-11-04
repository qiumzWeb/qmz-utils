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
