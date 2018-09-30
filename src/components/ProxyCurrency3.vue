<template>
  <div class="walletRightCenter padT">
    <h4 class="currency-title">代币发行</h4>
    <ul class="list-unstyled padding-tl">
      <li>
        <input v-model="currencyItem.name" class="foundLiInput" type="text" placeholder="代币名称">
      </li>
      <li>
        <input v-model="currencyItem.symbol" class="foundLiInput" type="text" placeholder="代币符号">
      </li>
      <li>
        <input v-model="currencyItem.initSupply" class="foundLiInput" type="number" placeholder="代币初始供应量:GIC">
        <span class="description">GIC=(10^9Cong)</span>
      </li>
      <li class="color80D3FE">
        <span>代币是否支持增发？</span>
        <label  class="select label-style">
          是
          <input v-model="currencyItem.addSupplyEnabled" :value="true" type="radio" name="radioName" class="chk_1">
          <span class="sel"></span>
        </label>
        <label class="select label-style">
          否
          <input v-model="currencyItem.addSupplyEnabled" :value="false" type="radio" name="radioName" class="chk_1">
          <span class="sel"></span>
        </label>
      </li>
      <li class="color80D3FE">
        <span>代币是否支持燃烧？</span>
        <label class="select label-style">
          是
          <input v-model="currencyItem.burnEnabled" :value="true" type="radio" name="radioName1" class="chk_1">
          <span class="sel"></span>
        </label>
        <label class="select label-style">
          否
          <input v-model="currencyItem.burnEnabled" :value="false" type="radio" name="radioName1" class="chk_1">
          <span class="sel"></span>
        </label>
      </li>
      <li class="marT2">
        <input v-model="currencyItem.gasPrice" class="foundLiInput" type="number" placeholder="燃料价格(单位：Cong)">
        <span class="description">>=2500</span>
      </li>
    </ul>
    <label class="select padding-l">
      <input v-model="isRead" type="checkbox" class="chk_1">
      <span class="sel"></span>
      我已仔细阅读并同意
      <span @click="showAgreement=true" class="color80D3FE">服务及隐私条款</span>
    </label>
    <div class="btnGroup padding-l">
      <button @click="createCoin" class="btn btn-success btnStyle">确认发币</button>
    </div>
    <el-dialog :visible.sync="showAgreement">
      <agreement></agreement>
    </el-dialog>
  </div>
</template>

<script>
  import validator from './../utils/validator';
    export default {
      name: "ProxyCurrency",
      data: () => ({
        currencyItem: {
          coinType: '',
          encPrivateKey: '',
          password: '',
          name: '',
          symbol: '',
          initSupply: '',
          addSupplyEnabled: false,
          burnEnabled: false,
          gasPrice: '',
          gasLimit: '',
          note: '',
          check: function () {
            return this.name && this.symbol && this.initSupply && this.gasPrice;
          }
        },
        isRead: false,
        wallet: null,
        showAgreement:false,
        // isSaveing:false
      }),
      created() {
        this.wallet = this.$storage.getWalletById(this.$route.params.id);
        this.currencyItem.encPrivateKey = this.wallet.privateKey;
        // this.currencyItem.coinType = '0x10000';
        this.currencyItem.coinType = this.wallet.type;
      },
      methods: {
        createCoin() {
          // let pattern = /^[a-zA-Z]{1,40}$/;
          let pattern = /^[a-zA-Z]{1}[a-z,A-Z,0-9]{1,39}$/;
          if (!this.currencyItem.check()) {
            return this.$message({message: '请填写必要的数据！', type: 'error'});
          }
          if (Math.pow(10, 9) * this.currencyItem.initSupply < 1) {
            return this.$message({message: '代币发行值不能小于1！', type: 'error'});
          }
          if (!/^\d+$/.test(this.currencyItem.gasPrice.toString()) || this.currencyItem.gasPrice < 2500) {
            return this.$message({message: '燃料价格需大于等于2500Cong,且为整数！', type: 'error'});
          }
          if (this.currencyItem.initSupply > 999999999999 || this.currencyItem.gasPrice > 999999999999) {
            return this.$message({message: '代币发行值/燃料值不能大于999999999999！', type: 'error'});
          }
          if (!(pattern.test(this.currencyItem.name) && pattern.test(this.currencyItem.symbol))) {
            return this.$message({message: '名称/符号：必须以字母开头;长度不超过40的字母或数字！', type: 'error'});
          }
          if (!this.isRead) return this.$message({message: '请认真阅读并同意协议!', type: 'error'});
          this.$checkPassword(this.wallet.id, false).then(password => {
            this.currencyItem.password = password;
            this.$lpc__.createCoin3(this.currencyItem)
              .then(ret => {
                if (ret) this.$router.push({
                  name: 'wallet',
                  params: {id: this.wallet.id}
                });
              })
          })
            .catch(err => {
              console.log(err);
            })
        }
      }
    }
</script>

<style scoped>
  @import "./../assets/css/currency.css";
  .description{
    color: red;
    font-size: 16px;
  }
</style>
