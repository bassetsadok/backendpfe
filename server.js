const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// set Auth
require('./src/middleware/auth');

const app = express();

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

var cors = require('cors');

app.use(cors());
var allowedOrigins = ['http://localhost:3000', ''];
app.use(
	cors({
		origin: function (origin, callback) {
			// allow requests with no origin
			// (like mobile apps or curl requests)
			if (!origin) return callback(null, true);
			if (allowedOrigins.indexOf(origin) === -1) {
				var msg =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
				return callback(new Error(msg), false);
			}
			return callback(null, true);
		},
	})
);

// parse application/json
app.use(bodyParser.json());
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

var helmet = require('helmet');
app.use(helmet());

// init db
// require('./src/db/db');

// set Schema
require('./src/models/index');

module.exports = app;

// set Routes
require('./src/routers/index');

// start app
app.listen(process.env.PORT, function () {
	console.log('Express is running on port ' + process.env.PORT);
	console.log('-------REGISTRED ROUTERS-------');
	app._router.stack.forEach(function (r) {
		if (r.route && r.route.path) {
			console.info(r.route.stack[0].method.toUpperCase() + '\t' + r.route.path);
		}
	});
	console.log('------------------------------');
});
let count = 0;
app.all('*', () => {
	count++;
	console.log('Illegal access count: ' + count);
});
