<template>
  <div class="worker">
    <content-box>
      <div class="form">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="姓名">
            <el-input v-model="searchForm.name" :clearable="true" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
        <div class="right">
          <el-button type="primary" @click="dialogObj.isShow = true" v-permission="'addWorker'">新增</el-button>
        </div>
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
            prop="username"
            label="姓名"
            align="center">
          </el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
            align="center">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            align="center">
          </el-table-column>
          <el-table-column
            v-permission="'addWorker'"
            label="操作"
            width="100"
            align="center">
            <template slot-scope="scope">
              <span class="btn edit" type="text" size="small">编辑</span>
              <span class="btn del" @click="handleClick(scope.row)" type="text" size="small">删除</span>
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

    <el-dialog
      :width="dialogObj.width"
      :title="dialogObj.title"
      :visible.sync="dialogObj.isShow"
      align="center">
      <el-form :model="dialogObj.form" :rules="dialogObj.rules" ref="form">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="dialogObj.form.username" autocomplete="off" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="dialogObj.form.age" autocomplete="off" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="dialogObj.form.sex" placeholder="请选性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogObj.isShow = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
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
      formLabelWidth: '70px',
      dialogObj: {
        width: '720px',
        title: '新增',
        isShow: false,
        rules: {
          username: [
            { required: true, validator: rules.str, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        form: {
          username: '',
          age: '',
          sex: '男'
        }
      },
      searchForm: {
        name: ''
      },
      tableData: [
        {
          username: 'test',
          age: '19',
          sex: '女',
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

    },
    handleClick (row) {
      console.log(row)
    },
    submitForm () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          alert('submit!');
          this.dialogObj.isShow = false
        } else {
          console.log('error submit!!');
          return false;
        }
      });
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
  .worker{
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
