const setting = {
  namespaced: true,
  state: {
    theme:"blue"
  },

  mutations: {
    SET_THEME: (state, theme) => {
			state.theme = theme;
			localStorage.setItem("theme", theme);
		},
  },

  actions: {
    setTheme: ({ commit }, theme) => {
			commit("SET_THEME", theme);
		},
  },
};

export default setting;
