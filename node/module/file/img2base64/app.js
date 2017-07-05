var fs = require('fs')


var rd = require('rd');


// 异步列出目录下的所有文件
/*rd.read('./img', function (err, files) {
  if (err) throw err;
  // files是一个数组，里面是目录/tmp目录下的所有文件（包括子目录）
  console.log(files)
});*/

var tool = require('./tool')
var imgList = tool.getAllFiles2('./img'), imgInfo = [];

/*var imageBuf = fs.readFileSync('E:\\SELF\\MoceptWeb\\webTool\\node\\module\\file\\img2base64\\img\\1.png');

var imageBuf = fs.readFileSync('img\\1.png');
console.log(imageBuf.toString('base64'));*/

for(var i = 0; i < imgList.length; i++) {
  var imageBuf = fs.readFileSync(imgList[i]);
  imgInfo.push({
    base64: imageBuf.toString('base64')
  })
}
console.log(imgInfo[0]);

tool.createImgHtml(imgInfo)