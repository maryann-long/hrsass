<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :title="showTitle" :visible="showDialog" @close="btnCancel">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="deptForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeeSimple">
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select></el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import { getDepartments, addDepartments, getDetails, updateDetail } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    const checkNameRepeat = async(rule, value, callback) => {
      //  value 是部门名称 要去和同级部门下的部门去比较 有没有相同的 有相同的 不能过 / 不相同就可以过
      const { depts } = await getDepartments()
      // 去找同级部门下 有没有和value相同的数据
      // 找到同级部门的所有的子部门
      let isRepeat = false
      if (this.formData.id) {
        // 有id就是编辑模式
        // 编辑的数据 在数据库里有!!!  同级部门下 我的名字不能和其他的同级部门的名字进行重复
        // 首先要找到我的同级部门   this.formData.id 就是我当前的id 我的pid是 this.formData.pid
        // depts.filter(item => item.pid === this.formData.pid)
        isRepeat = depts.filter(item => item.pid === this.treeNode.pid && item.id !== this.treeNode.id).some(item => item.name === value)
      } else {
        // 没有id就是新增模式
        isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      }
      // 如果isRepeat为true  表示找到了一样的名字
      isRepeat ? callback(new Error(`同级部门下已经存在这个${value}部门了`)) : callback()
    }
    const checkCodeRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      let isRepeat = false
      if (this.formData.id) {
      //  编辑模式下
        // 要求是 不能有一样的code
        isRepeat = depts.filter(item => item.id !== this.treeNode.id).some(item => item.code === value && value)
      } else {
        // 新增模式下
        isRepeat = depts.some(item => item.code === value && value)
      }
      // 要求编码 和所有的部门编码都不能重复 由于历史数据有可能 没有code 所以说这里加一个强制性条件 就是 value值不为空
      isRepeat ? callback(new Error(`组织架构下已经存在这个${value}编码了`)) : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' }, {
            trigger: 'blur',
            validator: checkNameRepeat
          }],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' }, {
            trigger: 'blur',
            validator: checkCodeRepeat
          }],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-50个字符' }]
      },
      peoples: []
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增子部门'
    }
  },
  methods: {
    btnCancel() {
      // 重置数据  因为resetFields 只能重置 表单上的数据 非表单上的 比如 编辑中id 不能重置
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      this.$refs.deptForm.resetFields() // 重置校验字段
      this.$emit('update:showDialog', false) // 关闭
    },
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple()
    },
    btnOK() {
      // 表单验证
      this.$refs.deptForm.validate(async isOK => {
        if (isOK) {
        // 调用接口添加组织
          // 要分清楚现在是编辑还是新增
          if (this.formData.id) {
            // 编辑模式  调用编辑接口
            await updateDetail(this.formData)
          } else {
            // 新增模式
            await addDepartments({ ...this.formData, pid: this.treeNode.id }) // 调用新增接口 添加父部门的id
          }
        }
        // 通知父组件更新数据
        this.$emit('add-dept')
        // 关闭弹层
        this.$emit('update:showDialog', false)
      })
    },
    // btnOK() {
    //   //  手动校验表单
    //   this.$refs.deptForm.validate(async isOK => {
    //     if (isOK) {
    //       if (this.formData.id) {
    //         // 编辑
    //         await updateDetail(this.formData)
    //       } else {
    //         // 这里我们将ID设成了我的pid
    //         await addDepartments({ ...this.formData, pid: this.treeNode.id })
    //       }
    //       // 表单校验通过

    //       // 告诉父组件
    //       this.$emit('addDepts') // 触发一个自定义事件
    //       // 此时应该去修改showDialog值
    //       // update:props名称
    //       this.$emit('update:showDialog', false)
    //       // 关闭dialog的时候会 触发el-dialog的close事件  所以这里不需要再单独的重置数据了
    //     }
    //   })
    // },
    async getDetails(id) {
      console.log(id)
      this.formData = await getDetails(id)
      console.log(this.formData)
    }
  }
}
</script>

