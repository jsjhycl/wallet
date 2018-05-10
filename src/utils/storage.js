import rpc from './rpchelper'
import {transaction,TransferItem} from "./models";
export  default Storage= {
  initData:function(data){
    Object.keys(data).forEach(key=>{
      localStorage.setItem(key,JSON.stringify(data[key]));
    })
  },
  getLocalData:function(){
    let obj ={
      "bcb_wallets":this.getWallets(),
      "bcb_users":this.getUsers(),
      "bcb_transfers":this.getLocalTransfers()
    }
    return obj;
  },
  /*获取用户的本地钱包*/
  getWallets: function () {
    let strWallets = localStorage.getItem('bcb_wallets') || '[]';
    return JSON.parse(strWallets);
  },
  /*获取钱包分类*/
  getWalletTypes: function () {
    // return ['ETH', 'BCB', 'TOT'];
    return [{"name":"ETH","value":"0x3"}]
  },
  /*保存钱包*/
  insertWallet: function (wallet) {
    let wallets = this.getWallets();
    wallets.push(wallet);
    localStorage.setItem('bcb_wallets', JSON.stringify(wallets));
  },
  updateWallet:function(id,obj){
    let wallets =this.getWallets();
    let item = wallets.find(m=>m.id==id);
    if(item) {
      Object.keys(obj).forEach(key => {
        if (key in item) item[key] = obj[key];
        localStorage.setItem('bcb_wallets', JSON.stringify(wallets));
      })
    }
  },
  generatorWords: function (_words, len) {
    let words =[].concat(_words);
    len = len || words.length;
    // let allWords = ["中国", "花朵", "friend", "老师", "同性恋", "girl", "比特币", "好基友", "1314"].concat(words);
    // let results = Array.from(new Set(allWords)).sort();
    // return results.slice(0, len < results.length ? len : results.length - 1);
    for(let i=0;i<50;i++){
      let index = Math.floor(Math.random()*len);
      let temp =words[0];
      words[0] =words[index];
      words[index] =temp;
    }
    return words;
  },
  getWalletById: function (id) {
    let wallet = this.getWallets().find(m => m.id === id);
    wallet.resources=wallet.resources||[];
    wallet.resources.forEach(item=>{
      item.balance=0;
      item.money=0;
    })
    return wallet;
  },
  /*获取指定资产的服务端数据*/
  getServerResourceInfo:function(coinType,contractAddr,symbol,address){
    return rpc.getBalanceInfo(coinType,contractAddr,address)
      .then(balance=>{
        return rpc.getExchangesObj(coinType)
          .then(exchangeObj=>{
            return {
              contractAddr:contractAddr,
              balance:balance,
              money:balance*exchangeObj[symbol]
            }
          })
      })
  },
  /*获取资产列表的服务端数据*/
  getServerMultiResourceInfo:function(coinType,resources=[],address){
    return Promise.all([...resources.map(item=>rpc.getBalanceInfo(coinType,item.contractAddr,address)),
    rpc.getExchangesObj(coinType)])
      .then(datas=>{
        let exchangeObj =datas[datas.length -1];
        return resources.map((item,index)=>{
          return {
            contractAddr:item.contractAddr,
            balance:datas[index],
            money:datas[index]*exchangeObj[item.name]
          }
        })
      })
    // return Promise.all(resources.map(item=>this.getServerResourceInfo(coinType,item.contractAddr,item.name,address)));
  },
  //返回资产列表
  getAssets: function () {
    return rpc.getAssets();
  },
//  设置资源
  setResourceForWallet: function (walletId, resources) {
    let wallets = this.getWallets();
    let current = wallets.find(m => m.id === walletId);
    current.resources = resources || [];
    localStorage.setItem('bcb_wallets', JSON.stringify(wallets));
  },
  //删除钱包
  removeWalletById: function (id) {
    let wallets = this.getWallets();
    wallets.splice(wallets.findIndex(m => m.id === id), 1);
    localStorage.setItem('bcb_wallets', JSON.stringify(wallets));
  },
  /*获取联系人*/
  getUsers: function () {
    let strUsers = localStorage.getItem('bcb_users') || '[]';
    return JSON.parse(strUsers);
  },
//  新建用户
  addUser: function (user) {
    let users = this.getUsers();
    users.push(user);
    localStorage.setItem('bcb_users', JSON.stringify(users));
  },
//  删除用户
  removeUser:function (user) {
    let users =this.getUsers();
    users.splice(users.findIndex(m=>m.id===user.id),1);
    localStorage.setItem('bcb_users', JSON.stringify(users));
    return users;
  },
  getUserById:function(id){
    let users =this.getUsers();
    return users.find(m=>m.id===id);
  },
  updateUser:function(user){
    let users =this.getUsers();
    let current = users.find(m=>m.id===user.id);
    Object.keys(user).forEach(key=>{
      if(key in current) current[key]=user[key];
    })
    localStorage.setItem('bcb_users', JSON.stringify(users));
  },
  //获取本地交易明细
  getLocalTransfers:function(){
    let strTransfers= localStorage.getItem('bcb_transfers')||'[]';
    return JSON.parse(strTransfers);
  },
  //获取交易明细(含本地和服务端);翻页时会一直显示本地交易数据
  getAllTransactions:function(coinType,address,contractAddr,page,count) {
    return rpc.getTransactions(coinType, address, contractAddr, page, count)
      .then(result => {
        let datas = [], items = result.records;
        //获取本地数据(根据合约号过滤)
        let localsTransactions = this.getLocalTransfers().filter(m=>m.conAddr===contractAddr);
        localsTransactions.forEach(litem => {
          let findItem = items.find(m => m.txHash == litem.sessionId);
          if (!findItem) datas.unshift(new transaction().fromLocalByObj(address, litem));
        });
        items.forEach(item => datas.push(new transaction().fromServer(item)));
        result.records = datas;
        return result;
      })
  },
  //新增本地转账记录
  addLocalTransfer:function (obj) {
    let transfers =this.getLocalTransfers();
    transfers.push(obj);
    localStorage.setItem('bcb_transfers', JSON.stringify(transfers));
  },
  removeLocalTransfers:function (objs) {
    let transfers =this.getLocalTransfers();
    for(let item of objs){
      console.log(item)
      let index =transfers.findIndex(m=>m.sessionId===item.txHash);
      if(index<0) continue;
      transfers.splice(index,1);
    }
    localStorage.setItem('bcb_transfers', JSON.stringify(transfers));
    return transfers;
  },
//  获取交易记录
  getTransactionFromServer:function (coinType,address,conAddr,page,count) {
    return rpc.getTransactions(coinType,address,conAddr,page,count);
  },
  /*根据tx_hash查询交易状态*/
  getTransactionByTxhash(coinType,ids){
    let reqs =ids.map(id=>rpc.getTransactionByTxhash(coinType,id));
    return Promise.all(reqs);
  }
}
