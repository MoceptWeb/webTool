'use strict'

exports.reply = function* (next) {
  var message = this.wexin

  if(message.MsgType === 'event') {
    if(message.Event === 'subscribe') {
      if(message.EventKey) {
        this.body = 'subscribe'
        console.log('扫描二维码进来' + message.EventKey + '  ' + message.ticket)
      }

      this.body = '订阅了 \r\n' + message.msgId
    } else if( message === 'unsubscribe') {
      console.log('unsubscribe')
      this.body = 'unsubscribe'
    } else if(message.Event === 'LOCATION') {
      console.log('位置')
      this.body = '位置是' + message.Latitude + '/' + message.Longitude + '-' + message.Precison
    } else if(message.Event === 'CLICK') {
      this.body = '点击菜单' + message.EventKey
    } else if( message.Event === 'SCAN') {
      this.body = 'sacning'
    } else if(message.Event === 'VIEW') {
      this.body = '点击链接' + message.EventKey
    }

  } else if(message.MsgType) {
    var content = message.Content, reply = '测试回复' + message.Content + '!!!!!!'
    if(content === 1) {
      reply = '1111111'
    } else if(content === 2) {
      reply = '2222222'
    }
    this.body = reply
  }

  // yield next
}