import store from 'vuex'
export default {
  methods: {
    checkPermission(key) {
      const { userinfo } = store.state.user
      if (userinfo.roles.points && userinfo.roles.points.length) {
        return userinfo.roles.points.some(item => item === key)
      }
      return false
    }
  }
}
