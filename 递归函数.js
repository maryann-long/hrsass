// 得到一个m长度都为n的数组
// function getArr(m, n) {
//   var arr = []
//   function setArr(m, n) {
//     if (arr.length === m) {
//       return arr
//     }
//     arr.push(n)
//     return setArr(m, n)
//   }
//   setArr(m, n)
//   return arr
// }
// const res = getArr(3, 4)
// console.log(res)

// 方法二: 正则 (缺点：当传入的数据带,时，以，为分隔符会出错，逻辑还需要优化)
// function getArr(m, n) {
//   let str = new Array(m).join(' ') // 生成对应长度的字符串
//   console.log(str) // ..
//   // str = str.replace(/\s?/g, n) // 使用正则替换得到对应的字符串
//   str = str.replace(/\s{0,1}/g, n) // 使用正则替换得到对应的字符串
//   console.log(str)
//   // str = str.replace(new RegExp(`(${n})`, 'g'), '$1,') // 得到逗号分隔的字符串
//   str = str.replace(new RegExp(/(123)/g), '$1,') // 得到逗号分隔的字符串
//   str = str.substring(0, str.length - 1)
//   return str.split(',')
// }
// // ["12345", "12345", "12345"]
// console.log(getArr(3, '123'))
// console.log(new RegExp(`(${4})`, 'g')) // /(4)/g

// var fruits = ['Banana', 'Orange', 'Apple', 'Mango']
// fruits.fill('Runoob') // Runoob,Runoob,Runoob,Runoob

// function getArr(n, m) {
//   // 方法三: fill()
//   return Array(n).fill(m)
// }
// // ["aa", "aa", "aa", "aa", "aa", "aa", "aa", "aa", "aa", "aa"]
// console.log(getArr(10, 'aa'))

// function getArray(n, m) {
//   // 方法四：map()
//   return Array(n)
//     .join(',')
//     .split(',')
//     .map(() => {
//       return m
//     })
// }
// console.log(getArray(4, 4))
// console.log(Array(3).join(',').split(','))

// while和do...while方法
