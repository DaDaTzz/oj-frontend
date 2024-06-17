import {RouteRecordRaw} from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AdminView from "@/views/admin/AdminView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import AccessEnum from "@/access/accessEnum";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: '浏览题目',
        component: HomeView
    },
    {
        path: '/add/question',
        name: '添加题目',
        component: AddQuestionView,
        meta:{
            access: AccessEnum.ADMIN
        }
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

    {
        path: "/user",
        name: "用户",
        component: UserLayout,
        meta:{
            hideInMenu: true, // 菜单栏中隐藏
        },
        children: [
            {
                path: "/user/login",
                name: "用户登录",
                component: UserLoginView,
            },
            {
                path: "/user/register",
                name: "用户注册",
                component: UserRegisterView,
            },
        ]
    },
]