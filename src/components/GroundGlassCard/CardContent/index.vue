<template>
	<div style="display: flex;flex-direction: row;align-items: center; height: 100%;" slot="card-content">
				<div class="card-content-left" style="height: 100%;width: 70%;display: flex;flex-direction: column;">
				<span style="font-size:inherit;font-weight: bold;white-space: nowrap;padding-left: 20%;margin-top: 2%; margin-right: 10%;color: white; text-align: left;overflow: hidden;">{{ videoInfo.video_name }}</span>
				<span  style="display: flex;align-items:center; font-size:small;white-space: nowrap; color: #9ca4ab; padding-left: 20%;margin-right: 10%; text-align: left;overflow: hidden;">{{videoInfo.video_label  }}</span>
				</div>
				<div class="card-content-right" style="height: 40%;display: flex;padding-left: 5%; align-items: center; flex-direction: row;  border: 0;  border-left: 1px;border-style: solid; border-color: white;" >
					<el-icon>
						<MyStar :offsetValue="videoInfo.rating" style="margin-top: 2px;"/>
					</el-icon>
					<span style="color: white; font-size: small; margin-left: 5px;">{{  videoInfo.rating}}</span>
				</div>
			</div>
</template>
<script setup>
import MyStar from '#/components/MyStar/index.vue';
const props = defineProps({
	videoInfo: {},
});
</script>
<style scoped>
</style>