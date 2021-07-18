const sequelize = require('./../db/db');
const Sequelize = require('sequelize');

const EmailChecker = sequelize.define('email_checker', {
	hash: {
		type: Sequelize.STRING, allowNull: false
	},
	confirmed: {
		type: Sequelize.BOOLEAN, allowNull: false
	},
	user_id: {
		type: Sequelize.STRING, allowNull: false
	},
});

const createEmailChecker = async (data) => {
	return await EmailChecker.create(data);
};

const getAllEmailCheckers = async () => {
	return await EmailChecker.findAll();
};

const getEmailChecker = async user_id => {
	return await EmailChecker.findOne({
		where: { user_id },
	});
};

const updateEmailChecker = async (hash, data) => {
	return await EmailChecker.update(data, { where: { hash } });
};

const delEmailChecker = async id => {
	return await EmailChecker.destroy({ where: { id } });
};

module.exports = { EmailChecker, createEmailChecker, getAllEmailCheckers, getEmailChecker, updateEmailChecker, delEmailChecker };
