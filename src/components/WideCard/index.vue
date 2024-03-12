<template>
	<div class="card">
  <div class="card-inner">
    <div class="card-front">
			<img v-image-is-exist="image" title="aaa" style="width:100%;height: 100%;border-radius: 20px;object-fit: cover;" >
    </div>
    <div class="card-back">
     <div class="card-back-content">
			{{description}}
		 </div>
    </div>
  </div>
</div>
</template>
<script setup>
import {ref} from 'vue'
const props=defineProps({
	description:String,
	image:String
})
</script>
<style  scoped>
.card {
  width: 85%;
  height: 180px;
}

.card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.999s;
}

.card:hover .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.card-front {
  /* background-color: #6A2C70; */
  color: var(--color-white);
  display: flex;
  align-items: center;
  border-radius: 20px;
  justify-content: center;
  font-size: 24px;
  transform: rotateY(0deg);
}

.card-back {
  background-color: var(--color-black);
  display: flex;
  align-items: self-start;
  border-radius: 20px;
  justify-content: center;
  font-size: 24px;
  transform: rotateY(180deg);
}
.card-back-content{
	display: flex;
	width: 90%;
	color: var(--color-white);
  text-align: start;
  overflow: hidden;
	-webkit-line-clamp: 5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
	word-break: break-all;
}
</style>