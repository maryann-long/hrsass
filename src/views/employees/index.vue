<template>
  <div>
    <!-- 全局插件 -->
    <page-tools :show-before="true">
      <span slot="before">共{{ page.total }}条记录</span>
      <template slot="after">
        <el-button size="small" type="warning" @click="$router.push('/import?type=user')">导入</el-button>
        <el-button size="small" type="danger" @click="exportData">导出</el-button>
        <el-button size="small" type="primary" @click="showDialog = true">新增员工</el-button>
      </template>
    </page-tools>
    <!-- 表格 -->
    <el-card v-loading="loading">
      <el-table border :data="list">
        <el-table-column label="序号" sortable="" type="index" />
        <el-table-column label="姓名" sortable="" prop="username" />
        <el-table-column>
          <template slot-scope="{ row }">
            <img v-imageerror="require('@/assets/common/head.jpg')" :src="row.staffPhoto" style="border-radius: 50%; width: 100px; height: 100px; padding: 10px" alt="" @click="showQrCode(row.staffPhoto)">
          </template>
        </el-table-column>
        <el-table-column label="工号" sortable="" prop="workNumber" />
        <el-table-column label="聘用形式" sortable="" prop="formOfEmployment" :formatter="formatEmployment" />
        <el-table-column label="部门" sortable="" prop="departmentName" />
        <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
          <template slot-scope="obj">
            {{ obj.row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="账户状态" sortable="" prop="enableState">
          <template v-slot="{row}">
            <el-switch :value="row.enableState === 1" />
          </template>
        </el-table-column>
        <el-table-column label="操作" sortable="" fixed="right" width="280">
          <template slot-scope="{ row }">
            <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small" @click="editRole(row.id)">角色</el-button>
            <el-button type="text" size="small" @click="delEmployee(row.id)">删除</el-button>
          </template></el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="center" align="middle" style="height: 60px">
        <el-pagination layout="prev, pager, next" :current-page="page.page" :page-size="page.size" :total="page.total" @current-change="CurrentChange" />
      </el-row>
    </el-card>
    <add-employee :show-dialog.sync="showDialog" />
    <el-dialog title="二维码" :visible.sync="showCodeDialog" @close="imgUrl=''">
      <el-row type="flex" justify="center">
        <canvas ref="myCanvas" />
      </el-row>
    </el-dialog>
    <assign-role ref="assignRole" :show-role-dialog.sync="showRoleDialog" :user-id="userId" />
  </div>
</template>
<script>
import EmployeeEnum from '@/api/constant/employees'
import { getEmployee, delEmployee } from '@/api/employees'
import AddEmployee from './components/add-employee'
import AssignRole from './components/assign-role'
import { formatDate } from '@/filters'
import Qrcode from 'qrcode'
export default {
  name: 'Employees',
  components: {
    AddEmployee,
    AssignRole
  },
  props: {},
  data() {
    return {
      list: [],
      loading: false,
      page: {
        page: 1,
        size: 10,
        total: 0
      },
      showDialog: false,
      showCodeDialog: false,
      showRoleDialog: false,
      userId: ''
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getEmployee()
  },
  mounted() { },
  methods: {
    async getEmployee() {
      this.loading = true
      const { total, rows } = await getEmployee(this.page)
      this.page.total = total
      this.list = rows
      this.loading = false
    },
    CurrentChange(newPage) {
      this.page.page = newPage
      this.getEmployee()
    },
    // 格式化聘用形式
    formatEmployment(row, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      // console.log(obj)
      return obj ? obj.value : '未知'
    },
    // 删除员工信息
    async delEmployee(id) {
      try {
        await this.$confirm('您确定要删除该员工？')
        await delEmployee(id)
        this.getEmployee()
        this.$message.success('删除成功')
      } catch (err) {
        console.log(err)
      }
    },
    // async addEmployee(data) {
    //   await addEmployee(data)
    // }
    exportData() {
      const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      // 导出excel
      import('@/vendor/Export2Excel').then(async excel => {
        //  excel是引入文件的导出对象
        // 导出  header从哪里来
        // data从哪里来
        // 现在没有一个接口获取所有的数据
        // 获取员工的接口 页码 每页条数    100   1 10000
        const { rows } = await getEmployee({ page: 1, size: this.page.total })
        const data = this.formatJson(headers, rows) // 返回的data就是 要导出的结构
        const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
        const merges = ['A1:A2', 'B1:F1', 'G1:G2']
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data,
          filename: '员工资料表',
          multiHeader, // 复杂表头
          merges // 合并选项
        })

        // excel.export_json_to_excel({
        //   header: ['姓名', '工资'],
        //   data: [['张三', 3000], ['李四', 5000]],
        //   filename: '员工工资表'
        // })
        // [{ username: '张三',mobile: 13112345678 }]  => [[]]
        // 要转化 数据结构 还要和表头的顺序对应上
        // 要求转出的标题是中文
      })
    },
    // 将表头数据和数据进行对应
    // [{}]  =>   [[]]
    formatJson(headers, rows) {
      return rows.map(item => {
        // console.log(item)
        // item是一个对象  { mobile: 132111,username: '张三'  }
        // ["手机号", "姓名", "入职日期" 。。]
        return Object.keys(headers).map(key => {
          // 需要判断 字段
          if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
            // 格式化日期
            return formatDate(item[headers[key]])
          } else if (headers[key] === 'formOfEmployment') {
            const obj = EmployeeEnum.hireType.find(obj => obj.id === item[headers[key]])
            return obj ? obj.value : '未知'
          }
          return item[headers[key]]
        })
        // ["132", '张三’， ‘’，‘’，‘’d]
      })
      // return rows.map(item => Object.keys(headers).map(key => item[headers[key]]))
      // 需要处理时间格式问题
    },
    // 用foreach实现
    // 二维码显示
    showQrCode(url) {
      // console.log(url)
      if (url) {
        this.showCodeDialog = true
        this.$nextTick(() => {
          Qrcode.toCanvas(this.$refs.myCanvas, url)
        })
      } else {
        this.$message('该用户还未上传头像！')
      }
    },
    async editRole(id) {
      this.userId = id
      await this.$refs.assignRole.getUserDetailById(id)
      this.showRoleDialog = true
    }
  }
}
</script>
<style scoped lang='less'></style>
