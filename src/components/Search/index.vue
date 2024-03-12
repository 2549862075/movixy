<template>
	<div style="width:100%;height: 50px;align-items: center;justify-content: center;">
		<div class="input-container">
			<input @focusin="handlefocusin" @keyup.enter.native="searchEnter" @focusout="handlefocusout" placeholder="Search something..." v-model="SearchContent" class="input" name="text" type="text">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon" @click="handleSearch">
				<g stroke-width="0" id="SVGRepo_bgCarrier"></g>
				<g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g>
				<g id="SVGRepo_iconCarrier">
					<rect fill="white"></rect>
					<path
						d="M7.25007 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54878 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25007 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67897 18.06 2.38782 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54878 2.38782 7.25007C2.67897 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25007 2.38782ZM9 11.5C9 10.1193 10.1193 9 11.5 9C12.8807 9 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5ZM11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16C12.3805 16 13.202 15.7471 13.8957 15.31L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L15.31 13.8957C15.7471 13.202 16 12.3805 16 11.5C16 9.01472 13.9853 7 11.5 7Z"
						clip-rule="evenodd" fill-rule="evenodd"></path>
				</g>
			</svg>
		</div>
	</div>
</template>
<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useStore()
const SearchContent = ref('')
function handleSearch() {
	// SearchContent.value = ''
	store.dispatch('animate/setAnimate', 'fade2')
	router.push({ name: 'search', query: { search: SearchContent.value } })
}
function handlefocusin() {
}
function handlefocusout() {

}
function searchEnter(event){
	handleSearch()
	// event.target.blur()
}
</script>
<style lang="less" scoped>
.input-container {
	position: relative;
	display: flex;
	align-items: center;
}

.input {
	width: 40px;
	height: 40px;
	border-radius: 10px;
	border: none;
	outline: none;
	background-color: transparent;
	cursor: pointer;
	transition: all .5s ease-in-out;
	z-index: 2;
}

.input::placeholder {
	color: transparent;
}

.input:focus::placeholder {
	color: var(--description-color);
}

.input:focus,
.input:not(:placeholder-shown) {
	background-color: var(--movixy-two-color);
	z-index: 0;
	width: 200px;	
	color: var(--color-white);
	border: 1px solid var(--movixy-primary-color);
	cursor: pointer;
	caret-color: var(--movixy-primary-color);
	padding: 0 40px 0  0 ;
}

.icon {
	position: absolute;
	right: 0;
	top: 0;
	height: 40px;
	width: 40px;
	background-color: var(--movixy-two-color);
	border-radius: 15px;
	z-index: 1;
	cursor: pointer;
	fill: var(--movixy-primary-color);
	border: 1px solid var(--movixy-primary-color);
}

.input:hover+.icon {
	transform: rotate(360deg);
	transition: .2s ease-in-out;
}

.input:focus+.icon,
.input:not(:placeholder-shown)+.icon {
	z-index: 2;
	background-color: transparent;
	border: none;
}
</style>