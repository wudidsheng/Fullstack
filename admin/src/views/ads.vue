<template>
  <el-row>
    <h1>{{ID?"编辑":'新增'}}广告</h1>
    <el-col :span="20">
      <el-form label-width="200px" @submit.native.prevent="addclass">
        <el-form-item label="名称">
          <el-input type="text" v-model="module.title"></el-input>
        </el-form-item>
        <el-form-item label="广告列表">
          <el-button @click="addads">添加广告</el-button>
          <el-row>
            <el-col
              v-for="(item,index) in module.bodys"
              :key="index"
              :span="10"
              :offset="1"
              style="padding-top:2rem"
            >
              <span>广告{{index+1}}</span>
              <el-divider></el-divider>
              <el-upload
                :headers='gethaeder()' 
                action="http://127.0.0.1:3000/upload"
                :show-file-list="false"
                :on-success="(res)=>item.image=res.url"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-input v-model="item.link" placeholder="连接路径"></el-input>
              <el-button @click="()=>{module.bodys.splice(index,1)}">删除</el-button>
            </el-col>
          </el-row>
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
        title: "",
        bodys: []
      },
      options: []
    };
  },
  methods: {
    //添加广告
    addads() {
      this.module.bodys.push({ image: "", link: "" });
    },
    addclass() {
      if (this.module.title) {
        if (!this.ID) {
          this.$ajax.post("/rest/ads", this.module).then(() => {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.module.title = "";
            this.module.body = "";
          });
        } else {
          this.$ajax.put(`/rest/ads/${this.ID}`, this.module).then(() => {
            this.$message({
              message: "更改成功",
              type: "success"
            });
            this.$router.push("/adsedit");
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
      this.$ajax.get(`/rest/ads/${this.ID}`).then(data => {
        this.module = data.data;
      });
    }
  }
};
</script>
  
<style>
</style>