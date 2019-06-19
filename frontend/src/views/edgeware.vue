<template>
    <div>
        edgeware
        <div id="myChart" :style="{width: '100%', height: '400px'}"></div>
    </div>
</template>

<script>
// 引入基本模板
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import moment from 'moment';
import InputDataDecoder from 'ethereum-input-data-decoder';
import abi from '../util/abi.json';
import Web3 from 'web3';

export default {
  name: "edgeware",
  data() {
    return {
      decoder: null,
      chainData: [],
      web3js: null,
      amount: 0,
      signal_amount: 0,
      lock_amount: 0,
      lock3M_amount: 0,
      lock6M_amount: 0,
      lock12M_amount: 0,
      signal_arr: [],
      lock_arr: [],
      lock3M_arr: [],
      lock6M_arr: [],
      lock12M_arr: [],
    }
  },
  methods: {
    async getData() {
      const decoder = new InputDataDecoder(abi);
      const web3js = new Web3(window.web3.currentProvider);
      const hexToNumberString = web3js.utils.hexToNumberString;
      this.$axios.get(this.apis.get_edgeware).then((response) => {
        const res = response.data.result;
        let len = res.length;
        let amount = 0;
        let xData = [];
        let yData = [];
        let dhu = [];
        let max = 0;
        let min = 0;
        let signal_amount = 0;
        let lock_amount = 0;
        let lock3M_amount = 0;
        let lock6M_amount = 0;
        let lock12M_amount = 0;
        let signal_arr = [];
        let lock_arr = [];
        let lock3M_arr = [];
        let lock6M_arr = [];
        let lock12M_arr = [];
        let elseArr = [];
        let lockElseArr = [];
        let errorArr = [];
        for (let i = 0; i < len; i++) {
          let input = decoder.decodeData(res[i].input);
          res[i].inputObj = input;
          if (res[i].isError === "0") {
            xData.push(moment(parseInt(res[i].timeStamp)*1000).format('MM/DD hh:mm:ss'));
            let v = parseInt(res[i].value) / (10 ** 18);
            if (v > 10000) {
              dhu.push([res[i], v])
            }
            if (v < min) min = v;
            if (v > max) max = v;
            if (input.method === 'lock') {
              amount += v;
              lock_amount += v;
              lock_arr.push(v);
              let lockType = hexToNumberString(input.inputs[0]);
              if (lockType === "0") {
                lock3M_amount += v;
                lock3M_arr.push(v);
              } else if (lockType === "1") {
                lock6M_amount += v;
                lock6M_arr.push(v);
              } else if (lockType === "2") {
                lock12M_amount += v;
                lock12M_arr.push(v);
              } else {
                lockElseArr.push([res[i], v]);
              }
            } else if (input.method === 'signal') {
              amount += v;
              signal_amount += v;
              signal_arr.push(v);
            } else {
              elseArr.push([res[i], v])
            }
            yData.push(amount);
          } else {
            errorArr.push(res[i])
          }
        }
        this.chainData = res;
        this.drawLine(xData, yData);
        this.amount = amount;
        this.signal_amount = signal_amount;
        this.lock_amount = lock_amount;
        this.lock3M_amount = lock3M_amount;
        this.lock6M_amount = lock6M_amount;
        this.lock12M_amount = lock12M_amount;
        this.signal_arr = signal_arr;
        this.lock_arr = lock_arr;
        this.lock3M_arr = lock3M_arr;
        this.lock6M_arr = lock6M_arr;
        this.lock12M_arr = lock12M_arr;
        console.log(amount, signal_amount,lock_amount,lock3M_amount,lock6M_amount,lock12M_amount,signal_arr,lock_arr,lock3M_arr,lock6M_arr,lock12M_arr);
        console.log(dhu, res);
        console.log(lockElseArr, elseArr, errorArr);
      })
    },
    drawLine(xData, yData) {
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        xAxis: {
          type: 'category',
          data: xData,
        },
        yAxis: {
          type: 'value',
        },
        series: [{
          data: yData,
          type: 'line',
          smooth: true
        }]
      });
    }
  },
  mounted() {
    this.getData();
    this.decoder = new InputDataDecoder(abi);
    this.web3js = new Web3(window.web3.currentProvider);
    /*const hexToNumberString = this.web3js.utils.hexToNumberString;
    let data = "0xa40d3060000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002040ecd4b98b394ca5cda196f62a8b48078b3cb028c1f96a5554d388113d0d271b"
    const decoder = new InputDataDecoder(abi);
    let input = decoder.decodeData(data);
    console.log(input);
    console.log(hexToNumberString(input.inputs[0]) === "0");*/

  }
}
</script>

<style scoped>

</style>