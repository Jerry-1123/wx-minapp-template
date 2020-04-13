const app = getApp()

Component({
  properties: {
    home: {
      type: Boolean,
      value: false
    }
  },
  data: {
    statusBarHeight: 0,
    titleBarHeight: 0,
  },
  lifetimes: {
    attached() {
      app.checkNavBar().then(() => {
        this.setData({
          statusBarHeight: app.globalData.statusBarHeight,
          titleBarHeight: app.globalData.titleBarHeight
        })
      })
    }
  },
  methods: {
    goBack() {
      if (getCurrentPages().length > 1) {
        wx.navigateBack()
      } else {
        wx.redirectTo({
          url: '/pages/index/index'
        })
      }
    }
  }
})