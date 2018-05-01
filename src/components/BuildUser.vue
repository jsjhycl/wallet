<template>
  <div class="walletRightCenter padT">
    <div class="buildUser">
      <div class="buildUserImgWrap">
        <img class="buildUserImg" src="../assets/img/user.png">
      </div>
      <ul class="buildUserInfo list-unstyled">
        <li>
          <input v-model="user.firstName" class="foundLiInput" type="text" placeholder="名">
        </li>
        <li>
          <input v-model="user.lastName" class="foundLiInput" type="text" placeholder="姓">
        </li>
        <li>
          <input v-model="user.address" class="foundLiInput" type="text" placeholder="收款人钱包地址">
        </li>
        <li>
          <input v-model="user.tel" class="foundLiInput" type="text" placeholder="手机号">
        </li>
        <li>
          <input v-model="user.email" class="foundLiInput" type="text" placeholder="邮箱">
        </li>
        <li>
          <input v-model="user.memo" class="foundLiInput" type="text" placeholder="备注">
        </li>
      </ul>
    </div>
    <div class="btnGroupSm">
      <button @click="saveUser" class="btn btn-primary btnStyle marRL">保存</button>
    </div>
  </div>
</template>

<script>
  import uuid from 'uuid/v1'
    export default {
      name: "BuildUser",
      data: () => ({
        isNew:true,
        user: {
          id: uuid(),
          firstName: '',
          lastName: '',
          address: '',
          tel: '',
          email: '',
          memo: ''
        }
      }),
      created:function(){
        let id=this.$route.query.id;
        this.isNew =!id;
        if(!this.isNew){
          this.user =this.$storage.getUserById(id);
        }
      },
      methods: {
        saveUser: function () {
          if (!this.user.address || !this.user.firstName) {
            this.$message({message: '请填写必要信息：名/收款地址',type:"error"});
            return;
          }
          //  执行保存
          if(this.isNew) this.$storage.addUser(this.user);
          else this.$storage.updateUser(this.user);
          this.$router.replace({name:'users'});
        }
      }
    }
</script>

<style scoped>
  @import "../assets/css/buildUser.css";
</style>
