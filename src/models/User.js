const sequelize = require('../db/db');
const Sequelize = require('sequelize');
const crud = require('./crud');

const User = sequelize.define('user', {
	type: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	nom: {
		type: Sequelize.STRING,
		allowNull: false,
	}, 
	prenom: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
	num_tel: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
	ddn: {
		type: Sequelize.DATE,
		allowNull: false,
	},
	adress: {
		type: Sequelize.STRING,
		allowNull: false,
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
});

// [ beforeCreate, afterCreate, beforeUpdate, afterUpdate, beforeDestroy, afterDestroy ]
// User.addHook('afterCreate', (instance, _options) => {
// });

const CRUD = Object.assign({}, crud);
CRUD.model = User;

const create = (data) => { return CRUD.create(data); };
const getAll = () => { return CRUD.getAll(); };
const get = (id) => { return CRUD.get(id); };
const update = (id, data) => { return CRUD.update(id, data); };
const del = (id) => { return CRUD.del(id); };

const authUser = (username, password) =>{
	return User.findOne({
		where: { username, password },
	});
}

module.exports = {
	User,
	create,
	getAll,
	get,
	update,
	del,
	authUser
};

