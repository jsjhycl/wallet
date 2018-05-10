<template>
  <div class="walletRightCenter padT">
    <ul class="noticeList list-unstyled">
      <li v-for="item in assets" class="noticeLi">
        <div class="disFlex">
          <img class="assetsImg" :src="item.coinIcon">
          <div class="noticeLiText">
            <p>{{item.symbol}}<span class="noticeLiAcceptor">{{item.name}}</span></p>
            <p class="con-address">{{item.conAddr}}</p>
          </div>
        </div>
        <label class="select">
          <input v-model="item.state" type="checkbox" class="chk_1">
          <span class="sel"></span>
        </label>
      </li>
    </ul>
    <div class="btnGroupSm">
      <button @click="setResources" class="btn btn-primary btnStyle marRL">选定</button>
    </div>
  </div>
</template>

<script>
    export default {
      name: "AddAssets",
      data: () => ({
        assets: []
      }),
      created: function () {
        this.init();
        //done refresh
        this.$bindRefresh('init');
      },
      methods:{
        init:function(){
          let currentWallet =this.$storage.getWalletById(this.$route.params.id);
          let resources =currentWallet.resources||[];
          this.$storage.getAssets().then(datas => {
            this.assets = datas.map(item=>{
              item.state=resources.some(m=>m.name===item.symbol);
              return item;
            });
          })
        },
        setResources:function () {
          let resources = this.assets.filter(m=>m.state).map(m=>({name:m.symbol,desc:m.name,img:m.coinIcon,contractAddr:m.conAddr}));
          this.$storage.setResourceForWallet(this.$route.params.id,resources);
          this.$router.replace({name:'wallet',params:this.$route.params.id});
        }
      }
    }
</script>

<style scoped>
  @import "../assets/css/addAssets.css";
</style>
