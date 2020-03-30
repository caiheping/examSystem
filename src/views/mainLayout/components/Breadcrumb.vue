<template>
  <div class="top">
    <div class="breadcrumb">
<!--      <svg t="1492500959545" @click="breadcrumbChange" class="hamburger" :class="isCollapse?'active':''" style=""-->
<!--           viewBox="0 0 1024 1024"-->
<!--           version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1691" xmlns:xlink="http://www.w3.org/1999/xlink"-->
<!--           width="64" height="64">-->
<!--        <path-->
<!--          d="M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z"-->
<!--          p-id="1692"></path>-->
<!--        <path-->
<!--          d="M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z"-->
<!--          p-id="1693"></path>-->
<!--        <path-->
<!--          d="M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z"-->
<!--          p-id="1694"></path>-->
<!--      </svg>-->
      <el-breadcrumb separator="/">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item v-for="(item,index) in bread" :key="item.path"
          >
            <span v-if="item.redirect==='noredirect'||index===levelList.length-1"
            class="no-redirect">{{item.name}}</span>
            <router-link v-else :to="item.redirect||item.path">{{item.name}}</router-link>
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      levelList: null,
      bread: []
    }
  },
  methods: {
    recursion (arr, pre = []) {
      arr.forEach(item => {
        if (item.list && item.list.length) {
          this.recursion(item.list, [item])
        } else {
          if (item.url.split('/layout/')[item.url.split('/layout/').length - 1] === this.levelList[this.levelList.length - 1].name) {
            this.bread = [...pre, item]
          }
        }
      })
    },
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first) {
        matched = [].concat(matched)
      }
      this.levelList = matched
      this.recursion(this.$store.state.user.menus)
      this.bread.forEach(item => {
        item.redirect = 'noredirect'
        item.path = item.url
      })
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  created () {
    this.getBreadcrumb()
  }
}
</script>

<style scoped lang="scss">
  @import "../../../static/styles/mixin";
  .top {
    height: 45px;
    margin-top: 5px;
    box-sizing: border-box;
    background: #F5F6F9;
    display: flex;
    justify-content: space-between;

    .breadcrumb {
      display: flex;
      font-size: 16px;
      align-items: center;
      transition: all 0.5s;
      margin-left: 15px;

      .hamburger {
        display: inline-block;
        cursor: pointer;
        width: 20px;
        height: 20px;
        padding: 15px;
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
      margin: 0 30px 0 0;
      color: rgba(50,147,231,1);
    }
  }
</style>
