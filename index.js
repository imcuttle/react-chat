
var webpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var session = require('express-session');
var bodyParser = require('body-parser');
var crypto = require('crypto');
function md5 (text) {
  return crypto.createHash('md5').update(text).digest('hex');
};

var config = require("./webpack.config.js");
var sendMail = require("./smtp");
var api = require("./api");

config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");

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
/*
就是用户和机器人聊天，关键部分是：机器人问他需要什么样的电影？
用户会说：一个男孩会魔法的电影。
这时候就是要抽取关键词或者句子吧去调用wimm的api，
获得电影推荐信息，机器人会将前10的电影信息以列表形式显示给用户，用户可以点击进去查看详细信息。
这是基本的功能，然后可以加上给推荐的电影打分的功能，就是看机器人的推荐符合度是多少，也可以要求将电影信息（应该是一个imdb链接之类的吧）发送到自己的邮箱，
*/
    app.use(bodyParser.json({limit:'5mb'}));
    app.use(bodyParser.raw({limit:'5mb'}));
    app.use(bodyParser.urlencoded({ extended: false, limit:'5mb'}));
    app.use(session({
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 1000*60*60*24 },
      secret: 'react-chat'
    }));
    app.post('/api/setname', (req, res) => {
      const name = req.body.v;
      req.session.name = name;
      res.json({ code: 200, result: {
        content: `set name success: ${name}.`,
        time: new Date().toLocaleString(),
        name: 'Robot',
        selfName: name
      }})
    })
    app.post('/api/setemail', (req, res) => {
      const email = req.body.v;
      req.session.email = email;
      res.json({ code: 200, result: {
        content: `set email success: ${email}.`,
        time: new Date().toLocaleString(),
        name: 'Robot',
        selfName: req.session.name || 'Moyu'
      }})
    })
    var queue = [];
    app.post('/api/send', (req, res) => {
      const content = req.body.v;
      var num = req.session.msgNum;
      num = num || 1;
      var time = new Date().toLocaleString();
      req.session.msgNum = parseInt(num) + 1;

      var md5Str = md5(req.sessionID)
      console.log(md5Str)
      api(content, md5Str)
      .then(json => {
        url = json.url

        res.json({ code: 200, result: {
          code: json.code,
          content: json.text,
          time: time,
          url: url,
          name: 'Robot',
          list: json.list,
          selfName: req.session.name || 'Moyu'
        }})

        var email = req.session.email;
        if(email) {
          sendMail("smtp.qq.com", "492899414@qq.com", "jrpzcdbebynzcabf", email,
           'React-Chat', '(React-Chat) your message.',
            `<center><h1>You Send The Message <em>${content}</em> At ${time}.</h1></center>`
            +`<h3>Server Return: </h3>`
            +`<pre><code>${JSON.stringify(json, null, 4)}</code></pre>`,
            () => {
              console.log('socket closed');
            }
          )
        }
      })

      
    })

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