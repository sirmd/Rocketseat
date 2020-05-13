const express = require('express');

const app = express();

// '/' significa que é o root
app.get('/', (req, res) => {
    res.send('Hello MD');
});

app.listen(3001);

