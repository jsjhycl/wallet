import storage from './storage'
//返回本地需保存数据
global.csharptojs=function() {
  return JSON.stringify(storage.getLocalData());
}
