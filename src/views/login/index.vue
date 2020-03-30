<template>
  <div class="login">
    <div class="bg">
      <vue-particles
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
    </div>
    <div class="main">
      <h3>Login</h3>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username" label-width="80px">
          <el-input v-model.number="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="80px">
          <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <div class="bottom">
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '../../api/login'

export default {
  data () {
    const checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
      callback()
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      callback()
    }
    return {
      loginForm: {
        password: '',
        username: ''
      },
      rules: {
        password: [{ required: true, validator: validatePass, trigger: 'blur' }],
        username: [{ required: true, validator: checkName, trigger: 'blur' }]
      }
    }
  },
  methods: {
    async submitForm (formName) {
      const _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          login(this.loginForm).then(res => {
            if (res.code === 0) {
              sessionStorage.setItem('userInfo', JSON.stringify(res.data))
              sessionStorage.setItem('isLogin', true)
              _this.$store.state.userInfo = res.data
              if (res.data.segment === 'admin') { // admin
                this.$store.state.user.menus = [
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
                this.$store.state.permission.btnsPermissionList = ['addStudent', 'addWorker', 'approvalQuestion', 'delQuestion']
                // 页面权限
                this.$store.state.permission.permissionList = ['/layout/home', '/layout/student', '/layout/worker', '/layout/question', '/layout/userManger', '/layout/log']
              } else if (res.data.segment === 'electricer') { // 工作人员
                this.$store.state.user.menus = [
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
                // 按钮权限
                this.$store.state.permission.btnsPermissionList = ['addQuestion', 'delQuestion']
                this.$store.state.permission.permissionList = ['/layout/home', '/layout/student', '/layout/worker', '/layout/question']
              } else { // 考生
                this.$store.state.user.menus = [
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
                this.$store.state.permission.permissionList = ['/layout/home', '/exam']
              }
              _this.$router.push('/layout/home')
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  mounted () {
    const _this = this
    document.onkeydown = function (e) {
      const key = window.event.keyCode
      if (key === 13) {
        _this.submitForm('loginForm')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .login{
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100vw);
    height: calc(100vh);
    background: url("./login-bg.jpg") no-repeat;
    background-size: 100%;
    & /deep/ .el-form-item__label{
      color: #ffffff;
    }
    .bg{
      position: fixed;
      height: calc(100vh);
      width: calc(100vw);
      div{
        width: 100%;
        height: 100%;
      }
    }
    .main{
      width: 450px;
      overflow: hidden;
      box-shadow: 0 0 10px #bebebe;
      box-sizing: border-box;
      padding: 10px 25px 10px 10px;
      border-radius: 4px;
      background: rgba(25, 100, 150, .7);
      z-index: 999;
      h3{
        height: 30px;
        line-height: 30px;
        font-size: 18px;
        margin-bottom: 10px;
        text-align: center;
        color: #fff;
      }
      .bottom{
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
        margin-top: 30px;
      }
    }
  }
</style>
