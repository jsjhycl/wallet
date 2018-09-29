import axios from 'axios'
import common from './common'
import lpc from './lpchelper'
function getUrl(path,isApi=true,version='v1') {
  // let stuff ='http://114.242.31.175:8443/api/v1/';
  // let stuff ='http://114.242.31.175:8443/api/v1/';
  // let stuff ='https://wallet.bcbchain.io/api/v1/';
  // let stuff ='https://testwallet.bcbchain.io'+(isApi?"/api/v1/":"/");
  // let stuff ='https://wallet.bcbchain.io'+(isApi?`/api/${version}/`:"/");
  let stuff ='https://testwallet.bcbchain.io'+(isApi?`/api/${version}/`:"/");
  // let stuff ='https://www.blockwallet.pro/api/v1/';
  return stuff+path;
}
function getExchangeUrl(path) {
  let exchangeUrl='https://bcbexchange.bcbchain.io/api/v1/';
  return exchangeUrl+path;
}

function doneCache(url,data,useCache=false) {
  // console.log(url,data);
  if (useCache)
    common.SaveCache(url, data);
  return data;
}

export default {
  /*获取资产列表*/
  // getAssets(type = '0x3',useCache=false) {
  //   let url =getUrl(`assets/${type}`), data;
  //   if(useCache&&(data=common.GetCacheData(url))){
  //     // console.log('from cache:',url,data)
  //     return Promise.resolve(data);
  //   }
  //   return axios.get(url)
  //     .then(result => {
  //       return doneCache(url,common.unwrapHttp__(result));
  //     })
  // },
  getAssets(type = '0x3',useCache=false,useTri=true) {
    let url =getUrl(`assets/${type}`), data;
    if(useCache&&(data=common.GetCacheData(url,useTri))){
      // console.log('from cache:',url,data)
      return Promise.resolve(data);
    }
    return axios.get(url)
      .then(result => {
        return doneCache(url,common.unwrapHttp__(result),useCache);
      })
  },
  /*获取原始汇率素组*/
  getExchanges(coinType='0x3',useCache=false,useTri=true) {
    let url=getUrl(`exchanges/${coinType}`),data;
    if(useCache&&(data=common.GetCacheData(url,useTri))){
      // console.log('from cache:',url,data)
      return Promise.resolve(data);
    }
    return axios.get(url)
      .then(result =>doneCache(url,common.unwrapHttp__(result),useCache))
  },
  /*获取资金&余额信息*/
  getBalanceInfo(coinType, contractAddr, address) {
    return axios.get(getUrl(`addrs/token_balance/single/${coinType}/${contractAddr}/${address}`))
      .then(result =>parseFloat(common.unwrapHttp__(result).balance))
  },
  /*获取完整的汇率对象*/
  getExchangesObj(coinType,useCache=false,useTri=true) {
    return this.getExchanges(coinType,useCache,useTri)
      .then(result => {
        return result.reduce((obj, item) => {
          obj[item.symbol] = item.price;
          if (item.conAddr)
            obj[item.conAddr] = item.price;
          return obj;
        }, {})
      });
  },
  /*获取交易记录*/
  getTransactions(coinType,address,contractAddr,page=1,count=20,useCache=false,useTri=true) {
    let url =getUrl(`addrs/transactions/${coinType}/${address}?conAddr=${contractAddr}&page=${page}&count=${count}`),data;
    if(useCache&&(data=common.GetCacheData(url,useTri))){
      // console.log('from cache:',url,data)
      return Promise.resolve(data);
    }
    return axios.get(url)
      .then(data =>doneCache(url,common.unwrapHttp__(data),useCache));
  },
  /*注册新钱包地址*/
  registerAddress(coinType,address,isNew){
    return axios.post(getUrl(`addrs/register/${coinType}/${address}?type=${isNew}`))
      .then(result=>common.unwrapHttp__(result));
  },
  /*根据txhash查询交易状态*/
  getTransactionByTxhash(coinType,tx_hash){
    return axios.get(getUrl(`txs/data/${coinType}/${tx_hash}`))
      .then(result=>common.unwrapHttp__(result));
  },
  /*获取交易行情*/
  getMarket(){
    return axios.get(getUrl(`market/price_level`))
      .then(result=>common.unwrapHttp__(result));
  },
  /*获取本地余额*/
  getBasicCoin(coinType,addr,useCache=false,useTri=true){
    let url=getUrl(`addrs/balance/${coinType}/${addr}`),data;
    if(useCache&&(data=common.GetCacheData(url,useTri))){
      // console.log('from cache:',url,data)
      return Promise.resolve(data);
    }
    return axios.get(url)
      .then(result=>doneCache(url,common.unwrapHttp__(result),useCache));
  },
  /*获取所有代币余额*/
  getAllProxyCoin(coinType,addr,useCache=false,useTri=true){
    let url=getUrl(`addrs/token_balance/all/${coinType}/${addr}`),data;
    if(useCache&&(data=common.GetCacheData(url,useTri))){
      // console.log('from cache:',url,data)
      return Promise.resolve(data);
    }
    return axios.get(url)
      .then(result=>doneCache(url,common.unwrapHttp__(result),useCache));
  },
  /*获取所有币余额*/
  getAllCoin(coinType,addr,useCache=false,useTri=true){
    let gets =coinType!='0x1001'?[this.getAllProxyCoin(coinType,addr,useCache,useTri),this.getBasicCoin(coinType,addr,useCache,useTri)]:[this.getAllProxyCoin(coinType,addr,useCache,useTri)];
    return Promise.all(gets)
      .then(datas=>{
        return datas.length>1? [...datas[0],datas[1]]:datas[0];
      })
  },
  /*获取本地接口数据*/
  excuteLocalApi(obj){
    return axios.post(getUrl('proxy-local-rpc'),JSON.stringify(obj))
      .then(result=>result.data);
  },
  /*获取代币当前量*/
  getContract(coinType,contractAddr){
    return axios.get(getUrl(`contract/${coinType}/${contractAddr}`))
      .then(result=>common.unwrapHttp__(result));
  },
  /*获取远端html文档*/
  getHtml(url){
    return axios.get(getUrl(url,false))
      .then(result=>result.data);
  },
  /* 获取转币地址*/
  async gen_bcbethaddr(addr){
    let strData =JSON.stringify({
      bcbMainAddr:addr,
      timestamp:Date.now()
    });
    let result =await lpc.bcb_calcChecksum(strData);
    return axios.post(getExchangeUrl(`addr/gen-bcbethaddr?checksum=${result.checkSum}`),strData)
      .then(result=>common.unwrapHttp__(result));
  },
  /* 获取换币记录*/
  async get_ethrecord(bcbETHAddr){
    return axios.get(getExchangeUrl(`addr/ethrecord/${bcbETHAddr}`))
      .then(result=>common.unwrapHttp__(result));
  },
  /* 通用get接口*/
  async doneGet(url){
    return axios.get(url)
      .then(result=>common.unwrapHttp__(result));
  },
  /*获取更新信息*/
  async getUpdateInfo(){
    // let url='https://testwallet.bcbchain.io/public/wallet/wallet-windows/update.json';
    let url='https://wallet.bcbchain.io/public/wallet/wallet-windows/update.json';
    let updateInfo =(await axios.get(url)).data;
    return updateInfo;
    // return Promise.resolve({
    //     "version":"1.0.1",
    //     "must":true
    //   }
    // );
  },
  /* 9.21	获取指定地址全部资产余额*/
  async getAllCoinV2(coinType,addr,LEGAL_MONEY='USD',useCache=false,useTri=true){
    let url=getUrl(`addrs/balance/${coinType}/${addr}/${LEGAL_MONEY}`,true,'v2'),data;
    if(useCache&&(data=common.GetCacheData(url,useTri))){
      return Promise.resolve(data);
    }
    return axios.get(url)
      .then(result=>doneCache(url,common.unwrapHttp__(result),useCache));
  }
}
