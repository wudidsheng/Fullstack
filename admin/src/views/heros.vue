<template>
  <el-row>
    <h1>{{ID?"编辑":'新增'}}英雄</h1>
    <el-row :span="20">
      <el-form label-width="200px" @submit.native.prevent="addclass">
        <el-tabs type="border-card" value="first">
          <el-tab-pane label="基本信息" name="first">
            <el-form-item label="英雄名称">
              <el-input type="text" v-model="module.name"></el-input>
            </el-form-item>
            <el-form-item label="英雄称号">
              <el-input type="text" v-model="module.title"></el-input>
            </el-form-item>
            <el-form-item label="英雄图标">
              <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1:3000/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
              >
                <img v-if="module.icon" :src="imgurl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="英雄定位">
              <el-select v-model="module.position" multiple placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="英雄难度">
              <el-row>
                <el-col :span="4" :offset="1" class="linecetner">
                  技能:
                  <el-rate v-model="module.Difficult.skill"></el-rate>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4" :offset="1" class="linecetner">
                  攻击:
                  <el-rate v-model="module.Difficult.attack"></el-rate>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4" :offset="1" class="linecetner">
                  生存:
                  <el-rate v-model="module.Difficult.save"></el-rate>
                </el-col>
              </el-row>
            </el-form-item>
            <!-- 出装 -->
            <el-form-item label="顺风出装">
              <el-select v-model="module.downwind" multiple placeholder="请选择">
                <el-option
                  v-for="item in equipment"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="顺风出装">
              <el-select v-model="module.agwind" multiple placeholder="请选择">
                <el-option
                  v-for="item in equipment"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="使用技巧">
              <el-input
                type="textarea"
                style="width:50%"
                :rows="5"
                placeholder="请输入内容"
                v-model="module.usetips"
              ></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="技能" name="second">
            <el-row>
              <el-col>
                <el-button @click="module.skills.push({name: '', icon:'',desc:'',tips:''})">添加技能</el-button>
              </el-col>
              <el-col :span="10" :offset="1" v-for="(item,index) in module.skills" :key="index">
                <el-form-item label="名称">
                  <el-input v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item label="图标">
                  <el-upload
                    class="avatar-uploader"
                    action="http://127.0.0.1:3000/upload"
                    :show-file-list="false"
                    :on-success="res=>item.icon=res.url"
                  >
                    <img v-if="item.icon" :src="item.icon" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="技能描述">
                  <el-input type="textarea" v-model="item.desc" :rows="4"></el-input>
                </el-form-item>
                <el-form-item label="小提示">
                  <el-input type="textarea" v-model="item.tips" :rows="4"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="warning" @click="handupsu(index)">删除</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>

        <el-form-item>
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-row>
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
        icon: "",
        title: "",
        position: "",
        Difficult: { skill: 0, attack: 0, save: 0 },
        skills: [],
        downwind: [],
        agwind: []
      },
      imgurl: "",
      options: [],
      equipment: [] //装备
    };
  },
  methods: {
    //   上传成功
    handleAvatarSuccess(res, file) {
      console.log(file, res);
      this.imgurl = URL.createObjectURL(file.raw);
      this.module.icon = res.url;
    },
    //删除一个技能
    handupsu(index) {
      this.module.skills.splice(index, 1);
    },
    addclass() {
      if (this.module.name) {
        if (!this.ID) {
          this.$ajax.post("rest/hero", this.module).then(() => {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.module.name = "";
            this.module.icon = "";
            this.imgurl = "";
          });
        } else {
          this.$ajax.put(`rest/hero/${this.ID}`, this.module).then(() => {
            this.$message({
              message: "更改成功",
              type: "success"
            });

            this.$router.push("/heroedit");
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
      this.$ajax.get("/rest/hero/" + this.ID).then(data => {
        console.log(data.data);
        this.module = Object.assign({}, this.module, data.data);

        this.imgurl = data.data.icon;
      });
    }
    //所有分类
    this.$ajax.get("/cert").then(data => {
      data.data.map(item => {
        if (
          item.hasOwnProperty("father") &&
          item.father._id == "5dc7a4ed8d6a1236a03daf22"
        ) {
          this.options.push(item);
        }
      });
    });
    //所有装备
    this.$ajax.get("/rest/article").then(data => {
      this.equipment = data.data;
    });
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
.linecetner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>