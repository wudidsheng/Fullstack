<template>
  <el-row>
    <el-col :span="20">
      <h1>所有管理员</h1>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="_id" label="id"></el-table-column>
         
        <el-table-column prop="username" label="名称"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
            <el-button type="text" size="small" @click="editrow(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.$ajax.get("/rest/useradmin").then(data => {
      this.tableData = data.data;
    });
  },
  methods: {
    //   删除当前
    handleClick(row) {
      this.$confirm(`确认删除${row.name}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
       await this.$ajax.delete(`/rest/useradmin/${row._id}`, { data: { name: 123 } });
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.$ajax.get("/rest/useradmin").then(data => {
          this.tableData = data.data;
        });
      });
    },
    editrow(row){
        this.$router.push(`/admin/${row._id}`)
    }
  }
};
</script>

<style>
</style>