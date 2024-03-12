<template>
  <div class="top-bar">
    <menu-item
      class="top-bar-menu"
      :items="['Movies', 'Series', 'Animation', 'Genres']"></menu-item>
      <Search class="top-bar-menu-search"></Search>
    <action-hasnt-login v-if="!isAuthenticated" class="top-bar-action"></action-hasnt-login>
    <action-has-login v-if="isAuthenticated"  class="top-bar-action"></action-has-login>
  </div>
</template>
<script>

</script>
<script setup>
import MenuItem from "./MenuItem";
import ActionHasLogin from "./ActionHasLogin/index";
import ActionHasntLogin from "./ActionHasntLogin/index";
import Search from "#/components/Search/index";
import { computed,ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const isAuthenticated=computed(()=>store.getters.token)
</script>


<style scoped>
.top-bar {
  display: grid;
  grid-template-columns: 50vw 7vw 28vw;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  background-color: var(--movixy-one-color);
}
.top-bar-menu {
  width: 40%;
  display: flex;
  justify-content: flex-start; /* Align items to the left */
}
.top-bar-action {
  width: 100%;
  display: flex;
  justify-content: flex-end; /* Align items to the right */
}
.top-bar-menu-search{
  display: grid;
  align-items: center;
}
</style>
