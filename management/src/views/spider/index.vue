<template>
    <div>
      spider
      <div v-html="res.data"></div>
      <h1>{{list.length}}</h1>
      <table>
        <tr v-for="item in list">
          <td><img :src="item.logo" alt=""></td>
          <td><a :href="item.link">{{item.name}}</a></td>
          <td><b>{{item.symbol}}</b></td>
          <td><b>{{item.platform}}</b></td>
        </tr>
      </table>
    </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      res: {},
      list: []
    }
  },
  methods: {
    getSpider() {
      this.request({
        url: this.apis.spider,
        method: 'get'
      }).then(res => {
        console.log(res);
        //this.res = res
      })
    },
    getList() {
      this.request({
        url: this.apis.spiderList,
        method: 'get'
      }).then(res => {
        console.log(res);
        this.list = res.data || []
      })
    }
  },
  mounted() {
    this.getSpider()
    // this.getList()
  }
}
</script>

<style scoped>

</style>
