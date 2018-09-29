<template>
  <div class="set-payer">
    <el-radio-group v-model="obj.payer">
      <el-radio-button label="owner">发行方</el-radio-button>
      <el-radio-button label="sender">转账发起人</el-radio-button>
    </el-radio-group>
    <div>
      <button v-loading="isLoading" :disabled="isLoading" @click="done" type="button" class="btn btn-primary btn-style">确定</button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "SetPayer",
      data:()=>({
        isLoading:false,
        obj:{
          contractAddr:'',
          payer:'owner',
          gasLimit:'100000',
          note:''
        }
      }),
      props:["wallet","asset"],
      methods:{
          async done(){
            try{
              this.isLoading=true;
              let password =await this.$checkPassword(this.wallet.id, false);
              this.obj.contractAddr=this.asset.contractAddr;//具有位置依赖
              let result =await this.$lpc__.bcb_setGasPayer(this.obj,this.wallet.type,this.wallet.privateKey,password);
              console.log('set fee result:',result);
              this.isLoading=false;
              this.$emit('close');
            }
            catch (e) {
              this.isLoading=false;
              if(e!='cancel'){
                this.$message({message:e,type:'error'});
              }
            }
          }
      }
    }
</script>

<style scoped>
 .set-payer{
    text-align: center;
  }
 .set-payer >>> .el-radio-button{
    display: block;
    width: 270px;
    height: 50px;
    margin: 45px 0;
  }
 .set-payer >>> .el-radio-button__inner{
    width: 270px;
    height: 50px;
    line-height: 50px;
    padding: 0;
    border: 1px solid #dcdfe6;
    border-radius: 0;
  }
 .btn-style{
   padding: 6px 60px;
   font-size: 14px;
   border-radius: 6px;
 }
</style>
