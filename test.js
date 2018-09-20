// let password='Ad@123';
// let patters =[/[a-z,A-Z]/,/[0-9]/,/[^\d,0-9,a-z,A-Z]/];
// console.log(patters.map(m=>m.test(password)).filter(item=>item===true))
// console.log(new Buffer('{','ascii').toString('hex'))
// function strToHexCharCode(str) {
//   if(str === "")
//     return "";
//   var hexCharCode = [];
//   hexCharCode.push("0x");
//   for(var i = 0; i < str.length; i++) {
//     hexCharCode.push((str.charCodeAt(i)).toString(16));
//   }
//   return hexCharCode.join("");
// }
// console.log(strToHexCharCode('{'))
// console.log(Date.now())
// console.log(new Date('18-7-14 上午11:27:51'))


// let arr =[5,3,7,1,2]
// console.log(arr.sort());
// console.log(arr)
// console.log(0.000000001*Math.pow(10,9));//n20180919
// [1,2,3].forEach(function (item) {
//   setTimeout(function () {
//     console.log(item);
//   },1000)
// })

  [1,2,3].forEach(m=> {
      setTimeout(function () {
    console.log(m);
  },1000)

  })
