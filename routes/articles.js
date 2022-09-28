// 文章接口

// 创建 router实例
const router = require('express').Router()
// 引入验证规则
// 引入 校验规则
const { articleValidator } = require('../model/articles')
// 引入 validate 
const validator = require('../middleware/validate')
// 引入 业务逻辑功能 模块
const articles = require('../controller/articles')
// 引入接口鉴权中间件
const auth = require('../middleware/auth')

/*
注意： 在获取所有文章时分两种情况：

- 1，获取当前分类下所有文章
- 2，获取所有文章
*/
// 如需获取某个分类下的所有文章，通过参数传递条件即可
// 获取全部
router.get('/', auth, articles.getAll)
// 获取某个
router.get('/:aid', auth, articles.get)
// 添加新的文章
router.post('/', [auth, validator(articleValidator)], articles.create)
//  编辑信息 
router.put('/:aid', [auth, validator(articleValidator)], articles.update)
// 删除文章
router.delete('/:aid', auth, articles.remove)

// 导出
module.exports = router