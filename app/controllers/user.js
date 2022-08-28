class UserCtl {
    find(ctx) {
        ctx.body = `这是自定义 - user`
    }
    findId(ctx){
        ctx.body = `这是get ${ctx.params.id}`
    }
    update(ctx){}
    create(ctx){}
    delete(ctx){}
}
module.exports = new UserCtl()