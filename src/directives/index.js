// 处理所有的自定义指令
export const imageerror = {
  inserted(dom, options) {
    // 处理刚开始就没图片的情况
    dom.src = dom.src || options.value
    dom.onerror = function() {
      dom.src = options.value
    }
  },
  // 处理刷新或删除的情况
  componentUpdated(dom, options) {
    dom.src = dom.src || options.value
  }
}
