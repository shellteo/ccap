<template>
  <s-layout
    background="gray-4"
  >
    <div class="smb-user-center">
      <div class="smb-table-container">
        <h4>User Center</h4>
        <table class="smb-user-table">
          <tr>
            <td>Email</td>
            <td>
              <div
                :title="email"
                class="smb-user-value">
                {{ email || 'unfilled' }}
              </div>
            </td>
            <td/>
          </tr>
          <tr>
            <td>Nickname</td>
            <td>
              <div
                :title="nickname"
                class="smb-user-value">
                {{ nickname || 'unfilled' }}
              </div>
            </td>
            <td>
              <md-button
                class="md-icon-button"
                @click="editDialog('nickname')">
                <svg-icon
                  icon-class="pen"
                  class="smb-icon" />
              </md-button>
            </td>
          </tr>
          <tr>
            <td>Introduction</td>
            <td>
              <div
                :title="nickname"
                class="smb-user-value">
                {{ bio || 'unfilled' }}
              </div>
            </td>
            <td>
              <md-button
                class="md-icon-button"
                @click="editDialog('bio')">
                <svg-icon
                  icon-class="pen"
                  class="smb-icon" />
              </md-button>
            </td>
          </tr><tr>
            <td>Avatar</td>
            <td>
              <img
                :src="tranImg(avatar)"
                :onerror="defaultAvatar"
                alt="头像" >
            </td>
            <td>
              <md-button
                class="md-icon-button"
                @click="editDialog('avatar')">
                <svg-icon
                  icon-class="pen"
                  class="smb-icon" />
              </md-button>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <md-dialog
      :md-active.sync="showDialog"
      :md-fullscreen="false">
      <md-dialog-title>modify {{ currentLabel }}</md-dialog-title>
      <div class="smb-user-dialog">
        <template v-if="currentType === 'avatar'">
          <img
            :src="tranImg(currentValue)"
            :onerror="defaultAvatar"
            class="smb-avatar"
            alt="avatar">
          <img-upload
            :img-upload-done="imgUploadDone"
            :update-type="'avatar'"
            class="imgcard"
            @doneImageUpload="doneImageUpload"
          >
            <!--<div
              slot="uploadButton"
              class="user-avatar">
              <md-button class="md-raised">上传图片</md-button>
            </div>-->
          </img-upload>
        </template>
        <template v-else-if="currentType === 'nickname'">
          <md-field
            :class="getValidationClass('currentValue')">
            <label>{{ currentLabel }}</label>
            <md-input
              v-model="currentValue"
              @blur="$v.currentValue.$touch"/>
            <span
              v-if="!$v.currentValue.required || !$v.currentValue.minLength || !$v.currentValue.maxLength"
              class="md-error">
              Nickname is 2 to 16 characters
            </span>
          </md-field>
        </template>
        <template v-else>
          <md-field
            :class="getValidationClass('currentValue')">
            <label>{{ currentLabel }}</label>
            <md-input
              v-model="currentValue"
              @blur="$v.currentValue.$touch"/>
            <span
              v-if="!$v.currentValue.maxLength"
              class="md-error">
              Introduction is up to 50 characters
            </span>
          </md-field>
        </template>
      </div>
      <md-dialog-actions>
        <md-button
          class="md-primary"
          @click="showDialog = false">Cancel</md-button>
        <md-button
          class="md-primary"
          @click="updateUser">Confirm</md-button>
      </md-dialog-actions>
    </md-dialog>
  </s-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCookie } from '@/utils'
// import avatarDefault from '../assets/slack.png'
import imgUpload from '@/components/imgUpload/index.vue'
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'

export default {
  name: 'User',
  components: { imgUpload },
  mixins: [validationMixin],
  data () {
    return {
      defaultAvatar: `this.src="${'https://max-well.oss-cn-shanghai.aliyuncs.com/avatar.svg'}"`,
      showDialog: false,
      currentValue: '',
      currentLabel: '',
      currentType: '',
      imgUploadDone: 0 // 图片是否上传完成
    }
  },
  validations () {
    if (this.currentType === 'nickname') {
      return {
        currentValue: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(16)
        }
      }
    } else {
      return {
        currentValue: {
          maxLength: maxLength(50)
        }
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'isLoggedIn']),
    nickname () {
      return this.userInfo.nickname
    },
    email () {
      return this.userInfo.email
    },
    bio () {
      return this.userInfo.bio
    },
    avatar () {
      return this.userInfo.avatar
    }
  },
  mounted () {
    if (!getCookie('access_token')) {
      this.$router.push({ name: 'services' })
    }
  },
  methods: {
    tranImg (url) {
      return `${this.apis.IMG_URL}${url}`
    },
    editDialog (type) {
      this.currentType = type
      this.currentValue = this[type]
      switch (type) {
        case 'nickname': {
          this.currentLabel = 'Nickname'
          break
        }
        case 'bio': {
          this.currentLabel = 'Self Introduction'
          break
        }
        case 'avatar': {
          this.currentLabel = 'Change Avatar'
          break
        }
        default: {
          this.currentLabel = 'Self Introduction'
        }
      }
      this.showDialog = true
    },
    updateUser () {
      if (this.currentType === 'avatar') {
        this.confirmUpdateUser()
      } else {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.confirmUpdateUser()
        }
      }
    },
    confirmUpdateUser () {
      this.$axios.put(this.apis.userInfo, {
        [this.currentType]: this.currentValue
      }, { loading: true }).then((res) => {
        this.$notify({
          group: 'smb',
          type: 'success',
          title: 'update success'
        })
        this.showDialog = false
        this.$store.dispatch('fetchUserInfo')
      })
    },
    // 完成上传
    async doneImageUpload (res) {
      this.currentValue = res.data.url
      // this.refreshUser()
      this.imgUploadDone += Date.now()
    },
    getValidationClass (fieldName) {
      const field = this.$v[fieldName]
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
  .smb-user-dialog {
    padding: 0 20px;
  }
  .smb-user-center {
    box-sizing: border-box;
    min-height: calc(100vh - 265px);
    padding-bottom: 20px;
  }
  .smb-table-container {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  @media screen and (min-width: 1024px) {
    .smb-user-center {
      box-sizing: border-box;
      min-height: calc(100vh - 202px);
      padding: 20px 200px;
    }
  }
  table.smb-user-table {
    margin-top: 2rem;
    background-color: #ffffff;
    overflow: hidden;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
    border-radius: 2px;
    table-layout: fixed;
    border-collapse: separate;
    tr {
      /*height: 80px;
      line-height: 80px;*/
      max-width: 200px;
      td {
        vertical-align:middle;
        padding: 20px 20px;
        font-size: 16px;
        border-bottom: 1px solid #ebeef5;
        overflow-x: hidden;
        width: 33%;
        white-space: nowrap;
        word-wrap:break-word;
        word-break:break-all;
        >img {
          width: 50px;
          border-radius: 50%;
          background-color: #cccccc;
        }
        .smb-user-value {
          overflow: hidden;
          max-width: 30vw;
          text-overflow: ellipsis;
        }
      }
      td:nth-child(2) {
        color: rgba(0, 0, 0, 0.54);
      }
      td:last-of-type {
        text-align: right;
      }
    }
  }
  .smb-avatar {
    width: 100px;
    background-color: #cccccc;
  }
</style>
