/*
 * @Author: panda
 * @Date: 2024-05-03 16:27:15
 * @LastEditors: panda
 * @LastEditTime: 2024-05-03 16:27:45
 * @FilePath: /l3rm-web/Users/admin/Desktop/8eghticar/l3rm-new-web/src/hooks/useMessage.tsx
 * @Description: 消息框
 */

import { ElMessage, ElMessageBox, ElMessageBoxOptions } from 'element-plus'

// 按需引入后弹窗样式需要单独引入，否则样式不生效
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'

// 一般的弹出框
function createAlertModal(content: string, title: string, obj?: Partial<ElMessageBoxOptions>) {
	const defOpt: ElMessageBoxOptions = {
		cancelButtonText: '确定'
	}
	return ElMessageBox.alert(content, title, Object.assign(defOpt, obj))
}

// 重要的、带交互的弹出框
function createConfirmModal(content: string, title: string, obj?: Partial<ElMessageBoxOptions>) {
	const defOpt: ElMessageBoxOptions = {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'success'
	}
	ElMessageBox.confirm(content, title, Object.assign(defOpt, obj))
}

export function useMessage() {
	return {
		createMessage: ElMessage,
		createAlertModal,
		createConfirmModal
	}
}
