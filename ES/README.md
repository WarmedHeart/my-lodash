## core-js v3.32
ES6所有特性均可查看第三方库core-js是如何实现的

描述：
> Modular standard library for JavaScript. Includes polyfills for ECMAScript up to 2021
> JavaScript的模块化标准库。包括ECMAScript到2021年的polyfills补丁【可以理解成将ES6及高版本新特性通过ES5来实现，包括：稳定ECMAScript（作为提案被接受且已经使用很长时间的功能）、提案中ECMAScript、web标准】

目录结构
core-js：internals和modules为功能实现【modules借助internals方法，供内部模块引入】，其他均为根据不同需求引入【没搞明白features和actual区别】。

  - internals：各个单独方法的实现
  - *modules：借助internals文件下的方法，实现复杂方法并赋值（比方给Promise.all赋值）【供内部引入（下面的文件夹）】
  
  - es：稳定ES
  - proposals：提案中ES（功能模块区分）
  - stage：提案中ES（ECMAScript提案过程区分 stage0、stage1、stage2、stage3、stage4）
  - web：web标准
  - stable：稳定ES + web标准
  - features：全部补丁：稳定 + 提案ES + web标准【考虑到兼容有遗留代码，`core-js@4`将移除遗留代码 】
  - actual：全部补丁：稳定 + 提案ES + web标准【1.引入所需feature`import 'core-js/actual/array/from'; `; 2. 不会像全局变量中添加from属性，但Array.from不存在时还是会被实现 `import from from 'core-js-pure/actual/array/from';`】
  
