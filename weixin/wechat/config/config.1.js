var path = require('path');
var util = require('../libs/util')
var wechat_file = path.join(__dirname, 'wechat.txt');

module.exports = {
  wechat: {
    appID: '1',
    appSecret: '2',
    token: '3',
    getAccessToken: function() {
      return util.readFileAsync(wechat_file)
    },
    saveAccessToken: function(data) {
      data = JSON.stringify(data)
      return util.writeFileAsync(wechat_file, data)
    }
  }
};
