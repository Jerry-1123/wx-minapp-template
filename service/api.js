import Request from './request'
import Config from '../config/config'

const API = {
  APP: {
    /**
     * 获取OpenId
     * @param {appid}
     * @param {code} 
     */
    getOpenId: () => {
      return Request.get('', { appid: '', code: '' })
    }
  }
}

export default API