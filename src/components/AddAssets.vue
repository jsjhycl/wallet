<template>
  <div class="walletRightCenter padT">
    <ul class="noticeList list-unstyled">
      <li v-for="item in assets" class="noticeLi" :class="{active:item.conAddr===asset.conAddr}" @click="asset=item">
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
      <button v-show="asset.from===0" @click="doneDelete" class="btn btn-danger btnStyle">删除</button>
      <button @click="add" class="btn btn-success btnStyle">新增</button>
      <button @click="setResources" class="btn btn-primary btnStyle marRL">确定</button>
    </div>
    <el-dialog title="新增代币资产" :visible.sync="dialogFormShow" :close-on-click-modal="false" >
      <el-form :model="asset">
        <el-form-item label="名称" :label-width="formLableWidth">
          <el-input v-model="asset.name"></el-input>
        </el-form-item>
        <el-form-item label="符号" :label-width="formLableWidth">
          <el-input v-model="asset.symbol"></el-input>
        </el-form-item>
        <el-form-item label="合约地址" :label-width="formLableWidth">
          <el-input v-model="asset.conAddr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import {Asset} from "../utils/models";

    export default {
      name: "AddAssets",
      data: () => ({
        assets: [],
        asset:{},//当前选中的资产
        dialogFormShow:false,
        formLableWidth:'80px',
        currentWallet:null
      }),
      created: function () {
        this.currentWallet =this.$storage.getWalletById(this.$route.params.id);
        this.init();
        //done refresh
        this.$bindRefresh('init');
      },
      methods:{
        loadAssets(){
          let resources =this.currentWallet.resources||[];
          this.assets =this.$storage.getAssets()
            .filter(m=>m.coinType===this.currentWallet.type)
            .map(item=>{
              item.state=resources.some(m=>m.contractAddr===item.conAddr);
              return item;
            });
          console.log('this.assets:',this.assets);
          if(this.assets.length>0) this.asset =this.assets[0];
        },
        init:function(){
          this.$storage.prepareAsset(this.currentWallet.type).then(()=>{
           this.loadAssets();
          })
        },
        setResources:function () {
          // let resources = this.assets.filter(m=>m.state).map(m=>({name:m.symbol,desc:m.name,img:m.coinIcon,contractAddr:m.conAddr}));
          let resources = this.assets.filter(m=>m.state).map(m=>m.conAddr);//字符串数组
          console.log(resources,'.....save resource');
          this.$storage.setResourceForWallet(this.$route.params.id,resources);
          this.$router.replace({name:'wallet',params:this.$route.params.id});
        },
        /*新增资产*/
        add:function () {
          this.asset =new Asset();
          this.asset.coinType =this.currentWallet.type;
          this.asset.coinIcon ='./static/defaultcoin.png';
          this.asset.from=0;
          this.dialogFormShow=true;
        },
        /*保存资产*/
        save:function () {
          if(!this.asset.name||!this.asset.symbol||!this.asset.conAddr){
            this.$message({message:"请填入名称,符号,合约地址",type:"error"})
            return;
          }
          this.$storage.saveAssets([this.asset]);
          this.loadAssets();
          this.dialogFormShow=false;
        },
        /*删除资产*/
        doneDelete(){
          this.$confirm('你确定要资产：'+this.asset.name+'吗？','确认')
            .then(()=>{
              this.$storage.removeAsset(this.asset);
              this.$storage.removeAssetInWallet(this.asset.conAddr);
              this.loadAssets();
            })
            .catch(()=>{})
        }
      }
    }
</script>

<style scoped>
  @import "../assets/css/addAssets.css";
</style>
