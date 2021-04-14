const Router = require('express').Router();

Router.get('/', function (req, res, next) {
  res.send('Welcome adjarra project');
});
Router.get('/api/main', function (req, res, next) {
  res.json({
    name: 'Cyrille Senami Hounvio',
    email: 'cyrisenahoun@gmail.com',
    platform: 'adjarra project',
  });
});

module.exports = Router;
