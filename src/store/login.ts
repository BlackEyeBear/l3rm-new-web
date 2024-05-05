import { defineStore } from 'pinia'
import { login } from '../api/user/login';

interface State {
  userInfo: {
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
  },
  token: string,
}

export const useStore = defineStore('login', {
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
    setUserInfo() { },
    setToken() { },
    LoginOut() { },
    ResetUserInfo() { },
    async LoginIn(form: { password: string, username: string }) {
      try {
        console.log(form, 'form')
        const res = await login(form)
        console.log(res.userInfo, 'sadasdasdas')
        this.$state.userInfo = res.userInfo
        this.$state.token = res.token
      } catch (error) {
        console.error(error)
      }
    },
  },
  persist: true
})
