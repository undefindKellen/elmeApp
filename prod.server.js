var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.PORT;

var app =express();

var router = express.Router();

router.get('/', function (req, res, next) {
  req.url = 'index.html';
  next();
});

app.use(router);

var appData = require("./data.json");
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

var apiRoutes = express.Router();
apiRoutes.get("/seller", function (req, res) {
  res.json({
    errno: 0,
    data: seller
  });
});

apiRoutes.get("/goods", function (req, res) {
  res.json({
    errno: 0,
    data: goods
  });
});

apiRoutes.get("/ratings", function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  });
});

app.use("/api", apiRoutes);

app.use(express.static('./dist'));

const uri = 'http://localhost:' + port

var _resolve
var _reject
var readyPromise = new Promise((resolve, reject) => {
  _resolve = resolve
  _reject = reject
})

var server
var portfinder = require('portfinder')
portfinder.basePort = port

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  portfinder.getPort((err, port) => {
    if (err) {
      _reject(err)
    }
    process.env.PORT = port
    var uri = 'http://localhost:' + port
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(uri)
    }
    server = app.listen(port)
    _resolve()
  })
})

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
