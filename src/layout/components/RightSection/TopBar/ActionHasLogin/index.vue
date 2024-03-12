<template>
	<div class="container">
		<div class="notification">
			<el-badge value="" is-dot:true>
				<Bell style="width: 1.5vw; height: 1.5vw; color: var(--color-white);"/>
			</el-badge>
		</div>
		<div class="user">
			<div class="avatar">
				<img title="avatar" v-image-is-exist="avatar" style="width: 100%; height: 100%; border-radius: 50%;"/>
			</div>
			<div class="name">{{ name }}</div>
			
			<el-dropdown trigger="click" popper-class="dropdown-popper">
        <div class="dropdown" style="cursor: pointer;">
				<ArrowDownBold style="width: 1vw; height: 1vw; color: var(--movixy-primary-color);"/>
			</div>
        <template #dropdown>
          <el-dropdown-menu class="dropdown-menu">
							<div style="display: flex; height: 100%;width: 100%;justify-content: center;align-items: center; cursor: pointer;color:var(--color-white)" @click="LogoutClick">Logout</div>
					</el-dropdown-menu>
        </template>
      </el-dropdown>
		</div>
	</div>
</template>
<script setup>
import {useStore} from 'vuex'
import {computed,ref} from 'vue'
const store = useStore()
const avatar = computed(() => store.getters.avatar)
const name = computed(() => store.getters.name)

function LogoutClick(){
	store.dispatch('user/logout')
}
</script>
<style scoped>
.container {
	align-items: center;
	display: flex;
	justify-content: flex-end;
}


.user{
	width: 13vw;
	margin-left: 1vw;
	display: flex;
	align-items: center;
}
.avatar{
	width: 2.5vw;
	height: 2.5vw;
	border-radius: 50%;
	margin-right: 1vw;
}
.name{
	margin-right: 1vw;
	color: var(--color-white);
	font-size: normal;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 5vw;
}
.dropdown-menu{
	background-color: var(--movixy-primary-color);
	border-radius: 5px;
	width: 60px;
	height: 20px;
}

</style>
