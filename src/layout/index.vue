<template>
  <div style="
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      display: grid;
      grid-template-columns: 15% 85%;
    ">
    <el-affix :offset="0">
      <div class="left-section">
        <div class="side-menu">
          <sideBar></sideBar>
        </div>
      </div>
    </el-affix>

    <div class="right-section" style="display: grid; grid-template-rows: 10vh auto">
      <el-affix :offset="0">
        <div class="right-top-section">
          <topBar></topBar>
        </div>
      </el-affix>
      <div class="main-content">
        <AppMain></AppMain>
      </div>
    </div>
  </div>
  <template v-click-outside="handleOut">
    <RecentPlayed v-if="store.getters.RecentPlayedDrawer" />
  </template>

  <template v-click-outside="handleOut">
    <Favorite v-if="store.getters.FavoriteDrawer" />
  </template>
  <el-drawer :destroy-on-close="true" style="--el-drawer-padding-primary:0px;" size="100%" v-model="settingDrawer"
    :z-index="999" :append-to-body="true" direction="ltr" :show-close="false" :modal="false"
    modal-class="setting-drawer" :before-close="handleClose">
    <div style="
        display: flex;
        height: 100%;
        width: 100%;
        background-color: var(--movixy-one-color);
        flex-direction: column;
        padding-left: 30px;
        border-right: 2px solid var(--movixy-five-color);
      " v-click-outside="handleClose">
      <div class="title" style="
          font-size: larger;
          color: var(--color-white);
          font-weight: bold;
          margin-top: 40px;
        ">
        Profile Settings
      </div>
      <div class="persionalInfo" style="height: 150px; margin-top: 25px">
        <span style="color: #9ca4ab; font-size: small">persional Info</span>
        <el-row justify="center" align="middle" style="height: 70px; width: 95%;cursor: pointer;" @click="item1click">
          <el-col :span="3">
            <el-icon :size="18" style="margin-top: 8px"><svg width="16" height="20" viewBox="0 0 16 20" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path :class="settingItem ? 'drawer-item-color' : 'drawer-item-color-inactive'"
                  d="M8 13.1739C12.3386 13.1739 16 13.8789 16 16.599C16 19.32 12.3146 20 8 20C3.66237 20 0 19.295 0 16.575C0 13.8539 3.68538 13.1739 8 13.1739ZM8 0C10.9391 0 13.294 2.35402 13.294 5.29105C13.294 8.22808 10.9391 10.5831 8 10.5831C5.0619 10.5831 2.70601 8.22808 2.70601 5.29105C2.70601 2.35402 5.0619 0 8 0Z" />
              </svg>
            </el-icon>
          </el-col>
          <el-col :span="10" :class="settingItem ? 'drawer-item-color' : 'drawer-item-color-inactive'"
            style="font-size: 16sp">
            Edit Profile</el-col>
          <el-col :offset="9" :span="2" :class="settingItem ? 'drawer-item-color' : 'drawer-item-color-inactive'">
            <el-icon style="margin-top: 8px">
              <ArrowRight :class="settingItem ? 'drawer-item-color' : 'drawer-item-color-inactive'" />
            </el-icon>
          </el-col>
        </el-row>
        <el-row justify="center" align="middle"
          style="width: 95%; height: 70px; border-top: 2px solid var(--movixy-five-color); cursor: pointer;"
          @click="item2click">
          <el-col :span="3">
            <el-icon :size="18" style="margin-top: 8px">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path :class="settingItem2 ? 'drawer-item-color' : 'drawer-item-color-inactive'" fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.334 0C17.723 0 20 2.378 20 5.916V14.084C20 17.622 17.723 20 14.332 20H5.664C2.276 20 0 17.622 0 14.084V5.916C0 2.378 2.276 0 5.664 0H14.334ZM14.334 1.5H5.664C3.135 1.5 1.5 3.233 1.5 5.916V14.084C1.5 16.767 3.135 18.5 5.664 18.5H14.332C16.864 18.5 18.5 16.767 18.5 14.084V5.916C18.5 3.233 16.864 1.5 14.334 1.5ZM6.8368 7.3984C8.01209 7.39922 9.00544 8.18001 9.32827 9.24892L15.0097 9.2495C15.4237 9.2495 15.7597 9.5855 15.7597 9.9995V11.8525C15.7597 12.2665 15.4237 12.6025 15.0097 12.6025C14.5957 12.6025 14.2597 12.2665 14.2597 11.8525V10.7495L12.931 10.749L12.9315 11.8525C12.9315 12.2665 12.5955 12.6025 12.1815 12.6025C11.7675 12.6025 11.4315 12.2665 11.4315 11.8525L11.431 10.749L9.32871 10.75C9.00608 11.8201 8.01119 12.6024 6.8368 12.6024C5.4018 12.6024 4.2348 11.4344 4.2348 10.0004C4.2348 8.5654 5.4018 7.3984 6.8368 7.3984ZM6.8388 8.8984C6.2288 8.8984 5.7348 9.3924 5.7348 10.0004C5.7348 10.6084 6.2288 11.1024 6.8368 11.1024C7.4438 11.1024 7.9388 10.6084 7.9388 10.0004C7.9388 9.3934 7.4448 8.8994 6.8388 8.8984Z" />
              </svg></el-icon>
          </el-col>
          <el-col :span="10" :class="settingItem2 ? 'drawer-item-color' : 'drawer-item-color-inactive'"
            style="  font-size: 16sp">
            Password</el-col>
          <el-col :offset="9" :span="2" :class="settingItem2 ? 'drawer-item-color' : 'drawer-item-color-inactive'">
            <el-icon style="margin-top: 8px">
              <ArrowRight :class="settingItem2 ? 'drawer-item-color' : 'drawer-item-color-inactive'" />
            </el-icon>
          </el-col>
        </el-row>
        <el-row justify="center" align="middle" style="
            width: 90%;
            height: 40px;
            border: 1px solid red;
            border-radius: 15px;
            margin-top: 50%;cursor: pointer;
          " @click="LogOutClick">
          <el-col :offset="2" :span="2">
            <el-icon :size="20" style="margin-top: 5px;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15.24 22.27H15.11C10.67 22.27 8.53002 20.52 8.16002 16.6C8.12002 16.19 8.42002 15.82 8.84002 15.78C9.24002 15.74 9.62002 16.05 9.66002 16.46C9.95002 19.6 11.43 20.77 15.12 20.77H15.25C19.32 20.77 20.76 19.33 20.76 15.26V8.74001C20.76 4.67001 19.32 3.23001 15.25 3.23001H15.12C11.41 3.23001 9.93002 4.42001 9.66002 7.62001C9.61002 8.03001 9.26002 8.34001 8.84002 8.30001C8.42002 8.27001 8.12001 7.90001 8.15001 7.49001C8.49001 3.51001 10.64 1.73001 15.11 1.73001H15.24C20.15 1.73001 22.25 3.83001 22.25 8.74001V15.26C22.25 20.17 20.15 22.27 15.24 22.27Z"
                  fill="#EB3F5E" />
                <path
                  d="M15.0001 12.75H3.62012C3.21012 12.75 2.87012 12.41 2.87012 12C2.87012 11.59 3.21012 11.25 3.62012 11.25H15.0001C15.4101 11.25 15.7501 11.59 15.7501 12C15.7501 12.41 15.4101 12.75 15.0001 12.75Z"
                  fill="#EB3F5E" />
                <path
                  d="M5.84994 16.1C5.65994 16.1 5.46994 16.03 5.31994 15.88L1.96994 12.53C1.67994 12.24 1.67994 11.76 1.96994 11.47L5.31994 8.12C5.60994 7.83 6.08994 7.83 6.37994 8.12C6.66994 8.41 6.66994 8.89 6.37994 9.18L3.55994 12L6.37994 14.82C6.66994 15.11 6.66994 15.59 6.37994 15.88C6.23994 16.03 6.03994 16.1 5.84994 16.1Z"
                  fill="#EB3F5E" />
              </svg>
            </el-icon>
          </el-col>
          <el-col :span="8" style="color: red; font-size: 10sp; font-weight: 600">
            &nbsp; Log Out</el-col>
        </el-row>
      </div>
    </div>
  </el-drawer>
  <el-drawer style="--el-drawer-padding-primary:0px;" size="100%" v-model="settingDrawer2" :z-index="999"
    :append-to-body="true" direction="ltr" :show-close="false" :modal="false" modal-class="setting-drawer2">
    <div
      style="display: flex;flex-direction: column; width: 100%;height: 100%;  background-color: var(--movixy-one-color);">
      <div style="height: 25%;display: flex;align-items: center;">
        <div style="height: 70%;aspect-ratio: 1;position: relative;margin-left: 2%;">
          <img v-image-is-exist="avatar" style="border-radius: 50%;height: 100%;width: 100%; object-fit: cover;">
          </img>
          <div style="position: absolute;bottom: 6%;right: 2%;border-radius: 50%; height: 25%;aspect-ratio: 1;">
            <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="var(--movixy-primary-color)" />
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M18.0268 10.7009C18.7002 10.9689 18.9062 11.9022 19.1815 12.2022C19.4568 12.5022 19.8508 12.6042 20.0688 12.6042C21.2275 12.6042 22.1668 13.5435 22.1668 14.7015V18.5649C22.1668 20.1182 20.9068 21.3782 19.3535 21.3782H12.6468C11.0928 21.3782 9.8335 20.1182 9.8335 18.5649V14.7015C9.8335 13.5435 10.7728 12.6042 11.9315 12.6042C12.1488 12.6042 12.5428 12.5022 12.8188 12.2022C13.0942 11.9022 13.2995 10.9689 13.9728 10.7009C14.6468 10.4329 17.3535 10.4329 18.0268 10.7009Z"
                stroke="var(--color-white)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M19.6638 14.3333H19.6698" stroke="white" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M18.1195 16.752C18.1195 15.5814 17.1709 14.6327 16.0002 14.6327C14.8295 14.6327 13.8809 15.5814 13.8809 16.752C13.8809 17.9227 14.8295 18.8714 16.0002 18.8714C17.1709 18.8714 18.1195 17.9227 18.1195 16.752Z"
                stroke="var(--color-white)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <el-form ref="MyProfile" :model="ProfileForm" :rules="ProfileRules" class="MyProfile" style="margin-left: 2%;">
        <span class="MyProfile-item-title">昵称</span>
        <el-row style="margin-top: 5px;">
          <el-col :span="10">
            <el-form-item prop="user_name">
              <el-input v-model="ProfileForm.user_name" type="text" auto-complete="off" placeholder="账号昵称">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <span class="MyProfile-item-title">邮箱地址</span>
        <el-form-item prop="email">
          <el-input v-model="ProfileForm.email" style="width: 90%;" type="text" auto-complete="off" placeholder="邮箱地址">
          </el-input>
        </el-form-item>
        <el-form-item>
          <div style="height: 100%;width: 90%; display: flex;flex-direction: row;justify-content: flex-end;">
            <el-button :loading="form_upload" @click="handleUpload"
              style="border-radius: 15px;border: none; background-color: var(--movixy-primary-color);color: var(--color-white)">确认修改</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
  <el-drawer style="--el-drawer-padding-primary:0px;" size="100%" v-model="settingDrawer3" :z-index="999"
    :append-to-body="true" direction="ltr" :show-close="false" :modal="false" modal-class="setting-drawer2">
    <div
      style="display: flex;flex-direction: column; width: 100%;height: 100%;background-color: var(--movixy-one-color);">

      <el-form ref="MyPassword" :model="PasswordForm" :rules="PasswordRules" class="MyPassword"
        style="margin-left: 2%;">
        <span
          style="display: flex; font-size: large;margin-bottom: 2%;font-weight: bold;color: var(--color-white);">密码</span>

        <el-row style="margin-top: 5px;">
          <el-col :span="10">
            <el-form-item prop="currentPassword">
              <span class="MyProfile-item-title">当前密码</span>
              <el-input v-model="PasswordForm.currentPassword" type="password" auto-complete="off" show-password
                placeholder="当前密码">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="10">
            <el-form-item prop="newPassword">
              <span class="MyProfile-item-title">新密码</span>
              <el-input v-model="PasswordForm.newPassword" type="password" auto-complete="off" show-password
                placeholder="新密码">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <div style="height: 100%;width: 90%; display: flex;flex-direction: row;justify-content: flex-end;">
            <el-button :loading="form_upload" @click="handleUploadPassword"
              style="border-radius: 15px;border: none; background-color: var(--movixy-primary-color);color: var(--color-white)">确认修改密码</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<script setup>
import topBar from "./components/RightSection/TopBar/index";
import sideBar from "./components/SideBar/index";
import AppMain from "./components/RightSection/AppMain.vue";
import RecentPlayed from "#/views/other/RecentPlayed/index";
import Favorite from "#/views/other/Favorite/index";
import { useStore } from "vuex";
import { ref, computed, watch, reactive } from "vue";
import { updateUser, updatePassword } from "#/api/user";
const store = useStore();
const settingDrawer = ref(false);
const settingDrawer2 = ref(false);
const settingDrawer3 = ref(false);
const settingItem = ref(false);
const settingItem2 = ref(false);
const form_upload = ref(false);
const avatar = computed(() => store.getters.avatar);
const ProfileForm = reactive(computed(() => {
  return {
    userId: store.getters.user_id,
    user_name: store.getters.name,
    email: store.getters.email,
  }
}));
const PasswordForm = reactive({
  userId: store.getters.user_id,
  currentPassword: "",
  newPassword: "",
});
const ProfileRules = {
  user_name: [
    { required: true, message: "请输入昵称", trigger: "blur" },
    { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" },
  ],
  email: [
    { required: false, trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
  ],
}
const PasswordRules = {
  currentPassword: [
    { required: true, message: "请输入当前密码", trigger: "blur" },
    { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
  ],
  newPassword: [
    { required: true, message: "请输入新密码", trigger: "blur" },
    { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
  ],
}
const vClickOutside = {
  mounted (el, binding) {
    function eventHandler (e) {
      console.log(e.target)
      if (el.contains(e.target)) {
        return false
      }
      if(e.target.classList.contains('mx-context-menu')||e.target.classList.contains('mx-context-menu-item')){
        return false
      }
      // 如果绑定的参数是函数，正常情况也应该是函数，执行
      if (binding.value && typeof binding.value === 'function') {
        binding.value(e)
      }
    }
    // 用于销毁前注销事件监听
    el.__click_outside__ = eventHandler
    // 添加事件监听
    document.addEventListener('click', eventHandler)
  },
  beforeUnmount (el) {
    // 移除事件监听
    document.removeEventListener('click', el.__click_outside__)
    // 删除无用属性
    delete el.__click_outside__
  }
}
watch(
  () => store.getters.settingDrawer,
  (newVal, oldVal) => {
    settingDrawer.value = newVal;
    if (!newVal) {
      settingItem.value = false;
      settingDrawer2.value = false;
      settingItem2.value = false;
      settingDrawer3.value = false;
    }
  }
);
function handleOut () {
  store.dispatch("menu/setAllDrawer", false);
}
function handleClose () {
  store.dispatch("menu/setSettingDrawer", false);
  settingItem.value = false;
  settingDrawer2.value = false;
  settingItem2.value = false;
  settingDrawer3.value = false;
}
function LogOutClick () {
  handleClose()
  store.dispatch('user/logout')
}
function item1click () {
  if (settingItem.value || settingDrawer2.value) {
    settingItem.value = false;
    settingDrawer2.value = false;
  }
  else {
    settingItem.value = true;
    settingDrawer2.value = true;
    settingItem2.value = false;
    settingDrawer3.value = false;
  }
}
function item2click () {
  if (settingItem2.value || settingDrawer3.value) {
    settingItem2.value = false;
    settingDrawer3.value = false;
  }
  else {
    settingItem2.value = true;
    settingDrawer3.value = true;
    settingItem.value = false;
    settingDrawer2.value = false;
  }
}
function handleUpload () {
  form_upload.value = true;
  if (ProfileForm.user_name == store.getters.name && ProfileForm.email == store.getters.email) {
    form_upload.value = false;
    return;
  } else {
    updateUser(ProfileForm).then(res => {
      form_upload.value = false;
      store.dispatch("user/getUserInfo")
      ElMessage({
        message: res.message,
        type: 'success',
        duration: 2000
      });
    }).catch(err => {
      form_upload.value = false;
    })
  }
}
function handleUploadPassword () {
  form_upload.value = true;
  updatePassword(PasswordForm).then(res => {
    form_upload.value = false;
    ElMessage({
      message: res.message,
      type: 'success',
      duration: 2000
    });
  }).catch(err => {
    form_upload.value = false;
  })
}
</script>


<style lang="less" scoped>
.right-section {
  grid-column: 2;
}

.left-section {
  grid-column: 1;
  display: grid;
  height: 100vh;
}

.side-menu {
  background-color: var(--movixy-two-color);
  overflow: auto;
}

.right-top-section {
  grid-row: 1;
  height: 10vh;
}

.main-content {
  grid-row: 2;
  background-color: var(--movixy-one-color);
}

.drawer-item-color-inactive {
  color: var(--description-color);
  fill: var(--description-color);
}

.drawer-item-color {
  color: var(--movixy-primary-color);
  fill: var(--movixy-primary-color);
}

.MyProfile-item-title {
  color: var(--description-color);
  font-size: small;
  margin-bottom: 10px;
}

.el-input {
  --el-input-border-color: #00000000;
  --el-input-hover-border-color: var(--movixy-primary-color);
  --el-input-focus-border-color: var(--movixy-primary-color);
}
</style>
