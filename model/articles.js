// 文章数据模块

// 引入 mongoose
const mongoose = require('mongoose')
// 引入joi
const Joi = require('joi')
// 引入joi- objectid  ，直接把他注册给joi
Joi.objectid = require('joi-objectid')(Joi)

// 定义文章数据结构
const articleSchema = new mongoose.Schema({
  // title 标题设置
  title: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50
  },
  // content 内容设置
  content: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 200
  },
  // status  状态设置
  status: String,
  // createdAt 创建时间设置
  createdAt: {
    type: Date,
    default: Date.now
  },
  // updatedAt 更新修改时间设置
  updatedAt: {
    type: Date,
    default: Date.now
  },
  // category  分类设置
  category: {
    // 类型应该是分类id
    type: mongoose.Schema.Types.ObjectId,
    // 从哪个表获取
    ref: 'Category',
    required: true
  },
  // author    作者设置
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
  // 添加一个时间自动更新的效果
}, { timestamps: true })

// 创建Article model 
const Article = mongoose.model('Article', articleSchema)

// 创建校验函数 
function articleValidator(data) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(50).required(),
    content: Joi.string().min(2).max(200).required(),
    // valid('published', 'drafted', 'trashed'),代表只能是 参数内的数据 才能通过验证
    status: Joi.string().valid('published', 'drafted', 'trashed').required().messages({
      'string.base': ' status 必须为string格式',
      'any.required': 'status 为必填项',
      'any.only': ' status 取值错误，可选值为：published, drafted, trashed'
    }),
    category: Joi.objectid().required().messages({
      "string.pattern.name": "category 格式有误， 应为objectid格式",
      'any.required': 'category 为必填项'
    })
  })
  return schema.validate(data)
}

// 导出
module.exports = {
  // 导出 model
  Article,
  // 导出验证规则函数
  articleValidator
}