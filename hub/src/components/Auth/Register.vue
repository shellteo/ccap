<template>
  <form
    novalidate
    class="md-layout"
    @submit.prevent="validateUser">
    <h3 class="smb-title">注册</h3>
    <md-field
      :class="getValidationClass('email')"
      md-clearable>
      <label>邮箱</label>
      <md-input
        v-model="registerForm.email"
        type="email"
        name="email"
        autocomplete="email"
        required
        @blur="$v.registerForm.email.$touch"/>
      <span
        v-if="!$v.registerForm.email.required"
        class="md-error">请输入邮箱</span>
      <span
        v-else-if="!$v.registerForm.email.email"
        class="md-error">邮箱格式不正确</span>
    </md-field>
    <md-field
      :class="getValidationClass('password')">
      <label>密码</label>
      <md-input
        v-model="registerForm.password"
        required
        type="password"
        @blur="$v.registerForm.password.$touch"/>
      <span
        v-if="!$v.registerForm.password.required"
        class="md-error">请输入密码</span>
      <span
        v-else-if="!$v.registerForm.password.minLength || !$v.registerForm.password.maxLength"
        class="md-error">密码长度6 ~ 20位</span>
    </md-field>
    <md-field
      :class="getValidationClass('rePassword')">
      <label>确认密码</label>
      <md-input
        v-model="registerForm.rePassword"
        required
        type="password"
        @blur="$v.registerForm.rePassword.$touch"/>
      <span
        v-if="!$v.registerForm.rePassword.sameAsPassword"
        class="md-error">两次密码不相同</span>
    </md-field>
    <div class="md-verify-code">
      <md-field
        :class="getValidationClass('verifyCode')"
        md-clearable>
        <label>验证码</label>
        <md-input
          v-model="registerForm.verifyCode"
          required
          @blur="$v.registerForm.verifyCode.$touch"/>
        <span
          v-if="!$v.registerForm.verifyCode.required"
          class="md-error">请输入验证码</span>
        <span
          v-else-if="!$v.registerForm.verifyCode.minLength || !$v.registerForm.verifyCode.maxLength || !$v.registerForm.verifyCode.numeric"
          class="md-error">验证码为6位数字</span>
      </md-field>
      <md-button
        :disabled="$v.registerForm.email.$invalid || !!timer || disabledSendCode"
        class="md-raised smb-send-code"
        @click="sendCode">{{ timer ? `${count}S` : `发送验证码` }}</md-button>
    </div>
    <md-button
      :disabled="$v.registerForm.$invalid"
      type="submit"
      class="md-raised md-primary smb-bottom-btn">注册</md-button>
    <div class="smb-bottom-tip"><span @click="$emit('showLogin')">已有账号，登录</span></div>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  email,
  sameAs,
  minLength,
  maxLength,
  numeric
} from 'vuelidate/lib/validators'
import gtMixin from '@/mixins/Geetest'

const TIME_COUNT = 60
export default {
  name: 'Register',
  mixins: [gtMixin, validationMixin],
  data () {
    return {
      registerForm: {
        email: null,
        password: null,
        rePassword: null,
        verifyCode: null
      },
      count: '',
      timer: null,
      disabled: false,
      disabledSendCode: false
    }
  },
  validations: {
    registerForm: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20)
      },
      rePassword: { sameAsPassword: sameAs('password') },
      verifyCode: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(6),
        numeric
      }
    }
  },
  computed: {
  },
  mounted () {
    // console.log(this.$v)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  methods: {
    clearForm () {
      this.$v.$reset()
      this.registerForm.email = null
      this.registerForm.password = null
      this.registerForm.rePassword = null
      this.registerForm.verifyCode = null
    },
    confirmRegister (gt) {
      this.$axios.post(this.apis.register, {
        email: this.registerForm.email,
        password: this.registerForm.password,
        code: this.registerForm.verifyCode,
        geetest_challenge: gt.geetest_challenge,
        geetest_validate: gt.geetest_validate,
        geetest_seccode: gt.geetest_seccode
      }).then((res) => {
        if (res.code === 0) {
          this.$notify({
            group: 'smb',
            type: 'success',
            title: '注册成功'
          })
          this.$store.commit('setLoginModal', false)
          const { nickname, avatar, email, bio } = res.data
          this.$store.dispatch('storeUserInfo', {
            nickname, avatar, email, bio
          })
          this.$store.dispatch('storeAccessToken', res.data.access_token)
        } else {
          this.$notify({
            group: 'smb',
            type: 'error',
            title: `注册失败${res.message}`
          })
        }
      })
    },
    validateUser () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.registerInitGT(this.confirmRegister)
      }
    },
    getValidationClass (fieldName) {
      const field = this.$v.registerForm[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    // 倒计时函数
    countDown () {
      if (!this.timer) {
        this.count = TIME_COUNT
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    confirmSendCode (gt) {
      this.disabledSendCode = true
      this.$axios.post(this.apis.sendMail, {
        mail: this.registerForm.email,
        geetest_challenge: gt.geetest_challenge,
        geetest_validate: gt.geetest_validate,
        geetest_seccode: gt.geetest_seccode
      }).then((res) => {
        this.disabledSendCode = false
        if (res.code === 0) {
          this.countDown()
          this.$notify({
            group: 'smb',
            type: 'success',
            title: '验证码发送成功'
          })
        } else {
          this.$notify({
            group: 'smb',
            type: 'error',
            title: res.message || '验证码发送失败'
          })
        }
      })
    },
    sendCode () {
      this.registerInitGT(this.confirmSendCode)
    },
    register () {

    }
  }
}
</script>

<style lang="scss" scoped>
.smb-bottom-tip {
  display: flex;
  font-size: 0.9rem;
  margin-top: 1.2rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  span {
    color: #7f868a;
    text-decoration: none;
    cursor: pointer;
  }
}
.smb-title {
  text-align: center;
  font-size: 2rem;
  width: 100%;
}
.md-verify-code {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  .smb-send-code {
    margin-bottom: 24px;
  }
}
.smb-bottom-btn {
  width: 100%;
}
</style>
