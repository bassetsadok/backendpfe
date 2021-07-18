const sequelize = require('../db/db');
const Sequelize = require('sequelize');
const crud = require('./crud');

const Facture = sequelize.define('facture', {
	prix: {
		type: Sequelize.FLOAT,
		allowNull: false,
	},
	date_facture: {
		type: Sequelize.DATE,
		allowNull: false,
	},
	client_vendeur: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	client_achteur: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
});

// [ beforeCreate, afterCreate, beforeUpdate, afterUpdate, beforeDestroy, afterDestroy ]
// User.addHook('afterCreate', (instance, _options) => {
// });

const CRUD = Object.assign({}, crud);
CRUD.model = Facture;

const create = (data) => { return CRUD.create(data); };
const getAll = () => { return CRUD.getAll(); };
const get = (id) => { return CRUD.get(id); };
const update = (id, data) => { return CRUD.update(id, data); };
const del = (id) => { return CRUD.del(id); };

module.exports = {
	Facture,
	create,
	getAll,
	get,
	update,
	del,
};
