/*
 * @Author: panda
 * @Date: 2024-05-04 22:08:45
 * @LastEditTime: 2024-05-05 09:53:21
 * @LastEditors: panda
 * @FilePath: \l3rm-webf:\mywork\l3rm-new-web\src\router\public.ts
 * @Description: 公共路由
 */
import { RouteRecordRaw } from "vue-router"

import NotFind from "@/views/ErrorPage/404.vue"
import Dashboard from "@/views/Dashboard/index.vue";

export const PublicRoute: Array<RouteRecordRaw> = [
  { path: '/', component: Dashboard },
  // { path: '/404', name: '404', component: NotFind },
  // { path: '/:catchAll(.*)', redirect: '404' }
]