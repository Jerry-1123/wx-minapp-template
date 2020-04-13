const Common = {
  /**
   * 更新APP
   */
  updateApp: () => {
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(() => {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: (res) => {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      })
    })
  },
  /**
   * 获取授权状态
   */
  getAuthStatus: scopeName => {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: (res) => {
          // 已拒绝过，弹设置
          if (res.authSetting[`scope.${scopeName}`] === false) {
            resolve(false)
          }
          // 已同意
          else if (res.authSetting[`scope.${scopeName}`]) {
            resolve(true)
          }
          // 从未弹出授权框
          else {
            resolve("none")
          }
        }
      })
    })
  },
  /**
   * 获取授权
   */
  askAuth: function (scopeName) {
    return new Promise((resolve, reject) => {
      this.getAuthStatus(scopeName).then(authStatus => {
        // 无信息，弹授权
        if (authStatus === 'none') {
          wx.authorize({
            scope: `scope.${scopeName}`,
            success: res => {
              resolve()
            },
            fail: err => {
              reject()
            }
          })
        }
        // 已经同意
        else if (authStatus) {
          resolve()
        }
        // 已经拒绝过，弹出设置
        else {
          wx.openSetting({
            success: res => {
              // 拒绝授权
              if (res.authSetting[`scope.${scopeName}`] === false) {
                reject()
              }
              // 授权
              else if (res.authSetting[`scope.${scopeName}`]) {
                resolve()
              }
            }
          })
        }
      })
    })
  }
}

export default Common