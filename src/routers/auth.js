const jwt = require('jsonwebtoken');
const app = require('./../../server');
const { getEmailChecker, updateEmailChecker } = require('./../models/EmailChecker');
const ERROR = require('../utils/codes');
// const { nanoid } = require('nanoid');
const { authUser } = require('../models/User');

// register route
app.post('/register', function (req, res) {
	// const { type } = req.body;
	// req.body['id'] = nanoid(25);

	// switch (type) {
	// TODO update re-routing
	// case 'donor':
	//     req.url = "/donors";
	//     break;
	// case 'ngo':
	//     req.url = "/ngos";
	//     break;
	// default:
	// 	return;
	// }
	app.handle(req, res);
});

// //login route
app.post('/login', async function (req, res) {
	const { username, password } = req.body;
	if (username && password) {
		{
			const auth = await authUser(username, password);
			if (auth === null)
				res.status(401).json({ code: ERROR.MODEL_404 });
			else {
				let token = jwt.sign({auth}, process.env.JWT_SECRET);
				res.status(200).json({ token });
			} 
		}
	} else {
		res.status(401).json({ errors: [username ? '' : 'username', password ? '' : 'password'] });
	}
});

app.get('/email_checker/:id', function (req, res) {
	const hash = req.params.id;
	updateEmailChecker(hash, { confirmed: true })
		.then(() => res.status(200).redirect(process.env.FRONT_URL + '/confirmation?done'))
		.catch(() => res.status(400).redirect(process.env.FRONT_URL + '/confirmation?error'));
});
