<template>
	<div class="SignInAlertContent">
		<div class="SignInAlertContent-title"><span>Log in to Movixy</span></div>
    <el-form ref="MySignInForm" :model="SignInForm" :rules="SignInRules" class="SignIn-form">
      <span class="SignInAlertContent-item-title">Username</span>
      <el-form-item  prop="username">
        <el-input class="SignIn-input" v-model="SignInForm.username" type="text" auto-complete="off" placeholder="账号">
        </el-input>
      </el-form-item>
      <span class="SignInAlertContent-item-title">Password</span>
      <el-form-item prop="password">
        <el-input class="SignIn-input" v-model="SignInForm.password" type="password" auto-complete="off" show-password placeholder="密码">
        </el-input>
      </el-form-item>
      <span class="SignInAlertContent-item-title"></span>
      <div class="SignIn-remenber">
        <el-checkbox class="SignIn-remenber-checkbox" label="Remember Me" v-model="isRemenber" />
        <span>Forgot Password?</span>
      </div>
      <el-form-item style="width:100%;margin: 10px 0 10px  0;">
        <button class="SignIn-button"  @click.native.prevent="handleSignIn">
          <span>Sign In</span>
        </button>
      </el-form-item>
      <span class="SignIn-other-text">Or Sign In With </span>
      <div class="SignIn-other">
      <div class="SignIn-other-google">
        <Google></Google> <span style="margin-left: 5px;">Sign In With Google</span>
      </div>
      <div class="SignIn-other-discard">
        <Discard></Discard> <span style="margin-left: 5px;">Sign In With Discard</span>
      </div>
      </div>
    </el-form>
    <div class="SignInAlertContent-bottom">Don't have an account? <span class="SignInAlertContent-bottom-signin" >Sign In</span></div>
  </div>
</template>
<script setup>
import { ref,reactive } from 'vue';
import {useStore} from 'vuex';
import Google from '#/utils/svg/google'
import Discard from '#/utils/svg/discard'
const store = useStore();
const isRemenber = ref(false);
const SignInForm = reactive({
  username: undefined===localStorage.getItem('username')?'':localStorage.getItem('username'),
  password: undefined===localStorage.getItem('password')?'':localStorage.getItem('password'),
})
const SignInRules = reactive({
  username: [
    { required: true, trigger: 'blur', message: '请输入您的账号' }
  ],
  password: [
    { required: true, trigger: 'blur', message: '请输入您的密码' }
  ],
})
function handleSignIn(){
  store.dispatch("user/login", SignInForm).then(() => {
    if(isRemenber.value){
      localStorage.setItem('username',SignInForm.username)
      localStorage.setItem('password',SignInForm.password)
    }else{
      localStorage.removeItem('username')
      localStorage.removeItem('password')
    }
  reset();
  }).catch(() => {
    reset();
  });
}
function reset(){
  SignInForm.username = '';
  SignInForm.password = '';
}
</script>
<style lang="less" scoped>
.SignInAlertContent {
	display: flex;
  flex-direction: column;
	align-items: flex-start;
	height: 70vh;
	background-size: cover;
  text-align: left;
}
.SignInAlertContent-title {
	font-size: larger;
	text-align: center;
	font-weight: bold;
	color: var(--color-white);
  margin-bottom: 10px;
}
.SignIn-form{  width: 100%;

}
.SignInAlertContent-item-title{
  color: var(--color-white);
  font-size: medium;
}
.SignIn-input {
  margin-top: 10px;
  :deep(.el-input__wrapper){
    box-shadow: none;
  }
  width: 100%;
}
.SignIn-remenber {
  margin-top: 10px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  span{
    color: var(--movixy-primary-color);
  }
}
.SignIn-button {
  width: 100%;
  height: 40px;
  background-color: var(--movixy-primary-color);
  color: var(--color-white);
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
.SignIn-button:hover {
 box-shadow: 0 0 10px var(--color-white)   
}
.SignIn-other-text {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  width: 100%;
  color: var(--description-color);
  text-align: center;
  font-size: small;
 justify-content: center;
}
.SignIn-other-google,.SignIn-other-discard{
  margin-top: 20px;
  display: flex;
  width: auto;
  justify-content: center;
  color: var(--color-white);
}
.SignInAlertContent-bottom{
  width: 100%;
  display: flex;
  margin-top: auto;
  justify-content: center;
}
.SignInAlertContent-bottom-signin{
  color: var(--movixy-primary-color);
  cursor: pointer;
}

</style>
