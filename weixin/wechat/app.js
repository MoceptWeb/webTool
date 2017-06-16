'use strict'

var Koa = require('koa')
var wechat = require('./wechat/g')
var config = require('./config/config')

var app = new Koa()

// 微信中间件
app.use(wechat(config.wechat))

app.listen(4444)

console.log('server start')
