/**
 * 从 scroll 的效果来看，假设连续滚动了 109 秒，delay 或 interval 为 10 秒
 *  1) 防抖响应了 1 次；
 *  2) 节流响应了 11 次 (从第 0 秒开始响应，到第 100 秒响应第 11 次)；
 *  3) 加强版节流，因为 setTimeout 的关系，响应了 12 次。对于最后的 9 秒的连续滚动，普通节流直接抛弃了，而加强版节流仍认为其有效。
 */

/**
 * 类似技能cd，多次按也要等cd冷却好了再执行
 * @param {*} callback 
 * @param {*} delay 
 */
 function throttle(callback, delay) {
  let last = 0;

  return function() {
    let args = arguments;
    let _this = this;
    let now = +new Date();

    function exec () {
			last = now;
      callback.apply(_this, args);
		}

    if (now - last >= delay) {
      exec();
    }
  }
}


/**
 * 加强版节流：利用 setTimeout，可以保证多一次的响应。
 * @param {*} callback 
 * @param {*} delay 
 */
 function advanceThrottle(callback, delay) {
  let last = 0;
  let timer = null;

  return function() {
    let args = arguments;
    let _this = this;
    let now = +new Date();

    function exec () {
			last = now;
      callback.apply(_this, args);
		}

    timer && clearTimeout(itmer);

    if (now - last >= delay) {
      exec();
    } else {
      let elapsed = now - last;
      timer = setTimeout(function() {
        exec();
      }, delay - elapsed);
    }
  }
}