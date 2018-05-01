<template>
  <div class="walletRightCenter">
    <div class="walletTextBtn">
      <div class="walletText">
        <h3>确认你的钱包助记词</h3>
        <p>请按顺序点击助记词，以确认你的备份助记词正确。</p>
        <ul class="wordsWrap list-unstyled clearfix">
          <li @click="choiceWord(kw)" v-for="kw in mixWords" class="wordsWrapLi pull-left">{{kw}}</li>
        </ul>
        <ul class="list-unstyled confirmWords clearfix">
          <li @click="removeWord(kw)" v-for="kw in selectWords" class="wordsWrapLi pull-left">{{kw}}</li>
        </ul>
      </div>
      <button @click="saveWallet" class="btn btn-success btnStyle">确认</button>
    </div>
  </div>
</template>

<script>
    export default {
      name: "ConfirmWords",
      data: () => ({mixWords: [], selectWords: []}),
      created: function () {
        this.mixWords = this.$storage.generatorWords(this.$route.params.wallet.keywords);
      },
      methods: {
        choiceWord: function (e) {
          if (this.selectWords.indexOf(e) < 0)
            this.selectWords.push(e);
          this.mixWords.splice(this.mixWords.indexOf(e), 1);
        },
        removeWord: function (e) {
          this.selectWords.splice(this.selectWords.indexOf(e), 1);
          this.mixWords.push(e);
        },
        saveWallet: function () {
          let wallet = this.$route.params.wallet,
            keywords = wallet.keywords;
          console.log(wallet,'wallet...')

          if (wallet.keywords.join(' ') != this.selectWords.join(' ')) {
            this.$confirm('助记词未确认成功，需要创建钱包吗？', '询问').then((result) => {
              wallet.isBackup = false;
              this.$storage.insertWallet(wallet);
              this.$emit('added', wallet.id);
            }).catch(err => {
              //重新选择
              this.mixWords = this.$storage.generatorWords(keywords);
              this.selectWords = [];
            })
          } else {
            wallet.isBackup = true;
            this.$storage.insertWallet(wallet);
            this.$emit('added', wallet.id);
          }
        }
      }
    }
</script>

<style scoped>
  @import "../assets/css/mnemonicWords.css";
</style>
