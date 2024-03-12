<template>
	<div class="my-grid" :style="gridStyle">
		<div v-for="item in props.TopMovieList" :key="item.video_id" class="grid-item" @click="handleclick(item)" >
			<GroundGlassCard :imageUrl="item.video.video_img"  width="100%" height="100%">
            <CardContent :videoInfo="item.video"></CardContent>
			</GroundGlassCard>
		</div>
	</div>
</template>

<script setup>
import GroundGlassCard from "#/components/GroundGlassCard/index";
import CardContent from "#/components/GroundGlassCard/CardContent/index";
import {computed,watch } from 'vue';
import {useRouter} from 'vue-router';
const router = useRouter();
const props = defineProps({
	parentKey: String,
	width: {
		type: String,
		default: "40%"
	},
	height: {
		type: String,
		default: "30%"
	},
	itemCount: {
		type: Number,
		default: 4
	},
	horizontalGap: {
		type: String,
		default: "20px"
	},
	verticalGap: {
		type: String,
		default: "20px"
	},
	TopMovieList: Array,
});
const gridStyle = computed(() => {
	return {
		display: 'grid',
		gridTemplateColumns: `repeat(auto-fill, minmax(${props.width}, 1fr))`,
		gridTemplateRows: `repeat(auto-fill, minmax(${props.height}, 1fr))`,
		gap: `${props.verticalGap} ${props.horizontalGap}`
	};
});

// const items = computed(() => {
// 	return Array.from({ length: props.itemCount }, (_, index) => ({
// 		id: `${props.parentKey}-item-${index}`,
// 		text: `Item ${index + 1}`,
// 	}));
// });

const handleclick = (item) => {
  router.push({ path:router.currentRoute.value.path+"/videoPlayer",query:{videoId:item.video_id}})
};
</script>

<style scoped>
.my-grid {
	width: 100%;
	height: 100%;
}

.grid-item {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
