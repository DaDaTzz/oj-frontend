import {StoreOptions} from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";
import {getLoginUserUsingGet} from "@/api/userController";

export default {
  namespaced: true,
  state:() =>({
      loginUser:{
          userName:"未登录",
      },
  }),
  actions:{
      // 获取用户登录信息
      async getLoginUser({commit, state}, payload){
          const res = await getLoginUserUsingGet();
          if(res.data.code === 0){
              commit("updateUser", res.data.data);
          }else {
              commit("updateUser", {...state.loginUser, userRole:ACCESS_ENUM.NOT_LOGIN});
          }
      }
  },
  mutations:{
      updateUser(state, payload){
          state.loginUser = payload;
      }
  },
} as StoreOptions<any>
