<template>
	<el-row v-if="isShow" class="infinite-list" :gutter="10">
			<el-col :span="4" v-for="item in RecommendationVideoList">
				<NarrowCard style="width: 100%;margin-bottom: 10px;" :videoId="item.video_id" :imageUrl="item.video_img" :title="item.video_name" :label="item.video_label" :description="item.summary">
			</NarrowCard></el-col>
		</el-row>
</template>

<script setup>
import {ref,onMounted,watch} from 'vue'
import {getVideoByUsersPreference,getVideoByDataAndViewsNumber} from '#/api/videoApi'
import {useStore} from 'vuex'
import { ElMessage } from 'element-plus';
const store = useStore()
const count = ref(0);
const isShow = ref(false);
const disabled = ref(false);
const RecommendationVideoList=ref([]);
const user_preference = ref(null)
const offset_preference = ref(0)
const offset_normal = ref(6)
let date = new Date();
date.setFullYear(date.getFullYear() - 1);
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
let time = year + "-" + month + "-" + day;
onMounted(() => {
	user_preference.value = store.getters.preference
	isShow.value=true
window.onscroll=function(){
//变量scrollTop是滚动条滚动时，距离顶部的距离
var scrollTop =document.documentElement.scrollTop||document.body.scrollTop;
//变量windowHeight是可视区的高度
var windowHeight = document.documentElement.clientHeight||document.body.clientHeight;
//变量scrollHeight是滚动条的总高度
var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
//滚动条到底部的条件
if(scrollTop+windowHeight+1>=scrollHeight){
	if(disabled.value == false){
	load()}
	else{
		ElMessage({
			message: 'No more videos',
			type: 'warning',
			duration: 2000
		});
	}
}
}})	

async function  load () {
	if(store.getters.user_id){
		//登录了用户
		await getVideoByUsersPreference({'preference':user_preference.value,'video_type':store.getters.getActiveSubMenu,'offset':offset_preference.value}).then(res=>{
			RecommendationVideoList.value.push(...res.data);
			if(res.data.length ==6){
			offset_preference.value += 6}
			else{
				disabled.value = true
			}
		})
	}else{
		//未登录用户
		
		await getVideoByDataAndViewsNumber({'time':time,'video_type':store.getters.getActiveSubMenu,'offset':offset_normal.value}).then(res=>{
			RecommendationVideoList.value.push(...res.data);
			if(res.data.length ==6){
			offset_normal.value += 6}
			else{
				disabled.value = true
			}
})
	}
}
</script>

<style scoped>
.infinite-list {
height: auto;
margin: 0;
width:100%;padding-left: 3%; padding-right: 20px;
list-style: none;
}
</style>