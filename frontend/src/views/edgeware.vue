<template>
    <div style="padding: 20px;" >
        <h1>edgeware</h1>
        <!--<EthTable :arr="tArr"></EthTable>-->
        <EthTable :arr="mArr"></EthTable>
        <div id="myChart" :style="{width: '100%', height: '600px'}"></div>
        <div id="pieChart" :style="{width: '100%', height: '400px'}"></div>
        <div id="axisChart" :style="{width: '100%', height: '400px'}"></div>
    </div>
</template>

<script>
// 引入基本模板
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import moment from 'moment';
import InputDataDecoder from 'ethereum-input-data-decoder';
import abi from '../util/abi.json';
import Web3 from 'web3';
import {Decimal} from 'decimal.js';
import EthTable from '@/components/EthTable';

export default {
  name: "edgeware",
  components: {
    EthTable
  },
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
      tArr: [],
      mArr: []
    }
  },
  methods: {
    async getData() {
      const decoder = new InputDataDecoder(abi);
      const web3js = new Web3(window.web3.currentProvider);
      const hexToNumberString = web3js.utils.hexToNumberString;
      const loading = this.$loading({
        lock: true,
        text: '从链上加载数据中，时间可能比较久，请稍后...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.$axios.get(this.apis.get_edgeware).then((response) => {
        loading.close();
        const res = response.data.result;
        let len = res.length;
        let amount = 0;
        let xData = [];
        let yData = [];
        let tArr = [];
        let mArr = [];
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
            let time = moment(parseInt(res[i].timeStamp)*1000).format('MM/DD hh:mm:ss')
            xData.push(time);
            let v = parseFloat(web3js.utils.fromWei(res[i].value));
            /*if (v >= 1000 & v < 10000) {
              tArr.push({
                time: time,
                from: res[i].from,
                method: input.method,
                lockTime: input.method === 'lock' ? hexToNumberString(input.inputs[0]) : '-1',
                value: v,
                blockHash: res[i].blockHash,
                blockNumber: res[i].blockNumber
              })
            } else */if (v >= 1000){
              mArr.push({
                time: time,
                from: res[i].from,
                method: input.method,
                lockTime: input.method === 'lock' ? hexToNumberString(input.inputs[0]) : '-1',
                value: v,
                blockHash: res[i].blockHash,
                blockNumber: res[i].blockNumber
              })
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
        //this.chainData = res;
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
        this.tArr = tArr;
        this.mArr = mArr;
        this.drawLine(xData, yData);
        this.drawPie();
        this.drawAxis();
        console.log(amount, signal_amount,lock_amount,lock3M_amount,lock6M_amount,lock12M_amount,signal_arr,lock_arr,lock3M_arr,lock6M_arr,lock12M_arr);
        console.log(res);
        console.log(lockElseArr, elseArr, errorArr);
      })
    },
    drawLine(xData, yData) {
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '锁仓数量时间图',
          subtext: '来自edgeware',
          left: 'center'
        },
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
          smooth: true,
          center: ['50%', '50%'],
        }]
      });
    },
    drawPie() {
      let myChart = echarts.init(document.getElementById('pieChart'))
      console.log(this.lock3M_amount, this.lock6M_amount, this.lock12M_amount);
      // 绘制图表
      myChart.setOption({
        title: {
          text: '锁仓占比情况',
          subtext: '来自edgeware',
          left: 'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          // orient: 'vertical',
          // top: 'middle',
          bottom: 10,
          left: 'center',
          data: ['3个月', '6个月','12个月']
        },
        series : [
          {
            type: 'pie',
            radius : '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data:[
              {value:this.lock3M_amount, name: '3个月'},
              {value:this.lock6M_amount, name: '6个月'},
              {value:this.lock12M_amount, name: '12个月'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    drawAxis () {
      let myChart = echarts.init(document.getElementById('axisChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          textBaseline: 'middle',
          text: '三个月'
        },
        singleAxis: {
          left: 150,
          type: 'value',
          boundaryGap: false,
          min: 0,
          max: 80000
        },
        series: {
          singleAxisIndex: 0,
          coordinateSystem: 'singleAxis',
          type: 'scatter',
          data: this.lock3M_arr
        }
      })
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
    let x = new Decimal(0.3)
    x.minus(0.1)
    console.log(parseFloat(x.minus(0.1).toString()));

  }
}
</script>

<style scoped>

</style>