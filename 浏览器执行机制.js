// function foo() {
//   var i = 0
//   return function() {
//     console.log(i++)
//   }
// }
// var f1 = foo()
// var f2 = foo()
// f1()
// f1()
// f2()
// // 下面这个比较难 能力好的可以讲解一下 知识点还是浏览器的执行机制
// console.log(1)
// setTimeout(function() {
//   console.log(2)
// }, 0)
// new Promise(resolve => {
//   console.log(3)
//   resolve()
// })
//   .then(function() {
//     console.log(4)
//   })
//   .then(function() {
//     console.log(5)
//   })
// console.log(6)
var x
var y = 1
console.log(x + y)
console.log(Number(null))
