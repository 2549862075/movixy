const animate = {
  namespaced: true,
  state: {
    animate: "zoom",
  },

  mutations: {
    SET_ANIMATE: (state, animate) => {
			state.animate = animate;
		},
	},

  actions: {
		setAnimate: ({ commit }, animate) => {
			commit("SET_ANIMATE", animate);
		},
  },
};

export default  animate;
