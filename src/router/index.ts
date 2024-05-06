/*
 * @Author: panda
 * @Date: 2024-05-04 16:37:26
 * @LastEditTime: 2024-05-05 16:23:29
 * @LastEditors: panda
 * @FilePath: \l3rm-webf:\mywork\l3rm-new-web\src\router\index.ts
 * @Description: 路由入口文件
 */
import { useTitle } from "@vueuse/core"
import {createRouter, createWebHistory} from "vue-router"
import { PublicRoute } from "./public"
import { useStoreLogin } from '@/store/login'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: PublicRoute
})

const whiteList = ['login']

router.beforeEach((to, from, next)=>{
  const store = useStoreLogin()
  console.log(store.token, '----')
  // if(token) {
    
  // }
  useTitle(to.meta.title as string)
  next()
})

export default router