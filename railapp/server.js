const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const railRoutes = require('./routes/railRoutes');

const app = express();
const port = 5000;
// app.use(bodyParser.json());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/railinfo', {});

app.use('/api', railRoutes);

app.listen(port, () => {
    console.log('EJOBINDIA: Server is running on port '+port);
});