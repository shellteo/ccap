'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const passport = app.middleware.passport();
  const { router, controller } = app;
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/upload', passport, controller.user.upload);
  // comment
  router.get('/api/comment', controller.comment.index);
  router.post('/api/comment', passport, controller.comment.create);
  // favorite
  router.get('/api/favorite', passport, controller.favorite.index);
  router.post('/api/favorite', passport, controller.favorite.create);
  router.delete('/api/favorite/:id', passport, controller.favorite.destroy);
  // news
  router.get('/api/news', controller.news.index);
  // ieo
  router.get('/api/ieo', controller.ieo.index);
  router.get('/api/ieo/:id', controller.ieo.show);
  router.post('/api/ieo', controller.ieo.create);
  // mail
  router.post('/api/mail', controller.mail.send);
  // coin
  router.get('/api/all_coins', controller.coincodex.all_coins);
  router.get('/api/get_firstpage_history/:days/:samples/:coins_limit', controller.coincodex.get_firstpage_history);
  router.get('/api/get_coin_history/:symbol/:start_date/:end_date/:samples', controller.coincodex.get_coin_history);
  router.get('/api/get_coin/:symbol', controller.coincodex.get_coin);
  router.get('/api/get_markets_by_coin/:symbol', controller.coincodex.get_markets_by_coin);
};
