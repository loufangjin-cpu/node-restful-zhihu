// ! 最核心的模块
const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')

class Application {
  constructor() {
    this.middleware = [] // 保存用户添加的中间件函数

    // 为了防止多个实例共享 Request、Response、Context 导致数据被意外修改，这里重新拷贝一份
    this.request = Object.create(request)
    this.response = Object.create(response)
    this.context = Object.create(context)
  }

  listen(...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }

  use(fn) {
    this.middleware.push(fn)
  }

  // 异步递归遍历调用中间件处理函数
  compose(middleware) {
    return function (context) {
      const dispatch = index => {
        if (index >= middleware.length) return Promise.resolve()
        const fn = middleware[index]
        return Promise.resolve(
          // TODO: 上下文对象
          fn(context, () => dispatch(index + 1)) // 这是 next 函数
        )
      }

      // 返回第 1 个中间件处理函数
      return dispatch(0)
    }
  }

  createContext(req, res) {
    // 为了避免请求之间 context 数据交叉污染，这里为每个请求单独创建 context 请求对象
    const context = Object.create(this.context)
    const request = Object.create(this.request)
    const response = Object.create(this.response)

    context.app = request.app = response.app = this
    context.req = request.req = response.req = req // 原生的请求对象
    context.res = request.res = response.res = res // 原生的响应对象
    request.ctx = response.ctx = context // 在 Request 和 Response 中也可以拿到 context 上下文对象
    request.response = response // Request 中也可以拿到 Response
    response.request = request // Response 中也可以拿到 Request
    context.originalUrl = request.originalUrl = req.url // 没有经过任何处理的请求路径
    context.state = {} // 初始化 state 数据对象，用于给模板视图提供数据
    console.log('context', context)
    return context
  }

  callback() {
    const fnMiddleware = this.compose(this.middleware)
    const handleRequest = (req, res) => {
      // 1、创建上下文请求对象
      const context = this.createContext(req, res)

      // 2、传入上下文对象执行中间件栈
      fnMiddleware(context)
        .then(() => {
          res.end(respond(context))
        })
        .catch(err => {
          res.end(err.message)
        })
    }

    return handleRequest
  }
}
function respond (ctx) {
    const body  = ctx.body
    const res  = ctx.res
    if(body === null) {
        res.statusCode = 204
        return res.end()
    } 
    res.end(ctx.body)
}

module.exports = Application

