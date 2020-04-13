const app = getApp()

Page({
  data: {

  },
  onLoad() {
    app.hasLoad().then(() => {
      console.log(11)
    })
  }
})
