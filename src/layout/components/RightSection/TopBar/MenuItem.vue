<template>
	<div class="menu">
		<div class="menu-wrapper">
			<div v-for="(item, index) in items" :key="index" class="item"  @click="menuHandleClick">
				<span class="item-text" :class="{'item_active':String(item).toLowerCase()===activeSubMenu.value}">{{ item }}</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import {computed ,reactive} from 'vue';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';
const router = useRouter();
const store = useStore();
function menuHandleClick(event, item) {
	router.push({name:store.getters.activeMenuName+"_"+event.target.innerText});
}
const activeSubMenu = reactive({
	value: computed(() => store.getters.getActiveSubMenu),}
)
defineProps({
	items: {
		type: Array,
		required: true,
	},
});




</script>

<style scoped>
.menu {
	height: 100%;
	white-space: nowrap;
}

.menu-wrapper {
	display: flex;
	height: 100%;
	flex-direction: row;
}
.item {
	display: flex;
	height: 100%;
	align-items: center;
	margin-right: 3vw; /* Add a 5%vw gap between items */
	min-width: auto; /* Set the minimum width for the item */
	cursor: pointer;
}

.item-text {
	color: var(--color-white);
	font-size: normal;
}
.item_active {
	color: var(--movixy-primary-color);
}
.item:last-child {
	margin-right: 0; /* Remove the gap for the last item */
}

.item:first-child {
	margin-left: 2vw; /* Add a 5%vw gap to the left of the first item */
}
</style>
