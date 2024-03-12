<template>
  <div class="Moives">
    <div class="top-section">
      <Banner class="top-left-section" :BannerList="bannerList" ></Banner>
      <div class="top-right-section">
        <div class="top-right-section-title">
          <span>Top Movies</span>
          <div class="banner-action" style="cursor: pointer;">
            <span class="top-right-section-action">See More</span>
          </div>
        </div>
        <MyGrid style="height: 80%;" :TopMovieList="topMovieList" :itemCount="4" parentKey="mygrid">
        </MyGrid>
      </div>
    </div>
    <div class="middle-section">
      <div class="middle-section-title">
        <span>Popular Movies</span>
      </div>
      <el-row style="width: 100%;padding-left: 3%; padding-right: 20px;" :gutter="10">
        <el-col :span="4" v-for="item in PopularList" @click="PopularItemClick(item)">
         <NarrowCard  width="100%" :videoId="item.video_id" :imageUrl="item.video_img" :title="item.video_name" :label="item.video_label" :description="item.summary">
        </NarrowCard>
      </el-col>
      </el-row>
    </div>
    <div class="bottom-section">
      <div class="bottom-section-title">
        <span>Recommendation Movies</span>
      </div>
      <InfiniteList v-if="isMounted"></InfiniteList>
    </div>
  </div>
</template>

<script setup>
import { ref ,onMounted,computed} from "vue";
import Banner from "#/components/Banner/index";
import MyGrid from "#/components/MyGrid/index";
import NarrowCard from "#/components/NarrowCard/index";
import InfiniteList from "#/components/InfiniteList/index";
import {getBannerList} from "#/api/bannerApi";
import {getTopMovieList} from "#/api/topMovieApi";
import { getVideoByDataAndViewsNumber } from "#/api/videoApi";
import { useStore } from "vuex";
import {useRouter} from 'vue-router';
const store = useStore();
const router = useRouter();
const bannerList=ref([]);
const topMovieList=ref([]);
const PopularList=ref([]);
getBannerList({'banner_type':store.getters.activeMenuName,'video_type':store.getters.getActiveSubMenu}).then(res=>{
  bannerList.value=res.data;
})
getTopMovieList({'top_movie_type':store.getters.activeMenuName,'video_type':store.getters.getActiveSubMenu}).then(res=>{
  topMovieList.value=res.data;
})
//获取当前时间再减去一年的时间
let date = new Date();
date.setFullYear(date.getFullYear() - 1);
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
let time = year + "-" + month + "-" + day;
getVideoByDataAndViewsNumber({'time':time,'video_type':store.getters.getActiveSubMenu,'offset':0}).then(res=>{
  PopularList.value=res.data;
})
function PopularItemClick(item) {
  router.push({ path:router.currentRoute.value.path+"/videoPlayer",query:{videoId:item.video_id}})
}
const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});

</script>

<style scoped>
.discovery {
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100vh;
  color: var(--color-white)
}

.top-section {
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  height: 50vh;
}
.top-left-section {
  height: 100%;width: 65%;
}
.top-right-section {
  margin-right: 30px;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;width: 35%;
}
.top-right-section-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  font-size: larger;
  font-weight: bold;
  color: var(--color-white);
  margin-bottom: 10px;
}
.top-right-section-action{
  margin-right: 20px;
  color: var(--movixy-primary-color);
  font-size: small;
}
.middle-section {
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
}
.middle-section-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: larger;
  font-weight: bold;
  padding-left: 3%;
  color: var(--color-white);
  margin-bottom: 10px;
}
.bottom-section {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
}
.bottom-section-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: larger;
  font-weight: bold;
  padding-left: 3%;
  color: var(--color-white);
  margin-bottom: 10px;
}
</style>
