// import '@babel/polyfill'; // 设置新特性填充物，使浏览器向后兼容

const arr = [
  new Promise(() => {}),
  new Promise(() => {})
];

arr.map(item => {
  console.log(item);
});

