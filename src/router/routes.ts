import {RouteRecordRaw} from "vue-router";
import HomeView from "@/views/HomeView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import AccessEnum from "@/access/accessEnum";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";
import QuestionsView from "@/views/question/QuestionsView.vue";
import ViewQuestionView from "@/views/question/ViewQuestionView.vue";

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: '主页',
        component: QuestionsView
    },
    {
        path: '/questions',
        name: '浏览题目',
        component: QuestionsView
    },
    {
        path: '/view/question/:id',
        name: '在线做题',
        component: ViewQuestionView,
        props: true,
        meta:{
            access: AccessEnum.USER,
            hideInMenu: true,
        }
    },
    {
        path: '/add/question',
        name: '添加题目',
        component: AddQuestionView,
        meta:{
            access: AccessEnum.USER
        }
    },
    {
        path: '/update/question',
        name: '更新题目',
        component: AddQuestionView,
        meta:{
            access: AccessEnum.USER,
            hideInMenu: true,
        }
    },
    {
        path: '/manage/question',
        name: '管理题目',
        component: ManageQuestionView,
        meta:{
            access: AccessEnum.USER
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