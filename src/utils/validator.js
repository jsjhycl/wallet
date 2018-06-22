function checkPassword(password) {
  if (!password) return '密码不能为空!'
  if (password.length < 8) return '密码长度不能小于8';
  let patters =[/[a-z,A-Z]/,/[0-9]/,/[^\d,0-9,a-z,A-Z]/];
  if(patters.map(m=>m.test(password)).filter(item=>item===true).length<2) return '密码强度不够:必须含数字,字母,特殊字符的任两种';
  return true;
}

export default {checkPassword};
