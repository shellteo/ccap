<template>
  <md-dialog
    :md-active.sync="showModal"
    :md-fullscreen="false">
    <div class="smb-auth">
      <Register
        v-show="currentModal === 'register'"
        @showLogin="currentModal = 'login'"/>
      <Login
        v-show="currentModal === 'login'"
        @forgetPassword="currentModal = 'forgetPassword'"
        @showRegister="currentModal = 'register'"/>
    </div>
  </md-dialog>
</template>

<script>
import Register from './Register'
import Login from './Login'

export default {
  name: 'AuthModal',
  components: {
    Register,
    Login
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showModal: false,
      currentModal: 'login'
    }
  },
  watch: {
    showModal (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.showModal = val
    }
  }
}
</script>

<style lang="scss">
.smb-auth {
  max-width: 340px;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.smb-layout {
  width: 100%;
}

.smb-bottom-btn {
  width: 100%;
  box-sizing: border-box;
  margin: 20px 0!important;
}
@media screen and (min-width: 1024px) {
  .smb-auth {
    width: 400px;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
