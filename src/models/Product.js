const sequelize = require('../db/db');
const Sequelize = require('sequelize');
const crud = require('./crud');

const Product = sequelize.define('product', {
	nom: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
	dsecription: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	prix: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	qte: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	category_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
});

// [ beforeCreate, afterCreate, beforeUpdate, afterUpdate, beforeDestroy, afterDestroy ]
// User.addHook('afterCreate', (instance, _options) => {
// });

const CRUD = Object.assign({}, crud);
CRUD.model = Product;

const create = (data) => { return CRUD.create(data); };
const getAll = () => { return CRUD.getAll(); };
const get = (id) => { return CRUD.get(id); };
const update = (id, data) => { return CRUD.update(id, data); };
const del = (id) => { return CRUD.del(id); };

module.exports = {
	Product,
	create,
	getAll,
	get,
	update,
	del,
};
