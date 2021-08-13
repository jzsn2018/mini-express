/*
 * @Date: 2021-08-13 20:02:55
 * @LastEditors: Timothy
 * @LastEditTime: 2021-08-13 20:52:00
 * @Description: 
 */

const url = require('url');
const methods = require('../shared/methods');
const {
  pathToRegexp
} = require('path-to-regexp')

function Router() {
  this.stack = [];
}

// 收集路由栈
methods.forEach(function (method) {
  Router.prototype[method] = function (path, handler) {
    this.stack.push({
      path,
      handler,
      method,
    })
  }
})
Router.prototype.handle = function (req, res) {
  const {
    pathname
  } = url.parse(req.url);
  const method = req.method.toLowerCase();
  const route = this.stack.find(route => {
    const keys = [];
    console.log("🚀 ~ file: index.js ~ line 41 ~ route", route)
    const regexp = pathToRegexp(route.path, keys, {})
    console.log("🚀 ~ file: index.js ~ line 36 ~ regexp", regexp)
    console.log('pathname',pathname);
    const match = regexp.exec(pathname)
    return match && route.method === method
  });
  if (route) {
    return route.handler(req, res);
  }
  res.end('404 Not Found');
}

module.exports = Router;