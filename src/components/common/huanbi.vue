<template>
  <!--介绍-->
  <div>
    <div class="modal-body marT2">
      <h4 class="modal-body-title text-center">
        什么是一键换币？
      </h4>
      <p class="color555 marT2">一键换币是指，将您的以太坊BCB数字资产从以太坊钱包地址中转移到BCB主链钱包地址上。用户须保证建立拥有至少一个BCB钱包，否则将无法使用换币服务；</p>
      <p class="color555 marT2">换币服务需有审核时间，我们一般将在每日15:00进行审核，审核通过即可换币成功，请您耐心等待；</p>
      <p class="color555 marT2">请仔细检查转入钱包地址，如钱包地址错误，换币资产将无法找回</p>
    </div>
    <div class="modalFooter">
      <button @click="$emit('showHuanbiEvent',1)" class="btn btn-primary aLink">我已了解</button>
      <a @click="$emit('showHuanbiEvent',2)" class="see-list">查看换币记录</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "huanbi"
  }
</script>

<style scoped>

</style>
