require("./index");

function demo(a, b) {
  console.log(this, a, b);
}
demo.apply({a: 2}, [3, 4]);

demo.call({a: 2}, 2, 3);

demo.bind({a: 3}, 3)(5,5,5)