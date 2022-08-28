const Router = require('koa-router')
const myRouter = new Router()
const {find} = require('../controllers/user')
// 路有前缀
myRouter.prefix('/users')
myRouter.get('/:id', find)
module.exports = myRouter