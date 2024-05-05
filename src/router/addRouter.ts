/*
 * @Author: panda
 * @Date: 2024-05-05 16:13:10
 * @LastEditTime: 2024-05-05 16:13:40
 * @LastEditors: panda
 * @FilePath: \l3rm-webf:\mywork\l3rm-new-web\src\router\addRouter.ts
 * @Description: 动态添加路由方法
 */
import { RouteRecordRaw } from "vue-router"
import router from "./index"

export function addRoute(routes: RouteRecordRaw[]) {
  routes.forEach((route) => {
    const { path, name, meta, component } = route;
    console.log(route)
    if (!route.children) {
      router.addRoute({
        path,
        name,
        meta,
        component: () => import(`@/views/${component}`),
      });
    } else {
      addRoute(route.children)
    }
  })
}