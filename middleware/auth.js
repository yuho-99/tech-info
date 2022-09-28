// 接口鉴权中间件

// 引入 jwt 和配置文件
const jwt = require('jsonwebtoken')
const config = require('../config')

// 导出
module.exports = function (req, res, next) {
  // 接口鉴权，（ 约定，前端请求头中需要包含有效的 authorization 字段，值为 access_token）
  // 1, 保存数据
  const access_token = req.header('authorization')
  // 2,检测是否存在 access_token
  if (!access_token) {
    return res.status(401).json({
      code: 401,
      msg: '无token信息'
    })
  }
  try {
    // 3,存在 access_token 时验证是否有效
    // 给token 解密并赋值
    const userData = jwt.verify(access_token, config.jwtPrivateKey)
    // 得到了 token 中存储的数据，也就是用户信息后 ， 保存起来供后续操作使用
    req.userData = userData
  // console.log(userData)    //{ _id: '633083ed209f3dc5deaefed3', iat: 1664178682 } // iat：时间
    // 调用next(),让程序继续执行
    next()
  } catch (err) {
    return res.status(401).json({
      code: 401,
      msg: 'token信息无效'
    })
  }
}