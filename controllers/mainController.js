const fs = require('fs');
const path = require('path');
const db = require('../database/models')

 const productsFilePath = path.join(__dirname,  '../data/productsDataBase.json');
 const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const formatPrice = (price,discount) => toThousand(Math.round(price*(1-(discount/100))));

const controller = {
	root: (req, res) => {
	
		db.Product.findAll().then(products => res.render("index", {products,toThousand,formatPrice}))
		



	},
	search: (req, res) => {
		// Do the magic
			const results = [];
			products.forEach(product => {
				if(products.name.toLowerCase().includes(req.query.keywords.toLowerCase().trim()) || product.description.toLowerCase().includes(req.query.keywords.toLowerCase().trim())){
					results.push(product);
				}
			});
			res.render("results", {product, toThousand, formatPrice, search: req.query.keywords});

	},

	
	offers: async (req, res) => {
		try {
			const products = await Products.findAll({
				where: {
					category: "in-sale"
				}
			});
			res.render("offers", {products, formatPrice});
		} catch(error) {
			res.render("error", {error});
		}
	},
}


module.exports = controller;
