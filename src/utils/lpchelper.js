import common from './common'

export default {
  /*1 创建钱包*/
  createWallet(coinType,password) {
    return common.excute("bcb_createWallet",
      {
        "coinType": coinType,
        "password": password
      });
  },
  /*2 获取解密助记词*/
  decMnemonicWords(coinType, encMonemonicWords, password) {
    return common.excute('bcb_decMnemonicWords', {
        "coinType": coinType,
        "encMonemonicWords": encMonemonicWords,
        "password": password
      }
    )
  },
  /*3 修改密码*/
  changePwd(coinType, encPrivateKey, oldPassword, newPassword, encMnemonicWords) {
    return common.excute('bcb_changePwd', {
      "coinType": coinType,
      "encPrivateKey": encPrivateKey,
      "encMnemonicWords": encMnemonicWords,
      "oldPassword": oldPassword,
      "newPassword": newPassword
    })
  },
  /*4 导出明文私钥*/
  outputPrivateKey(coinType, encPrivateKey, password) {
    return common.excute('bcb_exportPrivateKey', {
      "coinType": coinType,
      "encPrivateKey": encPrivateKey,
      "password": password
    })
  },
  /*5 导出KeyStore*/
  outputKeyStore(coinType, encPrivateKey, password) {
    return common.excute('bcb_exportKeystore', {
      "coinType": coinType,
      "encPrivateKey": encPrivateKey,
      "password": password
    })
  },
  /*6 转账*/
  transferCoin(cointype, pwd, securePrivatekey, address, amount, contractAddr, gasPrice = 10, gasLimit = 100000) {
    return common.excute('bcb_transferCoin', {
      "coinType": cointype,
      "encPrivateKey": securePrivatekey,
      "password": pwd,
      "coinParam":
        {
          "to": address,
          "value": amount,
          "contractAddr": contractAddr,
          "gasLimit": gasLimit.toString(),
          "gasPrice": gasPrice.toString()
        }
    })
  },
  /*7 导入助记词-创建新钱包*/
  importMnemonicSentence(cointype, MnemonicSentence, keyPath, pwd) {
    return common.excute('bcb_importMnemonicWords', {
      "coinType": cointype,
      "mnemonicWords": MnemonicSentence,
      "keyPath": keyPath,
      "password": pwd
    })
  },
  /*8 导入privateKey-创建新钱包*/
  importPrivatekey(cointype, privatekey, pwd) {
    return common.excute('bcb_importPrivateKey', {
      "coinType": cointype,
      "privateKey": privatekey,
      "password": pwd
    })
  },
  /*9 导入keystore-创建新钱包*/
  importKeystore(cointype, keystore, pwd) {
    return common.excute('bcb_importKeystore', {
      "coinType": cointype,
      "keystore": keystore,
      "password": pwd
    })
  },
  /*10 验签密码*/
  verify(coinType, pwd, securePrivatekey) {
    return common.excute('bcb_verifyPwd', {
      "coinType": coinType,
      "encPrivateKey": securePrivatekey,
      "password": pwd
    })
  },
  /*11 创建代币*/
  createCoin(obj) {
    let sender= {
      coinType: obj.coinType,
      encPrivateKey: obj.encPrivateKey,
      password:obj.password,
      coinParam: {
        name: obj.name,
        symbol: obj.symbol,
        initSupply: (obj.initSupply*Math.pow(10,9)).toString(),
        addSupplyEnabled: obj.addSupplyEnabled,
        burnEnabled: obj.burnEnabled,
        // gasPrice: (obj.gasPrice*Math.pow(10,3)).toString(),
        gasPrice: (obj.gasPrice).toString(),
        gasLimit: obj.gasLimit,
        note: obj.note
      }
    }
    return common.excute('bcb_createCoin', sender);
  },
  /* 12 setGasPrice*/
  bcb_setGasprice(cointype,securePrivatekey,pwd,contractAddr,gasLimit=100000,gasPrice){
    return common.excute('bcb_setGasprice', {
      "coinType": cointype,
      "encPrivateKey": securePrivatekey,
      "password": pwd,
      "coinParam":
        {
          "contractAddr": contractAddr,
          // "note":"hello_for_newcoin",
          "note":"",
          "gasLimit": gasLimit.toString(),
          "gasPrice": (gasPrice*1000).toString()
        }
    })
  },
  /* 13 bcb_addSupply*/
  bcb_addSupply(cointype,securePrivatekey,pwd,contractAddr,gasLimit=100000,value){
    return common.excute('bcb_addSupply', {
      "coinType": cointype,
      "encPrivateKey": securePrivatekey,
      "password": pwd,
      "coinParam":
        {
          "contractAddr": contractAddr,
          // "note":"hello_for_newcoin",
          "note":"",
          "gasLimit": gasLimit.toString(),
          "value": value.toString()
        }
    })
  },
  /* 14 bcb_burn*/
  bcb_burn(cointype,securePrivatekey,pwd,contractAddr,gasLimit=100000,value){
    return common.excute('bcb_burn', {
      "coinType": cointype,
      "encPrivateKey": securePrivatekey,
      "password": pwd,
      "coinParam":
        {
          "contractAddr": contractAddr,
          // "note":"hello_for_newcoin",
          "note":"",
          "gasLimit": gasLimit.toString(),
          "value": value.toString()
        }
    })
  },
  /* 15 bcb_setOwer*/
  bcb_setOwer(cointype,securePrivatekey,pwd,contractAddr,gasLimit=100000,address){
    return common.excute('bcb_setOwer', {
      "coinType": cointype,
      "encPrivateKey": securePrivatekey,
      "password": pwd,
      "coinParam":
        {
          "contractAddr": contractAddr,
          // "note":"hello_for_newcoin",
          "note":"",
          "gasLimit": gasLimit.toString(),
          "toAddr": address
        }
    },false)
  },
  /* 16 6.1	bcb_calcChecksum*/
  bcb_calcChecksum(str){
    let hexstring =strToHexCharCode(str);
    return common.excute('bcb_calcChecksum', {
      "tbcData":hexstring
    })
  },
  /* 8.20	bcb_newToken*/
  createCoin3(obj) {
    let sender= {
      coinType: obj.coinType,
      encPrivateKey: obj.encPrivateKey,
      password:obj.password,
      coinParam: {
        contractAddr:'bcbtestGbVExQNicpNd6FH6gWdoip6xH5GMG2XxG',
        name: obj.name,
        symbol: obj.symbol,
        initSupply: (obj.initSupply*Math.pow(10,9)).toString(),
        addSupplyEnabled: obj.addSupplyEnabled,
        burnEnabled: obj.burnEnabled,
        // gasPrice: (obj.gasPrice*Math.pow(10,3)).toString(),
        gasPrice: (obj.gasPrice).toString(),
        gasLimit: obj.gasLimit,
        note: obj.note
      }
    }
    return common.excute('bcb_newToken', sender);
  },
  /* 8.21	bcb_setFee*/
  bcb_setFee(obj,coinType,encPrivateKey,password){
    let sender= {
      coinType: coinType,
      encPrivateKey: encPrivateKey,
      password:password,
      coinParam: {
        contractAddr:obj.contractAddr,
        ratio:obj.ratio,
        maxFee:obj.maxFee,
        minFee:obj.minFee,
        gasLimit:obj.gasLimit,
        note:obj.note
      }
    }
    return common.excute('bcb_setFee', sender);
  },
  /* 8.22	bcb_setGasPayer*/
  bcb_setGasPayer(obj,coinType,encPrivateKey,password){
    let sender= {
      coinType: coinType,
      encPrivateKey: encPrivateKey,
      password:password,
      coinParam: {
        contractAddr:obj.contractAddr,
        payer:obj.payer,
        gasLimit:obj.gasLimit,
        note:obj.note
      }
    }
    return common.excute('bcb_setGasPayer', sender);
  },
  /* 8.23	bcb_withdraw*/
  bcb_withdraw(obj,coinType,encPrivateKey,password){
    let sender= {
      coinType: coinType,
      encPrivateKey: encPrivateKey,
      password:password,
      coinParam: {
        contractAddr:obj.contractAddr,
        payer:obj.payer,
        gasLimit:obj.gasLimit,
        note:obj.note
      }
    }
    return common.excute('bcb_withdraw', sender);
  }
}


//目前是按照utf8编码
function strToHexCharCode(str) {
  if(str === "")
    return "";
  var hexCharCode = [];
  hexCharCode.push("0x");
  for(var i = 0; i < str.length; i++) {
    hexCharCode.push((str.charCodeAt(i)).toString(16));
  }
  return hexCharCode.join("");
}
