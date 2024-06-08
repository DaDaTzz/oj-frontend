import {RouteRecordRaw} from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import AdminView from "@/views/AdminView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import AccessEnum from "@/access/accessEnum";

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: '浏览题目',
        component: HomeView
    },
    {
        path: '/about',
        name: '关于我的',
        component: AboutView
    },
    {
        path: '/noAuth',
        name: '无权限',
        component: NoAuthView,
        meta:{
            hideInMenu: true,
        }
    },
    {
        path: '/admin',
        name: '管理页',
        component: AdminView,
        meta:{
            access: AccessEnum.ADMIN
        }
    },
]