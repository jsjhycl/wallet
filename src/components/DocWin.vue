<!--显示所有文档相关的host-->
<template>
  <div class="walletRightCenter">
    <Agreement v-if="this.currentCom===objs['使用协议']"></Agreement>
    <policy v-else="this.currentCom===objs['隐私条款']"></policy>
  </div>
</template>

<script>
  import Agreement from './docs/policy'
  import policy from './docs/Agreement'
  export default {
      name: "DocWin",
    data:()=>({
      currentCom:null,
      objs:{
        '使用协议':Agreement,
        '隐私条款':policy
      }
    }),
      components: {
        Agreement,
        policy
      },
      created(){
        console.log(this.objs[this.$route.query.name])
        this.currentCom =this.objs[this.$route.query.name];
      }
    }
</script>

<style scoped>

</style>
