// 引入 config文件中的 index 配置文件
const config = require('./config/index')
// console.log(config)

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
//引入 path
const path = require('path')
// 引入ejs
const ejs = require('ejs')

// 创建 express 实例对象 
const app = express()

// 引入中间键
app.use(express.json())

// 引入cors 中间件
app.use(cors())

// 引入 morgan 中间件
// app.use(morgan())
app.use(morgan('dev'))

// 引入数据库,模块
require('./model')

// 引入路由中间件
app.use('/api', require('./routes'))

// 引入错误处理中间件
app.use(require('./middleware/error'))

// ---------------
// 引入静态资源
app.use(express.static(path.join(__dirname, './public')))
// 配置模版引擎
// 设置视图目录位置
app.set('views', path.join(__dirname, './views'))
// 设置视图引擎为 ejs 
app.set('view engine', 'ejs')
// 将 html 文件 通过 ejs 处理
app.engine('html', ejs.renderFile)

// 引入前台路由 文件
app.use(require('./routes/pages'))

// 监听端口 
app.listen(config.app.port, () => {
  console.log(`running at http://localhost:${config.app.port}`)
})