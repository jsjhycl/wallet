<template>
  <div class="walletRightCenter padT">
    <div class="helpTopWrap">
      <h1>Hi，先生 / 女士</h1>
      <p class="helpTopText">已为您定制如下内容</p>
    </div>
    <div class="speakWrap">
      <h3>猜您想问</h3>
      <ul class="clearfix list-unstyled speakList">
        <li class="pull-left"><a href="#">如何创建钱包</a></li>
        <li class="pull-left"><a href="#">导出Keystore</a></li>
        <li class="pull-left"><a href="#">如何导入钱包</a></li>
        <li class="pull-left"><a href="#">如何转账</a></li>
        <li class="pull-left"><a href="#">什么是私钥</a></li>
        <li class="pull-left"><a href="#">如何收款</a></li>
        <li class="pull-left"><a href="#">如何保存钱包地址</a></li>
        <li class="pull-left"><a href="#">用户安全</a></li>
      </ul>
    </div>
    <div class="btnGroupSm">
      <div class="helpSpeak">
        <input class="SpeakInput" type="text" placeholder="请输入您想说的话">
        <img class="SpeakInputImg" src="../assets/img/SpeakInputImg.png">
      </div>
      <a class="btn btn-primary btnStyle marRL" href="#">人工服务</a>
    </div>
  </div>
</template>

<script>
    export default {
        name: "WalletHelp"
    }
</script>

<style scoped>
  @import "../assets/css/walletHelp.css";
</style>
