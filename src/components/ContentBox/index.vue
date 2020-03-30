<template>
  <div class="contentLayout">
    <div class="main">
      <div class="box" v-loading="$store.state.common.loading">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .contentLayout{
    position: relative;
    height: calc(100vh - 115px);
    .main{
      height: calc(100vh - 130px);
      padding: 0 15px;
      box-sizing: border-box;
      margin-top: 5px;
      .box{
        box-shadow: 0 0 5px #F1F1F1;
        position: relative;
        height: calc(100vh - 130px);
        padding: 20px;
        box-sizing: border-box;
        background: #ffffff;
        border-radius: 10px;
      }
    }
  }
</style>
