const Util = {

  formatNumber: n => {
    n = n.toString()
    return n[1] ? n : '0' + n
  },

  formatTime: function (date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return [year, month, day].map(item => this.formatNumber(item)).join('-') +
      ' ' + [hour, minute, second].map(item => this.formatNumber(item)).join(':')
  },

  formatDate: function (date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    // return [year, month, day].map(item => this.formatNumber(item)).join('-')
    return `${year}年${month}月${day}日`
  },

  formatSecond: function (times) {
    let result = '00:00';
    let hour, minute, second
    if (times > 0) {
      hour = Math.floor(times / 3600)
      minute = Math.floor((times - 3600 * hour) / 60)
      second = Math.floor((times - 3600 * hour - 60 * minute) % 60)
      result = this.formatNumber(minute) + ':' + this.formatNumber(second)
    }
    return result
  },

  rnd: (n = 0, m = 1) => {
    const random = Math.floor(Math.random() * (m - n + 1) + n)
    return random
  },

  rndOne: function (self = []) {
    return self.length > 0 ? self[this.rnd(0, self.length - 1)] : ''
  },

  rpx2Px(rpx) {
    const sysInfo = wx.getSystemInfoSync()
    const screenWidth = sysInfo.screenWidth
    const factor = screenWidth / 750
    return rpx * factor
  }
}

export default Util