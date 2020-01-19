# ieo-backend

ieo

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org

## 设计数据库
IEO Price/ICO Price/STO Price如果这些价格是英文价格，就会和ico_price一样，如果不是，就不一样
ICO的platform

- 在coin表上加字段
```
{
	init_price, // IEO Price/ICO Price/STO Price
	launchpad, // Launchpad
	roi， // ROI投资回报率
	softcap, // Softcap软顶
	hardcap // Hardcap硬顶
	raised // Raised
	bonuses // Bonuses最高多少奖金红利，可以根据这个计算 Current Bonus
	bounties // Bounties赏金
	distribution // Distribution令牌分发
}
```
- 在新闻表上加字段
```
{
	from
}
```
- 建立新表stage 
```
{
	id,
	symbol,
	stage,
	start,
	end,
	bonuses // Bonuses奖金红利
	softcap, // Softcap软顶
	hardcap // Hardcap硬顶
	personalcap // Personal Cap个人顶
}
```

## 循环列表拿到三个列表的数据，存入数据到数据库
```
{
	logo, // 存入相对路径，/coins/top-network.png，需上传到oss
	symbol,
	coin_name,
	detail_link,
	belong
}
```

### 循环数据库

拿到symbol，去请求http接口get_coin，拿到数据res.data，
数据的coin_name和数据库的coin_name比较，
不相等的话就symbol+1，再去请求http接口，如此循环10词，实在拿不到就记录下来，跳到下一条

拿到link，爬虫爬取相应网页数据拿到数据

存入数据库

# CCAP
open source and transparent cryptocurrency analysis platform http://solidnetwork.co/


