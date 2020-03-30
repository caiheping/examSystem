import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ElementUI from './utils/elementConfig'
import VueParticles from 'vue-particles'

import { httpResponse } from './utils/httpResponse'
import { btnPermission, includePermission } from './utils/permission'

import 'nprogress/nprogress.css' // progress bar style
import 'element-ui/lib/theme-chalk/index.css'
// import './static/styles/element-variables.scss' // 自定义主题色
import './static/styles/index.scss'

import '@/static/icons'

import i18n from '@/lang' // 国际化

Vue.use(ElementUI)

Vue.prototype.$ELEMENT = { size: 'small' } // 按需引入：设置element组件的大小

Vue.use(VueParticles)

Vue.config.productionTip = false
Vue.prototype.$httpResponse = httpResponse

Vue.prototype.checkBtnPermission = btnPermission // 检查方法权限
Vue.prototype.includePermission = includePermission // 检查方法列表权限

// 按钮权限
Vue.directive('permission', {
  inserted: function (el, bind) {
    const value = bind.value
    const permissionArr = store.state.permission.btnsPermissionList
    if (!permissionArr.includes(value)) {
      el.parentNode.removeChild(el)
    }
  }
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
