<template>
	<div class="SignUpAlertContent">
		<div class="SignUpAlertContent-title"><span>Create Your Account</span></div>
    <el-form ref="MySignUpForm" :model="SignUpForm" :rules="SignUpRules" class="SignUp-form">
      <span class="SignUpAlertContent-item-title">Username</span>
      <el-form-item  prop="username">
        <el-input class="SignUp-input" v-model="SignUpForm.username" type="text" auto-complete="off" placeholder="账号">
        </el-input>
      </el-form-item>
      <span class="SignUpAlertContent-item-title">Password</span>
      <el-form-item prop="password">
        <el-input class="SignUp-input" v-model="SignUpForm.password" type="password" auto-complete="off" show-password placeholder="密码">
        </el-input>
      </el-form-item>
      <span class="SignUpAlertContent-item-title">Confirm Password</span>
      <el-form-item prop="confirmPassword">
        <el-input class="SignUp-input" v-model="SignUpForm.confirmPassword" type="password" auto-complete="off" show-password placeholder="确认密码">
        </el-input>
      </el-form-item>
      <el-form-item style="width:100%;margin: 10px 0 10px  0;">
        <button class="SignUp-button"  @click.native.prevent="handleSignUp">
          <span>Sign Up</span>
        </button>
      </el-form-item>
      <span class="SignUp-other-text">Or Sign Up With </span>
      <div class="SignUp-other">
      <div class="SignUp-other-google">
        <Google></Google> <span style="margin-left: 5px;">Sign Up With Google</span>
      </div>
      <div class="SignUp-other-discard">
        <Discard></Discard> <span style="margin-left: 5px;">Sign Up With Discard</span>
      </div>
      </div>
    </el-form>
    <div class="SignUpAlertContent-bottom">Already have an account? <span class="SignUpAlertContent-bottom-signin" >Sign In</span></div>
  </div>
</template>
<script setup>
import { ref,reactive } from 'vue';
import {useStore} from 'vuex';
import Google from '#/utils/svg/google'
import Discard from '#/utils/svg/discard'
import{isvalidUsername,isvalidPassword} from "#/utils/validate"
const store = useStore();
const SignUpForm = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})
const MySignUpForm = ref(null);
function equalToPassword(rule, value, callback) {
  if (value !== SignUpForm.password) {
    callback(new Error('两次输入密码不一致!'));
  } else {
    callback();
  }
}
function validateUsername(rule, value, callback) {
  if (!isvalidUsername(value)) {
    callback(new Error('用户名要求:数字加英文,不包含特殊字符'));
  } else {
    callback();
  }
}
function validatePassword(rule, value, callback) {
  if (!isvalidPassword(value)) {
    callback(new Error('6-20位英文字母、数字或者符号(除空格),且字母、数字和标点符号至少包含两种'));
  } else {
    callback();
  }
}
const SignUpRules = reactive({
  username: [
    { required: true, trigger: 'blur', message: '请输入您的账号' },
    {required:true , validator:validateUsername ,trigger:"blur"}
  ],
  password: [
    { required: true, trigger: 'blur', message: '请输入您的密码' },
    {required:true , validator:validatePassword ,trigger:"blur"}
  ],
  confirmPassword: [
    { required: true, trigger: 'blur', message: '请输入您的确认密码' },
    { required: true, validator: equalToPassword, trigger: "blur" }
  ]
})
function handleSignUp(){
  MySignUpForm.value.validate((valid) => {
    if (valid) {
      store.dispatch('user/register',SignUpForm)
    } else {
      return false;
    }
  });
}
</script>
<style lang="less" scoped>
.SignUpAlertContent {
	display: flex;
  flex-direction: column;
	align-items: flex-start;
	height: 70vh;
	background-size: cover;
  text-align: left;
}
.SignUpAlertContent-title {
	font-size: larger;
	text-align: center;
	font-weight: bold;
	color: var(--color-white);
  margin-bottom: 10px;
}
.SignUp-form{  width: 100%;

}
.SignUpAlertContent-item-title{
  color: var(--color-white);
  font-size: medium;
}
.SignUp-input {
  margin-top: 10px;
  :deep(.el-input__wrapper){
    box-shadow: none;
  }
  width: 100%;
}
.SignUp-remenber {
  margin-top: 10px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  span{
    color: var(--movixy-primary-color);
  }
}
.SignUp-button {
  width: 100%;
  height: 40px;
  background-color: var(--movixy-primary-color);
  color: var(--color-white);
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
.SignUp-button:hover {
 box-shadow: 0 0 10px var(--color-white)   
}
.SignUp-other-text {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  width: 100%;
  color: var(--description-color);
  text-align: center;
  font-size: small;
 justify-content: center;
}
.SignUp-other-google , .SignUp-other-discard{
  margin-top: 20px;
  display: flex;
  width: auto;
  justify-content: center;
  color: var(--color-white);
}
.SignUpAlertContent-bottom{
  width: 100%;
  display: flex;
  margin-top: auto;
  justify-content: center;
}
.SignUpAlertContent-bottom-signin{
  color: var(--movixy-primary-color);
  cursor: pointer;
}
</style>
