<template>
  <div slot="title" class="header-style">
    <h4 class="modal-title">
      <span>一键换币</span>
      <span class="color64AFEA"> > 换币记录</span>
    </h4>
    <ul class="modal-body list-unstyled">
      <li v-for="item in records" class="modal-li">
        <div class="dis-flex">
          <p class="date-style">{{item.createTime|exchange-time('YY-M-DD 上午HH:mm:ss')}}</p>
          <span class="change-tips colorF79825">{{item.state|exchange-state-str}}</span>
        </div>
        <div class="marT color555">
          <i class="colora9a9a9"></i>
          <span>{{item.bcbMainAddr}}</span>
          <i class="colora9a9a9" style="margin: 0 5px;"><=></i>
          <span>{{item.bcbETHAddr}}</span>
        </div>
        <p class="margin-top06 color555">
          换币数量：<span>{{item.value}} BCB</span>
        </p>
      </li>
      <!--<li class="modal-li">-->
        <!--<div class="dis-flex">-->
          <!--<p class="date-style">2018-02-21 21:23</p>-->
          <!--<span class="change-tips color64AFEA">换币成功</span>-->
        <!--</div>-->
        <!--<div class="marT color555">-->
          <!--<i class="colora9a9a9">从</i>-->
          <!--<span>0x32305895d5d7fd8f7d8s7f6ds7f5ds7f6dsf</span>-->
          <!--<i class="colora9a9a9">转入</i>-->
          <!--<span>0x32305895d5d7fd8f7d8s7f6ds7f5ds7f6dsf</span>-->
        <!--</div>-->
        <!--<p class="margin-top06 color555">-->
          <!--换币数量：<span>213.23414 BCB</span>-->
        <!--</p>-->
      <!--</li>-->
      <!--<li class="modal-li">-->
        <!--<div class="dis-flex">-->
          <!--<p class="date-style">2018-02-21 21:23</p>-->
          <!--<span class="change-tips color64AFEA">换币成功</span>-->
        <!--</div>-->
        <!--<div class="marT color555">-->
          <!--<i class="colora9a9a9">从</i>-->
          <!--<span>0x32305895d5d7fd8f7d8s7f6ds7f5ds7f6dsf</span>-->
          <!--<i class="colora9a9a9">转入</i>-->
          <!--<span>0x32305895d5d7fd8f7d8s7f6ds7f5ds7f6dsf</span>-->
        <!--</div>-->
        <!--<p class="margin-top06 color555">-->
          <!--换币数量：<span>213.23414 BCB</span>-->
        <!--</p>-->
      <!--</li>-->
    </ul>
  </div>
</template>

<script>
    export default {
      name: "changeList",
      data: () => ({records:[]}),
      props: ['bcbETHAddr'],
      async created() {
        try{
          let records = await this.$rpc__.get_ethrecord(this.bcbETHAddr);
          this.records =records;
          console.log('换币记录:',records);
        }
        catch (e) {
          this.$message({message:e.toString(),type:"error"});
        }
      }
    }
</script>

<style scoped>

</style>
