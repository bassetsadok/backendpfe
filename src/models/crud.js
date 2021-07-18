module.exports = {
	model: null,
	create: function (data) {
		return this.model.create(data);
	},
	getAll: function () {
		return this.model.findAll();
	},
	get: function (id) {
		return this.model.findOne({
			where: { id },
		});
	},
	update: function (id, data) {
		return this.model.update(data, { where: { id } });
	},
	del: function (id) {
		return this.model.destroy({
			where: { id },
		});
	},
};
