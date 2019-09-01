---
category: Components
subtitle: 图片上传
type: 上传图片
title: imgUpload
---

上传图片
> 如果扩展组件请更新文档

## 何时使用

```js
// 导入
import imgUpload from '@/components/imgUpload/index.vue';
components: { imgUpload },

// 使用组件
<img-upload 
    :imgUploadDone="imgUploadDone" 
    @doneImageUpload="doneImageUpload">
        // slot 根据实际情景定义按钮,否则使用默认按钮
        <img slot="uploadButton" /> 
</img-upload>
```

## API

| 参数 | 说明 | 类型 | 默认值 | 必须 |
| --- | --- | --- | --- | --- |
| buttonText | 按钮文字 | string | 保存 | fasle |
| imgSize | 显示上传图片大小 单位 M | Number | 2 | false |
| imgUploadDone | 是否上传完成 | Number | 0 上传完成++/+= Date.now() 改变数值 | true |
| compressorSetting | 压缩图片 | Object | status: true \| quality: 0.8 | false |
| aspectRatio | 比列 | Number | 1 / 1 | false |


接口地址

```js
ifpsUpload, // from by api/ipfs.js
``` 

上传完成事件

````js
@doneImageUpload="doneImageUpload"

// 上传完成
doneImageUpload(res) {
    // res  接口返回值
    this.imgUploadDone += 1; // 上传完成
},
```