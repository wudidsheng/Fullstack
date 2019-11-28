<template>
  <el-row>
    <h1>{{ID?"编辑":'新增'}}文章</h1>
    <el-col :span="20">
      <el-form label-width="200px" @submit.native.prevent="addclass">
        <el-form-item label="上级分类">
          <el-select v-model="module.classf" placeholder="请选择">
            <el-option v-for="item in options" :key="item._id" :label="item.name" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-input type="text" v-model="module.title"></el-input>
        </el-form-item>
        <el-form-item label="详情">
          <vueEditor
            debug
            v-model="module.body"
            :option="{fontNames : [
            '宋体',
            '隶书',
            '微软雅黑',
            'Arial',
            'Tahoma',
            'Verdana'
        ]}"
          />
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
        classf: "",
        title: "",
        body: ""
      },
      options: []
    };
  },
  methods: {
    addclass() {
      if (this.module.title) {
        if (!this.ID) {
          this.$ajax.post("/rest/news", this.module).then(() => {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.module.title = "";
            this.module.body=''
          });
        } else {
          this.$ajax.put(`/rest/news/${this.ID}`, this.module).then(() => {
            this.$message({
              message: "更改成功",
              type: "success"
            });
            this.$router.push("/newsedit");
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
    getallcet() {
      this.$ajax.get("/cert").then(data => {
        data.data.map(item => {
          if (item.father && item.father.name === "新闻资讯") {
            this.options.push(item);
          }
        });
      });
    }
  },
  created() {
    this.getallcet();
    if (this.ID) {
      this.$ajax.get(`/rest/news/${this.ID}`).then(data => {
        this.module = data.data;
      });
    }
  }
};
</script>
  
<style>
</style>