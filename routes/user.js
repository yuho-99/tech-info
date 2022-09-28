// 用户接口

// 创建 路由中间件
// 创建路由实例
const router = require('express').Router()
// 引入 校验规则
const { userValidator } = require('../model/user')
// 引入 validate 
const validator = require('../middleware/validate')
// 引入 业务逻辑模块
const user = require('../controller/user')
// 引入接口鉴权中间件
const auth = require('../middleware/auth')


// 鉴权中间件使用方法 ：  直接将auth设置在参数中   / 如果引入了 规则校验 则已数组的形式书写在参数中，将auth写在数据校验前
// 注册接口设置
router.post('/', [ auth,validator(userValidator) ], user.register)
// 获取用户接口设置
router.get('/', auth, user.getInfo)
// 编辑/更新用户
router.put('/', [ auth,validator(userValidator) ], user.updateInfo)
// 删除用户
router.delete('/', auth, user.deleteUser)

// 导出
module.exports = router
