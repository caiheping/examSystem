<template>
  <div class="header">
    <div class="logo">
      <h3>电力行业在线考试系统</h3>
    </div>
    <div class="right">
      <ul class="userinfo-wrapper">
        <li>
          <svg-icon icon-class="user" class-name="icon"/>
          {{username}}
        </li>
        <!--<li @click="updatePwd">-->
          <!--修改密码-->
        <!--</li>-->
      </ul>
      <div class="other">
        <div @click="reload" title="刷新">
          <svg-icon icon-class="refresh" class-name="icon"/>
        </div>
        <div @click="loginOut" title="退出">
          <svg-icon icon-class="exit" class-name="icon"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { logout } from '../../../api/login'
export default {
  inject: ['reload'],
  data () {
    return {
      username: JSON.parse(sessionStorage.getItem('userInfo')).username
    }
  },
  methods: {
    updatePwd () {
      console.log(999)
    },
    loginOut () {
      sessionStorage.setItem('isLogin', null)
      sessionStorage.setItem('userInfo', null)
      this.$router.replace('/login')
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../../../static/styles/mixin";
  .header{
    height: 60px;
    line-height: 60px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    color: #888D9F;
    .right{
      display: flex;
      flex-direction: row;
      .userinfo-wrapper{
        display: flex;
        line-height: 20px;
        align-items: center;
        margin-right: 20px;
        font-size: $base-font-size;
        li{
          display: flex;
          align-items: center;
          margin-left: 20px;
          cursor: pointer;
          &:hover{
            color: #49A3FA;
          }
          .svg-icon{
            margin: 0 3px;
            font-size: 1.3em;
          }
        }
      }
      .other{
        display: flex;
        line-height: 20px;
        align-items: center;
        position: relative;
        &:before{
          content: '';
          width: 2px;
          height: 60px;
          background: #F4F4F4;
          position: absolute;
          left: 0;
          top: 0;
        }
        div{
          display: flex;
          align-items: center;
          margin-left: 20px;
          cursor: pointer;
          .svg-icon{
            margin: 0 3px;
            font-size: 1.3em;
          }
        }
      }
    }
    .logo{
      display: flex;
      align-items: center;
      color: #333;
      font-size: 24px;
    }
  }
</style>
