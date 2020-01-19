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
  async list() {
    const { ctx } = this;
    const result = {};
    result.count = await ctx.model.Stage.count();
    result.rows = await ctx.model.Stage.findAll();
    return result;
  }
  async find(symbol) {
    const { ctx } = this;
    return ctx.model.Stage.findAll({ where: { symbol } });
  }
}

module.exports = StageService;
