const Sequelize = require('sequelize');
require('dotenv').config();

// initialze an instance of Sequelize
const sequelize = new Sequelize('enchere','root','root',{
	host: process.env.DATABASE_HOST || 'localhost',
	database: process.env.DATABASE,
	username: process.env.USERNAME,
	password: process.env.PASSWORD,
	dialect: 'mysql',
});

// check the databse connection
sequelize
	.authenticate()
	.then(() => console.log('Connection has been established successfully.'))
	.catch((err) => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
