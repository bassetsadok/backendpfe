const sequelize = require('../db/db');
const Sequelize = require('sequelize');
const crud = require('./crud');

const Enchere = sequelize.define('enchere', {
	debut: {
		type: Sequelize.DATE,
		allowNull: false,
	},
	fin: {
		type: Sequelize.DATE,
		allowNull: false,
	},
	prix: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	client_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	product_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
});

// [ beforeCreate, afterCreate, beforeUpdate, afterUpdate, beforeDestroy, afterDestroy ]
// User.addHook('afterCreate', (instance, _options) => {
// });

const CRUD = Object.assign({}, crud);
CRUD.model = Enchere;

const create = (data) => { return CRUD.create(data); };
const getAll = () => { return CRUD.getAll(); };
const get = (id) => { return CRUD.get(id); };
const update = (id, data) => { return CRUD.update(id, data); };
const del = (id) => { return CRUD.del(id); };

module.exports = {
	Enchere,
	create,
	getAll,
	get,
	update,
	del,
};
