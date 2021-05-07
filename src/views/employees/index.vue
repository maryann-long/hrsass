<template>
  <div>
    <!-- 全局插件 -->
    <page-tools :show-before="true">
      <span slot="before">共166条记录</span>
      <template slot="after">
        <el-button size="small" type="warning">导入</el-button>
        <el-button size="small" type="danger">导出</el-button>
        <el-button size="small" type="primary">新增员工</el-button>
      </template>
    </page-tools>
    <!-- 表格 -->
    <el-card v-loading="loading">
      <el-table border :data="list">
        <el-table-column label="序号" sortable="" type="index" />
        <el-table-column label="姓名" sortable="" prop="username" />
        <el-table-column label="工号" sortable="" prop="workNumber" />
        <el-table-column label="聘用形式" sortable="" prop="formOfEmployment" />
        <el-table-column label="部门" sortable="" prop="departmentName" />
        <el-table-column label="入职时间" sortable="" prop="timeOfEntry" />
        <el-table-column label="账户状态" sortable="" prop="enableState" />
        <el-table-column label="操作" sortable="" fixed="right" width="280">
          <template>
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template></el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="center" align="middle" style="height: 60px">
        <el-pagination layout="prev, pager, next" @current-change="CurrentChange" />
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { getEmployee } from '@/api/employees'
export default {
  name: 'Employees',
  components: {},
  props: {},
  data() {
    return {
      list: [],
      loading: false,
      page: {
        page: 1,
        size: 10,
        total: 0
      }
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
      console.log(this.list)
      this.loading = false
    },
    CurrentChange(newPage) {
      this.page.page = newPage
      this.getEmployee()
    }
  }
}
</script>
<style scoped lang='less'></style>
