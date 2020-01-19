export default {
  name: 'GeetestMixin',
  methods: {
    // 注册并初始化geeTest
    registerInitGT (cb) {
      this.$axios.request({
        url: `${this.apis.gtRegister}?t=${(new Date()).getTime()}`,
        method: 'get',
        dataType: 'json',
        loading: true
      }).then((res) => {
        window.initGeetest({
          // 以下 4 个配置参数为必须，不能缺少
          gt: res.gt,
          challenge: res.challenge,
          offline: !res.success, // 表示用户后台检测极验服务器是否宕机
          new_captcha: res.new_captcha, // 用于宕机时表示是新验证码的宕机
          lang: 'zh-cn',
          product: 'bind', // 产品形式，包括：float，popup
          width: '300px'
          // 更多配置参数说明请参见：http://docs.geetest.com/install/client/web-front/
        }, (captchaObj) => {
          captchaObj.onReady(() => {
            captchaObj.verify()
          }).onSuccess(() => {
            const result = captchaObj.getValidate()
            if (!result) {
              this.$notify({
                group: 'smb',
                type: 'error',
                title: `验证失败`
              })
            } else {
              cb(result)
            }
          })
        })
      })
    }
  }
}
