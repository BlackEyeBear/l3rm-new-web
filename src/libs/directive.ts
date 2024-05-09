import { App, Directive } from 'vue'

// 自定义指令的类型
interface CustomDirectiveBinding {
  value: string; // 绑定值的类型
  arg: string; // 参数的类型
  modifiers: {
    [key: string]: boolean; // 修饰符的类型
  };
}

// el-select下拉滚动
const scrollSelect: Directive = {
  mounted(el: HTMLElement, binding) {
    // 获取element-ui定义好的scroll盒子
    const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
    SELECTWRAP_DOM?.addEventListener('scroll', function () {
      const CONDITION = el.scrollHeight - el.scrollTop <= el.clientHeight + 2
      if (CONDITION) {
        binding.value()
      }
    })
  }
}

const drag: Directive = {
  mounted(el: HTMLElement) {
    el.onmousedown = function (e) {
      const disx = e.clientX - el.offsetLeft;
      const disy = e.clientY - el.offsetTop;
      document.onmousemove = function (e) {
        e.preventDefault()
        const left = e.clientX - disx;
        const top = e.clientY - disy;
        el.style.left = left + 'px';
        el.style.top = top + 'px';
      }
      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
      }
    }
  }
}

// 是否有权限，无权限则将节点删除
const perm: Directive = {
  mounted(el: HTMLElement, binding) {
    const { value } = binding
    if (!value || (value instanceof Array && !value.length)) {
      throw new Error(`请设置操作权限标签值`)
    }
    // if (!store.getters['user/hasAnyPermission'](value)) {
    //   el.parentNode && el.parentNode.removeChild(el)
    // }
  }
}

// 是否有权限，无权限则将节点disable
const permDisable: Directive = {
  mounted(el: HTMLElement, binding) {
    const { value } = binding
    if (!value || (value instanceof Array && !value.length)) {
      throw new Error(`请设置操作权限标签值`)
    }
    // if (!store.getters['user/hasAnyPermission'](value)) {
    //   el.classList.add('is-disabled');
    //   el.style.pointerEvents = 'none';
    // }
  }
}

const directiveList = {
  'scroll-select': scrollSelect, 'perm-disable': permDisable, drag, perm
}

export function setupCustomDirective(app: App): void {
  for (const key in directiveList) {
    if (Object.prototype.hasOwnProperty.call(directiveList, key)) {
      const element = directiveList[key as keyof typeof directiveList];
      app.directive(key, element);
    }
  }
}

