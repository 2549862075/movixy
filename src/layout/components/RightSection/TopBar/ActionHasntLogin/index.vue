<template>
	<div class="container">
		<div class="signup-button" @click="ToSignUp">
			<span style="font-size: 18px;font-weight: bold;">Sign Up</span>
		</div>
		<div class="signin-button" @click="ToSignIn">
			<span style="font-size: 18px;font-weight: bold;">Sign In</span>
		</div>
		<div class="user"></div>	
		<el-dialog class="SignUp-el-dialog" v-model="dialogTableVisible" style="width: 30%;" :close-on-click-modal=false>
		<sign-up-alert-content v-if="showSignUp"></sign-up-alert-content>
		<sign-in-alert-content v-else></sign-in-alert-content>
  </el-dialog>
	</div>

</template>
<script setup>
import Search from '#/components/Search/index'
import SignUpAlertContent from '#/components/SignUpAlertContent/index'
import SignInAlertContent from '#/components/SignInAlertContent/index'
import { reactive, ref } from 'vue'
const dialogTableVisible = ref(false)
const showSignUp = ref(false)

function ToSignUp(){
	showSignUp.value = true
	dialogTableVisible.value = true
}
function ToSignIn(){
	showSignUp.value = false
	dialogTableVisible.value = true
}
</script>
<style lang="less" scoped>
.container {
	align-items: center;
	display: flex;
}

.signup-button,.signin-button {
	display: flex;
	border-radius: 1vw;
	background-color: var(--movixy-primary-color);
	width: 8vw;
	aspect-ratio: 3.1;
	justify-content: center;
	align-items: center;
	color: var(--color-white);
	cursor: pointer;
}
.signin-button {
	margin-left: 20px;
	background-color: var(--movixy-primary-off-color);
}
.user{
	width: 2.5vw;
	height: 2.5vw;
	border-radius: 50%;
	background-color: var(--color-white);
	margin-left: 1vw;
	margin-right: 2vw;
}
:deep(.SignUp-el-dialog) {
	background-color: var(--movixy-two-color);
	--el-dialog-width: 50%;
  --el-dialog-margin-top: 10vh;
  --el-dialog-bg-color: #1A161F;
  --el-dialog-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  --el-dialog-title-font-size: 22px;
  --el-dialog-content-font-size: 14px;
  --el-dialog-font-line-height: 24px;
  --el-dialog-padding-primary: 16px;
  --el-dialog-border-radius: 10px;
  --el-message-close-size: 18px;
 .el-dialog__close{
	color: var(--movixy-primary-color);
 }
	}

</style>