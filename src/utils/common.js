import mock from './mock'
import rpc from './rpchelper'
import Vue from 'vue';

export default {
  /*封装成功结果*/
  __success(obj) {
    return {
      "id": "",
      "jsonrpc": "2.0",
      "result": obj
    }
  },
  /*封装失败结果*/
  __error(code, message, obj) {
    return {
      "id": "",
      "jsonrpc": "2.0",
      "error":
        {
          "code": code,
          "message": message,
          "data": ""
        }
    }
  },
  /*unwrap*/
  unwrap__(obj) {
    if ('error' in obj) {
      throw obj.error.code + "~" + obj.error.message;
    } else {
      return obj.result;
    }
  },
  unwrapHttp__(obj){
    //基本判断，正常不需要
    if(obj.status!==200){
      throw obj;
    }
    if(obj.data.code===0) return obj.data.result;
    else{
      let errorMsg =obj.data.code+"~"+obj.data.message;
      console.log('http result(error):',errorMsg);
      throw errorMsg;
    }
  },
  excute(method,obj){
    if(Vue.$isLocal) return this.excute_local(method,obj);
    else return this.excute_web(method,obj);
  },
  excute_web(method,obj) {
    let opt = {
      "jsonrpc": "2.0",
      "method": method,
      "params": Object.assign(
        {
          coinType: '0x3'
        }, obj),
      "id": ""
    };
    console.log("excute:", opt);
    return rpc.excuteLocalApi(opt)
      .then(result => {
        result= this.unwrap__(result);
        console.log('local result-remote(success):',result);
        return result;
      }).catch(e => {
        console.log('local result(error):', e);
        Vue.prototype.$message({"message": "出现错误：" + e, "type": "error",'showClose':true,'duration':0});
        throw e;
      })
  },

  excute_local(method, obj) {
    let opt = {
      "jsonrpc": "2.0",
      "method": method,
      "params": Object.assign(
        {
          coinType: '0x3'
        }, obj),
      "id": ""
    };
    console.log("excute:",opt);
    /*执行本地调用*/
    try{
      let result = this.unwrap__(JSON.parse(bindObject.JsMethod(JSON.stringify(opt))));
      console.log('local result(success):',result)
      return Promise.resolve(result);
    }catch (e) {
      console.log('local result(error):', e);
      Vue.prototype.$message({"message":"出现错误："+e,"type":"error",'showClose':true,'duration':0});
      throw e;
      // return this.unwrap__({result:mock[method]});
    }
  }
}
