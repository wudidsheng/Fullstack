<template>
  <el-row class="tac">
    <el-col class="head">
      <el-row>
        <el-col :span="4" :offset=1>网站内容管理</el-col>
        <el-col :span="4" class="cover">
          <img src="../assets/visti.png" alt srcset /> 预览网站
        </el-col>
        <el-col :span="4" class="cover">
          <img src="../assets/change.png" alt srcset />
          修改密码
        </el-col>
        <el-col :span="4" class="cover">
          <img src="../assets/exit.png" alt srcset />
          退出系统
        </el-col>
        <el-col :span="6"  style="text-align:right" class="cover" :offset=1>
          <img src="../assets/login.png" alt srcset /> 欢迎登陆
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="5">
      <el-menu
        router
        default-active="1"
        class="el-menu-vertical-demo"
        style="height:90vh"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="/newclass">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>新建分类</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/Alldect">
          <i class="el-icon-menu"></i>
          <span slot="title">分类列表</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="18" :offset="1">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
.head {
  background-color: rgb(142, 218, 248);
  height: 10vh;
  color: rgb(253, 253, 253);
  font-size: 28px;
  font-weight: bold;
  line-height: 10vh;
}
.cover {
  display: flex;

  align-items: center;
}
.cover > img {
  max-width: 70%;
  max-height: 70%;
  margin-right: 2%;
}
</style>