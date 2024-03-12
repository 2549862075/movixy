<template>
	<el-drawer style="--el-drawer-padding-primary:0px; background-color: var(--movixy-one-color);" size="100%"
		v-model="FavoriteDrawer" :z-index="999" :append-to-body="true" direction="ltr" :show-close="false" :modal="false"
		modal-class="recentPlay-drawer" :before-close="handleClose">
		<div style="display: flex;flex-direction: column;width: 100%;height: auto;" v-infinite-scroll="load"
			:infinite-scroll-distance="10">
			<div 
				style="width: 100%;height: auto; display: flex;flex-direction: row;flex-wrap: wrap; ">
				<CardWithPlay v-for="item in FavoriteList" :key="item.favorite_id" :favoriteId="item.favorite_id" @updateFavoriteList="updateFavoriteList" :videoId="item.video.video_id"
					:title="item.video.video_name" :img="item.video.video_img" 
					style="height: 200px;width: 23%;margin-left: 20px;margin-top: 20px;">
				</CardWithPlay>
			</div>
		</div>
	</el-drawer>
</template>

<script setup>
import { ref, computed } from "vue";
import {getFavoriteList} from "#/api/favoriteApi";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
const store = useStore();
const router = useRouter();
const FavoriteList = ref([]);
const FavoriteDrawer = computed(() => store.getters.FavoriteDrawer);
getFavoriteList({'userId': store.getters.user_id }).then((res) => {
	FavoriteList.value = res.data;
	if (FavoriteList.value.length == 0) {
		ElMessage({
			message: "暂无收藏",
			type: "info",
		});
	}
});
function handleClose () {
	store.dispatch("menu/setRecentPlayedDrawer", false);
}
function updateFavoriteList(temp){
	if(temp){
	getFavoriteList({'userId': store.getters.user_id }).then((res) => {
		FavoriteList.value = res.data;
		if (FavoriteList.value.length == 0) {
			ElMessage({
				message: "暂无收藏",
				type: "info",
			});
		}
	});
}}
function load () {
}
</script>