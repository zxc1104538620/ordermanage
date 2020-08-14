<template>
  <div id="Productlist">
    <div>商品列表</div>
    <div>
      <el-table :data="tableData" style="width: 100%" max-height="600px">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="商品价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="商品图片">
                <img :src="'http://127.0.0.1:5000/upload/imgs/goods_img/'+props.row.imgUrl" alt />
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.ctime }}</span>
              </el-form-item>
              <el-form-item label="商品评价">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="商品销量">
                <span>{{ props.row.sellCount }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.goodsDesc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="商品分类" prop="category"></el-table-column>
        <el-table-column label="商品价格" prop="price"></el-table-column>
        <el-table-column label="商品图片" prop="imgUrl">
          <template slot-scope="scope">
            <img :src="'http://127.0.0.1:5000/upload/imgs/goods_img/'+scope.row.imgUrl" alt />
          </template>
        </el-table-column>
        <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
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
    </div>
    <div class="modalBox" v-show="flag">
      <div>
        <div>
          <p>商品名称</p>
          <el-input v-model="name" placeholder="请输入内容"></el-input>
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
      </div>

      <div>
        <p>商品价格</p>
        <el-input v-model="price" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <p>商品图片地址</p>
        <div class="imgBox">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/goods/goods_img_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="imgUrl" :src="'http://127.0.0.1:5000/upload/imgs/goods_img/'+newimgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <div>
        <p>商品描述</p>
        <el-input v-model="goodsDesc" placeholder="请输入内容"></el-input>
      </div>
      <el-button type="primary" @click="send">提交</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import {
  goodslist,
  delProduct,
  categories,
  deitProduct,
} from "../../api/apis.js";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      total: 0,
      pageSize: 5,
      options: [],
      value: "",
      name: "",
      price: "",
      newimgUrl: "",
      goodsDesc: "",
      id: "",
      imgUrl: "",
      flag: false,
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imgUrl = URL.createObjectURL(file.raw);
      this.newimgUrl = res.imgUrl;
      console.log(this.imgUrl);
    },
    handleEdit(row) {
      this.flag = true;
      this.name = row.name;
      this.value = row.category;
      this.price = row.price;
      this.imgUrl = row.imgUrl;
      this.newimgUrl = row.imgUrl;
      this.goodsDesc = row.goodsDesc;
      this.id = row.id;
      console.log(this.imgUrl);
    },
    cancel() {
      this.flag = false;
    },
    send() {
      deitProduct(
        this.name,
        this.value,
        this.price,
        this.newimgUrl,
        this.goodsDesc,
        this.id
      ).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "success",
            offset: 50,
          });
          this.getPages();
          this.flag = false;
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
      delProduct(row.id).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "success",
            offset: 50,
          });
          this.getPages();
        } else {
          this.$message({
            message: res.data.msg,
            type: "error",
            offset: 50,
          });
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPages();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPages();
    },
    getPages() {
      goodslist(this.currentPage, this.pageSize).then((res) => {
        console.log(res.data);
        this.total = res.data.total;
        this.tableData = res.data.data;
      });
    },
  },
  created() {
    this.getPages();
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
#Productlist {
  > div:first-child {
    line-height: 40px;
    margin-bottom: 10px;
  }
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
img {
  width: 40px;
  height: 40px;
}
.modalBox {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -170px;
  margin-left: -350px;
  width: 700px;
  padding: 20px;
  border: 1px solid #e9e9e9;
  background-color: white;
  > div:first-child {
    display: flex;
    > div {
      margin-right: 20px;
      display: flex;
      width: 300%;
      > p {
        width: 100px;
        margin-right: 10px;
        line-height: 40px;
      }
      div {
        width: 200px;
      }
    }
  }
  > div {
    display: flex;
    margin-bottom: 10px;
    div {
      width: 200px;
    }
    > p {
      width: 100px;
      margin-right: 10px;
      line-height: 40px;
    }
  }
  .avatar-uploader .el-upload {
    border: 2px dashed #d9d9d9;
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
  .imgBox {
    width: 100px;
    height: 100px;
    border: 2px dashed rgb(212, 212, 212);
  }
  > button:nth-last-child(2) {
    margin-left: 70px;
  }
}
/deep/.cell {
  height: 50px;
  overflow: hidden;
}
</style>