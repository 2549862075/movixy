<template>
	<div class="card">	
	<div class="title">{{title}}</div>
	<img v-image-is-exist="img" alt="" style="width: 100%;height: 100%;border-radius: 20px;object-fit: cover;">
	<div class="progress"><div class="progress-hover"></div></div>
	<div class="modal"></div>

	</div>
</template>
<script setup>
import { ref,computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const store = useStore();
const router = useRouter();
const props=defineProps({
	videoId:Number,
	title:String,
	img:String,
	progressNumber:String
})
// const progressNumber=ref("90%")
// const 
</script>
<style lang="less" scoped>
.card{
	width: 100%;
	width: 100%;
	border-radius: 20px;
	background-color: green;
	position: relative;
	overflow: hidden;
}
.modal{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0.2);
	border-radius: 20px;
	z-index: 1;
}
.card:hover .title {
	opacity: 1;
	animation: move 1s forwards;
	background-color: rgba(0,0,0,0);
}
.card:hover .modal{
	background-color: rgba(0,0,0,0);
}

.title{
	position: absolute;
	top: 0%;
	left: 5%;
	width: 90%;
	opacity: 0;
	white-space: nowrap;
	overflow: hidden;
	color: white;
	mix-blend-mode: difference;
	font-size: 20px;
}
@keyframes move {
	0%{
		top: -20%;
	}
  100% {
		top: 2%;
  }
}

.progress{
	position: absolute;
	bottom: 5%; 
	left: 2.5%;
	width: 95%;
	height: 4%;
	border-radius: 20px;
	background-color: #F9F9F966;
	z-index: 2;
}
.progress-hover{
	width: v-bind(progressNumber);
	height: 100%;
	border-radius: 20px;
	background-color: var(--movixy-primary-color);
}
</style>