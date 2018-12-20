const proxy = require('http-proxy-middleware')

module.exports = app => {
  //FORWARDING FOR EVERYTHING UNDER AUTH
  app.use('/auth', proxy({target: 'http://localhost:4000'}));
  app.use('/api',proxy({target: 'http://localhost:4000'}));
  //DONT HAVE AN API BUT WILL MAKE ONE FULL OF OUR QUOTES
}