/*
 * @Author: panda
 * @Date: 2024-05-04 22:08:45
 * @LastEditTime: 2024-05-05 16:58:19
 * @LastEditors: panda
 * @FilePath: \l3rm-webf:\mywork\l3rm-new-web\src\router\public.ts
 * @Description: 公共路由
 */
import { RouteRecordRaw } from "vue-router"

import NotFind from "@/view/errorPage/404.vue"
import Dashboard from "@/view/dashboard/index.vue";
import Layout from "@/view/layout/index.vue";
import Login from "@/view/login/index.vue";

export const PublicRoute: Array<RouteRecordRaw> = [
  {
    path: '/', component: Layout,
    children: [
      { path: 'dashboard', component: Dashboard }
    ]
  },
  { path: '/login', component: Login },
  { path: '/404', name: '404', component: NotFind },
  { path: '/:catchAll(.*)', redirect: '404' }
]