class HomeCtl {
    find(ctx) {
    }
    findId(ctx){
        ctx.body = `这是get ${ctx.params.id}`
    }
    update(ctx){}
    create(ctx){
        ctx.verifyParams({
            name:{type: 'string', reauired: true }
        })
        ctx.body = `这是自定义 - home`
    }
    delete(ctx){}
}
module.exports = new HomeCtl()