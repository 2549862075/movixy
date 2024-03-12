const getters = {
	getMenu: (state) => state.menu.menu,
	getOther: (state) => state.menu.other,
	getActiveMenu: (state) => state.menu.activeMenu,
	activeMenuName: (state) => String(state.menu.activeMenu).split('/')[1],
	getActiveSubMenu: (state) => state.menu.activeSubMenu,
	settingDrawer:(state)=>state.menu.settingDrawer,
	RecentPlayedDrawer:(state)=>state.menu.RecentPlayedDrawer,
	FavoriteDrawer:(state)=>state.menu.FavoriteDrawer,
	token: state => state.user.token,
	user_id: state => state.user.userId,
	name: state => state.user.name,
	email: state => state.user.email,
  avatar: state => state.user.avatar,
	preference: state => state.user.preference,
	theme: state => state.setting.theme,
	animate: state => state.animate.animate,
}
export default getters