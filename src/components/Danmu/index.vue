<template>
	<div class="input-wrapper">
		<el-popover placement="top" :width="200" :show-arrow="false" transition="el-zoom-in-top" trigger="click"
			popper-style="background-color:rgba(0, 0, 0, 0.4);border:none;fliter:blur(5px);">
			<template #reference>
				<div class="danmuStyle">A</div>
			</template>
			<div style="height: 200px;width: 100%;display: flex;flex-direction: column;">
				<span
					style="margin-left: 18px;font-size: 12px;font-weight: bold;color:var(--color-white);margin-bottom: 5px;">模式</span>
				<el-row style="font-size: 12px;text-align: center;">
					<el-col :offset="2" :span="4" @click="danmuStyleForm.danmu_type = 0">
						<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" data-pointer="none" viewBox="0 0 28 28">
							<path
								d="M23 3H5a4 4 0 0 0-4 4v14a4 4 0 0 0 4 4h18a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4zM11 9h6a1 1 0 0 1 0 2h-6a1 1 0 0 1 0-2zm-3 2H6V9h2v2zm4 4h-2v-2h2v2zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2z"
								:fill="(danmuStyleForm.danmu_type === 0) ? 'var(--movixy-primary-color)' : 'var(--color-white)'"></path>
						</svg>
						<span
							:style="(danmuStyleForm.danmu_type === 0) ? 'color:var(--movixy-primary-color)' : 'color:var(--color-white)'">滚动</span>
					</el-col>
					<el-col :offset="4" :span="4" @click="danmuStyleForm.danmu_type = 1">
						<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" data-pointer="none"
							style="enable-background:new 0 0 28 28" viewBox="0 0 28 28">
							<path
								d="M23 3H5a4 4 0 0 0-4 4v14a4 4 0 0 0 4 4h18a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4zM9 9H7V7h2v2zm4 0h-2V7h2v2zm4 0h-2V7h2v2zm4 0h-2V7h2v2z"
								:fill="(danmuStyleForm.danmu_type === 1) ? 'var(--movixy-primary-color)' : 'var(--color-white)'"></path>
						</svg>
						<span
							:style="(danmuStyleForm.danmu_type === 1) ? 'color:var(--movixy-primary-color)' : 'color:var(--color-white)'">顶部</span>
					</el-col>
					<el-col :offset="4" :span="4" @click="danmuStyleForm.danmu_type = 2">
						<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" data-pointer="none"
							style="enable-background:new 0 0 28 28" viewBox="0 0 28 28">
							<path
								d="M23 3H5a4 4 0 0 0-4 4v14a4 4 0 0 0 4 4h18a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4zM9 21H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"
								:fill="(danmuStyleForm.danmu_type === 2) ? 'var(--movixy-primary-color)' : 'var(--color-white)'"></path>
						</svg>
						<span
							:style="(danmuStyleForm.danmu_type === 2) ? 'color:var(--movixy-primary-color)' : 'color:var(--color-white)'">底部</span>
					</el-col>
				</el-row>
				<span
					style="margin-left: 18px;font-size: 12px;font-weight: bold;color:var(--color-white);margin-bottom: 5px;">颜色</span>
				<el-row style="font-size: 12px;">
					<el-col :offset="2" :span="20">
						<input type="color" v-model="danmuStyleForm.danmu_color"
							style="width: 100%;height: 30px;border-radius: 5px;">
					</el-col>
				</el-row>
				<el-row style="height: 22px;margin-top: 10px;">
					<el-col :offset="1" :span="3" style="background-color: red;border-radius: 2px;"
						@click="danmuStyleForm.danmu_color = '#FF0000'"></el-col>
					<el-col :offset="1" :span="3" style="background-color: yellow;border-radius: 2px;"
						@click="danmuStyleForm.danmu_color = '#FFFF00'"></el-col>
					<el-col :offset="1" :span="3" style="background-color: green;border-radius: 2px;"
						@click="danmuStyleForm.danmu_color = '#008000'"></el-col>
					<el-col :offset="1" :span="3" style="background-color: blue;border-radius: 2px;"
						@click="danmuStyleForm.danmu_color = '#0000FF'"></el-col>
					<el-col :offset="1" :span="3" style="background-color: purple;border-radius: 2px;"
						@click="danmuStyleForm.danmu_color = '#800080'"></el-col>
					<el-col :offset="1" :span="3" style="background-color: pink;border-radius: 2px;"
						@click="danmuStyleForm.danmu_color = '#FFC0CB'"></el-col>
				</el-row>
				<el-row style="height: 22px;margin-top: 10px;">
					<el-col :offset="1" :span="3" style="background-color: orange;border-radius: 2px;"
						@click="danmuStyleForm.danmu_color = '#FFA500'"></el-col>
					<el-col :offset="1" :span="3" style="background-color: brown;border-radius: 2px;"
						@click="danmuStyleForm.danmu_color = '#A52A2A'"></el-col>
					<el-col :offset="1" :span="3" style="background-color: black;border-radius: 2px;"
						@click="danmuStyleForm.danmu_color = '#000000'"></el-col>
					<el-col :offset="1" :span="3" style="background-color: white;border-radius: 2px;"
						@click="danmuStyleForm.danmu_color = '#FFFFFF'"></el-col>
					<el-col :offset="1" :span="3" style="background-color: gray;border-radius: 2px;"
						@click="danmuStyleForm.danmu_color = '#808080'"></el-col>
					<el-col :offset="1" :span="3" style="background-color: silver;border-radius: 2px;"
						@click="danmuStyleForm.danmu_color = '#C0C0C0'"></el-col>
				</el-row>
			</div>
		</el-popover>
		<button class="icon" @click="danmuSend">
			{{ icon }}
		</button>
		<input type="text" name="text" v-model="danmuStyleForm.danmu_content" class="input" @focusout="focusOut" @focusin="focusIn" placeholder="输入弹幕内容...">
		</input>
	</div>

</template>

<script setup>
import { ref,onMounted,computed } from 'vue';
import { useStore } from 'vuex';
import {addDanmu} from '#/api/danmuApi';
import { ElMessage } from 'element-plus';
const props = defineProps({
	video_id: Number,
	videoplayer: Object
})
const store = useStore();
var icon = ref("弹幕");
var danmuStyleForm = ref({
	video_id: props.video_id,
	user_id: computed(() => store.getters.user_id),
	danmu_color: randomColor(),
	danmu_type: 1,
	danmu_time: '',
	danmu_content: '',
})
function randomColor () {
	var color = "#";
	for (var i = 0; i < 6; i++) {
		color += Math.floor(Math.random() * 16).toString(16);
	}
	return color;
}
function focusIn () {
	icon.value = "发送";
}
function focusOut () {
	icon.value = "弹幕";
}
function danmuSend(){
	if(danmuStyleForm.value.danmu_content == ''||danmuStyleForm.value.danmu_content == null||danmuStyleForm.value.danmu_content == undefined){
		return;
	}
	if(props.videoplayer.getCurrentTime()+3<props.videoplayer.getDuration()){
		danmuStyleForm.value.danmu_time = props.videoplayer.getCurrentTime()+3;
	}else{
		danmuStyleForm.value.danmu_time = props.videoplayer.getCurrentTime();
	}
	if(danmuStyleForm.value.user_id == null || danmuStyleForm.value.user_id == undefined||danmuStyleForm.value.user_id == ''){
		ElMessage({
			message: "请先登录",
			type: "info",
		});
		return;
	}
	addDanmu(danmuStyleForm.value).then((res) => {
		ElMessage({
			message: "发送成功",
			type: "success",
		});
	}).catch((err) => {
		ElMessage({
			message: "发送失败",
			type: "error",
		});
	});
	danmuStyleForm.value.danmu_content = '';
}
</script>

<style lang="less" scoped>
.input-wrapper {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	line-height: 15px;
	position: relative;
}

.input {
	border-style: none;
	height: 40px;
	width: 220px;
	padding-right: 40px;
	outline: none;
	border-radius: 10px;
	color: var(--color-white);
	transition: 0.5s ease-in-out;
	background-color: var(--movixy-primary-color);
}

.input {
	font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
		"Lucida Sans", Arial, sans-serif;
	font-size: 17px;
}

.input::placeholder {
	color: transparent;
}

.icon {
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	cursor: pointer;
	width: 50px;
	outline: none;
	border-style: none;
	pointer-events: painted;
	background-color: transparent;
	color: white;
	transition: 0.2s linear;
}

.icon:focus~.input,
.input:focus {
	padding-right: 40px;
	width: 250px;
	border-radius: 0px;
	background-color: transparent;
	border-bottom: 3px solid var(--movixy-primary-color);
	transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
}

.icon:focus~.input::placeholder {
	color: var(--movixy-primary-color);
}

.danmuStyle {
	margin-right: 20px;
	width: 30px;
	height: 30px;
	background-color: var(--movixy-primary-color);
	border-radius: 5px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	text-decoration: underline;
}
</style>