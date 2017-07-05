var fs = require('fs');

//path模块，可以生产相对和绝对路径
var path = require('path');
/*exports.getAllFiles = function (dir, callback) {
  var filesArr = [];
  dir = ///$/.test(dir) ? dir : dir + '/';
    (function dir(dirpath, fn) {
      var files = Sys.fs.readdirSync(dirpath);
      exports.async(files, function (item, next) {
        var info = Sys.fs.statSync(dirpath + item);
        if (info.isDirectory()) {
          dir(dirpath + item + '/', function () {
            next();
          });
        } else {
          filesArr.push(dirpath + item);
          callback && callback(dirpath + item);
          next();
        }
      }, function (err) {
        !err && fn && fn();
      });
    })(dir);
  return filesArr;
}*/

var join = path.join;
/**
 * 
 * @param startPath  起始目录文件夹路径
 * @returns {Array}
 */
function findSync(startPath) {
  var result = [];

  function finder(srcPath) {
    var files = fs.readdirSync(srcPath);
    files.forEach((val, index) => {
      // (process.cwd(), 'img', '1.kpg')
      var fPath = join(srcPath, val);
      var stats = fs.statSync(fPath);
      if (stats.isDirectory()) finder(fPath);
      if (stats.isFile()) result.push(fPath);
    });

  }
  finder(startPath);
  return result;
}
exports.getAllFiles2 = findSync

exports.createImgHtml = function (imgList) {
  var html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>截图信息</title></head><body><div id="img_list">';

  for (var i = 0; i < imgList.length; i++) {
    html += '<img src="data:image/png;base64,' + imgList[i].base64 + ' " alt="">'
  }

  html += '</div></body></html>';
  fs.writeFile('./done/index.html', html, function (err) {
    if (err) {
      return console.log(err);
    }
  });
  return html;
}
