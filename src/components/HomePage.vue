<template>
  <div class="walletRightCenter">
    <p>{{now}}</p>
    <!--<button @click="testSave">测试保存</button>-->
    <!--<chart :options="assets"></chart>-->
    <!--<chart :options="polar"></chart>-->
    <!--<p >{{message}}</p>-->
    <!--<button v-clipboard:copy="message" v-clipboard:success="copySuccess">复制</button>-->
    <!--<img class="expertsImg" src="../assets/img/experts.png">-->
    <!--<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>-->

    <!--<qriously value="Hello World!" :size="200" />-->
    <!--<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>-->

    <!--<el-dialog-->
      <!--title="提示"-->
      <!--:visible.sync ="dialogVisible"-->
      <!--width="30%"-->
      <!--&gt;-->
      <!--<span>这是一段信息</span>-->
      <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
    <!--<el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
  <!--</span>-->
    <!--</el-dialog>-->

  </div>
</template>

<script>
  import moment from 'moment'
  import spark from 'spark-md5'
  // import FileSaver from 'file-saver'
  // import axios from 'axios'
  export default {
    data: function () {
      return {
        now:undefined
      }
      // let data = []
      //
      // for (let i = 0; i <= 360; i++) {
      //   let t = i / 180 * Math.PI
      //   let r = Math.sin(2 * t) * Math.cos(2 * t)
      //   data.push([r, i])
      // }
      //
      // return {
      //   assets:{
      //     xAxis: {
      //       type: 'category',
      //       boundaryGap: false,
      //       data: ['4/25', '4/26', '4/27', '4/28', '4/29', '5/1', '5/2']
      //     },
      //     yAxis: {
      //       type: 'value'
      //     },
      //     series: [{
      //       data: [820, 932, 901, 934, 1290, 1330, 1320],
      //       type: 'line',
      //       areaStyle: {
      //         color:'aliceblue'
      //       }
      //     }]
      //   },
      //   polar: {
      //     title: {
      //       text: '极坐标双数值轴'
      //     },
      //     legend: {
      //       data: ['line']
      //     },
      //     polar: {
      //       center: ['50%', '54%']
      //     },
      //     tooltip: {
      //       trigger: 'axis',
      //       axisPointer: {
      //         type: 'cross'
      //       }
      //     },
      //     angleAxis: {
      //       type: 'value',
      //       startAngle: 0
      //     },
      //     radiusAxis: {
      //       min: 0
      //     },
      //     series: [
      //       {
      //         coordinateSystem: 'polar',
      //         name: 'line',
      //         type: 'line',
      //         showSymbol: false,
      //         data: data
      //       }
      //     ],
      //     animationDuration: 2000
      //   }
      // }
    },
    mounted:function(){
      // console.log(this,'mount');
    },
    created:function () {
      // axios.get('https://www.blockwallet.pro/api/v1//assets/0x3')
      //   .then(result=>console.log(result))
      //   .catch(err=>console.log(err))
      // this.now=moment(1521439283000).fromNow()
      console.log(moment('18-7-14 上午11:27:51','YY-M-DD 上午HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'))
      console.log(spark.hash('ycl'))
    },
    methods:{
      testSave(){
        // for(let i=0;i<3;i++){
        //   var blob = new Blob(["Hello, world!"], {type: "application/octet-stream"});
        //   setTimeout(()=>FileSaver.saveAs(blob, `hello world-${i}.json`),10000)
        //
        // }
      }
    }
  }
</script>

<style scoped>
  @import "./../assets/css/homePage.css";
</style>
