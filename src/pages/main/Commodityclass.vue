<template>
  <div class="Commodityclass">
    <div class="header">
      <p>商品分类</p>
      <el-button type="primary" @click="addcate">添加分类</el-button>
    </div>
    <div class="list">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="序号" width="280"></el-table-column>
        <el-table-column prop="cateName" label="分类名称" width="280"></el-table-column>
        <el-table-column label="是否启用" width="280">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state"
              disabled
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="totala"
      ></el-pagination>
    </div>
    <div class="modal">
      <div>
        <el-dialog title="修改分类" :visible.sync="dialogVisible" width="30%">
          <div class="mBox">
            <div>
              <p>分类名称</p>
              <el-input v-model="cateName" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <p>是否启用</p>
              <el-switch v-model="state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="sendedit">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <div class="modal">
      <div>
        <el-dialog title="添加分类" :visible.sync="dialogVisibleNew" width="30%">
          <div class="mBox">
            <div>
              <p>分类名称</p>
              <el-input v-model="catenewName" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <p>是否启用</p>
              <el-switch v-model="newstate" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="sendadd">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { catelist, delcate, editcate,addcate } from "../../api/apis.js";
export default {
  data() {
    return {
      tableData: [],
      value: true,
      dialogVisible: false,
      totala: 0,
      currentPage: 1,
      pageSize: 5,
      cateName: "",
      state: "",
      id: "",
      boxtitle: "",
      catenewName: "",
      newstate: true,
      dialogVisibleNew:false,
    };
  },
  methods: {
    addcate() {
      this.dialogVisibleNew=true
    },
    sendadd(){
      addcate(this.catenewName,this.newstate).then((res)=>{
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "success",
            offset: 50,
          });
          this.dialogVisibleNew = false;
          this.getcatelist();
        }else {
          this.$message({
            message: res.data.msg,
            type: "error",
            offset: 50,
          });
        }
      })
    },
    handleEdit(row) {
      this.cateName = row.cateName;
      this.id = row.id;
      this.state = row.state;
      this.dialogVisible = true;
      this.boxtitle = "修改分类";
    },
    sendedit() {
      editcate(this.id, this.cateName, this.state).then((res) => {
        console.log(res.data);
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "success",
            offset: 50,
          });
          this.dialogVisible = false;
          this.getcatelist();
        } else {
          this.$message({
            message: res.data.msg,
            type: "error",
            offset: 50,
          });
        }
      });
    },
    handleDelete(row) {
      console.log(row.id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delcate(row.id).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                message: res.data.msg,
                type: "success",
                offset: 50,
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: "error",
                offset: 50,
              });
            }
            this.getcatelist();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getcatelist();
    },
    getcatelist() {
      catelist(this.currentPage, this.pageSize).then((res) => {
        this.totala = res.data.total;
        this.tableData = res.data.data;
        for (let i of this.tableData) {
          i.state = Boolean(i.state);
        }
      });
    },
  },
  created() {
    this.getcatelist();
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 0px 30px 10px 30px;
  > p {
    line-height: 30px;
  }
  > button {
    height: 30px;
    width: 80px;
    padding: 0px;
  }
}
.list {
  background-color: white;
  .el-pagination {
    text-align: center;
  }
}
.mBox {
  > div {
    display: flex;
    line-height: 40px;
    > p {
      width: 60px;
      margin-right: 20px;
    }
    .el-input {
      width: 200px;
    }
    .el-switch {
      margin-top: 10px;
    }
  }
}
</style>