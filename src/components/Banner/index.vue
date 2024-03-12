<template>
  <div class="banner">
    <el-carousel
      @change="bannerChange"
      :autoplay="true"
      trigger="click"
      style="height: 90%; width: 90%; margin-top: 3vh;  border-radius: 30px"
      height="98%"
      v-if="BannerList.length > 0"
    >
      <el-carousel-item
        class="banner-main"
        v-for="item in BannerList"
        :key="item.video.video_id"
        @click="bannerClick(currentItem)"
      >
        <img
          v-image-is-exist="item.video.video_img"
          :title="item.video.video_name"
          style="
            object-fit: fill;
            width: 100%;
            height: 100%;
            border-radius: 30px;
          "
        />
      </el-carousel-item>
    </el-carousel>
    <div class="content">
      <div class="banner-title">
        <span>{{ currentItem.video_name }}</span>
      </div>
      <div class="banner-label">
        {{ video_label }}
      </div>
      <div class="banner-action">
        <button class="banner-play-button" @click="bannerClick(currentItem)">
          <el-icon :size="18"> <CaretRight /></el-icon>
          Watch Now
        </button>
        <button class="banner-add-button" @click="addFavoriteClick(currentItem)">
          <el-icon :size="18" style="margin-right: 5px">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              width="24px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fill="var(--color-white)"
                d="M7.6 3C9.29038 3 10.8323 3.84142 12 4.8C13.1677 3.84142 14.7096 3 16.4 3C20.0451 3 23 5.71049 23 9.05386C23 15.795 15.3274 19.721 12.7981 20.8321C12.2886 21.056 11.7114 21.056 11.2019 20.8321C8.67259 19.721 1 15.7948 1 9.0537C1 5.71033 3.95492 3 7.6 3Z"
              ></path>
            </svg>
          </el-icon>
          Add Favorite
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch} from "vue";
import { useRouter } from "vue-router";
import {addVideoToFavorite} from "#/api/favoriteApi";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
const router = useRouter();
const store = useStore();
const props = defineProps({
  BannerList: Array,
});
const currentItem = ref({
  video_id: 1,
  video_img: "https://picsum.photos/426/240",
  video_name: "",
  video_label: "",
});
watch(
  () => props.BannerList,
  (newVal) => {
    currentItem.value = newVal[0].video;
  }
);
const video_label=computed(()=>{
  //去除首尾[和]
    return currentItem.value.video_label.replace(/(^\[)|(\]$)/g, "").replace(/\//g," • ")
})
function bannerClick(item) {
  router.push({ path:router.currentRoute.value.path+"/videoPlayer",query:{videoId:item.video_id}})
}
function bannerChange(index) {
  currentItem.value = props.BannerList[index].video;
}
function addFavoriteClick(item) {
  if(!store.getters.user_id){
    ElMessage({
      message: '请先登录',
      type: 'warning',
      duration: 2000
    });
  }else{
  addVideoToFavorite({userId:store.getters.user_id,videoId:item.video_id}).then(res=>{
    ElMessage({
      message: res.message,
      type: 'success',
      duration: 2000
    });
  })}
}
</script>

<style lang="less" scoped>
.banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}

.banner-main {
  margin-top: 1px;
  background-size: cover;
  border-radius: 30px;
  box-shadow: 0 1px 1px 0 var(--color-white), 0 1px 1px 0 var(--color-white);
}
.banner-main:hover {
  box-shadow: 0 3px 4px 0 var(--color-white), 0 5px 12px 0 var(--color-white);
}
.content {
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  margin-left: -40%;
  margin-top: -18%;
}
.banner-title {
  font-size: x-large;
  font-weight: bold;
  color: white;
  display: -webkit-box;
  -webkit-line-clamp: 1; /*限制行数*/
  -webkit-box-orient: vertical;
  text-overflow: ellipsis; /*超出部分省略号表示*/
  overflow: hidden; /*超出部分隐藏*/
  text-align: left;
}
.banner-label {
  font-size: small;
  color: var(--description-color);
  white-space: nowrap;
  text-overflow: ellipsis; /*超出部分省略号表示*/
  overflow: hidden; /*超出部分隐藏*/
  text-align: left;
  mix-blend-mode: difference;
}

.banner-action {
  display: flex;
  flex-direction: row;
  margin-top: 2vh;
}
.banner-play-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: small;
  align-items: center;
  background-color: var(--movixy-primary-color);
  width: 8vw;
  height: 5vh;
  border-radius: 1vw;
  text-align: center;
  color: var(--color-white);
}
.banner-play-button:active {
  transform: scale(1.2, 1.2);
}
.banner-add-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: small;
  align-items: center;
  background-color: transparent;
  // mix-blend-mode: difference;
  width: 10vw;
  height: 5vh;
  border-radius: 1vw;
  margin-left: 10px;
  text-align: center;
  color: var(--color-white);
  box-shadow: 0 1px 1px 0 var(--color-white), 0 1px 1px 0 var(--color-white);
}
.banner-add-button:hover {
  box-shadow: 0 3px 4px 0 var(--color-white), 0 5px 12px 0 var(--color-white);
}
.banner-add-button:active {
  transform: scale(1.2, 1.2);
}
</style>
