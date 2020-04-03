<template>
  <div class="log">
    <content-box>
      <div class="form">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="用户">
            <el-input v-model="searchForm.username" :clearable="true" placeholder="请输入用户"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table" ref="tableBox">
        <el-table
          :height="tableHeight"
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            fixed
            prop="username"
            label="用户"
            align="center">
          </el-table-column>
          <el-table-column
            prop="date"
            label="日期"
            align="center">
          </el-table-column>
          <el-table-column
            prop="option"
            label="操作"
            align="center">
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="56">
        </el-pagination>
      </div>
    </content-box>
  </div>
</template>

<script>
import ContentBox from '@/components/ContentBox'
import { rules } from '../../utils/validate'
export default {
  components: {
    ContentBox
  },
  data () {
    return {
      tableHeight: null,
      searchForm: {
        username: ''
      },
      tableData: [
        {
          username: 'test',
          date: '2020-01-09',
          option: '删除xxx用户'
        }
      ]
    }
  },
  methods: {
    // 条数改变
    handleSizeChange (val) {

    },
    // 页面改变
    handleCurrentChange (val) {

    }
  },
  mounted () {
    this.$nextTick(() => {
      const _this = this
      this.tableHeight = this.$refs.tableBox.offsetHeight
      window.onresize = function () {
        _this.tableHeight = _this.$refs.tableBox.offsetHeight
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .log{
    .form {
      display: flex;
      justify-content: space-between;
    }
    .table{
      height: calc(100vh - 255px);
    }
    .page{
      z-index: 999;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 50px;
      box-sizing: border-box;
      width: 100%;
      background: #ffffff;
    }
  }
</style>
