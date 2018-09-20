import './utils/myGlobal';
import common from './utils/common';
import 'babel-polyfill'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
const Bus = new Vue();
Vue.Bus=Bus;
Vue.$Lang='cn';
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
import validator from '@/utils/validator.js'

import Agreement from './components/docs/Agreement'

Vue.config.productionTip = false;
Vue.prototype.$g__ =Helper;
Vue.prototype.$lpc__=LPCHelper;
Vue.prototype.$rpc__=RPCHelper;
Vue.prototype.$storage =storage;
Vue.prototype.$validator__=validator;
// Vue.prototype.$showLoading=function(){
//
// },
//刷新
Vue.prototype.$bindRefresh=function(method){
  this.$root.$off('refresh');
  this.$root.$on('refresh', () => {
    if(method in this) this[method]('refresh');
  });
},
Vue.prototype.$bindUpload=function(method){
  this.$root.Bus.$off('upload');
  this.$root.Bus.$on('upload', (url) => {
    if(method in this) this[method](url);
  });
},
Vue.prototype.$checkPassword=function(walletId,needCheck=true) {
  return this.$prompt('', '请确认密码', {
    center: true,
    inputType: 'password',
    inputPlaceholder: 'password',
    inputPattern:/.{1}/,
    inputErrorMessage:'密码不能为空',
    showClose: false
  })
    .then(result => {
      let wallet = this.$storage.getWalletById(walletId);
      if(!needCheck) return result.value||'';
      return this.$lpc__.verify(wallet.type, result.value || '', wallet.privateKey)
        .then(ret=>{
          if(ret) return result.value;
          throw '密码输入有误'
        })
        .catch(err=> {
          this.$message({"message": err, "type": "error"});
          throw err;
        })
    })
}

/*全局过滤器*/
import './../src/Register';
/* eslint-disable no-new */
Vue.use(ElementUI);
Vue.use(VueClipboard);
Vue.use(VueQriously);
Vue.component("agreement",Agreement);
// Vue.component("chart",ECharts);
Vue.$isLocal=false;
setupWebViewJavascriptBridge(function(bridge) {
  let data={};
  let ps =["bcb_wallets","bcb_users","bcb_transfers","bcb_config","bcb_assets"].map(m=>Vue.localExcute('getData',{'key':m,'default':m==="bcb_config"?'{}':'[]'}));
  Promise.all(ps)
    .then(results=>{
      ["bcb_wallets","bcb_users","bcb_transfers","bcb_config","bcb_assets"].forEach((key,index)=>{
        data[key]=JSON.parse(results[index]);
      });
      Vue.prototype.$message({'message':'promise:'+JSON.stringify(data),'type':'success'});
      Vue.prototype.$storage.initData(data);
      Bus.config=storage.getConfig();
      Vue.$isLocal=true;
    })
    .catch(err=>{
      Vue.prototype.$message({'message':'promise:'+err,'type':'error'});
    })
});
// try{
//   //注册mac
//   // setTimeout(function () {
//   //   Vue.prototype.$message({'message':'WebViewJavascriptBridge in timeout :'+window.WebViewJavascriptBridge,'type':'error'})
//   // })
//   // Vue.prototype.$message({'message':'WebViewJavascriptBridge:'+window.WebViewJavascriptBridge,'type':'error'})
//   let data ={};
//   ["bcb_wallets","bcb_users","bcb_transfers","bcb_config","bcb_assets"].forEach(fileName=>{
//     window.WebViewJavascriptBridge.callHandler('getData',{'key':fileName,'default':fileName==="bcb_config"?'{}':'[]'},function(response) {
//       data[fileName]=item;
//       Vue.prototype.$message({'message':item,'type':'error'})
//       Vue.prototype.$storage.initData(data);
//     });
//     // let item=JSON.parse(bindObject.Read(fileName,fileName==="bcb_config"?'{}':'[]'));
//   })
//   // let data =JSON.parse(bindObject.LoadJson()||'{}');
//   // Vue.prototype.$storage.initData(data);
//   Vue.$isLocal=true;
// }catch (e) {
//   Vue.$isLocal=false;
//   console.log('调用本地接口错误：',e);
//   // Vue.prototype.$message({'message':'无本地运行环境，无法调用本地接口.'+e.toString(),'type':'error'})
// }
// Vue.prototype.$message({'message':'isLocal:'+Vue.$isLocal.toString(),'type':'success'})

Bus.config=storage.getConfig();

new Vue({
  el: '#app',
  router,
  data:{
    Bus
  },
  async created(){
    this.$storage.prepareAllAssets(['0x1002']);//初始化资产列表[0x3,0x10000]
  },
  components: { App },
  template: '<App/>'
})

//检查任务状态(先支持get)
// (function excute() {
//   let timer = setTimeout( function () {
//     clearTimeout(timer);
//     let jobs =common.getJobs();
//     console.log('found jobs:',jobs);
//     // for(let job of jobs){
//     //   console.log(job);
//     //   common.removeJob(job);
//     // }
//     //excute();
//   },1000)
// })()

// async function init() {
//   await
// }

function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
  if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function() {
    document.documentElement.removeChild(WVJBIframe) }, 0)
}

Vue.localExcute=function (method,params,bridge=window.WebViewJavascriptBridge) {
  bridge=bridge||WebViewJavascriptBridge;
  return new Promise(function (resolve, reject) {
    try{
      bridge.callHandler(method,params,function(response) {
        resolve(response);
      });
    }
    catch (e) {
      reject('excute mac api:'+e);
    }
  })
}



