/**
 * 微信认证
 * 每隔2个小时启动刷新一次票据， 保证无论何时调用接口这个票据都是最新的 
 */

'use strict'

var Promise = require('bluebird')
var request = Promise.promisify(require('request'))

var prefix = 'https://api.weixin.qq.com/cgi-bin/'
var api = {
  accessToken: prefix + 'token?grant_type=client_credential'
}
var util = require('./util')

// 管理和微信的接口
function Wechat(opts) {
  var that = this
  this.appID = opts.appID
  this.appSecret = opts.appSecret
  this.getAccessToken = opts.getAccessToken
  this.saveAccessToken = opts.saveAccessToken

  this.getAccessToken().then(function(data) {
    try {
      data = JSON.parse(data)
    }
    catch(e) {
      return that.updateAccessToken()
    }

    // 票据合法性检查
    if(that.isValidAccessToken(data)) {
      /**  return promise 必须 return*/
      return Promise.resolve(data)
    } else {
      return that.updateAccessToken()
    }
  })
    .then(function(data) {
      that.accessToken = data.access_token
      that.expires_in = data.expires_in
      that.saveAccessToken(data)
    })
    .catch(function(e) {
      console.log(e)
    })
}

Wechat.prototype.isValidAccessToken = function(data) {
  if(!data || !data.access_token || data.expires_id) {
    return false
  }

  var expires_in = data.expires_in,
    now = new Date().getTime()

  if(now < expires_in) {
    return true
  } else {
    return false
  }
}

Wechat.prototype.updateAccessToken = function() {
  var appID = this.appID,
    appSecret = this.appSecret,
    url = api.accessToken + '&appid=' + appID + '&secret=' + appSecret
  return new  Promise(function(resolve, reject) {
    request({
      url: url,
      json: true
    }).then(function(response) {
      var data = response.body, now = (new Date()).getTime(), expires_in = now + (data.expires_in - 20) * 1000
      // 20秒刷新或服务器言辞
      data.expires_in = expires_in
      resolve(data)
    })
  })

}


Wechat.prototype.reply = function() {
  var content = this.body, message = this.wexin, xml = util.tpl(content, message)
  this.status = 200;
  this.type = 'application/xml'
  this.body = xml
}

module.exports = Wechat
