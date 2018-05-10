<template>
  <div class="walletRightCenter table-responsive">
      <table class="table text-center" cellspacing="0" cellpadding="0">
        <thead>
        <tr class="table-head">
          <th>交易对</th>
          <th>最新价</th>
          <th>涨幅</th>
          <th>最高价</th>
          <th>最低价</th>
          <th>24H量</th>
          <th>K线</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in trends">
          <td>
            <!--<img style="width: 23px;height: 23px" :src="'./static/btcImg.png'">-->
            <span>{{item.tradeCoin +'/'+item.baseCoin}}</span>
          </td>
          <td class="base-price">
            <p>{{item.latest}}</p>
            <p class="exchange-price">≈ {{item.latest*exchange['CNY']|tofix(2)}}</p>
          </td>
          <td  :class="updown(item)>0?'color4B9F5D':'colorA03C2D'">
            <span>{{updown(item)}}</span>
            <i class="glyphicon " :class="updown(item)>0?'glyphicon-arrow-up':'glyphicon-arrow-down'" style="font-size: 12px"></i>
          </td>
          <td class="base-price">
            <p>{{item.high}}</p>
            <p class="exchange-price">≈ {{item.high*exchange['CNY']|tofix(2)}}</p>
          </td>
          <td class="base-price">
            <p> {{item.low}}</p>
            <p class="exchange-price">≈ {{ item.low*exchange['CNY']|tofix(2)}}</p>
          </td>
          <td>
            {{item.amount}}
          </td>
          <td>
            <a href="#">
              <img style="width: 20px; height: 20px;" :src="'./static/k-line.png'">
            </a>
          </td>
        </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
    export default {
      name: "trend",
      data: () => ({
        trends: [],
        timer:null,
        exchange:{}
      }),
      created: function () {
        // this.run();
        this.$rpc__.getExchangesObj('0x3')
          .then(exobj=>this.exchange=exobj)
          .catch(err=>console.log('获取汇率时出现错误..',err))
        this.getTrends();
        this.$bindRefresh('getTrends');
      },
      computed:{
      },
      beforeDestroy(){
        clearTimeout(this.timer);
      },
      methods: {
        getTrends() {
          return this.$rpc__.getMarket()
            .then(result => {
              this.trends = result;
            })
        },
        run() {
          this.getTrends().then(() => {
            this.timer = setTimeout(this.run, 30000)
          })
            .catch(() => {
              this.timer = setTimeout(this.run, 10000)
            })
        },
        updown(item){
          return ((item.latest-item.close)/item.close*100).toFixed(2);
        }
      }
    }
</script>

<style scoped>
  @import "../assets/css/trend.css";
</style>
