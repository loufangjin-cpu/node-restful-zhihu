// ! Koa 自己实现的请求对象

const url = require('url')

const response = {
    set status(code) {
        this.res.statusCode = code;
    },
    get status() {
        return this.res.statusCode;
    },
    set body(val) {
        this._body = val;
    },
    get body() {
        return this._body;
    },
}

module.exports = response
