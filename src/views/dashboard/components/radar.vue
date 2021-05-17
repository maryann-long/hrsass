<template>
  <div ref="radar" class="radar" />
</template>
<script>
// 完成加载过程
// var echarts = require('echarts')
var echarts = require('echarts/lib/echarts') // 引入echarts主模块
require('echarts/lib/chart/radar') // 引入雷达图
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() {
    var myChart = echarts.init(this.$refs.radar)
    myChart.setOption({
      title: {
        text: '基础雷达图'
      },
      legend: {
        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: '销售（Sales）', max: 6500 },
          { name: '管理（Administration）', max: 16000 },
          { name: '信息技术（Information Technology）', max: 30000 },
          { name: '客服（Customer Support）', max: 38000 },
          { name: '研发（Development）', max: 52000 },
          { name: '市场（Marketing）', max: 25000 }
        ]
      },
      series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: '预算分配（Allocated Budget）'
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: '实际开销（Actual Spending）'
          }
        ]
      }]
    })
  },
  methods: {
  }
}
</script>
<style>
.radar{
    width: 600px;
    height: 400px;
}
</style>
