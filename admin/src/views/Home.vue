<template>
  <el-row class="tac">
    <el-col :span="5">
      <el-menu
      router
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="/newclass">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>新建分类</span>
          </template>
        </el-menu-item>
        <el-menu-item index="2">
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

<style>
</style>