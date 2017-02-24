var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
require('./app_api/models/db');
var uglifyJs = require('uglify-js');
var fs = require('fs');

var routes = require('./app_server/routes/index');
var routesApi = require('./app_api/routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname,'app_server', 'views'));
app.set('view engine', 'jade');

var appClientFiles=[
'app_client/app.js',
'app_client/mainCtrl.js',
'app_client/views/home/homeCtrl.js',
'app_client/views/works/worksCtrl.js',
'app_client/views/tech/techCtrl.js',
'app_client/views/works/recipeBook/recipesList/recipesCtrl.js',
'app_client/views/works/recipeBook/recipe/recipeCtrl.js',
'app_client/views/works/weatherApp/weatherAppCtrl.js',
'app_client/common/services/apiHandler.service.js',
'app_client/common/services/earth.service.js',
'app_client/common/services/worksNavigation.service.js',
'app_client/common/services/linkRenderer.service.js',
'app_client/common/services/imgHandler.service.js',
'app_client/common/services/historyRecipe.service.js',
'app_client/common/services/factories/factoryCities.factory.js',
'app_client/common/directives/footer-earth/footer.earth.directive.js',
'app_client/common/directives/navigation/navigation.directive.js',
'app_client/common/directives/earth-process/earthProcess.directive.js',
'app_client/common/directives/carousel/carousel.directive.js',
'app_client/common/directives/new-recipe/newRecipe.directive.js',
'app_client/common/directives/new-recipe/googleApiImages.directive.js',
'app_client/common/directives/progress-bar/progress-bar.directive.js',
'app_client/common/directives/tech-renderer/tech-renderer.directive.js',
'app_client/common/directives/myContacts/myContacts.directive.js'
];

var uglified=uglifyJs.minify(appClientFiles, {compress:false});

fs.writeFile('public/angular/newPfolio.min.js', uglified.code, function(err){
	if(err){
		console.log('DSDSDSfsgr:',err);
	}else{
		console.log('Script generated and saved: newPfolio.min.js');
	}
})

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_server')));
app.use(express.static(path.join(__dirname, 'app_client')));

//app.use('/', routes);
app.use('/api',routesApi);

app.use(function(req,res){
	res.sendFile(path.join(__dirname,'app_client', 'index.html'))
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
