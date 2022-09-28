// 用来书写  login 登录认证 的业务逻辑

// 引入 User 模型
const { User } = require('../model/user')
//引入 bcrypt
const bcrypt = require('bcrypt')

exports.test = async (req, res, next) => {
    // 书写业务逻辑
  try {
    // 1，获取用户信息
    const validValue = req.validValue
    // 检测用户是否存在
    let user = await User.findOne({ email: validValue.email })
    // 获取不到数据，数据库中没有数据，代表用户不存在
    if (!user) {
      return res.status(400).json({
        code: 400,
        msg: '用户名或密码错误'
      })
    }
    // 2，获取到用户信息，再检测密码的正确性
    // 通过bcrypt.compare方法，比较加密后的密码 是否一致
    const compareResult = await bcrypt.compare(validValue.password, user.password)
    // 如果不同。说明密码错误
    if (!compareResult) {
      return res.status(400).json({
        code: 400,
        msg: '用户名或密码错误'
      })
    }

    // 3,登录成功， 用户名存在，并且密码正确
    res.status(200).json({
      code: 200,
      msg: '登录成功',
      // 获取生成的token信息
      authorization: {
        access_token: user.generateToken()
      }
    })
  } catch (err) {
     // 如果出现报错，会进入catch执行， 使用错误中间件 统一处理
    next(err)
  }
}