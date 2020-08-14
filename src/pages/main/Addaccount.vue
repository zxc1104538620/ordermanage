<template>
  <div id="Addaccount">
    <div>添加账号</div>
    <div>
      <div>
        <p>账号</p>
        <el-input v-model="acc" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <p>密码</p>
        <el-input placeholder="请输入密码" show-password v-model="pwd"></el-input>
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
      <el-button type="primary" class="add" @click="clickAdd">添加</el-button>
      <el-button>重置</el-button>
    </div>
  </div>
</template>

<script>
import { addAcc } from "../../api/apis.js";
export default {
  data() {
    return {
      acc: "",
      pwd: "",
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
      userGroup: "",
    };
  },
  methods: {
    clickAdd() {
      addAcc(this.acc, this.pwd, this.userGroup).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "success",
            offset: 50,
          });
        }
        else{
          this.$message({
            message: res.data.msg,
            type: "error",
            offset: 50,
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
#Addaccount {
  background-color: white;
  padding-bottom: 40px;
  > div:first-child {
    border-bottom: 1px solid #e9e9e9;
    margin-bottom: 10px;
    line-height: 50px;
    font-size: 18px;
    padding: 0px 16px;
  }
  > div:last-child {
    > div {
      display: flex;
      padding-left: 26px;
      margin: 15px;
      > div {
        width: 400px;
      }
      > p {
        width: 80px;
        line-height: 40px;
      }
    }
    > .add {
      margin-left: 120px;
      margin-top: 20px;
    }
  }
}
</style>