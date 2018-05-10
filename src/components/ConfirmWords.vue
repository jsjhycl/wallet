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
      data: () => ({id: '', mixWords: [], selectWords: []}),
      created: function () {
        this.mixWords = this.$storage.generatorWords(this.$route.params.keywords);
        this.id = this.$route.params.id;
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
          if (this.$route.params.keywords.join(' ') != this.selectWords.join(' ')) {
            this.selectWords = [];
            this.mixWords = this.$storage.generatorWords(this.$route.params.keywords);
            this.$alert('请检查你的助记词', '备份失败');
          } else {
            this.$confirm('备份成功，你确认删除你的助记词吗？', '询问').then(ret => {
              //  备份成功
              this.$storage.updateWallet(this.id, {isBackup: true, encMnemonicWords: ''});
              this.$emit('added', this.id);
            }).catch(err => {
              this.selectWords = [];
              this.mixWords = this.$storage.generatorWords(this.$route.params.keywords);
            })
          }
        }
      }
    }
</script>

<style scoped>
  @import "../assets/css/mnemonicWords.css";
</style>
