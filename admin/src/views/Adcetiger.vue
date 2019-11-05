<template>
  <el-row>
    <h1>新建分类</h1>
    <el-col :span="20">
      <el-form label-width="200px" @submit.native.prevent="addclass">
        <el-form-item label="名称">
          <el-input type="text" v-model="module.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      module: {}
    };
  },
  methods: {
    addclass() {
      this.$ajax.post("cert", {name:this.module.name});
    }
  }
};
</script>
  
<style>
</style>