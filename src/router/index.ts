/*
 * @Author: panda
 * @Date: 2024-05-04 16:37:26
 * @LastEditTime: 2024-05-04 22:42:22
 * @LastEditors: panda
 * @FilePath: \l3rm-webf:\mywork\l3rm-new-web\src\router\index.ts
 * @Description: 
 */
import {createRouter, createWebHistory} from "vue-router"
import { PublicRoute } from "./public"
import { useTitle } from "@vueuse/core"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: PublicRoute
})

router.beforeEach((to, from, next)=>{
  useTitle(to.meta.title as string)
  next()
})

export default router