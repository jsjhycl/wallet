<template>
    <div class="walletRightCenter">
      <ul class="list-unstyled">
        <li>
          <select class="foundLiInput" v-model="wallet.type">
            <option v-for="item in walletTypes" v-bind:value="item.value">{{item.name}}</option>
          </select>
        </li>
        <li>
          <input v-model="wallet.name" class="foundLiInput" type="text" placeholder="钱包名称">
        </li>
        <li>
          <!--<input v-model="wallet.password"  class="foundLiInput" type="password" placeholder="密码">-->
          <input v-model="wallet.password"  class="foundLiInput" type="password" placeholder="密码">
        </li>
        <li>
          <input v-model="repeatPassword" class="foundLiInput" type="password" placeholder="重复密码">
        </li>
        <li>
          <input v-model="wallet.passwordInfo" class="foundLiInput" type="text" placeholder="密码提示信息（可不填）">
        </li>
      </ul>
      <label class="select">
        <input v-model="isRead" type="checkbox" class="chk_1">
        <span class="sel"></span>
        我已仔细阅读并同意
        <span @click="dialogs.arguments=true" class="color80D3FE">服务及隐私条款</span>
      </label>
      <div class="btnGroup">
        <button @click="createWallet" :disabled="isSaveing" v-loading="isSaveing" class="btn btn-success btnStyle" to="/helpwords">创建钱包</button>
        <!--<a class="btn btn-success btnStyle disabled marRL" href="#">导入钱包</a>-->
      </div>
      <el-dialog :visible.sync="dialogs.arguments">
        <agreement></agreement>
      </el-dialog>
    </div>
</template>

<script>
  import uuid from 'uuid/v1'
    export default {
      name: "FoundWallet",
      data: () => ({
        isSaveing:false,
        walletTypes: [],
        wallet: {},
        isRead: false,
        repeatPassword: '',
        dialogs:{arguments:false}
      }),
      created: function () {
        this.walletTypes = this.$storage.getWalletTypes();
        this.wallet = {id:uuid(),type: '0x1001', name: '', password: '', passwordInfo: '',head:'headImg.png',privateKey:'',encMnemonicWords:'',address:'',isBackup:false};
      },
      computed:{
      },
      methods: {
        createWallet: function () {
          //校验
          if (!this.wallet.type || !this.wallet.name || !this.wallet.password) {
            this.$message({message: "请填写必要的数据！", type: 'error'});
            return;
          }
          if(this.wallet.name.length<1 || this.wallet.name.length>20){
            this.$message({message: "钱包名称需1-20字符！", type: 'error'});
            return;
          }
          if (this.wallet.password != this.repeatPassword) {
            this.$message({message: "输入的密码不一致！", type: 'error'});
            return;
          }
          let ret=this.$validator__.checkPassword(this.wallet.password);
          if(ret!==true){
            return this.$message({message: ret, type: 'error'});
          }
          if (!this.isRead) {
            this.$message({message: "请仔细阅读并同意服务条款！", type: 'error'});
            return;
          }
          this.isSaveing=true;
          //创建钱包异步调用
          this.$lpc__.createWallet(this.wallet.type,this.wallet.password)
            .then(result=> {
              this.wallet.privateKey = result.encPrivateKey;
              this.wallet.address = result.walletAddr;
              this.wallet.encMnemonicWords = result.encMnemonicWords;
              //保存钱包
              this.$storage.insertWallet(this.wallet);
              // 注册钱包
              this.$rpc__.registerAddress(this.wallet.type, this.wallet.address, 'new')
                .then(result => {
                  this.$emit('added', this.wallet.id);
                  this.$router.push({name: 'helpwords', params: {id: this.wallet.id}});
                  this.isSaveing=false;
                })
                .catch(err => {
                  console.log(err);
                  this.$alert('创建钱包出现错误：' + err.toString());
                  this.isSaveing=false;
                })
            })
        }
      }
    }
</script>

<style scoped>
  @import "./../assets/css/foundWallet.css";
</style>
