<template>
  <div class="walletRightCenter padT">
    <div class="walletUsInfoWrap">
        <div>
          <img class="walletUserImg" :src="'./static/'+wallet.head">
          <template v-if="!onEdit">
            <span class="walletUserName">{{wallet.name}}</span>
            <img @click="onEdit=true" class="walletUserEdit" src="../assets/img/edit.png">
          </template>
          <input class="user-edit" v-else @keyup.enter="editHandler" @blur="editHandler"  v-focus type="text" v-model="wallet.name" />
          <router-link :to="`/addcurrency/${wallet.id}`" type="button" class="btn  btn-sm operationBtn pull-right add-currency-button">代币发行</router-link>
        </div>
        <div class="userAssetsWrap">
          <div v-loading="isLoading">
            <div>总资产({{$root.Bus.config.currency|coin-symbol}})<i class="aboutSymbol">≈</i><span class="totalAssets">{{totalMoney|tofix($root.Bus.config.lawCoinFractionLen)}}</span></div>
            <div class="marT">
              <span>收款码</span>
              <span>{{wallet.address}}</span>
              <img @click="showGatherInfo" class="userEwm" src="../assets/img/ewm.png">
            </div>
          </div>
          <div class="operationBtnGroup">
            <button class="btn operationBtn" @click="dialogs.one=true">修改密码</button>
            <button @click="outputPassword" class="btn operationBtn">导出私钥</button>
            <button @click="outputKeyStore" class="btn operationBtn">导出keystore</button>
            <button v-if="!!wallet.encMnemonicWords" class="btn operationBtn" @click="backupWords" >备份助记词</button>
            <button @click="deleteWallet" class="btn operationBtn delWallet">删除钱包</button>
          </div>
        </div>
      </div>
    <!--资产区域-->
      <div class="clearfix">
        <ul class="resource-list list-unstyled pull-left">
          <li v-for="item in wallet.resources||[]" class="pull-left" v-loading="isLoading">
            <!--<router-link class="assetsLi" :to="'/details/'+wallet.id+'/'+item.name">-->
            <router-link class="assetsLi" :to="{name:'details',params:{wallet:wallet,currentAsset:item}}">
              <div>
                <img class="assetsLiImg" :src="item.img">
                <span class="assetsLiTitle">{{item.name}}</span>
              </div>
              <div class="assetsInfor">
                <p style="text-align: left;overflow: hidden;text-overflow: ellipsis;white-space: nowrap">{{item.contractAddr}}</p>
                <p class="colorFFF">≈<span>{{$root.Bus.config.currency|coin-symbol}}{{item.money|tofix($root.Bus.config.lawCoinFractionLen)}}</span></p>
                <p class="assetsMoney">{{item.balance|tofix($root.Bus.config.coinFractionLen)}}</p>
              </div>
            </router-link>
          </li>
        </ul>
        <router-link class="addAssetsWrap pull-left" :to="{name:'assets',params:{id:wallet.id}}">
          <img class="addImg" src="../assets/img/add.png">
          <p>添加新资产</p>
        </router-link>
      </div>
    <!--修改密码-->
    <el-dialog title="修改密码" width="33%" :visible.sync="dialogs.one" :close-on-click-modal="false">
      <div class="modal-body">
        <ul class="modalList list-unstyled">
          <li>
            <p>当前密码</p>
            <input v-model="mods.oldPassword" class="modalInput" type="password">
          </li>
          <li>
            <p>新密码</p>
            <input v-model="mods.newPassword" class="modalInput" type="password">
          </li>
          <li class="resetPsw">
            <p>重置密码</p>
            <input v-model="mods.resetPassword" class="modalInput" type="password">
          </li>
        </ul>
        <p class="modalTips">忘记密码？导入助记词或私钥可重置密码。
          <router-link to="/import"><span class="color64AFEA">马上导入</span></router-link>
        </p>
      </div>
      <div class="modalFooter" slot="footer">
        <button @click="modifyPassword" type="button" class="btn btn-primary">保存</button>
      </div>
    </el-dialog>
    <!--导出私钥-->
    <el-dialog title="导出私钥"   width="33%"
               :visible.sync="dialogs.two" :close-on-click-modal="false">
      <p class="privateKeyTips">安全警告：私钥未经加密，导出存在风险，建议使用助记词和Keystore进行备份</p>
      <p class="privateKeyText">
        {{outPrivateKey}}
      </p>
      <div class="modalFooter" slot="footer">
        <button v-clipboard:copy="outPrivateKey" v-clipboard:success="copyToClipboard" type="button" class="btn btn-primary">复制</button>
      </div>
    </el-dialog>
    <!--导出keystore-->
    <el-dialog title="导出keystore" width="40%" :visible.sync="dialogs.three" :close-on-click-modal="false">
      <div class="modal-body">
        <ul id="myTab" class="nav nav-tabs modalNav">
          <li class="active">
            <a href="#outkeyTab" data-toggle="tab">导出Keystore</a>
          </li>
          <li><a href="#ewmTab" data-toggle="tab">二维码</a></li>
        </ul>
        <div id="myTabContent" class="tab-content tabCon">
          <div class="tab-pane fade in active" id="outkeyTab">
            <div>
              <h5 class="color555">离线保存</h5>
              <p class="tabText">请复制粘贴Keystore文件到安全、离线的地方保存。切勿保存至邮箱、记事本、网盘、聊天工具等，非常危险</p>
              <h5 class="color555">请勿使用网络传输</h5>
              <p class="tabText">请勿通过网络工具传输Keystore,一旦被黑客获取将造成不可挽回的资产损失。建议离线设备通过二维码方式传输。</p>
              <h5 class="color555">密码保险箱保存</h5>
              <p class="tabText">如需在线保存，则建议使用安全等级更高的1Password等密码保管软件保存Keystore</p>
            </div>
            <p class="outkeyTabText">
              {{outkeyStore}}
            </p>
            <div class="modalFooter">
              <button  v-clipboard:copy="outkeyStore" v-clipboard:success="copyToClipboard" type="button" class="btn btn-primary">复制</button>
            </div>
          </div>
          <div class="tab-pane fade" id="ewmTab">
            <p class="color555">仅供直接扫描<br>
              二维码禁止保存、截图、以及拍照。仅供用户在安全环境下直接扫描来方便的导入钱包</p>
            <p class="marT2 color555">在安全环境下使用<br>
              请在确保四周无人及无摄像头的情况下使用。二维码一旦被他人获取将造成不可挽回的资产损失</p>
            <div class="outKeyEwm">
              <qriously class="outKeyEwmImg"  :value="outkeyStore" :size="187" />
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!--收款-->
    <el-dialog title="收款码"  width="40%"  style="word-break: break-word" :visible.sync="dialogs.four" :close-on-click-modal="false">
      <div class="modal-body marT2 text-center">
        <p>{{wallet.address}}</p>
        <div class="padT">
          <qriously :value="wallet.address" :size="187" />
        </div>
      </div>
      <div class="modalFooter">
        <button  v-clipboard:copy="wallet.address" v-clipboard:success="copyToClipboard" type="button" class="btn btn-primary">复制收款地址</button>
      </div>
    </el-dialog>
    </div>
</template>

<script>
    export default {
      name: "Wallet",
      data: () => ({
        isLoading: false,
        wallet: {},
        mods: {
          oldPassword: '',
          newPassword: '',
          resetPassword: '',
          reset: function () {
            this.oldPassword = '';
            this.newPassword = '';
            this.resetPassword = '';
          }
        },
        outPrivateKey: '',//导出的明文私钥
        outkeyStore: '',//导出的keystore
        onEdit: false,
        dialogs: {one: false, two: false, three: false, four: false}
      }),
      beforeRouteUpdate(to, from, next) {
        console.log('beforeRouteUpdate:', to, from);
        this.init(to.params.id);
        // this.wallet = this.$storage.getWalletById(to.params.id);
        // this.getServerDatas();
        next();
      },
      created: function () {
        this.init(this.$route.params.id);
        this.$bindRefresh('getServerDatas');
      },
      computed: {
        totalMoney: function () {
          return this.wallet.resources.reduce((total, item) => total = total + item.money, 0);
        }
      },
      directives: {
        focus: {
          inserted: function (el) {
            el.focus();
          }
        }
      },
      methods: {
        init(id){
          this.wallet = this.$storage.getWalletById(id);
          if(!this.wallet.isVisited){
            //执行初始化资产
            this.$storage.initAssetAndResources(this.wallet.id)
              .then(wallet=>{
                this.getServerDatas();
              })
          }else{
            //  调用后台接口获取数据，进行显示
            this.getServerDatas();
          }
        },
        /*备份助记词*/
        backupWords: function () {
          this.$router.push({name: "helpwords", params: {id: this.wallet.id}});
        },
        openModifyWin: function () {
          this.dialogs.one = true;
          this.mods.reset();
        },
        /*修改密码*/
        modifyPassword: function () {
          if (!this.mods.newPassword || this.mods.newPassword != this.mods.resetPassword) {
            this.$message({message: '密码未输入/两次密码输入不一致', type: 'error'});
            return;
          }
          let ret = this.$lpc__.changePwd(this.wallet.type, this.wallet.privateKey, this.mods.oldPassword, this.mods.newPassword, this.wallet.encMnemonicWords || '');
          this.$storage.updateWallet(this.wallet.id, {
            privateKey: ret.encPrivateKey,
            encMnemonicWords: ret.encMnemonicWords
          })
          this.wallet = this.$storage.getWalletById(this.wallet.id);
          //重置输入域
          this.dialogs.one = false;
        },
        /*导出密钥*/
        outputPassword: function () {
          this.$checkPassword(this.wallet.id).then(result => {
            console.log('password result =>', result)
            this.dialogs.two = true;
            this.outPrivateKey = this.$lpc__.outputPrivateKey(this.wallet.type, this.wallet.privateKey, result).privateKey;
          }).catch((err) => {
            console.log(err)
          });
        },
        /*拷贝到剪切板*/
        copyToClipboard: function (e) {
          this.$message({message: '已拷贝到剪切板.', type: 'success'});
        },
        /*导出keystore*/
        outputKeyStore: function () {
          this.$checkPassword(this.wallet.id).then((result => {
            this.dialogs.three = true;
            this.outkeyStore = this.$lpc__.outputKeyStore(this.wallet.type, this.wallet.privateKey, result).keystore;
          }))
            .catch((err) => {
              console.log(err)
            });
        },
        /*删除钱包*/
        deleteWallet: function () {
          this.$checkPassword(this.wallet.id).then((result => {
            this.$storage.removeWalletById(this.wallet.id);
            this.$emit('remove');
          }))
            .catch((err) => {
              console.log(err)
            });
        },
        /*显示收款信息*/
        showGatherInfo: function () {
          this.dialogs.four = true;
        },
        /*修改*/
        editHandler: function () {
          //执行保存
          this.$storage.updateWallet(this.$route.params.id, {name: this.wallet.name});
          this.$emit('modify', this.$route.params.id, {name: this.wallet.name});
          this.onEdit = false;
        },
        /*获取服务端资产相关数据*/
        getServerDatas: function () {
          this.isLoading = true;
          this.$storage.getServerMultiResourceInfo(this.wallet.type, this.wallet.resources, this.wallet.address,this.$root.Bus.config.currency)
            .then(results => {
              this.wallet.resources.forEach(item => {
                let fitem = results.find(m => m.contractAddr.toLocaleLowerCase() === item.contractAddr.toLocaleLowerCase());
                if (fitem) {
                  item.balance = fitem.balance;
                  item.money = fitem.money;
                }
              })
              this.isLoading = false;
            }).catch(err => {
              console.log(err,'getServerDatas:');
            this.$alert(err.toString(), '错误');
            this.isLoading = false;
          });
        }
      }
    }
</script>

<style scoped>
  @import "../assets/css/wallet.css";
  .user-edit{
    color: #0f0f0f;
    border:none;
    border-bottom: 1px solid black;
    background: transparent;
  }
  .add-currency-button{
    margin-right: 13px;
    width: 120px;
    background-color: #82ADE6;
    color: white
  }
</style>
