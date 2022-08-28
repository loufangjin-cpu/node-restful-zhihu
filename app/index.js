const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const app = new Koa()
const routesMethod = require('./routes')
// 错误处理, 优化错误处理, 生产环境不返回stack，开发环境返回stack, 避免stack 泄漏文件信息
app.use(error({
    postFormat:(e, {stack, ...rest}) => process.env.NODE_ENV === 'PRO' ? rest : {
        stack, ...rest
    }
}))
// 获取请求体参数的中间件 bodyparser
app.use(bodyparser())
// 是一个全局的方法,传入app最好
app.use(parameter(app))
// 注册路由
// allowedMethods 可以发起预检请求，检测出该请求支持的所有支持的请求方法
// app.use(myRouter.routes()).use(myRouter.allowedMethods())
// app.use(cusRouter.routes()).use(cusRouter.allowedMethods())
// 动态设置路由结构
routesMethod(app)
app.listen(3000, () => {
    console.log('监听端口成功');
})
