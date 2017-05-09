var express = require('express');
var router = express.Router();

var wechat = require('wechat');
var config = {
  token: 'weixin',
  appid: 'wxf6d0ac7f84dc22fb',
  encodingAESKey: 'ZEtViedarf49EUOCDeu45pqhkZhKPFBjSHI2DynP4vq',
  checkSignature: true // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false 
};

/* GET users listing. */
router.get('/', wechat(config, function (req, res, next) {
    debugger
    // 微信输入信息都在req.weixin上 
  var message = req.weixin;

  console.log(message);
  if (message.MsgType === 'text') {
    res.reply('这是一个自动回复');
  }
  else if (message.MsgType === 'voice') {
  }
  else if (message.MsgType === 'image') {
    res.reply([{
      title: '文章提示',
      description: '返回的是文章',
      picurl: 'http://pic002.cnblogs.com/images/2011/159097/2011102917303125.jpg',
      url: 'http://doxmate.cool/node-webot/wechat/api.html'
    }
    ]);
  }
  res.send('respond with a resource');
}));

module.exports = router;
