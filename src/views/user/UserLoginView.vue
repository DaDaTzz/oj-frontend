<template>
  <div id="userLoginPage">
    <h2 style="margin-bottom: 16px">登录</h2>
    <a-form :model="form" :style="{ width: '480px', margin:'0 auto' }" @submit="handleSubmit" label-align="left" auto-label-width>
      <a-form-item field="userAccount" label="账号">
        <a-input
          v-model="form.userAccount"
          placeholder="请输入账号..."
        />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不小于 8 位" label="密码">
        <a-input-password v-model="form.userPassword" placeholder="请输入密码..." />
      </a-form-item>
      <a-form-item>
        <div style="display: flex;width: 100%; align-items: center; justify-content: space-between">
          <a-button type="primary" html-type="submit" style="width: 120px">登录</a-button>
          <a-link @click="() => router.push('/user/register')">新用户注册</a-link>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { userLoginUsingPost } from "@/api/userController";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import {useStore} from "vuex";
import {useLoginUserStore} from "@/store/userStore";

const router = useRouter()
const loginUserStore = useLoginUserStore()


const form = reactive({
  userAccount: '',
  userPassword: '',
} as API.UserLoginRequest);

/**
 * 提交
 */
const handleSubmit = async () =>{
  const res = await userLoginUsingPost(form);
  if(res.data.code === 0) {
    await loginUserStore.fetchLoginUser();
    Message.success("登录成功");
    router.push({
      path:'/',
      replace: true,
    })
  }else {
    Message.error("登陆失败，" + res.data.message)
  }
}
</script>

<style scoped>
#userLoginPage {

}

</style>