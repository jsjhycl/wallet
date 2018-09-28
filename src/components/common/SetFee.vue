<template>
  <!--<div>-->
    <!--<div>-->
      <!--<label>手续费</label>-->
      <!--<input v-model="feeobj.ratio" type="text" placeholder="请输入转装交易额占比"/>-->
      <!--<span>万分比</span>-->
    <!--</div>-->
    <!--<div>-->
      <!--<label>最大手续费</label>-->
      <!--<input v-model="feeobj.maxFee" type="text" placeholder=""/>-->
      <!--<span>BCB</span>-->
    <!--</div>-->
    <!--<div>-->
      <!--<label>最小手续费</label>-->
      <!--<input v-model="feeobj.minFee" type="text" placeholder=""/>-->
      <!--<span>BCB</span>-->
    <!--</div>-->
    <!--<div>-->
      <!--<button @click="done" type="button">确定</button>-->
    <!--</div>-->
  <!--</div>-->
  <div>
    <div class="modal-body">
      <ul class="modalList list-unstyled">
        <li>
          <p>手续费</p>
          <input v-model="feeobj.ratio" class="modalInput" type="text">
        </li>
        <li>
          <p>最大手续费</p>
          <input v-model="feeobj.maxFee" class="modalInput" type="text">
        </li>
        <li>
          <p>最小手续费</p>
          <input v-model="feeobj.minFee" class="modalInput" type="text">
        </li>
      </ul>
    </div>
    <div class="modalFooter">
      <button type="button" class="btn btn-primary" @click="done">转移</button>
    </div>
  </div>
</template>

<script>
    import error from "../../utils/error";

    export default {
      name: "SetFee",
      data:()=>({
        feeobj:{
          ratio:'',
          maxFee:'',
          minFee:'',
          gasLimit:'100000',
          note:'',
          check(){
            if(!this.ratio||!this.maxFee||!this.minFee) throw '请填写正确的值'
          },
          clear(){
            this.ratio='';
            this.maxFee='';
            this.minFee='';
          }
        }
      }),
      props:["wallet"],
      methods:{
        async done(){
          try{
            this.feeobj.check();//直接通过throw控制
            let password =await this.$checkPassword(this.wallet.id, false);
            console.log(password);
            let result =await this.$lpc__.bcb_setFee(this.feeobj,this.wallet.type,this.wallet.privateKey,password);
            console.log('set fee result:',result);
            //清空值
            this.feeobj.clear();
          }
          catch (e) {
            console.log('设置转账手续费错误：',e);
            this.$message({message:e,type:'error'});
          }
        }
      }

    }
</script>

<style scoped>

</style>
