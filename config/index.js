// 内容导出
module.exports = {
  // 项目配置
  app: {
    // 默认是3000端口 
    // 判断如果没有process.env.PORT  就是 默认3000
    port: process.env.PORT || 3000
  },
  // 数据库设置 
  db: {
    url: process.env.MONGODB_URL ||'mongodb://localhost:27017/techinfoapi'
  },
  // 设置jwt使用密钥
  jwtPrivateKey: 'e3075c98-7d67-4a01-be14-f268fbadf321'
}