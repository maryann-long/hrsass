<template>
  <el-dialog :visible="showRoleDialog" title="分配角色" @close="btnCancel">
    <el-checkbox-group v-model="roleIds">
      <!-- 选项 -->
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import { getRolesList } from '@/api/settings'
import { getUserDetailById } from '@/api/user'
import { assignRole } from '@/api/employees'
export default {
  name: '',
  components: {},
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      roleIds: [],
      list: []
    }
  },
  computed: {},
  watch: {},
  created() {
    // setTimeout(() => {
    //   this.getUserDetailById(this.userId)
    // }, 0)
    this.getRolesList()
    // console.log(this.userId) // 父组件给自组件传值是异步的
  },
  mounted() {
    // console.log(this.userId)
    // this.getUserDetailById(this.userId)
  },
  methods: {
    async getRolesList() {
      const { rows } = await getRolesList()
      // console.log(rows)
      this.list = rows
    },
    // 获取当前用户所在角色
    async getUserDetailById(id) {
      // console.log(id)
      const { roleIds } = await getUserDetailById(id)
      // console.log(roleIds)
      this.roleIds = roleIds
    },
    btnCancel() {
      this.$emit('update:showRoleDialog', false)
    },
    async btnOK() {
      await assignRole({
        id: this.userId,
        roleIds: this.roleIds
      })
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>
<style scoped lang='less'></style>
