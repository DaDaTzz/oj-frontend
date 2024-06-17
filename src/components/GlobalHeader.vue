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
        <div>
          {{ loginUserStore.loginUser.userName ?? "匿名用户"}}
        </div>
      </a-col>
    </a-row>

</template>

<script setup>
import {routes} from '../router/routes';
import {useRouter} from "vue-router";
import {computed, ref} from "vue";
import checkAccess from "@/access/checkAccess";
import { useLoginUserStore } from "@/store/userStore";


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
