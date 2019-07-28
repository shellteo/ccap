<template>
  <el-form :model="projectObj" label-width="120px">
    <el-form-item label="Logo" prop="logo">
      <el-input v-model="projectObj.logo" placeholder="请输入logo"/>
    </el-form-item>
    <el-form-item label="belong" prop="belong">
      <el-select v-model="projectObj.belong" placeholder="请选择belong">
        <el-option
          v-for="item in belongOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
    </el-form-item>
    <el-form-item label="rating" prop="rating">
      <el-input v-model="projectObj.rating" placeholder="请打分"/>
    </el-form-item>

    <el-form-item label="symbol" prop="symbol">
      <el-input v-model="projectObj.symbol"/>
    </el-form-item>
    <el-form-item label="coin_name" prop="coin_name">
      <el-input v-model="projectObj.coin_name"/>
    </el-form-item>
    <el-form-item label="shortname" prop="shortname">
      <el-input v-model="projectObj.shortname"/>
    </el-form-item>
    <el-form-item label="slug" prop="slug">
      <el-input v-model="projectObj.slug"/>
    </el-form-item>
    <el-form-item label="display_symbol" prop="display_symbol">
      <el-input v-model="projectObj.display_symbol"/>
    </el-form-item>
    <el-form-item label="display" prop="display">
      <el-input v-model="projectObj.display"/>
    </el-form-item>
    <el-form-item label="发布时间release_date" prop="release_date">
      <el-date-picker v-model="projectObj.release_date" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"/>
    </el-form-item>
    <el-form-item label="ICO 价格ico_price" prop="ico_price">
      <el-input v-model="projectObj.ico_price"/>
    </el-form-item>
    <el-form-item label="今日开盘价today_open" prop="today_open">
      <el-input v-model="projectObj.today_open"/>
    </el-form-item>
    <el-form-item label="简介description" prop="description">
      <el-input type="textarea" v-model="projectObj.description"/>
      <div class="desc" v-html="projectObj.description"></div>
    </el-form-item>
    <el-form-item label="开始时间start" prop="start">
      <el-date-picker v-model="projectObj.start" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"/>
    </el-form-item>
    <el-form-item label="结束时间end" prop="end">
      <el-date-picker v-model="projectObj.end" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"/>
    </el-form-item>
    <el-form-item label="is_promoted" prop="is_promoted">
      <el-input v-model="projectObj.is_promoted"/>
    </el-form-item>
    <el-form-item label="message" prop="message">
      <el-input v-model="projectObj.message"/>
    </el-form-item>
    <el-form-item label="站点website" prop="website">
      <el-input v-model="projectObj.website"/>
    </el-form-item>
    <el-form-item label="白皮书站点whitepaper" prop="whitepaper">
      <el-input v-model="projectObj.whitepaper"/>
    </el-form-item>
    <el-form-item label="总供应量total_supply" prop="total_supply">
      <el-input v-model="projectObj.total_supply"/>
    </el-form-item>
    <el-form-item label="当前供应量supply" prop="supply">
      <el-input v-model="projectObj.supply"/>
    </el-form-item>
    <el-form-item label="平台platform" prop="platform">
      <el-input v-model="projectObj.platform"/>
    </el-form-item>
    <el-form-item label="how_to_buy_url" prop="how_to_buy_url">
      <el-input v-model="projectObj.how_to_buy_url"/>
    </el-form-item>
    <el-form-item label="trading_since" prop="trading_since">
      <el-date-picker v-model="projectObj.trading_since" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"/>
    </el-form-item>
    <el-form-item label="stages_start" prop="stages_start">
      <el-date-picker v-model="projectObj.stages_start" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"/>
    </el-form-item>
    <el-form-item label="stages_end" prop="stages_end">
      <el-date-picker v-model="projectObj.stages_end" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"/>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'BaseInfo',
  props: {
    projectObj: {
      type: Object,
      default() {
        return {}
      }
    },
    isCreate: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      belongOptions: [
        {
          value: 0,
          label: '0:IEOs'
        },
        {
          value: 1,
          label: '1:STOs'
        },
        {
          value: 2,
          label: '2:ICOs'
        }
      ],
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped>
.desc {
  background-color: #bfcbd9;
}
</style>
