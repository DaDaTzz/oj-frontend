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
          {{store.state.user?.loginUser?.userName ?? "未登录"}}
        </div>
      </a-col>
    </a-row>

</template>

<script setup>
import {routes} from '../router/routes';
import {useRouter} from "vue-router";
import {computed, ref} from "vue";
import {useStore} from "vuex";
import checkAccess from "@/access/checkAccess";

const router = useRouter()
const store = useStore();

// 获取当前登录用户
const loginUser = store.state.user.loginUser;

// 展示在菜单的路由数组
const visibleRoutes = computed(() =>{
  return routes.filter((item, index) =>{
    // 隐藏在菜单的路由
    if(item.meta?.hideInMenu){
      return false;
    }
    // 根据权限过滤菜单
    if(!checkAccess(loginUser, item.meta?.access)){
      return false;
    }
    return true;
  })
})


// 默认主页
const selectKeys = ref(['/'])

// 路由跳转时，更新选中的菜单项
router.afterEach((to, from, next) => {
  selectKeys.value = [to.path];
})


const doMenuClick = (key) =>{
  router.push({
    path:key,
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
