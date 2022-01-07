/**
 * 防抖是，面对连续多次的触发，只响应最后一次。其中 delay 参数用来区分是否“连续触发”；
 * @param {*} callback 
 * @param {*} delay 
 */
function debounce(callback, delay) {
  let timer = null;

  return function() {
    let _this = this;
    let args = arguments;

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(function() {
      callback.apply(_this, args);
    }, delay)
  }
}

let debounceLastLog = debounce(function lastLog(mess) {
  console.log(mess);
}, 1)

// 模拟不间断点击触发事件
for(let i = 0; i < 100; i++) {
  debounceLastLog("第" + i + "次点击~");
}