/**
 * 
 * 每隔2个小时启动刷新一次票据， 保证无论何时调用接口这个票据都是最新的 
 */

'use strict'

var sha1 = require('sha1')
var Promise = require('bluebird')
var request = Promise.promisify(require('request'))

var prefix = 'https://api.weixin.qq.com/cgi-bin/'
var api = {
  accessToken: prefix + 'token?grant_type=client_credential'
}

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
      Promise.resolve(data)
    } else {
      return that.updateAccessToken()
    }
  })
  .then(function(data) {
    that.accessToken = data.access_token
    that.expires_in = data.expires_in
    that.saveAccessToken(data)
  })
}

Wechat.prototype.isValidAccessToken = function(data) {
  if(!data || !data.access_token || data.expires_id) {
    return false
  }

  var access_token = data.access_token, 
    expires_in = data.expires_in,
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

/**
 * 微信认证
 */
module.exports = function(opts) {
  var wechat = new Wechat(opts)

  return function*(next) {
    console.log(this.query);
    console.log(opts)

    var token = opts.token
    var signature = this.query.signature
    var nonce = this.query.nonce
    var timestamp = this.query.timestamp
    var echostr = this.query.echostr

    var str = [token, timestamp, nonce].sort().join('')
    var sha = sha1(str)

    if (sha === signature) {
      this.body = echostr + ''
    } else {
      this.body = 'wrong'
    }
  }
}
