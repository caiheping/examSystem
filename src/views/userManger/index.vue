<template>
  <div class="userManger">
    <content-box>
      <div class="form">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="用户名称">
            <el-input v-model="searchForm.name" :clearable="true" placeholder="请输入用户名称"></el-input>
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
            type="selection"
            width="55"
            align="center">
          </el-table-column>
          <el-table-column
            fixed
            prop="date"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="name"
            label="图片">
          </el-table-column>
          <el-table-column
            prop="province"
            label="性别">
          </el-table-column>
          <el-table-column
            prop="city"
            label="联系方式">
          </el-table-column>
          <el-table-column
            prop="address"
            label="角色">
          </el-table-column>
          <el-table-column
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small">编辑</el-button>
              <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
            </template>
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
export default {
  components: {
    ContentBox
  },
  data () {
    return {
      tableHeight: null,
      searchForm: {
        name: ''
      },
      tableData: []
    }
  },
  methods: {
    // 条数改变
    handleSizeChange (val) {

    },
    // 页面改变
    handleCurrentChange (val) {

    },
    handleClick (row) {
      console.log(row)
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
  .userManger{
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
