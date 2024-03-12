<script setup>
import { initTheme } from './utils/theme/theme';
import { useStore } from "vuex";
const store = useStore();
const theme = localStorage.getItem("theme");
if(theme){
  store.dispatch("setting/setTheme",theme);
}
if (store.getters.token) {
  store.dispatch("user/getUserInfo").then((res) => {});
}
initTheme(store.getters.theme);
</script>

<template>
  <router-view></router-view>
</template>

