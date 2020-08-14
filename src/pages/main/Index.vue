<template>
  <div id="index">
    <div>
      <div>
        <p class="el-icon-s-claim" style="color:#1296DB"></p>
        <div>
          <h5>总订单数</h5>
          <p>102,400</p>
        </div>
      </div>
      <div>
        <p class="el-icon-coin" style="color:#1296DB"></p>
        <div>
          <h5>总销售额</h5>
          <p>102,400</p>
        </div>
      </div>
      <div>
        <p class="el-icon-s-order" style="color:#D93B89"></p>
        <div>
          <h5>今日订单数</h5>
          <p>102,400</p>
        </div>
      </div>
      <div>
        <p class="el-icon-money" style="color:#1AFA29"></p>
        <div>
          <h5>今日销售额</h5>
          <p>102,400</p>
        </div>
      </div>
    </div>
    <div>
        <div id="myCharts" ref="myCharts" style="width:800px;height:400px;margin:0 auto;"></div>
    </div>
  </div>
</template>

<script>
import {totaldata} from "../../api/apis.js"
import echarts from 'echarts'
export default {
  
  mounted() {
    let myEcharts = echarts.init(document.querySelector("#myCharts"));
    totaldata().then((res)=>{
      var option = {
        title: {
          text: "堆叠区域图",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["订单数据", "金额数据"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data:res.data.xData,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "订单数据",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: res.data.orderData,
          },
          {
            name: "金额数据",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: res.data.amountData,
          },
        ],
      };
      myEcharts.setOption(option)
    })
  },
};
</script>

<style lang="less" scoped>
#index {
  > div:first-child {
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
    > div {
      background-color: white;
      display: flex;
      margin: 0 10px;
      width: 260px;
      height: 80px;
      justify-content: space-around;
      border-radius: 10px;
      > p {
        font-size: 70px;
        line-height: 80px;
      }
      > div {
          padding: 10px;
        h5 {
          font-size: 18px;
          color: rgb(207, 207, 207);
          margin-bottom: 10px;
        }
        p {
          font-size: 18px;
        }
      }
    }
  }
  >div:last-child{
      background-color: white;
      padding-top: 40px;
  }
}
</style>