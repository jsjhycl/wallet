import mock from './mock'
import spark from 'spark-md5'
import rpc from './rpchelper'
import Vue from 'vue';
import ERROR from './error'
let jobs =[];
export default {
  addJobs(url){
    if(!jobs.includes(url)) jobs.push(url);
  },
  getJobs(){
    return jobs;
  },
  removeJob(job){
    jobs.splice(jobs.findIndex(m=>m===job),1);
  },
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
      let message =obj.error.code in ERROR?ERROR[obj.error.code][Vue.$Lang]:obj.error.message;
      throw message;
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
      // let errorMsg =obj.data.code+"~"+obj.data.message;
      let errorMsg =obj.data.code in ERROR?ERROR[obj.data.code][Vue.$Lang]:obj.data.message;
      console.log('http result(error):',obj.data.code+"~"+obj.data.message);
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
        Vue.prototype.$message({"message": "出现错误：" + e, "type": "error"});
        throw '-*-'+e;
      })
  },

  excute_local(method, obj,usedefault) {
    usedefault=usedefault===undefined?true:false;
    let opt = {
      "jsonrpc": "2.0",
      "method": method,
      "params": usedefault? Object.assign(
        {
          coinType: '0x3'
        }, obj):{},
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
      Vue.prototype.$message({"message":"出现错误："+e,"type":"error"});
      throw e;
      // return this.unwrap__({result:mock[method]});
    }
  },
  //缓存数据
  SaveCache(url,data) {
    let key =spark.hash(url);
    let cache = this.GetCache();
    cache[key] = data;
    // console.log("save cache:",url,data)
    if (Vue.$isLocal) {
      bindObject.Save('cache.json',JSON.stringify(cache));
    } else {
      localStorage.setItem('__wallet_cache',JSON.stringify(cache));
    }
  },
  GetCacheData(url,useTri=true) {
    let key = spark.hash(url);
    let cache = this.GetCache();
    let data = cache[key];
    if(data&&useTri) this.reFetchCache(url);//this.addJobs(url);
    return data;
  },
  GetCache(){
    let cache={};
    if(Vue.$isLocal){
      cache =JSON.parse(bindObject.Read('cache.json','{}'));
    }else{
      cache =JSON.parse(localStorage.getItem('__wallet_cache')||'{}') ;
    }
    return cache;
  },
  reFetchCache(url){
    setTimeout(async ()=> {
      let data =await rpc.doneGet(url);
      //  判断数据是否有更新，触发事件
      Vue.Bus.$emit('upload',url,data);
      this.SaveCache(url,data);
    },500)
  }
}
