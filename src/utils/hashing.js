const bcrypt = require('bcrypt');
const mail = require('./mail');
const { createEmailChecker } = require('./../models/EmailChecker');

const saltRounds = 10;
module.exports = (id) => bcrypt.genSalt(saltRounds)
	.then(salt => {
		bcrypt.hash(id, salt)
			.then(hash => {
				console.log(hash);
				hash = hash.replaceAll('/', 's').replaceAll('&', 'a').replaceAll('?', 'p');
				mail('soheybemir@gmail.com', hash).catch(console.error);
				createEmailChecker({client_id: parseInt(id), hash, confirmed: false});
			});
	});