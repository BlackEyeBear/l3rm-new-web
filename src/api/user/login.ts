/*
 * @Author: panda
 * @Date: 2024-05-04 23:11:18
 * @LastEditTime: 2024-10-06 14:49:02
 * @LastEditors: panda
 * @FilePath: \l3rm-webf:\mywork\l3rm-new-web\src\api\user\login.ts
 * @Description: 登录接口
 */
import { defHttp } from "@/libs/request/index"

export const login = (params: LoginParams) => defHttp.post({ url: '/login', params })