<template>
  <div class="walletRightCenter padT">
    <div>
      <div class="trendTips">
        <div class="text-center color777">
          <span class="detailText">0</span>≈
          <span>￥0</span>
        </div>
        <div class="text-right">
          <span class="trendTipsText marRL">数量</span>
          <span class="trendTipsText assetsBg">资产</span>
        </div>
      </div>
      <chart class="tranImg"  :options="assets"></chart>
      <!--<img class="tranImg" src="../assets/img/transactionTrend.jpg">-->
      <p class="recordTips">最近交易记录</p>
    </div>
    <div class="btnGroupSm">
      <button class="btn btn-primary btnStyle" data-toggle="modal" data-target="#transferAcc">转账</button>
      <button class="btn btn-primary btnStyle marRL" @click="dialogs.one=true">收款</button>
    </div>
    <!--转账-->
    <div class="modal fade" id="transferAcc" tabindex="-1" data-backdrop="static">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
              &times;
            </button>
            <h4 class="modal-title">
              {{wallet.name}}
            </h4>
          </div>
          <div class="modal-body">
            <ul class="modalList list-unstyled">
              <li>
                <p>币种</p>
                <select v-model="transferInfo.cointype" class="modalInput modalSelStyle">
                  <option v-for="item in wallet.resources">{{item.name}}</option>
                </select>
              </li>
              <li>
                <p>地址</p>
                <div class="modalInput">
                  <input v-model="transferInfo.toAdress" class="modalInpStyle" type="text">
                  <el-dropdown trigger="click" @command="addAddressHandler">
                    <span class="color64AFEA">选择地址<i class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item :command="user"  v-for="user in users" :key="user.id">{{user.firstName+" "+user.lastName}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
                <p class="colorFF9191 marT">转账前请务必确认地址及币种信息无误</p>
              </li>
              <li>
                <p>BCB</p>
                <div class="modalInput">
                  <input @input="editAmountHandler" v-model="transferInfo.amount" class="modalInpStyle" type="text" placeholder="输入转出金额">
                  <span @click="setAllHandler" class="color64AFEA">全部转出</span>
                </div>
                <div class="modalTF marT">
                  <p>可用余额 <span>{{balance}}</span></p>
                  <p>网络手续费 <span class="colorFF9191">{{serviceCharge}}</span></p>
                </div>
              </li>
              <li>
                <p>添加备注</p>
                <input v-model="transferInfo.memo" class="modalInput" type="text">
              </li>
            </ul>
          </div>
          <div class="modalFooter">
            <button @click="transferHandler" type="button" class="btn btn-primary">转账</button>
          </div>
        </div>
      </div>
    </div>
    <!--收款-->
    <el-dialog title="收款码" width="33%" :visible.sync="dialogs.one">
      <div class="modal-body marT2 text-center">
        <p>{{gather.code}}</p>
        <div class="padT">
          <qriously :value="gather.code" :size="187" />
          <!--<img class="modalEwm" :src="'/static/'+gather.qrcode">-->
        </div>
      </div>
      <div class="modalFooter">
        <button v-clipboard:copy="gather.code" v-clipboard:success="copySuccess" type="button" class="btn btn-primary">复制收款地址</button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
      name: "WalletDetails",
      data: () => ({
        wallet:{},
        balance:100,//余额
        serviceCharge:0.01,
        users:[],
        transferInfo:{
          sessionId:'',
          cointype:'',
          toAdress:'',
          amount:0,
          memo:'',
          action:'卖',
          state:0
        },
        gather:{
          code:'111111111',
          qrcode:'transactionEwm.jpg'
        },
        dialogs:{one:false}
      }),
      computed:{
        assets:()=>({
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['4/25', '4/26', '4/27', '4/28', '4/29', '5/1', '5/2']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {
              color:'aliceblue'
            }
          }]
        })
      },
      created:function() {
        this.wallet =this.$storage.getWalletById(this.$route.params.id);
        this.users =this.$storage.getUsers();
        console.log(this.users)
      },
      methods: {
        //转账
        transferHandler: function () {
          //调用本地接口，获取sessionId等
          this.transferInfo.sessionId='ab21ff...';
          //调用web接口执行转账
          //保存本地转账记录
          console.log(this.transferInfo);
          this.$storage.addLocalTransfer(this.transferInfo);
          this.transferInfo={};//重置数据
          $('#transferAcc').modal('hide');

        },
        //选择地址
        addAddressHandler:function (command) {
          this.transferInfo.toAdress =command.address;
        },
        //设置所有金额
        setAllHandler:function () {
          this.transferInfo.amount=this.balance;
        },
        editAmountHandler:function (e) {
          if(!/^[\d\.]+$/.test(this.transferInfo.amount)) this.transferInfo.amount='';
          let val =parseFloat(this.transferInfo.amount);
          if(val>this.balance) this.transferInfo.amount=this.balance;
        },
        copySuccess:function (e) {
          this.$message({message:'已拷贝到剪切板.',type:'success'});
        }
      }
    }
</script>

<style scoped>
  @import "../assets/css/personalRecord.css";
</style>
