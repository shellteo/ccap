'use strict';

const Controller = require('egg').Controller;

class edgewareController extends Controller {
  async data() {
    const { ctx } = this;
    const BASE_URL = 'http://api.etherscan.io/api';
    const address = '0x1b75B90e60070d37CfA9d87AFfD124bB345bf70a';
    const sort = 'asc'; // asc desc
    const ret = await ctx.curl(`${BASE_URL}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=${sort}&apikey=YourApiKeyToken`, {
      dataType: 'json',
      timeout: [ 3000000, 3000000 ],
    });
    ctx.body = {
      ...ctx.msg.success,
      data: ret.data
    }
  }
}

module.exports = edgewareController;
