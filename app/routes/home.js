const Router = require('koa-router')
const cusRouter = new Router()
const {create, findId} = require('../controllers/home')
// 路有前缀
cusRouter.prefix('/home')
cusRouter.get('/:id', findId)
cusRouter.post('/create', create)
// cusRouter.get('/:id', (ctx) => {
//     ctx.body = `这是get ${ctx.params.id}`
// })
// cusRouter.post('/get', (ctx) => {
//     console.log(ctx);
//     ctx.body = `这是自定义路有post`
// })
module.exports = cusRouter