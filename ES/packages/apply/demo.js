require("./index");

function demo(a, b) {
  console.log(this, a, b);
}
demo.apply(null, [{name: 2}, {}]);

demo.call({a: 2}, {name: 2}, 3);

demo.bind({a: 3}, 3)(5,5,5);