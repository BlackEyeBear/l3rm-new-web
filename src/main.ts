/*
 * @Author: panda
 * @Date: 2024-05-04 16:37:26
 * @LastEditTime: 2024-05-04 22:29:27
 * @LastEditors: panda
 * @FilePath: \l3rm-webf:\mywork\l3rm-new-web\src\main.ts
 * @Description: 项目文件入口
 */
import { createApp } from 'vue'
import { createPinia } from "pinia"
import { RouterViewCom} from "@/router/routerView"
import './styles/index.scss'
import router from "@/router/index"

createApp(RouterViewCom()).use(router).use(createPinia).mount('#app')
