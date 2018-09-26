<template>
  <div class="walletRightCenter padT">
    <div>
      <div class="trendTips">
        <div class="text-center color777">
          <span class="detailText">{{currentAsset.balance|tofix($root.Bus.config.coinFractionLen)}}</span>≈
          <span>{{$root.Bus.config.currency|coin-symbol}}{{currentAsset.money|tofix($root.Bus.config.lawCoinFractionLen)}}</span>
        </div>
        <div class="text-right">
          <!--<button class="btn btn-sm add-currency-button" @click="dialogs.six=true">转移代币拥有者</button>-->
          <button v-if="showProxy" class="btn btn-success" @click="dialogs.six=true">转移代币拥有者</button>
        </div>
      </div>
      <!--<chart class="tranImg"  :options="assets"></chart>-->
      <p class="recordTips">最近交易记录</p>
      <el-table :data="transactions" style="width: 100%;margin: auto;margin-bottom: 71px;" row-class-name="transaction-row" v-loading="isLoading" >
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
                <span>{{ props.row.value|tofix($root.Bus.config.coinFractionLen) +' ('+  props.row.valueName+')'}}</span>
              </el-form-item>
              <el-form-item label="交易费用">
                <span>{{ props.row.fee|tofix($root.Bus.config.coinFractionLen) +' ('+props.row.feeName+')' }}</span>
              </el-form-item>
              <el-form-item label="区块号">
                <span>{{ props.row.blockN }}</span>
              </el-form-item>
              <el-form-item label="记录时间">
                <span>{{ props.row.timeStamp|d2s }}</span>
              </el-form-item>
              <el-form-item class="text-danger" label="摘要">
                <el-tooltip :content="props.row.memo"  effect="light">
                  <span class="over-hidden">{{ props.row.memo }}</span>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="合约地址">
                <span>{{ props.row.conAddr }}</span>
              </el-form-item>
              <el-form-item label="交易状态">
                <span :class="props.row.isSuccess?'success':'error'">{{ props.row.strStatus }}</span>
              </el-form-item>
              <!--<el-form-item label="交易源">-->
                <!--<span>{{ props.row.source }}</span>-->
              <!--</el-form-item>-->
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
            <span>{{scope.row.value|tofix($root.Bus.config.coinFractionLen)}} {{'('+scope.row.valueName+')'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易费用">
          <template slot-scope="scope">
            <span>{{scope.row.fee|tofix($root.Bus.config.coinFractionLen)}}{{scope.row.feeName? '('+scope.row.feeName+')':scope.row.feeName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="时间">
          <template slot-scope="scope">
            <span>{{scope.row.timeStamp|d2s(true)}}</span>
          </template>
        </el-table-column>
        <!--<el-table-column prop="memo"  label="摘要"></el-table-column>-->
        <el-table-column  label="交易状态">
          <template slot-scope="scope">
            <span :class="scope.row.isSuccess?'success':'error'">{{scope.row.strStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column label="">
          <template slot-scope="scope">
            <span v-if="!scope.row.isSuccess" @click="refreshHandler(scope.row)"  class="glyphicon glyphicon-refresh text-success" v-loading="isRefresh" ></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="btnGroupSm" style="min-width: 765px;z-index: 100">
      <!--<button class="btn btn-success btnStyle" @click="dialogs.three=true">燃料价格</button>-->
      <button v-if="showProxy&&contract.burnEnabled" class="btn btn-success btnStyle" @click="dialogs.four=true">代币燃烧</button>
      <button v-if="showProxy&&contract.addSupplyEnabled" class="btn btn-success btnStyle" @click="dialogs.five=true">代币增发</button>
      <button class="btn btn-primary btnStyle marRL" @click="openTransferWin">转账</button>
      <button class="btn btn-primary btnStyle marRL" @click="dialogs.one=true">收款</button>
    </div>
    <!--转账-->
    <el-dialog :title="wallet.name" width="560px" :visible.sync="dialogs.two" :close-on-click-modal="false">
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
            <div class="modalInput tool-right-input">
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
            <div class="modalInput tool-right-input">
              <input @input="editAmountHandler" v-model="transferInfo.amount" class="modalInpStyle" type="text" placeholder="输入转出金额">
              <span @click="setAllHandler" class="color64AFEA" style="margin-right: 5px">全部转出</span>
            </div>
            <div class="modalTF marT">
              <p>可用余额 <span>{{currentAsset.balance}}</span></p>
              <p v-if="isBasicCoin">网络手续费 <span class="colorFF9191">{{serviceCharge}}</span></p>
            </div>
          </li>
          <li>
            <p>添加备注</p>
            <input v-model="transferInfo.memo" class="modalInput" type="text">
          </li>
        </ul>
      </div>
      <div class="modalFooter">
      <button @click="transferHandler" :disabled="isPaying" v-loading="isPaying" type="button" class="btn btn-primary">转账</button>
      </div>
    </el-dialog>
    <!--收款-->
    <el-dialog title="收款码" width="450px"  style="word-break: break-word"  :visible.sync="dialogs.one">
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
    <!--设置燃料价格-->
    <el-dialog title="设置燃料价格" width="440px" :visible.sync="dialogs.three">
      <gas-price-set @close="dialogs.three=false" :wallet="wallet" :asset="currentAsset"></gas-price-set>
    </el-dialog>
    <!--设置代币燃料-->
    <el-dialog title="代币燃烧" width="440px" :visible.sync="dialogs.four">
      <burn-set @close="dialogs.four=false" :contract="contract" :wallet="wallet" :asset="currentAsset"></burn-set>
    </el-dialog>
    <!--代币增发-->
    <el-dialog title="代币增发" width="440px" :visible.sync="dialogs.five">
      <supply-set @close="dialogs.five=false" :contract="contract" :wallet="wallet" :asset="currentAsset"></supply-set>
    </el-dialog>
    <!--转移代币拥有者-->
    <el-dialog title="转移代币拥有者" width="550px"  :visible.sync="dialogs.six">
      <set-owner @close="dialogs.six=false" :wallet="wallet" :asset="currentAsset" :users="users"></set-owner>
    </el-dialog>
  </div>
</template>

<script>
  import {transaction, TransferItem} from '../utils/models';
  import GasPriceSet from './common/GasPriceSet';
  import SupplySet from './common/SupplySet';
  import BurnSet from './common/BurnSet';
  import SetOwner from './common/SetOwner';
    export default {
      components:{
        GasPriceSet,
        SupplySet,
        BurnSet,
        SetOwner
      },
      name: "WalletDetails",
      data: () => ({
        isRefresh:false,
        isLoading: false,
        isPaying: false,
        wallet: {},
        currentAsset: {},
        users: [],
        serviceCharge: 0.00125,//需配置
        transferInfo: {},
        transactions: [],
        dialogs: {one: false, two: false, three: false,four:false,five:false,six:false},
        labelWidth: '140px',
        isBasicCoin:false,
        contract:{}
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
        }),
        showProxy(){
          if (this.contract&&this.contract.owner && this.currentAsset)
            return this.contract.owner.toLocaleLowerCase() === this.wallet.address.toLocaleLowerCase();
          else return false;
        }
      },
      created: function () {
        this.init();
        this.$bindRefresh('init');
        this.$bindUpload('update');
      },
      methods: {
        update(url){
          if(url.includes('transactions/')&&url.includes(this.wallet.address)){
            console.log("trigg er:",url);
            this.$storage.getAllTransactions(this.wallet.type, this.wallet.address, this.currentAsset.contractAddr, 1, 20,true,false)
              .then(result => {
                console.log('trigger result:',result);
                this.transactions = result.records;
                this.isLoading = false;
              }).catch(err => {
              this.$alert('出现错误：' + err, '错误');
              this.isLoading = false;
            });
          }
        },
        init() {
          this.wallet = this.$route.params.wallet;
          this.currentAsset = this.$route.params.currentAsset;
          this.isBasicCoin =this.currentAsset.name.toLowerCase()==="bcb"||this.currentAsset.name.toLowerCase()==="bcbt";
          //获取交易记录
          this.isLoading = true;
          this.$storage.getAllTransactions(this.wallet.type, this.wallet.address, this.currentAsset.contractAddr, 1, 20,true,true)
            .then(result => {
              this.transactions = result.records;
              this.isLoading = false;
            }).catch(err => {
            this.$alert('出现错误：' + err, '错误');
            this.isLoading = false;
          });
          this.users = this.$storage.getUsers();
          // 获取合约信息
          this.$rpc__.getContract(this.wallet.type,this.currentAsset.contractAddr)
            .then(result=>{
              this.contract =result;
            }).catch(err=>{
              console.log('获取合约信息出错：',err);
          })
        },
        //转账
        transferHandler: function () {
          try {
            this.transferInfo.check();
            //验证密码
            this.isPaying = true;
            this.$checkPassword(this.wallet.id)
              .then(result => {
                this.$lpc__.transferCoin(this.wallet.type,//注意修改 todo
                  result,
                  this.wallet.privateKey,
                  this.transferInfo.toAdress,
                  this.transferInfo.amount,
                  this.currentAsset.contractAddr)
                  .then(ret => {
                    this.transferInfo.sessionId = ret.txHash;
                    console.log(this.transferInfo, '........................');
                    this.transferInfo.conAddr = this.currentAsset.contractAddr;
                    this.transferInfo.type = this.wallet.type;//主类型
                    this.transferInfo.from = this.wallet.address;//我的钱包地址
                    this.$storage.addLocalTransfer(this.transferInfo);
                    this.transactions.unshift(new transaction().fromLocalByObj(this.wallet.address, this.transferInfo));
                    setTimeout(this.refreshHandler,500,this.transactions[0])
                    this.dialogs.two = false;
                    this.isPaying = false;
                  }).catch(err=>this.isPaying=false);
              }).catch(err=>this.isPaying=false)
          } catch (e) {
            console.log(e);
            this.$message({message: e, type: 'error'});
            this.isPaying = false;
          }
        },
        //选择地址
        addAddressHandler: function (command) {
          this.transferInfo.toAdress = command.address;
        },
        //设置所有金额
        setAllHandler: function () {
          let parts =this.currentAsset.balance.toString().split('.');
          let pos =Math.max(parts.length==2?parts[1].length:0,this.isBasicCoin?5:0);
          this.transferInfo.amount = (this.currentAsset.balance - (this.isBasicCoin?this.serviceCharge:0)).toFixed(pos);
        },
        //设置转账金额
        editAmountHandler: function (e) {
          if (!/^[\d\.]+$/.test(this.transferInfo.amount)) this.transferInfo.amount = '';
          let val = parseFloat(this.transferInfo.amount);
          if (val > this.currentAsset.balance) this.transferInfo.amount = this.currentAsset.balance;
        },
        //拷贝成功回调
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
          this.isRefresh = true;
          this.$storage.getTransactionByTxhash(this.wallet.type, [transItem.txHash])
            .then(results => {
              if (results.length > 0) {
                transItem.complexByHashData(results[0]);
                // this.$storage.removeLocalTransfers(transItem);
                //if(!transItem.isSuccess) setTimeout(this.refreshHandler,1000,transItem);
              }
              this.isRefresh = false;
            })
            .catch(err => {
              console.log('出现错误：',err);
              setTimeout(this.refreshHandler,5000,transItem);
              //this.$alert('出现错误：' + err, '错误');
              this.isRefresh = false;
            })
        },
        //自动刷新
        autoRefresh:function (tranItem) {

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
    width: 100%;
  }
  .tool-right-input{
    display: flex;
    justify-content: space-between;
    padding-right: 8px;
  }
  .add-currency-button{
    margin-right: 13px;
    width: 120px;
    background-color: #82ADE6;
    color: white
  }
  .text-danger >>> .el-form-item__content{
    width: calc(100% - 100px);
  }
  .over-hidden{
    display: inline-block;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
