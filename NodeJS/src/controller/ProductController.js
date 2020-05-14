const mongoose = require('mongoose');
const Product = mongoose.model('Product');

module.exports = {
    async index(req, res) {
        
        // Page por padrão é 1
        const { page = 1 } = req.query;

        //page: página atual, limit: limite de resultados por página
        const products = await Product.paginate({}, { page, limit: 10});

        return res.json(products);
    },

    async store(req,res){
        const product = await Product.create(req.body);
        return res.json(product);
    },

    async show(req, res) {
        const product = await Product.findById(req.params.id);
        return res.json(product);
    },

    async update(req, res){
        // { new: true } serve para retornar o produto atualizado para o response
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true});
        return res.json(product);

    },

    async destroy(req, res){
        await Product.findByIdAndRemove(req.params.id);

        return res.send('produto removido');
    }
}