<template>
  <svg class="svgStyle" height="10vh" width="15vw">
    <defs>
      <!-- 文字颜色渐变 -->
      <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" :stop-color="textColorStart" />
        <stop offset="100%" :stop-color="textColorEnd" />
      </linearGradient>
      <!-- 描边颜色渐变 -->
      <!-- 渐变方向（x1,y1）->（x2,y2） -->
      <linearGradient id="gradientStroke" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" :stop-color="strokeColorStart" />
        <stop offset="100%" :stop-color="strokeColorEnd" />
      </linearGradient>
      <!-- 阴影，想要投影渐变，可以写多个，起不同的名字，在css中应用 -->
      <filter id="shadow">
        <feDropShadow dx="5" dy="5" stdDeviation="3" flood-color="#b9c4c4" />
      </filter>
    </defs>
    <text class="text" x="50%" y="50%" alignment-baseline="middle">{{ title }}</text>
  </svg>
</template>

<script setup>
import { computed} from "vue";

const props = defineProps({
	title:{type:String,require:true,default:"Movixy"},
  textColorStart: {
    type: String,
    require: false,
    default: '#b5ffff',
  },textColorEnd: {
    type: String,
    require: false,
    default: '#fca5f1',
  },
	strokeColorStart: {
    type: String,
    require: false,
    default: '#00ffee',
  },strokeColorEnd: {
    type: String,
    require: false,
    default: '#d585ff',
  },

});
const textColorStart = computed(() => props.textColorStart)
const textColorEnd = computed(()=>props.textColorEnd)
const strokeColorStart=computed(()=>props.strokeColorStart)
const strokeColorEnd=computed(()=>props.strokeColorEnd)
	
</script>
<style lang="less" scoped>
  .text {
    // 颜色填充
    fill: url(#gradient);
    // 方向居中
    text-anchor: middle;
    font-size: 40px;
    font-weight: 400;
    // 描边
    stroke-width: 4px;
    stroke: url(#gradientStroke);
    paint-order: 6px;
    // 投影
    // 建议用这个，代码简单整洁；渐变方法：text-shadow: 5px 5px 6px #b9c4c4,5px 5px 6px red;
    // text-shadow: 5px 5px 6px #b9c4c4;  // 简洁
    // svg方法实现投影；渐变方法：filter: url(#shadow1)  url(#shadow2);
    filter: url(#shadow);
}
.svgStyle {
  background-color:var(--movixy-one-color);
}
</style>
