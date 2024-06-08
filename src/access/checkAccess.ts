import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 检查权限（判断当前登录用户是否具有某个权限）
 * @param loginUser 当前登录用户
 * @param needAccess 需要有的权限
 * @return boolean 有无权限
 */
const checkAccess = (loginUser:any, needAccess = ACCESS_ENUM.NOT_LOGIN) =>{
    // 获取当前登录具有的权限，
    const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;
    if(needAccess === ACCESS_ENUM.NOT_LOGIN){
        return true;
    }
    // 如果需要用户登录才能访问
    if(needAccess === ACCESS_ENUM.USER){
        // 如果用户没登录，表示无权限
        if(loginUserAccess === ACCESS_ENUM.NOT_LOGIN){
            return false;
        }
    }
    // 如果需要用户是管理员才能访问
    if(needAccess === ACCESS_ENUM.ADMIN){
        // 如果不是管理员，表示无权限
        if(loginUserAccess !== ACCESS_ENUM.ADMIN){
            return false;
        }
    }
    return true;
}

export default checkAccess;