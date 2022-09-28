// 数据校验中间件

// 导出一个函数
module.exports = (validator) => {
  // 返回处理结果
  return (req, res, next) => {
    // 取出数据 和 判断是否出现错误
    const { error, value } = validator(req.body)
    // 如果有错误，说明不满足规则， 返回一个错误码，和错误的详细内容
    if (error) {
      return res.status(400).json({
        code: 400,
        // error._original,可以看控制台， 此内容代表错误的值
        value: error._original,
        // error.details[0].message,可以看控制台， 此内容代表错误的信息
        msg: error.details[0].message
      })
    }
    // 数据校验通过，同是处成功
    // 给请求设置一个校验通过的属性validValue = 校验通过后返回的数据value
    req.validValue = value
    next()
  }
}