<template>
  <div class="departments-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tools
          :tree-node="company"
          :is-root="true"
        />
        <el-tree
          :data="departs"
          :props="defaultProps"
          default-expand-all
        >
          <tree-tools
            slot-scope="{ data }"
            :tree-node="data"
          />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>
<script>
import TreeTools from './components/tree-tools'
import { getDepartments } from '@/api/departments'
import { tranListToTreeDate } from '@/utils/index'
export default {
  name: 'Departments',
  components: {
    TreeTools
  },
  props: {
  },
  data() {
    return {
      company: {},
      defaultProps: {
        label: 'name'
      },
      departs: []
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
      const result = await getDepartments()
      console.log(result)

      this.company = { name: result.companyName, manager: '负责人', id: '' }
      this.departs = tranListToTreeDate(result.depts, '')
      console.log(this.departs)
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
