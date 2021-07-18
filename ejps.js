const fs = require('fs');

function capitalize(word) {
	const lower = word.toLowerCase();
	return word.charAt(0).toUpperCase() + lower.slice(1);
}

if (process.argv.length < 2)
	console.log('model name is needed e.g: user');
else {
	const model = process.argv[2];
	const Model = capitalize(model);

	const bodyModel = `const sequelize = require('../db/db');
const Sequelize = require('sequelize');
const crud = require('./crud');

const ${Model} = sequelize.define('${model}', {
	prop: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
});

// [ beforeCreate, afterCreate, beforeUpdate, afterUpdate, beforeDestroy, afterDestroy ]
// User.addHook('afterCreate', (instance, _options) => {
// });

const CRUD = Object.assign({}, crud);
CRUD.model = ${Model};

const create = (data) => { return CRUD.create(data); };
const getAll = () => { return CRUD.getAll(); };
const get = (id) => { return CRUD.get(id); };
const update = (id, data) => { return CRUD.update(id, data); };
const del = (id) => { return CRUD.del(id); };

module.exports = {
	${Model},
	create,
	getAll,
	get,
	update,
	del,
};
`;

	fs.writeFile(__dirname +'/src/models/'+Model+'.js', bodyModel, { flag: 'w+' }, function (err) {
		if (err) return console.log(err);
		console.log(Model+' model has been created (not indexed)');
	});

	if(process.argv.length >=3 && process.argv[3] === 'r'){
		const bodyRoute = `const app = require('./../../server');
const {create, getAll, get, update, del} = require('./../models/${Model}');
const { HTTPContainer, AUTHContainer } = require('../utils/container');
const ERRORS = require('../utils/codes');
const Validator = require('./../utils/validators');
		
const BASE_URL = '/${model}s';
		
app.get(BASE_URL + '/', function (req, res) {
	AUTHContainer.noAuth(req, res, () => {
		HTTPContainer.getAll(getAll, res);
	});
});
		
app.get(BASE_URL + '/:id', function (req, res) {
	AUTHContainer.noAuth(req, res, () => {
		HTTPContainer.get(get, req.params.id, res);
	});
});
		
app.post(BASE_URL + '/', function (req, res) {
	AUTHContainer.noAuth(req, res, () => {
		const data = req.body;
		HTTPContainer.create(create, data, res);
	});
});
		
app.put(BASE_URL + '/:id', function (req, res) {
	AUTHContainer.noAuth(req, res, () => {
		const id = parseInt(req.params.id);
		const data = req.body;

		if (id > 0) {
			HTTPContainer.update(update, id, data, res);
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
`;
		fs.writeFile(__dirname +'/src/routers/'+model+'.js', bodyRoute, { flag: 'w+' }, function (err) {
			if (err) return console.log(err);
			console.log(Model+' route Has been created');
			fs.writeFile(__dirname +'/src/routers/index.js', `\nrequire('./${model}');`, { flag: 'a+' }, function (err) {
				if (err) return console.log(err);
				console.log(Model+' has been indexed');
			});
		});

	}

}