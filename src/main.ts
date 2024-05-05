/*
 * @Author: panda
 * @Date: 2024-05-04 16:37:26
 * @LastEditTime: 2024-05-05 17:03:55
 * @LastEditors: panda
 * @FilePath: \l3rm-webf:\mywork\l3rm-new-web\src\main.ts
 * @Description: 项目文件入口
 */
import { createApp } from 'vue'
import { createPinia } from "pinia"
import { createPersistedState } from "pinia-plugin-persistedstate"
import { RouterViewCom } from "@/router/routerView"
import router from "@/router/index"
import './styles/index.scss'

createApp(RouterViewCom()).use(createPinia().use(createPersistedState({ key: 'L3RM-STORE', storage: 'sessionStorage' }))).use(router).mount('#app')
