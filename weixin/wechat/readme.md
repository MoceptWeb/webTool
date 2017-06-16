# 内网穿透
localtunnel

在本地模拟启动app时候必须启动内网穿透， 否则收不到消息
```
lt -p 8080  
lt --subdomain klioen --port 4444 或 lt -s mowei -p 4444  
```

# node --harmony app.js
启动项目


# 
## 微信认证和微信获取accesstoken

## 发送请求

- 处理POST类型的控制逻辑， 接口xml的数据包
- 接收这个数据包（消息类型或事件类型）
- 拼接已经定义好的消息
- 包装成xml格式
- 在5秒内返回
