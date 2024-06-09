import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

router.beforeEach(async (to, from, next) => {
    // 获取当前登录用户
    const loginUser = store.state.user.loginUser;
    // 如果之前没登录过，自动登录
    if(!loginUser || !loginUser.userRole){
        await store.dispatch('user/getLoginUser');
    }
    const needAccess = to.meta?.access as string ?? ACCESS_ENUM.NOT_LOGIN;
    // 要跳转的页面不需要登录
    if(needAccess !== ACCESS_ENUM.NOT_LOGIN){
        // 如果没登录，跳转到登陆页面
        if(!loginUser || !loginUser.userRole || loginUser.userRole === ACCESS_ENUM.NOT_LOGIN){
            next(`/user/login?redirect=${to.fullPath}`);
        }
        if(!checkAccess(loginUser.userRole, needAccess)){
            next(`/noAuth`);
            return;
        }
    }
    next();
})