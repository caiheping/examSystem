<template>
  <div class="exam">
    <div class="content">
      <div class="left">
        <h3>
          <span>单选题</span>
          <span class="total">共60题，共计60分</span>
        </h3>
        <ul>
          <li v-for="item in 60" :key="item">
            <span class="index">{{item}}</span>
            <h4>(1分)在生产管理信息系统中，下列操作步骤能正确将工单推进流程的是（ ）</h4>
            <div class="item-content">
              <el-radio-group v-model="radio">
                <el-radio :label="'A'">A. 在工具栏中点击“workflow”标签</el-radio>
                <el-radio :label="'B'">B. 在缺陷单界面中点击“推进流程”按钮</el-radio>
                <el-radio :label="'C'">C. 在缺陷单界面中点击“提交”按钮</el-radio>
              </el-radio-group>
            </div>
          </li>
        </ul>
        <h3>
          <span>多选题</span>
          <span class="total">共40题，共计40分</span>
        </h3>
        <ul>
          <li v-for="item in 40" :key="item">
            <span class="index">{{item}}</span>
            <h4>(1分)在生产管理信息系统中，下列操作步骤能正确将工单推进流程的是（ ）</h4>
            <div class="item-content">
              <el-checkbox-group v-model="checkList">
                <el-checkbox :label="'A'">A. 在工具栏中点击“workflow”标签</el-checkbox>
                <el-checkbox :label="'B'">B. 在缺陷单界面中点击“推进流程”按钮</el-checkbox>
                <el-checkbox :label="'C'">C. 在缺陷单界面中点击“提交”按钮</el-checkbox>
              </el-checkbox-group>
            </div>
          </li>
        </ul>
        <div class="submit">
          <span>提交</span>
        </div>
      </div>
      <div class="right" :style="{
        transform: `translateY(${right_top}px)`
      }">
        <div class="log">
          <div class="top">
            <span>答题卡</span>
            <span>{{time}}</span>
          </div>
          <div class="log-content">
            <div class="radio">
              <div class="radio-top">
                <span>单选题</span>
                <span>共60题</span>
              </div>
              <ul class="radio-main">
                <li v-for="item in 60" :key="item">
                  <span>{{item}}</span>
                </li>
              </ul>
            </div>
            <div class="check-box">
              <div class="check-box-top">
                <span>多选题</span>
                <span>共40题</span>
              </div>
              <ul class="check-box-main">
                <li v-for="item in 40" :key="item">
                  <span>{{item}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      right_top: '0',
      radio: 'A',
      checkList: ['A','B'],
      time: '00:00:00',
      allTime: 4623,
      interval: null,
      timer: null,
      scroll_before: 0,
      scroll_after: 0
    }
  },
  methods: {
    // 格式化时间
    timeFormat (param) {
      return param < 10 ? '0' + param : param
    },
    // 倒计时
    countDown () {
      this.interval = setInterval(() => {
        const hour = this.timeFormat(Math.floor(this.allTime / 60 / 60)) // 小时
        const minute = this.timeFormat(Math.floor((this.allTime / 60) - (hour * 60))) // 分钟
        const second = this.timeFormat(this.allTime % 60) // 秒

        this.time = hour + ':' + minute + ':' + second
        this.allTime--
      }, 1000)
    },
    // 防抖
    debounce(func, wait) {
      let timer;
      return function() {
        let args = arguments; // arguments中存着e

        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args)
        }, wait)
      }
    },
    // 滚动结束
    isScrollEnd() {
      this.scroll_after = document.documentElement.scrollTop || document.body.scrollTop;
      if(this.scroll_after == this.scroll_before){
        this.right_top = window.pageYOffset
        console.log('滚动结束了')
      }
    }
  },
  destroyed () {
    clearInterval(this.interval)
  },
  mounted () {
    let _this = this
    this.$nextTick(() => {
      this.countDown()
      window.addEventListener("scroll",_this.debounce(()=>{
        clearTimeout(_this.timer);
        _this.timer = setTimeout(_this.isScrollEnd, 300);
        _this.scroll_before = document.documentElement.scrollTop || document.body.scrollTop
      },20))
    })
  }
}
</script>

<style lang="scss">
  .exam{
    .el-radio{
      display: block;
      margin: 10px 0;
    }
    .el-checkbox{
      display: block;
      margin: 10px 0;
    }
  }
</style>

<style lang="scss" scoped>
  .exam{
    padding: 20px 0 50px;
    .content{
      display: flex;
      width: 1200px;
      margin: 0 auto;
      justify-content: space-between;
      position: relative;
      .left{
        width: 900px;
        border: 1px solid #e3e3e3;
        h3{
          padding: 0 30px;
          height: 50px;
          line-height: 50px;
          background: #F1F1F1;
          color: #666666;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          .total{
            height: 40px;
            line-height: 40px;
            border-radius: 20px;
            padding: 0 20px;
            color: #ffffff;
            box-sizing: border-box;
            margin-left: 20px;
            background: #389fc3;
            font-weight: normal;
            font-size: 14px;

          }
        }
        ul{
          background: #efefef;
          li{
            padding: 20px 60px;
            background: #ffffff;
            margin-top: 5px;
            position: relative;
            &:first-child{
              margin-top: 0;
            }
            .index{
              position: absolute;
              left: 10px;
              top: 20px;
              display: block;
              background: #5d9cec;
              width: 30px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              border-radius: 50%;
              color: #fff;
              box-shadow: 0 0 10px #ccc;
            }
            h4{
              height: 30px;
              line-height: 30px;
              border-bottom: 1px solid #e3e3e3;
              font-weight: normal;
            }
            .item-content{
              padding: 20px 0;
            }
          }
        }
        .submit{
          height: 50px;
          position: fixed;
          bottom: 0;
          display: flex;
          margin: 0 auto;
          width: 900px;
          background: #F1F1F1;
          justify-content: flex-end;
          border-left: 1px solid #e3e3e3;
          border-right: 1px solid #e3e3e3;
          box-sizing: border-box;
          span{
            display: block;
            background: #389fc3;
            width: 100px;
            height: 50px;
            line-height: 50px;
            cursor: pointer;
            text-align: center;
            color: #fff;
            font-size: 20px;
          }
        }
      }
      .right{
        width: 280px;
        position: absolute;
        transition: all 1s;
        right: 0;
        transform: translateY(0);
        .log{
          border: 1px solid #e3e3e3;
          .top{
            display: flex;
            span{
              flex: 1;
              display: block;
              height: 50px;
              line-height: 50px;
              text-align: center;
              color: #fff;
              font-size: 16px;
              font-weight: bold;
              &:first-child{
                background: #389fc3;
              }
              &:last-child{
                background: #e3e3e3;
                color: red;
              }
            }
          }
          .log-content{
            .radio{
              padding: 10px;
              border-bottom: 1px solid #e3e3e3;
              .radio-top{
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #e3e3e3;
                span{
                  flex: 1;
                  text-align: center;
                  height: 40px;
                  line-height: 40px;
                }
              }
              .radio-main{
                overflow: hidden;
                display: flex;
                flex-wrap: wrap;
                padding: 5px 0;
                li{
                  width: 14.285%;
                  color: #666;
                  box-sizing: border-box;
                  padding: 3px;
                  span{
                    display: block;
                    width: 100%;
                    border: 1px solid #e3e3e3;
                    text-align: center;
                    height: 25px;
                    line-height: 25px;
                  }
                }
              }
            }
            .check-box{
              padding: 10px;
              .check-box-top{
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #e3e3e3;
                span{
                  flex: 1;
                  text-align: center;
                  height: 40px;
                  line-height: 40px;
                }
              }
              .check-box-main{
                overflow: hidden;
                display: flex;
                flex-wrap: wrap;
                padding: 5px 0;
                li{
                  width: 14.285%;
                  color: #666;
                  box-sizing: border-box;
                  padding: 3px;
                  span{
                    display: block;
                    width: 100%;
                    border: 1px solid #e3e3e3;
                    text-align: center;
                    height: 25px;
                    line-height: 25px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
