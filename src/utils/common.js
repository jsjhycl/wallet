import mock from './mock'
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
    console.log(obj)
    if('error' in obj){
      console.log(obj.code + "~" + obj.message);
      throw obj.code + "~" + obj.message;
    }else return obj.result;
  },
  excute(method, obj) {
    let opt = {
      "jsonrpc": "2.0",
      "method": method,
      "params": Object.assign(
        {
          coinType: '0x3'
        }, obj),
      "id": ""
    };
    console.log("excute:",opt)
    /*执行本地调用*/
    return this.unwrap__({result:mock[method]});
  }
}
