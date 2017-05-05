'use strict'

var Koa = require('koa')
var wechat = require('./wechat/g')
var config = require('./config/config')

var app = new Koa()

app.use(wechat(config.wechat))

app.listen(4444)
console.log('server start')
