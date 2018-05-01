<template>
  <div class="walletRightCenter padT">
    <ul class="noticeList list-unstyled">
      <li v-for="item in assets" class="noticeLi">
        <div class="disFlex">
          <img class="assetsImg" :src="'/static/'+item.img">
          <div class="noticeLiText">
            <p>{{item.name}}</p>
            <p class="noticeLiAcceptor">{{item.desc}}</p>
          </div>
        </div>
        <label class="select">
          <input v-model="item.state" type="checkbox" class="chk_1">
          <span class="sel"></span>
        </label>
      </li>
    </ul>
    <div class="btnGroupSm">
      <button @click="setResources" class="btn btn-primary btnStyle">选定</button>
      <!--<button class="btn btn-danger btnStyle marRL disabled">删除</button>-->
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
        console.log(this.$route);
        let currentWallet =this.$storage.getWalletById(this.$route.params.id);
        let resources =currentWallet.resources||[];
        this.$storage.getAssets().then(datas => {
          this.assets = datas.map(item=>{
            item.state=resources.some(m=>m.name===item.name);
            return item;
          });
        })
      },
      methods:{
        setResources:function () {
          let resources = this.assets.filter(m=>m.state).map(m=>({name:m.name,desc:m.desc,img:m.img,contractAddr:m.contractAddr}));
          this.$storage.setResourceForWallet(this.$route.params.id,resources);
          this.$router.replace({name:'wallet',params:this.$route.params.id});
        }
      }
    }
</script>

<style scoped>
  @import "../assets/css/addAssets.css";
</style>
