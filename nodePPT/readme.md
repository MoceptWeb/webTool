# pdf版

需要安装 phantomJS 。

## 安装phantomjs，如果安装了，请忽略
npm install -g phantomjs
## 启动nodeppt server
nodeppt start
## 导出文件
nodeppt pdf http://127.0.0.1:8080/md/demo.md -o a.pdf

# html版

## 使用generate命令
nodeppt generate filepath
## 导出全部，包括nodeppt的js、img和css文件夹
## 默认导出在publish文件夹
nodeppt generate ./ppts/demo.md -a
## 指定导出文件夹
nodeppt generate ./ppts/demo.md -a -o output/path
导出目录下所有ppt，并且生成ppt list首页：

nodeppt path -o output/path -a

# 快捷键
空格/→/↓/Tab/pageDown：下一页
←/↑/pageUp：上一页
P：开画板
C：清除画板
O: 轮播形式打开ppt