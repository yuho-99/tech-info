// 登录认证接口

// 创建 路由中间件
// 创建路由实例
const router = require('express').Router()
// 引入业务逻辑设置内容
const auth = require('../controller/auth')
// 引入校验中间件
const validator = require('../middleware/validate')
const { userValidator } = require('../model/user')

// 注册接口设置
router.post('/', validator(userValidator), auth.test)
// 导出
module.exports = router