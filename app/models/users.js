const mongoose = require('mongoose')
const {Schema, model} = mongoose
// 定义user 的文档结构类型
const userScheme = new Schema({
    __v: {type: Number, select: false},
    name: {type: String, require: true},
    // select: 隐藏密码
    password: {type: Number, require: true, select: false}
})
// 到处用户模型
module.exports = model('User', userScheme)