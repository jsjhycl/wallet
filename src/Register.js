import Vue from 'vue'

//将日期形的数字转换为:'可读日期值'
Vue.filter('d2s',function (value) {
  let intVal =parseInt(value);
  let date =new Date(intVal);
  return date.toString();
})

Vue.filter('state2str',function (value) {
  if(value==='0x1') return '成功';
  else if(value==='0x100') return '打包中'
  else return '错误';
})

Vue.filter('tofix',function (value, len) {
  len=len||2;
  try{
    return parseFloat(value).toFixed(len);
  }catch (e) {
    return value;
  }
})


Vue.filter('mid-cut',function (value,max=20) {
})