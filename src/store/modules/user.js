const user = {
  state: {
    userInfo: '',
    isLogin: false,
    menus: [
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
            url: '/layout/userManger',
            icon: '',
            name: '用户管理'
          },
          {
            url: '/layout/log',
            icon: '',
            name: '系统日志'
          }
        ]
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
  }
}

export default user
