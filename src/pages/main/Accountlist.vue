<template>
  <div id="Accountlist">
    <div>账号列表</div>
    <div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="账号" width="120">
          <template slot-scope="scope">{{ scope.row.account }}</template>
        </el-table-column>
        <el-table-column prop="userGroup" label="用户组" width="120"></el-table-column>
        <el-table-column prop="ctime" label="创建时间" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="reviseBtn(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deletee(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <div style="margin-top: 20px">
        <el-button @click="deleteIdArr" type="danger">批量删除</el-button>
        <el-button type="primary">取消选择</el-button>
      </div>
    </div>
    <div class="reviseBox" v-show="flag">
      <h3>
        修改账号
        <span @click="off">×</span>
      </h3>
      <div>
        <p>账号</p>
        <el-input v-model="acc" placeholder="输入新账号"></el-input>
      </div>
      <div>
        <p>用户组</p>
        <el-select v-model="userGroup" placeholder="请选择用户组">
          <el-option
            v-for="item in options"
            :key="item.userGroup"
            :label="item.label"
            :value="item.userGroup"
          ></el-option>
        </el-select>
      </div>
      <el-button type="primary" @click="revise">提交更改</el-button>
    </div>
  </div>
</template>

<script>
import { acclist, deleteAcc, deleteIdsArr, reviseAcc } from "../../api/apis.js";
export default {
  data() {
    return {
      flag: false,
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      deleteId: "",
      id: "",
      acc: "",
      userGroup: "",
      options: [
        {
          userGroup: "超级管理员",
          label: "超级管理员",
        },
        {
          userGroup: "普通管理员",
          label: "普通管理员",
        },
      ],
    };
  },
  methods: {
    revise() {
      reviseAcc(this.id, this.acc, this.userGroup).then((res) => {
        this.$message({
          message: res.data.msg,
          type: "success",
          offset: 50,
        });
        this.flag = false;
        this.sendAxios()
      });
    },
    reviseBtn(row) {
      this.id = row.id;
      this.acc = row.account;
      this.userGroup = row.userGroup;
      this.flag = true;
    },
    off() {
      this.flag = false;
    },
    deleteIdArr() {
      deleteIdsArr(this.deleteId).then((res) => {
        this.$message({
          message: res.data.msg,
          type: "success",
          offset: 50,
        });
      });
      this.sendAxios()
    },
    handleSelectionChange(val) {
      var arr = val;
      var arr1 = [];
      for (let i of arr) {
        arr1.push(i.id);
      }

      this.deleteId = JSON.stringify(arr1);
      console.log(this.deleteId);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      console.log(this.pageSize);
      this.sendAxios()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      console.log(this.currentPage);
      this.sendAxios()
    },
    deletee(row) {
      deleteAcc(row.id).then((res) => {
        this.$message({
          message: res.data.msg,
          type: "error",
          offset: 50,
        });
        this.sendAxios()
      });
    },
    sendAxios() {
      acclist(this.currentPage, this.pageSize).then((res) => {
        this.total = res.data.total;
        this.tableData = res.data.data;
        for (let i = 0; i < this.tableData.length; i++) {
          console.log(this.tableData[i].ctime);
          var newTime = new Date(this.tableData[i].ctime);
          newTime = `${newTime.getFullYear()}-${
            Number(newTime.getMonth()) >= 10
              ? newTime.getMonth() + 1
              : "0" + (newTime.getMonth() + 1)
          }-${
            Number(newTime.getDate()) >= 10
              ? newTime.getDate()
              : "0" + newTime.getDate()
          }
            ${
              Number(newTime.getHours()) >= 10
                ? newTime.getHours()
                : "0" + newTime.getHours()
            }:${
            Number(newTime.getMinutes()) >= 10
              ? newTime.getMinutes()
              : "0" + newTime.getMinutes()
          }:${
            Number(newTime.getSeconds()) >= 10
              ? newTime.getSeconds()
              : "0" + newTime.getSeconds()
          }`;
          this.tableData[i].ctime = newTime;
          this.tableData[i].ischange = false;
        }
      });
    },
  },
  created() {
    this.sendAxios()
  },
};
</script>

<style lang="less" scoped>
#Accountlist {
  background-color: white;
  padding-bottom: 40px;
  > div:first-child {
    border-bottom: 1px solid #e9e9e9;
    margin-bottom: 10px;
    line-height: 50px;
    font-size: 18px;
    padding: 0px 16px;
  }
  > div:nth-child(2) {
    padding: 20px 0px 20px 20px;
  }
  .reviseBox {
    border: 1px solid black;
    border-radius: 10px;
    background-color: rgb(250, 250, 250);
    width: 260px;
    padding: 10px 20px 20px 20px;
    position: absolute;
    top: 50%;
    margin-top: -90px;
    left: 50%;
    margin-left: -150px;
    > h3 {
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      span {
        cursor: pointer;
      }
    }
    > div {
      margin-bottom: 10px;
      display: flex;
      div {
        width: 200px;
      }
      p {
        width: 60px;
        line-height: 40px;
      }
    }
    > button {
      margin-left: 60px;
    }
  }
}
</style>