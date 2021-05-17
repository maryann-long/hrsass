<template>
  <div class="tab-container">
    <div class="user-info">
      <!-- 基本信息 -->
      <el-form label-width="220px">
        <div class="title">
          <h3>基本信息</h3>
        </div>
        <!-- 工号 入职时间 -->
        <el-row class="inline-info">
          <el-col :span="12">
            <el-form-item label="维修单编号">
              <el-input v-model="list.number" :disabled="true" class="inputW" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报修时间">
              <el-date-picker
                v-model="list.time"
                type="date"
                class="inputW"
                value-format="YYYY-MM-DD"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 姓名 部门 -->
        <el-row class="inline-info">
          <el-col :span="12">
            <el-form-item label="客户姓名">
              <el-input v-model="list.username" :disabled="true" class="inputW" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="list.tel" :disabled="true" class="inputW" />
            </el-form-item>
          </el-col>
        </el-row>
        <!--手机 聘用形式  -->
        <el-row class="inline-info">
          <el-col :span="12">
            <el-form-item label="用户地址">
              <el-input v-model="list.address" :disabled="true" class="inputW" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备用联系方式">
              <el-input v-model="list.preTel" :disabled="true" class="inputW" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 保修需求信息 -->
      <el-form label-width="220px">
        <div class="title">
          <h3>报修需求信息</h3>
        </div>
        <el-row class="inline-info">
          <el-col :span="12">
            <el-form-item label="机床类型">
              <el-input v-model="list.type" :disabled="true" class="inputW" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备品牌">
              <el-input v-model="list.brind" :disabled="true" class="inputW" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 姓名 部门 -->
        <el-row class="inline-info">
          <el-col :span="12">
            <el-form-item label="问题描述">
              <el-input v-model="list.discription" :disabled="true" class="inputW" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备规格">
              <el-input v-model="list.level" :disabled="true" class="inputW" />
            </el-form-item>
          </el-col>
        </el-row>
        <!--手机 聘用形式  -->
        <el-row class="inline-info">
          <el-col :span="12">
            <el-form-item label="设备控制系统">
              <el-input v-model="list.system" :disabled="true" class="inputW" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="支付方式">
              <el-input v-model="list.pay" :disabled="true" class="inputW" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 开票信息 -->
      <el-form label-width="220px">
        <div class="title">
          <h3>开票信息</h3>
        </div>
        <el-row class="inline-info">
          <el-col :span="6">
            <el-form-item label="维修单编号">
              <el-input v-model="list.number" :disabled="true" class="inputW" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 管奇峰维修内容记录 -->
      <el-form label-width="220px">
        <div class="title">
          <h3>管奇峰维修内容记录</h3>
        </div>
        <el-row class="inline-info">
          <el-col :span="12">
            <el-form-item label="维修事项">
              <el-input v-model="list.number" :disabled="true" class="inputW" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="更换配件">
              <el-input v-model="list.number" :disabled="true" class="inputW" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="inline-info">
          <el-col :span="12">
            <el-form-item label="建议事项">
              <el-input v-model="list.username" :disabled="true" class="inputW" />
            </el-form-item>
          </el-col>
          <el-col :span="12" />
        </el-row>
      </el-form>
      <!-- 处理信息 -->
      <div class="title">
        <h3>处理信息</h3>
      </div>
      <div class="block">
        <el-timeline :reverse="reverse">
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.timestamp"
          >
            {{ activity.content }}
          </el-timeline-item>
        </el-timeline>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: 'Table',
  components: {},
  props: {},
  data() {
    return {
      list:
        { preTel: 1,
          address: 2,
          tel: 3,
          username: 4,
          time: 5,
          number: 6 },

      reverse: true,
      activities: [{
        content: '支付完成',
        timestamp: '2018-04-15'
      }, {
        content: '维修完毕，客户确认',
        timestamp: '2018-04-13'
      }, {
        content: '指派维修单给管奇峰',
        timestamp: '2018-04-11'
      }]
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {}
}
</script>
<style lang='scss'>
.user-info{
 padding: 40px;
}
  .title {
    padding: 30px;
  }
</style>
