const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Initiate our app
const app = express();

//Configure our app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', 1);
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 3600000 }, resave: false, saveUninitialized: true })); //cookie for 1 hour (miliseconds)

const config = require('./config/config.js');

//Configure isProduction variable
const isProduction = config.node_env === 'production';

if(!isProduction) {
  app.use(errorHandler());
}

//Configure Mongoose
mongoose.connect(config.url).catch(err => console.log(err)); 
mongoose.set('debug', true);

require('./user/user.routes.js')(app);
require('./auth/auth.routes.js')(app);
require('./attribute/attribute.routes.js')(app);
require('./audience/audience.routes.js')(app);
require('./content/content.routes.js')(app);
require('./channel/channel.routes.js')(app);
require('./upload/upload.routes.js')(app);
require('./setting/setting.routes.js')(app);
require('./event/event.routes.js')(app);
require('./questioner/questioner.routes.js')(app);
require('./company/company.routes.js')(app);

require('./config/passport.js');

// default route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to API LMS v1.0"});
});

//Error handlers & middlewares
if(!isProduction) {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

// listen on port 3000
app.listen(config.serverport, () => {
    console.log("Server is listening on port " + config.serverport);
});