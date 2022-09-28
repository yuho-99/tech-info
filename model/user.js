// 用户数据模块

// 引入 mongoose
const mongoose = require('mongoose')

// 引入joi 数据校验库
const Joi = require('joi')
// 引入joiobject
Joi.objectId = require('joi-objectid')(Joi)

// 引入jwt 与配置文件
const jwt = require('jsonwebtoken')
const config = require('../config')

// 定义用户数据结构
const userSchema = new mongoose.Schema({
  // 邮箱设置
  email: {
    // 类型 --- 字符串
    type: String,
    // 是否必填
    required: true,
    // 最小长度
    minLength: 6,
    // 最大长度
    maxLength: 50,
    // 定义一个唯一索引
    unique: true
  },
  // 用户名称
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  // 密码设置
  password: {
    type: String,
    required: true,
    minLength: 6,
    // 由于使用了 bcrypt加密密码， 所以长度需要修改
    maxLength: 1024,
  }
})

// 为User封装生成token的功能
// 设置一个生成token的方法
userSchema.methods.generateToken = function () {
  // 由于要使用  this  所以不要使用箭头函数，会改变this的指向，直接使用函数声明就可以
  return jwt.sign({
    _id: this._id
  }, config.jwtPrivateKey)
}

// 创建user model 
const User = mongoose.model('User', userSchema)

// 校验函数
function userValidator(data) {
  // 设置数据校验
  const schema = Joi.object({
    // 字符串类型，email格式，去除首尾空格，自动转换大小写，必填
    email: Joi.string().email().trim().lowercase().required().messages({
      'any.required': '缺少必选参数 email',
      'string.email': ' email 格式错误',
      'string.base': 'email 必须为string'
    }),
    // 字符串格式，最小长度2，最大50
    name: Joi.string().min(2).max(50).messages({
      'string.max': 'name 最多50个字符',
      'string.min': 'name 最少2个字符',
      'string.base': 'name 必须为string'
    }),
    // 字符串格式，正则（小写字母a-z，大写字母a-z，数字0-9， 6-18位数）， 必填
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,18}$/).required().messages({
      'any.required': '缺少必选参数 password',
      'string.pattern.base': '密码不符合规则',
      'string.base': 'password 必须为string'
    }),
    _id: Joi.objectId()
  })
  // 调用函数传入 要校验的 data
  return schema.validate(data)
}

// 导出
module.exports = {
  // 导出user model模块
  User,
  // 导出 校验规则
  userValidator
}