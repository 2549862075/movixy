import { login,getUserInfo,register ,logout} from '#/api/login'
import { getToken, setToken, removeToken } from '#/utils/auth'


const user = {
  namespaced: true,
  state: {
    token: getToken(),
    userId: '',
    name: '',
    avatar: '',
    email: '',
    isAuthenticated: false,
    preference:{}
  },

  mutations: {
    RESET_STATE: (state) => {
      state.token = ''
      state.userId = ''
      state.name = ''
      state.email = ''
      state.avatar = ''
      state.isAuthenticated = false
      state.preference = {}
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_AUTHENTICATED: (state, isAuthenticated) => {
      state.isAuthenticated = isAuthenticated
    },
    SET_PREFERENCE: (state, preference) => {
      state.preference = preference
    }
  },

  actions: {
      // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username, password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        commit('SET_USERID', data.userId)
        commit('SET_NAME', data.user_name)
        commit('SET_EMAIL', data.email)
        commit('SET_AVATAR', data.avatar)
        commit('SET_AUTHENTICATED', true)
        commit('SET_PREFERENCE', data.preference)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
       getUserInfo().then(res=>{
          const { data } = res
          commit('SET_USERID', data.userId)
          commit('SET_NAME', data.user_name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_EMAIL', data.email)
          commit('SET_AUTHENTICATED', true)
          commit('SET_PREFERENCE', data.preference)
          resolve()
      }).catch(error => {
        removeToken();
        commit('RESET_STATE')
        localStorage.removeItem('username')
        localStorage.removeItem('password')
        reject(error)
      })
    })
  },
  register({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      register({ username: username, password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        commit('SET_USERID', data.userId)
        commit('SET_NAME', data.user_name)
        commit('SET_EMAIL', data.email)
        commit('SET_AVATAR', data.avatar)
        commit('SET_AUTHENTICATED', true)
        commit('SET_PREFERENCE', data.preference)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
       // must remove  token  first
      logout().then(() => {
        removeToken()
        commit('RESET_STATE')
        //resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
      
    })
  },
  }
}

export default user;
