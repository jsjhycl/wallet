export  default Storage= {
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
    return this.getWallets().find(m => m.id === id);
  },
  //返回资产列表
  getAssets: function () {
    return Promise.resolve([
      {name: 'ETH', desc: 'ETH is ETH', img: 'img1.png',contractAddr:'12314142'},
      {name: 'EMH', desc: 'EMH is EMH', img: 'img1.png',contractAddr:'223456'},
      {name: 'EAH', desc: 'EAH is EAH', img: 'img1.png',contractAddr:'3322321'},
      {name: 'EDH', desc: 'EDH is EDH', img: 'img1.png',contractAddr:'4452352'},
    ])
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
  //新增本地转账记录
  addLocalTransfer:function (obj) {
    let transfers =this.getLocalTransfers();
    transfers.push(obj);
    localStorage.setItem('bcb_transfers', JSON.stringify(transfers));
  },
  removeLocalTransfers:function (objs) {
    let transfers =this.getLocalTransfers();
    for(let item of objs){
      let index =transfers.findIndex(m=>m.sessionId===item.sessionId);
      if(index<0) continue;
      transfers.splice(index,1);
    }
    localStorage.setItem('bcb_transfers', JSON.stringify(transfers));
    return transfers;
  }
}
