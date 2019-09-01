'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // 前端jwt鉴权
  const passport = app.middleware.passport({ management: false });
  const parseUser = app.middleware.parseUser();
  // 后台管理系统jwt鉴权
  const managementPassport = app.middleware.passport({ management: true });
  // geetest
  const gtVerify = app.middleware.geetest();
  // 加载app
  require('./validate')(app);

  const { router, controller } = app;
  router.post('/api/user/register', gtVerify, controller.user.register);
  router.post('/api/user/login', gtVerify, controller.user.login);
  router.get('/api/user/info', passport, controller.user.userInfo);
  router.put('/api/user/info', passport, controller.user.update);
  router.post('/api/upload', passport, controller.user.upload);
  // comment
  router.get('/api/comment', parseUser, controller.comment.index);
  router.post('/api/comment', passport, gtVerify, controller.comment.create);
  router.get('/api/comment/:symbol', controller.comment.show);
  router.post('/api/likecomment/:id', passport, controller.comment.likeComment);
  // favorite
  router.get('/api/favorite', passport, controller.favorite.index);
  router.post('/api/favorite', passport, controller.favorite.create);
  router.delete('/api/favorite/:id', passport, controller.favorite.destroy);
  // news
  router.get('/api/news', controller.news.index);
  router.get('/api/news/:symbol', controller.news.show);
  // ieo
  router.get('/api/ieo', controller.ieo.index);
  router.get('/api/ieo/:id', controller.ieo.show);
  router.post('/api/ieo', controller.ieo.create);
  // mail，geetest校验
  router.post('/api/mail', gtVerify, controller.mail.send);
  // coincodex
  router.get('/api/all_coins', controller.coincodex.all_coins);
  router.get('/api/get_firstpage_history/:days/:samples/:coins_limit', controller.coincodex.get_firstpage_history);
  router.get('/api/get_coin_history/:symbol/:start_date/:end_date/:samples', controller.coincodex.get_coin_history);
  router.get('/api/get_coin/:symbol', controller.coincodex.get_coin);
  router.get('/api/get_markets_by_coin/:symbol', controller.coincodex.get_markets_by_coin);
  router.get('/api/edgeware', controller.edgeware.data);
  // coin
  router.get('/api/coin', controller.coin.index);
  router.get('/api/coin/:symbol', controller.coin.show);
  // stage
  router.get('/api/stage/:symbol', controller.stage.show);

  /* -----------------geetest------------------ */
  router.get('/gt/register-slide', controller.geetest.register);
  router.post('/gt/validate-slide', controller.geetest.validate);

  /* -----------------后台管理系统接口------------------*/
  router.post('/management/login', controller.management.login);
  router.post('/api/coin', managementPassport, controller.coin.create);
  router.put('/api/coin/:symbol', managementPassport, controller.coin.update);
  /* -----------------爬虫------------------*/
  router.get('/api/spider/coin', controller.management.spider);
  router.get('/api/spider/list', controller.management.coinlist);
  router.get('/api/crawler/detail', controller.management.getCrawler);
  router.get('/api/crawler/updateCoin', controller.management.updateCoin);
  router.get('/api/crawler/createStage', controller.management.createStage);
  router.get('/api/crawler/createNews', controller.management.createNews);
  router.get('/api/crawler/insertCoin', controller.management.insertCoin);
};
