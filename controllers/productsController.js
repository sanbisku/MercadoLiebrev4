const db = require("../database/models");


let toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
let formatPrice = (price, discount) => toThousand(Math.round(price * (1 - (discount / 100))));

  
const controller = {
        
        root: (req, res) => {
            db.Product.findAll()
                .then(products => {
                    res.render("products", {products, toThousand, formatPrice});
                })
                .catch(error => console.log(error));
        },


        detail: (req, res) => {

            db.Product.findByPk(req.params.id)
    
                .then(function (product) {
    
                   
    
                    res.render('detail', { product,toThousand, formatPrice });
    
                })
                .catch(error => console.log(error));
        },
        create: (req, res) => {
            
            res.render('product-create-form')
        },


        store: (req, res, next) => {      

            db.Product.create({
               
			name: req.body.name,
			price: parseFloat(req.body.price),
			discount: parseFloat(req.body.discount),
			category: req.body.category,
			description: req.body.description,
			image: "image"
            })
    
            res.send("Agregado!")
    
    
    
        },

        edit: (req, res) => {

            db.Product.findByPk(req.params.id)
    
                .then(function (product) {
                   
    
                   let productToEdit = product;
    
                   
    
                    res.render('product-edit-form', { productToEdit });
    
                })
    
                .catch(error => console.log(error));
        },
    
    
    
    
        update: (req, res) => {
            db.Product.update({
            name: req.body.name,
			price: parseFloat(req.body.price),
			discount: parseFloat(req.body.discount),
			category: req.body.category,
			description: req.body.description,
			
    
    
            }, {
    
                where:
                    { id: req.params.id }

            
           
            })
    
            res.redirect('/');
    
            
            
    
        },

        delete: (req, res) => {

         
		

            db.Product.findByPk(req.params.id)
                .then(function (producto){
                   
                    let productToErase=producto
    
                    res.render("product-delete-form", { productToErase });
                    
                })
    
                .catch(error => console.log(error));
        },
    
    
        destroy: (req, res) => {
            
            db.Product.destroy({
                where: {
                    id: req.params.id
                }
            })
    
            res.redirect('/products/');
    
    
        },
    


    

    }


    module.exports = controller;