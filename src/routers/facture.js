const app = require('./../../server');
const {create, getAll, get, update, del} = require('./../models/Facture');
const { HTTPContainer, AUTHContainer } = require('../utils/container');
const ERRORS = require('../utils/codes');
const Validator = require('./../utils/validators');
		
const BASE_URL = '/factures';
		
app.get(BASE_URL + '/', function (req, res) {
	AUTHContainer.noAuth(req, res, () => {
		HTTPContainer.getAll(getAll, res);
	});
});
		
app.get(BASE_URL + '/:id', function (req, res) {
	AUTHContainer.noAuth(req, res, () => {
		HTTPContainer.get(get, req.params.id, res);
	});
});
		
app.post(BASE_URL + '/', function (req, res) {
	AUTHContainer.noAuth(req, res, () => {
		const data = req.body;
		HTTPContainer.create(create, data, res);
	});
});
		
app.put(BASE_URL + '/:id', function (req, res) {
	AUTHContainer.noAuth(req, res, () => {
		const id = parseInt(req.params.id);
		const data = req.body;

		if (id > 0) {
			HTTPContainer.update(update, id, data, res);
		}
		else res.status(400).json({ code: ERRORS.INVALID_RANGE });

	});
});

app.delete(BASE_URL + '/:id', function (req, res) {
	const id = parseInt(req.params.id);
	if (id > 0) {
		AUTHContainer.noAuth(req, res, () => {
			HTTPContainer.delete(del, id, res);
		});
	} else res.status(400).json({ code: ERRORS.INVALID_RANGE });
});
