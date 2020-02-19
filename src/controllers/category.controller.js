const Category = require('../models/category.model.js');


exports.findOne = (req, res) => {
    Category.findById(req.params.id)
        .then(user => {
            res.send(user)
        })
}
// Agafem tot els documents del model
exports.findAll = (req, res) =>{
    Category.find()
        .then(user => {
            console.log(user);
            
            res.send(user);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'algo a petat'
            })
        })
}
//Creem una nova categoria
exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'omple el formulari complert'
        })
    }
    const category = new Category({
        category_name: req.body.category_name,
        category_description: req.body.category_description
    })
    category.save()
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(400).send({
                 message: err.message || ' a petat quan creavem la categoria'
             })
        
    })
}