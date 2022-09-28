# Tech-info. 技术咨询

## 基本目录配置

![image-20220924154405862](/Users/yuho/Library/Application Support/typora-user-images/image-20220924154405862.png)

- 创建package.json文件

```shell
npm install init -y
创建一个默认配置的package.json文件
```

- 安装express

```shell
npm i express
```

- 在 app.js 入口文件引入 

```js
//. app.js
const express = require('express')

// 创建 express 实例对象 
const app = express()

// 设置一个简单请求
app.get('/', (req, res) => {
  res.send('ok')
})
// 监听端口 
app.listen(3000, () => {
  console.log('running at http://localhost:3000')
})
```

- 启动服务器

```shell
node app.js 
node app
注意跟目录问题
// nodemon可以在修改后 自动重启服务器
nodemon app.js
```

- 启动服务器成功

  ![image-20220924155528767](/Users/yuho/Library/Application Support/typora-user-images/image-20220924155528767.png)

![image-20220924155545146](/Users/yuho/Library/Application Support/typora-user-images/image-20220924155545146.png)

- 配置config

  - 新建index.js文件

    ```js
    // config/index.js
    // 内容导出
    module.exports = {
      // 项目配置
      app: {
        // 默认是3000端口 
        // 判断如果没有process.env.PORT  就是 默认3000
        port: process.env.PORT || 3000
      },
      // 数据库设置 
      db: {}
    }
    ```

  - 在 app.js 中引入

    ```js
    // 引入 config文件中的 index 配置文件
    const config = require('./config/index')
    console.log(config)
    
    ...
    
    // 监听端口 
    // 舰艇端口号  设置成config.app.port 
    app.listen(config.app.port, () => {
      console.log(`running at http://localhost:${config.app.port}`)
    })
    ```

  - 引入后运行 控制台输出回现实 index配置内容

    ![image-20220924160720851](/Users/yuho/Library/Application Support/typora-user-images/image-20220924160720851.png)

## 通过git管理项目

- github创建仓库

- 通过 git 将本地代码推送到远程仓库

  ```shell
  git init   // 初始化
  
  git add .   // 添加所有
  
  git commit -m "初始文件准备"
  
  git remote add origin https://github.com/yuho-99/tech-info.git
  git push -u origin master
  ```

  - 设置 不将nodo_modules推送

    ![image-20220924170816718](/Users/yuho/Library/Application Support/typora-user-images/image-20220924170816718.png)

## 基础中间键设置

- 引入 express.json()中间键 

  - 作用：可以将json文件直接变成 对象格式

- 引入 cors中间键  跨域相关设置

  ```shell
  npm i cors
  ```

  - 在 app.js中引入 

  ```js
  const cors = require('cors')
  
  app.use(cors())
  ```

- 引入 morgan 中间键

  ```shell
  npm i morgan
  ```

  - 在app.js中引入

  ```js
  const morgan = require('morgan')
  
  ...
   
  // app.use(morgan())
  app.use(morgan('dev'))
  ```

  - app.use(morgan())输出内容格式

    ![image-20220924173349366](/Users/yuho/Library/Application Support/typora-user-images/image-20220924173349366.png)

    ![image-20220924173402593](/Users/yuho/Library/Application Support/typora-user-images/image-20220924173402593.png)

  - app.use(morgan('dev')) 输出内容格式

![image-20220924173426351](/Users/yuho/Library/Application Support/typora-user-images/image-20220924173426351.png)

## 路由模块

### 接口功能

#### 基本接口文件配置

​	![image-20220924193213735](/Users/yuho/Library/Application Support/typora-user-images/image-20220924193213735.png)

- 在routes/index.js中 创建路由实例并导出模块

  ```js
  // routes/index.js
  // 创建router路由实例
  const router = require('express').Router()
  
  // 后续设置各个路由功能 测试请求
  router.get('/user', (req, res) => {
    res.send('user')
  })
  
  // 导出模块
  module.exports = router
  
  ```

- 设置统一前缀 /api 

  ```js
  // app.js
  ...
  // 引入路由中间件
  app.use('/api', require('./routes'))
  ...
  ```

#### 用户模块设置

- ```js
  //  routes/user.js
  // 创建 路由中间件
  // 创建路由实例
  const router = require('express').Router()
  // 注册接口设置
  router.post('/', (req, res, next) => {
    res.send('注册')
  })
  // 获取用户接口设置
  router.get('/', (req, res, next) => {
    res.send('获取用户')
  })
  // 编辑/更新用户
  router.put('/', (req, res, next) => {
    res.send('编辑')
  })
  // 删除用户
  router.delete('/', (req, res, next) => {
    res.send('删除')
  })
  
  // 导出
  module.exports = router
  ```

- index.js中引入

  ```js
  //  routes/index.js
  
  // 创建router路由实例
  const router = require('express').Router()
  
  // 后续设置各个路由功能
  // 引入 用户接口
  router.use('/user',require('./user'))
  
  // 导出模块
  module.exports = router
  ```

- 使用postman 测试

  - get请求

    ![image-20220924201559434](/Users/yuho/Library/Application Support/typora-user-images/image-20220924201559434.png)

  - post请求

    ![image-20220924201635926](/Users/yuho/Library/Application Support/typora-user-images/image-20220924201635926.png)

  - put请求

    ![image-20220924201656374](/Users/yuho/Library/Application Support/typora-user-images/image-20220924201656374.png)

  - delete请求

#### ![image-20220924201730599](/Users/yuho/Library/Application Support/typora-user-images/image-20220924201730599.png)登录模块设置

```js
//  routes/auth.js
// 登录认证接口

// 创建 路由中间件
// 创建路由实例
const router = require('express').Router()
// 注册接口设置
router.post('/', (req, res, next) => {
  res.send('登录')
})
// 导出
module.exports = router
```

```js
//. routes/index.js
// 引入登录接口
...
// 引入  登录接口
router.use('/auth', require('./auth'))
...
```

#### 分类模块设置

```js
//. routes/categoires.js
// 创建router 实例
const router = require('express').Router()

// 接口设置
//  获取全部
router.get('/', (req, res, next) => {
  res.send('获取全部')
})
// 获取单个
router.get('/:cid', (req, res, next) => {
  res.send('获取单个')
})
// 添加新的
router.post('/', (req, res, next) => {
  res.send('添加新的')
})
// 编辑单个
router.put('/:cid', (req, res, next) => {
  res.send('编辑单个')
})
// 删除单个
router.delete('/:cid', (req, res, next) => {
  res.send('删除某个')
})

// 导出
module.exports = router
```

```js
// routes/index.js
...
// 引入 分类接口
router.use('/categories', require('./categories'))
...
```

#### 文章模块

- 注意： 在获取所有文章时分两种情况：

  - 1，获取当前分类下所有文章
  - 2，获取所有文章

- 解决方式：

  - 思路一：设置查询参数，通过分类id获取文章

    ```js
    get('/articles?cid=xxxxx')
    ```

  - 思路二： 结合动态路由操作，本案例使用思路二

```js
//  routes/categories.js
...
// 获取某个分类下的 全部文章
router.get('/:cid/articles', (req, res, next) => {
  res.send('获取单个')
})
...
```

```js
//  routes/articles.js
// 创建 router实例
const router = require('express').Router()

// 获取全部
/*
注意： 在获取所有文章时分两种情况：

- 1，获取当前分类下所有文章
- 2，获取所有文章
*/
// 如需获取某个分类下的所有文章，通过参数传递条件即可
router.get('/', (req, res, next) => {
  res.send('获取全部')
})
// 获取某个
router.get('/:aid', (req, res, next) => {
  res.send('获取某个')
})
// 添加新的文章
router.post('/', (req, res, next) => {
  res.send('添加新的文章')
})
//  编辑信息 
router.put('/:aid', (req, res, next) => {
  res.send('编辑文章信息')
})
// 删除文章
router.delete('/:aid', (req, res, next) => {
  res.send('删除文章')
})

// 导出
module.exports = router
```

```js
// routes/index.js
...
// 引入 文章接口
router.use('/articles', require('./articles'))
...
```

## 数据模块

> 用于数据库操作

- 安装mongoose

  ```shell
  npm i mongoose
  ```

- 创建数据库相关

  - 安装mongodb
  - https://www.runoob.com/mongodb/mongodb-osx-install.html
  - navicat创建数据库

- 配置数据库相关内容

  - model文件夹下新建 index.js文件 

```js
// config/index.js
// 将数据库地址信息提取到 config文件内 统一管理
// 数据库设置 
  db: {
    url: process.env.MONGODB_URL ||'mongodb://localhost:27017/techinfoapi'
  }
```

```js
//	model/index.js
// 导入config配置中的 数据库地址
const config = require('../config')
// 引入mongoose
const mongoose = require('mongoose')
// 连接mongoDB
mongoose.connect(config.db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// 创建db实例
const db = mongoose.connection

// 成功或失败的 监听
db.on('error', err => {
  console.log('连接失败', err)
})
db.on('open', () => {
  console.log('连接成功')
})
```

```js
//	app.js
...
// 在引入路由中间件之前 引入数据库
// 引入数据库,模块
require('./model')

// 引入路由中间件
app.use('/api', require('./routes'))
...
```

### 用户数据模块

- 设置用户数据模块

  ```JS
  //   model/user.js
  // 引入 mongoose
  const mongoose = require('mongoose')
  
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
      maxLength: 50,
    }
  })
  
  // 创建user model 
  const User = mongoose.model('User', userSchema)
  
  // 导出
  module.exports = User
  
  ```

- 测试： 完成后测试数据已删除

  ```js
  //  routes/user.js
  ...
  const User = require('../model/user')
  // 注册接口设置
  router.post('/', (req, res, next) => {
    const user = new User({
      email: 'aaaaaa',
      name: 'li',
      password: '123123'
    })
    user.save((err) => {
      if (err) return console.error(err)
      console.log('yes')
    })
  
  
    res.send('注册')
  })
  ...
  ```

- postman测试后，输入错误信息终端会显示验证错误： 长度错误

![image-20220925104336954](/Users/yuho/Library/Application Support/typora-user-images/image-20220925104336954.png)

#### 用户数据校验

- 数据校验库介绍---- joi

  - https://www.npmjs.com/package/joi

    ```shell
    npm i joi
    ```

- 引入joi

  ```js
  //   model/user.js
  // 引入 mongoose
  const mongoose = require('mongoose')
  
  // 引入joi 数据校验库
  const Joi = require('joi')
  
  // 定义用户数据结构
  const userSchema = new mongoose.Schema({...})
  
  // 创建user model 
  const User = mongoose.model('User', userSchema)
  
  function userValidator(data) {
    // 设置数据校验
    const schema = Joi.object({
      // 字符串类型，email格式，去除首尾空格，自动转换大小写，必填
      email: Joi.string().email().trim().lowercase().required(),
      // 字符串格式，最小长度2，最大50
      name: Joi.string().min(2).max(50),
      // 字符串格式，正则（小写字母a-z，大写字母a-z，数字0-9， 6-18位数）， 必填
      password: Joi.string().pattern(/^[a-zA-Z0-9]{6,18}$/).required()
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
  ```

  

- 测试

  ```js
  //   routes/user.js
  ...
  const { userValidator } = require('../model/user')
  // 注册接口设置
  router.post('/', (req, res, next) => {
    //  使用测试校验
    console.log(userValidator(req.body))
    res.send('注册')
  })
  ...
  ```

- 测试结果

  - 输入错误

    ![image-20220925115003004](/Users/yuho/Library/Application Support/typora-user-images/image-20220925115003004.png)

    ![image-20220925115120688](/Users/yuho/Library/Application Support/typora-user-images/image-20220925115120688.png)

  - 输入正确

    ![image-20220925115248107](/Users/yuho/Library/Application Support/typora-user-images/image-20220925115248107.png)

    ![image-20220925115303353](/Users/yuho/Library/Application Support/typora-user-images/image-20220925115303353.png)

    

### 封装校验中间件

- 设置中间件相关

  ```js
  //   middleware/validate.js
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
  ```

- error._original,error.details[0].message 数据来源

  ![image-20220925145442341](/Users/yuho/Library/Application Support/typora-user-images/image-20220925145442341.png)

  

- 测试

  ```js
  //   routes/user.js
  ...
  // 测试 校验规则
  const { userValidator } = require('../model/user')
  // 测试 validate 
  const validator = require('../middleware/validate')
  // 注册接口设置
  router.post('/', validator(userValidator), (req, res, next) => {
    //  使用测试校验
    console.log(req.validValue, '校验后的数据')
    res.send('注册')
  })
  ...
  ```

  - 成功：

    ![image-20220925150945745](/Users/yuho/Library/Application Support/typora-user-images/image-20220925150945745.png)

    ![image-20220925150959368](/Users/yuho/Library/Application Support/typora-user-images/image-20220925150959368.png)

  - 失败

    ![image-20220925151027064](/Users/yuho/Library/Application Support/typora-user-images/image-20220925151027064.png)

    ![image-20220925151036990](/Users/yuho/Library/Application Support/typora-user-images/image-20220925151036990.png)

    

#### 自定义错误提示

- 使用joi 内容的messages()

- 格式

  ```shell
  'type类型作为属性名': '提示文本'
  type类型可以查看文档，或者错误提示的时候会输出type值，看下图
  ```

  ![image-20220925154656600](/Users/yuho/Library/Application Support/typora-user-images/image-20220925154656600.png)

- 设置自定义错误提示

  ```js
  //    model/user.js
  ...
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
      })
    })
    // 调用函数传入 要校验的 data
    return schema.validate(data)
  }
  ....
  ```

- 测试

  ![image-20220925155137717](/Users/yuho/Library/Application Support/typora-user-images/image-20220925155137717.png)

  

### 分类数据模块

- 大概功能和 user 内容相似

  ```js
  //   model/categories.js
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
  ```

  ```js
  //    routes/categories.js
  ...
  // 引入 校验规则
  const { categoryValidator } = require('../model/categories')
  // 引入 validate 
  const validator = require('../middleware/validate')
  ...
  // 使用校验规则
  
  // 添加新的
  router.post('/', validator(categoryValidator), (req, res, next) => {
    // 使用规则校验
    console.log(req.validValue, '校验后的数据')
    res.send('添加新的')
  })
  // 编辑单个
  router.put('/:cid', validator(categoryValidator), (req, res, next) => {
    // 使用规则校验
    console.log(req.validValue, '校验后的数据')
    res.send('编辑单个')
  })
  ```

  

### 文章数据模块

```js
//    model/articles.js
// 引入 mongoose
const mongoose = require('mongoose')
// 引入joi
const Joi = require('joi')

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
  // updatedAt 更新时间设置
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
})

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
      'any.only': 'valid取值错误，可选值为：published, drafted, trashed'
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
```

```js
//   routes/articles.js
...
// 引入 校验规则
const { articleValidator } = require('../model/articles')
// 引入 validate 
const validator = require('../middleware/validate')

// 添加新的文章
router.post('/', validator(articleValidator), (req, res, next) => {
  res.send('添加新的文章')
})
//  编辑信息 
router.put('/:aid', validator(articleValidator), (req, res, next) => {
  res.send('编辑文章信息')
})
...
```

- 测试 status 错误情况

  ![image-20220925180723015](/Users/yuho/Library/Application Support/typora-user-images/image-20220925180723015.png)

#### ObjectId类型检测

- 由于joi 没有检测ObjectId类型的功能，所以需要安装一个插件

- 插件名称： joi-objectid

- ```shell
  npm i joi-objectid
  ```

- 引入并设置

  ```js
  //    model/articles.js
  ...
  // 引入joi- objectid  ，直接把他注册给joi
  Joi.objectid = require('joi-objectid')(Joi)
  ...
  // 创建校验函数 
  function articleValidator(data) {
    const schema = Joi.object({
      ...
      category: Joi.objectid().required().messages({
        "string.pattern.name": "category 格式有误， 应为objectid格式",
        'any.required': 'category 为必填项'
      })
    })
    return schema.validate(data)
  }
  ...
  ```

- 测试

  ![image-20220925184142473](/Users/yuho/Library/Application Support/typora-user-images/image-20220925184142473.png)

- objectid 格式

  ![image-20220925184206926](/Users/yuho/Library/Application Support/typora-user-images/image-20220925184206926.png)

### 用户控制器模块

> MVC中的C部分

- 用来书写业务逻辑处理，可以将路由 和具体的 业务逻辑相分离
- 书写业务逻辑内容

```js
//    controller/user.js
// 注册功能
exports.register = (req, res, next) => {
  // 为了避免服务端出现一些错误，所以使用 try {} catch (err) {} 进行 异常捕获
  // 书写业务逻辑
  try {
    res.send('注册')
  } catch (err) {
    // 如果出现报错，会进入catch执行， 使用错误中间件 统一处理
    next(err)
  }
}
// 获取用户 接口功能
exports.getInfo = (req, res, next) => {
  // 书写业务逻辑
  try {
    res.send('获取')
  } catch (err) {
    next(err)
  }
}

// 编辑用户
exports.updateInfo = (req, res, next) => {
  // 书写业务逻辑
  try {
    res.send('编辑用户')
  } catch (err) {
    next(err)
  }
}

// 删除用户

exports.deleteUser = (req, res, next) => {
  // 书写业务逻辑
  try {
    res.send('删除')
  } catch (err) {
    next(err)
  }
}
```

- 将路由中的业务逻辑功能提取出来，并引入 controller/user 中设置的业务逻辑功能

```js
//  routes/user.js
// 创建 路由中间件
// 创建路由实例
const router = require('express').Router()
// 引入 校验规则
const { userValidator } = require('../model/user')
// 引入 validate 
const validator = require('../middleware/validate')
// 引入 业务逻辑模块
const user = require('../controller/user')

// 注册接口设置
router.post('/', validator(userValidator), user.register)
// 获取用户接口设置
router.get('/', user.getInfo)
// 编辑/更新用户
router.put('/', validator(userValidator), user.updateInfo)
// 删除用户
router.delete('/', user.deleteUser)

// 导出
module.exports = router

```

### 其他控制器模块

#### 登录认证控制器模块

- 书写业务逻辑

```js
//    controller/auth.js
exports.test = (req, res, next) => {
    // 书写业务逻辑
  try {
    // 成功后发送一条信息
    res.send('登录')
  } catch (err) {
     // 如果出现报错，会进入catch执行， 使用错误中间件 统一处理
    next(err)
  }
}
```

- 提取路由接口中的 业务逻辑内容 ，并设置

```JS
//   routes/auth.js
// 登录认证接口

// 创建 路由中间件
// 创建路由实例
const router = require('express').Router()
// 引入业务逻辑设置内容
const auth = require('../controller/auth')

// 注册接口设置
router.post('/', auth.test)
// 导出
module.exports = router
```

#### 分类控制器模块

- 书写业务逻辑

```js
//   controller/categories
// 获取全部内容 功能
exports.getAll = (req, res, next) => {
  try {
    res.send('获取全部')
  } catch (err) {
    next(err)
  }
}
// 添加新的
exports.create = (req, res, next) => {
  try {
    res.send('添加新的')
  } catch (err) {
    next(err)
  }
}
// 获取单个
exports.get = (req, res, next) => {
  try {
    res.send('获取单个')
  } catch (err) {
    next(err)
  }
}
// 编辑单个
exports.update = (req, res, next) => {
  try {
    res.send('编辑单个')
  } catch (err) {
    next(err)
  }
}
// 删除
exports.remove = (req, res, next) => {
  try {
    res.send('删除')
  } catch (err) {
    next(err)
  }
}
```

- 提取路由接口中的 业务逻辑内容 ，并设置

```JS
//   routes/categories
// 创建router 实例
const router = require('express').Router()
// 引入校验工具
// 引入 校验规则
const { categoryValidator } = require('../model/categories')
// 引入 validate 
const validator = require('../middleware/validate')
// 引入控制器 功能模块
const categories = require('../controller/categories')

// 接口设置
//  获取全部
router.get('/', categories.getAll)
// 获取单个
router.get('/:cid', categories.get)
// 获取某个分类下的 全部文章
router.get('/:cid/articles', (req, res, next) => {
  res.send('获取单个分类下的 全部文章')
})
// 添加新的
router.post('/', validator(categoryValidator), categories.create)
// 编辑单个
router.put('/:cid', validator(categoryValidator), categories.update)
// 删除单个
router.delete('/:cid', categories.remove)

// 导出
module.exports = router
```

#### 文章控制器模块

- 书写业务逻辑

```js
//   controller/articles.js
// 获取全部
exports.getAll = (req, res, next) => {
  try {
    res.send('获取全部')
  } catch (err) {
    next(err)
  }
}
// 添加新的
exports.create = (req, res, next) => {
  try {
    res.send('添加新的')
  } catch (err) {
    next(err)
  }
}
// 获取单个
exports.get = (req, res, next) => {
  try {
    res.send('获取单个')
  } catch (err) {
    next(err)
  }
}
// 编辑单个
exports.update = (req, res, next) => {
  try {
    res.send('编辑单个')
  } catch (err) {
    next(err)
  }
}
// 删除
exports.remove = (req, res, next) => {
  try {
    res.send('删除')
  } catch (err) {
    next(err)
  }
}
```

- 提取路由接口中的 业务逻辑内容 ，并设置

```JS
//   routes/articles.js
// 创建 router实例
const router = require('express').Router()
// 引入验证规则
// 引入 校验规则
const { articleValidator } = require('../model/articles')
// 引入 validate 
const validator = require('../middleware/validate')
// 引入 业务逻辑功能 模块
const articles = require('../controller/articles')

/*
注意： 在获取所有文章时分两种情况：

- 1，获取当前分类下所有文章
- 2，获取所有文章
*/
// 如需获取某个分类下的所有文章，通过参数传递条件即可
// 获取全部
router.get('/', articles.getAll)
// 获取某个
router.get('/:aid', articles.get)
// 添加新的文章
router.post('/', validator(articleValidator), articles.create)
//  编辑信息 
router.put('/:aid', validator(articleValidator), articles.update)
// 删除文章
router.delete('/:aid', articles.remove)

// 导出
module.exports = router
```



### 错误处理中间件

```js
//    middleware/error.js
module.exports = (err, req, res, next) => {
  // 响应设置
  res.status(500).json({
    code: 500,
    msg: '服务端错误'
  })

  //在服务端输出错误信息
  console.log(err) 
}
```

- App.js中引入
- 注意：引入位置需要在引入路由中间件后面，通常是最后的位置引入错误中间件

```js
// app.js
...
// 引入路由中间件
app.use('/api', require('./routes'))

// 引入错误处理中间件
app.use(require('./middleware/error'))
...
```

- 测试

```js
//  controller/articles.js
...
// 添加新的
exports.create = (req, res, next) => {
  try {
    // 测试错误中间件,通过设置一个不存在的 a 来引发错误
    console.log(a)
    res.send('添加新的')
  } catch (err) {
    next(err)
  }
}
...
```

- 测试结果---客户端，不显示具体信息

  ![image-20220925232850529](/Users/yuho/Library/Application Support/typora-user-images/image-20220925232850529.png)

- 测试结果----服务端，控制台输出具体错误信息，这样做的原因是为了避免客户端得知服务器的具体地址，从而引发安全问题

![image-20220925233033615](/Users/yuho/Library/Application Support/typora-user-images/image-20220925233033615.png)

## 用户注册接口设置

- 用户密码加密插件---bcrypt

  ```shell
  npm i bcrypt
  ```

- 注册接口功能设置

```js
//    controller/user.js
// 引入 User 模型 model 
const { User } = require('../model/user')

// 引入 bcrypt 加密
const bcrypt = require('bcrypt')
// 注册功能
exports.register = async (req, res, next) => {
  // 为了避免服务端出现一些错误，所以使用 try {} catch (err) {} 进行 异常捕获
  // 书写业务逻辑
  try {
    // 引入数据校验处理后的值
    let { email, password } = req.validValue
    // 1,判断用户名是否被注册过,查询邮箱是否已经被注册过
    // 由于User.findOne() 是mongoose提供的一个查询方法， 返回的数据都是promise，所以使用 async await 方式书写
    let user = await User.findOne({ email })
    // 检测是否存在获取到的用户信息，
    if (user) {
      // 如果已经存在了，就无法再次注册， 所以直接 return停止后面的操作
      return res.status(400).json({
        code: 400,
        msg: '用户已注册',
        data: { email }
      })
    }
    // 2, 检测完成后，说明是新用户，所以继续注册步骤
    // genSalt(10) 相当于设置加密等级
    const salt = await bcrypt.genSalt(10)
    // bcrypt.hash() 对密码进行加密处理，并将加密后的值 再赋值给 password
    password =  await bcrypt.hash(password, salt)
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
      data: { email }
    })

    res.send('注册')
  } catch (err) {
    // 如果出现报错，会进入catch执行， 使用错误中间件 统一处理
    next(err)
  }
}
...
```

- 由于设置了加密，所以需要把用户密码最大长度设置大一点

```js
//   model/user.js
...
const userSchema = new mongoose.Schema({
  ...
password: {
    type: String,
    required: true,
    minLength: 6,
    // 由于使用了 bcrypt加密密码， 所以长度需要修改
    maxLength: 1024,
  }
}
...
```

- 测试

  - 注册信息

  ![image-20220926004434037](/Users/yuho/Library/Application Support/typora-user-images/image-20220926004434037.png)

  - 查看数据库的信息

    ![image-20220926004515797](/Users/yuho/Library/Application Support/typora-user-images/image-20220926004515797.png)

- 测试如果用户名存在是否还能注册--正常返回“用户已注册信息”

  ![image-20220926004614891](/Users/yuho/Library/Application Support/typora-user-images/image-20220926004614891.png)


## 登录接口设置

- 由于使用了bcrypt 加密密码，所以在验证密码是否正确的时候需要使用bcrypt.compare()

```js
//   controller/auth.js
// 引入 User 模型
const { User } = require('../model/user')
//引入 bcrypt
const bcrypt = require('bcrypt')

exports.test = async (req, res, next) => {
    // 书写业务逻辑
  try {
    // 1，获取用户信息
    const validValue = req.validValue
    // 检测用户是否存在
    let user = await User.findOne({ email: validValue.email })
    // 获取不到数据，数据库中没有数据，代表用户不存在
    if (!user) {
      return res.status(400).json({
        code: 400,
        msg: '用户名或密码错误'
      })
    }
    // 2，获取到用户信息，再检测密码的正确性
    // 通过bcrypt.compare方法，比较加密后的密码 是否一致
    const compareResult = await bcrypt.compare(validValue.password, user.password)
    // 如果不同。说明密码错误
    if (!compareResult) {
      return res.status(400).json({
        code: 400,
        msg: '用户名或密码错误'
      })
    }

    // 3,登录成功， 用户名存在，并且密码正确
    res.status(200).json({
      code: 200,
      msg: '登录成功'
    })
  } catch (err) {
     // 如果出现报错，会进入catch执行， 使用错误中间件 统一处理
    next(err)
  }
}
```

- 给登录模块设置数据校验

```js
//    routes/auth.js
// 创建 路由中间件
// 创建路由实例
const router = require('express').Router()
// 引入业务逻辑设置内容
const auth = require('../controller/auth')
// 引入校验中间件
const validator = require('../middleware/validate')
const { userValidator } = require('../model/user')

// 注册接口设置
router.post('/', validator(userValidator), auth.test)
// 导出
module.exports = router
```

### 基于 jwt 的 Token 认证

- 安装jwt

  ```shell
  npm i jsonwebtoken
  ```

- 为指定数据加密的时候需要有一个密钥数据 -- UUID

  https://1024tools.com/uuid

- 将生成的UUID 设置在config配置文件中

  ```js
  // config/index.js
  // 内容导出
  module.exports = {
    // 项目配置
    app: {...},
    // 数据库设置 
    db: {...},
    // 设置jwt使用密钥
    jwtPrivateKey: 'e3075c98-7d67-4a01-be14-f268fbadf321'
  }
  ```

- 将token认证功能 封装在 user数据模型中

  ```js
  //    model/user.js
  ...
  // 引入jwt 与配置文件
  const jwt = require('jsonwebtoken')
  const config = require('../config')
  ...
  // 为User封装生成token的功能
  // 设置一个生成token的方法
  userSchema.methods.generateToken = function () {
    // 由于要使用  this  所以不要使用箭头函数，会改变this的指向，直接使用函数声明就可以
    return jwt.sign({
      _id: this._id
    }, config.jwtPrivateKey)
  }
  ...
  ```

- 登录成功时获取token信息

  ```JS
  //     controller/auth.js
  ...
  // 3,登录成功， 用户名存在，并且密码正确
      res.status(200).json({
        code: 200,
        msg: '登录成功',
        // 获取生成的token信息
        authorization: {
          access_token: user.generateToken()
        }
      })
  ...
  ```

  

### 接口鉴权与中间件设置

- 设置 获取用户 接口功能

  ```js
  //   controller/user.js
  ...
  // 引入 jwt 和配置文件
  const jwt = require('jsonwebtoken')
  const config = require('../config')
  ...
  // 获取用户 接口功能
  exports.getInfo = (req, res, next) => {
    // 书写业务逻辑
  
      // 接口鉴权，（ 约定，前端请求头中需要包含有效的 authorization 字段，值为 access_token）
      // 1, 保存数据
      const access_token = req.header('authorization')
      // 2,检测是否存在 access_token
      if (!access_token) {
        return res.status(401).json({
          code: 401,
          msg: '无token信息'
        })
      }
      try {
        // 3,存在 access_token 时验证是否有效
        // 给token 解密并赋值
        const userData = jwt.verify(access_token, config.jwtPrivateKey)
      // console.log(userData)    //{ _id: '633083ed209f3dc5deaefed3', iat: 1664178682 } // iat：时间
      } catch (err) {
        return res.status(401).json({
          code: 401,
          msg: 'token信息无效'
        })
      }
  
  
      try {
      res.send('获取')
    } catch (err) {
      next(err)
    }
  }
  ...
  ```

- 考虑到不仅只有这一个接口需要鉴权，所以将鉴权功能提取出来封装到一个单独模块中
  - middleware目录下新建auth.js文件用于设置 接口鉴权中间件

```js
//     middleware/auth.js
// 引入 jwt 和配置文件
const jwt = require('jsonwebtoken')
const config = require('../config')

// 导出
module.exports = function (req, res, next) {
  // 接口鉴权，（ 约定，前端请求头中需要包含有效的 authorization 字段，值为 access_token）
  // 1, 保存数据
  const access_token = req.header('authorization')
  // 2,检测是否存在 access_token
  if (!access_token) {
    return res.status(401).json({
      code: 401,
      msg: '无token信息'
    })
  }
  try {
    // 3,存在 access_token 时验证是否有效
    // 给token 解密并赋值
    const userData = jwt.verify(access_token, config.jwtPrivateKey)
    // 得到了 token 中存储的数据，也就是用户信息后 ， 保存起来供后续操作使用
    req.userData = userData
  // console.log(userData)    //{ _id: '633083ed209f3dc5deaefed3', iat: 1664178682 } // iat：时间
    // 调用next(),让程序继续执行
    next()
  } catch (err) {
    return res.status(401).json({
      code: 401,
      msg: 'token信息无效'
    })
  }
}
```

- 在路由文件=>user.js中使用

```js
//    routes/user.js
...
// 引入接口鉴权中间件
const auth = require('../middleware/auth')


// 鉴权中间件使用方法 ：  直接将auth设置在参数中   / 如果引入了 规则校验 则已数组的形式书写在参数中，将auth写在数据校验前
// 注册接口设置
router.post('/', [ auth,validator(userValidator) ], user.register)
// 获取用户接口设置
router.get('/', auth, user.getInfo)
// 编辑/更新用户
router.put('/', [ auth,validator(userValidator) ], user.updateInfo)
// 删除用户
router.delete('/', auth, user.deleteUser)
...
```

- 在路由文件=>articles.js中使用

```js
//    routes/articles.js
...
// 引入接口鉴权中间件
const auth = require('../middleware/auth')

// 获取全部
router.get('/', auth, articles.getAll)
// 获取某个
router.get('/:aid', auth, articles.get)
// 添加新的文章
router.post('/', [auth, validator(articleValidator)], articles.create)
//  编辑信息 
router.put('/:aid', [auth, validator(articleValidator)], articles.update)
// 删除文章
router.delete('/:aid', auth, articles.remove)
...
```

- 在路由文件=>categories.js中使用

```js
//    routes/categories.js
...
// 引入接口鉴权中间件
const auth = require('../middleware/auth')


// 接口设置
//  获取全部
router.get('/', auth, categories.getAll)
// 获取单个
router.get('/:cid', auth, categories.get)
// 获取某个分类下的 全部文章
router.get('/:cid/articles', (req, res, next) => {
  res.send('获取单个分类下的 全部文章')
})
// 添加新的
router.post('/', [auth, validator(categoryValidator)], categories.create)
// 编辑单个
router.put('/:cid', [auth, validator(categoryValidator)], categories.update)
// 删除单个
router.delete('/:cid', auth, categories.remove)
...
```

## 用户接口

### 获取用户信息接口

```js
//   controller/user.js
...
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
    res.send('获取')
  } catch (err) {
    next(err)
  }
}
...
```

### 编辑用户接口设置

- 设置_id 的joi数据校验

  ```js
  //    model/user.js
  ...
  // 校验函数
  function userValidator(data) {
    // 设置数据校验
    const schema = Joi.object({
      ...
      _id: Joi.objectId()
    })
    // 调用函数传入 要校验的 data
    return schema.validate(data)
  }
  ...
  ```

  

```JS
//   controller/user.js
...
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
...
```

### 删除用户接口功能

```js
//   controller/user.js
...

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
```

## 分类接口

### 添加分类接口

- 由于目前没有任何分类，所以首先设置添加分类接口

```js
//    controller/categories.js
// 引入 Category model数据
const { Category } = require('../model/categories')
...
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
```

### 获取全部分类和获取某个分类接口

- 获取全部分类

```JS
//    controller/categories.js
...
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
...
```

- 获取单个分类信息

```JS
//    controller/categories.js
...
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
...
```

### 编辑分类接口

```js
//    controller/categories.js
...
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
...
```

### 删除分类接口

```js
//    controller/categories.js
...
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
```

## 文章接口

### 添加文章接口

```js
//    controller/articles.js
// 引入article model 
const { Article } = require('../model/articles')
...
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
...
```

### 查询所有文章接口

- 查询所有文章不加条件
- 通过此方法确实能够查询所有文章，但正常情况下，查询文章时可能需要通过分类/status状态等内容进行查询，所以需要判断是否传递参数

```js
//    controller/articles.js
...
// 引入article model 
const { Article } = require('../model/articles')
// 获取全部
exports.getAll = async (req, res, next) => {
  try {
    // 获取所有文章
    // 1， 查询数据库
    const data = await Article.find()
    // 2,返回响应
    res.status(200).json({
      code: 200,
      msg: '查询所有文章成功',
      data
    })
    res.send('获取全部')
  } catch (err) {
    next(err)
  }
}
...
```

- 如果传入筛选参数，就需要按照参数查询对应的文章,修改后如下

```js
//    controller/articles.js
...
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
...
```

### 获取指定文章接口

```js
//    controller/articles.js
...
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
...
```

### 编辑文章接口

```js
//    controller/articles.js
...
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
...
```

```js
//     model/articles.js
...
// 定义文章数据结构
// 在第二个参数中添加一个时间自动更新的效果
const articleSchema = new mongoose.Schema({...}, { timestamps: true })
```

### 删除文章接口

```JS
//    controller/articles.js
...
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
...
```

### 删除用户接口改进

- 改进内容： 在删除用户的同时删除此用户创建的所有文章

```js
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
```

