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
  if (context !== undefined) {
    return context;
  }
  return globalThis ? globalThis : window ? window : global ? window : {};
}

Function.prototype.apply = apply;
Function.prototype.call = call;
Function.prototype.bind = bind;