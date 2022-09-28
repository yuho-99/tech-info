// 用来书写  user 用户 的业务逻辑
// 引入 User 模型 model 
const { User } = require('../model/user')
// 引入 articles model
const { Article } = require('../model/articles')

// 引入 bcrypt 加密
const bcrypt = require('bcrypt')


// 注册功能接口功能
exports.register = async (req, res, next) => {
  // 为了避免服务端出现一些错误，所以使用 try {} catch (err) {} 进行 异常捕获
  // 书写业务逻辑
  try {
    // 引入数据校验处理后的值
    let {
      email,
      password
    } = req.validValue
    // 1,判断用户名是否被注册过,查询邮箱是否已经被注册过
    // 由于User.findOne() 是mongoose提供的一个查询方法， 返回的数据都是promise，所以使用 async await 方式书写
    let user = await User.findOne({
      email
    })
    // 检测是否存在获取到的用户信息，
    if (user) {
      // 如果已经存在了，就无法再次注册， 所以直接 return停止后面的操作
      return res.status(400).json({
        code: 400,
        msg: '用户已注册',
        data: {
          email
        }
      })
    }
    // 2, 检测完成后，说明是新用户，所以继续注册步骤
    // genSalt(10) 相当于设置加密等级
    const salt = await bcrypt.genSalt(10)
    // bcrypt.hash() 对密码进行加密处理，并将加密后的值 再赋值给 password
    password = await bcrypt.hash(password, salt)
    // 3,创建一个User实例
    user = new User({
      // 处理完成的数据添加到 User实例中
      email,
      password,
      // 设置一个默认用户名
      name: 'vip'
    })
    // 4,存储数据 ,到数据库中
    await user.save()
    // 5,响应
    res.status(200).json({
      code: 200,
      msg: '注册成功',
      data: {
        email
      }
    })
  } catch (err) {
    // 如果出现报错，会进入catch执行， 使用错误中间件 统一处理
    next(err)
  }
}
// 获取用户 接口功能
exports.getInfo = async (req, res, next) => {
  // 书写业务逻辑
  try {
    // 1，查询用户信息
    const data = await User.findById(req.userData._id, { password: 0 })
    // 2，发送响应到客户端
    res.status(200).json({
      code: 200,
      msg: '获取用户信息成功',
      data
    })
  } catch (err) {
    next(err)
  }
}

// 编辑用户接口功能 
exports.updateInfo = async (req, res, next) => {
  // 书写业务逻辑
  try {
    // 1,查询用户信息
    // 检测是否存在_id参数
    const body = req.body
    if (!body._id) {
      return res.status(400).json({
        code: 400,
        msg: '缺少必要参数 _id'
      })
    }
    // genSalt(10) 相当于设置加密等级
    const salt = await bcrypt.genSalt(10)
    // bcrypt.hash() 对密码进行加密处理
    body.password = await bcrypt.hash(body.password, salt)
    // 2,存在用户 id， 查找并更新用户
    const data = await User.findByIdAndUpdate(body._id, body)
    // console.log(data)
    // 3,判断data 失败返回错误信息
    if (!data) {
      return res.status(400).json({
        code: 400,
        msg: '编辑信息失败'
      })
    }
    // 注意：响应 body数据的时候可能会包含密码，所以需要将密码删除掉
    delete body.password
    // 4，成功后的响应
    res.status(200).json({
      code: 200,
      msg: '编辑成功',
      data: body
    })
  } catch (err) {
    next(err)
  }
}

// 删除用户接口功能
exports.deleteUser = async (req, res, next) => {
  // 书写业务逻辑
  try {
    // 获取id
    const id = req.body._id
    // 1, 检测是否存在id
    if (!id) {
      return res.status(400).json({
        code: 400,
        msg: '请传入id值'
      })
    }
    // 2，根据id找到指定的用户 做删除处理
    const data = await User.findByIdAndDelete(id)
    // console.log(data)
    // 通过控制台查看到，如果重复删除也可以执行，但是第二次删除 会显示 data为 null
    // 判断 如果 data为 null 代表数据已经删除过了，再次删除失败，所以返回一个错误
    // 2.1 删除用户发布过文的文章信息
    await Article.remove({
      author: id
    })

    if (!data) {
      return res.status(400).json({
        code: 400,
        msg: '删除用户失败',
        value: {
          _id: id
        }
      })
    }
    // 删除成功返回响应
    res.status(200).json({
      code: 200,
      msg: '删除用户成功'
    })
  } catch (err) {
    next(err)
  }
}