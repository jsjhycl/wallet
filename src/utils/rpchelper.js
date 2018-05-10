import axios from 'axios'
import common from './common'
function getUrl(path) {
  let stuff ='https://www.blockwallet.pro/api/v1/';
  return stuff+path;
}
export default {
  /*获取资产列表*/
  getAssets(type = '0x3') {
    return axios.get(getUrl(`assets/${type}`))
      .then(result => {
        return common.unwrapHttp__(result);
      })
  },
  /*获取原始汇率素组*/
  getExchanges(coinType='0x3') {
    return axios.get(getUrl(`exchanges/${coinType}`))
      .then(result => common.unwrapHttp__(result));
  },
  /*获取资金&余额信息*/
  getBalanceInfo(coinType, contractAddr, address) {
    return axios.get(getUrl(`addrs/token_balance/single/${coinType}/${contractAddr}/${address}`))
      .then(result =>parseFloat(common.unwrapHttp__(result).balance))
  },
  /*获取完整的汇率对象*/
  getExchangesObj(coinType) {
    return this.getExchanges(coinType)
      .then(result => {
        return result.reduce((obj, item) => {
          obj[item.symbol] = item.price;
          return obj;
        }, {})
      });
  },
  /*获取交易记录*/
  getTransactions(coinType,address,contractAddr,page=1,count=20) {
    return axios.get(getUrl(`addrs/transactions/${coinType}/${address}?conAddr=${contractAddr}&page=${page}&count=${count}`))
      .then(data => common.unwrapHttp__(data))
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
  }
}
