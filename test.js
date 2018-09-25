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

  // [1,2,3].forEach(m=> {
  //     setTimeout(function () {
  //   console.log(m);
  // },1000)
  //
  // })

let a=1.1234;

// let parts =a.toString().split('.');
// let pos =Math.max(parts.length==2?parts[1].length:0,5);
// console.log(a.toFixed(pos),pos);
// console.log((0.3-0.2).toFixed(2));

//

console.log(/^0x[0-9,a-f]{64}$/.test('0x642F36E732BB13737B681B56F21C4C39B9E56EE36C75E96CE41BAF6A421EE3Ab'.toLocaleLowerCase()))
