const Router = require('express').Router()

// 引入 Model
const { Category } = require('../../model/categories')
const { Article } = require('../../model/articles')

// 首页路由与分类路由
Router.get(['/', '/:cid'], async (req, res) => {
  // 1 读取数据库，获取分类数据
  const cate = await Category.find()

  // 2 获取文章数据
  const current = req.params.cid
  const options = {
    status: 'published'
  }

  if (current) {
    options.category = current
  }
  const article = await Article.find(options).populate('category author', 'name')

  // 将数据传递给模板引擎
  res.render('index.html', {
    cate,
    current,
    article
  })
})

// 文章页路由
Router.get('/articles/:articleId', async (req, res) => {
  // 1 处理 current
  const current = '非首页无需显示'
  // 2 获取分类数据
  const cate = await Category.find()
  // 3 获取文章数据
  const article = await Article.findById(req.params.articleId).populate('category author', 'name')

  // 将数据传递给模板引擎
  res.render('article.html', {
    cate,
    current,
    article
  })
})


module.exports = Router