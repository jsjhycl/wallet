<template>
  <div class="indexWrap">
    <!--左边栏（钱包）-->
    <div class="walletLeftWrap">
      <div class="walletLeftLogo">
        <img class="logoImg" src="./assets/img/logo.png">
        <p class="walletLeftTitle">BCB Wallet</p>
      </div>
      <div>
        <div class="searchFrame">
          <span class="glyphicon glyphicon-search searchIcon"></span>
          <input @input="doneSearch" v-model="searchText" class="searchInput" type="text" placeholder="搜索钱包名称">
        </div>
        <div class="searchCenter">
          <img v-if="wallets.length<=0" class="noWallet" src="./assets/img/nowallet.png">
          <ul v-else class="list-unstyled">
            <li @click="setSelectHandler(item)" v-for="item in wallets" class="searchLi" :class="{active:item===selectWallet}">
              <router-link class="searchLiA" :to="'/wallet/'+item.id">
                <img class="headImg" :src="'./static/'+item.head">
                <div class="searchLiInfo">
                  <h5>{{item.name}}</h5>
                  <p class="color4AC390">{{$storage.getWalletTypes().find(m=>m.value===item.type).name}}
                  </p>
                </div>
                <button class="btn-link" style="color: red;align-self: flex-end;padding-right: 16px" v-if="!item.isBackup" @click="doneBack">请备份</button>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="walletBtnWrap clearfix">
        <router-link class="walletBtn pull-left" to="/add">创建钱包</router-link>
        <router-link class="walletBtn pull-left" to="/import">导入钱包</router-link>
      </div>
    </div>
    <!--右边区域-->
    <div class="walletRightWrap">
      <!--工具条-->
      <div class="walletToolBar clearfix">
        <div class="pull-left">
          <button @click="donePrevious" class="btn-link"><span class="glyphicon glyphicon-menu-left"></span></button >
          <button @click="doneNext" class="btn-link"><span class="glyphicon glyphicon-menu-right"></span></button>
          <button @click="doneRefresh" class="btn-link"><span class="glyphicon glyphicon-repeat"></span></button>
        </div>
        <div class="pull-right">
          <router-link @click.native="setToolbarSelect('trend')" to="/trend"><img class="trendImg" :src="'./static/'+(currentTool=='trend'?'trendImg.png':'out-trendImg.png')"></router-link>
          <!--<router-link @click.native="setToolbarSelect('notice')" to="/notice"><span class="glyphicon glyphicon-envelope" :class="{'active-tool':currentTool=='notice'}"></span></router-link>-->
          <router-link @click.native="setToolbarSelect('setting')" to="/setting"><span class="glyphicon glyphicon-cog" :class="{'active-tool':currentTool=='setting'}"></span></router-link>
          <!--<a @click="closeWin"><span class="glyphicon glyphicon-remove text-danger" ></span></a>-->
        </div>
      </div>
      <!--工作区-->
      <router-view @added="addWalletHandler" @remove="removeWalletHandler" @modify="modifyWalletHandler" ></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    wallets: [],
    selectWallet:{},
    searchText:'',
    currentTool:''
  }),
  created: function () {
    this.wallets = this.$storage.getWallets();
    if(this.wallets.length>0){
      this.selectWallet =this.wallets[0];
      this.$router.push('/wallet/'+this.wallets[0].id);
    }
  },
  methods:{
    doneBack:function(){
      this.$alert('请执行备份操作，备份Keystore/助记词！');
    },
    //增加完钱包时回调
    addWalletHandler:function (arg) {
      this.wallets = this.$storage.getWallets();
      this.selectWallet =this.wallets.find(item=>item.id===arg);
      this.$router.push('/wallet/'+this.selectWallet.id);
    },
    //删除钱包回调
    removeWalletHandler:function (arg) {
      this.wallets = this.$storage.getWallets();
      this.$router.push('/index');
    },
    //修改钱包回掉
    modifyWalletHandler:function(id,updates){
      let item  =this.wallets.find(m=>m.id==id);
      if(!item) return;
      Object.keys(updates).forEach(key=>{
        if(key in item) item[key]=updates[key];
      })
    },
    //设置当前选中钱包
    setSelectHandler:function (wallet) {
      this.selectWallet =wallet;
    },
    //搜索
    doneSearch:function () {
      this.wallets =this.$storage.getWallets().filter(m=>m.name.includes(this.searchText));
    },
    //工具条联动显示
    setToolbarSelect:function (e) {
      this.currentTool=e;
    },
    //上一页
    donePrevious:function (e) {
      this.$router.back();
    },
    //下一页
    doneNext:function (e) {
      this.$router.go(1);
    },
    //刷新
    doneRefresh:function (e) {
      this.$root.$emit('refresh','123')
      // this.$message({message:'暂不支持',type:'info'});
    },
  //  关闭窗口
  //   closeWin:function () {
  //     try{
  //       let localStrData=JSON.stringify(this.$storage.getLocalData());
  //       console.log(localStrData,'localStrData');
  //       bindObject.SaveJson(localStrData);
  //       bindObject.CloseWindow();
  //     }catch(e){
  //       this.$alert('此环境不支持关闭.')
  //     }
  //   }
  }
}
</script>

<style>
  @import "./assets/css/base.css";
  .active-tool{
    color: steelblue;
  }
</style>
