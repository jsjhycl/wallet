import storage from './storage'
//返回本地需保存数据
global.csharptojs=function() {
  ["bcb_wallets","bcb_users","bcb_transfers","bcb_config","bcb_assets"].forEach(fileName=>{
    storage._Save(fileName);
  });
  return new Date().toString();//JSON.stringify(storage.getLocalData());
}

