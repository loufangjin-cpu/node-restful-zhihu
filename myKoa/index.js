/**
 * Koa Context
 */


 const Koa = require('./lib/application.js')

 const app = new Koa()
 
 // Koa Context 将 node 的 request 和 response 对象封装到单个对象中，为编写 Web 应用程序和 API 提供了许多有用的方法。
 // 每个请求都将创建一个 Context，并在中间件中作为参数引用
 app.use((ctx, next) => {
    ctx.body='hello'
   console.log(ctx.request) // Context 对象
 
//    console.log(ctx.req) // Node 的 request 对象
//    console.log(ctx.res) // Node 的 response 对象
   
//    console.log(ctx.request) // Koa 中封装的请求对象
//    console.log(ctx.request.header) // 获取请求头对象
//    console.log(ctx.request.method) // 获取请求方法
//    console.log(ctx.request.url) // 获取请求路径
//    console.log(ctx.request.path) // 获取不包含查询字符串的请求路径
//    console.log(ctx.request.query) // 获取请求路径中的查询字符串
 
//    // Request 别名
//    // 完整列表参见：https://koa.bootcss.com/#request-
//    console.log(ctx.header)
//    console.log(ctx.method)
//    console.log(ctx.url)
//    console.log(ctx.path)
//    console.log(ctx.query)
 
 
//    // Koa 中封装的响应对象
//    console.log(ctx.response)
   
//    // Response 别名
//    ctx.status = 200
//    ctx.message = 'Success'
//    ctx.type = 'plain'
//    ctx.body = 'Hello Koa'
   
 })
 
 app.listen(3000, () => {
    console.log('监听成功')
 })
 