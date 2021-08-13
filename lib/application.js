/*
 * @Date: 2021-08-13 19:54:37
 * @LastEditors: Timothy
 * @LastEditTime: 2021-08-13 20:31:14
 * @Description: 
 */
const http = require('http');
const Router = require('./router/index');
const methods = require('./shared/methods');

function App() {
  this._router = new Router();
}

//* 将所有的 http 的方法提前注册在 App对象的原型上， 供 app 去调用
//* app 一但调用 就会触发 this._router 对应的方法， 将对应的 path 和 与之对应的 回调函数 推入栈中
methods.forEach(function (method) {
  App.prototype[method] = function (path, handler) {
    this._router[method](path, handler);
  }
})

App.prototype.listen = function (...args) {
  const server = http.createServer((req, res) => {
    this._router.handle(req, res);
  })
  server.listen(...args);
}

module.exports = App;