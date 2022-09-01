const Router = require('koa-router')
const myRouter = new Router()
const {find, create, update, findId, delete:deleteUser} = require('../controllers/user')
// 路有前缀
myRouter.prefix('/users')
myRouter.get('/:id', findId)
myRouter.get('/', find)
myRouter.post('/create', create)
myRouter.post('/update', update)
myRouter.delete('/delete', deleteUser)
module.exports = myRouter