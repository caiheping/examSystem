<template>
  <div class="home">
    <content-box>
      <div v-if="userInfo.segment === 'electricee'">
        待开发
      </div>
      <ul class="content" v-else>
        <li v-if="userInfo.segment === 'admin'">
          <p>工作人员数</p>
          <countTo :startVal='startVal' :endVal='workers' :duration='2000'></countTo>
        </li>
        <li>
          <p>考生数</p>
          <countTo :startVal='startVal' :endVal='students' :duration='2000'></countTo>
        </li>
        <li>
          <p>考题数</p>
          <countTo :startVal='startVal' :endVal='questions' :duration='2000'></countTo>
        </li>
      </ul>
    </content-box>
  </div>
</template>

<script>
import ContentBox from '@/components/ContentBox'
import countTo from 'vue-count-to'
export default {
  components: {
    ContentBox,
    countTo
  },
  data () {
    return {
      userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
      startVal: 0,
      workers: 2298,
      students: 4139,
      questions: 418
    }
  },
  methods: {

  },
  mounted () {
    this.$nextTick(() => {
    })
  }
}
</script>

<style lang="scss" scoped>
  .home{
    .content{
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: 30px;
      li{
        height: 150px;
        width: 30%;
        padding: 15px;
        box-shadow: 0 0 10px #F1F1F1;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        p{
          color: #666;
          font-size: 24px;
          text-align: center;
          height: 30px;
          line-height: 30px;
        }
        span{
          display: block;
          text-align: center;
          font-size: 30px;
          color: #999;
        }
      }
    }
  }
</style>
