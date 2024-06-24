<template>
    <a-row class="globalHeader"  align="center">
      <a-col flex="auto">
        <div>
          <a-menu mode="horizontal" :selected-keys="selectKeys" @menu-item-click="doMenuClick" >
            <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
              <div class="titleBar">
                <img class="logo" src="../assets/logo.png" />
                <div class="title">OJ</div>
              </div>
            </a-menu-item>
            <a-menu-item v-for="item in visibleRoutes" :key="item.path">
              {{item.name}}
            </a-menu-item>
          </a-menu>
        </div>
      </a-col>
      <a-col flex="100px">
        <div v-if="loginUserStore.loginUser?.userName">
          {{ loginUserStore.loginUser?.userName }}
          <a-button status="warning" @click="doLogout">注销</a-button>
        </div>
        <a-button type="primary" v-else href="/user/login">登录</a-button>
      </a-col>
    </a-row>

</template>

<script setup>
import {routes} from '../router/routes';
import {useRoute, useRouter} from "vue-router";
import {computed, ref} from "vue";
import checkAccess from "@/access/checkAccess";
import { useLoginUserStore } from "@/store/userStore";
import {userLogoutUsingPost} from "@/api/userController";
import message from "@arco-design/web-vue/es/message";


const router = useRouter()

const loginUserStore = useLoginUserStore()


// 当前选中的菜单项
const selectedKeys = ref(["/"]);
// 路由跳转时，自动更新选中的菜单项
router.afterEach((to) => {
  selectedKeys.value = [to.path]
})

// 展示在菜单栏的路由数组
const visibleRoutes = computed(() =>{
  return routes.filter((item) => {
    if (item.meta?.hideInMenu){
      return false;
    }
    // 根据权限过滤菜单栏
    if(!checkAccess(loginUserStore.loginUser, item.meta?.access)){
      return false;
    }
    return true;
  })
})


/**
 * 点击菜单跳转页面
 * @param Key
 */
const doMenuClick = (Key) =>{
  router.push({
    path: Key
  })
}

const route = useRoute()

const doLogout = async () =>{
  const res = await userLogoutUsingPost();
  if(res.data.code === 0){
    message.success('注销成功')
    loginUserStore.setLoginUser(null);
    await router.push({
      path:"/user/login"
    })
  }else {
    message.error('注销失败,' + res.data.message)
  }
}


</script>

<style scoped>
.titleBar{
  display: flex;
  align-items: center;
}


.logo{
  height: 48px;
}

.title{
  color: #444;
  margin-left: 16px;
}

</style>
