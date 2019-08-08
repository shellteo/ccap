'use strict';

const Service = require('egg').Service;

class StageService extends Service {
  async create({
    symbol,
    stage,
    start,
    end,
    bonuses,
    softcap,
    hardcap,
    personalcap
  }) {
    const { ctx } = this;
    const nowUnixTime = ctx.helper.nowUnixTime();
    const ret = await ctx.model.Stage.create({
      symbol,
      stage,
      start,
      end,
      bonuses,
      softcap,
      hardcap,
      personalcap,
      createTime: nowUnixTime,
    });
    return ret;
  }
}

module.exports = StageService;
