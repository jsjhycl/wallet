<template>
  <div class="walletRightCenter">
    <ul id="myTab" class="nav nav-tabs">
      <li class="active">
        <a href="#Memorizingords" data-toggle="tab">助记词</a>
      </li>
      <li><a href="#OfficialWallet" data-toggle="tab">官方钱包</a></li>
      <li><a href="#privateKey" data-toggle="tab">私钥</a></li>
      <li><a @click="$message('暂不实现')"  href="#observation" >观察</a></li>
    </ul>
    <div id="myTabContent" class="tab-content">
      <div class="tab-pane fade in active" id="Memorizingords">
        <ul class="list-unstyled">
          <li>
            <select v-model="info.type" class="foundLiInput">
              <option v-for="item in walletTypes" :value="item.value">{{item.name}}</option>
            </select>
          </li>
          <li>
            <textarea v-model="info.helpWords" class="foundLiInput foundTextArea" placeholder="助记词,按空格分隔"></textarea>
          </li>
          <li>
            <input v-model="info.path" class="foundLiInput" type="text" placeholder="m/44/60/0/0">
          </li>
          <li>
            <input v-model="info.password" class="foundLiInput" type="password" placeholder="密码">
          </li>
          <li>
            <input v-model="info.repeatPassword" class="foundLiInput" type="password" placeholder="重复密码">
          </li>
          <li>
            <input v-model="info.passwordInfo" class="foundLiInput" type="text" placeholder="密码提示信息（可不填）">
          </li>
        </ul>
        <label class="select">
          <input v-model="info.isRead" type="checkbox" class="chk_1">
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
            <select v-model="keyStoreInfo.type" class="foundLiInput">
              <option v-for="item in  walletTypes" :value="item.value">{{item.name}}</option>
            </select>
          </li>
          <li>
            <textarea v-model="keyStoreInfo.keystore" class="foundLiInput foundTextArea" placeholder="keystore 文本内容"></textarea>
          </li>
          <li>
            <input v-model="keyStoreInfo.password" class="foundLiInput" type="password" placeholder="keystore 密码">
          </li>
        </ul>
        <label class="select">
          <input v-model="keyStoreInfo.isRead" type="checkbox" class="chk_1">
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
            <select v-model="privateKeyInfo.type" class="foundLiInput">
              <option v-for="item in walletTypes" :value="item.value">{{item.name}}</option>
            </select>
          </li>
          <li>
            <textarea v-model="privateKeyInfo.key" class="foundLiInput foundTextArea" placeholder="明文私钥"></textarea>
          </li>
          <li>
            <input v-model="privateKeyInfo.password" class="foundLiInput" type="text" placeholder="密码">
          </li>
          <li>
            <input v-model="privateKeyInfo.repeatPassword" class="foundLiInput" type="text" placeholder="重复密码">
          </li>
          <li>
            <input v-model="privateKeyInfo.passwordInfo" class="foundLiInput" type="text" placeholder="密码提示信息（可不填）">
          </li>
        </ul>
        <label class="select">
          <input v-model="privateKeyInfo.isRead" type="checkbox" class="chk_1">
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
    export default {
      name: "ImportWallet",
      data: () => ({
        walletTypes: [],
        info: {},
        keyStoreInfo:{},
        privateKeyInfo:{},
        isRead: false,
        repeatPassword: ''
      }),
      created: function () {
        this.walletTypes = this.$storage.getWalletTypes();
        this.info = {type: 'ETH', password: '', repeatPassword:'',passwordInfo: '',helpWords:'',path:'',isRead:false};
        this.keyStoreInfo ={type:'ETH',keystore:'',password:'',isRead:false};
        this.privateKeyInfo ={type:'',key:'',password:'',repeatPassword:'',passwordInfo:'',isRead:false};
      },
      methods:{
        doneImportByHelpWord:function () {
          if(!this.info.type||!this.info.helpWords||!this.info.password){
            this.$message({message:"录入信息不完整.",type:"error"});
            return;
          }
          if(this.info.password!=this.info.repeatPassword){
            this.$message({message:"密码不一致.",type:"error"});
            return;
          }
          if(!this.info.isRead){
            this.$message({message:"请仔细阅读并同意服务条款！.",type:"error"});
            return;
          }
          console.log(this.info);
          this.$alert('不知道怎么导入，需要确认算法流程.数据见console')
        },
        doneImportByKeystore:function () {
          if(!this.keyStoreInfo.type||!this.keyStoreInfo.keystore||!this.keyStoreInfo.password){
            this.$message({message:'请填写必要信息.',type:'error'});
            return;
          }
          if(!this.keyStoreInfo.isRead){
            this.$message({message:"请仔细阅读并同意服务条款！.",type:"error"});
            return;
          }
          //执行导入
          console.log(this.keyStoreInfo);
          this.$alert('不知道怎么执行.');
        },
        doneImportByPrivatekey:function () {
          if(!this.privateKeyInfo.type||!this.privateKeyInfo.key||!this.privateKeyInfo.password){
            this.$message({message:'请填写必要信息.',type:'error'});
            return;
          }
          if(this.privateKeyInfo.password!=this.privateKeyInfo.repeatPassword){
            this.$message({message:'密码不一致.',type:'error'});
            return;
          }
          if(!this.privateKeyInfo.isRead){
            this.$message({message:'请仔细阅读并同意服务条款！',type:'error'});
            return;
          }
          console.log(this.privateKeyInfo);
          this.$alert('不知道怎么处理，需确认.');
        }
      }
    }
</script>

<style scoped>
  @import "./../assets/css/ImportWallet.css";
</style>
