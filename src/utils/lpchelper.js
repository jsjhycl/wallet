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
          "gasLimit": gasLimit,
          "gasPrice": gasPrice
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
        initSupply: obj.initSupply*Math.pow(10,9),
        addSupplyEnabled: obj.addSupplyEnabled,
        burnEnabled: obj.burnEnabled,
        gasPrice: obj.gasPrice*Math.pow(10,3),
        gasLimit: obj.gasLimit,
        note: obj.note
      }
    }
    return common.excute('bcb_createCoin', sender);
  }
}
