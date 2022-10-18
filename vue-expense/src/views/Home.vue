<template>
  <div>
    <!-- <h1>Home 组件</h1> -->

    <el-row>
      <!-- 左侧栅格 -->
      <el-col :span="8" style="padding-right: 10px">
        <!-- 用户展示 -->
        <el-card class="box-card">
          <div class="user">
            <img src="../assets/images/user01.png" alt="" />
            <div class="userInfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间：<span>2022-10-1</span></p>
            <p>上次登录地点：<span>郑州</span></p>
          </div>
        </el-card>
        <!-- 数据表格 -->
        <el-card style="margin-top: 20px; height: 460px">
          <el-table :data="tableData" stripe style="width: 100%">
            <!-- 遍历对象（值，键） -->
            <el-table-column
              v-for="(val, key) in tableLabel"
              :prop="key"
              label="val"
              :key="val"
            >
            </el-table-column>
            <!-- <el-table-column prop="name" label="型号"> </el-table-column>
            <el-table-column prop="todayBuy" label="今日购买">
            </el-table-column>
            <el-table-column prop="monthBuy" label="当月累计">
            </el-table-column>
            <el-table-column prop="totalBuy" label="总购买"> </el-table-column> -->
          </el-table>
        </el-card>
      </el-col>
      <!-- 右侧栅格 -->
      <el-col :span="16" style="padding-left: 10px">
        <!-- 订单 -->
        <div class="num">
          <el-card
            v-for="item in countData"
            :key="item.name"
            :body-style="{ display: 'flex', padding: 0 }"
          >
            <i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="{ background: item.color }"
            ></i>
            <div class="detail">
              <p class="price">￥{{ item.value }}</p>
              <p class="desc">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <!-- 折线图 -->
        <el-card style="height: 280px">
          <!-- 利用ref属性配置echarts实例 -->
          <div ref="echarts1" style="height: 280px"></div>
        </el-card>
        <!-- 柱状图与饼图 -->
        <div class="graph">
          <el-card> <div ref="echarts2" style="height: 260px"></div> </el-card>
          <el-card> <div ref="echarts3" style="height: 240px"></div> </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 引入拦截器配置方法
import { getData } from "../api/index";
// 引入echarts 图表
import * as echarts from "echarts";
export default {
  name: "Home",
  data() {
    return {
      // 列表数据
      tableData: [
        {
          name: "oppo",
          todayBuy: "100",
          monthBuy: "300",
          totalBuy: "800",
        },
        {
          name: "vivo",
          todayBuy: "100",
          monthBuy: "300",
          totalBuy: "800",
        },
        {
          name: "苹果",
          todayBuy: "100",
          monthBuy: "300",
          totalBuy: "800",
        },
        {
          name: "小米",
          todayBuy: "100",
          monthBuy: "300",
          totalBuy: "800",
        },
        {
          name: "三星",
          todayBuy: "100",
          monthBuy: "300",
          totalBuy: "800",
        },
        {
          name: "魅族",
          todayBuy: "100",
          monthBuy: "300",
          totalBuy: "800",
        },
      ],
      tableLabel: {
        name: "类型",
        todayBuy: "今日购买",
        monthBuy: "当月累计",
        totalBuy: "总购买",
      },
      // 订单数据
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted() {
    // ES6 {} 解构 {data} 相当于 data.data 即解析原对象中的属性
    getData().then(({ data }) => {
      // console.log(data); // 获取mock拦截器中的数据
      // console.log(data.data.data.tableData); // 获取数据
      const { tableData } = data.data;
      // console.log(tableData);
      this.tableData = tableData;

      /* Echarts图表配置步骤 */
      // 折线图
      // 1. 基于准备好的dom，初始化echarts实例
      // console.log(this.$refs.echarts1);
      const echarts1 = echarts.init(this.$refs.echarts1);
      // 2. 指定图表的配置项和数据
      var echarts1Option = {};
      const { orderData, userData, videoData } = data.data;
      // 3. 选择并处理数据xAxis（初始化x轴配置项）yAxis（初始化y轴配置项）
      // 获取x轴数数据
      var xAxis = Object.keys(orderData.data[0]); // Object.keys() 把对象的属性名以数据的形式返回
      const xAxisData = {
        data: xAxis,
      };
      //4. 配置所需数据项（legend 头部提示；xAxis X轴；yAxis Y轴；series 待渲染数据）
      echarts1Option.xAxis = xAxisData;
      echarts1Option.legend = xAxisData;
      echarts1Option.yAxis = {};
      // 5. series 需要渲染的数据
      echarts1Option.series = [];
      xAxis.forEach((key) => {
        echarts1Option.series.push({
          name: key,
          // Array.map() 数组映射， map((item) => item[key]) 遍历对象数组，通过key获取key对应的每项value值
          data: orderData.data.map((item) => item[key]),
          type: "line", // type 定义图表类型 line 折线图 bar 柱状图 stack 堆叠模式 tiled平铺模式
        });
      });
      // console.log(echarts1Option);
      // 6. 使用指定的配置项和数据显示图表
      echarts1.setOption(echarts1Option);

      // 柱状图
      // 创建实例
      const echarts2 = echarts.init(this.$refs.echarts2);
      // 定义数据
      const echartsOptions = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        // X轴
        xAxis: {
          type: "category", // 类目轴
          data: userData.map((item) => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        // y轴
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [
          {
            name: "新增用户",
            data: userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: userData.map((item) => item.active),
            type: "bar",
          },
        ],
      };
      // 设置注入
      echarts2.setOption(echartsOptions);

      // 饼状图
      const echarts3 = echarts.init(this.$refs.echarts3);
      const echarts3Options = {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [
          {
            data: videoData,
            type: "pie",
          },
        ],
      };
      echarts3.setOption(echarts3Options);
    });
  },
};
</script>

<style lang="less" scoped>
/* 用户展示 */
.user {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center; // 文本垂直居中
  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .userInfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999;
    span {
      color: #666;
      margin-left: 60px;
    }
  }
}

/* 订单 */
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; // 两端对齐
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .detail {
    // flex布局
    display: flex;
    flex-direction: column; //  改变主轴为垂直方向
    justify-content: center;
    margin-left: 15px;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .desc {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}

/* 饼图 */
.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between; // 两端对齐
  .el-card {
    height: 260px;
    width: 48%;
  }
}
</style>