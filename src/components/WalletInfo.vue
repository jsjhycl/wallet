<template>
  <div class="walletRightCenter padT">
    <div class="walletInfo">
      <img class="walletInfoImg" src="../assets/img/slogo.png">
      <p class="walletInfoText">
        BCB Wallet是一款移动端轻钱包App，它旨在为普通用户提供一款安全放心、简单好用、功能强大的数字资产钱包应用
      </p>
    </div>
    <ul class="walletInfoList list-unstyled">
      <li>
        <a class="walletInfoA" href="http://www.baidu.com">
          <span>使用协议</span>
          <span class="arrowRIcon glyphicon glyphicon-menu-right"></span>
        </a>
      </li>
      <li>
        <a class="walletInfoA" href="#">
          <span>隐私条款</span>
          <span class="arrowRIcon glyphicon glyphicon-menu-right"></span>
        </a>
      </li>
      <li>
        <a class="walletInfoA" href="#">
          <span>版本日志</span>
          <span class="arrowRIcon glyphicon glyphicon-menu-right"></span>
        </a>
      </li>
      <li>
        <a class="walletInfoA" href="#">
          <span>产品向导</span>
          <span class="arrowRIcon glyphicon glyphicon-menu-right"></span>
        </a>
      </li>
      <li>
        <a class="walletInfoA" href="#">
          <span>检测新版</span>
          <span class="arrowRIcon glyphicon glyphicon-menu-right"></span>
        </a>
      </li>
    </ul>
    <div class="walletCopy">
      <p>Copyright 2016 ConsonLabs</p>
      <p>All right reserved</p>
    </div>
  </div>
</template>

<script>
    export default {
        name: "WalletInfo"
    }
</script>

<style scoped>
  @import "../assets/css/walletInfo.css";
</style>
