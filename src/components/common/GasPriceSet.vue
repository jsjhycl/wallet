<template>
  <div>
    <el-form>
      <el-form-item label="燃料价格(单位:KCong)">
        <el-input v-model="price" type="number"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" style="text-align: center">
      <button @click="submit" class="btn btn-primary">提交</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GasPriceSet",
    data: () => ({
      price: 0
    }),
    props: ["wallet", "asset"],
    methods: {
      //设置代币燃料
      submit() {
        this.$checkPassword(this.wallet.id, false)
          .then(password => {
            this.$lpc__.bcb_setGasprice(this.wallet.type,
              this.wallet.privateKey,
              password,
              this.asset.contractAddr,
              undefined,
              this.price)
              .then(ret => {
                //返回txhash不需要处理
              })
          })
      }
    }
  }
</script>

<style scoped>
</style>
