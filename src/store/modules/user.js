import { getToken, setToken, removeToken, setTimeStap } from "@/utils/auth";
import { login, getUserInfo, getUserDetailById } from "@/api/user";
const state = {
  // 设置token为共享状态
  token: getToken(),
  userInfo: {}
};
const mutations = {
  // 保存全局状态
  setToken(state, token) {
    state.token = token;
    // 持久性
    setToken(token);
  },
  // 删除token，退出登录
  removeToken(state) {
    state.token = null;
    removeToken();
  },
  // 封装获取用户信息
  setUserInfo(state, userInfo) {
    state.userInfo = { ...userInfo };
  },
  // 删除用户信息
  removeUserInfo(state) {
    state.userInfo = {};
  }
};
const actions = {
  async login(context, data) {
    const res = await login(data);
    context.commit("setToken", res);
  },
  async getUserInfo(context) {
    const result = await getUserInfo();
    const userInfo = await getUserDetailById(result.userId);
    context.commit("setUserInfo", { ...result, ...userInfo });
    return result;
  },
  logout(context) {
    context.commit("removeToken");
    context.commit("removeUserInfo");
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
