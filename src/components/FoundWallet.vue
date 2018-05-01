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
          <input v-model="wallet.password" class="foundLiInput" type="password" placeholder="密码">
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
        <span class="color80D3FE">服务及隐私条款</span>
      </label>
      <div class="btnGroup">
        <button @click="createWallet" class="btn btn-success btnStyle" to="/helpwords">创建钱包</button>
        <!--<a class="btn btn-success btnStyle disabled marRL" href="#">导入钱包</a>-->
      </div>
    </div>
</template>

<script>
  import uuid from 'uuid/v1'
    export default {
      name: "FoundWallet",
      data: () => ({
        walletTypes: [],
        wallet: {},
        isRead: false,
        repeatPassword: ''
      }),
      created: function () {
        this.walletTypes = this.$storage.getWalletTypes();
        this.wallet = {id:uuid(),type: '0x3', name: '', password: '', passwordInfo: '',head:'headImg.png',privateKey:'',address:'',isBackup:false};
      },
      methods: {
        createWallet: function () {
          //校验
          if (!this.wallet.type || !this.wallet.name || !this.wallet.password) {
            this.$message({message: "请填写必要的数据！", type: 'error'});
            return;
          }
          if (this.wallet.password != this.repeatPassword) {
            this.$message({message: "输入的密码不一致！", type: 'error'});
            return;
          }
          if (!this.isRead) {
            this.$message({message: "请仔细阅读并同意服务条款！", type: 'error'});
            return;
          }
          // 调用本地库获取相关数据
          let result = this.$lpc__.createWallet(this.wallet.type,this.wallet.password);
          this.wallet.privateKey=result.encPrivateKey;
          this.wallet.address=result.walletAddr;
          this.wallet.encMnemonicWords=result.encMnemonicWords;
          this.$storage.insertWallet(this.wallet);
          this.$emit('added', this.wallet.id);
          //  跳转到助记词页
          this.$router.push({name:'helpwords',params:{id:this.wallet.id}});
        }
      }
    }
</script>

<style scoped>
  @import "./../assets/css/foundWallet.css";
</style>
