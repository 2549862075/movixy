<template>
	<div class="card" @contextmenu="onButtonClick">
		<img v-image-is-exist="img" alt="" style="width: 100%;height: 100%;border-radius: 20px;object-fit: cover;">
		<div class="content">
			<div class="title">{{ title }}</div>
		</div>
		<div class="modal">
			<div class="toPlay" @click="handlerPlay">立即播放</div>
		</div>
		<context-menu  v-model:show="show" :options="optionsComponent">
			<context-menu-item custom-class="context-menu-item" @click.stop="onMenuClick(1)"><el-icon color="red" :size="18"><Delete/></el-icon>取消收藏</context-menu-item>
			<context-menu-item custom-class="context-menu-item" @click.stop="onMenuClick(2)"><el-icon color="red" :size="18"><VideoPlay/></el-icon>播放视频</context-menu-item>
		</context-menu>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ContextMenu, ContextMenuItem } from '@imengyu/vue3-context-menu';
import {deleteFavorite} from "#/api/favoriteApi";
import { ElMessage } from 'element-plus';
const store = useStore();
const router = useRouter();
const props = defineProps({
	favoriteId: Number,
	videoId: Number,
	title: String,
	img: String,
}) 
const emit = defineEmits(["updateFavoriteList"]);
const show = ref(false);
//For component
const optionsComponent = ref({
	zIndex: 1000,
	minWidth: 100,
	x: 500,
	y: 200,
})
function onMenuClick(index) {
	switch (index) {
		case 1:
		deleteFavorite({'favorite_id': props.favoriteId}).then((res) => {
			emit('updateFavoriteList', true);
			ElMessage({
				message: "取消收藏成功",
				type: "success",
				duration: 2000
			})
		}).catch((err) => {
			ElMessage({
				message: "取消收藏失败",
				type: "error",
				duration: 2000
			})
		});
			break;
		case 2:
			handlerPlay();
			break;
	}
}
function onButtonClick(e) {
		e.preventDefault();
    //显示组件菜单
    show.value = true;
    optionsComponent.value.x = e.x;
    optionsComponent.value.y = e.y;
  }
function handlerPlay () {
	router.push({ path: '/videoPlayer', query: { videoId: props.videoId } });
	store.dispatch('menu/setFavoriteDrawer', false);
}
</script>

<style lang="less" scoped>
.card {
	width: 100%;
	width: 100%;
	border-radius: 20px;
	background-color: green;
	position: relative;
	overflow: hidden;
}

.modal {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0);
	border-radius: 20px;
	z-index: 1;
}

.card:hover .modal {
	background-color: rgba(0, 0, 0, 0.3);
}

.card:hover .modal>.toPlay {
	opacity: 1;
}

.toPlay {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	margin: auto;
	height: 40px;
	width: 100px;
	border-radius: 20px;
	background-color: var(--movixy-primary-color);
	color: white;
	font-weight: bold;
	text-align: center;
	line-height: 40px;
	z-index: 2;
	cursor: pointer;
	opacity: 0;
}

.content {
	position: absolute;
	bottom: 5%;
	left: 2.5%;
	width: 95%;
	height: 15%;
	border-radius: 20px;
	background-color: var(--movixy-eight-color);
	z-index: 2;
}

.title {
	text-align: center;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 1rem;
	line-height: 100%;
	font-weight: bold;
	color: var(--color-white);
	margin: 5px;
}
</style>