import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '#/layout/index'
import {useStore} from 'vuex'
const routes = [
  {
    path: '',
    component: Layout,
		redirect: '/discovery',
		children: [
			{
				path: '/discovery',
				name: 'discovery',
				redirect: '/discovery/movies',
				component: () => import('#/views/menu/Discovery/index'),
				children: [
					{
						path: 'movies',
						name: 'discovery_Movies',
						component: () => import('#/views/menu/Discovery/Movies/index'),
						meta: {title:"发现电影", keepAlive: true }
					},
					{
						path:'series',
						name: 'discovery_Series',
						component: () => import('#/views/menu/Discovery/Series/index'),
						meta: {title:"发现电视剧",  keepAlive: true }
					},
					{
						path:'animation',
						name: 'discovery_Animation',
						component: () => import('#/views/menu/Discovery/Animation/index'),
						meta: {title:"发现动漫",  keepAlive: true }
					},
					{
						path:'genres',
						name: 'discovery_Genres',
						component: () => import('#/views/menu/Discovery/Genres/index'),
						meta: {title:"发现综艺",  keepAlive: true}
					}
				]
			},
			{
				path: '/top-rated',
				name: 'top-rated',
				redirect: '/top-rated/movies',
				component: () => import('#/views/menu/TopRated/index'),
				meta: { keepAlive: true },
				children: [
					{
						path: 'movies',
						name: 'top-rated_Movies',
						component: () => import('#/views/menu/TopRated/Movies/index'),
						meta: {title:"高分电影",  keepAlive: true }
					},
					{
						path:'series',
						name: 'top-rated_Series',
						component: () => import('#/views/menu/TopRated/Series/index'),
						meta: {title:"高分电视剧",  keepAlive: true }
					},
					{
						path:'animation',
						name: 'top-rated_Animation',
						component: () => import('#/views/menu/TopRated/Animation/index'),
						meta: { title:"高分动漫", keepAlive: true }
					},
					{
						path:'genres',
						name: 'top-rated_Genres',
						component: () => import('#/views/menu/TopRated/Genres/index'),
						meta: {title:"高分综艺",  keepAlive: true}
					}
				]
			},
			{
				path:'coming-soon',
				name: 'coming-soon',
				component: () => import('#/views/menu/ComingSoon/index'),
				redirect: '/coming-soon/movies',
				meta: { keepAlive: true },
				children: [
					{
						path: 'movies',
						name: 'coming-soon_Movies',
						component: () => import('#/views/menu/ComingSoon/Movies/index'),
						meta: {title:"即将上映——电影",  keepAlive: true }
					},
					{
						path:'series',
						name: 'coming-soon_Series',
						component: () => import('#/views/menu/ComingSoon/Series/index'),
						meta: {title:"即将上映——电视剧", keepAlive: true }
					},
					{
						path:'animation',
						name: 'coming-soon_Animation',
						component: () => import('#/views/menu/ComingSoon/Animation/index'),
						meta: {title:"即将上映——动漫", keepAlive: true }
					},
					{
						path:'genres',
						name: 'coming-soon_Genres',
						component: () => import('#/views/menu/ComingSoon/Genres/index'),
						meta: {title:"即将上映——综艺", keepAlive: true}
					}
				]
			},
			// {
			// 	path:'categroy',
			// 	name: 'categroy',
			// 	component: () => import('#/views/menu/Categroy/index'),
			// 	meta: { keepAlive: true },
			// },
			{
				path:'/:pathMatch(.*)*/videoPlayer',
				name: 'videoPlayer',
				component: () => import('#/views/videoPlayer/index'),
				meta: { keepAlive: true },
			},
			{
				path:'search',
				name: 'search',
				component: () => import('#/views/searchView/index'),
				meta: { keepAlive: true },
			},
		],
  },
];
const router = createRouter({
	history: createWebHashHistory(),
	routes: 
		// Define your routes here
		routes
	
})
router.beforeEach((to, from) => {
	const store=useStore()
	store.dispatch('menu/setActiveMenu', '/'+to.path.split('/')[1]);
	store.dispatch('menu/setActiveSubMenu', to.path.split('/')[2]);
	if (to.meta.title) {
    document.title = to.meta.title
  }
	store.dispatch("menu/setAllDrawer", false)
})
export default router
