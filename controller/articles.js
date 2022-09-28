//  文章设置 功能模块

// 引入article model 
const { Article } = require('../model/articles')
// 获取全部
exports.getAll = async (req, res, next) => {
  try {
    // 获取所有文章
    // 1,判断是否传递筛选参数,例如分类筛选或草稿状态
    let data
    const { status, category } = req.query
    // 判断 如果两个参数有一个的话 就按照参数筛选查询
    if ( status || category ) {
      //  查询数据库
      data = await Article.find(req.query)
    } else {
      // 如果没有参数，就查询全部文章
      data = await Article.find()
    }
    // 2,返回响应
    res.status(200).json({
      code: 200,
      msg: '查询文章成功',
      data
    })
  } catch (err) {
    next(err)
  }
}
// 添加新的
exports.create = async (req, res, next) => {
  try {
    // console.log(req.body)
    // console.log(req.userData)
    // 将req.body和req.userData 通过 Object.assign方式  合并为一个对象进行操作
    // console.log(Object.assign(req.body, { author: req.userData._id }))
    // 1，创建并存储数据
    const data = new Article(Object.assign(req.body, { author: req.userData._id }))
    await data.save()
    // 2，成功后返回响应
    res.status(200).json({
      code: 200,
      msg: '文章创建成功',
      data
    })
  } catch (err) {
    next(err)
  }
}
// 获取单个
exports.get = async (req, res, next) => {
  try {
    // 1,根据id获取数据
    const id = req.params.aid
    // 2,查找数据库
    // 通过populate()方法链表查询关联 category和author
    const data = await Article.findById(id).populate('category author', 'name')
    // 2,检测是否存在数据
    if (!data) {
      return res.status(400).json({
        code: 400,
        msg: '获取文章失败',
        value: {
          id
        }
      })
    }
    // 获取成功
    res.status(200).json({
      code: 200,
      msg: '获取文章成功',
      data
    })
    
  } catch (err) {
    next(err)
  }
}
// 编辑单个
exports.update = async (req, res, next) => {
  try {
    // 1， 修改数据
    const data = await Article.findByIdAndUpdate(req.params.aid, req.body, { new: true })
    // 2,检测并响应
    if (!data) {
      return res.status(400).json({
        code: 400,
        msg: '文章修改失败',
        value: Object.assign(req.body, {
          _id: req.params.aid
        })
      })
    }
    res.status(200).json({
      code: 200,
      msg: '文章修改成功',
      data
    })
  } catch (err) {
    next(err)
  }
}
// 删除
exports.remove = async (req, res, next) => {
  try {
    // 1， 根据id查找要删除的信息
    const id = req.params.aid
    const data = await Article.findByIdAndDelete(id)
    // 2，判断是否成功 返回响应
    if (!data) {
      return res.status(400).json({
        code: 400,
        msg: '删除失败',
        value: {
          id
        }
      })
    }
    // 3,成功响应
    res.status(200).json({
      code: 200,
      msg: '删除成功',
      data
    })
  } catch (err) {
    next(err)
  }
}