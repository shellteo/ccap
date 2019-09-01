<template>
  <form
    novalidate
    class="md-layout"
    @submit.prevent="validateUser">
    <h3 class="smb-title">登录</h3>
    <md-field
      :class="getValidationClass('email')"
      md-clearable>
      <label>邮箱</label>
      <md-input
        v-model="loginForm.email"
        type="email"
        name="email"
        autocomplete="email"
        required
        @blur="$v.loginForm.email.$touch"/>
      <span
        v-if="!$v.loginForm.email.required"
        class="md-error">请输入邮箱</span>
      <span
        v-else-if="!$v.loginForm.email.email"
        class="md-error">邮箱格式不正确</span>
    </md-field>
    <md-field
      :class="getValidationClass('password')">
      <label>密码</label>
      <md-input
        v-model="loginForm.password"
        required
        type="password"
        @blur="$v.loginForm.password.$touch"/>
      <span
        v-if="!$v.loginForm.password.required"
        class="md-error">请输入密码</span>
      <span
        v-else-if="!$v.loginForm.password.minLength || !$v.loginForm.password.maxLength"
        class="md-error">密码长度6 ~ 20位</span>
    </md-field>
    <md-button
      :disabled="$v.loginForm.$invalid"
      type="submit"
      class="md-raised md-primary smb-bottom-btn">登录</md-button>
    <div class="smb-bottom-tip">
      <!--<span
        class="smb-fp"
        @click="$emit('forgetPassword')">忘记密码?</span>-->
      <span
        class="smb-tr"
        @click="$emit('showRegister')">还没有账号? 注册</span>
    </div>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  email,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'
import gtMixin from '@/mixins/Geetest'

export default {
  name: 'Register',
  mixins: [gtMixin, validationMixin],
  data () {
    return {
      loginForm: {
        email: null,
        password: null
      }
    }
  },
  validations: {
    loginForm: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20)
      }
    }
  },
  methods: {
    validateUser () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.registerInitGT(this.confirmLogin)
      }
    },
    confirmLogin (gt) {
      this.$axios.post(this.apis.login, {
        email: this.loginForm.email,
        password: this.loginForm.password,
        geetest_challenge: gt.geetest_challenge,
        geetest_validate: gt.geetest_validate,
        geetest_seccode: gt.geetest_seccode
      }).then((res) => {
        if (res.code === 0) {
          this.$notify({
            group: 'smb',
            type: 'success',
            title: '登录成功'
          })
          this.$store.commit('setLoginModal', false)
          const { nickname, avatar, email, bio } = res.data
          this.$store.dispatch('storeUserInfo', {
            nickname, avatar, email, bio
          })
          this.$store.dispatch('storeAccessToken', res.data.access_token)
          window.location.reload()
        } else {
          this.$notify({
            group: 'smb',
            type: 'error',
            title: `登录失败${res.message}`
          })
        }
      })
    },
    getValidationClass (fieldName) {
      const field = this.$v.loginForm[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
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
