<template>
  <div class="sidebar-menu" onselectstart="return false">
    <span class="title">{{ title }}</span>
    <ul class="menu">
      <li class="menu-item" v-for="item in items" :key="item.id" @click.stop="handleItemClick(item)">
        <el-row>
          <div class="menu-item-icon">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 24 24" fill="none">
              <path class="svg-path"
                :class="{ 'menu-item-icon-on': activeMenu === item.routerPath || (item.label === 'Setting' && settingDrawer) || (item.label === 'Recent Played' && store.getters.RecentPlayedDrawer) || (item.label === 'Favorites' && store.getters.FavoriteDrawer) || (item.label === 'Download' && store.getters.DownloadDrawer) }"
                v-for="path_item in item.path" :d="path_item"></path>
            </svg>
          </div>
          <span class="menu-item-name"
            :class="{ 'menu-item-name-on': activeMenu === item.routerPath || (item.label === 'Setting' && settingDrawer) || (item.label === 'Recent Played' && store.getters.RecentPlayedDrawer) || (item.label === 'Favorites' && store.getters.FavoriteDrawer) || (item.label === 'Download' && store.getters.DownloadDrawer) }">
            {{ item.label }}</span>
          <ArrowDownBold class="menu-item-dropdown" v-show="item.subItems.length > 0"
            :class="{ expanded: item.expanded }" />
          <div @click.stop="void (0)">
            <el-switch v-show="item.label == 'Dark Mode'" class="theme-switch"
              active-color="var(--movixy-primary-color)" inactive-color="var(--movixy-primary-color)" size="small"
              inactive-value="purple" active-value="blue" v-model="themedata" />
          </div>
        </el-row>
        <ul v-if="item.expanded" class="submenu">
          <li class="submenu-subitem" v-for="subItem in item.subItems" :key="subItem.id">
            <span>{{ subItem.label }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { initTheme } from "#/utils/theme/theme";
const props = defineProps({
  title: String,
});
const store = useStore();
const router = useRouter();
const themedata = ref(store.getters.theme);
const activeMenu = computed(() => store.getters.getActiveMenu);
const items = props.title == "MENU" ? store.getters.getMenu : store.getters.getOther;
const settingDrawer = computed(() => store.getters.settingDrawer);
function handleItemClick (item) {
  switch (item.label) {
    case "Dark Mode": {
      break;
    }
    case "Setting":
      {
        if (store.getters.settingDrawer) {
          store.dispatch("menu/setSettingDrawer", false)
        }
        else {
          store.dispatch("menu/setAllDrawer", false)
          store.dispatch("menu/setSettingDrawer", true)
        }
      }
      break;
    case "Recent Played":
      {
        if (store.getters.RecentPlayedDrawer) {
          store.dispatch("menu/setRecentPlayedDrawer", false)
        }
        else {
          store.dispatch("menu/setAllDrawer", false)
          store.dispatch("menu/setRecentPlayedDrawer", true)
        }
      } break;
    case "Favorites": {
      if (store.getters.FavoriteDrawer) {
        store.dispatch("menu/setFavoriteDrawer", false)
      }
      else {
        store.dispatch("menu/setAllDrawer", false)
        store.dispatch("menu/setFavoriteDrawer", true)
      }
    } break;
    case "Download": {
      if (store.getters.DownloadDrawer) {
        store.dispatch("menu/setDownloadDrawer", false)
      }
      else {
        store.dispatch("menu/setAllDrawer", false)
        store.dispatch("menu/setDownloadDrawer", true)
      }
    } break;
    default:
      router.push(item.routerPath);
  }
}
watch(
  () => themedata.value,
  (newVal, oldVal) => {
    initTheme(newVal);
    store.dispatch("setting/setTheme", newVal);
  }
);
</script>

<style scoped>
.sidebar-menu {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.title {
  width: 100%;
  font-size: normal;
  font-weight: bold;
  color: grey;
  text-align: left;
}

.menu {
  list-style: none;
  padding: 0;
}

.menu-item {
  flex-direction: column;
  justify-content: flex-start;
  height: auto;
  min-height: 5vh;
  width: 13vw;
  display: flex;
  align-items: start;
  cursor: pointer;
}

.menu-item-icon {
  margin-right: 20px;
  width: 24px;
  height: 24px;
}

.svg-path {
  fill: var(--movixy-three-color);
}

.menu-item-icon-on {
  fill: var(--movixy-primary-color);
}

.menu-item-name {
  font-size: small;
  color: var(--movixy-three-color);
  margin-right: 2vw;
}

.menu-item-name-on {
  color: var(--color-white);
}

.menu-item-dropdown {
  margin-top: 4%;
  color: var(--movixy-three-color);
  height: 18px;
  width: 18px;
  transition: transform 0.3s;
}

.menu-item-dropdown.expanded {
  transform-origin: center center;
  transform: rotate(180deg);
}

.submenu {
  list-style: none;
  padding: 0;
  margin-top: 10px;
}

.submenu-subitem {
  height: 5vh;
  display: flex;
  align-items: center;
  font-size: small;
  color: var(--movixy-three-color);
  padding-left: 44px;
}
</style>
