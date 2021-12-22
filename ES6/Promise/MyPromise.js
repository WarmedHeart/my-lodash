
/**
 * Promise 有个缺点就是一旦创建就无法取消；
 * 通过一些方法中断 promise，但是 promise 并没有终止，网络请求依然可能返回，只不过那时我们已经不关心请求结果了。
 * 被then、catch捕获后，在其内部状态又变为pending
 */
 function MyPromise(fn) {
  if (!(this instanceof Foo)) throw new Error('no new instance');
  
  this.cbs = [];
  const resolve = (value) => {
    setTimeout(() => {
      this.data = value;
      this.cbs.forEach((cb) => cb(value));
    })
  }

  fn(resolve);
 };

 MyPromise.prototype.then = function(onResolved) {
  return new MyPromise((resolve) => {
    this.cbs.push(() => {
      const res = onResolved(this.data);
      if (res instanceof MyPromise) {
        res.then(res);
      } else {
        resolve(res);
      }
    })
  })
 }

 /**
  * 通过MDN分析Promise.all特点：全部fulfilled执行resolve(res: Array)；有一个rejected执行reject(res)
  * @param {} iterable: promise的iterable类型（注：Array，Map，Set都属于ES6的iterable类型）
  * @return Promise实例
  */
 MyPromise.all = function(iterable) {
  if(typeof iterable[Symbol.iterator] !== 'function') {
      Promise.reject("args is not iteratable!");
  }
   return new Promise((resolve, reject) => {
     let promises = Array.from(iterable);
     if(promises.length === 0) {
       resolve([]);
     } else {
       let result = [];
       let index = 0;
       for(let i = 0; i < promises.length; i++) {
         Promise.resolve(promises[i]).then(data => {
           result[i] = data;
           if(++index === promises.length) {
             resolve(result);
           }
         }, err => {
           reject(err);
           return;
         })
       }
     }
   });
 }

 /**
  * 同Promise.all区别：当有rejected状态时也不出发reject，全部统一放到集合中resolve
  * @param {*} iterable 
  * @returns 
  */
  MyPromise.allSettled = function(iterable) {
    if(typeof iterable[Symbol.iterator] !== 'function') {
        Promise.reject("args is not iteratable!");
    }
     return new Promise((resolve, reject) => {
       let promises = Array.from(iterable);
       if(promises.length === 0) {
         resolve([]);
       } else {
         let result = [];
         let index = 0;
         for(let i = 0; i < promises.length; i++) {
           Promise.resolve(promises[i]).then(data => {
             result[i] = { status: 'fulfilled', value: data };
             if(++index === promises.length) {
              resolve(result);
             }
           }, err => {
            result[i] = { status: 'rejected', value: err };
            if(++index === promises.length) {
              resolve(result);
            }
           })
         }
       }
     });
   }

  /**
  * 通过MDN分析Promise.race特点：有一个fulfilled执行resolve(res)；有一个rejected执行reject(res)
  * @param {} iterable: promise的iterable类型（注：Array，Map，Set都属于ES6的iterable类型）
  * @return Promise实例
  */
 MyPromise.race = function(iterable) {
  if(typeof iterable[Symbol.iterator] !== 'function') {
    Promise.reject("args is not iteratable!");
  }
  return new Promise((resolve, reject) => {
    debugger
    let promises = Array.from(iterable);
      if(promises.length===0) {
        return;
      } else {
        for(let i = 0; i < promises.length; i++) {
          Promise.resolve(promises[i]).then(data => {
            resolve(data);
            return;
          }, err => {
            reject(err);
            return;
          })
          }
      }
  })
 }
 
 /**
  * 
  * @param {*} callback 
  * @returns 
  */
 MyPromise.prototype.finally = function(callback) {
   return this.then(value => {
    return Promise.resolve(callback()).then(() => {
      return value;
    });
   }, err => {
    return Promise.resolve(callback()).then(() => {
      throw err;
    });
   })
 }
 
 module.exports = MyPromise;
 