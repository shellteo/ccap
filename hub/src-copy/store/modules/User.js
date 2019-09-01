import axios from 'axios'

const state = {
  loggedIn: undefined,
  syncLogged: undefined,
  user: undefined,
  installations: [],
  installationId: undefined,
  page: 1,
  perPage: 10,
  repositories: [],
  fetching: [],
  refreshing: false,
  search: '',
  ownerUuid: '',
  graphqlToken: ''
}

const getters = {
  isUserRefreshing (state) {
    return state.refreshing
  },
  isUserLoggedIn (state) {
    return state.loggedIn
  },
  isUserSyncLogged (state) {
    return state.syncLogged
  },
  getUser (state) {
    return state.user
  },
  getUserLogin (state) {
    return state.user ? state.user.login : ''
  },
  getUserAvatarUrl (state) {
    return state.user ? state.user.avatarUrl : ''
  },
  getRepositories (state) {
    const repo = state.repositories.find(r => r.page === state.page && r.installationId === state.installationId)
    return repo ? repo.repositories : [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
  },
  getPageRepositories (state) {
    return (page) => {
      const repo = state.repositories.find(r => r.page === page && r.installationId === state.installationId)
      return repo ? repo.repositories : [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    }
  },
  getInstallations (state) {
    return state.installations
  },
  getInstallation (state) {
    return state.installations.length > 0 ? state.installations.find(i => i.id === state.installationId) : undefined
  },
  getPage (state) {
    return state.page
  },
  getPages (state) {
    const installation = state.installations.length > 0 ? state.installations.find(i => i.id === state.installationId) : undefined
    return installation && installation.total ? Math.ceil(installation.total / state.perPage) : 0
  },
  hasNextPage (state) {
    const currentInstallation = state.installations.find(i => i.id === state.installationId)
    return currentInstallation && currentInstallation.total ? state.page * state.perPage < currentInstallation.total : false
  },
  hasPrevPage (state) {
    return state.page > 1
  },
  getPerPage (state) {
    return state.perPage
  },
  getOwnerUuid (state) {
    return state.ownerUuid
  },
  getGraphqlToken (state) {
    return state.graphqlToken
  }
}

const mutations = {
  setUserRefreshing (state, refreshing) {
    state.refreshing = refreshing
  },
  setUserLoggedIn (state, loggedIn) {
    state.loggedIn = loggedIn
  },
  setUserSyncLogged (state, syncLogged) {
    state.syncLogged = syncLogged
  },
  setUser (state, user) {
    state.user = user
  },
  setInstallations (state, installations) {
    state.installations = installations
  },
  setInstallation (state, installationId) {
    state.installationId = installationId
  },
  setPage (state, {
    installationId,
    page
  }) {
    state.installationId = installationId
    state.page = page
  },
  addFetching (state, {
    installationId,
    page
  }) {
    state.fetching.push({
      page,
      installationId
    })
  },
  removeFetching (state, {
    installationId,
    page
  }) {
    const idx = state.fetching.findIndex(f => f.page === page && f.installationId === installationId)
    if (idx !== -1) {
      state.fetching.splice(idx, 1)
    }
  },
  addRepositories (state, {
    page,
    installationId,
    repositories
  }) {
    state.repositories.push({
      page,
      installationId,
      repositories
    })
  },
  removeRepositories (state, installationId) {
    const items = state.repositories.filter(r => r.installationId === installationId)
    for (let item of items) {
      state.repositories.splice(state.repositories.indexOf(item), 1)
    }
  },
  setTotal (state, {
    installationId,
    total
  }) {
    let installation = state.installations.find(i => i.id === installationId)
    const idx = state.installations.indexOf(installation)
    installation.total = total
    state.installations.splice(idx, 1, installation)
  },
  setPerPage (state, perPage) {
    state.perPage = perPage
  },
  setSearch (state, query) {
    state.search = query
  },
  setGraphqlToken (state, token) {
    state.graphqlToken = token
  },
  setOwnerUuid (state, uuid) {
    state.ownerUuid = uuid
  }
}

const actions = {
  /* fetchUser ({
    state,
    commit
  }) {
    return new Promise((resolve, reject) => {
      commit('setUserRefreshing', true)
      axios.get(`${process.env.VUE_APP_API_BASEURL}user`, {
        withCredentials: true
      }).then((res) => {
        commit('setUserLoggedIn', true)
        commit('setUser', res.data)
        commit('setUserRefreshing', false)
        resolve(state.user)
      }).catch((err) => {
        commit('setUserLoggedIn', false)
        commit('setUser', undefined)
        commit('setUserRefreshing', false)
        reject(err)
      })
    })
  },
  logout ({
    commit
  }) {
    return new Promise(resolve => {
      axios.delete(`${process.env.VUE_APP_API_BASEURL}user`, {
        withCredentials: true
      }).then(() => {
        commit('setUserLoggedIn', false)
        commit('setUser', undefined)
        commit('setOwnerUuid', '')
        resolve()
      }).catch((err) => {
        console.log(err)
      })
    })
  }, */
  setupGraphQLAuth ({
    state,
    commit
  }) {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.VUE_APP_API_BASEURL}user/internal`, {
        withCredentials: true
      }).then(res => {
        commit('setOwnerUuid', res.data.uuid || '')
        commit('setGraphqlToken', res.data.token || '')
        if (res.data.token && res.data.token !== window.localStorage.getItem('storyscript-hub')) {
          window.localStorage.setItem('storyscript-hub', res.data.token)
          resolve(res.data.token)
        } else {
          resolve(null)
        }
      }).catch(reject)
    })
  },
  setupInstallation ({
    state,
    commit,
    dispatch
  }, {
    page = 1,
    installationId
  }) {
    return new Promise(resolve => {
      if (state.installations.length > 0 && state.installations.findIndex((i) => i.id === installationId) !== -1) {
        commit('setInstallation', installationId)
        dispatch('fetchRepositories', {
          page: page,
          installationId
        }).then(resolve)
      }
    })
  },
  fetchInstallations ({
    state,
    commit
  }) {
    return new Promise(resolve => {
      if (state.installations.length > 0) {
        resolve(state.installations)
      } else {
        axios.get(`${process.env.VUE_APP_API_BASEURL}user/installations`, {
          withCredentials: true
        }).then((res) => {
          commit('setInstallations', res.data.installations)
          resolve(state.installations)
        }).catch((err) => {
          if (err.response.status === 401) {
            console.error('401 detected: redirects to the login route')
            window.location = `${process.env.VUE_APP_API_BASEURL}auth`
          }
        })
      }
    })
  },
  prevPage ({
    state,
    dispatch
  }) {
    return new Promise(resolve => {
      if (state.page > 1) {
        dispatch('fetchRepositories', {
          installationId: state.installationId,
          page: state.page - 1
        }).then(resolve)
      }
    })
  },
  nextPage ({
    state,
    dispatch
  }) {
    return new Promise(resolve => {
      const currentInstallation = state.installations.find(i => i.id === state.installationId)
      if (state.installations.length > 0 && state.installationId && state.page * state.perPage < currentInstallation.total) {
        dispatch('fetchRepositories', {
          installationId: state.installationId,
          page: state.page + 1
        }).then(resolve)
      }
    })
  },
  setPerPageAndFetch ({
    commit,
    dispatch
  }, perPage) {
    return new Promise(resolve => {
      commit('removeRepositories', state.installationId)
      commit('setPerPage', perPage)
      dispatch('fetchRepositories', {
        page: 1,
        installationId: state.installationId
      }).then(resolve)
    })
  },
  fetchRepositories ({
    state,
    commit,
    dispatch
  }, {
    installationId = 0,
    page = 1
  }) {
    return new Promise(resolve => {
      if (installationId === -1) {
        resolve()
        return
      }
      commit('setPage', {
        page,
        installationId
      })
      if (state.fetching.findIndex(f => f.page === page && f.installationId === installationId) === -1 &&
        state.repositories.findIndex(r => r.page === page && r.installationId === installationId) === -1) {
        commit('addFetching', {
          page,
          installationId
        })
        axios.get(`${process.env.VUE_APP_API_BASEURL}user/installation/${installationId}/repos?page=${page}&per_page=${state.perPage}`, {
          withCredentials: true
        }).then((res) => {
          commit('addRepositories', {
            page,
            installationId,
            repositories: res.data.repositories
          })
          commit('removeFetching', {
            page,
            installationId
          })
          commit('setTotal', {
            installationId,
            total: res.data.total
          })
          if (page > Math.ceil(res.data.total / state.perPage)) {
            dispatch('fetchRepositories', {
              installationId,
              page: 1
            }).then(resolve)
          } else {
            resolve()
          }
        })
      } else {
        resolve()
      }
    })
  },
  fetchRepository (state, {
    installationId,
    repoName
  }) {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.VUE_APP_API_BASEURL}user/installation/${installationId}/repo/${repoName}`, {
        withCredentials: true
      }).then((res) => {
        resolve(res.data)
      }).catch(reject)
    })
  },
  getInstallationByName ({
    state,
    dispatch
  }, installationName) {
    return new Promise(resolve => {
      const installation = state.installations.find(i => i.login.toLowerCase() === installationName.toLowerCase())
      if (installation) {
        resolve(installation)
      } else {
        dispatch('fetchInstallations').then((installations) => {
          resolve(installations.find(i => i.login.toLowerCase() === installationName.toLowerCase()))
        })
      }
    })
  },
  searchRepository ({
    state,
    commit,
    getters,
    dispatch
  }, query) {
    return new Promise(resolve => {
      commit('setSearch', query)
      let arr = []
      for (let page = 1; page <= getters.getPages; page++) {
        dispatch('fetchRepositories', {
          installationId: state.installationId,
          page: page
        }).then(() => {
          arr.push(...getters.getPageRepositories(page))
          if (page === getters.getPages) {
            if (arr.reduce((arr, c) => c.name ? [...arr, c.name] : arr, []).length === arr.length) {
              const interval = setInterval(() => {
                if (arr.length === getters.getInstallation.total) {
                  clearInterval(interval)
                  resolve(arr.filter(r => ((r.name || '').toLowerCase().includes(state.search.toLowerCase()) || (r.description || '').toLowerCase().includes(state.search.toLowerCase()))))
                }
              }, 100)
            } else {
              resolve(undefined)
            }
          }
        })
      }
    })
  },
  publishService (_this, {
    installationId,
    repoName,
    name,
    description,
    category,
    pullUrl,
    topics,
    _public
  }) {
    return new Promise((resolve, reject) => {
      const service = {
        name,
        description,
        category: category.toLowerCase(),
        pullUrl,
        topics,
        _public
      }
      axios.post(`${process.env.VUE_APP_API_BASEURL}user/installation/${installationId}/repo/${repoName}`, service, {
        withCredentials: true
      }).then(resolve).catch(reject)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
