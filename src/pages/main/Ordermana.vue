<template>
  <div id="Ordermana">
    <div>
      <div>
        <p>订单号</p>
        <el-input v-model="orderNo" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <p>收货人</p>
        <el-input v-model="consignee" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <p>手机号</p>
        <el-input v-model="phone" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <p>订单状态</p>
        <el-select v-model="orderState" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="choiceTime">
      <p>选择时间</p>
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button type="primary" @click="query">查询</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%;height:350px">
      <el-table-column fixed prop="orderNo" label="订单号" width="150"></el-table-column>
      <el-table-column prop="orderTime" label="下单时间" width="200"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
      <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>
      <el-table-column prop="deliverAddress" label="配送地址" width="200"></el-table-column>
      <el-table-column prop="deliveryTime" label="送达时间" width="200"></el-table-column>
      <el-table-column prop="remarks" label="用户备注" width="120"></el-table-column>
      <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>
      <el-table-column prop="orderState" label="订单状态" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="examineBtn(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="editBtn(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="5"
      layout="total, prev, pager, next"
      :total="total"
    ></el-pagination>
    <el-dialog title="订单详情" :visible.sync="dialogFormVisible">
      <div class="modalBox">
        <div>
          <p>订单id</p>
          <div>{{editobj.id}}</div>
        </div>
        <div>
          <p>订单号</p>
          <div>{{editobj.orderNo}}</div>
        </div>
      </div>
      <div class="modalBox">
        <div>
          <p>下单时间</p>
          <div>{{editobj.orderTime}}</div>
        </div>
        <div>
          <p>联系电话</p>
          <div>{{editobj.phone}}</div>
        </div>
      </div>
      <div class="modalBox">
        <div>
          <p>收货人</p>
          <div>{{editobj.consignee}}</div>
        </div>
        <div>
          <p>送货地址</p>
          <div>{{editobj.deliverAddress}}</div>
        </div>
      </div>
      <div class="modalBox">
        <div>
          <p>送达时间</p>
          <div>{{editobj.deliveryTime}}</div>
        </div>
        <div>
          <p>备注</p>
          <div>{{editobj.remarks}}</div>
        </div>
      </div>
      <div class="modalBox">
        <div>
          <p>订单金额</p>
          <div>{{editobj.orderAmount}}</div>
        </div>
        <div>
          <p>订单状态</p>
          <div>{{editobj.orderState}}</div>
        </div>
      </div>
      <el-button @click="dialogFormVisible = false">返回</el-button>
    </el-dialog>
    <el-dialog title="订单详情" :visible.sync="dialogFormVisible2">
      <div class="modalBox">
        <div>
          <p>订单id</p>
          <el-input v-model="editobj.id" placeholder="请输入内容"></el-input>
        </div>
        <div>
          <p>订单号</p>
          <el-input v-model="editobj.orderNo" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <div class="modalBox">
        <div>
          <p>下单时间</p>
          <el-date-picker v-model="editobj.orderTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </div>
        <div>
          <p>联系电话</p>
          <el-input v-model="editobj.phone" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <div class="modalBox">
        <div>
          <p>收货人</p>
          <el-input v-model="editobj.consignee" placeholder="请输入内容"></el-input>
        </div>
        <div>
          <p>送货地址</p>
          <el-input v-model="editobj.deliverAddress" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <div class="modalBox">
        <div>
          <p>送达时间</p>
          <el-date-picker v-model="editobj.deliveryTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </div>
        <div>
          <p>备注</p>
          <el-input v-model="editobj.remarks" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <div class="modalBox">
        <div>
          <p>订单金额</p>
          <el-input v-model="editobj.orderAmount" placeholder="请输入内容"></el-input>
        </div>
        <div>
          <p>订单状态</p>
          <el-select v-model="editobj.orderState" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="sendData">提交</el-button>
      <el-button @click="dialogFormVisible2 = false">返回</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { orderList, search,edit, detail } from "../../api/apis.js";
import { getchinaTime } from "../../untill/untill.js";
export default {
  data() {
    return {
      tableData: [],
      options: [
        {
          value: "已受理",
          label: "已受理",
        },
        {
          value: "派送中",
          label: "派送中",
        },
        {
          value: "已完成",
          label: "已完成",
        },
      ],
      orderState: "",
      orderNo: "",
      consignee: "",
      phone: "",
      date: "",
      currentPage: 1,
      pageSize: 5,
      total: 0,
      dialogFormVisible: false,
      dialogFormVisible2: false,

      editobj: {},
    };
  },
  methods: {
    examineBtn(row) {
      detail(row.id).then((res) => {
        this.dialogFormVisible = true;
        this.editobj = JSON.parse(JSON.stringify(res.data.data));
        this.editobj.deliveryTime = getchinaTime(this.editobj.deliveryTime);
        this.editobj.orderTime = getchinaTime(this.editobj.orderTime);
      });
    },
    editBtn(row) {
      detail(row.id).then((res) => {
        this.dialogFormVisible2 = true;
        this.editobj = JSON.parse(JSON.stringify(res.data.data));
        this.editobj.deliveryTime = getchinaTime(this.editobj.deliveryTime);
        this.editobj.orderTime = getchinaTime(this.editobj.orderTime);
      });
    },
    sendData() {
      console.log(this.editobj.orderTime);
      this.editobj.orderTime = getchinaTime(this.editobj.orderTime)
      this.editobj.deliveryTime = getchinaTime(this.editobj.deliveryTime)
      edit(this.editobj).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "success",
            offset: 50,
          });
          this.getorderList();
          this.dialogFormVisible2 = false;
        } else {
          this.$message({
            message: res.data.msg,
            type: "error",
            offset: 50,
          });
        }
      });
    },
    deleteRow(index, rows) {
      console.log(rows);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getorderList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getorderList();
    },
    query() {
      for (let i = 0; i < this.date.length; i++) {
        this.date[i] = getchinaTime(this.date[i]);
      }
      console.log(this.currentPage, this.pageSize);
      search(
        this.currentPage,
        this.pageSize,
        this.orderNo,
        this.consignee,
        this.phone,
        this.orderState,
        JSON.stringify(this.date)
      ).then((res) => {
        this.tableData = res.data.data;
        this.changeTime();
        this.total = res.data.total;
      });
    },
    getorderList() {
      orderList(
        this.currentPage,
        this.pageSize,
        this.orderNo,
        this.consignee,
        this.phone,
        this.orderState,
        JSON.stringify(this.date)
      ).then((res) => {
        this.total = res.data.total;
        this.tableData = res.data.data;
        this.changeTime();
      });
    },
    changeTime() {
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].orderTime = getchinaTime(this.tableData[i].orderTime);
      }
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].deliveryTime = getchinaTime(this.tableData[i].deliveryTime);
      }
    },
  },
  created() {
    this.getorderList();
  },
};
</script>

<style lang="less" scoped>
#Ordermana {
  background-color: white;
  height: calc(100% - 60px);
  > div:first-child {
    display: flex;
    > div {
      display: flex;
      padding: 10px 0px;
      p {
        font-size: 14px;
        width: 70px;
        text-align: center;
        line-height: 40px;
      }
      /deep/ div {
        width: 200px;
        height: 40px;
        input {
          height: 40px;
        }
      }
    }
  }
  > .choiceTime {
    display: flex;
    margin-bottom: 20px;
    p {
      font-size: 14px;
      width: 70px;
      text-align: center;
      line-height: 40px;
    }
    button {
      margin-left: 10px;
    }
  }
}
.el-dialog {
  width: 800px;
}
.modalBox {
  display: flex;
  justify-content: space-between;
  > div {
    display: flex;
    > p {
      width: 60px;
      margin-right: 20px;
      line-height: 40px;
    }
    div {
      width: 200px;
      margin-bottom: 10px;
      line-height: 40px;
    }
  }
}
</style>