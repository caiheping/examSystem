import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import store from '../store/index'
// import { pagePermission } from '../utils/permission'

Vue.use(VueRouter)

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const _import = require('./_import_' + process.env.NODE_ENV)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: _import('login/index'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/layout',
    name: 'layout',
    component: _import('mainLayout/index'),
    children: [
      {
        path: '',
        redirect: 'home'
      },
      {
        path: 'home',
        name: 'home',
        component: _import('home/index'),
        meta: {
          title: '首页'
        }
      },
      {
        path: 'student',
        name: 'student',
        component: _import('student/index'),
        meta: {
          title: '考生库'
        }
      },
      {
        path: 'worker',
        name: 'worker',
        component: _import('worker/index'),
        meta: {
          title: '工作人员库'
        }
      },
      {
        path: 'question',
        name: 'question',
        component: _import('question/index'),
        meta: {
          title: '试题库'
        }
      },
      {
        path: 'userManger',
        name: 'userManger',
        component: _import('userManger/index'),
        meta: {
          title: '用户管理'
        }
      },
      {
        path: 'log',
        name: 'log',
        component: _import('log/index'),
        meta: {
          title: '系统日志'
        }
      }
    ],
    meta: {
      title: 'layout'
    }
  },
  {
    path: '/exam',
    name: 'exam',
    component: _import('exam/index'),
    meta: {
      title: '在线考试'
    }
  },
  {
    path: '/404',
    component: _import('errorPage/404'),
    meta: {
      title: '404'
    }
  },
  {
    path: '/401',
    component: _import('errorPage/401'),
    meta: {
      title: '401'
    }
  },
  { path: '*', redirect: '/404' }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

// 路由导航钩子
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  document.title = to.meta.title
  // 先判断是否为登录，登录了才能获取到权限
  if (JSON.parse(sessionStorage.getItem('isLogin')) && JSON.parse(sessionStorage.getItem('userInfo'))) {
    if (JSON.parse(sessionStorage.getItem('userInfo')).segment === 'admin') { // admin
      store.state.user.menus = [
        {
          url: '/layout/home',
          icon: 'nav-home',
          name: '首页'
        },
        {
          url: '/layout/base',
          icon: 'nav-base',
          name: '基础库',
          list: [
            {
              url: '/layout/student',
              icon: '',
              name: '考生库'
            },
            {
              url: '/layout/worker',
              icon: '',
              name: '工作人员库'
            },
            {
              url: '/layout/question',
              icon: '',
              name: '试题库'
            }
          ]
        },
        {
          url: '/layout/system',
          icon: 'nav-system',
          name: '系统管理',
          list: [
            {
              url: '/layout/log',
              icon: '',
              name: '系统日志'
            }
          ]
        }
      ]
      // 按钮权限
      store.state.permission.btnsPermissionList = ['addStudent', 'addWorker', 'approvalQuestion', 'delQuestion']
      // 页面权限
      store.state.permission.permissionList = ['/layout/home', '/layout/student', '/layout/worker', '/layout/question', '/layout/userManger', '/layout/log']
    } else if (JSON.parse(sessionStorage.getItem('userInfo')).segment === 'electricer') { // 工作人员
      store.state.user.menus = [
        {
          url: '/layout/home',
          icon: 'nav-home',
          name: '首页'
        },
        {
          url: '/layout/base',
          icon: 'nav-base',
          name: '基础库',
          list: [
            {
              url: '/layout/student',
              icon: '',
              name: '考生库'
            },
            {
              url: '/layout/question',
              icon: '',
              name: '试题库'
            }
          ]
        }
      ]
      store.state.permission.btnsPermissionList = ['addQuestion', 'delQuestion']
      store.state.permission.permissionList = ['/layout/home', '/layout/student', '/layout/worker', '/layout/question']
    } else { // 考生
      store.state.user.menus = [
        {
          url: '/layout/home',
          icon: 'nav-home',
          name: '首页'
        },
        {
          url: '/layout/ksgl',
          icon: 'nav-exam',
          name: '考试管理',
          list: [
            {
              url: '/exam',
              icon: '',
              name: '在线考试'
            }
          ]
        }
      ]
      store.state.permission.permissionList = ['/layout/home', '/exam']
    }
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
