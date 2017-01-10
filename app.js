console.log('~~~~ Starting Stellroute ~~~~');

const express          = require('express');
const path             = require('path');
const passport         = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const flash            = require('connect-flash');
const favicon          = require('serve-favicon');
const cookieParser     = require('cookie-parser');
const bodyParser       = require('body-parser');
const session          = require('cookie-session');
const getUser          = require('./middleware/getUser');
const isLoggedIn       = require('./middleware/isLoggedIn');
const setFlash         = require('./modules/setFlash');
const routes           = require('./routes/index');
const ajax             = require('./routes/ajax');
const admin            = require('./routes/admin');
const fs               = require('fs');
const app              = express();

// Set up the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// App configuration ///////////////////////////////////////////////////
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json()); // needed for post requests, still figuring out what it does
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // Sets the public folder to be available available to the front end

// required for passport
app.set('trust proxy', 1) // trust first proxy
app.use(session({
        name: 'sessionForLissnerListner',
        keys: ['key1', 'key2']
    }
)); // session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(setFlash);

// get the user
app.use(getUser);

// Set index.js to be the main router
app.use('/', routes);

// CRUD
app.use('/', isLoggedIn(), ajax);

app.use('/admin', isLoggedIn(true), admin);

// error handlers /////////////////////////////////////////////////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    console.error(req);
    err.status = 404;
    console.error('~~~~~~~~~~');
    //next(err);

    req.flash('error', 'Sorry, that page doesn\'t exist.')
    res.redirect('/')
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        })
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

console.log('~~~~ Stellroute Has Started ~~~~');
console.log('Current Environment: ' + app.get('env'));

module.exports = app;