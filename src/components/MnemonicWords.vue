<template>
  <div class="walletRightCenter">
    <div class="walletTextBtn">
      <div class="walletText">
        <h3>抄写下你的钱包助记词</h3>
        <p>助记词用于恢复钱包和充值钱包密码，将它准确的抄写到纸上，并存放在只有你知道的安全的地方。</p>
        <div class="wordsWrap">
          <p>
            <span style="margin: 10px" v-for="kw in keywords">{{kw+' '}}</span>
          </p>
        </div>
      </div>
      <button @click="goVerfiy" class="btn btn-success btnStyle">下一步</button>
    </div>
  </div>
</template>

<script>
    export default {
      name: "MnemonicWords",
      data:()=>({id:'',keywords:[]}),
      created:function() {
        this.id=this.$route.params.id;
        let wallet = this.$storage.getWalletById(this.id);
        this.$checkPassword(this.id).then(result => {
          this.$lpc__.decMnemonicWords(wallet.type, wallet.encMnemonicWords, result)
            .then(result=>{
              this.keywords=result.mnemonicWords.split(' ')
            });
        }).catch(err=>{
          this.$emit('added', this.id);
        });
      },
      methods:{
        goVerfiy:function () {
          this.$router.push({name:'confirmwords',params:{id:this.id,keywords:this.keywords}});
        }
      }
    }
</script>

<style scoped>
  @import "../assets/css/mnemonicWords.css";
</style>
