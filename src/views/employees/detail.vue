<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="登录账户设置" name="first">
            <el-form ref="userForm" label-width="120px" style="margin-left: 120px; margin-top:30px">
              <el-form-item label="姓名:">
                <el-input v-model="userInfo.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input v-model="userInfo.password2" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="small" @click="saveUser">更新</el-button>
                <el-button size="small">取消</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="second">
            <el-row type="flex" justify="end">
              <el-tooltip content="打印个人基本信息">
                <router-link :to="`/employees/print/${userId}?type=personal`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <!-- 动态组件，可以切换显示组件
            is必须是一个变量 -->
            <component :is="userComponent" />
            <!-- <user-info /> -->
          </el-tab-pane>
          <el-tab-pane label="岗位信息" name="third">
            <el-row type="flex" justify="end">
              <el-tooltip content="打印岗位信息">
                <router-link :to="`/employees/print/${userId}?type=job`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <component :is="JobInfo" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getUserDetailById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
import UserInfo from './components/user-info'
import JobInfo from './components/job-info'
export default {
  name: '',
  components: {
    UserInfo,
    JobInfo
  },
  props: {},
  data() {
    return {
      JobInfo: 'job-info',
      userComponent: 'user-info',
      activeName: 'first',
      userId: this.$route.params.id, // 这样可以后面直接通过 this.userId进行获取数据
      userInfo: {
        //   专门存放基本信息
        username: '',
        password2: ''
      },
      rules: {
        username: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        password2: [{ required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 9, message: '密码长度6-9位', trigger: 'blur' }]
      }}
  },
  computed: {},
  watch: {},
  created() {
    this.getUserDetailById()
  },
  mounted() { },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    async getUserDetailById() {
      this.userInfo = await getUserDetailById(this.userId)
      // console.log(this.userInfo)
    },
    async saveUser() {
      try {
        // 校验
        await this.$refs.userForm.validate()
        await saveUserDetailById({ ...this.userInfo, password: this.userInfo.password2 }) // 将新密码的值替换原密码的值
        this.$message.success('保存成功')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style scoped lang='less'></style>
