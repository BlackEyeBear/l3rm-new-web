/*
 * @Author: panda
 * @Date: 2024-05-04 16:37:26
 * @LastEditTime: 2024-05-09 22:13:09
 * @LastEditors: panda
 * @FilePath: \l3rm-webf:\mywork\l3rm-new-web\src\main.ts
 * @Description: 项目文件入口
 */
import { createApp } from 'vue'
import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import { RouterViewCom } from "@/router/routerView"
import router from "@/router/index"
import './styles/index.scss'

import { setupCustomDirective } from "@/libs/directive"
const app = createApp(RouterViewCom())
setupCustomDirective(app)
app.use(createPinia().use(piniaPluginPersistedstate)).use(router).mount('#app')
