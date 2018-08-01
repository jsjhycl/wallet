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
        <router-link to="/doc?name=使用协议" class="walletInfoA">
          <span>使用协议</span>
          <span class="arrowRIcon glyphicon glyphicon-menu-right"></span>
        </router-link>
      </li>
      <li>
        <router-link to="/doc?name=隐私条款" class="walletInfoA" href="#">
          <span>隐私条款</span>
          <span class="arrowRIcon glyphicon glyphicon-menu-right"></span>
        </router-link>
      </li>
      <li>
        <a class="walletInfoA" href="javascript:void(0)">
          <span>版本信息</span>
          <span>{{current}}-><i style="color: red">{{$root.Bus.updateInfo.version}}</i></span>
          <a class="btn btn-success" href="https://testwallet.bcbchain.io/public/wallet/wallet-windows/package.zip" target="_blank" v-if="current!=$root.Bus.updateInfo.version">升级</a>
        </a>
      </li>
    </ul>
    <div class="walletCopy">
      <p>Copyright 2018 ConsonLabs</p>
      <p>All right reserved</p>
    </div>
  </div>
</template>

<script>
  import version from './../utils/version';
    export default {
      name: "WalletInfo",
      data: () => ({
        current: version.version
      })
    }
</script>

<style scoped>
  @import "../assets/css/walletInfo.css";
</style>
