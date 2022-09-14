const User = require('../models/users')
class UserCtl {
    async find(ctx) {
        ctx.body =  await User.find()
    }
    async findId(ctx){
        const user = await User.findById(ctx.params.id)
        if(!user) {ctx.throw(404, '用户找不到')}
        ctx.body = user
    }
    async update(ctx){
        ctx.verifyParams({
            name:{type: 'string', reauired: false },
            password:{type: 'string', reauired: false }
        })
        const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
        if(!user) {ctx.throw(404, '用户找不到')}
        ctx.body = user
    }
    async create(ctx){
        ctx.verifyParams({
            name:{type: 'string', reauired: true },
            password:{type: 'string', reauired: true }
        })
        const {name} = ctx.request.body
        const repeatUser = await User.findOne({name})
        if(repeatUser) {ctx.throw(409, '用户已经被占用')}
        const user = await new User(ctx.request.body).save()
        ctx.body = user
    }
    async delete(ctx){
        const user = await User.findByIdAndRemove(ctx.params.id)
        if(!user) {ctx.throw(404, '用户找不到')}
        ctx.body = user
    }
}
module.exports = new UserCtl()