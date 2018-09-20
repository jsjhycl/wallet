<template>
  <div class="walletRightCenter">
    <!--<p>加载中...</p>-->
    <!--<button @click="doneClick">测试对象</button>-->
    <!--<button @click="doneSave">保存</button>-->
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
        this.$message({message:'window.WebViewJavascriptBridge:'+window.WebViewJavascriptBridge})
      },
      doneSave(){
        WebViewJavascriptBridge.callHandler('getData',{'key':'bcb_config','default':'{}'},function(response) {
          this.$alert(response);
        });
      }
    }
  }
</script>

<style scoped>
  @import "./../assets/css/homePage.css";
</style>
