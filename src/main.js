import { createApp } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './style.css'
import App from './App.vue'
import store from './store'
import router from './router'
import directive from './directive' // directive
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'//右键菜单
import ContextMenu from '@imengyu/vue3-context-menu'


//视频播放器
import Vue3VideoPlayer from '@cloudgeek/vue3-video-player'
import '@cloudgeek/vue3-video-player/dist/vue3-video-player.css'
const app=createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const myLang = {
  dashboard: {
    btn: {
      play: '播放',
      pause: '暂停',
      fullscreen: '全屏',
      exitFullscreen: '退出全屏',
      mute: '静音',
      unmute: '取消静音',
      back: '返回',
      pip: '画中画',
    },
    settings: {
      autoplay: '自动播放',
      loop: '循环播放',
      speed: '播放速度',
      resolution: '分辨率',
    },
  },
  layers: {
    error: {
      title: '错误',
      2404: '视频未找到',
      2502: '视频格式不支持',
      2503: '视频解码错误',
      2504: '视频无法播放',
      601: 'Live视频无法播放',
    },
    loading: {
      msg: '正在加载 ...',
    },
  },
};

app.use(Vue3VideoPlayer, {
  lang: myLang
})
app.use(store)
app.use(router)
app.use(directive) 
app.use(ContextMenu)
app.mount('#app')

