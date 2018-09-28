<template>
  <div>
    <el-radio-group v-model="obj.payer">
      <el-radio-button label="owner">发行方</el-radio-button>
      <el-radio-button label="sender">转账发起人</el-radio-button>
    </el-radio-group>
    <div>
      <button @click="done" type="button">确定</button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "SetPayer",
      data:()=>({
        obj:{
          payer:'owner',
          gasLimit:'100000',
          note:''
        }
      }),
      props:["wallet"],
      methods:{
          async done(){
            try{
              let password =await this.$checkPassword(this.wallet.id, false);
              let result =await this.$lpc__.bcb_setGasPayer(this.obj,this.wallet.type,this.wallet.privateKey,password);
              console.log('set fee result:',result);
            }
            catch (e) {
              if(e!='cancel'){
                this.$message({message:e,type:'error'});
              }
            }
          }
      }
    }
</script>

<style scoped>

</style>
