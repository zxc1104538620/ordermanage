<template>
  <div id="Storemana">
    <div>
      <h3>店铺管理</h3>
      <el-button type="primary" @click="send">保存</el-button>
    </div>
    <div>
      <div>
        <p>店铺名称</p>
        <el-input v-model="name" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <p>店铺公告</p>
        <el-input v-model="bulletin" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <p>店铺头像</p>
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:5000/shop/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="avatar" :src="avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div>
        <p>店铺图片</p>

        <el-upload
          action="http://127.0.0.1:5000/shop/upload"
          list-type="picture-card"
          :on-success="handleAvatarSuccess2"
          :file-list="fileList"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
      <div>
        <p>配送费</p>
        <el-input v-model="deliveryPrice" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <p>配送时间</p>
        <el-input v-model="deliveryTime" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <p>店铺评分</p>
        <el-input v-model="score" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <p>销量</p>
        <el-input v-model="sellCount" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <p>活动</p>
        <el-checkbox-group v-model="supports" @change="supportsChange">
          <el-checkbox v-for="support in allsupports" :label="support" :key="support">{{support}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div>
        <p>营业时间</p>
        <el-time-picker
          is-range
          v-model="date"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </div>
    </div>
  </div>
</template>

<script>
const allsupports = [
  "在线支付28减5",
  "VC无限橙果汁全场8折",
  "单人精彩套餐",
  "特价饮品",
  "单人特色套餐",
];
import { info, shopedit, getshopimg } from "../../api/apis.js";
import { getchinaTime } from "../../untill/untill.js";
export default {
  data() {
    return {
      getshopimg: "",
      dialogImageUrl: "",
      dialogVisible: false,
      allsupports: allsupports,
      name: "",
      bulletin: "",
      id: "",
      avatar: "",
      newavatar: "",
      deliveryPrice: "",
      deliveryTime: "",
      score: "",
      sellCount: "",
      supports: "",
      date: "",
      pics: [],
      newsupports: [],
      fileList: [],
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.avatar = URL.createObjectURL(file.raw);
      this.newavatar = res.imgUrl;
    },
    supportsChange(value) {
      this.newsupports = value;
    },
    handleAvatarSuccess2(res) {
      this.pics.push(res.imgUrl);
      console.log(this.pics);
    },
    send() {
      this.newpics = JSON.stringify(this.newpics);
      this.newsupports = JSON.stringify(this.newsupports);

      for (let i = 0; i < this.date.length; i++) {
        getchinaTime(this.date[i]);
      }
      this.date = JSON.stringify(this.date);
      shopedit(
        this.id,
        this.name,
        this.bulletin,
        this.newavatar,
        this.deliveryPrice,
        this.deliveryTime,
        this.description,
        this.score,
        this.sellCount,
        this.newsupports,
        this.date,
        JSON.stringify(this.pics)
      ).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "success",
            offset: 50,
          });
          info().then((res) => {
            for (let key in res.data.data) {
              this[key] = res.data.data[key];
            }
            this.newavatar = res.data.data.avatar;
            this.newsupports = res.data.data.supports;
            this.fileList = this.pics.map((item) => {
              return {
                name: item,
                url: getshopimg + item,
              };
            });
            console.log(this.fileList);
            for (let i = 0; i < res.data.data.pics.length; i++) {
              this.pics[i] = getshopimg + res.data.data.pics[i];
            }
            this.avatar = getshopimg + res.data.data.avatar;
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
    handleRemove(file) {
      this.pics.splice(this.pics.indexOf(file.name),1)
      console.log(this.pics);
    },
  },
  created() {
    this.getshopimg = getshopimg;
    info().then((res) => {
      for (let key in res.data.data) {
        this[key] = res.data.data[key];
      }
      this.newavatar = res.data.data.avatar;
      this.newsupports = res.data.data.supports;
      this.fileList = this.pics.map((item) => {
        return {
          name: item,
          url: getshopimg + item,
        };
      });
      console.log(this.pics);
      this.avatar = getshopimg + res.data.data.avatar;
    });
  },
};
</script>

<style lang="less" scoped>
#Storemana {
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  > div:first-child {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e0e0e0;
    padding: 10px 20px;
    button {
      font-size: 14px;
      height: 28px;
      width: 48px;
      padding: 6px;
      span {
        padding: 0;
      }
    }
  }
  > div:nth-child(2) {
    flex: 1;
    padding: 20px 40px;
    > div {
      display: flex;
      line-height: 40px;
      margin-bottom: 20px;
      p {
        width: 80px;
        text-align: end;
        margin-right: 20px;
      }

      div {
        width: 400px;
      }
      .imgbox {
        width: 146px;
        height: 146px;
        margin-right: 10px;
        > img {
          width: 146px;
          height: 100%;
        }
      }
      .allImgBox {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        div {
          width: 100%;
        }
        .imgbox {
          width: 146px;
          height: 146px;
          margin-right: 10px;
          margin-bottom: 10px;
          > img {
            width: 146px;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>