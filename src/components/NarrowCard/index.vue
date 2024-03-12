<template>
	<div class="narrow-card" :style="{ width: width, height: height }">
		<div class="narrow-card-content" >
		<div class="narrow-card-top">
			<img class="narrow-card-img"  v-image-is-exist="imageUrl" :title="title" style="object-fit: cover; width: 100%;height: 100%;border-radius: 15px;" alt="image"/>
		</div>

		<div class="narrow-card-bottom">
			<span class="title">{{ title }}</span>
			<span class="label">{{ label }}</span>
		</div>
	</div>

	<div class="textBox"> 
    {{ description }}
  </div>

	</div>
</template>

<script setup>


const props = defineProps({
	width: {
		type: String,
		default: "150px",
	},
	height: {
		type: String,
		default: "210px",
	},
	imageUrl: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	label: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	videoId: {
		type: Number,
		required: true,
	},
});
</script>

<style lang="scss" scoped>
.narrow-card {
z-index: 2;
	cursor: pointer;
	position: relative;
	background-color: var(--movixy-two-color);
	border-radius: 15px;
	overflow: hidden;
  transition: 0.2s ease-in-out;
}
.narrow-card-content{
	width: 100%;
	height: 100%;
	background-color: var(--movixy-two-color);
	display: flex;
	flex-direction: column;
	border-radius: 15px;
	overflow: hidden;
	max-height: 210px;
  position: absolute; 
  transition: 0.2s ease-in-out;
 	z-index: 1;
}
.narrow-card-top {
	width: 90%;
	border-radius: 15px;
	margin: 5% 5% 0 5%;
	height: 70%;
	background-color: var(--movixy-two-color);
}

.narrow-card-bottom {
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 30%;
	background-color: var(--movixy-two-color);
}
.title {
	font-size: large;
	font-weight: bold;
	white-space: nowrap;
	width: 100%;
	color: var(--color-white);
	text-align: center;
	overflow: hidden;
}
.label {
	font-size: small;
	width: 100%;
	white-space: nowrap;
	margin-top: 0;
	color: #9ca4ab;
	text-align: center;
	overflow: hidden;
}



.textBox {
	width: 90%;
  opacity: 0;
  flex-direction: column;
  transition: 0.2s ease-in-out;
  font-weight: bold;
	z-index: 2;
	padding-left: 10px;
	padding-right: 10px;
	padding-top: 10px;
	position: absolute;
	color: var(--color-white);
	font-size: small;
  text-align: start;
  overflow: hidden;
	-webkit-line-clamp: 9;
  display: -webkit-box;
  -webkit-box-orient: vertical;
	word-break: break-all;
}


.narrow-card:hover { .textBox {
  opacity: 1;
}}

.narrow-card:hover{  .narrow-card-content {
  filter: blur(5px);
  animation: anim 3s infinite;
}}
@keyframes anim {
  0% {
    transform: scale(1.04) rotate(5deg);
  }

  50% {
    transform: scale(0.8) rotate(-5deg);
  }

  100% {
    transform: scale(1.04) rotate(5deg);
  }
}

.narrow-card:hover {
  transform: scale(1.04) rotate(-1deg);
}
</style>
