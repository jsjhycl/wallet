<template>
  <div class="walletRightCenter padT">
    <ul class="noticeList list-unstyled">
      <li @click="selected(user)" v-for="user in users" class="noticeLi" :class="{active:user===selectedUser}">
        <div class="disFlex">
          <label class="select labelSelect">
            <input  type="radio" class="chk">
            <span class="sel spanSel"></span>
          </label>
          <div class="noticeLiText disFlex">
            <img class="userImg" src="../assets/img/user.png">
            <div>
              <p>{{user.firstName+' '+user.lastName}}</p>
              <p class="noticeLiAcceptor">{{user.address}}</p>
            </div>
          </div>
        </div>
        <div style="align-self: center;">
          <el-tooltip content="修改用户"><router-link  class="el-icon-edit" style="color:steelblue; font-size: 20px" :to="{path:'/adduser',query:{id:user.id}}" ></router-link></el-tooltip>
          <el-tooltip content="删除用户"><i @click="deleteUser" class="el-icon-delete" style="color:red;font-size: 20px" ></i></el-tooltip>
        </div>
      </li>
    </ul>
    <div class="btnGroupSm">
      <router-link  class="btn btn-primary btnStyle" to="/adduser">新建联系人</router-link>
      <!--<button @click="deleteUser" class="btn btn-danger btnStyle marRL">删除</button>-->
    </div>
  </div>
</template>

<script>
    export default {
      name: "WalletUser",
      data: () => ({users: [], selectedUser: {}}),
      created: function () {
        this.users = this.$storage.getUsers();
        this.$bindRefresh('refresh');
      },
      methods: {
        refresh:function(){
          this.users = this.$storage.getUsers();
        },
        deleteUser: function () {
          this.$confirm('您去顶要删除联系人吗？', '删除确认',{type:"warning"})
            .then(result => {
              this.users = this.$storage.removeUser(this.selectedUser);
            })
            .catch(err => console.log('删除用户出错：', err))
        },
        selected: function (item) {
          this.selectedUser = item;
        }
      }
    }
</script>

<style scoped>
  @import "../assets/css/walletUser.css";
  .noticeLi{
    justify-content: space-between;
  }
</style>
