<template>
  <div class="AppMain">
    <router-view v-if="$route.meta.keepAlive" v-slot="{ Component }">
          <keep-alive>
          <transition :name="animate">
            <component :is="Component" />
            </transition>
          </keep-alive>
        </router-view>
  </div>
</template>

<script setup>
import 'animate.css/animate.min.css' //引入动画
import { onMounted,computed } from 'vue';
import{useRoute} from 'vue-router'
import {useStore} from 'vuex' 
const store = useStore()
const animate = computed(() => store.getters.animate)
</script>

<style scoped>
.AppMain {
  background-color: var(--movixy-one-color);
  width: 100%;
  height: 100%;
  overflow: auto;
}
.zoom-enter-active {
  animation: zoomIn 1s;
}
.zoom-leave-active {
  animation: zoomOut 0.5s;
}
.fade-enter-active {
  animation: fadeIn 1s;
}
.fade-leave-active {
  animation: fadeOut 0.5s;
}
.fade2-enter-active {
  animation: fadeInDown 1s;
}
.fade2-leave-active {
  animation: fadeOutDown 0.5s;
}
</style>
