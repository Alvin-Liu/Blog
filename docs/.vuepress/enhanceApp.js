import copy from './utils/copy'
import getGitalk from './utils/getGitalk'

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  router.beforeEach((to, from, next) => {
    // 对每个页面点击添加百度统计
    if(typeof _hmt!='undefined') {
      if (to.path) {
        _hmt.push(['_trackPageview', to.fullPath])
      }
    }

    // continue
    next()
  })

  // 复制的时候显示版权信息
  setTimeout(() => {
    try {
      // 对 document 的判断是防止编译的时候报错
      document && (() => {
        getGitalk.call(this, siteData)
        copy()
      })()
    } catch (e) {
      console.error(e.message)
    }
  },500)
}
