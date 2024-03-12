<template>
	<el-drawer style="--el-drawer-padding-primary:0px; background-color: var(--movixy-one-color);" size="100%"
		v-model="RecentPlayedDrawer" :z-index="999" :append-to-body="true" direction="ltr" :show-close="false"
		:modal="false" modal-class="recentPlay-drawer" :before-close="handleClose">
		<div style="display: flex;flex-direction: column;width: 100%;height: auto;" v-infinite-scroll="load"
			:infinite-scroll-distance="10">
			<div v-for="body in historyListByDay"
				style="width: 100%;height: auto; display: flex;flex-direction: row;flex-wrap: wrap; ">
				<span
					style="width: 100%;margin-top:10px; color: var(--color-white);font-size: larger;font-weight: bold;margin-left: 30px;">{{
			body.date }}</span>
				<CardWithProgress v-for="item in body.list" :key="item.historyId" :videoId="item.videoId"
					:title="item.video.video_name" :img="item.video.video_img" :progressNumber="item.watchProgress + '%'"
					style="height: 200px;width: 23%;margin-left: 20px;margin-top: 20px;">
				</CardWithProgress>
			</div>
		</div>
	</el-drawer>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import CardWithProgress from "#/components/CardWithProgress/index";
import { getHistoryList } from "#/api/history";
import { formatDate } from "#/utils/myutil";
import { ElMessage } from "element-plus";
const store = useStore();
const router = useRouter();
const historyList = ref([]);
const historyListByDay = ref([]);
const RecentPlayedDrawer = computed(() => store.getters.RecentPlayedDrawer);
getHistoryList({ 'userId': store.getters.user_id }).then((res) => {
	historyList.value = res.data;
	if (historyList.value.length == 0) {
		ElMessage({
			message: "暂无播放记录",
			type: "info",
		});
	} else {
		let currentDate = formatDate(new Date().toLocaleDateString());
		let temp = [];
		let tempDate = historyList.value[0].watchTime.split(' ')[0];
		historyList.value.forEach((item) => {
			if (item.watchTime.split(' ')[0] == tempDate) {
				temp.push(item);
			} else {
				if (tempDate == currentDate) {
					tempDate = "今天";
				} else if (tempDate == formatDate(new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toLocaleDateString())) {
					tempDate = "昨天";
				}
				historyListByDay.value.push({ 'date': tempDate, 'list': temp });
				temp = [];
				tempDate = item.watchTime.split(' ')[0];
				temp.push(item);
			}
		});
		historyListByDay.value.push({ 'date': tempDate, 'list': temp });//把上方的数组的今天的日期改成今天
	}
}).catch((err) => {
	ElMessage({
		message: err.message,
		type: "error",
	});
});

function handleClose () {
	store.dispatch("menu/setRecentPlayedDrawer", false);
}
function load () {

}
</script>