const mongoose = require('mongoose')
const {Schema, model} = mongoose
// 定义user 的文档结构类型
const userScheme = new Schema({
    name: {type: String, require: true},
    age: {type: Number, default: 0}
})
// 到处用户模型
module.exports = model('User', userScheme)