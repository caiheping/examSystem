<template>
  <div class="navMenu">
    <template v-for="navMenu in navMenus">
      <!-- 最后一级菜单 -->
      <el-menu-item
        @click="itemClick(navMenu.url)"
        v-if="!navMenu.list&&pagePermission(navMenu.url)"
        :key="navMenu.url"
        :data="navMenu"
        :index="navMenu.url"
      >
        <svg-icon v-if="navMenu.icon" :icon-class="navMenu.icon" class-name="icon"/>
        <!--        <i class="el-icon-location"></i>-->
        <span slot="title">{{navMenu.name}}</span>
      </el-menu-item>
      <!-- 此菜单下还有子菜单 -->
      <el-submenu
        v-if="navMenu.list"
        :key="navMenu.url"
        :data="navMenu"
        :index="navMenu.url"
      >
        <template slot="title">
          <svg-icon v-if="navMenu.icon" :icon-class="navMenu.icon" class-name="icon"/>
          <span> {{navMenu.name}}</span>
        </template>
        <!-- 递归 -->
        <NavMenu :navMenus="navMenu.list"></NavMenu>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  props: ['navMenus'],
  data () {
    return {}
  },
  methods: {
    itemClick (url) {
      if (url === 'getRecord') {
        this.$store.state.common.showItemMenu = true
      } else {
        this.$store.state.common.showItemMenu = false
      }
      if (url === 'review') {
        this.$store.state.common.showReviewItemMenu = true
      } else {
        this.$store.state.common.showReviewItemMenu = false
      }
    },
    pagePermission (permission = '') {
      // 这里要判断的权限没有设置的话，就等于不需要权限，直接返回 true
      if (!permission) return true
      const permissionList = this.$store.state.permission.permissionList
      return !!permissionList.includes(permission)
    }
  }
}
</script>

<style scoped lang="scss">
  .svg-icon{
    margin: 0 5px 0 0;
  }
</style>
