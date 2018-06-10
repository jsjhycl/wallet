<template>
  <div class="walletRightCenter">
    <ul id="myTab" class="nav nav-tabs">
      <li class="active">
        <a id="one" href="#Memorizingords" data-toggle="tab">助记词</a>
      </li>
      <li><a id="two" href="#OfficialWallet" data-toggle="tab">官方钱包</a></li>
      <li><a id="three" href="#privateKey" data-toggle="tab">私钥</a></li>
      <li><a id="four" @click="$message('暂不实现')"  href="#observation" >观察</a></li>
    </ul>
    <div id="myTabContent" class="tab-content">
      <div class="tab-pane fade in active" id="Memorizingords">
        <ul class="list-unstyled">
          <li>
            <select v-model="params.type" class="foundLiInput">
              <option v-for="item in walletTypes" :value="item.value">{{item.name}}</option>
            </select>
          </li>
          <li>
            <textarea v-model="params.encMnemonicWords" class="foundLiInput foundTextArea" placeholder="助记词,按空格分隔"></textarea>
          </li>
          <li>
            <select v-model="params.path"  class="foundLiInput">
              <option v-for="p in paths">{{p}}</option>
            </select>
          </li>
          <li>
            <input v-model="params.password" class="foundLiInput" type="password" placeholder="密码">
          </li>
          <li>
            <input v-model="params.repeatPassword" class="foundLiInput" type="password" placeholder="重复密码">
          </li>
          <li>
            <input v-model="params.passwordInfo" class="foundLiInput" type="text" placeholder="密码提示信息（可不填）">
          </li>
        </ul>
        <label class="select">
          <input v-model="params.isRead" type="checkbox" class="chk_1">
          <span class="sel"></span>
          我已仔细阅读并同意
          <span class="color80D3FE">服务及隐私条款</span>
        </label>
        <div class="btnGroup">
          <button @click="doneImportByHelpWord" class="btn btn-success btnStyle">开始导入</button>
          <a class="marRL color64AFEA">什么是助记词？</a>
        </div>
      </div>
      <div class="tab-pane fade" id="OfficialWallet">
        <p class="tabTipsStyle">直接复制粘贴以太坊官方钱包Keystore文件内容至输入框。
          或者通过生成keystore内容的二维码，扫描录入。</p>
        <ul class="list-unstyled">
          <li>
            <select v-model="params.type" class="foundLiInput">
              <option v-for="item in  walletTypes" :value="item.value">{{item.name}}</option>
            </select>
          </li>
          <li>
            <textarea v-model="params.keystore" class="foundLiInput foundTextArea" placeholder="keystore 文本内容"></textarea>
          </li>
          <li>
            <input v-model="params.password" class="foundLiInput" type="password" placeholder="keystore 密码">
          </li>
        </ul>
        <label class="select">
          <input v-model="params.isRead" type="checkbox" class="chk_1">
          <span class="sel"></span>
          我已仔细阅读并同意
          <span class="color80D3FE">服务及隐私条款</span>
        </label>
        <div class="btnGroup">
          <button @click="doneImportByKeystore" class="btn btn-success btnStyle">开始导入</button>
          <a class="marRL color64AFEA">什么是keystore密码？</a>
        </div>
      </div>
      <div class="tab-pane fade" id="privateKey">
        <ul class="list-unstyled">
          <li>
            <select v-model="params.type" class="foundLiInput">
              <option v-for="item in walletTypes" :value="item.value">{{item.name}}</option>
            </select>
          </li>
          <li>
            <textarea v-model="params.privateKey" class="foundLiInput foundTextArea" placeholder="明文私钥"></textarea>
          </li>
          <li>
            <input v-model="params.password" class="foundLiInput" type="password" placeholder="密码">
          </li>
          <li>
            <input v-model="params.repeatPassword" class="foundLiInput" type="password" placeholder="重复密码">
          </li>
          <li>
            <input v-model="params.passwordInfo" class="foundLiInput" type="text" placeholder="密码提示信息（可不填）">
          </li>
        </ul>
        <label class="select">
          <input v-model="params.isRead" type="checkbox" class="chk_1">
          <span class="sel"></span>
          我已仔细阅读并同意
          <span class="color80D3FE">服务及隐私条款</span>
        </label>
        <div class="btnGroup">
          <button @click="doneImportByPrivatekey" class="btn btn-success btnStyle">开始导入</button>
          <a class="marRL color64AFEA">什么是私钥？</a>
        </div>
      </div>
      <div class="tab-pane fade" id="observation">
        <p class="tabTipsStyle">观察钱包不需要导入私钥，只导入钱包地址，进行日常查看账户、交易和接受通知。大额资金的私钥建议使用冷钱包或硬件钱包管理，避免泄露被盗。</p>
        <ul class="list-unstyled">
          <li>
            <select class="foundLiInput">
              <option>ssssss1</option>
              <option selected>ETH</option>
              <option>ssssss3</option>
            </select>
          </li>
          <li>
            <input class="foundLiInput" type="text" placeholder="扫码或输入钱包地址">
          </li>
        </ul>
        <p class="tabTipsStyle tipsStyle">注意：观察钱包发送交易时需要冷钱包配合签名。你可以使用另一台闲置手机，开飞行模式作为冷钱包，导入钱包私钥，配合离线签名。</p>
        <label class="select">
          <input type="checkbox" class="chk_1">
          <span class="sel"></span>
          我已仔细阅读并同意
          <span class="color80D3FE">服务及隐私条款</span>
        </label>
        <div class="btnGroup">
          <a class="btn btn-success btnStyle" href="wallet.html">开始导入</a>
          <a class="marRL color64AFEA" href="#">如何使用冷钱包进行离线签名</a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import uuid from 'uuid/v1'
  import {Wallet} from '../utils/models'
  //初始化导入参数
  function initParams(index) {
    index = index || 0;
    let params = {
      one:{
        encMnemonicWords: '',
        path: `m/44'/60'/0'/0/0`,
        password: '',
        repeatPassword: '',
        passwordInfo: '',
        check:function () {
          if(!this.type||!this.encMnemonicWords||!this.password){
            throw '请填写必要信息';
          }
          if(this.password!=this.repeatPassword){
            throw '密码不一致';
          }
          if(!this.isRead){
            throw '请仔细阅读并同意服务条款';
          }
        }
      },
      two:{
        keystore: '',
        password: '',
        check:function () {
          if (!this.keystore || !this.password) throw '请填写必要信息';
          if (!this.isRead) throw '请仔细阅读并同意服务条款';
        }
      },
      three:{
        privateKey: '',
        password: '',
        repeatPassword: '',
        passwordInfo: '',
        check:function () {
          if(!this.type||!this.privateKey||!this.password){
            throw '请填写必要信息';
          }
          if(this.password!=this.repeatPassword){
            throw '密码不一致';
          }
          if(!this.isRead){
            throw '请仔细阅读并同意服务条款';
          }
        }
      }
    }
    return Object.assign({
      type: '0x1000',
      isRead: false
    },params[index]);
  }
    export default {
      name: "ImportWallet",
      data: () => ({
        walletTypes: {},
        paths:[`m/44'/60'/0'/0/0`,`m/44'/60'/0'/0`,`m/44'/60'/1'/0/0`],
        params:initParams('one'),
      }),
      created: function () {
        this.walletTypes = this.$storage.getWalletTypes();
      },
      mounted:function(){
        let that  =this;
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
          let $this =$(this);
          that.params =initParams($this.attr('id'));
          console.log(that.params)
        })
      },
      methods:{
        //根据助记词导入
        doneImportByHelpWord:function () {
          try {
            this.params.check();
            this.$lpc__.importMnemonicSentence(this.params.type,this.params.encMnemonicWords,this.params.path,this.params.password)
              .then(ret=>{
                let wallet =new Wallet({});
                wallet.id=uuid();
                wallet.type=this.params.type;
                wallet.name='导入钱包-助记词';
                wallet.address=ret.walletAddr;
                wallet.isBackup=true;
                wallet.passwordInfo=this.params.passwordInfo;
                wallet.privateKey=ret.encPrivateKey;
                this.$storage.insertWallet(wallet);
                this.$rpc__.registerAddress(wallet.type,wallet.address,'import')
                  .then(result=>this.$emit('added', wallet.id))
              })
            // todo 需删除
            // let ret= this.$lpc__.importMnemonicSentence(this.params.type,this.params.encMnemonicWords,this.params.path,this.params.password);
            // let wallet =new Wallet({});
            // wallet.id=uuid();
            // wallet.type=this.params.type;
            // wallet.name='导入钱包-助记词';
            // wallet.address=ret.walletAddr;
            // wallet.isBackup=true;
            // wallet.passwordInfo=this.params.passwordInfo;
            // wallet.privateKey=ret.encPrivateKey;
            // this.$storage.insertWallet(wallet);
            // this.$rpc__.registerAddress(wallet.type,wallet.address,'import')
            //   .then(result=>this.$emit('added', wallet.id))
            //创建新钱包
          } catch (e) {
            this.$message({message: e, type: 'error'});
            console.log(e);
          }
        },
        // 根据keystore导入
        doneImportByKeystore:function () {
          try{
            this.params.check();
            this.$lpc__.importKeystore(this.params.type,this.params.keystore,this.params.password)
              .then(ret=>{
                let wallet =new Wallet({});
                wallet.id=uuid();
                wallet.type=this.params.type;
                wallet.name='导入钱包-Keystore';
                wallet.address=ret.walletAddr;
                wallet.isBackup=true;
                wallet.privateKey=ret.encPrivateKey;
                this.$storage.insertWallet(wallet);
                this.$rpc__.registerAddress(wallet.type,wallet.address,'import')
                  .then(result=>this.$emit('added', wallet.id))
              })
            // todo 需删除
            // let ret =this.$lpc__.importKeystore(this.params.type,this.params.keystore,this.params.password);
            // let wallet =new Wallet({});
            // wallet.id=uuid();
            // wallet.type=this.params.type;
            // wallet.name='导入钱包-Keystore';
            // wallet.address=ret.walletAddr;
            // wallet.isBackup=true;
            // wallet.privateKey=ret.encPrivateKey;
            // this.$storage.insertWallet(wallet);
            // this.$rpc__.registerAddress(wallet.type,wallet.address,'import')
            //   .then(result=>this.$emit('added', wallet.id))
          }catch (e) {
            console.log(e);
            this.$message({message: e, type: 'error'});
          }
        },
        //根据私钥导入
        doneImportByPrivatekey:function () {
          try{
            this.params.check();
            this.$lpc__.importPrivatekey(this.params.type,this.params.privateKey,this.params.password)
              .then(ret=>{
                console.log(ret,'import.......')
                let wallet =new Wallet({});
                wallet.id=uuid();
                wallet.type=this.params.type;
                wallet.name='导入钱包-PrivateKey';
                wallet.address=ret.walletAddr;
                wallet.isBackup=true;
                wallet.privateKey=ret.encPrivateKey;
                this.$storage.insertWallet(wallet);
                this.$rpc__.registerAddress(wallet.type,wallet.address,'import')
                  .then(result=>this.$emit('added', wallet.id))
              })
            // todo 需删除
            // let ret =this.$lpc__.importPrivatekey(this.params.type,this.params.privateKey,this.params.password);
            // let wallet =new Wallet({});
            // wallet.id=uuid();
            // wallet.type=this.params.type;
            // wallet.name='导入钱包-PrivateKey';
            // wallet.address=ret.walletAddr;
            // wallet.isBackup=true;
            // wallet.privateKey=ret.encPrivateKey;
            // this.$storage.insertWallet(wallet);
            // this.$rpc__.registerAddress(wallet.type,wallet.address,'import')
            //   .then(result=>this.$emit('added', wallet.id))
            // // this.$emit('added', wallet.id);
          }catch (e) {
            console.log(e);
            this.$message({message: e, type: 'error'});
          }
        }
      }
    }
</script>

<style scoped>
  @import "./../assets/css/ImportWallet.css";
</style>
