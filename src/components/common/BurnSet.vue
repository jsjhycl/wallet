<template>
  <div>
    <p>
      <span>代币初始供应量：</span><span></span>
    </p>
    <p>
      <span>当前代币数量：</span><span></span>
    </p>
    <el-form>
      <el-form-item label="增发代币数量">
        <el-input v-model="value" type="number"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" style="text-align: center">
      <button @click="submit" class="btn btn-primary">提交</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BurnSet",
    data: () => ({
      value: 0
    }),
    props:['wallet','asset'],
    methods:{
      submit(){
        this.$checkPassword(this.wallet.id, false)
          .then(password => {
            this.$lpc__.bcb_burn(this.wallet.type,
              this.wallet.privateKey,
              password,
              this.asset.contractAddr,
              undefined,
              this.value)
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
