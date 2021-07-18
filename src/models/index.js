const { Category } = require('./Category');
const { Enchere } = require('./Enchere');
const { Facture } = require('./Facture');
const { Historic_enchere } = require('./Historic_enchere');
const { Product_image } = require('./Product_image');
const { Product } = require('./Product');
const { User } = require('./User');

function makeTables(model) {
	model.sync()
		.then(() => console.log(model.name+ ' table created successfully'))
		.catch(_ => console.log('oooh, ',_));
}

[
	User, Category, Enchere,
	Facture, Historic_enchere,
	Product_image, Product
].map(m => makeTables(m) );  
