<template>
  <div class="walletRightCenter padT">
    <div>
      <div class="trendTips">
        <div class="text-center color777">
          <span class="detailText">{{currentAsset.balance}}</span>≈
          <span>￥{{currentAsset.money}}</span>
        </div>
        <!--<div class="text-right">-->
          <!--<span class="trendTipsText marRL">数量</span>-->
          <!--<span class="trendTipsText assetsBg">资产</span>-->
        <!--</div>-->
      </div>
      <!--<chart class="tranImg"  :options="assets"></chart>-->
      <p class="recordTips">最近交易记录</p>
      <el-table :data="transactions" style="width: 100%;margin: auto" row-class-name="transaction-row" v-loading="isLoading" >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="交易Hash">
                <span>{{ props.row.txHash }}</span>
              </el-form-item>
              <el-form-item label="发起方">
                <span>{{ props.row.from }}</span>
              </el-form-item>
              <el-form-item label="接收方">
                <span>{{ props.row.to }}</span>
              </el-form-item>
              <el-form-item label="金额">
                <span>{{ props.row.value +' ('+  props.row.valueName+')'}}</span>
              </el-form-item>
              <el-form-item label="交易费用">
                <span>{{ props.row.fee +' ('+props.row.feeName+')' }}</span>
              </el-form-item>
              <el-form-item label="区块号">
                <span>{{ props.row.blockN }}</span>
              </el-form-item>
              <el-form-item label="记录时间">
                <span>{{ props.row.timeStamp }}</span>
              </el-form-item>
              <el-form-item class="text-danger" label="摘要">
                <span>{{ props.row.memo }}</span>
              </el-form-item>
              <el-form-item label="合约地址">
                <span>{{ props.row.conAddr }}</span>
              </el-form-item>
              <el-form-item label="交易状态">
                <span :class="props.row.isSuccess?'success':'error'">{{ props.row.strStatus }}</span>
              </el-form-item>
              <el-form-item label="交易源">
                <span>{{ props.row.source }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column width="46px">
          <template slot-scope="scope">
            <img :src="'./static/'+(wallet.address===scope.row.from?'out.png':'in.png')" style="width: 24px;height: 24px"></img>
          </template>
        </el-table-column>
        <el-table-column label="地址" width="200">
          <template slot-scope="scope">
            <span class="text-success" v-if="wallet.address===scope.row.from">{{scope.row.to}}<i class="glyphicon glyphicon-share-alt text-danger" style="margin-left: 10px"></i></span>
            <span class="text-danger" v-else>{{scope.row.from}}</span>
          </template>
        </el-table-column>
        <el-table-column label="金额">
          <template slot-scope="scope">
            <span>{{scope.row.value}} {{'('+scope.row.valueName+')'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易费用">
          <template slot-scope="scope">
            <span>{{scope.row.fee}}{{scope.row.feeName? '('+scope.row.feeName+')':scope.row.feeName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="timeStamp"  label="时间"></el-table-column>
        <el-table-column prop="memo"  label="摘要"></el-table-column>
        <el-table-column  label="交易状态">
          <template slot-scope="scope">
            <span :class="scope.row.isSuccess?'success':'error'">{{scope.row.strStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column label="">
          <template slot-scope="scope">
            <span v-if="!scope.row.isSuccess" @click="refreshHandler(scope.row)"  class="glyphicon glyphicon-refresh text-success" ></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="btnGroupSm">
      <button class="btn btn-primary btnStyle" @click="openTransferWin">转账</button>
      <button class="btn btn-primary btnStyle marRL" @click="dialogs.one=true">收款</button>
    </div>
    <el-dialog :title="wallet.name" width="40%" :visible.sync="dialogs.two">
      <div class="modal-body">
        <ul class="modalList list-unstyled">
          <li>
            <p>币种</p>
            <select v-model="currentAsset.name" class="modalInput modalSelStyle" disabled>
              <option v-for="item in wallet.resources" :value="item.name">{{item.name}}</option>
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
            <p>{{currentAsset.name}}</p>
            <div class="modalInput">
              <input @input="editAmountHandler" v-model="transferInfo.amount" class="modalInpStyle" type="text" placeholder="输入转出金额">
              <span @click="setAllHandler" class="color64AFEA">全部转出</span>
            </div>
            <div class="modalTF marT">
              <p>可用余额 <span>{{currentAsset.balance}}</span></p>
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
    </el-dialog>
    <!--收款-->
    <el-dialog title="收款码" width="33%" :visible.sync="dialogs.one">
      <div class="modal-body marT2 text-center">
        <p>{{wallet.address}}</p>
        <div class="padT">
          <qriously :value="wallet.address" :size="187" />
        </div>
      </div>
      <div class="modalFooter">
        <button v-clipboard:copy="wallet.address" v-clipboard:success="copySuccess" type="button" class="btn btn-primary">复制收款地址</button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {transaction, TransferItem} from '../utils/models';
    export default {
      name: "WalletDetails",
      data: () => ({
        isLoading:false,
        wallet: {},
        currentAsset: {},
        users: [],
        serviceCharge: 0.01,//需配置
        transferInfo: {},
        transactions: [],
        dialogs: {one: false, two: false}
      }),
      computed: {
        assets: () => ({
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
              color: 'aliceblue'
            }
          }]
        })
      },
      created: function () {
        this.init();
        this.$bindRefresh('init');
      },
      methods: {
        init() {
          // this.wallet = this.$storage.getWalletById(this.$route.params.id);
          // this.currentAsset = this.wallet.resources.find(item => item.name === this.$route.params.assetName);
          // //获取资产信息
          // this.$storage.getServerResourceInfo(this.wallet.type, this.currentAsset.contractAddr, this.currentAsset.name, this.wallet.address)
          //   .then(sinfo => {
          //     this.currentAsset.balance = sinfo.balance;
          //     this.currentAsset.money = sinfo.money;
          //   });
          this.wallet = this.$route.params.wallet;
          this.currentAsset = this.$route.params.currentAsset;
          //获取交易记录
          this.isLoading = true;
          this.$storage.getAllTransactions(this.wallet.type, this.wallet.address, this.currentAsset.contractAddr, 1, 20)
            .then(result => {
              this.transactions = result.records;
              this.isLoading = false;
            }).catch(err => {
            this.$alert('出现错误：' + err, '错误');
            this.isLoading = false;
          });
          this.users = this.$storage.getUsers();
        },
        //转账
        transferHandler: function () {
          try {
            this.transferInfo.check();
            //验证密码
            this.$checkPassword(this.wallet.id)
              .then(result => {
                this.transferInfo.sessionId = this.$lpc__.transferCoin(this.wallet.type,//注意修改 todo
                  result,
                  this.wallet.privateKey,
                  this.transferInfo.toAdress,
                  this.transferInfo.amount,
                  this.currentAsset.contractAddr).txHash;// todo 应该需要修改
                console.log(this.transferInfo,'........................');
                this.transferInfo.conAddr = this.currentAsset.contractAddr;
                this.$storage.addLocalTransfer(this.transferInfo);
                this.transactions.unshift(new transaction().fromLocalByObj(this.wallet.address, this.transferInfo));
                this.dialogs.two = false;
              })
          } catch (e) {
            console.log(e);
            this.$message({message: e, type: 'error'});
          }
        },
        //选择地址
        addAddressHandler: function (command) {
          this.transferInfo.toAdress = command.address;
        },
        //设置所有金额
        setAllHandler: function () {
          this.transferInfo.amount = this.currentAsset.balance;
        },
        //设置转账金额
        editAmountHandler: function (e) {
          if (!/^[\d\.]+$/.test(this.transferInfo.amount)) this.transferInfo.amount = '';
          let val = parseFloat(this.transferInfo.amount);
          if (val > this.currentAsset.balance) this.transferInfo.amount = this.currentAsset.balance;
        },
        //转账成功回调
        copySuccess: function (e) {
          this.$message({message: '已拷贝到剪切板.', type: 'success'});
        },
        //打开转账窗口
        openTransferWin: function () {
          this.transferInfo = new TransferItem();
          this.transferInfo.coinType = this.currentAsset.name;
          this.dialogs.two = true;
        },
        //  刷新
        refreshHandler: function (transItem) {
          this.isLoading=true;
          this.$storage.getTransactionByTxhash(this.wallet.type, [transItem.txHash])
            .then(results => {
              if (results.length > 0) {
                transItem.complexByHashData(results[0]);
              }
              this.isLoading=false;
            })
            .catch(err=>{
              this.$alert('出现错误：'+err,'错误');
              this.isLoading=false;
            })
        }
      }
    }
</script>

<style scoped>
  @import "../assets/css/personalRecord.css";
  .demo-table-expand {
    font-size: 0;
    background-color: aliceblue;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .success{
    color: green;
  }
  .error{
    color: red;
  }
</style>
