/**
 * 不定层函数
 * 找到结束的标志：
 *  情况一： 原始函数的参数个数为0，传入参数也为0；
 *  情况二： 原始函数的参数个数不为0，累计传入参数大于等于原函数参数个数
 * 
 */
function unfixedNumLayer(fn) {
  // 记录原始函数的形参个数
  let _orignArgsLen = fn.length;
  // 保留最开始传入的形参
  let _args = [].slice.call(arguments, 1);

  function wrapperFn() {
    _args = _args.concat([].slice.call(arguments));
    // 情况一 || 情况二
    if ((_orignArgsLen === 0 && arguments.length === 0) || (_orignArgsLen > 0 && _args.length >= _orignArgsLen)) {
      return fn.apply(null, _args);
    }
    return wrapperFn;
  }

  wrapperFn.toString = function() {
    return fn.toString();
  }
  return wrapperFn;
}

// 情况一demo-------------------------

/**
 * 原函数：形参个数为0求和
 */
function addNoArgs() {
  return [].slice.call(arguments).reduce(function(a, b) {
    return (typeof a === "number" ? a : 0) + (typeof b === "number" ? b : 0);
  }, 0);
}

let unLayerAddNoArgs= unfixedNumLayer(addNoArgs);
console.log(unLayerAddNoArgs(1)(2)(3)()); // 6

// 情况二demo-------------------------

/**
 * 原函数：有形参个数求和
 */
 function addHasArgs(a, b, c, d) {
  return [].slice.call(arguments).reduce(function(a, b) {
    return (typeof a === "number" ? a : 0) + (typeof b === "number" ? b : 0);
  }, 0);
}

let unLayerAddHasArgs = unfixedNumLayer(addHasArgs);
console.log(unLayerAddHasArgs(1)(2)(3)(4)); // 10