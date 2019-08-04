const express = require('express');
const app = express();

// ...

let server = app.listen(3000, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Your App is running at http://%s:%s', host, port);
});

app.get('/', function (req, res) {
  res.send(coinList);
});

// 引入所需要的第三方包
const superagent= require('superagent');

let coinList = ''

/**
 * index.js
 * [description] - 使用superagent.get()方法来访问百度新闻首页
 */
superagent.get('https://coincodex.com/ieo/top-network/').end((err, res) => {
  if (err) {
    // 如果访问失败或者出错，会这行这里
    console.log(`热点新闻抓取失败 - ${err}`)
  } else {
   // 访问成功，请求http://news.baidu.com/页面所返回的数据会包含在res
   // 抓取热点新闻数据
   coinList = getCoinList(res)
  }
});

let getCoinList = (res) => {
  let $ = cheerio.load(res.text);
  
}

// 需要获取的信息
/* 
coin_name: 'TOP'
symbol: 'TOP Network'
website: 'https://www.topnetwork.org/'

logoUrl: 
socials: {
  bitcointalk: "https://bitcointalk.org/index.php?topic=5049339.msg46810572#msg46810572"
  blog: "https://www.topnetwork.org/blog"
  discord: "https://discordapp.com/invite/ZE3Nv59"
  explorer: "https://explorer.binance.org/asset/TOP-491"
  facebook: "https://www.facebook.com/topnetworktop/"
  medium: "https://medium.com/top-network"
  reddit: "https://www.reddit.com/r/TOP_Network/"
  steem: "https://steemit.com/@topnetwork-top"
  twitter: "https://twitter.com/topnetwork_top"
  youtube: "https://www.youtube.com/channel/UCmqgnSFc6JoebcT3FJWSv-g"
} 
rating: 4.0 
overview: {
  Launchpad: 
  For Sale: 
}


*/

















let hotNews = [];                                // 热点新闻
let localNews = [];                              // 本地新闻

/**
 * index.js
 * [description] - 抓取热点新闻页面
 */
// 引入所需要的第三方包 
const cheerio = require('cheerio');

let getHotNews = (res) => {
  let hotNews = [];
  // 访问成功，请求http://news.baidu.com/页面所返回的数据会包含在res.text中。
  
  /* 使用cheerio模块的cherrio.load()方法，将HTMLdocument作为参数传入函数
     以后就可以使用类似jQuery的$(selectior)的方式来获取页面元素
   */
  let $ = cheerio.load(res.text);

  // 找到目标数据所在的页面元素，获取数据
  $('div#pane-news ul li a').each((idx, ele) => {
    // cherrio中$('selector').each()用来遍历所有匹配到的DOM元素
    // 参数idx是当前遍历的元素的索引，ele就是当前便利的DOM元素
    let news = {
      title: $(ele).text(),        // 获取新闻标题
      href: $(ele).attr('href')    // 获取新闻网页链接
    };
    hotNews.push(news)              // 存入最终结果数组
  });
  return hotNews
};

/**
 * [description] - 抓取本地新闻页面
 */
let getLocalNews = (res) => {
  let localNews = [];
  let $ = cheerio.load(res);
    
  // 本地新闻
  $('ul#localnews-focus li a').each((idx, ele) => {
    let news = {
      title: $(ele).text(),
      href: $(ele).attr('href'),
    };
    localNews.push(news)
  });
    
  // 本地资讯
  $('div#localnews-zixun ul li a').each((index, item) => {
    let news = {
      title: $(item).text(),
      href: $(item).attr('href')
    };
    localNews.push(news);
  });

  return localNews
};