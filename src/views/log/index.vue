<template>
  <div class="login-container">
    <el-card shadow="always" class="box-card">
      <el-row type="flex" justify="center">
        <el-col :span="12" class="left">
          <div class="title">
            <div class="name">仓鼠导航</div>
            <div class="radius" />
          </div>
        </el-col>
        <div class="triangle" />
        <el-col :span="12">
          <div class="canvas">
            <el-row type="flex">

              <!-- 注册页面 -->
              <el-col>
                <el-form ref="registerForm" class="login-form" :model="ruleForm" :rules="rules">
                  <div class="login-title">
                    <h1 class="title">
                      register
                    </h1>
                  </div>
                  <el-form-item style="padding:30px" prop="username">
                    <el-input v-model="rulesForm.username" style="width:85%" placeholder="请设置用户名" />
                  </el-form-item>
                  <el-form-item style="padding:30px" prop="passward1">
                    <el-input v-model="rulesForm.passward1" style="width:85%" placeholder="请设置登陆密码" />
                  </el-form-item>
                  <el-form-item style="padding:30px" prop="password2">
                    <el-input v-model="rulesForm.passward2" style="width:85%" placeholder="确认密码" />
                  </el-form-item>
                  <el-form-item style="padding:30px">
                    <el-button type="primary" style="width:85%" round>欢迎注册</el-button>
                  </el-form-item>
                </el-form>
                <el-row style="width:85%, padding: 0px 30px" type="flex" justify="space-between">
                  <p>已有账号？<a href="javascript:;" @click="register">登录</a></p>
                  <p><input type="checkbox">阅读并同意<a href="javascript:;">《注册条款》</a></p>
                </el-row>
              </el-col>
              <!-- 登录页面 -->
              <el-col class="login-contain">
                <el-form class="login-form">
                  <div class="login-title">
                    <h1 class="title">
                      login
                    </h1>
                  </div>
                  <el-form-item style="padding:30px">
                    <el-input style="width:85%" placeholder="用户名/邮箱" />
                  </el-form-item>
                  <el-form-item style="padding:30px">
                    <el-input style="width:85%" placeholder="密码" />
                  </el-form-item>
                  <el-form-item style="padding:30px">
                    <el-button type="primary" style="width:85%" round>主要按钮</el-button>
                  </el-form-item>
                  <el-row style="width:85%, padding: 0px 30px" type="flex" justify="space-between">
                    <a href="javascript:;" @click="register">立即注册</a>
                    <a href="javascript:;">忘记密码</a>
                  </el-row>

                </el-form>

              </el-col>
            </el-row>
          </div>

        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'Login',
  components: {},
  props: {},
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      rulesForm: {
        username: '',
        passward1: '',
        passward2: ''

      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 2, max: 8, message: '请输入2-8位，用户名仅支持中英文、数字和下划线', trigger: 'blur' }
        ],
        passward1: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 16, message: '请输入6-16位密码，不允许有空格和中文', trigger: 'blur' }
        ],
        passward2: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {
    register() {
    }
  }
}
</script>
<style lang="scss">
.active{
    position: absolute;
    left: 50%;
}
.login-container {
  background-color: #d1e3fa;
  overflow: hidden;
  /* height: 100%; */
}
.box-card {
  height: 670px;
  margin: 60px 90px;
  border-radius: 20px;
}
.el-card__body{
   height: 1050px;
   padding: 0;
  }
.el-row{
  height: 100%;
  }
.left{
 background-color: #0251ff;
  .name{
   position: absolute;
  left: 170px;
    top: 154px;
   font-size: 50px;
   color: #fff;
   font-weight: 700;
  }
  .radius{
   position: absolute;
   left: -100px;
    top: 230px;
   width: 800px;
   height: 800px;
   border-radius: 50%;
   background-color: #30c9e8;
  } }
  .triangle{
   position: absolute;
   left: 511px;
   width: 0;
   height: 0;
   border-bottom: 1050px solid transparent;
   border-right: 290px solid #fff;
  }
/* .title{
 background-color: #0251ff;
} */
.canvas{
 background-color: pink;
     padding: 0px;
    width: 100%;
    /* z-index: 9999; */
    position: absolute;
    right: 0;
}
.login-contain {
 // display: none;
    padding: 50px;
    padding-left: 147px;
}
.login-form{
 width: 550px;
 max-width: 100%;
 padding-top: 20px;
 .login-title{
  .title{
   font-size: 50px;
   padding-left: 95px;
  }
 }
 .el-input{
    border: 0;
    border-bottom: 2px solid #ccc;
    border-radius: 0!important;
}
.el-input__inner{
 border: 0px solid #DCDFE6;;
}
}
.login-contain{
 padding-left: 80px;
}
</style>
