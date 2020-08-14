<template>
  <div id="Changepwd">
    <div>修改密码</div>
    <div>
      <div>
        <p>原密码</p>
        <el-input v-model="oldPwd" @input="testOldpwd" placeholder="请输入内容"></el-input>
        <p v-show="flag1" class="tip">原密码不正确</p>
      </div>
      <div>
        <p>新密码</p>
        <el-input placeholder="请输入密码" v-model="newPwd" show-password></el-input>
      </div>
      <div>
        <p>确认新密码</p>
        <el-input placeholder="请输入密码" v-model="newPwd2" show-password @input="testNewPwd"></el-input>
        <p v-show="flag2" class="tip">两次密码不一致</p>
      </div>
      <el-button type="primary" class="add" @click="submit">确定</el-button>
      <el-button>重置</el-button>
    </div>
  </div>
</template>

<script>
import { testoldPwd, ChangePwd } from "../../api/apis.js";
export default {
  data() {
    return {
      flag1: false,
      flag2: false,
      oldPwd: "",
      newPwd: "",
      newPwd2: "",
    };
  },
  methods: {
    testNewPwd() {
      // console.log(1);
      if (this.newPwd == this.newPwd2) {
        this.flag2 = false;
        console.log(this.flag2);
      } else {
        this.flag2 = true;
      }
    },
    testOldpwd() {
      testoldPwd(this.oldPwd, localStorage.id).then((res) => {
        if (res.data.code == "0") {
          this.flag1 = false;
        } else {
          this.flag1 = true;
        }
      });
    },
    submit() {
      if (this.flag1 == false && this.flag2 == false) {
        ChangePwd(this.newPwd, Number(localStorage.id)).then((res) => {
          console.log(res.data);
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
#Changepwd {
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
        width: 90px;
        line-height: 40px;
      }
      .tip {
        color: red;
        width: 120px;
      }
    }
    > .add {
      margin-left: 130px;
      margin-top: 20px;
    }
  }
}
</style>