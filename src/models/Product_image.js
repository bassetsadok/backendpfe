const sequelize = require('../db/db');
const Sequelize = require('sequelize');
const crud = require('./crud');

const Product_image = sequelize.define('product_image', {
	url: {
		type: Sequelize.STRING,
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
CRUD.model = Product_image;

const create = (data) => { return CRUD.create(data); };
const getAll = () => { return CRUD.getAll(); };
const get = (id) => { return CRUD.get(id); };
const update = (id, data) => { return CRUD.update(id, data); };
const del = (id) => { return CRUD.del(id); };

module.exports = {
	Product_image,
	create,
	getAll,
	get,
	update,
	del,
};
