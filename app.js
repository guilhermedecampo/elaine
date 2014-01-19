var express = require('express'),
    path = require('path'),
    http = require('http');

var app = express();

app.configure(function () {
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.static(path.join(__dirname, 'public')));
    app.set('views', __dirname + '/views');
    app.engine('html', require('ejs').renderFile);
});


app.get('/', function (req, res){
  res.render('index.html');
});

app.use(function (err, req, res, next){
      // treat as 404
      if (~err.message.indexOf('not found')) return next();

      // log it
      console.error(err.stack);

      // error page
      res.status(500).render('index.html');

});

    // assume 404 since no middleware responded
app.use(function (req, res, next){
    res.status(404).render('index.html');

});

app.listen(1500);