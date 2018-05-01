<template>
  <div class="walletRightCenter">
    <div class="walletTextBtn">
      <div class="walletText">
        <h3>抄写下你的钱包助记词</h3>
        <p>助记词用于恢复钱包和充值钱包密码，将它准确的抄写到纸上，并存放在只有你知道的安全的地方。</p>
        <div class="wordsWrap">
          <p>
            <span style="margin: 10px" v-for="kw in keywords">{{kw}}</span>
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
      data:()=>({keywords:[]}),
      created:function() {
        this.$route.params.wallet.keywords = this.keywords = this.$lpc__.getMnemonicSentence(
          this.$route.params.wallet.password,
          this.$route.params.wallet.privateKey
        ).split(' ');
      },
      methods:{
        goVerfiy:function () {
          this.$router.push({name:'confirmwords',params:this.$route.params});
        }
      }
    }
</script>

<style scoped>
  @import "../assets/css/mnemonicWords.css";
</style>
