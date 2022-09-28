// 分类接口

// 创建router 实例
const router = require('express').Router()
// 引入校验工具
// 引入 校验规则
const { categoryValidator } = require('../model/categories')
// 引入 validate 
const validator = require('../middleware/validate')
// 引入控制器 功能模块
const categories = require('../controller/categories')
// 引入接口鉴权中间件
const auth = require('../middleware/auth')


// 接口设置
//  获取全部
router.get('/', auth, categories.getAll)
// 获取单个
router.get('/:cid', auth, categories.get)
// 获取某个分类下的 全部文章
router.get('/:cid/articles', (req, res, next) => {
  res.send('获取单个分类下的 全部文章')
})
// 添加新的
router.post('/', [auth, validator(categoryValidator)], categories.create)
// 编辑单个
router.put('/:cid', [auth, validator(categoryValidator)], categories.update)
// 删除单个
router.delete('/:cid', auth, categories.remove)

// 导出
module.exports = router