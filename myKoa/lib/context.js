// !上下文对象

const context = {
    
}
defineProperty('request', 'method')
defineProperty('request', 'url')
function defineProperty (target, name) {
    Object.defineProperty(context, name, {
        get() {
            return this[target][name]
        },
        set(value) {
        this[target][name] = value
        }
    })
}
console.log('context/////', context);
module.exports = context