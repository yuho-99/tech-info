// 分类数据模块

// y引入 mongoose
const mongoose = require('mongoose')
// 引入joi
const Joi = require('joi')

// 定义分类数据结构
const categorySchema = new mongoose.Schema({
  // name 设置
  name: {
    type: String,
    required: true,
    maxLength: 50,
    minLength: 2
  }
})

// 创建category model 
const Category = mongoose.model('Category', categorySchema)

// 校验函数
function categoryValidator (data) {
  // 设置数据校验
  const schema = Joi.object({
    // 字符串类型，最少2，最大50，必填
    name: Joi.string().max(50).min(2).required().messages({
      'any.required': '缺少必选参数 name',
      'string.base': 'name 必须为string',
      'string.min': 'name 最少2个字符',
      'string.max': 'name 最多50个字符'
    })
  })
  return schema.validate(data)
}

// 导出
module.exports = {
  // 导出model
  Category,
  // 导出校验函数
  categoryValidator
}