<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 右边按钮 -->
      <page-tools>
        <!-- <el-button slot="after"></el-button> -->
        <template v-slot:after>
          <el-button
            type="primary"
            size="small"
            @click="addPermission(1,'0')"
          >添加权限</el-button>
        </template>
      </page-tools>
      <el-table
        :data="list"
        row-key="id"
      >
        <el-table-column
          label="添加"
          prop="name"
        />
        <el-table-column
          align="center"
          label="标识"
          prop="code"
        />
        <el-table-column
          align="center"
          label="描述"
          prop="description"
        />
        <el-table-column
          align="center"
          label="操作"
        >
          <template slot-scope="{ row }">
            <el-row>
              <el-col>
                <el-button
                  v-if="row.type===1"
                  type="text"
                  @click="addPermission(2, row.id)"
                >添加</el-button>
                <el-button type="text" @click="delPermission(row.id)">删除</el-button>
                <el-button
                  type="text"
                  @click="updatePermission(row.id)"
                >编辑</el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增弹层 -->
      <el-dialog
        :title="showTitle"
        :visible="showAddDialog"
        @close="btnCancel"
      >
        <el-form
          ref="permForm"
          :model="formData"
          label-width="120px"
          :rules="rules"
        >
          <el-form-item
            label="名称"
            prop="name"
          >
            <el-input
              v-model="formData.name"
              style="width:90%"
            />
          </el-form-item>
          <el-form-item
            label="标识"
            prop="code"
          >
            <el-input
              v-model="formData.code"
              style="width:90%"
            />
          </el-form-item>
          <el-form-item label="描述">
            <el-input
              v-model="formData.description"
              style="width:90%"
            />
          </el-form-item>
          <el-form-item label="开启">
            <el-switch
              v-model="formData.enVisible"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>
        <el-row
          type="flex"
          justify="center"
        >
          <el-col :span="6">
            <el-button
              type="primary"
              size="small"
              @click="btnOK"
            >确定</el-button>
            <el-button size="small" @click="btnCancel">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>

  </div>
</template>
<script>
import { getPermissionList, addPermission, updatePermission, getPermissionDetail, delPermission } from '@/api/permission'
import { tranListToTreeDate } from '@/utils'
export default {
  name: 'Permission',
  components: {},
  props: {},
  data() {
    return {
      list: [],
      showAddDialog: false,
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑权限' : '新增权限'
    }
  },
  watch: {},
  created() {
    this.getPermissionList()
  },
  mounted() { },
  methods: {
    async getPermissionList() {
      this.list = tranListToTreeDate(await getPermissionList(), '0')
    },
    async delPermission(id) {
      this.$confirm('确定删除该权限？').then(() => {
        return delPermission(id)
      }).then(() => {
        this.$message('删除成功')
        this.getPermissionList()
      })
    },
    // 添加权限
    addPermission(type, id) {
      this.formData.pid = id
      this.formData.type = type
      this.showAddDialog = true
    },
    // 编辑权限
    async updatePermission(id) {
      // 个人性息回写
      this.formData = await getPermissionDetail(id)
      // console.log(this.formData)
      this.showAddDialog = true
    },
    // 确认按钮
    // btnOK() {
    //   // this.$refs.permForm.validate(isOK => {})
    //   this.$refs.permForm.validate().then(() => {
    //     // 校验成功
    //     if (this.formData.id) {
    //       // 认为是编辑
    //       return updatePermission(this.formData)
    //     }
    //     console.log(this.formData.enVisible)
    //     return addPermission(this.formData) // 新增接口
    //   }).then(() => {
    //     // 添加成功
    //     this.$message.success('操作成功')
    //     this.getPermissionList()
    //     this.showAddDialog = false
    //   })
    // },
    async btnOK() {
      try {
        await this.$refs.permForm.validate()
        if (this.formData.id) {
          // 编辑功能
          await updatePermission(this.formData)
        } else {
          // 新增功能
          await addPermission(this.formData)
        }
        this.$message.success('操作成功')
      } catch (err) {
        console.log(err)
      }
      this.getPermissionList()
      this.showAddDialog = false
    },
    // 删除权限
    btnCancel() {
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      }
      // 移除校验
      this.$refs.permForm.resetFields()
      this.showAddDialog = false
    }
  }
}
</script>
<style scoped lang='less'></style>
