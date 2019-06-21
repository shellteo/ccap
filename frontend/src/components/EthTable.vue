<template>
    <el-table border
              :data="arr"
              :default-sort = "{prop: 'time', order: 'ascending'}"
              style="width: 100%">
        <el-table-column
                prop="time"
                label="时间"
                sortable
                width="150">
        </el-table-column>
        <el-table-column
                prop="from"
                label="用户地址">
            <template slot-scope="scope">
                <a :href="'https://etherscan.io/address/' + scope.row.from" target="_blank">{{scope.row.from}}</a>
            </template>
        </el-table-column>
        <!--<el-table-column
                prop="method"
                label="方法">
        </el-table-column>-->
        <el-table-column
                prop="lockTime"
                label="锁仓时间"
                width="100">
            <template slot-scope="scope">
                <span>{{lockTime(scope.row.lockTime)}}</span>
            </template>
        </el-table-column>
        <el-table-column
                prop="value"
                label="锁仓数量（eth）"
                sortable
                width="180">
            <template slot-scope="scope">
                <span>{{scope.row.value}} Ether</span>
            </template>
        </el-table-column>
        <el-table-column
                prop="blockNumber"
                label="块高度"
                width="100">
            <template slot-scope="scope">
                <a :href="'https://etherscan.io/block/' + scope.row.blockNumber" target="_blank">{{scope.row.blockNumber}}</a>
            </template>
        </el-table-column>
        <!--<el-table-column
                prop="blockHash"
                label="出块Hash">
            <template slot-scope="scope">
                <a :href="'https://etherscan.io/tx/' + scope.row.blockHash" target="_blank">{{scope.row.blockHash}}</a>
            </template>
        </el-table-column>-->
    </el-table>
</template>

<script>
export default {
    name: "CoinCard",
    props: ['arr'],
    methods: {
      lockTime(t) {
        t = parseFloat(t);
        if (t === -1) return '不锁仓'
        if (t === 0) return '3个月'
        if (t === 1) return '6个月'
        if (t === 2) return '12个月'
      }
    }
}
</script>

<style lang="scss" scoped>
</style>
