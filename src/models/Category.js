const sequelize = require('../db/db');
const Sequelize = require('sequelize');
const crud = require('./crud');

const Category = sequelize.define('category', {
	nom: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
});

// [ beforeCreate, afterCreate, beforeUpdate, afterUpdate, beforeDestroy, afterDestroy ]
// User.addHook('afterCreate', (instance, _options) => {
// });

const CRUD = Object.assign({}, crud);
CRUD.model = Category;

const create = (data) => { return CRUD.create(data); };
const getAll = () => { return CRUD.getAll(); };
const get = (id) => { return CRUD.get(id); };
const update = (id, data) => { return CRUD.update(id, data); };
const del = (id) => { return CRUD.del(id); };

module.exports = {
	Category,
	create,
	getAll,
	get,
	update,
	del,
};
