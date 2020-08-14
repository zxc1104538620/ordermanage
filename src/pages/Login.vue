<template>
  <div id="Login">
    <div>
      <div>系统登录</div>
      <el-input placeholder="请输入内容" prefix-icon="el-icon-user-solid" v-model="acc"></el-input>
      <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="pwd" show-password></el-input>
      <p>{{err}}</p>
      <el-button type="primary" @click="clickLogin">登录</el-button>
    </div>
  </div>
</template>

<script>
import {login} from '../api/apis'
export default {
  data(){
    return{
      acc:'',
      pwd:'',
      err:''
    }
  },
  methods:{
    clickLogin(){
      login(this.acc,this.pwd).then((res)=>{
        if(res.data.code == 0){
          localStorage.setItem('role',res.data.role);
          localStorage.setItem('account',this.acc);
          localStorage.setItem('token',res.data.token);
          localStorage.setItem('id',res.data.id);
          this.$message({
          message: '登陆成功',
          type: 'success',
          offset:50
        });
          this.$router.push('/main/Index')
        }
        else{
          this.err = res.data.msg
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
#Login {
  background-color: #2d3a4b;
  width: 100%;
  height: 100%;
  > div {
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -250px;
    margin-top: -170px;
    width: 400px;
    height: 240px;
    padding:50px 50px;
    > div:first-child {
      color: white;
      text-align: center;
    }
    >div{
    margin-bottom: 30px;
    }
    .el-input {
      width: 400px;
    }
    button{
        width: 100%;
    }
  }
}
</style>