import Vue from 'vue'
import moment from 'moment'

//将日期形的数字(秒)转换为:'可读日期值'
Vue.filter('d2s',function (value,isfuzzy=false) {
  // return moment(value*1000).format('YYYY-MM-DD hh:mm:ss');
  return isfuzzy === false ? moment(value * 1000).format('YYYY-MM-DD HH:mm:ss') : moment(value * 1000).fromNow();
})

Vue.filter('state2str',function (value) {
  if(value==='0x1') return '成功';
  else if(value==='0x100') return '打包中'
  else return '错误';
})

Vue.filter('tofix',function (value, len) {
  len=len||2;
  try{
    let val= parseFloat(parseFloat(value).toFixed(len));
    if(Number.isNaN(val)) return value;
    return val;
  }catch (e) {
    return value;
  }
})


Vue.filter('mid-cut',function (value,max=20) {
})

Vue.filter('coin-symbol',function (value) {
if(value==='美元') return '$';
else if(value==='人民币') return '￥';
})

Vue.filter('exchange-state-str',function (value) {
  if(value==="ongoing") return '换币中'
  else if(value==="success") return '换币成功'
  else return value;
})

Vue.filter('exchange-time',function (value,fromFormat,toFormat) {
  toFormat=toFormat||'YYYY-MM-DD HH:mm:ss';
  return moment(value,fromFormat).format(toFormat);
})
