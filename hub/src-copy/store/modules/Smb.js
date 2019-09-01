import { setCookie, getCookie, delCookie } from '@/utils'
import { _axios } from '@/plugins/axios'
import apis from '@/apis/api'

const state = {
  loginModalShow: false,
  accessToken: null,
  email: '',
  avatar: '',
  nickname: '',
  bio: ''
}

const getters = {
  isLoggedIn (state) {
    return !!state.accessToken
  },
  userInfo (state) {
    return {
      email: state.email,
      avatar: state.avatar,
      nickname: state.nickname,
      bio: state.bio
    }
  }
}

const mutations = {
  setLoginModal (state, show) {
    state.loginModalShow = show
  },
  setAccessToken (state, accessToken) {
    state.accessToken = accessToken
  },
  setUserInfo (state, { avatar, nickname, email, bio }) {
    state.avatar = avatar
    state.nickname = nickname
    state.email = email
    state.bio = bio
  }
}

const actions = {
  fetchUserInfo ({
    state,
    commit,
    dispatch
  }) {
    _axios.get(apis.userInfo).then((res) => {
      if (res.code === 0) {
        const { email, avatar, nickname, bio } = res.data
        dispatch('storeUserInfo', { email, avatar, nickname, bio })
        dispatch('storeAccessToken', getCookie('access_token'))
      }
    }).catch(() => {
      dispatch('logout')
    })
  },
  storeAccessToken ({ commit }, accessToken) {
    setCookie('access_token', accessToken)
    commit('setAccessToken', accessToken)
  },
  storeUserInfo ({ commit }, { nickname, avatar, email, bio }) {
    localStorage.setItem('nickname', nickname)
    localStorage.setItem('avatar', avatar)
    localStorage.setItem('email', email)
    localStorage.setItem('bio', bio)
    // 计入vuex
    commit('setUserInfo', { avatar, nickname, email, bio })
  },
  logout ({
    commit,
    dispatch
  }) {
    delCookie('access_token')
    commit('setAccessToken', null)
    dispatch('storeUserInfo', { email: '', avatar: '', nickname: '', bio: '' })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
