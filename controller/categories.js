// 用来书写  分类功能 的业务逻辑
// 引入 Category model数据
const { Category } = require('../model/categories')

// 获取全部内容 功能
exports.getAll = async (req, res, next) => {
  try {
    // 1，查询所有的分类信息
    const data = await Category.find()
    // 2,查询完成后返回响应
    res.status(200).json({
      code: 200,
      msg: '分类获取成功',
      data
    })
  } catch (err) {
    next(err)
  }
}
// 添加新的
exports.create = async (req, res, next) => {
  try {
    // 1, 检测当前添加的分类是否存在了
    const data = req.body
    let cate = await Category.findOne(data)
    // 如果有数据 就代表数据库中已经有了这个分类数据了 ，所以返回一个响应
    if (cate) {
      return res.status(400).json({
        code: 400,
        msg: '该分类信息已存在',
        value: data
      })
    }
    // 2，如果不存在分类信息，就创建数据并保存
    cate = new Category(data)
    await cate.save()
    // 返回成功信息
    res.status(200).json({
      code: 200,
      msg: '分类添加成功',
      data
    })
  } catch (err) {
    next(err)
  }
}
// 获取单个
exports.get = async (req, res, next) => {
  try {
    // 1,获取分类的id值，因为时通过 cid 传递的所以使用 cid传递
    const cid = req.params.cid
    if (!cid) {
      return res.status(400).json({
        code: 400,
        msg: '请传入分类 id'
      })
    }
    // 2，根据动态路由方式在数据库中获取分类
    const data = await Category.findById(cid)
    // 检测是否能够正确的获取到数据
    if (!data) {
      return res.status(400).json({
        code: 400,
        msg: '获取信息失败',
        value: {
          cid
        }
      })
    }
    // 检测通过，返回成功响应
    res.status(200).json({
      code: 200,
      msg: '分类信息获取成功',
      data
    })
  } catch (err) {
    next(err)
  }
}
// 编辑
exports.update = async (req, res, next) => {
  try {
    // 1，检测id 信息
    const cid = req.params.cid
    // 判断是否存在
    if (!cid) {
      return res.status(400).json({
        code: 400,
        msg: '请传入 id'
      })
    }
    // 2，根据动态路由参数更新数据
    // 参数1：根据什么检测。参数2:检测完成更新的内容,参数3: 返回的是更新后的结果
    const data = await Category.findByIdAndUpdate(cid, req.body, { new: true })
    // 3,判断是否编辑成功
    if (!data) {
      return res.status(400).json({
        code: 400,
        msg: '编辑分类失败',
        value: req.body
      })
    }
    // 4,成功后响应
    res.status(200).json({
      code: 200,
      msg: '编辑成功',
      data
    })
  } catch (err) {
    next(err)
  }
}
// 删除
exports.remove = async (req, res, next) => {
  try {
    // 1,根据动态路由的方式删除数据
    const cid = req.params.cid
    const data = await Category.findByIdAndDelete(cid)
    // 2,根据返回值判断是否删除成功
    if (!data) {
      return res.status(400).json({
        code: 400,
        msg: '分类删除失败',
        value: {
          cid
        }
      })
    }
    // 3,删除成功返回成功响应
    res.status(200).json({
      code: 200,
      msg: '删除成功',
      data
    })
  } catch (err) {
    next(err)
  }
}