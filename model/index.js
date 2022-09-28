// 数据库相关配置

// 导入config配置中的 数据库地址
const config = require('../config')
// 引入mongoose
const mongoose = require('mongoose')
// 连接mongoDB
mongoose.connect(config.db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// 创建db实例
const db = mongoose.connection

// 成功或失败的 监听
db.on('error', err => {
  console.log('连接失败', err)
})
db.on('open', () => {
  console.log('连接成功')
})