<template>
  <el-row>
    <h1>{{ID?"编辑":'新增'}}管理员</h1>
    <el-col :span="20">
      <el-form label-width="200px" @submit.native.prevent="addclass">
        <el-form-item label="用户名">
          <el-input type="text" v-model="module.username" minlength=8 maxlength=16></el-input>
        </el-form-item>
          <el-form-item label="密码">
          <el-input type="password" v-model="module.password" show-password ></el-input>
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
  props: {
    ID: ""
  },
  data() {
    return {
      module: {
        username: "",
       password:""
      }
    };
  },
  methods: {
    addclass() {
      if (this.module.username) {
        if (!this.ID) {
          this.$ajax.post("/rest/useradmin", this.module).then(() => {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.module.name = "";
          });
        } else {
          this.$ajax
            .put(`/rest/useradmin/${this.ID}`, this.module)
            .then(() => {
              this.$message({
                message: "更改成功",
                type: "success"
              });
              this.$router.push("/adminlist");
            });
        }
      } else {
        this.$message({
          message: "输入内容不能为空",
          type: "warning"
        });
      }
    },
    // 获取父级分类
 
  },
  created() {
   
    if (this.ID) {
      this.$ajax.get(`/rest/useradmin/${this.ID}`).then(data => {
        console.log(data.data);
        this.module=data.data
      });
    } 
  }
  
};
</script>
  
<style>
</style>