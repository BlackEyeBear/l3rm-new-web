import { defHttp } from "@/libs/request/index"

export const login = (params: LoginParams) => defHttp.post({ url: '/login', params })