// 路由接口 入口文件

// 创建router路由实例
const router = require('express').Router()

// 后续设置各个路由功能
// 引入 用户接口
router.use('/user', require('./user'))
// 引入  登录接口
router.use('/auth', require('./auth'))
// 引入 分类接口
router.use('/categories', require('./categories'))
// 引入 文章接口
router.use('/articles', require('./articles'))

// 导出模块
module.exports = router
