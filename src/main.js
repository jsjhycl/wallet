// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import VueQriously from 'vue-qriously'
import VueClipboard from 'vue-clipboard2'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
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

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Helper from  '@/utils/common.js'
import LPCHelper from  '@/utils/lpchelper.js'
import storage from '@/utils/storage.js'

Vue.config.productionTip = false;
Vue.prototype.$g__ =Helper;
Vue.prototype.$lpc__=LPCHelper;
Vue.prototype.$storage =storage;
Vue.prototype.$checkPassword=function(){
  return this.$prompt('','请确认密码',{center:true,inputType:'password',inputPlaceholder:'password',showClose:false})
    .then(result=>Promise.resolve(true))
}
/* eslint-disable no-new */
Vue.use(ElementUI);
Vue.use(VueClipboard);
Vue.use(VueQriously);
Vue.component("chart",ECharts);
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
