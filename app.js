import API from './service/api'
import Common from './common/common'
import Config from './config/config'

App({
  onLaunch() {
    // 检查更新
    Common.updateApp()
  },
  /**
   * 所有页面统一调用
   */
  hasLoad() {
    return new Promise((resolve, reject) => {
      this.checkOpenId().then(() => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 检查openId
   */
  checkOpenId() {
    return new Promise((resolve, reject) => {
      const openId = wx.getStorageSync('openId')
      if (!openId) {
        wx.login({
          success: res => {
            const params = {
              appId: Config.appId,
              code: res.code
            }
            API.APP.getOpenId(params).then(res => {
              wx.setStorageSync('openId', res.openid)
              this.globalData.openId = res.openid
              resolve()
            }).catch(err => {
              reject(err)
            })
          },
          fail: err => {
            reject(err)
          }
        })
      } else {
        this.globalData.openId = openId
        resolve()
      }
    })
  },
  /**
   * 检查是否已经获取用户信息
   */
  checkeUserInfo() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                this.globalData.userInfo = res.userInfo
                resolve()
              },
              fail: err => {
                reject(err)
              }
            })
          } else {
            resolve()
          }
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },
  /**
   * 处理导航栏信息
   */
  checkNavBar() {
    return new Promise((resolve, reject) => {
      if (this.globalData.statusBarHeight == 0 && this.globalData.titleBarHeight == 0) {
        wx.getSystemInfo({
          success: res => {
            const capsule = wx.getMenuButtonBoundingClientRect()
            this.globalData.statusBarHeight = res.statusBarHeight
            this.globalData.titleBarHeight = (capsule.top - res.statusBarHeight) * 2 + capsule.height
          },
          failure: () => {
            this.globalData.statusBarHeight = 20
            const system = wx.getSystemInfoSync().system
            if (system.indexOf('Android') == -1) {
              this.globalData.titleBarHeight = 48
            } else {
              this.globalData.titleBarHeight = 44
            }
          },
          complete: () => {
            resolve()
          }
        })
      } else {
        resolve()
      }
    })
  },
  globalData: {
    openId: '',
    userInfo: null,
    statusBarHeight: 0,
    titleBarHeight: 0
  }
})