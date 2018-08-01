import Vue from 'vue'
import rpc from './rpchelper'
import {transaction,TransferItem,Config} from "./models";
export  default Storage= {
  initData: function (data) {
    console.log('get local data:',data);
    Object.keys(data).forEach(key => {
      localStorage.setItem(key, JSON.stringify(data[key]));
    })
  },
  getLocalData: function (key) {
    let obj = {
      "bcb_wallets": this.getWallets(),
      "bcb_users": this.getUsers(),
      "bcb_transfers": this.getLocalTransfers(),
      "bcb_config": this.getConfig(),
      "bcb_assets": this.getAssets()
    }
    return key?obj[key]: obj;
  },
  /*获取用户的本地钱包*/
  getWallets: function () {
    let strWallets = localStorage.getItem('bcb_wallets') || '[]';
    let wallets= JSON.parse(strWallets);
    wallets.forEach((w,index)=>{
      w.resources=w.resources||[];
      // if(w.resources.length>0 && (typeof w.resources[0])!="string") w.resources=[];
      w.head='head_'+index%12+'.png';
    })
    return wallets;
  },
  /*获取钱包分类*/
  getWalletTypes: function () {
    // return ['ETH', 'BCB', 'TOT'];
    // return [{"name": "BCBMainNet", "value": "0x1000"}]
    // return [{"name": "BCB", "value": "0x1001"}]
    return [{"name": "bcbtest", "value": "0x1001"}]
    // return [{"name": "ETH", "value": "0x3"},{"name": "BCBMainNet", "value": "0x10000"}]
  },
  /*根据地址判断钱包是否存在*/
  isExsitWallet(address) {
    let wallets = this.getWallets();
    return wallets.find(m => m.address === address) ? true : false;
  },
  /*保存钱包*/
  insertWallet: function (wallet) {
    let wallets = this.getWallets();
    let findIndex =wallets.findIndex(m=>m.address===wallet.address);
    if(findIndex>=0){
      wallets.splice(findIndex, 1);
    }
    // if(wallets.find(m=>m.address===wallet.address)) throw '不能重复创建钱包';
    wallets.push(wallet);
    localStorage.setItem('bcb_wallets', JSON.stringify(wallets));
    this._Save('bcb_wallets');
  },
  updateWallet: function (id, obj,checkKey=true) {
    let wallets = this.getWallets();
    let item = wallets.find(m => m.id == id);
    if (item) {
      Object.keys(obj).forEach(key => {
        if (checkKey && key in item) item[key] = obj[key];
        else item[key] =obj[key];
        localStorage.setItem('bcb_wallets', JSON.stringify(wallets));
        this._Save('bcb_wallets');
      })
    }
    return item;
  },
  generatorWords: function (_words, len) {
    let words = [].concat(_words);
    len = len || words.length;
    for (let i = 0; i < 50; i++) {
      let index = Math.floor(Math.random() * len);
      let temp = words[0];
      words[0] = words[index];
      words[index] = temp;
    }
    return words;
  },
  getWalletById: function (id) {
    let wallet = this.getWallets().find(m => m.id === id);
    wallet.resources = wallet.resources || [];
    //返回wallet里面的资产试图 todo 此算法不好可能回有bug
    // wallet.resources =wallet.resources.filter(m=>m.state).map(m=>{
    wallet.resources =wallet.resources.map(m=>{
      let assetItem=this.getAssetByConAddr(m.conAddr);
      return {name:assetItem.symbol,desc:assetItem.name,img:assetItem.coinIcon,contractAddr:assetItem.conAddr,balance:0,money:0,state:m.state};
    })
    return wallet;
  },
  /*获取指定资产的服务端数据*/
  getServerResourceInfo: function (coinType, contractAddr, symbol, address) {
    return rpc.getBalanceInfo(coinType, contractAddr, address)
      .then(balance => {
        return rpc.getExchangesObj(coinType)
          .then(exchangeObj => {
            return {
              contractAddr: contractAddr,
              balance: balance,
              money: balance * exchangeObj[symbol]
            }
          })
      })
  },
  /*获取资产列表的服务端数据以来接口9.5*/
  getServerMultiResourceInfo_v95: function (coinType, resources = [], address) {
    return Promise.all([...resources.map(item => rpc.getBalanceInfo(coinType, item.contractAddr, address)),
      rpc.getExchangesObj(coinType)])
      .then(datas => {
        let exchangeObj = datas[datas.length - 1];
        return resources.map((item, index) => {
          return {
            contractAddr: item.contractAddr,
            balance: datas[index],
            money: datas[index] * exchangeObj[item.name]
          }
        })
      })
  },
  getServerMultiResourceInfo: function (coinType, resources = [], address, currency = '美元') {
    return Promise.all([rpc.getAllCoin(coinType, address), rpc.getExchangesObj(coinType)])
      .then(datas => {
        let exchangeObj = datas[datas.length - 1];
        let coins = datas[0];
        return coins.filter(m => resources.findIndex(n => n.contractAddr.toLocaleLowerCase() === m.conAddr.toLocaleLowerCase()) >= 0)
          .map(item => ({
            contractAddr: item.conAddr,
            balance: item.balance,
            money: currency != '美元' ? (item.balance * exchangeObj[item.conAddr||item.symbol]||0) * exchangeObj['CNY']||0 : item.balance * exchangeObj[item.conAddr||item.symbol]||0
          }));
      })
  },
  //返回资产列表
  prepareAsset: function (coinType,useCache=true,useTri=true) {
    return rpc.getAssets(coinType,useCache,useTri).then(items => {
      items.forEach(item => item.from = 1);
      this.saveAssets(items);
    })
  },
  prepareAllAssets: function (coinTypes=['0x3','0x1001']) {
    Promise.all(coinTypes.map(c=>rpc.getAssets(c)))
      .then(datas=>{
        let items=[];
        datas.forEach(item=>items.push(...item));
        items.forEach(item => item.from = 1);
        // console.log('main created...',items)
        this.saveAssets(items);
      })
  },
  //get assets
  getAssets() {
    let strAssets = localStorage.getItem("bcb_assets") || '[]';
    return JSON.parse(strAssets);
  },
  getAssetsByCommonAndWallet(addr){
    let assets =this.getAssets();
    return assets.filter(m=>m.from===1||m.wallet_address===addr);
  },
  //根据合约地址获取指定资产
  getAssetByConAddr(conAddr){
    let asset =this.getAssets().find(m=>m.conAddr===conAddr);
    return asset;
  },
  //保存资产
  saveAssets(items) {
    if (!Array.isArray(items)) items = [items];
    let assets = this.getAssets();
    for (let item of items) {
      let findItem = assets.find(m => m.conAddr.toLocaleLowerCase() === item.conAddr.toLocaleLowerCase()&&(item.from===1||item.wallet_address===m.wallet_address));
      if (!findItem) assets.push(item);
      else findItem = item;
    }
    localStorage.setItem('bcb_assets', JSON.stringify(assets));
    this._Save('bcb_assets');
    return assets;
  },
//  删除资产
  removeAsset(item) {
    let assets = this.getAssets();
    let index = assets.findIndex(m => m.conAddr === item.conAddr&&m.wallet_address===item.wallet_address);
    if (index >= 0) assets.splice(index, 1);
    localStorage.setItem('bcb_assets', JSON.stringify(assets));
    this._Save('bcb_assets');
  },
//  设置资源
  setResourceForWallet: function (walletId, resources) {
    let wallets = this.getWallets();
    let current = wallets.find(m => m.id === walletId);
    current.resources = resources || [];
    localStorage.setItem('bcb_wallets', JSON.stringify(wallets));
    this._Save('bcb_wallets');
  },
  //根据钱包所具有的币更新资产表
  updateAssetsByCoins(coins,wallet) {
    let assets = this.getAssets();
    let newCoins = coins.filter(m => m.name &&
      m.symbol &&
      !assets.find(asset => asset.conAddr.toLocaleLowerCase() === m.conAddr.toLocaleLowerCase() && (asset.wallet_address === wallet.address || asset.from === 1)));
    let newAssets = newCoins.map(n => ({
      coinType: wallet.type,
      name: n.name,
      symbol: n.symbol,
      conAddr: n.conAddr,
      coinIcon: n.coinIcon || './static/defaultcoin.png',
      from: 0,
      wallet_address: wallet.address
    }));
    // console.log('update by coins:', newAssets);
    this.saveAssets(newAssets);
  },
  //删除钱包
  removeWalletById: function (id) {
    let wallets = this.getWallets();
    wallets.splice(wallets.findIndex(m => m.id === id), 1);
    localStorage.setItem('bcb_wallets', JSON.stringify(wallets));
    this._Save('bcb_wallets');
  },
  //删除钱包中的特定资产
  removeAssetInWallet(conAddr) {
    let wallets = this.getWallets();
    for (let wallet of wallets) {
      let resources = wallet.resources || [];
      let findIndex = resources.findIndex(m => m.conAddr === conAddr);
      if (findIndex >= 0)
        resources.splice(findIndex, 1)
    }
    localStorage.setItem('bcb_wallets', JSON.stringify(wallets));
    this._Save('bcb_wallets');
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
    this._Save('bcb_users')
  },
//  删除用户
  removeUser: function (user) {
    let users = this.getUsers();
    users.splice(users.findIndex(m => m.id === user.id), 1);
    localStorage.setItem('bcb_users', JSON.stringify(users));
    this._Save('bcb_users');
    return users;
  },
  getUserById: function (id) {
    let users = this.getUsers();
    return users.find(m => m.id === id);
  },
  updateUser: function (user) {
    let users = this.getUsers();
    let current = users.find(m => m.id === user.id);
    Object.keys(user).forEach(key => {
      if (key in current) current[key] = user[key];
    })
    localStorage.setItem('bcb_users', JSON.stringify(users));
    this._Save('bcb_users');
  },
  //获取本地交易明细
  getLocalTransfers: function () {
    let strTransfers = localStorage.getItem('bcb_transfers') || '[]';
    return JSON.parse(strTransfers);
  },
  //获取交易明细(含本地和服务端);翻页时会一直显示本地交易数据
  getAllTransactions: function (coinType, address, contractAddr, page, count,useCache,useTri) {
    return rpc.getTransactions(coinType, address, contractAddr, page, count,useCache,useTri)
      .then(result => {
        let datas = [], items = result.records.sort((a, b) => b.timeStamp - a.timeStamp);
        items.forEach(item => datas.push(new transaction().fromServer(item)));
        result.records = datas;
        return result;
      })
  },
  //新增本地转账记录
  addLocalTransfer: function (obj) {
    let transfers = this.getLocalTransfers();
    transfers.push(obj);
    localStorage.setItem('bcb_transfers', JSON.stringify(transfers));
    this._Save('bcb_transfers');
  },
  removeLocalTransfers: function (objs) {
    let transfers = this.getLocalTransfers();
    for (let item of objs) {
      let index = transfers.findIndex(m => m.sessionId === item.txHash);
      if (index < 0) continue;
      transfers.splice(index, 1);
    }
    localStorage.setItem('bcb_transfers', JSON.stringify(transfers));
    this._Save('bcb_transfers');
    return transfers;
  },
//  获取交易记录
  getTransactionFromServer: function (coinType, address, conAddr, page, count) {
    return rpc.getTransactions(coinType, address, conAddr, page, count);
  },
  /*根据tx_hash查询交易状态*/
  getTransactionByTxhash(coinType, ids) {
    let reqs = ids.map(id => rpc.getTransactionByTxhash(coinType, id));
    return Promise.all(reqs);
  },
  /*根据交易对象获取交易状态{type:'':txHash:''}*/
  getTransactionsByOrders(trans){
    let reqs =trans.map(item=>rpc.getTransactionByTxhash(item.type||'0x1001',item.txHash));
    return Promise.all(reqs);
  },
  /*获取配置列表*/
  getConfig() {
    let config = JSON.parse(localStorage.getItem('bcb_config') || '{}');
    return new Config().formObj(config);
  },
  /*设置配置列表*/
  saveConfig(obj) {
    localStorage.setItem('bcb_config', JSON.stringify(obj));
    this._Save('bcb_config');
  },
  /*初始化钱包资产，以及资产配置*/
  initAssetAndResources(walletId) {
    let wallets = this.getWallets();
    let assets = this.getAssets();
    let wallet = wallets.find(item => item.id === walletId);
    //  获取所有资产明细
    return rpc.getAllCoin(wallet.type, wallet.address).then(datas => {
      //初始化资产库
      let myAssets = datas.map(n => ({
        coinType: wallet.type,
        name: n.name,
        symbol: n.symbol,
        conAddr: n.conAddr,
        coinIcon: './static/defaultcoin.png',
        from: 0
      }));
      let newAssets = myAssets.filter(m => m.name && m.symbol && !assets.find(asset => asset.conAddr.toLocaleLowerCase() === m.conAddr.toLocaleLowerCase()));
      if (newAssets.length > 0) {
        this.saveAssets(newAssets);
        console.log('save new.............')
        let updates =Array.from(new Set([...wallet.resources || [], ...newAssets.map(item => item.conAddr)]));
        //  增量更新钱包资产
        this.updateWallet(wallet.id, {resources:updates });
      }
      if (!wallet.isVisited) {
        //  设置钱包资产(如果是首次添加所有资产)
        console.log('init all......')
        let updates = Array.from(new Set([...wallet.resources || [], ...myAssets.map(item => item.conAddr)]));
        this.updateWallet(wallet.id, {resources: updates, isVisited: true});
      }
      return;
    })
  },
  //保存数据到本地
  _Save(fileName){
    fileName=fileName||'data.json';
    if(Vue.$isLocal){
      let obj= this.getLocalData(fileName);
      bindObject.Save(fileName,JSON.stringify(obj));
    }
  }
}
