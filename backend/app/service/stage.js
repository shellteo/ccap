'use strict';

const Service = require('egg').Service;

class StageService extends Service {
  async create({
    symbol,
    stage,
    start,
    end,
    bonuses,
    tokens_for_sale,
    softcap,
    hardcap,
    personalcap
  }) {
    const { ctx } = this;
    const ret = await ctx.model.Stage.create({
      symbol,
      stage,
      start,
      end,
      bonuses,
      tokens_for_sale,
      softcap,
      hardcap,
      personalcap
    });
    return ret;
  }
}

module.exports = StageService;
