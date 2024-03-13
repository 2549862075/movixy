<template>
  <div class="video-player">
    <div class="video-player__left">
      <div class="video-player__left-top">
        <div class="player-container">
          <div class="video1" v-if="whichCore && videoIsReady && videoDanmuIsReady">
            <vue3-video-player :title="videoData.video_name" @play="videoPlay" :autoplay="true"
              :view-core="viewCore.bind(null, 'video')" :src="currentVideoSrc" :cover="cover"
              :barrageConfig="{ fontSize: 20, opacity: 90, position: 70, barrageList: barragesJson }">
            </vue3-video-player>
          </div>
          <div class="video2" v-if="!whichCore && videoIsReady && videoDanmuIsReady">
            <vue3-video-player class="video2-player" :core="HLSCore" @play="videoPlay" :autoplay="true" :cover="cover"
              :view-core="viewCore.bind(null, 'video')" :src="currentVideoSrc"
              :barrageConfig="{ fontSize: 20, opacity: 90, position: 70, barrageList: barragesJson }">
            </vue3-video-player>
          </div>
        </div>
      </div>
      <div class="video-player__left-bottom">
        <div style="display: flex;flex-direction: row;justify-content: flex-end;width: 95%;margin-top: 20px;">
          <Danmu v-if="playerIsReady" @updateDanmu="getDanmuList" style="height: 43px;" :video_id="videoData.video_id"
            :videoplayer="playerOnDanmu"></Danmu>
        </div>
        <div class="video-player-content">
          <el-row justify="space-between" class="video-player-content-top">
            <el-col :span="6">
              <div class="video-player-title">{{ videoData.video_name }}</div>
              <div class="video-player-label">{{ videoData.video_label }}</div>
            </el-col>
            <el-col :span="12">
              <el-row align="middle" :gutter="20" style="height: 100%">
                <el-col style="" :span="8">
                  <el-popover placement="top" :width="300" :show-arrow="false" transition="el-zoom-in-top"
                    trigger="click" popper-style="background-color:rgba(0, 0, 0, 0.7);border:none;fliter:blur(1px);">
                    <template #reference>
                      <div class="btn_selections">
                        <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M10 14C12.2091 14 14 12.2091 14 10C14 7.79086 12.2091 6 10 6C7.79086 6 6 7.79086 6 10C6 12.2091 7.79086 14 10 14Z"
                            fill="var(--color-white)" />
                          <path
                            d="M24 14C26.2091 14 28 12.2091 28 10C28 7.79086 26.2091 6 24 6C21.7909 6 20 7.79086 20 10C20 12.2091 21.7909 14 24 14Z"
                            fill="var(--color-white)" />
                          <path
                            d="M38 14C40.2091 14 42 12.2091 42 10C42 7.79086 40.2091 6 38 6C35.7909 6 34 7.79086 34 10C34 12.2091 35.7909 14 38 14Z"
                            fill="var(--color-white)" />
                          <path
                            d="M10 28C12.2091 28 14 26.2091 14 24C14 21.7909 12.2091 20 10 20C7.79086 20 6 21.7909 6 24C6 26.2091 7.79086 28 10 28Z"
                            fill="var(--color-white)" />
                          <path
                            d="M24 28C26.2091 28 28 26.2091 28 24C28 21.7909 26.2091 20 24 20C21.7909 20 20 21.7909 20 24C20 26.2091 21.7909 28 24 28Z"
                            fill="var(--color-white)" />
                          <path
                            d="M38 28C40.2091 28 42 26.2091 42 24C42 21.7909 40.2091 20 38 20C35.7909 20 34 21.7909 34 24C34 26.2091 35.7909 28 38 28Z"
                            fill="var(--color-white)" />
                          <path
                            d="M10 42C12.2091 42 14 40.2091 14 38C14 35.7909 12.2091 34 10 34C7.79086 34 6 35.7909 6 38C6 40.2091 7.79086 42 10 42Z"
                            fill="var(--color-white)" />
                          <path
                            d="M24 42C26.2091 42 28 40.2091 28 38C28 35.7909 26.2091 34 24 34C21.7909 34 20 35.7909 20 38C20 40.2091 21.7909 42 24 42Z"
                            fill="var(--color-white)" />
                          <path
                            d="M38 42C40.2091 42 42 40.2091 42 38C42 35.7909 40.2091 34 38 34C35.7909 34 34 35.7909 34 38C34 40.2091 35.7909 42 38 42Z"
                            fill="var(--color-white)" />
                        </svg>
                        <span>&nbsp; Selections</span>
                      </div>
                    </template>
                    <div
                      style="max-height: 250px;width: 100%;display: flex;flex-direction: row;flex-wrap: wrap;justify-content:flex-start;overflow: auto;">
                      <div
                        :class="currentVideoSrc === item.source_url ? 'btn_selections_item_active' : 'btn_selections_item'"
                        v-for="item in source" @click="currentVideoSrc = item.source_url">
                        {{ item.source_name }}
                      </div>
                    </div>
                  </el-popover>
                </el-col>
                <el-col style="" :span="8">
                  <div class="btn_download">
                    <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path class="btn-download-svg-path" fill-rule="evenodd" clip-rule="evenodd"
                        d="M5.367 4.73262C5.781 4.73262 6.117 5.06862 6.117 5.48262C6.117 5.89662 5.781 6.23262 5.367 6.23262H4.426C2.812 6.23262 1.5 7.54362 1.5 9.15662V14.0416C1.5 15.6606 2.816 16.9766 4.435 16.9766H15.575C17.187 16.9766 18.5 15.6636 18.5 14.0516V9.16762C18.5 7.54862 17.183 6.23262 15.566 6.23262H14.634C14.22 6.23262 13.884 5.89662 13.884 5.48262C13.884 5.06862 14.22 4.73262 14.634 4.73262H15.566C18.011 4.73262 20 6.72262 20 9.16762V14.0516C20 16.4916 18.014 18.4766 15.575 18.4766H4.435C1.99 18.4766 0 16.4876 0 14.0416V9.15662C0 6.71662 1.985 4.73262 4.426 4.73262H5.367ZM10.0008 0.00012207C10.4148 0.00012207 10.7508 0.336122 10.7508 0.750122L10.75 10.9761L12.3858 9.33412C12.6778 9.04012 13.1518 9.04012 13.4458 9.33212C13.7388 9.62412 13.7398 10.0991 13.4478 10.3931L10.5385 13.3138C10.5101 13.343 10.4794 13.3699 10.4466 13.3942L10.5318 13.3201C10.4996 13.3528 10.4646 13.3821 10.4275 13.4079C10.4048 13.4236 10.3818 13.4378 10.358 13.4507C10.3465 13.4569 10.3344 13.4631 10.3222 13.4689C10.3004 13.4792 10.278 13.4886 10.2551 13.4969C10.2436 13.5009 10.2321 13.5047 10.2206 13.5083C10.1924 13.517 10.1635 13.524 10.1339 13.5293C10.1272 13.5304 10.1212 13.5314 10.1151 13.5324C10.0912 13.5361 10.0663 13.5387 10.0411 13.5401C10.0275 13.5408 10.0142 13.5411 10.0008 13.5411L9.961 13.5381L9.89907 13.5343C9.89466 13.5337 9.89026 13.533 9.88587 13.5324L10.0008 13.5411C9.95611 13.5411 9.91178 13.5371 9.86831 13.5294C9.83822 13.524 9.80933 13.517 9.78114 13.5084C9.76987 13.5049 9.75881 13.5012 9.74784 13.4973C9.72486 13.4891 9.70217 13.4797 9.68007 13.4692C9.66665 13.4628 9.65329 13.456 9.64015 13.4488C9.62167 13.4386 9.60387 13.4278 9.58656 13.4163C9.57471 13.4085 9.56286 13.4001 9.55124 13.3914C9.52267 13.3699 9.49572 13.3465 9.47055 13.3214L9.4698 13.3201L6.5538 10.3931C6.2618 10.0991 6.2628 9.62412 6.5558 9.33212C6.8498 9.04012 7.3238 9.04012 7.6158 9.33412L9.25 10.9761L9.2508 0.750122C9.2508 0.336122 9.5868 0.00012207 10.0008 0.00012207Z" />
                    </svg>
                    <span>&nbsp; Download</span>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="btn_favorite" @click="handlebtnFavorite">
                    <!-- <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8.39014 18.49V8.32998C8.39014 7.92998 8.51014 7.53998 8.73014 7.20998L11.4601 3.14998C11.8901 2.49998 12.9601 2.03998 13.8701 2.37998C14.8501 2.70998 15.5001 3.80997 15.2901 4.78997L14.7701 8.05998C14.7301 8.35998 14.8101 8.62998 14.9801 8.83998C15.1501 9.02998 15.4001 9.14997 15.6701 9.14997H19.7801C20.5701 9.14997 21.2501 9.46997 21.6501 10.03C22.0301 10.57 22.1001 11.27 21.8501 11.98L19.3901 19.47C19.0801 20.71 17.7301 21.72 16.3901 21.72H12.4901C11.8201 21.72 10.8801 21.49 10.4501 21.06L9.17014 20.07C8.68014 19.7 8.39014 19.11 8.39014 18.49Z"
                        fill="var(--color-white)" />
                      <path
                        d="M5.21 6.38H4.18C2.63 6.38 2 6.98 2 8.46V18.52C2 20 2.63 20.6 4.18 20.6H5.21C6.76 20.6 7.39 20 7.39 18.52V8.46C7.39 6.98 6.76 6.38 5.21 6.38Z"
                        fill="var(--color-white)" />
                    </svg> -->
                    <span>&nbsp;Favorite</span>
                  </div>
                </el-col>
                <!-- <el-col :span="8"></el-col> -->
              </el-row>
            </el-col>
          </el-row>
          <div class="video-player-content-bottom">
            <div style="
                text-align: start;
                width: 100%;
                font-size: medium;
                font-weight: bold;
                color: var(--color-white);
              ">
              Brief Introduction
            </div>
            <div class="video-player-content-bottom-description">
              {{ videoData.summary }}
            </div>
          </div>
        </div>
        <div class="video-player-people">
          <div style="
              text-align: start;
              width: 100%;
              font-size: medium;
              font-weight: bold;
              color: var(--color-white);
            ">
            Directors and actors
          </div>
          <div class="video-player-people-list">
            <div class="video-player-people-list-item">
              <el-row style="height: 100%">
                <el-col :span="8" style="display: flex;">
                  <img v-image-is-exist="directorData.avatar" style="
                      width: 100%;
                      height: 100%;
                      border-radius: 50%;
                    "></img>
                </el-col>
                <el-col :span="16" style="display: flex; flex-direction: column">
                  <div style="
                      text-align: start;
                      color: var(--color-white);
                      line-height: 25px;
                      font-size: small;
                      font-weight: bold;
                      flex: 1.5;
                      overflow: hidden;
                      width: 80%;
                      margin-left: 15%;
                    ">
                    {{ directorData.director_name }}
                  </div>
                  <div style="
                      text-align: start;
                      color: var(--movixy-seven-color);
                      font-size: small;
                      flex: 1.2;
                      overflow: hidden;
                      width: 80%;
                      margin-left: 15%;
                    ">
                    Director
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div style="display: flex;height: auto;width: 100%;display: flex;flex-direction: column;">
          <div
            style="width: 100%;height: auto;display: flex;justify-content: flex-start;margin-bottom: 10px;align-items: center;padding-top: 5px;padding-bottom: 5px;">

            <span style="color: var(--color-white);font-size: x-large;font-weight: bold;">评论</span>
            <span style="font-size: medium;margin-left: 30px;color: var(--color-white);">最热</span><span
              style="font-size: medium;margin-left: 10px;color: var(--color-white);">最新</span>
            <el-input v-model="comment.comment_content" style="width: 300px;margin-left: 30px;" autosize type="textarea"
              placeholder="请输入评论内容。。。" />
            <el-popover v-model:visible="el_popper" placement="top" width="300" :show-arrow="false" trigger="click"
              popper-style="background-color:rgba(255,255,255,0.2);border:none;fliter:blur(1px);">

              <template #reference>
                <el-button type="primary"
                  style="margin-left: 10px;border-color: transparent; background-color: var(--movixy-primary-color);">评论</el-button>
              </template>
              <div style="display: flex;flex-direction: column;">
                <span style="font-size: 13px;color: var(--color-white);">请先评分</span>
                <el-rate class="el-rate-m" :max="10" text-color="var(--movixy-primary-color)"
                  v-model="comment.comment_rating" allow-half
                  :texts="['1分', '2分', '3分', '4分', '5分', '6分', '7分', '8分', '9分', '10分']" show-text></el-rate>
                <el-row>
                  <el-col :offset="18" :span="4"><el-button
                      style=" background-color: var(--movixy-primary-color);border-color: transparent;" type="primary"
                      @click="handleComment">确定</el-button></el-col>
                </el-row>
              </div>
            </el-popover>
          </div>
          <div v-for="item in commentList"
            style="height: auto;width: 100%;margin-bottom: 10px;margin-top: 10px;padding-bottom: 10px; margin-right: 50px;border-bottom: 1px solid var(--movixy-six-color); display: flex;flex-direction: row;justify-content: flex-start;align-items: flex-start ; ">
            <img v-image-is-exist="item.user.avatar"
              style="width: 50px;height: 50px;border-radius: 50%;margin-left: 20px;"></img>
            <div
              style="display: flex; margin-left: 20px;color: var(--color-white);font-size: small;font-weight: bold;width: 80px;overflow: hidden;">
              {{
            item.user.user_name
          }}
            </div>
            <el-text v-html="item.comment_content"
              style="display: flex;flex-direction: row; margin-left: 30px;width: 70%;text-align: left;padding: 5px;color: var(--color-white);border: 1px solid var(--movixy-six-color); border-radius: 5px;"
              line-clamp="0">
            </el-text>
            <div
              style="margin-left:10px;width: 30%;height:60px; margin-top: auto;display: flex;flex-direction: column;align-items: flex-start;justify-content: flex-end;">
              <div style="display: flex;align-items: center;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.39014 18.49V8.32998C8.39014 7.92998 8.51014 7.53998 8.73014 7.20998L11.4601 3.14998C11.8901 2.49998 12.9601 2.03998 13.8701 2.37998C14.8501 2.70998 15.5001 3.80997 15.2901 4.78997L14.7701 8.05998C14.7301 8.35998 14.8101 8.62998 14.9801 8.83998C15.1501 9.02998 15.4001 9.14997 15.6701 9.14997H19.7801C20.5701 9.14997 21.2501 9.46997 21.6501 10.03C22.0301 10.57 22.1001 11.27 21.8501 11.98L19.3901 19.47C19.0801 20.71 17.7301 21.72 16.3901 21.72H12.4901C11.8201 21.72 10.8801 21.49 10.4501 21.06L9.17014 20.07C8.68014 19.7 8.39014 19.11 8.39014 18.49Z"
                    fill="var(--color-white)" />
                  <path
                    d="M5.21 6.38H4.18C2.63 6.38 2 6.98 2 8.46V18.52C2 20 2.63 20.6 4.18 20.6H5.21C6.76 20.6 7.39 20 7.39 18.52V8.46C7.39 6.98 6.76 6.38 5.21 6.38Z"
                    fill="var(--color-white)" />
                </svg>
                <span style="color: var(--color-white);margin-left: 10px;">{{ item.comment_like == null ? 0 :
            item.comment_like
                  }}</span>
              </div>
              <div style="color: var(--color-white);margin-top: 10px;">{{ item.comment_time }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="video-player__right">
      <div style="
          text-align: start;
          width: 85%;
          font-size: larger;
          font-weight: bold;
          color: var(--color-white);
          margin-bottom: 5px;
        ">
        Recommendation
      </div>
      <WideCard style="margin-bottom: 10px" v-for="i in 3" :key="i"
        image="https://img1.baidu.com/it/u=975930860,3910243700&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1709398800&t=3a6fa4c19596215dc0784ce3ef88da9b"
        description="dsaaaaaaaadd fd f  fsdf sd f sdfd f sdf sd fds f df dfd fdfsdfds aadsasddsdsdsad" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted, computed } from "vue";
import cover from "../../assets/b.jpg";
import { getVideoById } from "#/api/videoApi";
import { getDanmuListByVideoId } from "#/api/danmuApi";
import { getDirectorById } from "#/api/actorAndDirectorApi";
import { getCommentByVideoId, addComment } from "#/api/commentApi";
import { getFavoriteByVideoIdAndUserId, deleteFavorite, addVideoToFavorite } from "#/api/favoriteApi";
import WideCard from "#/components/WideCard/index.vue";
import Danmu from "#/components/Danmu/index.vue";
import HLSCore from "@cloudgeek/playcore-hls";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const whichCore = ref(false); //false表示video2，也就是支持HLS的核心。true也就是video1
const players = ref({});//播放器
const playerOnDanmu = ref('');//弹幕播放器
const router = useRouter();//路由
const store = useStore();//vuex
const videoData = ref({});//视频数据
const videoIsReady = ref(false);//视频是否准备好
const videoDanmuIsReady = ref(false);//视频弹幕是否准备好
const playerIsReady = ref(false);//播放器是否准备好
const currentVideoSrc = ref("");//当前视频源
const directorData = ref({});//导演数据
var commentList = ref([]);//评论列表
var el_popper = ref(false);//评论弹窗
const source = ref([]);//视频源
const isFavorite = ref(false);//是否收藏
const favoriteId = ref('');//收藏id
const { query } = router.currentRoute.value;//路由参数 query.videoId表示视频id
var barragesJson = ref([]);//弹幕列表
const user_id = computed(() => store.getters.user_id);//用户id
var comment = ref({
  user_id: user_id.value,
  video_id: query.videoId,
  comment_content: '',
  comment_time: new Date().toLocaleString(),
  comment_rating: 0
})//
// type: 1,
// content: "<p><strong>demo1</strong></p>",
// avatar: 'https://api.multiavatar.com/LarchLiu.png',
// username: 'LarchLiu' + time,
// time: parseFloat(time / 1000)
// color: parseInt(Math.random() * 16777215)
// barragesJson = temp.sort((a, b) => { return a.time - b.time })

function getDanmuList () {
  getDanmuListByVideoId({ 'video_id': query.videoId }).then((res) => {
    barragesJson.value = res.data.map((item) => {
      return {
        type: item.danmu_type,
        content: item.danmu_content,
        avatar: "https://api.multiavatar.com/LarchLiu.png",
        username: "LarchLiu",
        time: item.danmu_time,
        color: item.danmu_color,
      };
    });
    videoDanmuIsReady.value = true;
  });
}
//评论
function handleComment () {
  el_popper.value = false;
  if (comment.value.comment_rating == '') {
    ElMessage.error('请先评分');
    return;
  }
  if (comment.value.comment_content == '') {
    ElMessage.error('评论内容不能为空');
    return;
  }
  if (comment.value.comment_content.length > 200) {
    ElMessage.error('评论内容不能超过200字');
    return;
  }
  if (user_id.value == null || user_id.value == '' || user_id.value == undefined) {
    ElMessage.error('请先登录');
    return;
  }
  //添加评论
  addComment(comment.value).then((res) => {
    if (res.code == 200) {
      ElMessage.success('评论成功');
      comment.value.comment_content = '';
      comment.value.comment_rating = '';
      getCommentByVideoId({ 'video_id': query.videoId }).then((res) => {
        commentList.value = res.data;
      });
    } else {
      ElMessage.error('评论失败');
    }
  });
}
//计算favorite样式
const favoriteStyle = computed(() => isFavorite.value ? '#eb3f5e' : 'var(--movixy-seven-color)')

//点击收藏按钮
function handlebtnFavorite () {
  if (user_id.value == null || user_id.value == '' || user_id.value == undefined) {
    ElMessage.error('请先登录');
    return;
  }
  if (isFavorite.value) {
    //取消收藏
    deleteFavorite({ 'favorite_id': favoriteId.value }).then((res) => {
      if (res.code == 200) {
        ElMessage.success('取消收藏成功');
        isFavorite.value = false;
      } else {
        ElMessage.error('取消收藏失败');
      }
    });
  } else {
    //收藏
    addVideoToFavorite({ 'videoId': query.videoId, 'userId': user_id.value }).then((res) => {
      if (res.code == 200) {
        ElMessage.success('收藏成功');
        isFavorite.value = true;
        getFavoriteByVideoIdAndUserId({ 'video_id': query.videoId, 'user_id': user_id.value }).then((res) => {
          if (res.data !== null && res.data !== undefined && res.data !== "") {
            favoriteId.value = res.data.favorite_id;
          } else {
            ElMessage.error('出现错误');
            favoriteId.value = '';//收藏id
          }
        });
      } else {
        ElMessage.error('收藏失败');
      }
    });
  }

}

// {
//     "video_id": 1,
//     "video_name": "熊出没·伴我“熊芯” ",
//     "video_img": "https://img1.baidu.com/it/u=2428866856,2924840891&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1709312400&t=94f42a22e3d9e61c9ac94f81df500c65",
//     "actor_id": 1,
//     "director_id": 1,
//     "summary": "一个普通的森林夜晚，对小熊大、小熊二宠爱有加的熊妈妈，在一场大火后离开了他们，两熊伤心不已……转眼多年过去，光头强带熊大熊二前往振兴岛参观机器人研究所，却意外得到了熊妈妈的线索，为此熊大、熊二一路探寻……熊妈当年为何不告而别？两熊最终是否能找到妈妈？迷雾重重的背后还有怎样的故事？一切谜团等待揭晓。",
//     "rating": null,
//     "category": "[movies,animation]",
//     "video_label": "[喜剧/科幻/冒险/可爱]",
//     "time": null,
//     "video_url": null,
//     "remark": null,
//     "view_number": null,
//     "source_list": [
//         {
//             "source_id": 1,
//             "source_name": "中文版",
//             "source_url": "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
//             "video_id": null,
//             "remark": null
//         },
//         {
//             "source_id": 2,
//             "source_name": "英文版",
//             "source_url": "https://static.smartisanos.cn/common/video/production/delta/r2.mp4",
//             "video_id": null,
//             "remark": null
//         }
//     ]
// }
onMounted(() => {
  //获取当前视频的信息
  getVideoById(query.videoId).then((res) => {
    videoData.value = res.data;
    source.value = res.data.source_list;
    currentVideoSrc.value = source.value[0].source_url;
    videoIsReady.value = true;
    getDirectorById({ 'director_id': videoData.value.director_id }).then((res) => {
      directorData.value = res.data;
    });
  });
  //获取当前视频的评论
  getCommentByVideoId({ 'video_id': query.videoId }).then((res) => {
    commentList.value = res.data;
  });
  //获取当前视频的弹幕
  getDanmuList();
  //获取当前用户是否收藏了当前视频
  getFavoriteByVideoIdAndUserId({ 'video_id': query.videoId, 'user_id': user_id.value }).then((res) => {
    if (res.data !== null && res.data !== undefined && res.data !== "") {
      favoriteId.value = res.data.favorite_id;
      isFavorite.value = true;
    }
  });

  window.addEventListener("fullscreenchange", () => {
    fullscreenchanged();
  });
  window.addEventListener("mozfullscreenchange", () => {
    fullscreenchanged();
  });
  window.addEventListener("webkitfullscreenchange", (event) => {
    fullscreenchanged();
  });
  window.addEventListener("msfullscreenchange", () => {
    fullscreenchanged();
  });
});
onUnmounted(() => {
  window.removeEventListener("fullscreenchange", fullscreenchanged);
  window.removeEventListener("mozfullscreenchange", fullscreenchanged);
  window.removeEventListener("webkitfullscreenchange", fullscreenchanged);
  window.removeEventListener("msfullscreenchange", fullscreenchanged);
  players["video"].destroy();//销毁video
}),
  watch(currentVideoSrc, (newVal) => {
    //如果video以MP4结尾则whichCore是true，其他则为false
    if (newVal.endsWith("mp4")) {
      whichCore.value = true;
    } else {
      whichCore.value = false;
    }
  });
watch(user_id, (newVal) => {
  comment.value.user_id = newVal;
});
function videoPlay () {
  console.log("Video played");
}

function fullscreenchanged () {
  window.document.fullscreenElement
    ? setbtn_full_off(players["video"])
    : setbtn_full(players["video"]);
}
window.addEventListener("fullscreenchange", fullscreenchanged);
function viewCore (id, player) {
  players[id] = player;
  setbtn_volume(player);
  setbtn_full(player);
  setbtn_setting(player);
  setbtn_pip(player);
  playerIsReady.value = true;
  playerOnDanmu.value = player;
}
function setbtn_volume (player) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.setAttribute("viewBox", "0 0 48 48");
  svg.setAttribute("fill", "none");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M24 6V42C17 42 11.7985 32.8391 11.7985 32.8391H6C4.89543 32.8391 4 31.9437 4 30.8391V17.0108C4 15.9062 4.89543 15.0108 6 15.0108H11.7985C11.7985 15.0108 17 6 24 6Z"
  );
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "var(--color-white)");
  path.setAttribute("stroke-width", "4");
  path.setAttribute("stroke-linejoin", "bevel");
  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute(
    "d",
    "M32 15L32 15C32.6232 15.5565 33.1881 16.1797 33.6841 16.8588C35.1387 18.8504 36 21.3223 36 24C36 26.6545 35.1535 29.1067 33.7218 31.0893C33.2168 31.7885 32.6391 32.4293 32 33"
  );
  path2.setAttribute("stroke", "var(--color-white)");
  path2.setAttribute("stroke-width", "4");
  path2.setAttribute("stroke-linecap", "round");
  path2.setAttribute("stroke-linejoin", "bevel");
  const path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path3.setAttribute(
    "d",
    "M34.2359 41.1857C40.0836 37.6953 44 31.305 44 24C44 16.8085 40.2043 10.5035 34.507 6.97906"
  );
  path3.setAttribute("stroke", "var(--color-white)");
  path3.setAttribute("stroke-width", "4");
  path3.setAttribute("stroke-linecap", "round");
  svg.append(path, path2, path3);
  player.$el.children[2].children[1].children[1].children[0].children[0].children[0].replaceWith(
    svg
  );
}
function setbtn_full (player) {
  //创建一个svg元素
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  //设置svg元素的属性
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.setAttribute("viewBox", "0 0 24 24");
  //创建一个path元素
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  //设置path元素的属性
  path.setAttribute("d", "M2 9V6.5C2 4.01 4.01 2 6.5 2H9");
  path.setAttribute("stroke", "var(--color-white)");
  path.setAttribute("stroke-width", "1.5");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute("d", "M15 2H17.5C19.99 2 22 4.01 22 6.5V9");

  path2.setAttribute("stroke", "var(--color-white)");
  path2.setAttribute("stroke-width", "1.5");
  path2.setAttribute("stroke-linecap", "round");
  path2.setAttribute("stroke-linejoin", "round");
  const path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path3.setAttribute("d", "M22 16V17.5C22 19.99 19.99 22 17.5 22H16");

  path3.setAttribute("stroke", "var(--color-white)");
  path3.setAttribute("stroke-width", "1.5");
  path3.setAttribute("stroke-linecap", "round");
  path3.setAttribute("stroke-linejoin", "round");
  const path4 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path4.setAttribute("d", "M9 22H6.5C4.01 22 2 19.99 2 17.5V15");
  path4.setAttribute("stroke", "var(--color-white)");
  path4.setAttribute("stroke-width", "1.5");
  path4.setAttribute("stroke-linecap", "round");
  path4.setAttribute("stroke-linejoin", "round");
  //将path元素添加到svg元素中
  svg.append(path, path2, path3, path4);
  //将svg元素添加到页面中
  player.$el.children[2].children[1].children[1].children[3].children[0].children[0].replaceWith(
    svg
  );
}
function setbtn_full_off (player) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.setAttribute("viewBox", "0 0 48 48");
  svg.setAttribute("fill", "none");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M33 6V15H42");
  path.setAttribute("stroke", "var(--color-white)");
  path.setAttribute("stroke-width", "4");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute("d", "M15 6V15H6");
  path2.setAttribute("stroke", "var(--color-white)");
  path2.setAttribute("stroke-width", "4");
  path2.setAttribute("stroke-linecap", "round");
  path2.setAttribute("stroke-linejoin", "round");
  const path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path3.setAttribute("d", "M15 42V33H6");
  path3.setAttribute("stroke", "var(--color-white)");
  path3.setAttribute("stroke-width", "4");
  path3.setAttribute("stroke-linecap", "round");
  path3.setAttribute("stroke-linejoin", "round");
  const path4 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path4.setAttribute("d", "M33 42V33H41.8995");
  path4.setAttribute("stroke", "var(--color-white)");
  path4.setAttribute("stroke-width", "4");
  path4.setAttribute("stroke-linecap", "round");
  path4.setAttribute("stroke-linejoin", "round");
  svg.append(path, path2, path3, path4);
  player.$el.children[2].children[1].children[1].children[3].children[0].children[0].replaceWith(
    svg
  );
}
function setbtn_setting (player) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
  );
  path.setAttribute("stroke", "var(--color-white)");
  path.setAttribute("stroke-width", "1.5");
  path.setAttribute("stroke-miterlimit", "10");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute(
    "d",
    "M2 12.88V11.12C2 10.08 2.85 9.22 3.9 9.22C5.71 9.22 6.45 7.94 5.54 6.37C5.02 5.47 5.33 4.3 6.24 3.78L7.97 2.79C8.76 2.32 9.78 2.6 10.25 3.39L10.36 3.58C11.26 5.15 12.74 5.15 13.65 3.58L13.76 3.39C14.23 2.6 15.25 2.32 16.04 2.79L17.77 3.78C18.68 4.3 18.99 5.47 18.47 6.37C17.56 7.94 18.3 9.22 20.11 9.22C21.15 9.22 22.01 10.07 22.01 11.12V12.88C22.01 13.92 21.16 14.78 20.11 14.78C18.3 14.78 17.56 16.06 18.47 17.63C18.99 18.54 18.68 19.7 17.77 20.22L16.04 21.21C15.25 21.68 14.23 21.4 13.76 20.61L13.65 20.42C12.75 18.85 11.27 18.85 10.36 20.42L10.25 20.61C9.78 21.4 8.76 21.68 7.97 21.21L6.24 20.22C5.33 19.7 5.02 18.53 5.54 17.63C6.45 16.06 5.71 14.78 3.9 14.78C2.85 14.78 2 13.92 2 12.88Z"
  );
  path2.setAttribute("stroke", "var(--color-white)");
  path2.setAttribute("stroke-width", "1.5");
  path2.setAttribute("stroke-miterlimit", "10");
  path2.setAttribute("stroke-linecap", "round");
  path2.setAttribute("stroke-linejoin", "round");
  svg.append(path, path2);
  player.$el.children[2].children[1].children[1].children[2].children[0].children[0].replaceWith(
    svg
  );
}
function setbtn_pip (player) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H15C20 2 22 4 22 9V15C22 20 20 22 15 22Z"
  );
  path.setAttribute("stroke", "var(--color-white)");
  path.setAttribute("stroke-width", "1.5");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute("d", "M15 2V22");
  path2.setAttribute("stroke", "var(--color-white)");
  path2.setAttribute("stroke-width", "1.5");
  path2.setAttribute("stroke-linecap", "round");
  path2.setAttribute("stroke-linejoin", "round");
  svg.append(path, path2);
  player.$el.children[2].children[1].children[1].children[1].children[0].children[0].replaceWith(
    svg
  );
}
</script>

<style lang="less" scoped>
.video-player {
  display: flex;
  height: 100%;
  width: 100%;
}

.video-player__left {
  flex: 0 0 70%;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 20px;
}

.video-player__left-top {
  height: 55vh;
  background-color: transparent;
  flex-shrink: 0;
  /* Add styles for the video player container */
}

.player-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.video1 {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: transparent;

  .vcp-container {
    border-radius: 20px;

    :deep(video) {
      border-radius: 20px;
    }

    :deep(.vue-core-video-player-layers) {
      border-radius: 20px;

      .play-pause-layer {
        .btn-control {
          .btn-play path {
            fill: var(--movixy-primary-color);
          }
        }
      }

      .vcp-layer {
        overflow: hidden;
        border-radius: 20px;
      }
    }

    :deep(.vcp-dashboard) {
      border-radius: 20px;
      background-color: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(1px);
      mix-blend-mode: difference;
      margin-bottom: 5px;

      .vcp-progress-hover {
        bottom: 80%;
        width: 96%;
        margin-left: 2%;

        .vcp-progress {
          height: 8px;
          border-radius: 10px;
          min-width: 8px;

          .vcp-progress-preview {
            border-radius: 10px;
            min-width: 8px;
          }

          .vcp-progress-loaded {
            border-radius: 10px;
            min-width: 8px;
          }

          .vcp-progress-played {
            min-width: 8px;
            border-radius: 10px;
            background-color: var(--movixy-primary-color);
          }
        }
      }

      .vcp-controls {
        bottom: 2px;

        .setting-control {
          top: 3px;

          .volume-control {
            .btn-control-panel {
              background-color: rgba(255, 255, 255, 0.3);

              .progress {
                margin-left: -5px;
                width: 10px;
                border-radius: 5px;

                .volume-current {
                  width: 10px;
                  background-color: var(--movixy-primary-color);
                  border-radius: 5px;
                }
              }
            }
          }

          .settings-control {
            .btn-control-panel {
              background-color: rgba(255, 255, 255, 0.3);
              border-radius: 10px;
            }
          }
        }
      }
    }
  }
}

.video2 {
  position: absolute;
  background-color: transparent;
  width: 100%;
  height: 100%;

  .vcp-container {
    border-radius: 20px;

    :deep(video) {
      border-radius: 20px;
    }

    :deep(.vue-core-video-player-layers) {
      border-radius: 20px;

      .play-pause-layer {
        .btn-control {
          .btn-play path {
            fill: var(--movixy-primary-color);
          }
        }
      }

      .vcp-layer {
        overflow: hidden;
        border-radius: 20px;
      }
    }

    :deep(.vcp-dashboard) {
      border-radius: 20px;
      background-color: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(1px);
      mix-blend-mode: difference;
      margin-bottom: 5px;

      .vcp-progress-hover {
        bottom: 80%;
        width: 96%;
        margin-left: 2%;

        .vcp-progress {
          height: 8px;
          border-radius: 10px;
          min-width: 8px;

          .vcp-progress-preview {
            border-radius: 10px;
            min-width: 8px;
          }

          .vcp-progress-loaded {
            border-radius: 10px;
            min-width: 8px;
          }

          .vcp-progress-played {
            min-width: 8px;
            border-radius: 10px;
            background-color: var(--movixy-primary-color);
          }
        }
      }

      .vcp-controls {
        bottom: 2px;

        .setting-control {
          top: 3px;

          .volume-control {
            .btn-control-panel {
              background-color: rgba(255, 255, 255, 0.3);

              .progress {
                margin-left: -5px;
                width: 10px;
                border-radius: 5px;

                .volume-current {
                  width: 10px;
                  background-color: var(--movixy-primary-color);
                  border-radius: 5px;
                }
              }
            }
          }

          .settings-control {
            .btn-control-panel {
              background-color: rgba(255, 255, 255, 0.3);
              border-radius: 10px;
            }
          }
        }
      }
    }
  }
}

.video-player__left-bottom {
  flex: 0.8;

  .video-player-content {
    height: 25vh;
    width: 100%;

    .video-player-content-top {
      height: 40%;
      width: 100%;

      .video-player-title {
        font-size: larger;
        color: var(--color-white);
        text-align: left;
        font-size: large;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
      }

      .video-player-label {
        font-size: small;
        width: 100%;
        white-space: nowrap;
        color: var(--description-color);
        text-align: start;
        overflow: hidden;
      }
    }

    .video-player-content-bottom {
      margin-top: 10px;
      height: 60%;
      width: 100%;

      .video-player-content-bottom-description {
        color: var(--description-color);
        font-size: 13px;
        text-align: start;
        overflow: hidden;
        -webkit-line-clamp: 4;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
    }
  }

  /* Add styles for the video controls container */
}

.btn_selections {
  cursor: pointer;
  width: -moz-fit-content;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 8px;
  height: 5vh;
  border-width: 1px;
  border-color: var(--movixy-seven-color);
  border-style: solid;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
}

.btn_selections_item {
  cursor: pointer;
  color: white;
  margin: 5px;
  background-color: var(--movixy-seven-color);
  width: 80px;
  height: 40px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn_selections_item_active {
  cursor: pointer;
  color: white;
  margin: 5px;
  background-color: var(--movixy-primary-color);
  width: 80px;
  height: 40px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn_download {
  cursor: pointer;
  width: -moz-fit-content;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 8px;
  height: 5vh;
  border-width: 1px;
  border-color: var(--movixy-seven-color);
  border-style: solid;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);

  .btn-download-svg-path {
    fill: var(--color-white);
  }
}

.btn_favorite {
  width: -moz-fit-content;
  cursor: pointer;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 8px;
  height: 5vh;
  background-color: v-bind(favoriteStyle);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
}

.video-player-people-list {
  padding-bottom: 20px;
  width: 60vw;
  height: 60px;
  display: flex;
  align-items: start;
  flex-direction: row;
  overflow: auto;
}

.video-player-people-list-item {
  cursor: pointer;
  flex-shrink: 0;
  width: 150px;
  height: 50px;
  margin-top: 10px;
  margin-right: 15px;
  display: flex;
  // border-style: solid;
  // border-width: 1px;
  // border-radius: 5px;
  background-color: transparent;
}

.video-player-people-list-item:last-child {
  margin-right: 0;
}

.video-player__right {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Add styles for the additional information or related videos container */
}

// .video-btn {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-left: 5px;
//   margin-right: 5px;
//   width: 30px;
//   height: 30px;
//   background-color: red;
// }
.el-rate-m {
  --color: var(--color-white);
  --el-rate-fill-color: var(--movixy-primary-color)
}
</style>
