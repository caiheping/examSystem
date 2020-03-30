<template>
  <div class="layout">
    <el-container>
      <!--  菜单栏开始  -->
      <el-aside style="width: 200px;">
        <el-scrollbar style="height: calc(100vh);">
          <el-menu
            :collapse-transition="false"
            ref="menu"
            :unique-opened="true"
            :default-active="'/layout/'+$route.name"
            :router="true"
            class="el-menu-vertical"
            mode="vertical"
            background-color="#304156"
            text-color="#b3c6ce"
            active-text-color="#3a83d3"
          >
            <NavMenu :navMenus="$store.state.user.menus"></NavMenu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <!--  菜单栏结束  -->
      <!--  主内容区域开始  -->
      <el-main>
        <div class="contentBox">
          <!--  头部开始  -->
          <el-header style="box-shadow: 0 0 5px #F1F1F1;">
            <v-header></v-header>
          </el-header>
          <!--  头部结束  -->
          <Breadcrumb></Breadcrumb>
          <div class="content">
            <transition name="router-fade" mode="out-in">
              <keep-alive v-if="$route.meta.keepAlive&&isRouterActive">
                <router-view></router-view>
              </keep-alive>
              <router-view v-if="!$route.meta.keepAlive&&isRouterActive"></router-view>
            </transition>
          </div>
        </div>
      </el-main>
      <!--  主内容区域结束  -->
    </el-container>
  </div>
</template>

<script>
import Header from './components/Header'
import NavMenu from './components/NavMenu'
import Breadcrumb from './components/Breadcrumb'

export default {
  provide () {
    return {
      reload: this.reload // 刷新
    }
  },
  data () {
    return {
      isRouterActive: true
    }
  },
  components: {
    'v-header': Header,
    Breadcrumb,
    NavMenu
  },
  methods: {
    reload () {
      this.isRouterActive = false
      this.$nextTick(() => {
        this.isRouterActive = true
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../static/styles/mixin";
  .layout {
    height: calc(100vh);
    min-width: 1152px;

    .warp {
      position: absolute;
      background: rgba(0, 0, 0, 0.4);
      height: calc(100vh);
      width: calc(100vw);
      z-index: 9998;
    }

    .el-header, .el-footer {
      color: $color;
      text-align: center;
      height: 50px;
      box-sizing: border-box;
      background: #ffffff;
    }

    .el-aside {
      transition: width 0.4s;
      background: #304156;
      color: $color;
      text-align: left;
      height: calc(100vh);
      box-sizing: border-box;
      position: relative;

      ul {
        background: #304156;

        span {
          color: rgb(179, 198, 206);
        }

        i {
          color: rgb(179, 198, 206);
          margin: 0 5px;
        }
      }
      .nav-btn-option{
        cursor: pointer;
        position: absolute;
        bottom: 0;
        left: 0;
        background: rgb(48, 65, 86);
        width: 100%;
        height: 50px;
        color: #ffffff;
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover{
          background: rgb(38, 52, 69);
        }
      }
      .top {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
        line-height: 60px;
        color: #ffffff;
        font-size: 24px;
        transition: all .5s;
        transition-delay: 0.5s;

        div {
          display: flex;
          align-items: center;
          width: 50px;
          height: 50px;
          font-size: 50px;
          padding: 0 5px 0 0;
          box-sizing: border-box;
        }

        span {
          white-space: nowrap;
        }
      }
    }

    .el-main {
      /*overflow: hidden;*/
      background-color: #F5F6F9;
      color: $color;
      height: calc(100vh);
      box-sizing: border-box;
      padding: 0;

      .contentBox {
        box-sizing: border-box;

        .breadcrumb {
          display: flex;
          font-size: 16px;
          align-items: center;
          transition: all 0.5s;

          .hamburger {
            display: inline-block;
            cursor: pointer;
            width: 20px;
            height: 20px;
            padding: 15px;
            margin-right: 5px;
            transform-origin: 50% 50%;

            &.active {
              transform: rotate(90deg);
            }
          }

          span {
            color: #97a8be;
          }
        }

        .right-menu {
          display: flex;
          align-items: center;

          .right-menu-item {
            display: inline-block;
            margin: 0 10px;
          }
        }

        .content {
          width: 100%;
          box-sizing: border-box;
          margin: 0 auto;
          height: calc(100vh - 110px);
          overflow: auto;
        }
      }
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      box-sizing: border-box;
    }
    .el-menu {
      border: none;
    }
  }
</style>
