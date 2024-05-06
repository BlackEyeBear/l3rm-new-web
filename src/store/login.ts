/*
 * @Author: panda
 * @Date: 2024-05-05 16:26:52
 * @LastEditTime: 2024-05-06 22:00:14
 * @LastEditors: panda
 * @FilePath: \l3rm-webf:\mywork\l3rm-new-web\src\store\login.ts
 * @Description: 登录数据处理
 */
import { defineStore } from 'pinia'
import router from "@/router/index"
interface UserInfo {
  id: number | null,
  username: string,
  nickname: string,
  avatar: string,
  departId: number | null,
  departName: string
  isMultiDepartAuth: boolean,
  hasDepartAuth: boolean,
  mobile: string
  roles: string[],
  permissions: string[],

}
interface State {
  userInfo: UserInfo
  token: string,
}

export const useStoreLogin = defineStore('login', {
  state: (): State => ({
    userInfo: {
      id: null,
      username: "",
      nickname: "",
      avatar: "",
      departId: null,
      departName: "",
      isMultiDepartAuth: false,
      hasDepartAuth: false,
      mobile: "",
      roles: [],
      permissions: [],
    },
    token: "",
  }),
  getters: {
    userInfo: (state) => state.userInfo,
    token: (state) => state.token,
    isMultiDepartAuth: (state) => state.userInfo.username === 'admin' || state.userInfo.isMultiDepartAuth,
    hasDepartAuth: (state) => state.userInfo.username === 'admin' || state.userInfo.hasDepartAuth,
    hasRole: (state) => (role: string) => state.userInfo.username === 'admin' || (state.userInfo.roles && state.userInfo.roles.includes(role)),
    hasAnyPermission: (state) => (permissions: string[]) => {
      if (state.userInfo.username === 'admin') {
        return true;
      } else if (!state.userInfo.permissions || !state.userInfo.permissions.length || (!permissions || (permissions instanceof Array && !permissions.length))) {
        return false;
      } else if (permissions instanceof Array) {
        return permissions.some(permission => state.userInfo.permissions.includes(permission));
      } else {
        return state.userInfo.permissions.includes(permissions);
      }
    },
  },
  actions: {
    setUserInfo(userInfo: UserInfo) {
      this.$state.userInfo = userInfo
    },
    setToken(token: string) {
      this.$state.token = token
    },
    loginOut() {
      this.$reset()
      sessionStorage.clear()
      router.push({ name: 'login', replace: true })
    },
    resetUserInfo() {
      this.$reset()
    },
  },
  persist: {
    key: "L3RM-STORE",
    storage: sessionStorage
  }
})
