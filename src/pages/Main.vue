<template>
  <div id="main">
    <div class=".rightBox">
      <div class="navRight">
        <el-menu
          :default-active="active"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          router
          unique-opened
        >
          <div v-for="(item,index) in roleArr" :key="index">
            <el-menu-item :index="item.url" v-if="!item.children">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
            <el-submenu :index="item.url" v-else>
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item
                v-for="child in item.children"
                :key="child.url"
                :index="child.url"
              >{{child.name}}</el-menu-item>
            </el-submenu>
          </div>
        </el-menu>
      </div>
    </div>
    <div class="left">
      <div id="topHeader">
        <div>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item,index) in BreadList" :key="index">{{item}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div>
          <p>欢迎您，{{name}}</p>
          <router-link to="/main/Accountinfo">
            <img :src="headerImg" alt />
          </router-link>
        </div>
      </div>
      <div class="bottom">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { testToken, accountinfo } from "../api/apis.js";
export default {
  data() {
    return {
      list: [
        {
          url: "/main/Index",
          icon: "el-icon-s-home",
          name: "后台首页",
          roules: ["super", "normal"],
        },
        {
          url: "/main/Ordermana",
          icon: "el-icon-document",
          name: "订单管理",
          roules: ["super", "normal"],
        },
        {
          url: "3",
          icon: "el-icon-shopping-bag-1",
          name: "商品管理",
          roules: ["super", "normal"],
          children: [
            { url: "/main/Productlist", name: "商品列表" },
            { url: "/main/Productadd", name: "商品添加" },
            { url: "/main/Commodityclass", name: "商品分类" },
          ],
        },
        {
          url: "/main/Storemana",
          icon: "el-icon-s-shop",
          name: "店铺管理",
          roules: ["super"],
        },
        {
          url: "5",
          icon: "el-icon-s-custom",
          name: "账号管理",
          roules: ["super"],
          children: [
            { url: "/main/Accountlist", name: "账号列表" },
            { url: "/main/Addaccount", name: "添加账号" },
            { url: "/main/Changepwd", name: "修改密码" },
          ],
        },
        {
          url: "6",
          icon: "el-icon-pie-chart",
          name: "销售统计",
          roules: ["super"],
          children: [
            { url: "/main/CommoditySta", name: "商品统计" },
            { url: "/main/Ordersta", name: "订单统计" },
          ],
        },
      ],
      name: localStorage.account,
      headerImg: "",
      active: "",
      BreadList: [],
    };
  },
  components: {},
  computed: {
    roleArr() {
      let newArr = this.list.filter((item) => {
        return item.roules.includes(localStorage.role);
      });
      return newArr;
    },
  },
  created() {
    this.BreadList = this.$route.meta
    console.log(this.BreadList);
    testToken(localStorage.token).then((res) => {
      if (res.data.code == 0) {
        this.username = localStorage.acc;
      } else {
        this.username = "请登录";
        this.$router.push("/");
      }
    });
    this.getheadImg();
    this.$bus.$on("getNewHead", () => {
      this.getheadImg();
    });
    this.active = this.$route.path;
  },
  methods: {
    getheadImg() {
      accountinfo(localStorage.id).then((res) => {
        this.headerImg = res.data.accountInfo.imgUrl;
      });
    },
  },
  watch:{
    $route(to){
      this.BreadList = to.meta;
    }
  }
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  html,
  body {
    width: 100%;
    height: 100%;
    #main {
      width: 100%;
      height: 100%;
      display: flex;
      > div:first-child {
        width: 200px;
        background: #545c64;
      }
      > .left {
        width: calc(100% - 200px);
        > .bottom {
          padding: 10px;
          padding-top: 60px;
          background-color: #e9e9e9;
          position: relative;
        }
      }
    }
  }
}
#topHeader {
  z-index: 100000;
  position: fixed;
  left: 200px;
  width: calc(100% - 240px);
  display: flex;
  justify-content: space-between;
  line-height: 50px;
  padding: 0px 30px;
  background-color: white;
  > div:first-child {
    display: flex;
    span{
      line-height: 50px;
      font-size: 16px;
    }
  }
  > div:nth-child(2) {
    display: flex;
    a {
      width: 50px;
      height: 50px;
      border-radius: 10px;
      > img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.navRight {
  position: fixed;
  width: 200px;
  height: 100%;
  background-color: #545c64;
}
.el-menu {
  border: none;
}
</style>