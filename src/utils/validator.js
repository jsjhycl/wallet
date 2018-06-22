function checkPassword(password) {
  if (!password) return '密码不能为空!'
  if (password.length < 8) return '密码长度不能小于8';
  return true;
}

export default {checkPassword};
