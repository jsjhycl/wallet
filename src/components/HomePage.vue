<template>
  <div class="walletRightCenter">
    <!--<p>加载中...</p>-->
    <!--<button @click="doneClick">测试询问弹窗</button>-->
    <!--<button @click="doneSave">测试promise下的弹窗</button>-->
    <!--<button @click="doneConfirm">测试输入后在弹窗显示</button>-->
    <!--<button @click="doneConfirm1">连续弹出测试</button>-->
    <!--<div>-->
      <!--<button @click="doneorialert">原声alert</button>-->
      <!--<button @click="doneoriconfirm">原声confirm</button>-->

    <!--</div>-->
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
      }
    },
    mounted:function(){
    },
    created:function () {
    },
    methods:{
      doneClick(){
        this.$confirm(`您确定要删除钱包：111111吗？`, '钱包删除确认')
      },
      doneSave(){
        Promise.resolve('ok')
          .then((val)=>this.$confirm(`您确定要删除钱包：${val}吗？`, '钱包删除确认'))
      },
      doneConfirm(){
        return this.$prompt('', '请确认密码', {
          center: true,
          inputType: 'password',
          inputPlaceholder: 'password',
          inputPattern:/.{1}/,
          inputErrorMessage:'密码不能为空',
          showClose: false
        })
          .then(result=>{
            return this.$confirm(`您确定要删除钱包：${result.value}吗？`, '钱包删除确认')
          })
      },
      doneConfirm1(){
        this.$confirm(`您确定要删除钱包：0吗？`, '钱包删除确认')
          .then(()=>this.$confirm(`您确定要删除钱包：1吗？`, '钱包删除确认'))
          .then(()=>this.$confirm(`您确定要删除钱包：2吗？`, '钱包删除确认'))
          .then(()=>this.$confirm(`您确定要删除钱包：3吗？`, '钱包删除确认'))
      },
      doneorialert(){
        alert('我是弹出');
      },
      doneoriconfirm(){
        confirm('你是男人吗？')
      }
    }
  }
</script>

<style scoped>
  @import "./../assets/css/homePage.css";
</style>
