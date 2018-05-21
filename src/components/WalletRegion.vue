<template>
  <div class="walletRightCenter">
    <ul class="list-unstyled">
      <li>
        <span class="list-text">选择语言：</span>
        <select v-model="$root.Bus.config.language" class="foundLiInput">
          <option selected>中文</option>
        </select>
      </li>
      <li>
        <span class="list-text">币小数位：</span>
        <input v-model="$root.Bus.config.coinFractionLen" class="foundLiInput" type="number" min="0" placeholder="请输入币小数位"/>
      </li>
      <li>
        <span class="list-text">法币小数位：</span>
        <input v-model="$root.Bus.config.lawCoinFractionLen" class="foundLiInput" type="number" min="0" placeholder="请输入法币小数位"/>
      </li>
      <li>
        <span class="list-text">法币类型：</span>
        <select v-model="$root.Bus.config.currency" class="foundLiInput">
          <option selected>美元</option>
          <option>人民币</option>
        </select>
      </li>
    </ul>
    <button @click="save" class="btn btn-success">保存</button>
  </div>
</template>

<script>
    export default {
      name: "WalletRegion",
      methods:{
        save:function () {
          this.$storage.saveConfig(this.$root.Bus.config);
          this.$message({"message":'配置成功！',"type":"success"});
        }
      }
    }
</script>

<style scoped>
  .list-text{
    display: inline-block;
    width: 100px;
    font-size: 16px;
  }
</style>
