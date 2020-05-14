const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

// Iniciando o App
const app = express();

// Iniciando o DB
mongoose.connect('mongodb://localhost:27017/nodeapi', {useNewUrlParser: true});

requireDir('./src/models');

const Product = mongoose.model('Product');
Product.create({
    title: 'React Native',
    description: 'Build apps with React Native',
    url: 'http://github.com/facebook/react-native'
});

// '/' significa que é o root
app.get('/', (req, res) => {
    return res.send('Hello Mateus');
});

app.listen(3001);

