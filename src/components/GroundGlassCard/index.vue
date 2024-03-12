<template>
  <div class="card" :style="getCardStyle">
    <div class="card-image">
      <img v-image-is-exist="imageUrl" style="object-fit: fill; width: 100%;height: 100%;border-radius: 10px;" alt="image" />
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>

import {computed,reactive } from "vue";
const props = defineProps({
  height: {
    type: String,
    default: "30%",
  },
  width: {
    type: String,
    default: "40%",
  },
  imageUrl: String,
});
const getCardStyle = reactive(computed(() => {
  return {
    height: props.height,
    width: props.width,
  };
}));
</script>

<style scoped>
.card {
  cursor: pointer;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 1px 0 var(--color-white),
    0 1px 1px 0 var(--color-white);
    transition: all 0.3s;
}
.card:hover{
  box-shadow: 0 3px 4px 0 var(--color-white),
    0 5px 12px 0 var(--color-white);
    transform: perspective(1px) translateZ(0) scale(1.1);
  
}

.card-image {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
background-color: transparent;
}

.card-content {
  position: absolute;
  bottom: 0;
  left: 0;
  border-radius: 20px 20px 0  0 ;
  width: 100%;
  height: 35%;
  /* background-color: rgba(255, 255, 255, 0.5); */
  backdrop-filter: blur(10px);
  mix-blend-mode: difference;
}
</style>
