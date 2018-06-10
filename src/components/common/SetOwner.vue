<template>
  <div>
    <div class="modal-body">
      <ul class="modalList list-unstyled">
        <li>
          <p>币种</p>
          <select v-model="asset.name" class="modalInput modalSelStyle" disabled>
            <option v-for="item in wallet.resources" :value="item.name">{{item.name}}</option>
          </select>
        </li>
        <li>
          <p>地址</p>
          <div class="modalInput tool-right-input">
            <input v-model="toAdress" class="modalInpStyle" type="text">
            <el-dropdown trigger="click" @command="addAddressHandler">
              <span class="color64AFEA">选择地址<i class="el-icon-arrow-down el-icon--right"></i></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="user"  v-for="user in users" :key="user.id">{{user.firstName+" "+user.lastName}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <p class="colorFF9191 marT">转账前请务必确认地址及币种信息无误</p>
        </li>
        <li>
          <p>添加备注</p>
          <input v-model="memo" class="modalInput" type="text">
        </li>
      </ul>
    </div>
    <div class="modalFooter">
      <!--<button @click="submit" :disabled="isPaying" v-loading="isPaying" type="button" class="btn btn-primary">转账</button>-->
      <button type="button" class="btn btn-primary" @click="submit">转移</button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "SetOwner",
      data:()=>({
        toAdress:'',
        memo:'',
        users:[]
      }),
      props:['wallet','asset','users'],
      methods: {
        submit() {
          this.$checkPassword(this.wallet.id, false)
            .then(password => {
              this.$lpc__.bcb_setOwer(this.wallet.type,
                this.wallet.privateKey,
                password,
                this.asset.contractAddr,
                undefined,
                this.toAdress)
                .then(ret => {
                  //返回txhash不需要处理
                })
            })
        },
        addAddressHandler(command) {
          this.toAdress = command.address;
        }
      }
    }
</script>

<style scoped>
  @import "../../assets/css/personalRecord.css";
</style>
