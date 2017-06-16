'use strict'

var sha1 = require('sha1')
var Promise = require('bluebird')
var getRawBody = require('raw-body')

var util = require('./util')
var Wechat = require('./wechat')

module.exports = function (opts) {
  var wechat = new Wechat(opts)

  return function* (next) {
    var that = this
    // console.log(this.query);
    // console.log(opts)

    var token = opts.token
    var signature = this.query.signature
    var nonce = this.query.nonce
    var timestamp = this.query.timestamp
    var echostr = this.query.echostr

    var str = [token, timestamp, nonce].sort().join('')
    var sha = sha1(str)

    // 微信认证, 合法性认证
    if (this.method === 'GET') {
      if (sha === signature) {
        this.body = echostr + ''
      } else {
        this.body = 'wrong'
      }
    } else if (this.method === 'POST') {
      // 发送消息或事件
      if (sha !== signature) {
        this.body = 'wrong'
        return false
      }
      // 通过raw-body模块把这个this上的request对象（http模块 request对象）去拼接它的数据，最终拿到一个buffer的xml数据
      var data = yield getRawBody(this.req, {
        length: this.length,
        limit: '1mb', // 数据体积
        encoding: this.charset
      })
      // console.log(data.toString())

      // 生成xml
      var content = yield util.parseXMLAsync(data)
      // console.log(content)
      /*{ xml: { ToUserName: [ 'gh_e50fce6233cd' ],                                                        FromUserName: [ 'ojMhyw5t-3LKAVjpXQuI8IuPCge0' ],                                         CreateTime: [ '1497605995' ],                                                             MsgType: [ 'text' ],                                                                      Content: [ 'dd' ],                                                                        MsgId: [ '6432168771293328805' ],                                                       Encrypt: [ '1wkbmf=' ] } } */

      // 生成key-value
      var message = util.formatMessage(content.xml)
      // console.log(message)

      if (message.MsgType === 'event') {
        if (message.Event === 'subscribe') {
          var now = new Date().getTime(), content = 'sssssssss'
          that.status = 200
          that.type = 'application/xml'
          var reply = '<xml>'
            + '<ToUserName><![CDATA[' + message.FromUserName + ']]></ToUserName>'
            + '<FromUserName><![CDATA[' + message.ToUserName + ']]></FromUserName>'
            + '<CreateTime>' + now + '</CreateTime>'
            + '<MsgType><![CDATA[text]]></MsgType>'
            + '<Content><![CDATA[' + content + ']]></Content>'
            + '</xml>'
          that.body = reply
          return
        }
      }

      if (message.MsgType === 'text') {
        var now = new Date().getTime(), content = '22'
        that.status = 200
        that.type = 'application/xml'
        var reply = '<xml>'
          + '<ToUserName><![CDATA[' + message.FromUserName + ']]></ToUserName>'
          + '<FromUserName><![CDATA[' + message.ToUserName + ']]></FromUserName>'
          + '<CreateTime>' + now + '</CreateTime>'
          + '<MsgType><![CDATA[text]]></MsgType>'
          + '<Content><![CDATA[' + content + ']]></Content>'
          + '</xml>'
        that.body = reply
        return
      }

    }
  }
}
