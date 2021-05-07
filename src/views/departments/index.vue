<template>
  <div class="departments-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tools
          :tree-node="company"
          :is-root="true"
          @add-depts="addDept"
        />
        <el-tree
          :data="departs"
          :props="defaultProps"
          default-expand-all
        >
          <tree-tools
            slot-scope="{ data }"
            :tree-node="data"
            @del-depts="getDepartments"
            @add-depts="addDept"
            @edit-depts="editDepts"
          />
        </el-tree>
      </el-card>
    </div>
    <add-depts
      ref="AddDepts"
      :show-dialog.sync="showDialog"
      :tree-node="node"
      @add-dept="getDepartments"
    />
  </div>
</template>
<script>
import TreeTools from './components/tree-tools'
import { getDepartments, delDepartments } from '@/api/departments'
import { tranListToTreeDate } from '@/utils/index'
import AddDepts from './components/add-depts'
export default {
  name: 'Departments',
  components: {
    TreeTools,
    AddDepts
  },
  props: {
  },
  data() {
    return {
      company: {},
      defaultProps: {
        label: 'name'
      },
      departs: [],
      showDialog: false,
      node: null
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getDepartments()
  },
  mounted() { },
  methods: {
    async getDepartments() {
      console.log(444)
      this.loading = true
      const result = await getDepartments()
      // console.log(result)

      this.company = { name: result.companyName, manager: '负责人', id: '' }
      this.departs = tranListToTreeDate(result.depts, '')
      // console.log(this.departs)
      this.loading = false
    },
    async delDepartments() {
      try {
        await delDepartments()
      } catch (err) {
        console.log(err)
      }
    },
    addDept(node) {
      this.showDialog = true // 显示弹层
      this.node = node
    },
    editDepts(node) {
      this.showDialog = true
      this.node = node
      console.log(this.node)
      this.$refs.AddDepts.getDetails(this.node.id) // 直接调用子组件中的方法 传入一个id
      console.log('调用方法结束')
    }
  }
}
</script>
<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
