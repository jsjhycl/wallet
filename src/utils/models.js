export class Wallet {
  id='';
  type='';
  name='';
  passwordInfo='';
  head='headImg.png';
  privateKey='';
  encMnemonicWords='';
  address='';
  isBackup=false;
  resources=[];
  constructor(opt){
  }
  prepare(opt){
    Object.keys(opt).forEach(key=>{
      if(key in this) this[key]=opt[key];
    })
  }
}

/*创建交易是实体表*/
export class TransferItem {
  sessionId='';
  coinType='';
  toAdress='';
  amount=0;
  memo='';
  action='卖';
  state=0;
  conAddr='';
  constructor(){}
  check(){
    if (!this.toAdress || !this.amount) {
      throw "请填入必填信息:地址/数量"
    }
    if (this.amount <= 0) {
      throw "转账金额必须大于0"
    }
  }
}

/*交易记录*/
export class transaction {
  "from" = "";
  "to" = "";
  "value" = "";
  "valueName" = "";
  "fee" = "";
  "feeName" = "";
  "txHash" = "";
  "blockN" = "";
  "timeStamp" = "";
  "memo" = "";
  "conAddr" = "";
  "status"="";
  "source" ="";
  "isSelected"=false;//魔数变量
  get strStatus(){
    if(this.status==='0x1') return '成功';
    else if(this.status==='0x100') return '打包中'
    else return '错误';
  };
  get isSuccess(){
    return this.status==='0x1';
  }
  create(from,to,value,valueName,fee,feeName,txHash,blockN,timeStamp,memo,conAddr,source){
    this.from=from;
    this.value=value;
    this.valueName=valueName;
    this.fee=fee;
    this.feeName=feeName;
    this.txHash=txHash;
    this.blockN=blockN;
    this.timeStamp=timeStamp;
    this.memo=memo;
    this.conAddr=conAddr;
    this.source=source;
  };
  fromServer(obj){
    Object.keys(obj).forEach(key=>{
      if(key in this) this[key]=obj[key];
    });
    this.source="场外";
    if(!('status' in this)||this.status) this.status='0x1';
    return this;
  };
  fromLocal(from,to,value,txHash,memo){
    this.from=from;
    this.to=to;
    this.value=value;
    this.valueName='BCB';
    this.txHash=txHash;
    this.memo=memo;
    this.status="0x100";//打包中...
    this.source="场内";
    return this;
  };
  fromLocalByObj(address,obj){
    this.from=address;
    this.to=obj.toAdress;
    this.value=obj.amount;
    this.valueName=obj.coinType;
    this.txHash=obj.sessionId;
    this.memo=obj.memo;
    this.status="0x100";//打包中...
    this.source="场内";
    return this;
  };
  complexByHashData(obj){//直接修改源对象
    console.log('in hash ...',obj)
    this.from=obj.from;
    this.to=obj.to;
    this.blockN=obj.blockNumber;
    this.status=obj.status;
    return this;
  }
}

/*配置对象实体*/
export class Config {
  language='中文';//语言
  coinFractionLen=4;//比小数位
  lawCoinFractionLen=3;//法币小数位
  formObj(obj){
    Object.keys(obj).forEach(key=>{
      if(key in this) this[key]=obj[key];
    });
    this.language=this.language||'中文';
    this.coinFractionLen=this.coinFractionLen||4;
    this.lawCoinFractionLen=this.lawCoinFractionLen||3;
    return this;
  }
}

