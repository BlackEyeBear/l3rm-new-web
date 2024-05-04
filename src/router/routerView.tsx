/*
 * @Author: panda
 * @Date: 2024-05-04 21:51:57
 * @LastEditTime: 2024-05-04 22:24:33
 * @LastEditors: panda
 * @FilePath: \l3rm-webf:\mywork\l3rm-new-web\src\router\routerView.tsx
 * @Description: 项目页面入口
 */
import {defineComponent} from "vue"
import { RouterView } from "vue-router"
import { ElConfigProvider } from "element-plus"
import zhCn from 'element-plus/es/locale/lang/zh-cn'

export function RouterViewCom(name?: string) {
  return defineComponent({
    name: 'RouterView',
    setup(){
      return ()=> {
        return (
          <ElConfigProvider local={zhCn}>
            <RouterView />
          </ElConfigProvider>
        )
      }
    }
  })
}