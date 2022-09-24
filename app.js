// 引入 config文件中的 index 配置文件
const config = require('./config/index')
console.log(config)

const express = require('express')


// 创建 express 实例对象 
const app = express()

// 设置一个简单请求
app.get('/', (req, res) => {
  res.send('ok')
})
// 监听端口 
app.listen(config.app.port, () => {
  console.log(`running at http://localhost:${config.app.port}`)
})