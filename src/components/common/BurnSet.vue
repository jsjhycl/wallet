<template>
  <div>
    <!--<p>-->
      <!--<span>代币初始供应量：</span><span></span>-->
    <!--</p>-->
    <p>
      <span>当前代币数量：</span><span>{{+contract.totalSupply|coin-trans('G')}} (GCong)</span>
    </p>
    <el-form>
      <el-form-item label="燃料代币数量(单位：GCong)">
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
    props: ['wallet', 'asset', 'contract'],
    methods: {
      async submit() {
        try {
          let password = await this.$checkPassword(this.wallet.id, false);
          let ret = await this.$lpc__.bcb_burn(this.wallet.type,
            this.wallet.privateKey,
            password,
            this.asset.contractAddr,
            undefined,
            this.value);
          this.$message({message: '设置成功！', type: 'success'});
          this.$emit('close');
        } catch (e) {
          this.$message({message: e.toString(), type: 'error'});
        }
        // this.$checkPassword(this.wallet.id, false)
        //   .then(password => {
        //     this.$lpc__.bcb_burn(this.wallet.type,
        //       this.wallet.privateKey,
        //       password,
        //       this.asset.contractAddr,
        //       undefined,
        //       this.value)
        //       .then(ret => {
        //         //返回txhash不需要处理
        //         this.$message({message:'设置成功！',type:'success'});
        //         this.$emit('close');
        //       })
        //   })
      }
    }
  }
</script>

<style scoped>

</style>
