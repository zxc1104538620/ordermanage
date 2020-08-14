<template>
  <div id="Productadd">
    <div>商品添加</div>
    <div>
      <div>
        <p>商品名称</p>
        <el-input placeholder="商品名称" v-model="proName"></el-input>
      </div>
      <div>
        <p>商品分类</p>
        <el-select v-model="value" placeholder="请选择商品分类">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div>
        <p>商品价格</p>
        <el-input-number v-model="price" :min="1" :max="10">{{price}}</el-input-number>
      </div>
      <div>
        <p>商品图片</p>
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:5000/goods/goods_img_upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div>
        <p>商品描述</p>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
      </div>
      <el-button type="primary" @click="addProduct">添加商品</el-button>
    </div>
  </div>
</template>

<script>
import { categories, goodsadd } from "../../api/apis.js";
export default {
  data() {
    return {
      dialogVisible: false,
      options: [],
      value: "",
      price: 0,
      imgUrl: "",
      textarea: "",
      proName: "",
      imageUrl: "",
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.imgUrl = res.imgUrl;
      console.log(file);
    },
    addProduct() {
      goodsadd(
        this.proName,
        this.value,
        this.price,
        this.imgUrl,
        this.textarea
      ).then((res) => {
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
      });
    },
  },
  created() {
    categories().then((res) => {
      let arr = [];
      for (let i = 0; i < res.data.categories.length; i++) {
        arr.push(res.data.categories[i].cateName);
        this.options.push({});
      }
      for (let i = 0; i < arr.length; i++) {
        this.options[i].value = arr[i];
        this.options[i].label = arr[i];
      }
    });
  },
};
</script>

<style lang="less" scoped>
#Productadd {
  background-color: white;
  border-radius: 6px;
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
      > p {
        width: 80px;
        line-height: 40px;
      }
    }
    > div:first-child,
    div:last-child {
      > div {
        width: 400px;
      }
    }
    > button {
      margin: 50px 0px 50px 30px;
    }
  }
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