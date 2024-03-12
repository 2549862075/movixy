import user from './modules/user'
import menu from './modules/menu'
import setting from './modules/setting'
import animate from './modules/animate'
import getters from './getters'
import Vuex from 'vuex'


const store = new Vuex.Store({
  modules: {
    namespaced: true,
    user,
    menu,
    setting,
    animate
  },
  getters
})

export default store