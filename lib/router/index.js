/*
 * @Date: 2021-08-13 20:02:55
 * @LastEditors: Timothy
 * @LastEditTime: 2021-08-13 21:06:55
 * @Description: 
 */

const url = require('url');
const methods = require('../shared/methods');
const pathToRegexp = require('path-to-regexp')

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
    const keys = []; // An array to populate with keys found in the path.
    const regexp = pathToRegexp(route.path, keys, {})
    //! keys result
    // [
    //   { name: 'userId', optional: false, offset: 5 },
    //   { name: 'reportId', optional: false, offset: 20 }
    // ]
    //! match result
    // [
    //   '/ab/32/45',
    //   '32',
    //   '45',
    //   index: 0,
    //   input: '/ab/32/45',
    //   groups: undefined
    // ]
    const match = regexp.exec(pathname)
    // 动态路由绑定 到 req.params对象上
    if (match) {
      req.params = req.params || {};
      keys.forEach((key, index) => {
        req.params[key.name] = match[index + 1]
      })
    }

    return match && route.method === method
  });
  if (route) {
    return route.handler(req, res);
  }
  res.end('404 Not Found');
}

module.exports = Router;