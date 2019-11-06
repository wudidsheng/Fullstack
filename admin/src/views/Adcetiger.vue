<template>
  <el-row>
    <h1>{{ID?"编辑":'新增'}}分类</h1>
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
  props: {
    ID: ""
  },
  data() {
    return {
      module: {
        name: ""
      }
    };
  },
  methods: {
    addclass() {
      if (this.module.name) {
        if (!this.ID) {
          this.$ajax.post("cert", { name: this.module.name }).then(() => {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.module.name = "";
          });
        } else {
          this.$ajax
            .put(`cert/${this.ID}`, { name: this.module.name })
            .then(() => {
              this.$message({
                message: "更改成功",
                type: "success"
              });
              this.$router.push("/Alldect")
            });
        }
      } else {
        this.$message({
          message: "输入内容不能为空",
          type: "warning"
        });
      }
    }
  },
  created() {
    if (this.ID) {
      this.$ajax.get(`/cert/${this.ID}`).then(data => {
        console.log(data.data);
        this.module.name = data.data.name;
      });
    } else return "";
  }
};
</script>
  
<style>
</style>