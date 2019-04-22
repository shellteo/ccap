<template>
    <tr class="coinCard-page">
        <td class="coin-name" style="width: 50%;text-align: left;">
            <div class="table-cell">
                <span class="logo-name">
                    <img src="../assets/bittorrent-token.png" alt="bittorrent">
                    BTT
                </span>
                <span class="ieo-name">BitTorrent Token</span>
            </div>
        </td>
        <td class="ieo-date" style="width: 30%;">
            <div class="table-cell">
                <span>4月1日-4月2日</span>
            </div>
        </td>
        <td class="ieo-rate" style="width: 20%;">
            <div class="table-cell">
                <van-icon name="star" color="#FFC548"/>
                <span>3.5</span>
            </div>
        </td>
    </tr>
</template>

<script>
    export default {
        name: "CoinCard"
    }
</script>

<style lang="scss" scoped>
.coinCard-page {
    background-color: #ffffff;
    font-size: 14px;
    td {
        font-size: 14px;
    }
}
.table-cell {
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.logo-name {
    @include flexSetting(row, center, flex-start);
}
.ieo-symbol {

}
.ieo-name {
    color: #999;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
    overflow: hidden;
}
/*.coin-name {
    width: 200px;
    box-sizing: border-box;
}
.ieo-date {
    width: 180px;
    box-sizing: border-box;
}
.ieo-rate {
    box-sizing: border-box;
}*/
</style>
