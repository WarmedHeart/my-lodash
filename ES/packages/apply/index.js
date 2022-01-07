/**
 * 实现apply方法
 *  原理：当a.func调用方法时，func内部的this指向的是a;
 *  弊端：需修改原始对象：向对象中添加方法，调用完再删除的方式;
 * @param {*} context 
 * @param {*} args 
 * @returns 
 */
function apply(context, args) {
  var contextThis = getContext(context);
  contextThis._func = this;
  var result = contextThis._func(...args);
  delete contextThis._func;
  return result;
}

/**
 * 借助apply实现
 * @param {*} context 
 * @param  {...any} args 
 * @returns 
 */
function call(context, ...args) {
  return this.apply(context, args);
}

/**
 * 借助call实现
 * @param {*} context 
 * @param  {...any} fargs 
 * @returns 
 */
function bind(context, ...fargs) {
  var _t = this;
  // console.log("my bind");
  return function(...cargs) {
    _t.call(context, ...fargs, ...cargs);
  }
}

/**
 * 获取上下文
 * @param {*} context 
 * @returns 
 */
function getContext(context) {
  // 将基本类型转成对应的包装类型
  var contextThis = Object(context);
  if (context !== undefined && context !== null) {
    return contextThis;
  }
  // 为undefined、nujll，返回全局变量
  return globalThis ? globalThis : window ? window : global ? global : {};
}

Function.prototype.apply = apply;
Function.prototype.call = call;
Function.prototype.bind = bind;