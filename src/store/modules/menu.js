import { ElMessage } from "element-plus";
import store from "..";

const menu = {
  namespaced: true,
  state: {
    menu: [],
    other: [],
    activeMenu: null,
    activeSubMenu: null,
    settingDrawer: false,
    RecentPlayedDrawer: false,
    FavoriteDrawer: false,
  },

  mutations: {
    setMenu: (state, menu) => {
      state.menu = menu;
    },
    setOther: (state, other) => {
      state.other = other;
    },
    setActiveMenu: (state, activeMenu) => {
      state.activeMenu = activeMenu;
    },
    setActiveSubMenu: (state, activeSubMenu) => {
      state.activeSubMenu = activeSubMenu;
    },
    setSettingDrawer: (state, settingDrawer) => {
      state.settingDrawer = settingDrawer;
    },
    setRecentPlayedDrawer: (state, RecentPlayedDrawer) => {
      state.RecentPlayedDrawer = RecentPlayedDrawer;
    },
    setFavoriteDrawer: (state, FavoriteDrawer) => {
      state.FavoriteDrawer = FavoriteDrawer;
    },
    setAllDrawer: (state, allDrawer) => {
      state.settingDrawer = allDrawer;
      state.RecentPlayedDrawer = allDrawer;
      state.FavoriteDrawer = allDrawer;
    },
  },

  actions: {
    setMenu: ({ commit }, menu) => {
      commit("setMenu", menu);
    },
    setOther: ({ commit }, other) => {
      commit("setOther", other);
    },
    setActiveMenu: ({ commit }, activeMenu) => {
      commit("setActiveMenu", activeMenu);
    },
    setActiveSubMenu: ({ commit }, activeSubMenu) => {
      commit("setActiveSubMenu", activeSubMenu);
    },
    setSettingDrawer: ({ commit }, settingDrawer) => {
      if (store.getters.user_id) {
        commit("setSettingDrawer", settingDrawer);
      } else {
        ElMessage({
          showClose: true,
          message: "Please login first",
          type: "error",
          duration: 5000,
        });
      }
    },
    setFavoriteDrawer: ({ commit }, FavoriteDrawer) => {
      if (store.getters.user_id) {
        commit("setFavoriteDrawer", FavoriteDrawer);
      } else {
        ElMessage({
          showClose: true,
          message: "Please login first",
          type: "error",
          duration: 5000,
        });
      }
    },
    setRecentPlayedDrawer: ({ commit }, RecentPlayedDrawer) => {
      if (store.getters.user_id) {
        commit("setRecentPlayedDrawer", RecentPlayedDrawer);
      } else {
        ElMessage({
          showClose: true,
          message: "Please login first",
          type: "error",
          duration: 5000,
        });
      }
    },
    setAllDrawer: ({ commit }, allDrawer) => {
      commit("setAllDrawer", allDrawer);
    },
  },
};

export default menu;
