<template>
  <el-card class="box-card center" style="width:40%">
    <div slot="header" class="clearfix">
      <h3 style="text-align:center">管理员登陆</h3>
    </div>
    <el-form abel-position="top" :model="module" @submit.native.prevent="login">
      <el-form-item label="账号" required>
        <el-input placeholder="账号" v-model="module.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" required>
        <el-input placeholder="密码" type="password" v-model="module.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">登陆</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      module: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      if (!this.module.username) {
        this.$message({
          message: " 账号输入不能为空",
          type: "warning"
        });
        return "";
      }
      if (!this.module.password) {
        this.$message({
          message: " 密码输入不能为空",
          type: "warning"
        });
        return "";
      }
      //获取token
      let token = await this.$ajax.post("/login", this.module);
      
      if (!token) {
        return "";
      }
//  加入全局状态
      this.$store.commit('settoken', token.data)
      //设置本地缓存
      sessionStorage.token = token.data;
      console.log(this.$store.state.token)
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.center {
  margin: 20vh auto;
}
</style>