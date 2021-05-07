<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >

    <!-- 左侧 -->
    <el-col>{{ treeNode.name }}</el-col>
    <!-- 右侧 -->
    <el-col :span="4">
      <el-row
        type="flex"
        justify="end"
      >
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown @command="operateDepts">
            <span>
              操作<i class="el-icon-arrow-down " />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item
                v-if="!isRoot"
                command="edit"
              >编辑部门</el-dropdown-item>
              <el-dropdown-item
                v-if="!isRoot"
                command="del"
              >删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>

</template>
<script>
import { delDepartments } from '@/api/departments'
export default {
  name: '',
  components: {},
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {
    operateDepts(type) {
      if (type === 'add') {
        // 增加
        this.$emit('add-depts', this.treeNode)
      } else if (type === 'edit') {
        // 编辑
        this.$emit('edit-depts', this.treeNode)
      } else {
        // 删除
        this.$confirm('确定要删除该部门吗？').then(() => {
          return delDepartments(this.treeNode.id)
        }).then(() => {
          // 删除成功就会进入这里
          // 告诉父组件更新数据
          this.$emit('delDepts') // 触发自定义事件
          this.$message.success('删除部门成功')
        })
      }
    }
  }
}
</script>
<style scoped lang='less'></style>
