const MyPromise = require("./MyPromise");

/* demo实例 */
let arg1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});
let arg2 = 2;
// let arg3 = Promise.resolve(3);
let arg3 = Promise.reject(3);

MyPromise.allSettled([arg1, arg2, arg3])
  .then(data => {console.log("fulfilled: " + data.join(","));})
  .catch(err => {console.log("rejected: " + err);})

MyPromise.allSettled([arg1, arg2, arg3])
  .then(data => {console.log("fulfilled: " + data.map(item => item.value).join(","));})
  
// MyPromise.race([arg1, arg2, arg3])
//   .then(data => {console.log("fulfilled: " + data);})
//   .catch(err => {console.log("rejected: " + err);})