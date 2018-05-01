<template>
  <div class="walletRightCenter padT">
    <ul class="noticeList list-unstyled">
      <li @click="doneSelect(item)" v-for="item in orders" class="noticeLi" :class="{active:item.isSelected}">
        <label class="select labelSelect">
          <input type="checkbox" class="chk">
          <span class="sel spanSel"></span>
        </label>
        <div class="noticeLiText">
          <img class="outInImg" :src="'/static/'+(item.action=='卖'?'out.png':'in.png')">
          <div>
            <p>{{item.toAdress}}</p>
            <p class="noticeLiAcceptor">{{'服务器日期12天前'}}</p>
          </div>
        </div>
        <span class="noticeLiTime colorFE7F7F">{{item.amount}}BCB</span>
      </li>
    </ul>
    <div class="btnGroupSm">
      <button @click="selectedAll" class="btn btn-primary btnStyle">全选</button>
      <button @click="removeItems" class="btn btn-danger btnStyle marRL">删除</button>
    </div>
  </div>
</template>

<script>
    export default {
      name: "WalletRecord",
      data: () => ({orders: []}),
      created: function () {
        this.orders = this.$storage.getLocalTransfers().map(item=>{
          item.isSelected=false;
          return item;
        });
      },
      methods:{
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
              this.records = this.$storage.removeLocalTransfers(removeItems);
            })
            .catch(err=>console.log(err))
        }
      }
    }
</script>

<style scoped>
  @import "../assets/css/walletRecord.css";
</style>
