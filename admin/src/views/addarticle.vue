<template>
  <el-row>
    <h1>{{ID?"编辑":'新增'}}装备</h1>
    <el-col :span="20">
      <el-form label-width="200px" @submit.native.prevent="addclass">
        <el-form-item label="装备名称">
          <el-input type="text" v-model="module.name"></el-input>
        </el-form-item>
        <el-form-item label="装备图标">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:3000/upload"
            :headers='gethaeder()'
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="module.icon" :src="imgurl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
        icon: ""
      },
      imgurl: "",
      options: {}
    };
  },
  methods: {
    //   上传成功
    handleAvatarSuccess(res, file) {
      console.log(file, res);
      this.imgurl = URL.createObjectURL(file.raw);
      this.module.icon = res.url;
    },
    addclass() {
      if (this.module.name) {
        if (!this.ID) {
          this.$ajax.post("rest/article", this.module).then(() => {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.module.name = "";
            this.module.icon = "";
            this.imgurl = "";
          });
        } else {
          this.$ajax
            .put(`cert/${this.ID}`, {
              name: this.module.name,
              father: this.module.father
            })
            .then(() => {
              this.$message({
                message: "更改成功",
                type: "success"
              });
              this.$router.push("/articlelist");
            });
        }
      } else {
        this.$message({
          message: "输入内容不能为空",
          type: "warning"
        });
      }
    }
    //转化未baser64图片
  },
  created() {
    if (this.ID) {
      this.$ajax.get("/rest/article/" + this.ID).then(data => {
        console.log(data.data);
        this.module.name = data.data.name;
        this.module.icon = data.data.icon;
        this.imgurl = data.data.icon;
      });
    }
  }
};
</script>
<style >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>