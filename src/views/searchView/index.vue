<template>
	<el-row v-if="isShow" class="infinite-list" :gutter="10">
		<el-col :span="4" v-for="item in SearchList">
			<NarrowCard style="width: 100%;margin-bottom: 10px;" :imageUrl="item.video_img" :title="item.video_name"
				:label="item.video_label" :description="item.summary">
			</NarrowCard>
		</el-col>
	</el-row>
</template>

<script setup>
import { ref, onMounted, watch,onUnmounted } from 'vue'
import { searchVideo} from '#/api/videoApi'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus';
import { useRouter,useRoute } from 'vue-router'
const router = useRouter()
const store = useStore()
const route = useRoute()
const SearchContent = ref(route.query.search)
const isShow = ref(false);
const disabled = ref(false);
const SearchList = ref([]);
const offset = ref(0)
watch(() => route.query.search, (newVal, oldVal) => {
	SearchContent.value = newVal
	SearchList.value = []
	offset.value = 0
	document.documentElement.scrollTop = 0
	load()
})
onMounted(() => {
	if(SearchList.value.length<1){
		load()
	}
	isShow.value = true
	window.onscroll = function () {
		//变量scrollTop是滚动条滚动时，距离顶部的距离
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		//变量windowHeight是可视区的高度
		var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
		//变量scrollHeight是滚动条的总高度
		var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
		//滚动条到底部的条件
		if (scrollTop + windowHeight + 1 >= scrollHeight) {
			if (disabled.value == false) {
				load()
			}
			else {
				ElMessage({
					message: 'No more videos',
					type: 'warning',
					duration: 2000
				});
			}
		}
	}
})
onUnmounted(() => {
	store.dispatch('animate/setAnimate', 'zoom')
	window.onscroll = null
})

function load() {
	searchVideo({ 'search': SearchContent.value, 'offset': offset.value }).then(res => {
		SearchList.value.push(...res.data);
		if (res.data.length == 6) {
			offset.value += 6
			if(SearchList.value.length<30){
				load()
			}
		}
		else {
			disabled.value = true
		}
	})
}
</script>

<style scoped>
.infinite-list {
	height: auto;
	margin: 0;
	width: 100%;
	padding-left: 3%;
	padding-right: 20px;
	min-height: 100%;
	list-style: none;
}
</style>