// 错误处理中间件

module.exports = (err, req, res, next) => {
  // 响应设置
  res.status(500).json({
    code: 500,
    msg: '服务端错误'
  })

  //在服务端输出错误信息
  console.log(err) 
}