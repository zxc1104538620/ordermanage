<template>
  <div id="Ordersta">
    <div>
      <p>时间范围</p>
      <el-date-picker
        v-model="date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button type="primary" @click="getTime">查询</el-button>
    </div>
    <div>
      <div id="myCharts" ref="myCharts"></div>
    </div>
  </div>
</template>

<script>
import { ordertotal } from "../../api/apis.js";
import { getchinaTime2 } from "../../untill/untill.js";
import { getchinaTime } from "../../untill/untill.js";
import echarts from "echarts";
export default {
  data() {
    return {
      date: "",
    };
  },
  methods: {
    getTime() {
      for (let i = 0; i < this.date.length; i++) {
        this.date[i] = getchinaTime2(this.date[i]);
      }
      this.date = JSON.stringify(this.date);
      console.log(this.date);
      this.sendTime();
    },
    sendTime() {
      ordertotal(this.date).then((res) => {
        let arrorderTime = [];
        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i].orderTime = getchinaTime(res.data.data[i].orderTime);
          arrorderTime.push(res.data.data[i].orderTime);
        }
        let arrorderAmount = [];
        for (let i = 0; i < res.data.data.length; i++) {
          arrorderAmount.push(res.data.data[i].orderAmount);
        }
        let option = {
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: arrorderTime,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: arrorderAmount,
              type: "line",
              areaStyle: {},
            },
          ],
        };
        this.myecharts.setOption(option);
      });
    },
  },

  mounted() {
    this.myecharts = echarts.init(document.getElementById("myCharts"));
  },
};
</script>

<style lang="less" scoped>
#Ordersta {
  > div:first-child {
    display: flex;
    height: 50px;
    padding: 0px 10px;
    > p {
      margin-right: 20px;
      line-height: 40px;
    }
    button {
      height: 40px;
      margin-left: 20px;
    }
  }
  > div:last-child {
    background-color: white;
  }
}
#myCharts {
  padding-top: 60px;
  margin: 0 auto;
  width: 900px;
  height: 500px;
}
</style>