const express = require('express');
const routes = express.Router();
const ProductController = require('./controller/ProductController');

routes.get('/products', ProductController.index);
routes.post('/products', ProductController.store);



// Exporta para utilizar dentro de server.js
module.exports = routes;