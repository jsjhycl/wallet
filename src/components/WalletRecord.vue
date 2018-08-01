<template>
  <div class="walletRightCenter padT">
    <ul class="noticeList list-unstyled" v-loading="isLoading">
      <li @click="doneSelect(item)" v-for="item in orders" class="noticeLi" :class="{active:item.isSelected}">
        <label class="select labelSelect">
          <input type="checkbox" class="chk">
          <span class="sel spanSel"></span>
        </label>
        <div class="noticeLiText">
          <!--<img class="outInImg" :src="'/static/'+(item.action=='卖'?'out.png':'in.png')">-->
          <img class="outInImg" :src="'./static/out.png'">
          <div>
            <p>{{item.to}}</p>
            <p class="noticeLiAcceptor">{{item.timeStamp}}</p>
          </div>
        </div>
        <span class="noticeLiTime colorFE7F7F">{{item.value}}-{{item.valueName}}</span>
        <span class="noticeLiTime colorFE7F7F">{{item.strStatus}}</span>
      </li>
    </ul>
    <div class="btnGroupSm">
      <button @click="doneRefresh" class="btn btn-primary btnStyle">刷新</button>
      <button @click="selectedAll" class="btn btn-primary btnStyle">全选</button>
      <button @click="removeItems" class="btn btn-danger btnStyle marRL">删除</button>
    </div>
  </div>
</template>

<script>
    import {transaction} from "../utils/models";
    export default {
      name: "WalletRecord",
      data: () => ({isLoading:false,orders: []}),
      created: function () {
        this.init();
        this.$bindRefresh('init');
      },
      methods:{
        init:function(){
          this.orders =this.$storage.getLocalTransfers().map(item=>new transaction().fromLocalByObj(item.address,item));
          this.doneRefresh();
        },
        doneSelect:function (item) {
          item.isSelected=!item.isSelected;
        },
        selectedAll:function () {
          this.orders.forEach(item=>item.isSelected=true);
        },
        removeItems:function () {
          var removeItems =this.orders.filter(item=>item.isSelected===true);
          if(removeItems.length<=0) return;
          this.$confirm("您确定要删除选中记录吗？","确认")
            .then(result=>{
              this.orders = this.$storage.removeLocalTransfers(removeItems).map(item=>new transaction().fromLocalByObj(item.address,item));
            })
            .catch(err=>console.log(err))
        },
        /*刷新 todo 需测试*/
        doneRefresh:function () {
          this.isLoading=true;
          // this.$storage.getTransactionByTxhash('0x3', this.orders.map(item =>item.txHash))//todo
          this.$storage.getTransactionsByOrders(this.orders)
            .then(trans => {
              trans.forEach(tran=>{
                let findItem =this.orders.find(m=>m.txHash===tran.txHash);
                if(findItem){
                  findItem.complexByHashData(tran);
                }
              })
              this.isLoading=false;
            })
            .catch(err=>{
              this.isLoading=false;
              this.$alert('出现错误：'+err,'错误');
            })
        }
      }
    }
</script>

<style scoped>
  @import "../assets/css/walletRecord.css";
</style>
