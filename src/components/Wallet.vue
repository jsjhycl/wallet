<template>
  <div class="walletRightCenter padT">
    <div class="walletUsInfoWrap">
        <div>
          <img class="walletUserImg" :src="'/static/'+wallet.head">
          <template v-if="!onEdit">
            <span class="walletUserName">{{wallet.name}}</span>
            <img @click="onEdit=true" class="walletUserEdit" src="../assets/img/edit.png">
          </template>
          <input class="user-edit" v-else @keyup.enter="editHandler" @blur="editHandler"  v-focus type="text" v-model="wallet.name" />
        </div>
        <div class="userAssetsWrap">
          <div>
            <div>总资产(￥)<i class="aboutSymbol">≈</i><span class="totalAssets">500,376,200.00</span></div>
            <div class="marT">
              <span>收款码</span>
              <span>0x540f2cc6…0e16bbb41d</span>
              <img @click="showGatherInfo" class="userEwm" src="../assets/img/ewm.png">
            </div>
          </div>
          <div class="operationBtnGroup">
            <button class="btn operationBtn" @click="dialogs.one=true">修改密码</button>
            <button @click="outputPassword" class="btn operationBtn">导出私钥</button>
            <button @click="outputKeyStore" class="btn operationBtn">导出keystore</button>
            <button @click="deleteWallet" class="btn operationBtn delWallet">删除钱包</button>
          </div>
        </div>
      </div>
    <!--资产区域-->
      <div class="clearfix">
        <ul class="list-unstyled pull-left">
          <li v-for="item in wallet.resources||[]" class="pull-left">
            <router-link class="assetsLi" :to="'/details/'+wallet.id">
              <div>
                <img class="assetsLiImg" :src="'/static/'+item.img">
                <span class="assetsLiTitle">{{item.name}}</span>
              </div>
              <div class="assetsInfor">
                <p style="text-align: left">{{item.contractAddr}}</p>
                <p class="colorFFF">≈<span>￥0</span></p>
                <p class="assetsMoney">0</p>
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
    <el-dialog title="修改密码" width="33%" :visible.sync="dialogs.one">
      <div class="modal-body">
        <ul class="modalList list-unstyled">
          <li>
            <p>当前密码</p>
            <input v-model="mods.oldPassword" class="modalInput" type="text">
          </li>
          <li>
            <p>新密码</p>
            <input v-model="mods.newPassword" class="modalInput" type="text">
          </li>
          <li class="resetPsw">
            <p>重置密码</p>
            <input v-model="mods.resetPassword" class="modalInput" type="text">
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
               :visible.sync="dialogs.two">
      <p class="privateKeyTips">安全警告：私钥未经加密，导出存在风险，建议使用助记词和Keystore进行备份</p>
      <p class="privateKeyText">
        {{walletPrivateKey}}
      </p>
      <div class="modalFooter" slot="footer">
        <button v-clipboard:copy="walletPrivateKey" v-clipboard:success="copyToClipboard" type="button" class="btn btn-primary">复制</button>
      </div>
    </el-dialog>
    <!--导出keystore-->
    <el-dialog title="导出keystore" width="40%" :visible.sync="dialogs.three">
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
              <p class="tabText">请复制黏贴Keystore文件到安全、离线的地方保存。切勿保存至邮箱、记事本、网盘、聊天工具等，非常危险</p>
              <h5 class="color555">请勿使用网络传输</h5>
              <p class="tabText">请复制黏贴Keystore文件到安全、离线的地方保存。切勿保存至邮箱、记事本、网盘、聊天工具等，非常危险请复制黏贴Keystore文件到安全、离线的地方保存。切勿保存至邮箱、记事本、网盘、聊天工具等，非常危险</p>
              <h5 class="color555">请勿使用网络传输</h5>
              <p class="tabText">请复制黏贴Keystore文件到安全、离线的地方保存。切勿保存至邮箱、记事本、网盘、聊天工具等，非常危险请复制黏贴Keystore文件到安全、离线的地方保存。切勿保存至邮箱store文件到安全、离线的地方保存。切勿保存至邮、记事本、网盘、聊天工具等，非常危险</p>
            </div>
            <p class="outkeyTabText">
              {{keyStore}}
            </p>
            <div class="modalFooter">
              <button  v-clipboard:copy="keyStore" v-clipboard:success="copyToClipboard" type="button" class="btn btn-primary">复制</button>
            </div>
          </div>
          <div class="tab-pane fade" id="ewmTab">
            <p class="color555">仅供直接扫描<br>
              二维码禁止保存、截图、以及拍照。仅供用户在安全环境下直接扫描来方便的导入钱包</p>
            <p class="marT2 color555">在安全环境下使用<br>
              请在确保四周无人及无摄像头的情况下使用。二维码一旦被他人获取将造成不可挽回的资产损失</p>
            <div class="outKeyEwm">
              <qriously class="outKeyEwmImg"  :value="keyStore" :size="187" />
              <!--<img class="outKeyEwmImg" :src="'/static/'+qrCode">-->
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!--收款-->
    <el-dialog title="收款码" width="33%" :visible.sync="dialogs.four">
      <div class="modal-body marT2 text-center">
        <p>{{gather.code}}</p>
        <div class="padT">
          <qriously :value="gather.code" :size="187" />
        </div>
      </div>
      <div class="modalFooter">
        <button  v-clipboard:copy="gather.code" v-clipboard:success="copyToClipboard" type="button" class="btn btn-primary">复制收款地址</button>
      </div>
    </el-dialog>
    </div>
</template>

<script>
    export default {
      name: "Wallet",
      data: () => ({
        wallet: {},
        mods: {
          oldPassword: '',
          newPassword: '',
          resetPassword: ''
        },
        walletPrivateKey: '23132fgdfgd',
        keyStore: '',
        qrCode: '',
        gather: {
          code: '123123213313',
          qrcode: ''
        },
        onEdit: false,
        dialogs: {one: false, two: false, three: false, four: false}
      }),
      beforeRouteUpdate(to, from, next) {
        console.log('beforeRouteUpdate:', to, from);
        this.wallet = this.$storage.getWalletById(to.params.id);
        //  调用后台接口获取数据，进行显示
        next();
      },
      created: function () {
        this.wallet = this.$storage.getWalletById(this.$route.params.id);
        //  调用后台接口获取数据，进行显示
      },
      directives: {
        focus: {
          inserted: function (el) {
            el.focus();
          }
        }
      },
      methods: {
        /*修改密码*/
        modifyPassword: function () {
          //todo
          //重置输入域
          this.mods.resetPassword = '';
          this.mods.newPassword = '';
          this.mods.oldPassword = '';
          this.dialogs.one = false;
        },
        /*导出密钥*/
        outputPassword: function () {
          this.$checkPassword().then(result => {
            this.dialogs.two = true;
            this.walletPrivateKey = new Date().toString();
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
          this.$checkPassword().then((reuslt => {
            // $('#outkey').modal('show');
            this.dialogs.three = true;
            this.keyStore = '0x:\'\'-dddsfsf';
            this.qrCode = 'outKeyEwm.png'
          }))
            .catch((err) => {
              console.log(err)
            });
        },
        /*删除钱包*/
        deleteWallet: function () {
          this.$checkPassword().then((result => {
            this.$storage.removeWalletById(this.wallet.id);
            this.$emit('remove');
          }))
            .catch((err) => {
              console.log(err)
            });
        },
        /*显示收款信息*/
        showGatherInfo: function () {
          this.gather.qrcode = 'transactionEwm.jpg',
            this.gather.code = '0x141212123231323',
            this.dialogs.four = true;
        },
        /*修改*/
        editHandler: function () {
          //执行保存
          this.$storage.updateWallet(this.$route.params.id, {name: this.wallet.name});
          this.$emit('modify', this.$route.params.id, {name: this.wallet.name});
          this.onEdit = false;
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
</style>
