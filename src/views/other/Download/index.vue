<template>
	<el-drawer style="--el-drawer-padding-primary:0px; background-color: var(--movixy-one-color);" size="100%"
		v-model="DownloadDrawer" :z-index="999" :append-to-body="true" direction="ltr" :show-close="false" :modal="false"
		modal-class="download-drawer" :before-close="handleClose">
		//下载视频
		<el-button @click="getVideoArrayBuffer('https://sample-videos.com/video321/mp4/480/big_buck_bunny_480p_30mb.mp4','demo1')">ddd</el-button>
		<!-- <button @click="saveToFile">Save to File</button> -->
	</el-drawer>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

import { saveAs } from 'file-saver'
const store = useStore();
const router = useRouter();
const DownloadList = ref([]);
const DownloadDrawer = computed(() => store.getters.DownloadDrawer);
function handleClose () {
	store.dispatch("menu/setDownloadDrawer", false);
}
</script>