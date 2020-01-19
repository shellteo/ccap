'use strict';

const Service = require('egg').Service;

class CoincodexService extends Service {
  async get_coin(symbol, coin_name) {
    const { ctx } = this;
    let result = {}
    for (let i=1; i<10; i++) {
      let s = symbol;
      if (i !== 1) {
        s = `${s}${i}`
      }
      console.log('get_coin', s);
      const { data } = await ctx.curl(`https://coincodex.com/api/coincodex/get_coin/${s}`, {
        dataType: 'json',
        timeout: [ 30000, 30000 ],
      });

      ctx.logger.info(`get_coin ajax`, data);
      if (data !== null && data.coin_name === coin_name) {
        result = data
        break;
      }
    }
    if (ctx.helper.isNull(result)) {
      return false
    }
    return {
      symbol: result.symbol,
      coin_name: result.coin_name,
      shortname: result.shortname,
      slug: result.slug,
      display_symbol: result.display_symbol,
      display: result.display,
      release_date: this.checkTime(result.release_date),
      ico_price: result.ico_price,
      today_open: result.today_open,
      description: result.description,
      start: this.checkTime(result.start),
      end: this.checkTime(result.end),
      is_promoted: result.is_promoted,
      message: result.message,
      website: result.website,
      whitepaper: result.whitepaper,
      total_supply: result.total_supply,
      supply: result.supply,
      platform: result.platform,
      how_to_buy_url: result.how_to_buy_url,
      trading_since: this.checkTime(result.trading_since),
      stages_start: this.checkTime(result.stages_start),
      stages_end: this.checkTime(result.stages_end),
      social: JSON.stringify(result.social)
    }
  }
  checkTime(time) {
    const toUnixTimestamp = this.ctx.helper.toUnixTimestamp
    if(time === '0000-00-00 00:00:00' || time === null || time === '' || time === 'n/a') {
      return null
    } else {
      return toUnixTimestamp(time)
    }
  }
}

module.exports = CoincodexService;
