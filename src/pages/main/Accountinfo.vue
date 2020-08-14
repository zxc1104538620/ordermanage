<template>
  <div id="Accountinfo">
    <div>管理员信息</div>
    <div>
      管理员ID：
      <span>{{id}}</span>
    </div>
    <div>
      账号：
      <span>{{account}}</span>
    </div>
    <div>
      用户组：
      <span>{{userGroup}}</span>
    </div>
    <div>
      创建时间：
      <span>{{ctime}}</span>
    </div>
    <div>
      <p>管理员头像：</p>
      <div>
        <img :src="imgUrl" alt />
      </div>
      <div>
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:5000/users/avatar_upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :data="ids"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
import { accountinfo,  } from "../../api/apis.js";
export default {
  data() {
    return {
      id: "",
      account: "",
      userGroup: "",
      ctime: "",
      imgUrl: "",
      imageUrl: "",
      ids:{},
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(res);
      this.$bus.$emit('getNewHead')
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
  created() {
    accountinfo(localStorage.id).then((res) => {
      // console.log(res.data.accountInfo);
      this.id = res.data.accountInfo.id;
      this.account = res.data.accountInfo.account;
      this.userGroup = res.data.accountInfo.userGroup;
      var newTime = new Date(res.data.accountInfo.ctime);
      newTime = `${newTime.getFullYear()}-${
        Number(newTime.getMonth()) > 10
          ? newTime.getMonth() + 1
          : "0" + (newTime.getMonth() + 1)
      }-${
        Number(newTime.getDate()) > 10
          ? newTime.getDate()
          : "0" + newTime.getDate()
      }
       ${
         Number(newTime.getHours()) > 10
           ? newTime.getHours()
           : "0" + newTime.getHours()
       }:
       ${
         Number(newTime.getMinutes()) > 10
           ? newTime.getMinutes()
           : "0" + newTime.getMinutes()
       }:
       ${
         Number(newTime.getSeconds()) > 10
           ? newTime.getSeconds()
           : "0" + newTime.getSeconds()
       }`;
      this.ctime = newTime;
      this.imgUrl = res.data.accountInfo.imgUrl;
    });
    this.ids = {id:localStorage.id}
  },
};
</script>

<style lang="less" scoped>
#Accountinfo {
  background-color: white;
  padding: 0px 20px 20px 20px;
  > div {
    line-height: 50px;
    font-size: 14px;
    border-bottom: 1px solid #e9e9e9;
  }
  > div:last-child {
    display: flex;
    padding: 10px 0px;
    > div {
      width: 100px;
      height: 100px;
      background-color: #e9e9e9;
      margin-left: 20px;
      border: 1px solid #e9e9e9;
      > img {
        width: 100%;
        height: 100%;
      }
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
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
      }
      .avatar {
        width: 100px;
        height: 100px;
        display: block;
      }
    }
  }
}
</style>