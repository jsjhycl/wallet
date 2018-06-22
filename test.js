let password='Ad@123';
let patters =[/[a-z,A-Z]/,/[0-9]/,/[^\d,0-9,a-z,A-Z]/];
console.log(patters.map(m=>m.test(password)).filter(item=>item===true))
