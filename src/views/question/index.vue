<template>
  <div class="question">
    <content-box>
      <div class="addOption">
        <el-button type="primary" @click="dialogObj.isShow = true" v-permission="'addQuestion'">新增</el-button>
      </div>
      <el-tabs v-model="activeName" @tab-click="changeTab">
        <el-tab-pane label="已审批" name="first">
          <div class="form">
            <el-form :inline="true" :model="searchForm">
              <el-form-item label="试题名称">
                <el-input v-model="searchForm.questionContent" :clearable="true" @clear="find" placeholder="请输入试题名称"></el-input>
              </el-form-item>
              <el-form-item label="试题类型">
                <el-select v-model="searchForm.questionType" placeholder="请选类型" @change="find">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="单选题" value="ingle_selection"></el-option>
                  <el-option label="多选题" value="multiple_selection"></el-option>
                  <el-option label="判断题" value="judge"></el-option>
                  <!--<el-option label="填空题" value="4"></el-option>-->
                  <!--<el-option label="主观题" value="5"></el-option>-->
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="table" ref="tableBox1">
            <el-table
              :height="tableHeight1 || tableHeight2"
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
                prop="questionContent"
                label="试题名称"
                align="center">
              </el-table-column>
              <el-table-column
                prop="score"
                label="分值"
                align="center">
              </el-table-column>
              <el-table-column
                prop="questionType"
                label="类型"
                align="center">
              </el-table-column>
              <el-table-column
                prop="A"
                label="A"
                align="center">
              </el-table-column>
              <el-table-column
                prop="B"
                label="B"
                align="center">
              </el-table-column>
              <el-table-column
                prop="C"
                label="C"
                align="center">
              </el-table-column>
              <el-table-column
                prop="answer"
                label="答案"
                align="center">
              </el-table-column>
              <el-table-column
                label="操作"
                width="100"
                align="center">
                <template slot-scope="scope">
                  <!--<span v-permission="'editQuestion'" class="btn edit" type="text" size="small">编辑</span>-->
                  <span v-permission="'delQuestion'" class="btn del" @click="del(scope.row)" type="text" size="small">删除</span>
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
        </el-tab-pane>
        <el-tab-pane label="未审批" name="second">
          <div class="form">
            <el-form :inline="true" :model="searchForm">
              <el-form-item label="试题名称">
                <el-input v-model="searchForm.name" :clearable="true" placeholder="请输入试题名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="table" ref="tableBox2">
            <el-table
              :height="tableHeight1 || tableHeight2"
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
                prop="questionContent"
                label="试题名称"
                align="center">
              </el-table-column>
              <el-table-column
                prop="score"
                label="分值"
                align="center">
              </el-table-column>
              <el-table-column
                prop="questionType"
                label="类型"
                align="center">
              </el-table-column>
              <el-table-column
                prop="A"
                label="A"
                align="center">
              </el-table-column>
              <el-table-column
                prop="B"
                label="B"
                align="center">
              </el-table-column>
              <el-table-column
                prop="C"
                label="C"
                align="center">
              </el-table-column>
              <el-table-column
                prop="answer"
                label="答案"
                align="center">
              </el-table-column>
              <el-table-column
                label="操作"
                width="100"
                align="center">
                <template slot-scope="scope">
                  <!--<span v-permission="'editQuestion'" class="btn edit" type="text" size="small">编辑</span>-->
                  <span v-permission="'approvalQuestion'" class="btn default" type="text" size="small">审批</span>
                  <span v-permission="'delQuestion'" class="btn del" @click="del(scope.row)" type="text" size="small">删除</span>
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
        </el-tab-pane>
      </el-tabs>
    </content-box>

    <el-dialog
      :width="dialogObj.width"
      :title="dialogObj.title"
      :visible.sync="dialogObj.isShow"
      align="center">
      <el-form :model="dialogObj.form" :rules="dialogObj.rules" ref="form">
        <el-form-item label="试题名称" :label-width="formLabelWidth" prop="questionContent">
          <el-input v-model="dialogObj.form.questionContent" autocomplete="off" placeholder="请输入试题名称"></el-input>
        </el-form-item>
        <el-form-item label="分值" :label-width="formLabelWidth" prop="score">
          <el-input v-model="dialogObj.form.score" autocomplete="off" placeholder="请输入分值"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth" prop="questionType">
          <el-select v-model="dialogObj.form.questionType" placeholder="请选类型" @change="handleChangeType">
            <el-option label="单选题" value="ingle_selection"></el-option>
            <el-option label="多选题" value="multiple_selection"></el-option>
            <el-option label="判断题" value="judge"></el-option>
            <!--<el-option label="填空题" value="4"></el-option>-->
            <!--<el-option label="主观题" value="5"></el-option>-->
          </el-select>
        </el-form-item>
        <!-- 单选题 多选题 -->
        <el-form-item label="A" :label-width="formLabelWidth" prop="A" v-show="this.dialogObj.form.questionType === 'ingle_selection' || this.dialogObj.form.questionType === 'multiple_selection'">
          <el-input v-model="dialogObj.form.A" autocomplete="off" placeholder="请输入A的内容"></el-input>
        </el-form-item>
        <el-form-item label="B" :label-width="formLabelWidth" prop="B" v-show="this.dialogObj.form.questionType === 'ingle_selection' || this.dialogObj.form.questionType === 'multiple_selection'">
          <el-input v-model="dialogObj.form.B" autocomplete="off" placeholder="请输入B的内容"></el-input>
        </el-form-item>
        <el-form-item label="C" :label-width="formLabelWidth" prop="C" v-show="this.dialogObj.form.questionType === 'ingle_selection' || this.dialogObj.form.questionType === 'multiple_selection'">
          <el-input v-model="dialogObj.form.C" autocomplete="off" placeholder="请输入C的内容"></el-input>
        </el-form-item>

        <el-form-item label="答案" :label-width="formLabelWidth" prop="answer">
          <el-input v-model="dialogObj.form.answer" autocomplete="off" placeholder="请输入答案"></el-input>
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
import { item_list } from '../../api/question'
export default {
  components: {
    ContentBox
  },
  data () {
    return {
      activeName: 'first',
      tableHeight1: null,
      tableHeight2: null,
      formLabelWidth: '100px',
      dialogObj: {
        width: '720px',
        title: '新增',
        isShow: false,
        rules: {
          questionContent: [
            { required: true, validator: rules.str, message: '请输入姓名', trigger: 'blur' }
          ],
          score: [
            { required: true, validator: rules.positiveNumber, message: '请输入分值', trigger: 'blur' }
          ],
          questionType: [
            { required: true, validator: rules.str, message: '请选择类型', trigger: 'blur' }
          ],
          A: [
            { required: true, validator: rules.str, message: '请输入A的内容', trigger: 'blur' }
          ],
          B: [
            { required: true, validator: rules.str, message: '请输入B的内容', trigger: 'blur' }
          ],
          C: [
            { required: true, validator: rules.str, message: '请输入C的内容', trigger: 'blur' }
          ],
          answer: [
            { required: true, validator: rules.str, message: '请输入答案', trigger: 'blur' }
          ],
        },
        form: {
          questionContent: '',
          score: '',
          questionType: 'ingle_selection',
          A: '',
          B: '',
          C: '',
          answer: ''
        }
      },
      searchForm: {
        questionContent: '',
        questionType: ''
      },
      query: {
        page: 1,
        limit: 10,
        questionContent: '',
        questionType: ''

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
    changeTab () {
      console.log(this.activeName)
    },
    del (row) {
      console.log(row)
      item_list({
        id_list: row.id
      }, 'DELETE').then(res => {
        if (res.code === 0) {
          console.log(res)
          this.getData()
        }
      })
    },
    handleChangeType () {
      if (this.dialogObj.form.questionType === 'ingle_selection' || this.dialogObj.form.questionType === 'multiple_selection') {
        this.dialogObj.rules = {
          questionContent: [
            { required: true, validator: rules.str, message: '请输入姓名', trigger: 'blur' }
          ],
          score: [
            { required: true, validator: rules.number, message: '请输入分值', trigger: 'blur' }
          ],
          questionType: [
            { required: true, validator: rules.str, message: '请选择类型', trigger: 'blur' }
          ],
          A: [
            { required: true, validator: rules.str, message: '请输入A的内容', trigger: 'blur' }
          ],
          B: [
            { required: true, validator: rules.str, message: '请输入B的内容', trigger: 'blur' }
          ],
          C: [
            { required: true, validator: rules.str, message: '请输入C的内容', trigger: 'blur' }
          ],
          answer: [
            { required: true, validator: rules.str, message: '请输入答案', trigger: 'blur' }
          ],
        }
      } else {
        this.dialogObj.rules = {
          questionContent: [
            { required: true, validator: rules.str, message: '请输入姓名', trigger: 'blur' }
          ],
          score: [
            { required: true, validator: rules.positiveNumber, message: '请输入分值', trigger: 'blur' }
          ],
          questionType: [
            { required: true, validator: rules.str, message: '请选择类型', trigger: 'blur' }
          ],
          answer: [
            { required: true, validator: rules.str, message: '请输入答案', trigger: 'blur' }
          ],
        }
      }
    },
    submitForm () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          console.log(this.dialogObj.form)
          let query = {
            question_content: this.dialogObj.form.questionContent,
            answer: this.dialogObj.form.answer,
            a: this.dialogObj.form.A,
            b: this.dialogObj.form.B,
            c: this.dialogObj.form.C,
          }
          item_list(query, 'POST').then(res => {
            if (res.code === 0) {
              this.$httpResponse('success', '新增成功')
            }
          })
          this.dialogObj.isShow = false
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    find () {
      this.getData()
    },
    getData () {
      this.query.question_content = this.searchForm.questionContent ? this.searchForm.questionContent : null
      this.query.question_type = this.searchForm.questionType ? this.searchForm.questionType : null
      item_list(this.query, 'GET').then(res => {
        if (res.code === 0) {
          console.log(res)
          res.data.forEach(item => {
            item.score = '1'
          })
          this.tableData = res.data
        }
      })
    },
  },
  mounted () {
    this.$nextTick(() => {
      const _this = this
      this.tableHeight1 = this.$refs.tableBox1.offsetHeight
      this.tableHeight2 = this.$refs.tableBox2.offsetHeight
      this.getData()
      window.onresize = function () {
        _this.tableHeight1 = _this.$refs.tableBox1.offsetHeight
        _this.tableHeight2 = _this.$refs.tableBox2.offsetHeight
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .question{
    position: relative;
    .addOption{
      position: absolute;
      right: 20px;
      top: 20px;
      z-index: 999;
    }
    .table{
      height: calc(100vh - 305px);
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
