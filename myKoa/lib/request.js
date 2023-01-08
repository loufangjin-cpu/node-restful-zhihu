// ! Koa 自己实现的请求对象

const url = require('url')

const request = {
  get url () {
    return this.req.url
  },

  get path () {
    return url.parse(this.req.url).pathname
  },

  get query () {
    return url.parse(this.req.url, true).query
  },

  get method () {
    return this.req.method
  }
}

module.exports = request
