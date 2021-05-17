<template>
  <div>
    <svg-icon icon-class="fullscreen" style="color:#fff; width: 20px; height: 20px" @click="changeScreen" />
  </div>
</template>
<script>
import ScreenFull from 'screenfull'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {
    changeScreen() {
      if (!ScreenFull.isEnabled) {
        this.$message.warning('此时全屏组件不可用')
        return
      }
      // document.documentElement.requestFullscreen()  原生js调用
      ScreenFull.toggle()
    }
  }
}
</script>
<style scoped lang='less'></style>

