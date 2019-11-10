<template>
  <el-row>
    <h1>{{ID?"编辑":'新增'}}分类</h1>
    <el-col :span="20">
      <el-form label-width="200px" @submit.native.prevent="addclass">
        <el-form-item label="上级分类">
          <el-select v-model="module.father" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            ></el-option>
          </el-select>
        </el-form-item>
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
        name: "",
        father:""
      },
      options:{}
    };
  },
  methods: {
    addclass() {
      if (this.module.name) {
        if (!this.ID) {
          this.$ajax.post("cert", { name: this.module.name,father:this.module.father }).then(() => {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.module.name = "";
          });
        } else {
          this.$ajax
            .put(`cert/${this.ID}`, { name: this.module.name,father:this.module.father })
            .then(() => {
              this.$message({
                message: "更改成功",
                type: "success"
              });
              this.$router.push("/Alldect");
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
    getallcet(){
      this.$ajax.get("/cert").then(data=>{
        this.options=data.data;
      })
    }
  },
  created() {
     this.getallcet()
    if (this.ID) {
      this.$ajax.get(`/cert/${this.ID}`).then(data => {
        console.log(data.data);
        this.module.name = data.data.name;
        this.module.father = data.data.father;
      });
    } 
  }
  
};
</script>
  
<style>
</style>