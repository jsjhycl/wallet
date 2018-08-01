<template>
  <div>
    <div class="modal-body marT2 text-center">
      <h4 class="modal-body-title">
        请将以太坊BCB资产转入下方地址
      </h4>
      <!--<p class="marT2">0x3230589…546sd41sfdf154sf547sf12df6stg41sdD</p>-->
      <p class="marT2">{{bcbETHAddr}}</p>
      <div class="padT">
        <!--<img class="modalEwm" src="../../assets/img/transactionEwm.jpg">-->
        <qriously :value="bcbETHAddr" :size="187" />
      </div>
    </div>
    <div class="modalFooter">
      <button v-clipboard:copy="bcbETHAddr" v-clipboard:success="copyToClipboard" type="button" class="btn btn-primary">复制收款地址</button>
      <a @click="$emit('showHuanbiEvent',2)" class="see-list">查看换币记录</a>
    </div>
  </div>
</template>

<script>
    export default {
      name: "huanbiDone",
      props:['bcbETHAddr'],
      // data:()=>({
      //   bcbETHAddr:''
      // }),
      // async created(){
      //   try{
      //     let result = await this.$rpc__.gen_bcbethaddr(this.wallet.address);
      //     this.bcbETHAddr=result.bcbETHAddr;
      //   }
      //   catch (e) {
      //     this.$message({"message":e.toString(),type:"error"});
      //   }
      // },
      methods:{
        copyToClipboard(){
          this.$message({message: '已拷贝到剪切板.', type: 'success'});
        }
      }
    }
</script>

<style scoped>

</style>
