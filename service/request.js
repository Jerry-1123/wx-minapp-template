import Config from '../config/config'

// 判断开发环境
let HOST = Config.env.prodHost
const platform = wx.getSystemInfoSync().platform
if (platform === 'devtools') {
  HOST = Config.env.devHost
}

const getHeader = ({ headers = {}, method = 'GET' } = {}) => {
  if (method === 'POST') {
    return Object.assign({
      'content-type': 'application/json'
    }, headers)
  }
  return Object.assign({
    'content-type': 'application/x-www-form-urlencoded'
  }, headers)
}

const showError = (msg) => {
  wx.showToast({
    title: msg,
    icon: 'none'
  })
}

const handleErrorCode = (res) => {
  switch (res.statusCode) {
    case 400:
      showError('请求失败，请稍后再试')
      break
  }
}

const fetch = (url, { params = '', headers = {}, method = 'GET' } = {}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: HOST + url,
      data: params,
      method: method,
      header: getHeader({ headers, method }),
      success: res => {
        if (res.statusCode === 200 && res.data) {
          resolve(res.data)
        } else {
          handleErrorCode(res)
          reject(res)
        }
      },
      fail: err => {
        showError('网络错误，请稍后再试')
        reject(err)
      }
    })
  })
}

const Request = {
  get: (url, params, headers) => {
    return fetch(url, { params, headers })
  },
  post: (url, params, headers) => {
    return fetch(url, { params, headers, method: 'POST' })
  }
}

export default Request