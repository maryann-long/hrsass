<template>
  <div class="departments-container">
    <div class="app-container">
      <h1 />
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane
            label="角色管理"
            name="first"
          >
            <el-row>
              <el-button
                size="small"
                type="primary"
                icon="el-icon-plus"
                @click="showDialog = true"
              >新增角色</el-button>
            </el-row>
            <el-table
              border=""
              :data="list"
            >
              <el-table-column
                label="序号"
                align="center"
                type="index"
                width="120px"
              />
              <el-table-column
                label="角色名称"
                align="center"
                prop="name"
                width="240px"
              />
              <el-table-column
                label="描述"
                align="center"
                prop="description"
              />
              <el-table-column label="操作">
                <template slot-scope="{ row }">
                  <el-button
                    size="small"
                    type="success"
                    prop="rows.name"
                  >分配权限</el-button>
                  <el-button
                    size="small"
                    type="primary"
                    @click="editRole(row.id)"
                  >编辑</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="delRole(row.id)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row type="flex" justify="center">
              <el-pagination
                :current-page="page.page"
                :page-size="page.pagesize"
                :total="page.total"
                layout="prev, pager, next"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane
            label="公司信息"
            name="second"
          >
            <!-- 提示信息 -->
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form
              label-width="120px"
              style="margin-top:50px"
            >
              <el-form-item label="公司名称">
                <el-input
                  v-model="formData.name"
                  disabled
                  style="width:400px"
                />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  v-model="formData.companyAddress"
                  disabled
                  style="width:400px"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  v-model="formData.mailbox"
                  disabled
                  style="width:400px"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="formData.remarks"
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width:400px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <!-- 弹层 -->
        <el-dialog
          :title="titleName"
          :visible="showDialog"
          @close="btnCancel"
        >
          <el-form
            ref="roleForm"
            label-width="120px"
            :model="roleForm"
            :rules="rules"
          >
            <el-form-item
              label="角色名称"
              prop="name"
            >
              <el-input v-model="roleForm.name" />
            </el-form-item>
            <el-form-item label="角色描述">
              <el-input v-model="roleForm.description" />
            </el-form-item>
          </el-form>
          <el-row
            slot="footer"
            type="flex"
            justify="center"
          >
            <el-col :span="6">
              <el-button
                size="small"
                @click="showDialog=false"
              >取消</el-button>
              <el-button
                size="small"
                type="primary"
                @click="btnOK"
              >确定</el-button>
            </el-col>
          </el-row>
        </el-dialog>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getRolesList, getCompanyInfo, getRoleDetail, delRoleDetail, updateRole, addRole } from '@/api/settings'
import { mapGetters } from 'vuex'
export default {
  name: 'Setting',
  components: {},
  props: {},
  data() {
    return {
      activeName: 'first',
      list: [],
      page: {
        total: 0,
        pagesize: 2,
        page: 1
      },
      showDialog: false,
      formData: {},
      roleForm: {
      },
      rules: {
        name: [{ required: true, trigger: blur, message: '角色名称不能为空' }]
      }
    }
  },
  computed: {
    ...mapGetters(['companyId']),
    titleName() {
      return this.roleForm.id ? '编辑角色' : '添加角色'
    }
  },
  watch: {},
  created() {
    this.getRolesList()
    this.getCompanyInfo()
  },
  mounted() {
    // console.log(this.companyId)
  },
  methods: {
    async getRolesList() {
      const { total, rows } = await getRolesList(this.page)
      this.page.total = total
      this.list = rows
      // console.log(this.list)
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
      // console.log(this.formData)
    },
    changePage(newPage) {
      // newPage是当前点击的页码
      this.page.page = newPage
      this.getRolesList()
    },
    async editRole(id) {
      // console.log(id)
      this.showDialog = true
      // 回调角色信息
      this.roleForm = await getRoleDetail(id)
      // console.log(this.roleForm)
    },
    // 删除角色
    async delRole(id) {
      try {
        // 成功之后进入下一步
        await this.$confirm('您确定要删除该角色吗？')
        await delRoleDetail(id)
        // 重新调用数据
        this.getRolesList()
        // 弹出提示消息
        this.$message.success('删除成功！')
      } catch (err) {
        console.log('删除角色成功')
      }
    },
    btnCancel() {
      this.roleForm = {
        name: '',
        discription: ''
      }
      // 关闭校验
      this.$refs.roleForm.resetFields()
      // 关闭弹层
      this.showDialog = false
    },
    async btnOK() {
      // console.log(this.formData)
      console.log(this.roleForm)
      // 表单验证,成功后到下一步
      this.$refs.roleForm.validate()
      try {
        // 编辑功能调用接口
        if (this.formData.id) {
          await updateRole(this.roleForm)
        } else {
          await addRole(this.roleForm)
        }
        // 重新调用数据
        this.getRolesList()
        this.showDialog = false
        // 弹出提示消息
        this.$message.success('编辑成功！')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style scoped lang='less'></style>
