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
        <input v-model="currencyItem.initSupply" class="foundLiInput" type="text" placeholder="代币初始供应量">
      </li>
      <li class="color80D3FE">
        <span>代币是否支持增发？</span>
        <label  class="select label-style">
          是
          <input v-model="currencyItem.addSupplyEnabled" value="true" type="radio" name="radioName" class="chk_1">
          <span class="sel"></span>
        </label>
        <label class="select label-style">
          否
          <input v-model="currencyItem.addSupplyEnabled" value="false" type="radio" name="radioName" class="chk_1">
          <span class="sel"></span>
        </label>
      </li>
      <li class="color80D3FE">
        <span>代币是否支持燃烧？</span>
        <label class="select label-style">
          是
          <input v-model="currencyItem.burnEnabled" value="true" type="radio" name="radioName1" class="chk_1">
          <span class="sel"></span>
        </label>
        <label class="select label-style">
          否
          <input v-model="currencyItem.burnEnabled" value="false" type="radio" name="radioName1" class="chk_1">
          <span class="sel"></span>
        </label>
      </li>
      <li class="marT2">
        <input v-model="currencyItem.gasPrice" class="foundLiInput" type="text" placeholder="燃料价格(单位：x)">
      </li>
    </ul>
    <label class="select padding-l">
      <input v-model="isRead" type="checkbox" class="chk_1">
      <span class="sel"></span>
      我已仔细阅读并同意
      <span class="color80D3FE">服务及隐私条款</span>
    </label>
    <div class="btnGroup padding-l">
      <button @click="createCoin" class="btn btn-success btnStyle">确认发币</button>
    </div>
  </div>
</template>

<script>
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
        wallet: null
      }),
      created() {
        this.wallet = this.$storage.getWalletById(this.$route.params.id);
        this.currencyItem.encPrivateKey = this.wallet.privateKey;
        this.currencyItem.coinType = '0x10000';
      },
      methods: {
        createCoin() {
          if (!this.currencyItem.check()) {
            return this.$message({message: '请填写必要的数据！', type: 'error'});
          }
          if (!this.isRead) return this.$message({message: '请认真阅读并同意协议!', type: 'error'});
          this.$checkPassword(this.wallet.id,false).then(password => {
            this.currencyItem.password = password;
            if (this.$lpc__.createCoin(this.currencyItem)) this.$router.push({
              name: 'wallet',
              params: {id: this.wallet.id}
            });
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
</style>
