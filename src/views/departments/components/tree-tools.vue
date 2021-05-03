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
          <el-dropdown>
            <span>
              操作<i class="el-icon-arrow-down " />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>

</template>
<script>
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
  methods: {}
}
</script>
<style scoped lang='less'></style>
