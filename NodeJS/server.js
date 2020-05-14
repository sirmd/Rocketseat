const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/nodeapi', {useNewUrlParser: true});

// '/' significa que é o root
app.get('/', (req, res) => {
    res.send('Hello Mateus');
});

app.listen(3001);

