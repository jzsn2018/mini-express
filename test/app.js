/*
 * @Date: 2021-08-13 19:53:57
 * @LastEditors: Timothy
 * @LastEditTime: 2021-08-13 20:45:48
 * @Description: 
 */

const miniExpress = require('../index')

const app = miniExpress();


app.listen(3000, () => {
  console.log('listening on http://localhost:3000');
})


app.get('/', (req, res) => {
  res.end('Hello world, This is miniExpress Framework');
})
app.get('/about', (req, res) => {
  res.end('/about');
})
app.get('/ab?cd', (req, res) => {
  res.end('ab?cd');
})
app.get('/ab+cd', (req, res) => {
  res.end('/ab+cd');
})
app.get('/ab*cd', (req, res) => {
  res.end('/ab*cd');
})