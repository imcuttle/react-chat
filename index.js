
var webpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');

var config = require("./webpack.config.js");


config.entry.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");

var compiler = webpack(config);
var server = new webpackDevServer(compiler, {
  hot: true,
  contentBase: './build',
  setup: function(app) {
    // Here you can access the Express app object and add your own custom middleware to it.
    // For example, to define custom handlers for some paths:
    // app.get('/some/path', function(req, res) {
    //   res.json({ custom: 'response' });
    // });
  },
  inline: true,
  stats: { 
  	colors: true,
  	progress: true
  },
  // devtool: 'eval',
  publicPath: '/'
});
server.listen(8080);