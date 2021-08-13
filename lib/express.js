/*
 * @Date: 2021-08-13 19:32:54
 * @LastEditors: Timothy
 * @LastEditTime: 2021-08-13 20:15:32
 * @Description: 
 */


const App = require('./application')

function createApplication() {
  const app = new App();
  return app;
}

module.exports = createApplication;