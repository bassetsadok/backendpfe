# EJPS

boilerplate for express server, jwt, passport and sequelize

Major Package Included:

* [Express](https://github.com/expressjs/express)
* [JWT](https://github.com/auth0/node-jsonwebtoken)
* [Passport](https://github.com/jaredhanson/passport), [Passport JWT](https://github.com/mikenicholson/passport-jwt)
* [Sequelize](https://github.com/sequelize/sequelize), mysql is by default using [mysql2](https://github.com/sidorares/node-mysql2).

ESLint:

* To check syntax, find problems, and enforce code style
* What type of modules does your project use? · **commonjs**
* Which framework does your project use? · **none**
* Does your project use TypeScript? · **No**
* Where does your code run? · **node**
* What format do you want your config file to be in? · **JSON**
* What style of indentation do you use? · **tab**
* What quotes do you use for strings? · **single**
* What line endings do you use? · **unix**
* Do you require semicolons? · **Yes**

## TODO

* A predefined Email model if not necessary then commnet in _models/index.js_
* Set proper values for _.env_ file.
* In _routes/auth.js_ file, line 11, change with proper create method.
* If you wanna use email Then uncomment line 6, 13

## Quick Guide

### Model

```js
const sequelize = require('../db/db');
const Sequelize = require('sequelize');
const CRUD = require('./crud');

const User = sequelize.define('user', {
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
  password: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	role: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

// [ beforeCreate, afterCreate, beforeUpdate, afterUpdate, beforeDestroy, afterDestroy ]
// User.addHook('afterCreate', (instance, _options) => {
// });

CRUD.model = User;

// create some helper functions to work on the database
const create = (data) => { return CRUD.create(data); };
const getAll = () => { return CRUD.getAll(); };
const get = (id) => { return CRUD.get(id); };
const update = (id, data) => { return CRUD.update(id, data); };
const del = (id) => { return CRUD.del(id); };

module.exports = {
	User,
	create,
	getAll,
	get,
	update,
	del,
};

```

### Extra Auth

* models:
```js
const auth = async (username, password) => {
	const u = await User.findOne({
		where: { username, password },
	});

	// TODO customize model
	const { Donor } = require('./Donor');
  const { Donor } = require('./Donor');
  const { NGO } = require('./NGO');

	// let e;
	if (u) {
		switch (u.role) {
		TODO customize swhitch model
		case 'donor':
			e = await Donor.findOne({
				where: { username, password },
			});
			return e ? { type: 'donor', id: e.id } : null;
		case 'admin':
			e = await Admin.findOne({
				where: { username, password },
			});
			return e ? { type: 'admin', id: e.id } : null;
		case 'ngo':
			e = await NGO.findOne({
				where: { username, password },
			});
			return e ? { type: 'ngo', id: e.id } : null;
		default:
			return null;
		}
	} else return null;
};

const check = async ({ username, email }) => {
	console.log([{ username }, { email }]);
	return await User.findOne({
		where: {
			[Sequelize.Op.or]: [{ username }, { email }],
		},
	});
};
```

* route:
```js
const { AUTHContainer } = require('../utils/container');

app.get('/get_user', function (req, res) {
	try {
		AUTHContainer.anyAuth(req, res, async (entity) => {
			let e = null;
			if (entity) {
				// TOOD customize switch MODEL
				switch (entity.role) {
				//   case "admin":
				//     e = await Admin.findOne({
				//       where: { id: entity.owner_id },
				//     });
				//     e ? (e.dataValues["type"] = "admin") : null;
				//     break;
				default:
					return res.status(400).json({ code: ERRORS.MODEL_404 });
				}
			} else return res.status(400).json({ code: ERRORS.MODEL_404 });

			// return res.status(200).json({ entity: e });
		});
	} catch (e) {
		console.log({ e });
		return res.status(400).json({ code: ERRORS.INVALID_DATA_TYPE });
	}
});
```

### Router

```js
const app = require('./../../server');
const {create, getAll, get, update, del} = require('./../models/Products');
const { HTTPContainer, AUTHContainer } = require('../utils/container');
const ERRORS = require('../utils/codes');
const Validator = require('./../utils/validators');

const BASE_URL = '/products';

app.get(BASE_URL + '/', function (req, res) {
	AUTHContainer.noAuth(req, res, () => {
		HTTPContainer.getAll(getAll, res);
	});
});

app.get(BASE_URL + '/:id', function (req, res) {
	AUTHContainer.noAuth(req, res, () => {
		HTTPContainer.get(get, res.params.id, res);
	});
});

app.post(BASE_URL + '/', function (req, res) {
	AUTHContainer.noAuth(req, res, () => {
		const data = req.body;
		if (Validator.email(data.email) && Validator.dob(data.dob)){
			HTTPContainer.create(create, data, res);}
		else{
			res.status(400).json({ code: ERRORS.INVALID_DATA_TYPE });
		}
	});
});

app.put(BASE_URL + '/:id', function (req, res) {
	AUTHContainer.noAuth(req, res, () => {
		const id = parseInt(req.params.id);
		const data = req.body;

		if (id > 0) {
			if (
				data.email ? Validator.email(data.email) : true && 
                data.dob ? Validator.dob(data.dob) : true
			){
				HTTPContainer.update(update, id, data, res);
			} else {
				res.status(400).json({ code: ERRORS.INVALID_DATA_TYPE });
			}
		}
		else res.status(400).json({ code: ERRORS.INVALID_RANGE });

	});
});

app.delete(BASE_URL + '/:id', function (req, res) {
	const id = parseInt(req.params.id);
	if (id > 0) {
		AUTHContainer.noAuth(req, res, () => {
			HTTPContainer.delete(del, id, res);
		});
	} else res.status(400).json({ code: ERRORS.INVALID_RANGE });
});
```

### Mail

The _/register_ route will generate a token and register it.

```js
app.get('/email/:id', function (req, res) {
    const hash = req.params.id;
    updateEmailChecker(hash, { confirmed: true })
        .then(() => res.status(200).redirect(process.env.FRONT_URL+'/mail_confirmed'))
        .catch(() => res.status(400).redirect(process.env.FRONT_URL+'/mail_issue'));
});
```

### CLI
Create a model and route `node epjs.js <model> [r]` e.g: `node epjs.js test r`.
