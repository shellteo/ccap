<template>
  <div
    class="service-container smb-overview"
  >
    <section>
      <div class="card-bordered">
        <div class="card-bordered-header">
          <s-text
            p="2"
            semi-bold>代币分配</s-text>
        </div>
        <div class="card-bordered-content">
          <s-container
            class="is-mobile is-paddingless"
            clean
            centered-v>

            <div
              id="myChart"
              :style="{width: '100%', height: '250px'}"/>
          </s-container>
        </div>
      </div>
    </section>
    <section>
      <div class="card-bordered">
        <div class="card-bordered-header">
          <s-text
            p="2"
            semi-bold>FUNDING</s-text>
        </div>
        <div class="card-bordered-content">
          <s-container
            class="is-mobile is-paddingless"
            clean
            centered-v>
            <div class="smb-table">
              <table>
                <tbody>
                  <tr
                    v-for="(item, i) in info"
                    :key="i">
                    <th>{{ item.text }}</th>
                    <td>{{ item.value || 'n/a' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </s-container>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
/* eslint-disable */
// 引入基本模板
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'

export default {
  name: 'Overview',
  props: {
    coin: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
    }
  },
  computed: {
    info () {
      const { belong, init_price, ico_price, launchpad, platform, roi, softcap, hardcap, raised, bonuses, bounties } = this.coin // 0 ico, 1 sto, 2 ieo
      return {
        price: {
          text: '价格',
          value: init_price || ico_price
        }, // init_price || ico_price
        platform: {
          text: '平台',
          value: belong === 2 ? launchpad || platform || 'n/a' : platform || launchpad || 'n/a'
        }, // launchpad or platform
        roi: {
          text: '投资回报率',
          value: roi
        }, // ROI投资回报率
        softcap: {
          text: '软顶',
          value: softcap
        }, // Softcap软顶
        hardcap: {
          text: '硬顶',
          value: hardcap
        }, // Hardcap硬顶
        raised: {
          text: 'Raised',
          value: raised
        }, // Raised
        bonuses: {
          text: 'Bonuses',
          value: bonuses
        }, // Bonuses最高多少奖金红利，可以根据这个计算 Current Bonus
        bounties: {
          text: '赏金',
          value: bounties
        } // Bounties赏金
      }
    }
  },
  mounted () {
    // this.drawPie()
  },
  methods: {
    parseDistribution(data) {
      let distribution = {}
      try {
        distribution = JSON.parse(data)
      } catch (e) {
        distribution = {}
      }
      let legendData = [];
      let seriesData = [];
      for (let key in distribution) {
        if(distribution.hasOwnProperty(key)) {
          legendData.push(key)
          seriesData.push({
            name: key,
            value: parseFloat(distribution[key])
          })
        }
      }
      return {
        legendData,
        seriesData
      }
    },
    drawPie (data) {
      let distribution = this.parseDistribution(data)
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        legend: {
          orient: 'vertical',
          x: 'left',
          data: distribution.legendData
        },
        series: [
          {
            name: '访问来源',
            center: ['70%', '50%'],
            radius: 80,
            type: 'pie',
            data: distribution.seriesData,
            label: {
              normal: {
                formatter: '{b}\n{d}%'
              }
            }
          }
        ]
      })
    }
  }
}
</script>
<style scoped lang="scss">
@media screen and (min-width: 1024px) {
  .smb-overview {
    /*> section {
      background-color: #FAFBFD;
      padding: 20px;
      border: 1px solid #cccccc;
    }*/
  }
}
.smb-table {
  padding-left: 20px;
  h4 {
    margin-bottom: 20px;
  }
  tr {
    height: 30px;
    th {
      width: 100px;
    }
    td {

    }
  }
}
</style>
