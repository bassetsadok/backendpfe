const passport = require('../middleware/auth');
const ERROR = require('./codes');

class HTTPContainer {
	static create(module, data, res) {
		module(data).then(c => res.status(201).json({ id: c.id }))
			.catch(err => {
				const errors = [];
				if (err.errors) {
					err.errors.map(e => errors.push({ field: e.path, error: e.validatorKey }));
					res.status(400).json({ errors });
				}
				else if (err.original.sqlState == 22007) res.status(400).json({ code: ERROR.INVALID_DATA_TYPE });
			});
	}

	static get(module, id, res) { module(id).then(data => res.status(200).json(data)).catch(err => console.log(err)); }

	static getAll(module, res) { module().then(data => res.status(200).json(data)); }

	static update(module, id, data, res) {
		module(id, data)
			.then(r => r[0] === 0 ? res.status(400).json({ code: ERROR.MODEL_404 }) : res.status(201).json({ id: r[0] }))
			.catch(err => {
				const errors = [];
				if (err.errors) {
					err.errors.map(e => errors.push({ field: e.path, error: e.validatorKey }));
					res.status(400).json({ errors });
				}
				else if (err.original.sqlState == 22007) res.status(400).json({ code: ERROR.INVALID_DATA_TYPE });
				else res.status(501).json({ code: 501 });
			});
	}

	static delete(module, id, res) {
		module(id).then(r => r === 0 ? res.status(400).json({ code: ERROR.MODEL_404 }) : res.status(201).json({ id })).catch(err => console.log(err));
	}
}

class AUTHContainer {
	static noAuth(req, res, job){ job(req, res); }
	static anyAuth(req, res, job){
		passport.authenticate('auth', { session: false }, (err, entity) => {
			if (err === null && entity !== false) {
				job(entity);
			} else res.status(400).json({ code: ERROR.INVALID_AUTH });
		})(req, res);
	}
	static userAuth(req, res, job) {
		passport.authenticate('auth', { session: false }, (err, _, info) => {
			if (err === null && info === 'user') {
				job();
			} else res.status(400).json({ code: ERROR.INVALID_AUTH });
		})(req, res);
	}
	static ownerAuth(req, res, id, job) {
		passport.authenticate('auth', { session: false }, (err, entity, info) => {
			if (err === null && entity !== false) {
				if ((info === 'client' && entity.id === id)
                    || info === 'user') {
					job(entity);
				}
			} else res.status(400).json({ code: ERROR.INVALID_AUTH });
		})(req, res);
	}
}

module.exports = { HTTPContainer, AUTHContainer };
