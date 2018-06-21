<template>
  <div class="walletRightCenter">
    <ul class="walletSetList list-unstyled">
      <!--<li>-->
        <!--<router-link class="disBlock" to="/records">-->
          <!--<img class="walletSetImg" src="../assets/img/transactionRecord.png">-->
          <!--<p>交易记录</p>-->
        <!--</router-link>-->
      <!--</li>-->
      <li>
        <router-link class="disBlock" to="/users">
          <img class="walletSetImg" src="../assets/img/contacts.png">
          <p>联系人</p>
        </router-link>
      </li>
      <li>
        <router-link class="disBlock" to="/setup">
          <img class="walletSetImg" src="../assets/img/systemSetup.png">
          <p>系统设置</p>
        </router-link>
      </li>
      <li>
        <router-link class="walletSetA" to="/about">
          <img class="walletSetImg" src="../assets/img/aboutUs.png">
          <p>关于我们</p>
        </router-link>
      </li>
      <!--<li>-->
        <!--<router-link class="walletSetA" to="/help">-->
          <!--<img class="walletSetImg" src="../assets/img/helpCenter.png">-->
          <!--<p>帮助中心</p>-->
        <!--</router-link>-->
      <!--</li>-->
      <!--<li @click="doneInit">-->
        <!--<a class="walletSetA" >-->
          <!--<img class="walletSetImg" src="../assets/img/helpCenter.png">-->
          <!--<p>初始化</p>-->
        <!--</a>-->
      <!--</li>-->
    </ul>
  </div>
</template>

<script>
    export default {
        name: "WalletSet",
      methods:{
          doneInit(){
            this.$confirm("您确定要清除本地数据吗？",'询问')
              .then(()=>{
                localStorage.clear();
                // this.$router.push('/');
                window.location='/';
              })
          }
      }
    }
</script>

<style scoped>
  @import "../assets/css/walletSet.css";
</style>
