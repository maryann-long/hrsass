<template>
  <div>
    <el-upload
      list-type="picture-card"
      action="#"
      :on-preview="preview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :on-change="changeFile"
      :http-request="upload"
      :limit="1"
      :before-upload="beforeAvatarUpload"
      :class="{disabled: fileComputed }"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="showPercent" style="width: 180px" :percentage="percent" />
    <el-dialog
      :visible.sync="showDialog"
      title="图片预览"
    >
      <img
        width="100%"
        :src="ImageUrl"
        alt=""
      >
    </el-dialog>
  </div>
</template>
<script>
import COS from 'cos-js-sdk-v5' // 引入腾讯云cos包
// 实例化COS对象
const cos = new COS({
  SecretId: 'AKID5aZJnMclaaPyOXyxA6gO9fw0DJ8qtkbB', // 身份识别 ID
  SecretKey: 'T5Zmh8PQAgJhpolHXWFDbt2NOBhgpiKf' // 身份密钥
})
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      fileList: [],
      ImageUrl: '',
      showDialog: false,
      showPercent: false,
      percent: 0,
      currentFileUid: ''
    }
  },
  computed: {
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  watch: {},
  created() { },
  mounted() { },
  methods: {
    handleRemove(file, fileList) {
      // file为当前删除的文件
      // fileList为删除之后的文件列表
      // console.log(file, fileList)
      // this.fileList = fileList
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    },
    preview(file) {
      // console.log(file)
      this.ImageUrl = file.url
      this.showDialog = true
    },
    changeFile(file, fileList) {
      // 添加文件
      this.fileList = fileList.map(item => item)
    },
    upload(params) {
      // 上传文件
      if (params.file) {
        cos.putObject({
          Bucket: 'hrsaas-106-1305857401', /* 必须 */
          Region: 'ap-chengdu', /* 存储桶所在地域，必须字段 */
          Key: params.file.name, /* 必须 */
          StorageClass: 'STANDARD',
          Body: params.file, // 上传文件对象
          onProgress: progressData => {
            this.percent = progressData.percent * 100
          }
        }, (err, data) => {
          // console.log(err || data)
          if (!err && data.statusCode === 200) {
            this.fileList = this.fileList.map(item => {
              // 去找谁的uid等于刚刚记录下来的id
              if (item.uid === this.currentFileUid) {
                // 将成功的地址赋值给原来的url属性
                return { url: 'http://' + data.Location, upload: true }
                // upload 为true 表示这张图片已经上传完毕 这个属性要为我们后期应用的时候做标记
                // 保存  => 图片有大有小 => 上传速度有快又慢 =>要根据有没有upload这个标记来决定是否去保存
              }
              return item
            })
            setTimeout(() => {
              this.showPercent = false // 隐藏进度条
              this.percent = 0 // 进度归0
            }, 2000)
          }
        })
      }
    },
    beforeAvatarUpload(file) {
      // console.log(file)
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']

      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
        // 最小不能超过5M
      }
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('上传图片不能超过5M')
        return false
      }
      // 确定当前上传的id
      this.currentFileUid = file.uid
      this.showPercent = true
      return true
    }
  }
}
</script>
<style>
.disabled .el-upload--picture-card {
  display: none;
}
</style>
