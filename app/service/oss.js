'use strict';

const path = require('path');
const fs = require('fs');
const Duplex = require('stream').Duplex;
const oss = require('ali-oss');
const Service = require('egg').Service;

class ossService extends Service {
  async uploadFile(url) {
    const { ctx } = this;
    const client = new oss({
      accessKeyId: 'LTAIZolpNW0wfr3c',
      accessKeySecret: 'QiG8RBDaCEXDvyo0LcCfZAWn6DbVnO',
      bucket: 'max-well',
      region: 'oss-cn-shanghai',
    });
    const fileName = path.basename(url);
    const buffer = await ctx.curl(url, {
      timeout: 20000,
    });
    // 上传本地文件，就获取本地文件stream
    // const img = path.join(__dirname, '../public/zooomex.png');
    // let stream = fs.createReadStream(img);
    try {
      let stream = new Duplex();
      stream.push(buffer.data);
      stream.push(null);
      // use 'chunked encoding'
      let result = await client.putStream(`coins/${fileName}`, stream);
      // console.log(result);
    } catch (e) {
      // console.log(e)
    }
  }
  async uploadImg() {
    const { ctx } = this;
    const client = new oss({
      accessKeyId: 'LTAIZolpNW0wfr3c',
      accessKeySecret: 'QiG8RBDaCEXDvyo0LcCfZAWn6DbVnO',
      bucket: 'max-well',
      region: 'oss-cn-shanghai',
    });
    const stream = await ctx.getFileStream();
    let result = await client.putStream(`coins/${fileName}`, stream);
    return result;
  }
  wfile(data, file) {
    const p = path.join(__dirname, `../public/${file}`);
    fs.writeFile(p, JSON.stringify(data), (err) => {
      if(err) {
        console.log("文件写入失败")
      } else {
        console.log("文件写入成功")
      }
    })
  }
}

module.exports = ossService;
