import './utils/myGlobal'
import 'babel-polyfill'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
const Bus = new Vue()
import ElementUI from 'element-ui'
import VueQriously from 'vue-qriously'
import VueClipboard from 'vue-clipboard2'
// import ECharts from 'vue-echarts'
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/chart/line'
//----------------------------------
// import 'echarts/lib/chart/pie'
// import 'echarts/lib/chart/map'
// import 'echarts/lib/chart/radar'
// import 'echarts/lib/chart/scatter'
// import 'echarts/lib/chart/effectScatter'
// import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/polar'
// import 'echarts/lib/component/geo'
// import 'echarts/lib/component/legend'
// import 'echarts/lib/component/title'
// import 'echarts/lib/component/visualMap'
// import 'echarts/lib/component/dataset'


import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'

import Helper from  '@/utils/common.js'
import LPCHelper from  '@/utils/lpchelper.js'
import RPCHelper from  '@/utils/rpchelper.js'
import storage from '@/utils/storage.js'

Vue.config.productionTip = false;
Vue.prototype.$g__ =Helper;
Vue.prototype.$lpc__=LPCHelper;
Vue.prototype.$rpc__=RPCHelper;
Vue.prototype.$storage =storage;
// Vue.prototype.$showLoading=function(){
//
// },
//刷新
Vue.prototype.$bindRefresh=function(method){
  this.$root.$off('refresh');
  this.$root.$on('refresh', () => {
    if(method in this) this[method]();
  });
},
Vue.prototype.$checkPassword=function(walletId) {
  return this.$prompt('', '请确认密码', {
    center: true,
    inputType: 'password',
    inputPlaceholder: 'password',
    showClose: false
  })
    .then(result => {
      let wallet = this.$storage.getWalletById(walletId);
      if (this.$lpc__.verify(wallet.type, result.value || '', wallet.privateKey) === true) return result.value;
      else {
        this.$message({"message":'密码输入有误',"type":"error"});
        throw '密码输入有误';
      }
    })
}

/*全局过滤器*/
import './../src/Register';
/* eslint-disable no-new */
Vue.use(ElementUI);
Vue.use(VueClipboard);
Vue.use(VueQriously);
// Vue.component("chart",ECharts);
try{
  CefSharp.BindObjectAsync("bindObject", "bindObject");
  let data =JSON.parse(bindObject.LoadJson()||'{}');
  Vue.prototype.$storage.initData(data);
}catch (e) {
  console.log('调用本地接口错误：',e);
  Vue.prototype.$message({'message':'无本地运行环境，无法调用本地接口.','type':'error'})
}
Bus.config=storage.getConfig();
new Vue({
  el: '#app',
  router,
  data:{
    Bus
  },
  created(){
    this.$storage.prepareAsset();//初始化资产列表
  },
  components: { App },
  template: '<App/>'
})
